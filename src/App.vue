<script setup>
import TopBar from './components/TopBar.vue'
import IdentityPanel from './components/IdentityPanel.vue'
import FiguresPanel from './components/FiguresPanel.vue'
import MessagesPanel from './components/MessagesPanel.vue'
import RndBench from './components/RndBench.vue'
import EventDisplay from './components/EventDisplay.vue'
import TabbedPane from './components/TabbedPane.vue'
import FootBar from './components/FootBar.vue'
</script>

<template>
  <div class="console">
    <TopBar />
    <div class="grid">
      <div class="stack">
        <IdentityPanel />
        <FiguresPanel />
        <MessagesPanel />
        <RndBench />
      </div>
      <div class="stack">
        <EventDisplay />
        <TabbedPane />
      </div>
    </div>
    <FootBar />
  </div>
</template>
