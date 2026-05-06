// Vue imports
import { computed, ref } from 'vue'

// Types
import type { ApiPokemon, ApiPokemonDetail, Pokemon } from '@/types/pokemon'

// Composable
export function usePokemon() {
	// State: data
	const pokemonList = ref<Pokemon[]>([])

	// State: request status
	const isLoading = ref(false)
	const error = ref<string | null>(null)

	// State: search
	const searchQuery = ref('')

	// Derived state: filtered list
	// - Name search filters only after 3+ characters
	// - Numeric search (id) filters immediately (e.g. "1", "02", "#7")
	const filteredPokemon = computed(() => {
		const rawQuery = searchQuery.value.trim().toLowerCase()
		if (!rawQuery) return pokemonList.value

		// Enhancement: numeric queries (e.g. "1", "#007") search by Pokémon ID immediately
		// without the 3-character minimum required for name search
		const maybeNumeric = rawQuery.startsWith('#') ? rawQuery.slice(1) : rawQuery
		if (/^[0-9]+$/.test(maybeNumeric)) {
			const parsed = parseInt(maybeNumeric, 10)
			const normalized = Number.isNaN(parsed) ? maybeNumeric : String(parsed)

			return pokemonList.value.filter((pokemon) => {
				const idStr = String(pokemon.id)
				const padded = idStr.padStart(3, '0')
				return idStr.startsWith(normalized) || padded.startsWith(normalized)
			})
		}

		if (rawQuery.length < 3) return pokemonList.value
		return pokemonList.value.filter((pokemon) => pokemon.name.toLowerCase().includes(rawQuery))
	})

	// Actions: fetch list + details from PokeAPI and map into app-friendly Pokemon model
	const fetchPokemon = async () => {
		isLoading.value = true
		error.value = null

		try {
			const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=24')
			if (!response.ok) {
				throw new Error(`Failed to fetch Pokémon list (HTTP ${response.status})`)
			}

			const listJson: { results: ApiPokemon[] } = await response.json()
			const results = listJson.results ?? []

			const mappedPokemon = await Promise.all(
				results.map(async (apiPokemon): Promise<Pokemon> => {
					const detailResponse = await fetch(apiPokemon.url)
					if (!detailResponse.ok) {
						throw new Error(
							`Failed to fetch Pokémon details for ${apiPokemon.name} (HTTP ${detailResponse.status})`,
						)
					}

					const detailJson: ApiPokemonDetail = await detailResponse.json()
					return {
						id: detailJson.id,
						name: detailJson.name,
						image: detailJson.sprites?.front_default ?? '',
						url: `https://www.pokemon.com/us/pokedex/${detailJson.name}`,
						types: (detailJson.types ?? []).map((t) => t.type.name),
					}
				}),
			)

			pokemonList.value = mappedPokemon
		} catch (err: unknown) {
			error.value = err instanceof Error ? err.message : 'An unknown error occurred'
		} finally {
			isLoading.value = false
		}
	}

	// Public API
	return {
		pokemonList,
		isLoading,
		error,
		searchQuery,
		filteredPokemon,
		fetchPokemon,
	}
}
