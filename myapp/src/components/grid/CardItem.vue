<script setup lang="ts">
import { computed } from 'vue'

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
</script>

<template>
	<!-- Card wrapper (clickable) -->
	<a
		:href="url"
		target="_blank"
		rel="noopener noreferrer"
		class="block overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md"
	>
		<!-- Image section -->
		<div class="rounded-t-2xl bg-slate-100 py-6">
			<img
				:src="image"
				:alt="displayName"
				class="mx-auto h-32 w-32 object-contain"
				loading="lazy"
			/>
		</div>

		<!-- Content section -->
		<div class="px-5 pb-6 pt-4">
			<!-- Name -->
			<h3 class="text-lg font-semibold text-slate-800">
				{{ displayName }}
			</h3>

			<!-- Types -->
			<div class="mt-2 flex flex-wrap gap-2">
				<span
					v-for="type in types"
					:key="`${id}-${type}`"
					class="rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-600"
				>
					{{ type }}
				</span>
			</div>

			<!-- Short description -->
			<p class="mt-3 line-clamp-2 text-sm text-slate-500">Type: {{ typeText }}</p>
		</div>
	</a>
</template>

<style scoped></style>
