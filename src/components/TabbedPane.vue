<script setup>
import { ref, computed } from 'vue'
import { channels, publications, hobbies } from '../content.js'

const activeCount = channels.filter(c => c.st !== 'done').length

const tabs = [
  { id: 'experiments',  label: 'EXPERIMENTS',  tag: `${activeCount} active` },
  { id: 'publications', label: 'SELECTED PUBLICATIONS', tag: `${publications.selected.length} shown` },
  { id: 'hobbies',      label: 'HOBBIES',      tag: 'off-shift channels, links included' },
]
const cur = ref('experiments')
const curTab = computed(() => tabs.find(t => t.id === cur.value))
</script>

<template>
  <div class="panel">
    <div class="panel-h tabbar" role="tablist" aria-label="Sections">
      <button v-for="t in tabs" :key="t.id" class="tab-btn" role="tab"
              :aria-selected="cur === t.id" :class="{ on: cur === t.id }"
              @click="cur = t.id">{{ t.label }}</button>
      <span class="tag">{{ curTab.tag }}</span>
    </div>

    <!-- EXPERIMENTS -->
    <div v-if="cur === 'experiments'" class="chan-scroll" role="tabpanel">
      <table>
        <thead><tr><th>EXPT</th><th>SOURCE</th><th>BASELINE</th><th>STATUS</th><th>NOTE</th></tr></thead>
        <tbody>
          <tr v-for="c in channels" :key="c.name">
            <td class="exp">{{ c.name }}</td>
            <td>{{ c.src }}</td>
            <td class="num">{{ c.baseline }}</td>
            <td><span class="pill" :class="c.st"><i></i>{{ c.stLabel }}</span></td>
            <td class="note">{{ c.note }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- PUBLICATIONS -->
    <div v-else-if="cur === 'publications'" class="panel-b" role="tabpanel">
      <div v-for="p in publications.selected" :key="p.doi" class="pub">
        <span class="y num">{{ p.y }}</span>
        <span class="venue">{{ p.venue }}</span>
        <span class="title"><a :href="'https://doi.org/' + p.doi" rel="noopener">{{ p.title }}</a></span>
      </div>
      <div class="pub-foot">
        <a :href="publications.fullList.url" rel="noopener">{{ publications.fullList.label }}</a>
      </div>
    </div>

    <!-- HOBBIES -->
    <div v-else class="panel-b" role="tabpanel">
      <div v-for="h in hobbies" :key="h.name" class="hob">
        <span class="h-name">{{ h.name }}</span>
        <span class="h-body">
          {{ h.note }}
          <template v-for="(l, i) in h.links" :key="l.url">
            <a :href="l.url" rel="noopener">{{ l.label }}</a><template v-if="i < h.links.length - 1"> · </template>
          </template>
        </span>
      </div>
    </div>
  </div>
</template>
