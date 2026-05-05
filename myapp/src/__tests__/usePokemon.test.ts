import { describe, expect, it } from 'vitest'

import { usePokemon } from '@/composables/usePokemon'

describe('usePokemon - search filtering', () => {
	const mockPokemonList = [
		{ id: 1, name: 'bulbasaur', image: '', url: '', types: ['grass', 'poison'] },
		{ id: 2, name: 'ivysaur', image: '', url: '', types: ['grass', 'poison'] },
		{ id: 3, name: 'venusaur', image: '', url: '', types: ['grass', 'poison'] },
		{ id: 4, name: 'charmander', image: '', url: '', types: ['fire'] },
		{ id: 5, name: 'squirtle', image: '', url: '', types: ['water'] },
	]

	// Group 1 — Boundary Value Analysis
	it('returns all pokemon when searchQuery is empty', () => {
		const { pokemonList, searchQuery, filteredPokemon } = usePokemon()
		pokemonList.value = mockPokemonList
		searchQuery.value = ''

		expect(filteredPokemon.value).toHaveLength(5)
	})

	it('returns all pokemon when searchQuery is 1 character', () => {
		const { pokemonList, searchQuery, filteredPokemon } = usePokemon()
		pokemonList.value = mockPokemonList
		searchQuery.value = 'b'

		expect(filteredPokemon.value).toHaveLength(5)
	})

	it('returns all pokemon when searchQuery is 2 characters', () => {
		const { pokemonList, searchQuery, filteredPokemon } = usePokemon()
		pokemonList.value = mockPokemonList
		searchQuery.value = 'bu'

		expect(filteredPokemon.value).toHaveLength(5)
	})

	it('filters correctly when searchQuery is exactly 3 characters', () => {
		const { pokemonList, searchQuery, filteredPokemon } = usePokemon()
		pokemonList.value = mockPokemonList
		searchQuery.value = 'bul'

		expect(filteredPokemon.value).toEqual([
			{ id: 1, name: 'bulbasaur', image: '', url: '', types: ['grass', 'poison'] },
		])
	})

	it('filters correctly when searchQuery is more than 3 characters', () => {
		const { pokemonList, searchQuery, filteredPokemon } = usePokemon()
		pokemonList.value = mockPokemonList
		searchQuery.value = 'charm'

		expect(filteredPokemon.value).toEqual([
			{ id: 4, name: 'charmander', image: '', url: '', types: ['fire'] },
		])
	})

	// Group 2 — Equivalence Partitioning
	it('returns multiple matches when query matches middle of name', () => {
		const { pokemonList, searchQuery, filteredPokemon } = usePokemon()
		pokemonList.value = mockPokemonList
		searchQuery.value = 'sau'

		expect(filteredPokemon.value).toHaveLength(3)
		expect(filteredPokemon.value.map((p) => p.name)).toEqual(['bulbasaur', 'ivysaur', 'venusaur'])
	})

	it('returns empty array when query matches nothing', () => {
		const { pokemonList, searchQuery, filteredPokemon } = usePokemon()
		pokemonList.value = mockPokemonList
		searchQuery.value = 'xyz'

		expect(filteredPokemon.value).toEqual([])
	})

	it('search is case insensitive', () => {
		const { pokemonList, searchQuery, filteredPokemon } = usePokemon()
		pokemonList.value = mockPokemonList
		searchQuery.value = 'BUL'

		expect(filteredPokemon.value).toHaveLength(1)
		expect(filteredPokemon.value[0]?.name).toBe('bulbasaur')
	})

	// Group 3 — Data Safety
	it('returns empty array when pokemonList is empty', () => {
		const { pokemonList, searchQuery, filteredPokemon } = usePokemon()
		pokemonList.value = []
		searchQuery.value = 'bul'

		expect(filteredPokemon.value).toEqual([])
	})

	it('handles pokemon with empty types array without error', () => {
		const { pokemonList, searchQuery, filteredPokemon } = usePokemon()
		pokemonList.value = [...mockPokemonList, { id: 6, name: 'mew', image: '', url: '', types: [] }]
		searchQuery.value = 'mew'

		expect(filteredPokemon.value).toHaveLength(1)
		expect(filteredPokemon.value[0]?.name).toBe('mew')
	})
})
