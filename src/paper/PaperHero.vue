<script setup>
import { useEventDisplay, clusterColors, fmtK } from '../eventDisplay.js'
import { identity, uplinks } from '../content.js'

const { canvas, events, cur, loading, meta, dragging, setEvent, onDown, onMove, onUp, onKey } = useEventDisplay()
const name = identity.name.split(' ').map(w => w[0] + w.slice(1).toLowerCase())
const email = uplinks.find(l => l.url.startsWith('mailto:'))
</script>

<template>
  <section class="hero">
    <div class="container hero__grid">
      <div class="hero__text">
        <h1><span v-for="w in name" :key="w">{{ w }}</span></h1>
        <p class="lead">Senior Physicist at Brookhaven, working on neutrino oscillation and detectors.</p>
        <div class="actions">
          <a class="btn" :href="email.url">Email me</a>
          <a class="btn btn--quiet" href="#papers">Selected papers</a>
        </div>
      </div>

      <figure class="evd">
        <div class="evd__plate">
          <canvas ref="canvas" class="evd__canvas" tabindex="0" role="img" :class="{ dragging }"
            aria-label="Interactive 3D display of a real MicroBooNE neutrino event. Drag or use arrow keys to rotate."
            @pointerdown="onDown" @pointermove="onMove" @pointerup="onUp" @keydown="onKey"></canvas>
          <p class="evd__hud evd__hud--top">
            <span>Set uboone/imaging/examples</span>
            <span>{{ loading ? 'Loading events…' : 'Drag to rotate' }}</span>
          </p>
          <dl class="evd__hud evd__read">
            <div><dt>DAQ</dt><dd class="num">{{ meta.id }}</dd></div>
            <div><dt>Clusters</dt><dd class="num">{{ meta.nclus }}</dd></div>
            <div><dt>Hits</dt><dd class="num">{{ fmtK(meta.total) }} ({{ fmtK(meta.n) }} drawn)</dd></div>
          </dl>
        </div>
        <figcaption class="evd__cap">
          <div class="evd__controls">
            <div class="seg" role="group" aria-label="Select event">
              <span class="seg__lbl">Event</span>
              <button v-for="(e, i) in events" :key="e.id" type="button" :aria-pressed="i === cur"
                      :title="'DAQ ' + e.id" @click="setEvent(i)">{{ i }}</button>
            </div>
            <p class="evd__legend">Colour is cluster
              <span class="cbar" aria-hidden="true"><i v-for="c in clusterColors" :key="c" :style="{ background: c }"></i></span>
            </p>
          </div>
          <p class="evd__hint">
            Neutrino-beam events from the MicroBooNE detector, reconstructed by Wire-Cell
            imaging and exported from <a href="https://www.phy.bnl.gov/twister/bee/" rel="noopener">Bee</a>. Drag to spin the TPC. Can you find the neutrino interaction?
          </p>
        </figcaption>
      </figure>
    </div>
  </section>
</template>
