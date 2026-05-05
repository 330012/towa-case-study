import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '@/App.vue'

describe('App', () => {
  it('renders header and footer', () => {
    const wrapper = mount(App)
    expect(wrapper.text()).toContain('TOWA')
    expect(wrapper.text()).toContain('Digital transformation end-to-end.')
  })
})
