<script setup>
import { useEventDisplay, clusterColors, fmtK } from '../eventDisplay.js'

const { canvas, events, cur, loading, meta, dragging, setEvent, onDown, onMove, onUp, onKey } = useEventDisplay()
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
        Neutrino-beam events from the MicroBooNE detector, reconstructed by Wire-Cell
        imaging and exported from <a href="https://www.phy.bnl.gov/twister/bee/" rel="noopener">Bee</a>. Drag to spin the TPC. Can you find the neutrino interaction?
      </span>
    </div>
  </div>
</template>
