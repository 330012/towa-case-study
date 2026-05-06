<script setup lang="ts">
import Card from '@/components/ui/card/Card.vue'
import Skeleton from '@/components/ui/skeleton/Skeleton.vue'
</script>

<template>
	<section class="py-6">
		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
			<Card v-for="n in 6" :key="n" class="overflow-hidden">
				<div class="rounded-t-3xl bg-amber-50/70 p-6 dark:bg-slate-900/50">
					<Skeleton class="mx-auto h-28 w-28 rounded-full" />
				</div>
				<div class="space-y-3 px-5 pb-6 pt-4">
					<Skeleton class="h-5 w-2/3" />
					<div class="flex gap-2">
						<Skeleton class="h-5 w-16 rounded-full" />
						<Skeleton class="h-5 w-20 rounded-full" />
					</div>
					<Skeleton class="h-4 w-full" />
					<Skeleton class="h-4 w-5/6" />
				</div>
			</Card>
		</div>
	</section>
</template>
