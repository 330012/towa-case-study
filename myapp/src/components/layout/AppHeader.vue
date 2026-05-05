<script setup lang="ts">
// Navigation data
const navItems = [
	{ label: 'Home', href: '#' },
	{ label: 'Projects', href: '#projects' },
	{ label: 'Contact', href: '#contact' },
] as const

// Active link (dummy navigation; no router in this project)
const activeLabel: (typeof navItems)[number]['label'] = 'Home'
</script>

<template>
	<!-- Header wrapper -->
	<header class="sticky top-0 z-50 w-full border-b border-slate-200 bg-white shadow-sm">
		<div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
			<!-- Logo -->
			<a href="#" class="inline-flex items-baseline gap-1">
				<span class="text-lg font-bold tracking-tight text-blue-600">TOWA</span>
				<span class="text-blue-600">.</span>
			</a>

			<!-- Mobile menu icon (no functionality) -->
			<button
				type="button"
				class="inline-flex items-center justify-center rounded-md p-2 text-slate-600 transition-colors duration-200 hover:text-blue-600 md:hidden"
				aria-label="Open menu"
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
			</button>

			<!-- Desktop navigation -->
			<nav class="hidden md:block" aria-label="Primary">
				<ul class="flex items-center gap-6">
					<li v-for="item in navItems" :key="item.label">
						<a
							:href="item.href"
							:aria-current="item.label === activeLabel ? 'page' : undefined"
							:class="[
								'font-medium text-slate-600 transition-colors duration-200 hover:text-blue-600',
								item.label === activeLabel ? 'text-blue-600' : '',
							]"
						>
							{{ item.label }}
						</a>
					</li>
				</ul>
			</nav>
		</div>
	</header>
</template>

<style scoped></style>
