<script setup>
import { look, LOOKS, setLook } from '../look.js'
</script>

<template>
  <label class="look-select">
    <span class="look-select__lbl">Theme</span>
    <select :value="look" @change="setLook($event.target.value)">
      <option v-for="(l, id) in LOOKS" :key="id" :value="id">{{ l.label }}</option>
    </select>
  </label>
</template>
