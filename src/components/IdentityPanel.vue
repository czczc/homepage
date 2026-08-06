<script setup>
import { identity } from '../content.js'
</script>

<template>
  <div class="panel">
    <div class="panel-h">IDENTITY <span class="tag">/etc/whoami</span></div>
    <div class="panel-b">
      <div class="id-name">{{ identity.name }}</div>
      <div class="id-cn">{{ identity.tagline }}</div>
      <dl class="kv">
        <template v-for="[k, v] in identity.fields" :key="k">
          <dt>{{ k }}</dt><dd class="num">{{ v }}</dd>
        </template>
      </dl>
    </div>
  </div>
</template>
