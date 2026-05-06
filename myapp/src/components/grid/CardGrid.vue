<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'

import { usePokemon } from '@/composables/usePokemon'
import CardItem from '@/components/grid/CardItem.vue'
import GridHero from '@/components/grid/GridHero.vue'
import GridSearchFilters from '@/components/grid/GridSearchFilters.vue'
import GridLoading from '@/components/grid/GridLoading.vue'
import GridPagination from '@/components/grid/GridPagination.vue'

// Composable state + actions
const { isLoading, error, searchQuery, filteredPokemon, fetchPokemon } = usePokemon()

const pageSize = 9
const currentPage = ref(1)
const selectedType = ref('All')

const availableTypes = computed(() => {
	const types = new Set<string>()
	filteredPokemon.value.forEach((pokemon) => {
		pokemon.types.forEach((type) => types.add(type))
	})
	return ['All', ...Array.from(types).sort((a, b) => a.localeCompare(b))]
})

const visiblePokemon = computed(() => {
	if (selectedType.value === 'All') return filteredPokemon.value
	const target = selectedType.value.toLowerCase()
	return filteredPokemon.value.filter((pokemon) =>
		pokemon.types.some((type) => type.toLowerCase() === target),
	)
})

const totalPages = computed(() => Math.max(1, Math.ceil(visiblePokemon.value.length / pageSize)))
const pagedPokemon = computed(() => {
	const start = (currentPage.value - 1) * pageSize
	return visiblePokemon.value.slice(start, start + pageSize)
})

const setPage = (page: number) => {
	currentPage.value = Math.min(Math.max(page, 1), totalPages.value)
}

watch([searchQuery, selectedType], () => {
	currentPage.value = 1
})

// Fetch data on mount
onMounted(() => {
	void fetchPokemon()
})
</script>
<template>
	<GridHero />

	<GridSearchFilters
		v-if="!isLoading && !error"
		v-model:searchQuery="searchQuery"
		v-model:selectedType="selectedType"
		:availableTypes="availableTypes"
	/>

	<GridLoading v-if="isLoading" />

	<!-- Section 4 — Error state -->
	<section
		v-else-if="error"
		class="rounded-2xl border border-red-200 bg-red-50/80 p-4 text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-200"
	>
		<p>{{ error }}</p>
	</section>

	<!-- Section 5 — Empty state -->
	<section v-else-if="visiblePokemon.length === 0" class="py-12">
		<p class="text-center text-slate-400 dark:text-slate-500">No Pokémon found.</p>
	</section>

	<!-- Section 6 — Grid -->
	<section v-else>
		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
			<CardItem
				v-for="pokemon in pagedPokemon"
				:key="pokemon.id"
				:id="pokemon.id"
				:name="pokemon.name"
				:image="pokemon.image"
				:url="pokemon.url"
				:types="pokemon.types"
			/>
		</div>

		<GridPagination :currentPage="currentPage" :totalPages="totalPages" @setPage="setPage" />
	</section>
</template>

<style scoped></style>
