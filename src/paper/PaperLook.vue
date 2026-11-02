<script setup>
import LookSelect from '../components/LookSelect.vue'
import { identity, messages, rndBench, channels, hobbies, uplinks, phone } from '../content.js'
import PaperHero from './PaperHero.vue'
import PaperPapers from './PaperPapers.vue'

const yearsInField = new Date().getUTCFullYear() - 2002
const fieldLabel = { POST: 'Post', SITE: 'Office', PHD: 'PhD', BS: 'BS' }
const sentence = s => s.charAt(0) + s.slice(1).toLowerCase()
const cap = s => s.charAt(0).toUpperCase() + s.slice(1)
const active = channels.filter(c => c.st !== 'done').length
const fmtMonth = t => new Date(t + '-01T00:00:00Z')
  .toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' })

// baseline ruler: log10 metres, 1 m at the left edge
const DECADES = 6.5
const pos = m => (Math.log10(m) / DECADES) * 100
const ticks = [['1 m', 1], ['10 m', 10], ['100 m', 100], ['1 km', 1e3], ['10 km', 1e4], ['100 km', 1e5], ['1000 km', 1e6]]
const marks = channels.map(c => {
  const [, lo, hi, unit] = c.baseline.match(/([\d.]+)(?:-([\d.]+))?\s*(km|m)/)
  const f = unit === 'km' ? 1000 : 1
  const a = pos(+lo * f), b = pos(+(hi ?? lo) * f)
  return { name: c.name, left: a, width: b - a, active: c.st !== 'done' }
})
const rulerLabel = 'Baselines on a logarithmic scale: ' +
  channels.map(c => `${c.name} ${c.baseline}`).join(', ') + '.'

</script>

<template>
  <a class="skip" href="#main">Skip to content</a>
  <header class="nav">
    <div class="container nav__in">
      <p class="nav__org"><span class="nav__group">Electronic Detector Group, Physics Dept, </span>Brookhaven National Laboratory</p>
      <nav class="nav__links" aria-label="Sections">
        <a href="#research">Research</a>
        <a href="#experiments">Experiments</a>
        <a href="#papers">Papers</a>
        <a href="#off-shift">Off shift</a>
      </nav>
      <LookSelect />
    </div>
  </header>

  <main id="main">
    <PaperHero />

    <section id="research" class="sec sec--research">
      <div class="container research">
        <div class="research__head opens">
          <h2>On the bench</h2>
          <dl class="facts">
            <div v-for="[k, v] in identity.fields" :key="k"><dt>{{ fieldLabel[k] ?? k }}</dt><dd>{{ v }}</dd></div>
          </dl>
        </div>
        <ul class="rows opens">
          <li v-for="b in rndBench" :key="b.name">
            <h3>{{ b.name }}</h3>
            <p>{{ cap(b.note) }}</p>
          </li>
        </ul>
      </div>
    </section>

    <section id="experiments" class="sec sec--experiments">
      <div class="container">
        <div class="head-split opens">
          <h2>Six experiments, 7 m to 1300 km</h2>
          <p class="lead">Reactor antineutrinos and neutrino beams; {{ active }} of {{ channels.length }} still active.</p>
        </div>

        <div class="ruler-scroll">
          <figure class="ruler chart" role="img" :aria-label="rulerLabel">
            <div class="ruler__track">
              <span v-for="t in ticks" :key="t[0]" class="ruler__tick num" :style="{ left: pos(t[1]) + '%' }">{{ t[0] }}</span>
              <span v-for="m in marks" :key="m.name" class="ruler__mark" :class="{ 'is-active': m.active }"
                    :style="{ left: m.left + '%', '--w': m.width + '%' }"><b>{{ m.name }}</b></span>
            </div>
            <figcaption>Source to detector, log scale</figcaption>
          </figure>
        </div>

        <div class="table-wrap">
          <table class="xp">
            <thead>
              <tr><th scope="col">Experiment</th><th scope="col">Source</th><th scope="col" class="r">Baseline</th><th scope="col">Status</th><th scope="col">Note</th></tr>
            </thead>
            <tbody>
              <tr v-for="c in channels" :key="c.name" :class="{ 'is-active': c.st !== 'done' }">
                <th scope="row">{{ c.name }}</th>
                <td data-label="Source">{{ c.src }}</td>
                <td data-label="Baseline" class="num r">{{ c.baseline }}</td>
                <td data-label="Status"><span class="status" :class="c.st">{{ sentence(c.stLabel) }}</span></td>
                <td class="note">{{ c.note }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <section class="band" aria-label="Figures and honours">
      <div class="container">
        <dl class="figs">
          <div><dt>Oscillation parameters measured</dt><dd class="num">4<small>/7</small></dd></div>
          <div><dt>In neutrino physics</dt><dd class="num">{{ yearsInField }}<small> years</small></dd></div>
          <div><dt>Experiments served</dt><dd class="num">6</dd></div>
          <div><dt>θ13 discovery in 2012</dt><dd class="num">5.2<small>σ</small></dd></div>
        </dl>
        <ul class="honours">
          <li v-for="m in messages" :key="m.t + m.lvl">
            <time :datetime="m.t">{{ fmtMonth(m.t) }}</time>
            <span class="honours__kind">{{ sentence(m.lvl) }}</span>
            <span class="honours__body">{{ m.body }}</span>
          </li>
        </ul>
      </div>
    </section>

    <PaperPapers />

    <section id="off-shift" class="sec well">
      <div class="container">
        <h2>Off shift</h2>
        <ul class="hobbies">
          <li v-for="h in hobbies" :key="h.name">
            <h3>{{ h.name }}</h3>
            <p>{{ h.note }}</p>
            <ul class="hobbies__links">
              <li v-for="l in h.links" :key="l.url"><a :href="l.url" rel="noopener">{{ l.label }}</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </section>
  </main>

  <footer class="close">
    <div class="container">
      <div class="close__cols opens">
        <ul class="close__links">
          <li v-for="l in uplinks" :key="l.url"><a :href="l.url" rel="noopener">{{ l.label }}</a></li>
          <li class="num">{{ phone }}</li>
        </ul>
        <p class="close__sign">Chao Zhang<br>Upton, New York</p>
      </div>
      <p class="colophon">Vue 3, no backend, no tracking.</p>
    </div>
  </footer>
</template>
