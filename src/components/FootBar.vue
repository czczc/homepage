<script setup>
import { uplinks, phone } from '../content.js'
import LookSelect from './LookSelect.vue'
</script>

<template>
  <div class="footbar">
    <span>UPLINKS:</span>
    <span class="links">
      <a v-for="l in uplinks" :key="l.url" :href="l.url" rel="noopener">{{ l.label }}</a>
      <span class="num">{{ phone }}</span>
    </span>
    <span style="margin-left:auto">VUE 3 · NO BACKEND · NO TRACKING</span>
    <LookSelect />
  </div>
</template>
