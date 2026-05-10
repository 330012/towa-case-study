<script setup lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import CardGrid from '@/components/grid/CardGrid.vue'
</script>

<template>
  <div
    class="relative min-h-screen overflow-hidden bg-[#fbf6ef] text-slate-900 dark:bg-slate-950 dark:text-slate-100"
  >
    <div
      class="pointer-events-none absolute -top-32 right-[-10%] h-72 w-72 rounded-full bg-amber-300/40 blur-3xl dark:bg-amber-500/20"
    />
    <div
      class="pointer-events-none absolute top-24 left-[-8%] h-80 w-80 rounded-full bg-cyan-300/30 blur-3xl dark:bg-cyan-500/20"
    />
    <div
      class="pointer-events-none absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-rose-300/30 blur-3xl dark:bg-rose-500/20"
    />

    <div class="relative z-10 flex min-h-screen flex-col">
      <AppHeader />
      <main class="mx-auto w-full max-w-6xl flex-1 px-4 py-14 sm:px-6">
        <CardGrid />
      </main>
      <AppFooter />
    </div>
  </div>
</template>
