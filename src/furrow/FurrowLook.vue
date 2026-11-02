<script setup>
import { identity, messages, rndBench, hobbies, uplinks, phone } from '../content.js'
import { useEventDisplay, clusterColors, fmtK } from '../eventDisplay.js'
import LookSelect from '../components/LookSelect.vue'
import PaperPapers from '../paper/PaperPapers.vue'
import OscMap from './OscMap.vue'
import OscLegend from './OscLegend.vue'

const { canvas, events, cur, loading, meta, dragging, setEvent, onDown, onMove, onUp, onKey } = useEventDisplay()

const name = identity.name.split(' ').map(w => w[0] + w.slice(1).toLowerCase()).join(' ')
const yearsInField = new Date().getUTCFullYear() - 2002
const fieldLabel = { POST: 'Post', SITE: 'Office', PHD: 'PhD', BS: 'BS' }
const sentence = s => s.charAt(0) + s.slice(1).toLowerCase()
const cap = s => s.charAt(0).toUpperCase() + s.slice(1)
const fmtMonth = t => new Date(t + '-01T00:00:00Z')
  .toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' })
// the bench, marked with the map's pin shapes
const benchGlyph = ['diamond', 'disc', 'triangle']
</script>

<template>
  <a class="skip" href="#main">Skip to content</a>
  <header class="nav">
    <div class="container nav__in">
      <a class="nav__mark" href="#main">{{ name }}</a>
      <nav class="nav__links" aria-label="Sections">
        <a href="#map">Map</a>
        <a href="#bench">Bench</a>
        <a href="#papers">Papers</a>
        <a href="#off-shift">Off shift</a>
      </nav>
      <LookSelect />
    </div>
  </header>

  <main id="main">
    <section id="map" class="hero">
      <div class="container">
        <div class="hero__head">
          <h1>{{ name }}</h1>
          <div class="hero__side">
            <p class="lead">Senior Physicist at Brookhaven, working on neutrino oscillation and detectors.</p>
          </div>
        </div>
        <OscMap />
      </div>
    </section>

    <section class="sec legend-sec" aria-label="The six experiments on the map">
      <div class="container"><OscLegend /></div>
    </section>

    <section id="bench" class="sec bench">
      <div class="container bench__grid">
        <div class="bench__text">
          <h2>On the bench</h2>
          <ul class="ruled">
            <li v-for="(b, i) in rndBench" :key="b.name">
              <i class="glyph" :class="`glyph--${benchGlyph[i]}`" aria-hidden="true"></i>
              <span class="ruled__name">{{ b.name }}</span>
              <span class="ruled__note">{{ cap(b.note) }}</span>
            </li>
          </ul>
        </div>

        <figure class="evd">
          <div class="entry entry--evd">
            <header class="entry__head">
              <span>MicroBooNE LArTPC</span>
              <span>{{ loading ? 'Loading events…' : 'Drag to rotate' }}</span>
            </header>
            <canvas ref="canvas" class="evd__canvas" tabindex="0" role="img" :class="{ dragging }"
              aria-label="Interactive 3D display of a real MicroBooNE neutrino event. Drag or use arrow keys to rotate."
              @pointerdown="onDown" @pointermove="onMove" @pointerup="onUp" @keydown="onKey"></canvas>
            <dl class="entry__cells notebook">
              <div><dt>DAQ</dt><dd class="num">{{ meta.id }}</dd></div>
              <div><dt>Clusters</dt><dd class="num">{{ meta.nclus }}</dd></div>
              <div><dt>Hits</dt><dd class="num">{{ fmtK(meta.total) }}</dd></div>
              <div><dt>Drawn</dt><dd class="num">{{ fmtK(meta.n) }}</dd></div>
            </dl>
            <footer class="entry__keys entry__keys--events">
              <div class="keys" role="group" aria-label="Select event">
                <button v-for="(e, i) in events" :key="e.id" type="button" class="key" :aria-pressed="i === cur"
                        :title="'DAQ ' + e.id" @click="setEvent(i)">{{ i }}</button>
              </div>
              <p class="evd__legend">Colour is cluster
                <span class="cbar" aria-hidden="true"><i v-for="c in clusterColors" :key="c" :style="{ background: c }"></i></span>
              </p>
            </footer>
          </div>
          <figcaption class="evd__hint">
            Neutrino-beam events from the MicroBooNE detector, reconstructed by Wire-Cell imaging and
            exported from <a href="https://www.phy.bnl.gov/twister/bee/" rel="noopener">Bee</a>
            (set uboone/imaging/examples). Drag to spin the TPC. Can you find the neutrino interaction?
          </figcaption>
        </figure>
      </div>
    </section>

    <section class="field" aria-label="Figures and honours">
      <div class="container field__grid">
        <dl class="tally">
          <div><dt>Oscillation parameters measured</dt><dd class="num">4/7</dd></div>
          <div><dt>In neutrino physics</dt><dd class="num">{{ yearsInField }} years</dd></div>
          <div><dt>Experiments served</dt><dd class="num">6</dd></div>
          <div><dt>θ13 discovery in 2012</dt><dd class="num">5.2σ</dd></div>
        </dl>
        <ul class="honours">
          <li v-for="m in messages" :key="m.t + m.lvl">
            <span class="honours__meta"><time :datetime="m.t">{{ fmtMonth(m.t) }}</time>, {{ sentence(m.lvl).toLowerCase() }}</span>
            <span class="honours__body">{{ m.body }}</span>
          </li>
        </ul>
      </div>
    </section>

    <PaperPapers />

    <section id="off-shift" class="sec offshift">
      <div class="container">
        <h2>Off shift</h2>
        <div class="offshift__cols">
          <div v-for="h in hobbies" :key="h.name" class="offshift__col">
            <h3>{{ h.name }}</h3>
            <p>{{ h.note }}</p>
            <ul class="ruled ruled--links">
              <li v-for="l in h.links" :key="l.url"><a :href="l.url" rel="noopener">{{ l.label }}</a></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer class="foot">
    <div class="container foot__grid">
      <div>
        <p class="foot__mark">{{ name }}</p>
        <p class="foot__org">Electronic Detector Group, Physics Dept, Brookhaven National Laboratory</p>
        <dl class="foot__facts">
          <div v-for="[k, v] in identity.fields" :key="k"><dt>{{ fieldLabel[k] ?? k }}</dt><dd>{{ v }}</dd></div>
        </dl>
      </div>
      <ul class="ruled ruled--links foot__links">
        <li v-for="l in uplinks" :key="l.url"><a :href="l.url" rel="noopener">{{ l.label }}</a></li>
        <li class="num">{{ phone }}</li>
      </ul>
    </div>
    <div class="container"><p class="colophon">Vue 3, no backend, no tracking.</p></div>
  </footer>
</template>
