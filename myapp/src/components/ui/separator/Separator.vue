<script setup lang="ts">
import { computed, useAttrs } from 'vue'

import { cn } from '@/lib/utils'

type Orientation = 'horizontal' | 'vertical'

defineOptions({ name: 'UiSeparator' })

const props = withDefaults(
  defineProps<{
    orientation?: Orientation
  }>(),
  {
    orientation: 'horizontal',
  },
)

const attrs = useAttrs()

const classes = computed(() =>
  cn(
    'bg-slate-200/80 dark:bg-slate-700/60',
    props.orientation === 'horizontal' ? 'h-px w-full' : 'h-6 w-px',
    attrs.class as string,
  ),
)
</script>

<template>
  <div role="separator" :class="classes" :aria-orientation="orientation" />
</template>
