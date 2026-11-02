import { ref } from 'vue'
import consoleCss from './style.css?inline'
import paperCss from './paper/paper.css?inline'
import cobaltCss from './cobalt/cobalt.css?inline'
import furrowCss from './furrow/furrow.css?inline'

// Each look is one stylesheet. They all set global rules (body, a, table…), so only
// the active one is in the document. Paper and Cobalt share the markup in src/paper/;
// Furrow and the Control room have their own components.
export const LOOKS = {
  paper:   { label: 'Paper',        layout: 'page',    css: paperCss,   scheme: 'light', title: 'Chao Zhang, Brookhaven National Laboratory' },
  cobalt:  { label: 'Cobalt',       layout: 'page',    css: cobaltCss,  scheme: 'light', title: 'Chao Zhang, Brookhaven National Laboratory' },
  furrow:  { label: 'Furrow',       layout: 'furrow',  css: furrowCss,  scheme: 'light', title: 'Chao Zhang, Brookhaven National Laboratory' },
  console: { label: 'Control room', layout: 'console', css: consoleCss, scheme: 'dark',  title: 'Chao Zhang · Control Room' },
}

function initial() {
  const q = new URLSearchParams(location.search).get('look')
  if (q in LOOKS) return q
  try { const s = localStorage.getItem('look'); if (s in LOOKS) return s } catch {}
  return 'furrow'
}

const styleEl = document.createElement('style')
styleEl.id = 'look-css'
document.head.append(styleEl)

export const look = ref(initial())

function apply(name) {
  const l = LOOKS[name]
  styleEl.textContent = l.css
  document.documentElement.dataset.look = name
  document.querySelector('meta[name="color-scheme"]')?.setAttribute('content', l.scheme)
  document.title = l.title
}
apply(look.value)

export function setLook(name) {
  if (!(name in LOOKS) || name === look.value) return
  const relayout = LOOKS[name].layout !== LOOKS[look.value].layout
  look.value = name
  apply(name)
  try { localStorage.setItem('look', name) } catch {}
  if (relayout) scrollTo(0, 0)
}
