<script setup lang="ts">
import { onMounted } from 'vue'

import { usePokemon } from '@/composables/usePokemon'
import CardItem from '@/components/grid/CardItem.vue'

// Composable state + actions
const { isLoading, error, searchQuery, filteredPokemon, fetchPokemon } = usePokemon()

// Fetch data on mount
onMounted(() => {
	void fetchPokemon()
})
</script>

<template>
	<!-- Section 1 — Page heading -->
	<section class="mb-8">
		<h1 class="text-3xl font-bold text-slate-800">Pokémon Explorer</h1>
		<p class="mt-2 text-slate-500">Discover your favourite Pokémon</p>
	</section>

	<!-- Section 2 — Search bar -->
	<section v-if="!isLoading && !error" class="mb-8">
		<input
			v-model="searchQuery"
			type="text"
			placeholder="Search Pokémon... (min. 3 characters)"
			class="w-full max-w-md rounded-xl border border-slate-200 px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
		/>
	</section>

	<!-- Section 3 — Loading state -->
	<section v-if="isLoading" class="py-12">
		<div class="flex flex-col items-center justify-center gap-3 text-slate-500">
			<div
				class="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-blue-500"
				aria-hidden="true"
			/>
			<p>Loading Pokémon...</p>
		</div>
	</section>

	<!-- Section 4 — Error state -->
	<section v-else-if="error" class="rounded-xl bg-red-50 p-4 text-red-600">
		<p>{{ error }}</p>
	</section>

	<!-- Section 5 — Empty state -->
	<section v-else-if="filteredPokemon.length === 0" class="py-12">
		<p class="text-center text-slate-400">No Pokémon found.</p>
	</section>

	<!-- Section 6 — Grid -->
	<section v-else>
		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
			<CardItem
				v-for="pokemon in filteredPokemon"
				:key="pokemon.id"
				:id="pokemon.id"
				:name="pokemon.name"
				:image="pokemon.image"
				:url="pokemon.url"
				:types="pokemon.types"
			/>
		</div>
	</section>
</template>

<style scoped></style>
