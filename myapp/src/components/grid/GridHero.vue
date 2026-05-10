<script setup lang="ts">
import Badge from '@/components/ui/badge/Badge.vue'
</script>

<template>
  <section class="mb-10">
    <Badge class="border-emerald-200/70 bg-emerald-100/80 text-emerald-800"> Live Pokedex </Badge>
    <h1 class="mt-4 text-4xl font-semibold sm:text-5xl">
      <span class="font-display">The Atlas</span> of Wonder
    </h1>
    <p class="mt-3 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
      Discover iconic Pokemon with curated highlights, spotlighted types, and a fast search that
      feels like flipping a collector's journal.
    </p>
    <div class="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
      <div class="flex items-center gap-2">
        <span class="text-base font-semibold text-slate-900 dark:text-white">24</span>
        Featured
      </div>
    </div>
  </section>
</template>
