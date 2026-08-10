<script setup>
const yearsInField = new Date().getUTCFullYear() - 2002
</script>

<template>
  <div class="panel">
    <div class="panel-h">FIGURES OF MERIT</div>
    <div class="panel-b tiles">
      <div class="tile"><div class="v num">4<small>/7</small></div><div class="k">OSC. PARAMETERS MEASURED</div></div>
      <div class="tile"><div class="v num">{{ yearsInField }}<small>y</small></div><div class="k">IN NEUTRINO PHYSICS</div></div>
      <div class="tile"><div class="v num">6</div><div class="k">EXPERIMENTS SERVED</div></div>
      <div class="tile"><div class="v num">5.2<small>σ</small></div><div class="k">θ13 DISCOVERY IN 2012</div></div>
    </div>
  </div>
</template>
