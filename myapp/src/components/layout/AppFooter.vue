<script setup lang="ts">
import Separator from '@/components/ui/separator/Separator.vue'

// Navigation data
const navItems = [
	{ label: 'Home', href: '#' },
	{ label: 'Projects', href: '#projects' },
	{ label: 'Contact', href: '#contact' },
] as const
</script>

<template>
	<!-- Footer wrapper -->
	<footer class="w-full border-t border-slate-200/70 bg-white/80 px-6 py-12 backdrop-blur dark:border-slate-800/70 dark:bg-slate-950/80">
		<div class="mx-auto max-w-6xl">
			<!-- Top content: 3 columns -->
			<div class="grid grid-cols-1 gap-10 md:grid-cols-3">
				<!-- Column 1: Logo + tagline -->
				<div>
					<div class="font-display text-xl font-semibold text-slate-900 dark:text-white">
						TOWA
					</div>
					<p class="mt-2 text-sm text-slate-500 dark:text-slate-400">
						Digital transformation end-to-end.
					</p>
				</div>

				<!-- Column 2: Navigation -->
				<div>
					<h2 class="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
						Navigation
					</h2>
					<nav aria-label="Footer">
						<ul class="flex flex-col gap-2">
							<li v-for="item in navItems" :key="item.label">
								<a
									:href="item.href"
									class="text-slate-600 transition-colors duration-200 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
								>
									{{ item.label }}
								</a>
							</li>
						</ul>
					</nav>
				</div>

				<!-- Column 3: Contact -->
				<div>
					<h2 class="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
						Contact
					</h2>
					<div class="space-y-1">
						<p class="text-sm text-slate-600 dark:text-slate-400">TOWA Digital GmbH</p>
						<p class="text-sm text-slate-600 dark:text-slate-400">Rheinstraße 1, 6900 Bregenz</p>
						<p class="text-sm text-slate-600 dark:text-slate-400">+43 5574 123 456</p>
						<p class="text-sm text-slate-600 dark:text-slate-400">hello@towa.at</p>
					</div>
				</div>
			</div>

			<!-- Bottom bar -->
			<Separator class="mt-10" />
			<div
				class="mt-6 flex flex-col items-center justify-between gap-3 rounded-2xl bg-slate-100 px-4 py-4 text-slate-700 dark:bg-slate-900 dark:text-slate-200 sm:flex-row"
			>
				<p class="text-sm">© 2026 TOWA Digital GmbH. All rights reserved.</p>
			</div>
		</div>
	</footer>
</template>

<style scoped></style>
