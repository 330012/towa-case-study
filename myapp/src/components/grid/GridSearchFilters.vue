<script setup lang="ts">
import { computed } from 'vue'

import Input from '@/components/ui/input/Input.vue'

const props = defineProps<{
	searchQuery: string
	selectedType: string
	availableTypes: string[]
}>()

const emit = defineEmits<{
	(e: 'update:searchQuery', value: string): void
	(e: 'update:selectedType', value: string): void
}>()

const searchValue = computed({
	get: () => props.searchQuery,
	set: (value: string) => emit('update:searchQuery', value),
})

const selectedValue = computed({
	get: () => props.selectedType,
	set: (value: string) => emit('update:selectedType', value),
})
</script>

<template>
	<section class="mb-10">
		<div
			class="relative w-full rounded-full border border-slate-200/80 bg-white px-6 py-0 shadow-none dark:border-slate-800/70 dark:bg-slate-900"
		>
			<div
				class="pointer-events-none absolute left-4 top-1/2 h-9 w-9 -translate-y-1/2 border-slate-200/80 bg-white shadow-none dark:border-slate-800/70 dark:bg-slate-900"
			/>
			<svg
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="pointer-events-none absolute left-[1.1rem] top-1/2 h-5 w-5 -translate-y-1/2 text-slate-700 dark:text-slate-200"
			>
				<circle cx="11" cy="11" r="8" />
				<path d="m21 21-4.3-4.3" />
			</svg>
			<Input
				v-model="searchValue"
				type="text"
				placeholder="Search 24 featured Pokemon..."
				class="border-0 bg-transparent ml-6 text-base text-slate-900 placeholder:text-slate-500 shadow-none focus:ring-0 dark:text-slate-100 dark:placeholder:text-slate-500"
			/>
		</div>
		<div class="mt-4 flex flex-wrap items-center gap-2">
			<button
				v-for="type in availableTypes"
				:key="type"
				class="rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors"
				:class="[
					type === selectedValue
						? 'border-amber-300/80 bg-amber-100 text-amber-900 dark:border-amber-700/70 dark:bg-amber-900/30 dark:text-amber-100'
						: 'border-slate-200/80 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900 dark:border-slate-800/70 dark:bg-slate-900 dark:text-slate-300 dark:hover:text-white',
				]"
				@click="selectedValue = type"
			>
				{{ type }}
			</button>
		</div>
	</section>
</template>
