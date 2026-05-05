import { beforeEach, describe, expect, it, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import { nextTick } from 'vue'

import CardGrid from '@/components/grid/CardGrid.vue'

describe('CardGrid - search integration', () => {
	beforeEach(() => {
		// Step 1: Stub global fetch
		const fetchMock = vi
			.fn()
			// First call: PokeAPI list response
			.mockResolvedValueOnce({
				ok: true,
				json: async () => ({
					results: [
						{ name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
						{ name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
					],
				}),
			})
			// Second call: bulbasaur detail
			.mockResolvedValueOnce({
				ok: true,
				json: async () => ({
					id: 1,
					name: 'bulbasaur',
					sprites: { front_default: '' },
					types: [{ type: { name: 'grass' } }],
				}),
			})
			// Third call: charmander detail
			.mockResolvedValueOnce({
				ok: true,
				json: async () => ({
					id: 4,
					name: 'charmander',
					sprites: { front_default: '' },
					types: [{ type: { name: 'fire' } }],
				}),
			})

		vi.stubGlobal('fetch', fetchMock)
	})

	it('filters grid cards when user types 3+ characters in search input', async () => {
		// Step 2: Mount CardGrid
		const wrapper = mount(CardGrid)

		// Step 3: Wait for API calls to resolve
		await flushPromises()
		await nextTick()

		// Step 4: Type into the search input
		const input = wrapper.get('input')
		await input.setValue('bul')

		// Step 5: Wait for computed + DOM update
		await nextTick()

		// Step 6: Assert only one card is visible
		const cards = wrapper.findAll('a')
		expect(cards).toHaveLength(1)

		// Step 7: Assert correct content
		expect(wrapper.text()).toContain('Bulbasaur')
		expect(wrapper.text()).not.toContain('Charmander')
	})
})
