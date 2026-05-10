<script setup lang="ts">
const props = defineProps<{
  currentPage: number
  totalPages: number
}>()

const emit = defineEmits<{
  (e: 'setPage', page: number): void
}>()

const setPage = (page: number) => {
  emit('setPage', page)
}
</script>

<template>
  <div v-if="props.totalPages > 1" class="mt-10 flex flex-col items-center gap-4">
    <p class="text-sm text-slate-500 dark:text-slate-400">
      Page {{ props.currentPage }} of {{ props.totalPages }}
    </p>
    <div class="flex flex-wrap items-center justify-center gap-2">
      <button
        class="rounded-full border border-slate-200/80 bg-white/90 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800/70 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:bg-slate-800"
        :disabled="props.currentPage === 1"
        @click="setPage(props.currentPage - 1)"
      >
        Prev
      </button>
      <button
        v-for="page in props.totalPages"
        :key="page"
        class="h-10 w-10 rounded-full border text-sm font-semibold transition-colors"
        :class="[
          page === props.currentPage
            ? 'border-amber-300/80 bg-amber-100 text-amber-900 dark:border-amber-700/70 dark:bg-amber-900/30 dark:text-amber-100'
            : 'border-slate-200/80 bg-white/90 text-slate-700 hover:bg-slate-100 dark:border-slate-800/70 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:bg-slate-800',
        ]"
        @click="setPage(page)"
      >
        {{ page }}
      </button>
      <button
        class="rounded-full border border-slate-200/80 bg-white/90 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800/70 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:bg-slate-800"
        :disabled="props.currentPage === props.totalPages"
        @click="setPage(props.currentPage + 1)"
      >
        Next
      </button>
    </div>
  </div>
</template>
