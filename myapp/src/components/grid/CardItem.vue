<script setup lang="ts">
import { computed } from 'vue'

import Badge from '@/components/ui/badge/Badge.vue'
import Card from '@/components/ui/card/Card.vue'

// Props
const props = defineProps<{
  id: number
  name: string
  image: string
  url: string
  types: string[]
}>()

// Derived display values
const displayName = computed(() => {
  const name = props.name?.trim() ?? ''
  if (!name) return ''
  return name.charAt(0).toUpperCase() + name.slice(1)
})

const typeText = computed(() => props.types.join(' / '))

const idLabel = computed(() => String(props.id).padStart(3, '0'))

const typeStyles: Record<string, string> = {
  fire: 'border-rose-200/70 bg-rose-100 text-rose-800 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-200',
  water:
    'border-sky-200/70 bg-sky-100 text-sky-800 dark:border-sky-900/60 dark:bg-sky-950/40 dark:text-sky-200',
  grass:
    'border-emerald-200/70 bg-emerald-100 text-emerald-800 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-200',
  electric:
    'border-amber-200/70 bg-amber-100 text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-200',
  psychic:
    'border-fuchsia-200/70 bg-fuchsia-100 text-fuchsia-800 dark:border-fuchsia-900/60 dark:bg-fuchsia-950/40 dark:text-fuchsia-200',
  ice: 'border-cyan-200/70 bg-cyan-100 text-cyan-800 dark:border-cyan-900/60 dark:bg-cyan-950/40 dark:text-cyan-200',
  dragon:
    'border-indigo-200/70 bg-indigo-100 text-indigo-800 dark:border-indigo-900/60 dark:bg-indigo-950/40 dark:text-indigo-200',
  dark: 'border-slate-300/70 bg-slate-200 text-slate-800 dark:border-slate-700/60 dark:bg-slate-800 dark:text-slate-100',
  fairy:
    'border-pink-200/70 bg-pink-100 text-pink-800 dark:border-pink-900/60 dark:bg-pink-950/40 dark:text-pink-200',
}

const getTypeClass = (type: string) =>
  typeStyles[type.toLowerCase()] ??
  'border-slate-200/70 bg-slate-100 text-slate-700 dark:border-slate-800/70 dark:bg-slate-900 dark:text-slate-200'
</script>

<template>
  <!-- Card wrapper (clickable) -->
  <a
    :href="url"
    target="_blank"
    rel="noopener noreferrer"
    class="group block transition-transform duration-300 hover:-translate-y-2"
  >
    <Card
      class="border-transparent shadow-[0_20px_40px_-28px_rgba(15,23,42,0.45)] transition-shadow duration-300 hover:border-amber-200/70 hover:shadow-[0_24px_50px_-26px_rgba(249,115,22,0.35)]"
    >
      <!-- Image section -->
      <div
        class="rounded-t-3xl bg-gradient-to-br from-amber-50 via-rose-50 to-cyan-50 py-6 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800"
      >
        <img
          :src="image"
          :alt="displayName"
          class="mx-auto h-32 w-32 object-contain transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
      </div>

      <!-- Content section -->
      <div class="px-5 pb-6 pt-4">
        <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          No. {{ idLabel }}
        </p>
        <!-- Name -->
        <h3 class="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
          {{ displayName }}
        </h3>

        <!-- Types -->
        <div class="mt-3 flex flex-wrap gap-2">
          <Badge v-for="type in types" :key="`${id}-${type}`" :class="getTypeClass(type)">
            {{ type }}
          </Badge>
        </div>

        <!-- Short description -->
        <p class="mt-3 line-clamp-2 text-sm text-slate-500 dark:text-slate-400">
          Type: {{ typeText }}
        </p>
      </div>
    </Card>
  </a>
</template>

<style scoped></style>
