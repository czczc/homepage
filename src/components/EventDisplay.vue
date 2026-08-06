<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// ---- data ------------------------------------------------------------
// Real MicroBooNE events (Wire-Cell imaging output, exported from Bee).
// Packed format per event: base64 of [x u16×n][y u16×n][z u16×n][cluster u8×n],
// coordinates quantized over bbox. Regenerate with scripts/pack-bee-events.py.
const events = ref([])
const cur = ref(0)
const loading = ref(true)
const meta = computed(() => events.value[cur.value] ?? { id: '—', nclus: 0, total: 0, n: 0 })
const dragging = ref(false)

const fmtK = n => (n >= 1000 ? (n / 1000).toFixed(n < 10000 ? 1 : 0) + 'k' : String(n))

// categorical cluster palette, validated for CVD separation on the #070b12 surface
const clusterColors = ['#3d8ed6', '#bb851c', '#2ba5a0', '#c95f3a', '#8a6ee0', '#96991e', '#d4508a', '#3fa65c']

// uboone active volume (cm): xmin,xmax, ymin,ymax, zmin,zmax — from bee3 experiment.js
const DET = [0, 256, -115.51, 117.45, 0, 1036.96]
const DET_C = [(DET[0] + DET[1]) / 2, (DET[2] + DET[3]) / 2, (DET[4] + DET[5]) / 2]
const BOX_CORNERS = []
for (const x of [DET[0], DET[1]])
  for (const y of [DET[2], DET[3]])
    for (const z of [DET[4], DET[5]]) BOX_CORNERS.push([x, y, z])
// pairs of corner indices differing in exactly one axis
const BOX_EDGES = [[0,1],[2,3],[4,5],[6,7],[0,2],[1,3],[4,6],[5,7],[0,4],[1,5],[2,6],[3,7]]

// ---- renderer ---------------------------------------------------------
const canvas = ref(null)
let ctx, W, H, pts = null, yaw = 0.5, pitch = 0.25, needDraw = true, raf = 0
const cache = {}

function decodeEvent(e) {
  const raw = atob(e.data)
  const bytes = new Uint8Array(raw.length)
  for (let i = 0; i < raw.length; i++) bytes[i] = raw.charCodeAt(i)
  const n = e.n
  const u16 = new Uint16Array(bytes.buffer, 0, n * 3)
  const cid = new Uint8Array(bytes.buffer, n * 6, n)
  const [x0, x1, y0, y1, z0, z1] = e.bbox
  const xs = new Float32Array(n), ys = new Float32Array(n), zs = new Float32Array(n)
  for (let i = 0; i < n; i++) {
    xs[i] = x0 + (u16[i]         / 65535) * (x1 - x0)
    ys[i] = y0 + (u16[n + i]     / 65535) * (y1 - y0)
    zs[i] = z0 + (u16[2 * n + i] / 65535) * (z1 - z0)
  }
  // bucket indices by cluster color so we set fillStyle only 8 times per frame
  const buckets = Array.from({ length: 8 }, () => [])
  for (let i = 0; i < n; i++) buckets[cid[i] % 8].push(i)
  // frame the view on the detector, padded to whatever the cloud spills outside it
  const span = Math.max(
    Math.max(x1, DET[1]) - Math.min(x0, DET[0]),
    Math.max(y1, DET[3]) - Math.min(y0, DET[2]),
    Math.max(z1, DET[5]) - Math.min(z0, DET[4]))
  return { xs, ys, zs, buckets, c: DET_C, span }
}

function draw() {
  ctx.fillStyle = '#070b12'; ctx.fillRect(0, 0, W, H)
  // faint wire-plane backdrop
  ctx.strokeStyle = '#101826'; ctx.lineWidth = 1
  for (let x = 0; x < W; x += 14) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke() }
  if (!pts) return
  const { xs, ys, zs, buckets, c, span } = pts
  const cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch)
  const scale = Math.min(W, H * 2.2) / span * 0.92
  const cxs = W / 2, cys = H / 2
  // orthographic camera: z (beam) → screen x, y (vertical) → screen y, x (drift) → depth
  const proj = (x, y, z) => {
    const wx = z - c[2], wy = y - c[1], wz = x - c[0]
    const rx = wx * cy + wz * sy
    const tz = -wx * sy + wz * cy
    const ry = wy * cp - tz * sp
    return [cxs + rx * scale, cys - ry * scale]
  }
  // TPC active-volume boundary, behind the hits
  ctx.strokeStyle = '#31425e'; ctx.lineWidth = 1
  const pc = BOX_CORNERS.map(k => proj(k[0], k[1], k[2]))
  ctx.beginPath()
  for (const [a, b] of BOX_EDGES) {
    ctx.moveTo(pc[a][0], pc[a][1]); ctx.lineTo(pc[b][0], pc[b][1])
  }
  ctx.stroke()
  for (let b = 0; b < 8; b++) {
    ctx.fillStyle = clusterColors[b]
    const idx = buckets[b], sz = 1.8
    for (let k = 0; k < idx.length; k++) {
      const i = idx[k]
      const wx = zs[i] - c[2], wy = ys[i] - c[1], wz = xs[i] - c[0]
      const rx = wx * cy + wz * sy
      const tz = -wx * sy + wz * cy
      const ry = wy * cp - tz * sp
      ctx.fillRect(cxs + rx * scale, cys - ry * scale, sz, sz)
    }
  }
}

function loop() {
  if (needDraw) { draw(); needDraw = false }
  raf = requestAnimationFrame(loop)
}

function setEvent(i) {
  cur.value = i
  if (!cache[i]) cache[i] = decodeEvent(events.value[i])
  pts = cache[i]
  needDraw = true
}

function resize() {
  const cv = canvas.value
  const dpr = Math.min(devicePixelRatio || 1, 2)
  W = cv.clientWidth; H = cv.clientHeight
  cv.width = W * dpr; cv.height = H * dpr
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  needDraw = true
}

// ---- interaction ------------------------------------------------------
let px = 0, py = 0
function onDown(e) {
  dragging.value = true; px = e.clientX; py = e.clientY
  canvas.value.setPointerCapture(e.pointerId)
}
function onMove(e) {
  if (!dragging.value) return
  yaw += (e.clientX - px) * 0.005
  pitch = Math.max(-1.4, Math.min(1.4, pitch + (e.clientY - py) * 0.005))
  px = e.clientX; py = e.clientY; needDraw = true
}
function onUp() { dragging.value = false }
function onKey(e) {
  const step = 0.08
  if (e.key === 'ArrowLeft')  { yaw -= step; needDraw = true; e.preventDefault() }
  if (e.key === 'ArrowRight') { yaw += step; needDraw = true; e.preventDefault() }
  if (e.key === 'ArrowUp')    { pitch = Math.max(-1.4, pitch - step); needDraw = true; e.preventDefault() }
  if (e.key === 'ArrowDown')  { pitch = Math.min(1.4, pitch + step); needDraw = true; e.preventDefault() }
}

onMounted(async () => {
  ctx = canvas.value.getContext('2d')
  resize()
  addEventListener('resize', resize)
  loop()
  const res = await fetch(`${import.meta.env.BASE_URL}data/bee-events.json`)
  events.value = await res.json()
  loading.value = false
  setEvent(0)
})
onUnmounted(() => {
  cancelAnimationFrame(raf)
  removeEventListener('resize', resize)
})
</script>

<template>
  <div class="panel">
    <div class="panel-h">EVENT DISPLAY — MicroBooNE LArTPC <span class="tag">wire-cell imaging · via Bee</span></div>
    <div class="evd-wrap">
      <canvas ref="canvas" class="evd-canvas" tabindex="0" role="img" :class="{ dragging }"
        aria-label="Interactive 3D display of a real MicroBooNE neutrino event. Drag or use arrow keys to rotate."
        @pointerdown="onDown" @pointermove="onMove" @pointerup="onUp" @keydown="onKey"></canvas>
      <div class="evd-hud">
        <span>{{ loading ? 'LOADING EVENTS…' : 'DRAG TO ROTATE' }}</span>
        <span class="live num">SET uboone/imaging/examples</span>
      </div>
    </div>
    <div class="evd-foot">
      <div class="evt-btns" role="group" aria-label="Select event">
        <span class="lbl">EVT</span>
        <button v-for="(e, i) in events" :key="e.id" :class="{ on: i === cur }"
                :title="'DAQ ' + e.id" @click="setEvent(i)">{{ i }}</button>
      </div>
      <span class="legend">COLOR = CLUSTER <span class="cbar" aria-hidden="true"><i v-for="c in clusterColors" :key="c" :style="{ background: c }"></i></span></span>
      <span class="readout num">DAQ <b>{{ meta.id }}</b> · {{ meta.nclus }} clusters · {{ fmtK(meta.total) }} hits ({{ fmtK(meta.n) }} drawn)</span>
    </div>
    <div class="evd-foot hint-row">
      <span class="evd-hint">
        Five real neutrino-beam events from the MicroBooNE detector, reconstructed by Wire-Cell
        imaging and exported from <a href="https://www.phy.bnl.gov/twister/bee/" rel="noopener">Bee</a> —
        the browser-based 3D event display I built. Each color is one reconstructed cluster
        of drifted ionization charge. Drag to spin the TPC.
      </span>
    </div>
  </div>
</template>
