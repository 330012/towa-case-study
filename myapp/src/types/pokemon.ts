export interface Pokemon {
	id: number
	name: string
	image: string
	url: string
	types: string[]
}

export interface ApiPokemon {
	name: string
	url: string
}

export interface ApiPokemonDetail {
	id: number
	name: string
	sprites: {
		front_default: string
	}
	types: Array<{
		type: {
			name: string
		}
	}>
}
