<script setup>
import { projects } from '../content.js'
</script>

<template>
  <div class="panel">
    <div class="panel-h">WEB CONSTRUCTS <span class="tag">things I built for the browser</span></div>
    <div class="panel-b">
      <div v-for="p in projects" :key="p.name" class="proj">
        <span class="name"><a :href="p.url" rel="noopener">{{ p.name }}</a></span>
        <span class="stack-tag">{{ p.stack }}</span>
        <span class="note">{{ p.note }}</span>
      </div>
    </div>
  </div>
</template>
