<script setup lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import CardGrid from '@/components/grid/CardGrid.vue'
</script>

<template>
  <div class="flex min-h-screen flex-col bg-slate-50">
    <AppHeader />
    <main class="mx-auto w-full max-w-6xl flex-1 px-4 py-12 sm:px-6">
		<CardGrid />
    </main>
    <AppFooter />
  </div>
</template>
