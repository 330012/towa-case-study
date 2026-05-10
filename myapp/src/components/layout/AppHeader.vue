<script setup lang="ts">
import { onMounted, ref } from 'vue'

import Button from '@/components/ui/button/Button.vue'

// Navigation data
const navItems = [
  { label: 'Home', href: '#' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
] as const

// Active link (dummy navigation; no router in this project)
const activeLabel: (typeof navItems)[number]['label'] = 'Home'

// Mobile navigation state
const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

// Theme (light/dark)
type ThemeMode = 'light' | 'dark'
const THEME_STORAGE_KEY = 'towa-theme'

const getInitialTheme = (): ThemeMode => {
  if (typeof window === 'undefined') return 'light'

  const stored = window.localStorage?.getItem(THEME_STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') return stored

  const prefersDark =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  return prefersDark ? 'dark' : 'light'
}

const theme = ref<ThemeMode>(getInitialTheme())

const applyTheme = (mode: ThemeMode) => {
  if (typeof document === 'undefined') return
  document.documentElement.classList.toggle('dark', mode === 'dark')
  window.localStorage?.setItem(THEME_STORAGE_KEY, mode)
}

const toggleTheme = () => {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  applyTheme(theme.value)
}

onMounted(() => {
  applyTheme(theme.value)
})
</script>

<template>
  <!-- Header wrapper -->
  <header class="sticky top-4 z-50 w-full px-4 sm:px-6">
    <div
      class="mx-auto flex max-w-6xl items-center justify-between rounded-3xl border border-slate-200/70 bg-white/85 px-4 py-3 shadow-lg shadow-amber-500/10 backdrop-blur dark:border-slate-800/70 dark:bg-slate-900/80"
    >
      <!-- Brand -->
      <a href="#" class="inline-flex items-center gap-3">
        <div class="leading-tight">
          <div class="text-2xl pl-6 font-bold tracking-tight text-blue-600">
            TOWA<span class="text-blue-600"></span>
          </div>
        </div>
      </a>

      <!-- Right-side actions -->
      <div class="flex items-center gap-2">
        <!-- Desktop navigation -->
        <nav
          class="hidden md:flex items-center gap-1 rounded-full border border-slate-200/70 bg-slate-100/70 px-2 py-1 dark:border-slate-800/70 dark:bg-slate-800/70"
          aria-label="Primary"
        >
          <a
            v-for="item in navItems"
            :key="item.label"
            :href="item.href"
            :aria-current="item.label === activeLabel ? 'page' : undefined"
            :class="[
              'rounded-full px-4 py-2 text-sm font-semibold transition-colors',
              item.label === activeLabel
                ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white',
            ]"
          >
            {{ item.label }}
          </a>
        </nav>

        <!-- Theme toggle -->
        <Button variant="ghost" size="icon" aria-label="Toggle theme" @click="toggleTheme">
          <svg
            v-if="theme === 'dark'"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-5 w-5"
          >
            <path d="M12 3a1 1 0 0 1 1 1v1" />
            <path d="M18.364 5.636a1 1 0 0 1 1.414 0l.707.707" />
            <path d="M21 12a1 1 0 0 1-1 1h-1" />
            <path d="M18.364 18.364a1 1 0 0 1 0 1.414l-.707.707" />
            <path d="M12 21a1 1 0 0 1-1-1v-1" />
            <path d="M5.636 18.364a1 1 0 0 1-1.414 0l-.707-.707" />
            <path d="M3 12a1 1 0 0 1 1-1h1" />
            <path d="M5.636 5.636a1 1 0 0 1 0-1.414l.707-.707" />
            <circle cx="12" cy="12" r="4" />
          </svg>
          <svg
            v-else
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-5 w-5"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79Z" />
          </svg>
        </Button>

        <!-- Mobile menu toggle -->
        <Button
          variant="ghost"
          size="icon"
          class="md:hidden"
          aria-label="Toggle menu"
          aria-controls="mobile-navigation"
          :aria-expanded="isMobileMenuOpen"
          @click="toggleMobileMenu"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-6 w-6"
          >
            <path d="M4 6h16" />
            <path d="M4 12h16" />
            <path d="M4 18h16" />
          </svg>
        </Button>
      </div>
    </div>

    <!-- Mobile navigation dropdown -->
    <nav
      id="mobile-navigation"
      class="md:hidden"
      aria-label="Primary mobile"
      v-show="isMobileMenuOpen"
    >
      <div
        class="mx-auto mt-3 max-w-6xl rounded-2xl border border-slate-200/70 bg-white/90 px-4 py-3 shadow-lg backdrop-blur sm:px-6 dark:border-slate-800/70 dark:bg-slate-900/90"
      >
        <ul class="flex flex-col gap-2">
          <li v-for="item in navItems" :key="item.label">
            <a
              :href="item.href"
              :aria-current="item.label === activeLabel ? 'page' : undefined"
              :class="[
                'rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 transition-colors duration-200 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white',
                item.label === activeLabel ? 'bg-slate-100 text-slate-900 dark:bg-slate-800' : '',
              ]"
              @click="closeMobileMenu"
            >
              {{ item.label }}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<style scoped></style>
