<script setup lang="ts">
import { cva, type VariantProps } from 'class-variance-authority'
import { computed, useAttrs } from 'vue'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold',
  {
    variants: {
      variant: {
        default:
          'border-slate-200/70 bg-white text-slate-700 dark:border-slate-800/70 dark:bg-slate-900 dark:text-slate-200',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

type BadgeVariants = VariantProps<typeof badgeVariants>

const props = defineProps<{
  variant?: BadgeVariants['variant']
}>()

const attrs = useAttrs()

const classes = computed(() => cn(badgeVariants({ variant: props.variant }), attrs.class as string))
</script>

<template>
  <span v-bind="attrs" :class="classes">
    <slot />
  </span>
</template>
