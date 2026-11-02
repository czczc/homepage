<script setup>
import { ref, computed } from 'vue'
import { publications } from '../content.js'

const all = publications.selected
const tabs = [
  { id: 'all', label: 'All' },
  { id: 'reactor', label: 'Reactor' },
  { id: 'argon', label: 'Liquid argon' },
  { id: 'methods', label: 'Methods' },
].map(t => ({ ...t, n: t.id === 'all' ? all.length : all.filter(p => p.topic === t.id).length }))

const cur = ref('all')
const shown = computed(() => (cur.value === 'all' ? all : all.filter(p => p.topic === cur.value)))
// the console keeps its arrow; here the label stands alone
const moreLabel = publications.fullList.label.replace(/\s*→\s*$/, '')
const years = `${all[all.length - 1].y} to ${all[0].y}`

const tabEls = ref([])
function onKey(e, i) {
  const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
  if (!d) return
  e.preventDefault()
  const j = (i + d + tabs.length) % tabs.length
  cur.value = tabs[j].id
  tabEls.value[j]?.focus()
}
</script>

<template>
  <section id="papers" class="sec papers">
    <div class="container">
      <div class="head-split opens">
        <h2>Selected papers, {{ years }}</h2>
        <div class="seg seg--tabs" role="tablist" aria-label="Filter papers by topic">
          <button v-for="(t, i) in tabs" :key="t.id" ref="tabEls" type="button" role="tab"
                  :id="'tab-' + t.id" aria-controls="paper-list"
                  :aria-selected="cur === t.id" :tabindex="cur === t.id ? 0 : -1"
                  @click="cur = t.id" @keydown="onKey($event, i)">
            {{ t.label }} <span class="seg__n num">{{ t.n }}</span>
          </button>
        </div>
      </div>

      <ol id="paper-list" class="index" role="tabpanel" :aria-labelledby="'tab-' + cur">
        <li v-for="p in shown" :key="p.doi">
          <span class="index__y num">{{ p.y }}</span>
          <a class="index__t" :href="'https://doi.org/' + p.doi" rel="noopener">{{ p.title }}</a>
          <span class="index__v">{{ p.venue }}</span>
        </li>
      </ol>

      <p class="papers__more"><a :href="publications.fullList.url" rel="noopener">{{ moreLabel }}</a></p>
    </div>
  </section>
</template>
