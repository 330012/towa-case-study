<script setup lang="ts">
// Navigation data (keep in sync with header)
const navItems = [
	{ label: 'Home', href: '#' },
	{ label: 'Projects', href: '#projects' },
	{ label: 'Contact', href: '#contact' },
] as const
</script>

<template>
	<!-- Footer wrapper -->
	<footer class="w-full bg-slate-900 px-6 py-12">
		<div class="mx-auto max-w-6xl">
			<!-- Top content: 3 columns -->
			<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
				<!-- Column 1: Logo + tagline -->
				<div>
					<div class="text-xl font-bold text-blue-500">TOWA<span class="text-blue-500">.</span></div>
					<p class="mt-2 text-sm text-slate-400">Digital transformation end-to-end.</p>
				</div>

				<!-- Column 2: Navigation -->
				<div>
					<h2 class="mb-4 font-semibold text-white">Navigation</h2>
					<nav aria-label="Footer">
						<ul class="flex flex-col gap-2">
							<li v-for="item in navItems" :key="item.label">
								<a
									:href="item.href"
									class="text-slate-400 transition-colors duration-200 hover:text-white"
								>
									{{ item.label }}
								</a>
							</li>
						</ul>
					</nav>
				</div>

				<!-- Column 3: Contact -->
				<div>
					<h2 class="mb-4 font-semibold text-white">Contact</h2>
					<div class="space-y-1">
						<p class="text-sm text-slate-400">TOWA Digital GmbH</p>
						<p class="text-sm text-slate-400">Rheinstraße 1, 6900 Bregenz</p>
						<p class="text-sm text-slate-400">+43 5574 123 456</p>
						<p class="text-sm text-slate-400">hello@towa.at</p>
					</div>
				</div>
			</div>

			<!-- Bottom bar -->
			<div class="mt-10 border-t border-slate-700 py-6">
				<p class="text-center text-sm text-slate-500">© 2026 TOWA Digital GmbH. All rights reserved.</p>
			</div>
		</div>
	</footer>
</template>

<style scoped></style>
