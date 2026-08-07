<script setup>
import { rndBench } from '../content.js'
</script>

<template>
  <div class="panel">
    <div class="panel-h">R&amp;D BENCH</div>
    <ul class="panel-b bench">
      <li v-for="b in rndBench" :key="b.name">
        <span class="b-name">{{ b.name }}</span>
        <span class="b-note">{{ b.note }}</span>
      </li>
    </ul>
  </div>
</template>
