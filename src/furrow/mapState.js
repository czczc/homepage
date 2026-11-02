import { ref, computed } from 'vue'
import { channels } from '../content.js'

// Shared by the map and its legend table, so a pin and a row open the same experiment.
// Geometry: log baseline (x) against log energy (y). With L in metres and E in MeV,
// L/E reads directly in km/GeV, so every line of constant L/E is x − y = c.
export const W = 1312, H = 600
export const PX0 = 24, PX1 = W - 88, PY0 = 24, PY1 = H - 52
export const LX = [-0.3, 6.5]   // log10 metres: 0.5 m .. ~3000 km
export const LY = [0, 4.4]      // log10 MeV: 1 MeV .. ~25 GeV
export const X = l => PX0 + ((l - LX[0]) / (LX[1] - LX[0])) * (PX1 - PX0)
export const Y = e => PY1 - ((e - LY[0]) / (LY[1] - LY[0])) * (PY1 - PY0)
const toMetres = b => {
  const [, lo, hi, unit] = b.match(/([\d.]+)(?:-([\d.]+))?\s*(km|m)/)
  const f = unit === 'km' ? 1000 : 1
  return [+lo * f, +(hi ?? lo) * f]
}
const le = (m, e) => +(m / e).toPrecision(2)
const fmtNum = n => n.toLocaleString('en-US')
export const pins = channels.map(c => {
  const [a, b] = toMetres(c.baseline)
  const mid = Math.sqrt(a * b)
  const ey = Math.log10(c.eMeV)
  return {
    ...c,
    kind: c.src.includes('reactor') ? 'disc' : 'diamond',
    active: c.st !== 'done',
    left: (X(Math.log10(mid)) / W) * 100,
    top: (Y(ey) / H) * 100,
    span: a !== b ? { x1: X(Math.log10(a)), x2: X(Math.log10(b)), y: Y(ey) } : null,
    le: a !== b ? `${fmtNum(le(a, c.eMeV))} to ${fmtNum(le(b, c.eMeV))}` : fmtNum(le(a, c.eMeV)),
  }
})

export const selected = ref(pins.findIndex(p => p.name === 'Daya Bay'))
export const current = computed(() => pins[selected.value])
export const choose = i => { selected.value = i }
export const step = d => { selected.value = (selected.value + d + pins.length) % pins.length }
