<script setup>
import { channels } from '../content.js'

const activeCount = channels.filter(c => c.st !== 'done').length
</script>

<template>
  <div class="panel">
    <div class="panel-h">CHANNELS — EXPERIMENTS <span class="tag">{{ activeCount }} active</span></div>
    <div class="chan-scroll">
      <table>
        <thead><tr><th>EXPT</th><th>SOURCE</th><th>BASELINE</th><th>STATUS</th><th>NOTE</th></tr></thead>
        <tbody>
          <tr v-for="c in channels" :key="c.name">
            <td class="exp">{{ c.name }}</td>
            <td>{{ c.src }}</td>
            <td class="num">{{ c.baseline }}</td>
            <td><span class="pill" :class="c.st"><i></i>{{ c.stLabel }}</span></td>
            <td class="note">{{ c.note }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
