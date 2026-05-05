import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import CardItem from '@/components/grid/CardItem.vue'

describe('CardItem component', () => {
	const mockProps = {
		id: 1,
		name: 'bulbasaur',
		image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
		url: 'https://pokeapi.co/api/v2/pokemon/1/',
		types: ['grass', 'poison'],
	}

	// Test 1 — Name formatting
	it('renders pokemon name with first letter capitalised', () => {
		const wrapper = mount(CardItem, { props: mockProps })
		expect(wrapper.text()).toContain('Bulbasaur')
	})

	// Test 2 — Types rendering
	it('renders correct number of type badges', () => {
		const wrapper = mount(CardItem, { props: mockProps })
		const badges = wrapper.findAll('.rounded-full')
		expect(badges).toHaveLength(2)
	})
})
