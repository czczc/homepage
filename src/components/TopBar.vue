<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const clock = ref('--:--:--')
let timer
onMounted(() => {
  const tick = () => { clock.value = new Date().toISOString().slice(0, 19).replace('T', ' ') }
  tick()
  timer = setInterval(tick, 1000)
})
onUnmounted(() => clearInterval(timer))
</script>

<template>
  <div class="topbar">
    <div>
      <span class="sys">CZHANG // CONSOLE</span>
      <span class="sub">&nbsp; ELECTRONIC DETECTOR GROUP · PHYSICS DEPT · BROOKHAVEN NATIONAL LABORATORY</span>
    </div>
    <div style="display:flex; gap:26px; align-items:baseline">
      <span class="statuschip"><span class="dot"></span>TENURED / STABLE</span>
      <span class="clock num">{{ clock }} UTC</span>
    </div>
  </div>
</template>
