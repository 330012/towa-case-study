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

	// Derived state: filtered list (filters only after 3+ characters)
	const filteredPokemon = computed(() => {
		const query = searchQuery.value.trim().toLowerCase()
		if (query.length < 3) return pokemonList.value

		return pokemonList.value.filter((pokemon) => pokemon.name.toLowerCase().includes(query))
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
						url: apiPokemon.url,
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
