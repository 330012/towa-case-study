<script setup lang="ts">
import { computed, useAttrs } from 'vue'

import { cn } from '@/lib/utils'

defineOptions({ name: 'UiCard' })

const attrs = useAttrs()

const classes = computed(() =>
	cn(
		'overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-[0_18px_40px_-28px_rgba(15,23,42,0.45)] dark:border-slate-800/70 dark:bg-slate-900',
		attrs.class as string,
	),
)
</script>

<template>
	<div v-bind="attrs" :class="classes">
		<slot />
	</div>
</template>
