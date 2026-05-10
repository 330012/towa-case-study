<script setup lang="ts">
import { cva, type VariantProps } from 'class-variance-authority'
import { computed, useAttrs } from 'vue'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400/70 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-gradient-to-r from-amber-500 via-rose-500 to-fuchsia-500 text-white shadow-lg shadow-rose-500/20 hover:from-amber-400 hover:via-rose-400 hover:to-fuchsia-400',
        ghost:
          'bg-transparent text-slate-700 hover:bg-white/70 hover:text-slate-900 dark:text-slate-200 dark:hover:bg-slate-900/60',
      },
      size: {
        default: 'h-10 px-5',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

type ButtonVariants = VariantProps<typeof buttonVariants>

const props = withDefaults(
  defineProps<{
    variant?: ButtonVariants['variant']
    size?: ButtonVariants['size']
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
  }>(),
  {
    type: 'button',
  },
)

const attrs = useAttrs()

const classes = computed(() =>
  cn(buttonVariants({ variant: props.variant, size: props.size }), attrs.class as string),
)
</script>

<template>
  <button v-bind="attrs" :type="type" :disabled="disabled" :class="classes">
    <slot />
  </button>
</template>
