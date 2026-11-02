<script setup>
import { pins, selected, choose } from './mapState.js'
const sentence = s => s.charAt(0) + s.slice(1).toLowerCase()
</script>

<template>
  <table class="legend">
    <caption class="visually-hidden">The six experiments on the map</caption>
    <thead>
      <tr><th scope="col">Experiment</th><th scope="col">Source</th><th scope="col" class="r">Baseline</th><th scope="col" class="r">Energy</th><th scope="col">Status</th><th scope="col">Note</th></tr>
    </thead>
    <tbody>
      <tr v-for="(p, i) in pins" :key="p.name" :class="{ 'is-open': i === selected }">
        <th scope="row">
          <button type="button" class="legend__open" :class="`glyph--${p.kind}`" @click="choose(i)">{{ p.name }}</button>
        </th>
        <td data-label="Source">{{ p.src }}</td>
        <td data-label="Baseline" class="num r">{{ p.baseline }}</td>
        <td data-label="Energy" class="num r">{{ p.energy }}</td>
        <td data-label="Status"><span class="chip" :class="{ 'chip--in': p.active }">{{ sentence(p.stLabel) }}</span></td>
        <td class="note">{{ p.note }}</td>
      </tr>
    </tbody>
  </table>
</template>
