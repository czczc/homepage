<script setup>
import { pins, selected, current, step, choose, X, Y, W, H, PX0, PX1, PY0, PY1, LX, LY } from './mapState.js'

// A survey map of oscillation space: log baseline (x) against log energy (y).
// With L in metres and E in MeV, L/E reads directly in km/GeV, so every line of
// constant L/E is a straight "contour" x − y = c on this map.
const angle = (Math.atan2(-(PY1 - PY0) / (LY[1] - LY[0]), (PX1 - PX0) / (LX[1] - LX[0])) * 180) / Math.PI

function segment(c) {
  const lo = Math.max(LY[0], LX[0] - c), hi = Math.min(LY[1], LX[1] - c)
  return lo < hi ? { x1: X(c + lo), y1: Y(lo), x2: X(c + hi), y2: Y(hi), lo, hi } : null
}
const sup = n => String(n).replace(/\d/g, d => '⁰¹²³⁴⁵⁶⁷⁸⁹'[d])
const fmtLE = c => (c >= 4 ? '10' + sup(c) : String(+(10 ** c).toPrecision(1))) + ' km/GeV'

const contours = []
for (let c = LX[0] - LY[1]; c <= LX[1] - LY[0]; c += 0.25) {
  const cc = Math.round(c * 4) / 4
  const s = segment(cc)
  if (!s) continue
  const major = Number.isInteger(cc)
  // label near the upper end of each major line, inside the frame
  const t = Math.min(s.hi - 0.35, s.lo + (s.hi - s.lo) * 0.82)
  contours.push({ ...s, major, label: major && s.hi - s.lo > 1 ? fmtLE(cc) : '', lx: X(cc + t), ly: Y(t) - 5 })
}

// first oscillation maxima: L/E = π / (2 · 1.267 · Δm²)
const maxima = [
  { name: 'Δm² ≈ 1 eV² maximum', dm2: 1, at: 0.5 },
  { name: 'Δm²₃₁ first maximum', dm2: 2.5e-3, at: 0.3 },
  { name: 'Δm²₂₁ first maximum', dm2: 7.5e-5, at: 0.7 },
].map(m => {
  const c = Math.log10(Math.PI / (2 * 1.267 * m.dm2))
  const s = segment(c)
  const t = s.lo + (s.hi - s.lo) * m.at
  return { ...m, ...s, lx: X(c + t), ly: Y(t) + 16 }
})

const xTicks = [['1 m', 0], ['10 m', 1], ['100 m', 2], ['1 km', 3], ['10 km', 4], ['100 km', 5], ['1000 km', 6]]
const yTicks = [['1 MeV', 0], ['10 MeV', 1], ['100 MeV', 2], ['1 GeV', 3], ['10 GeV', 4]]

const sentence = s => s.charAt(0) + s.slice(1).toLowerCase()
const open = selected, cur = current
</script>

<template>
  <figure class="map-fig" aria-labelledby="map-cap">
    <div class="map-scroll">
      <div class="map">
        <svg class="map__land" :viewBox="`0 0 ${W} ${H}`" aria-hidden="true" focusable="false">
          <defs>
            <filter id="grain" x="0" y="0" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" />
              <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.07 0" />
            </filter>
            <clipPath id="frame"><rect :x="PX0" :y="PY0" :width="PX1 - PX0" :height="PY1 - PY0" /></clipPath>
          </defs>
          <rect class="map__paper" width="100%" height="100%" />
          <rect width="100%" height="100%" filter="url(#grain)" />
          <g clip-path="url(#frame)">
            <line v-for="(c, i) in contours" :key="i" :x1="c.x1" :y1="c.y1" :x2="c.x2" :y2="c.y2"
                  :class="['contour', { 'contour--major': c.major }]" />
            <line v-for="m in maxima" :key="m.name" :x1="m.x1" :y1="m.y1" :x2="m.x2" :y2="m.y2" class="water" />
          </g>
          <g class="contour-labels">
            <text v-for="(c, i) in contours.filter(c => c.label)" :key="'l' + i" :x="c.lx" :y="c.ly"
                  :transform="`rotate(${angle} ${c.lx} ${c.ly})`" text-anchor="middle">{{ c.label }}</text>
          </g>
          <g class="water-labels">
            <text v-for="m in maxima" :key="'w' + m.name" :x="m.lx" :y="m.ly"
                  :transform="`rotate(${angle} ${m.lx} ${m.ly})`" text-anchor="middle">{{ m.name }}</text>
          </g>
          <line v-for="p in pins.filter(p => p.span)" :key="'s' + p.name" class="span"
                :x1="p.span.x1" :y1="p.span.y" :x2="p.span.x2" :y2="p.span.y" />
          <!-- folds, drawn into the map only -->
          <line class="crease" :x1="W * 0.62" y1="0" :x2="W * 0.62" :y2="H" />
          <line class="crease" x1="0" :y1="H * 0.5" :x2="W" :y2="H * 0.5" />
          <rect class="map__frame" :x="PX0" :y="PY0" :width="PX1 - PX0" :height="PY1 - PY0" />
          <g class="axis">
            <text v-for="t in xTicks" :key="t[0]" :x="X(t[1])" :y="PY1 + 22" text-anchor="middle">{{ t[0] }}</text>
            <text v-for="t in yTicks" :key="t[0]" :x="PX1 + 10" :y="Y(t[1]) + 4">{{ t[0] }}</text>
            <text class="axis__title" :x="PX1" :y="PY1 + 42" text-anchor="end">Baseline, source to detector</text>
            <text class="axis__title" :x="W - 8" :y="PY0 - 8" text-anchor="end">Neutrino energy</text>
          </g>
        </svg>

        <button v-for="(p, i) in pins" :key="p.name" type="button" class="pin"
                :class="[`pin--${p.kind}`, { 'is-open': i === open, 'is-active': p.active }]"
                :style="{ left: p.left + '%', top: p.top + '%' }" :aria-pressed="i === open"
                @click="choose(i)">
          <i class="pin__mark" aria-hidden="true"></i>
          <span class="pin__tag">{{ p.name }}</span>
        </button>

      </div>
    </div>
    <article class="entry" aria-live="polite">
      <header class="entry__head">
        <span>{{ cur.src }}</span>
        <span class="chip" :class="{ 'chip--in': cur.active }">{{ sentence(cur.stLabel) }}</span>
      </header>
      <h3 class="entry__name">{{ cur.name }}</h3>
      <dl class="entry__cells notebook">
        <div><dt>Baseline</dt><dd class="num">{{ cur.baseline }}</dd></div>
        <div><dt>Energy</dt><dd class="num">{{ cur.energy }}</dd></div>
        <div class="wide"><dt>L/E</dt><dd class="num">{{ cur.le }} km/GeV</dd></div>
        <div class="wide"><dt>Note</dt><dd>{{ cur.note }}</dd></div>
      </dl>
      <footer class="entry__keys">
        <button type="button" class="key" @click="step(-1)">Back</button>
        <span class="entry__count num">{{ open + 1 }} of {{ pins.length }}</span>
        <button type="button" class="key" @click="step(1)">Next</button>
      </footer>
    </article>
    <figcaption id="map-cap" class="map-cap">
      Six experiments by baseline and typical energy, both on log scales. The thin lines run at
      constant L/E; the blue ones mark a first oscillation maximum.
    </figcaption>

  </figure>
</template>
