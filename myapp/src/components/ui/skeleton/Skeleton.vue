<script setup lang="ts">
import { computed, useAttrs } from 'vue'

import { cn } from '@/lib/utils'

const attrs = useAttrs()

const classes = computed(() =>
	cn('animate-pulse rounded-md bg-amber-100/70 dark:bg-slate-800/60', attrs.class as string),
)
</script>

<template>
	<div v-bind="attrs" :class="classes" />
</template>
