<script setup lang="ts">
import { computed, useAttrs } from 'vue'

import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
	defineProps<{
		modelValue?: string
		type?: string
		disabled?: boolean
	}>(),
	{
		type: 'text',
		modelValue: '',
	},
)

const emit = defineEmits<{
	(e: 'update:modelValue', value: string): void
}>()

const attrs = useAttrs()

const classes = computed(() =>
	cn(
		'w-full rounded-full border border-slate-200/80 bg-white/90 px-4 py-3 text-slate-800 shadow-sm backdrop-blur transition-shadow placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400/60 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800/80 dark:bg-slate-950/70 dark:text-slate-100 dark:placeholder:text-slate-500',
		attrs.class as string,
	),
)

const onInput = (event: Event) => {
	const target = event.target as HTMLInputElement
	emit('update:modelValue', target.value)
}
</script>

<template>
	<input
		v-bind="attrs"
		:type="type"
		:disabled="disabled"
		:value="modelValue"
		:class="classes"
		@input="onInput"
	/>
</template>
