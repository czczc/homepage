<script setup>
import { messages } from '../content.js'
</script>

<template>
  <div class="panel">
    <div class="panel-h">MESSAGES <span class="tag">{{ messages.length }} unread, kept forever</span></div>
    <div class="panel-b">
      <div v-for="m in messages" :key="m.t + m.lvl" class="msg">
        <span class="t num">{{ m.t }}</span><span class="lvl">{{ m.lvl }}</span>
        <span class="body">{{ m.body }}</span>
      </div>
    </div>
  </div>
</template>
