<template>
  <div class="space-y-2">
    <label v-if="label" class="block text-sm font-medium text-green-400">
      {{ label }}
    </label>
    
    <div class="relative">
      <div
        class="w-full px-4 py-2 bg-gray-700 text-green-400 rounded-lg border-2 border-green-400/20 font-mono text-lg result-green flex items-center justify-between"
      >
        <span>{{ formattedValue }}</span>
        
        <button
          v-if="copyable"
          @click="copyToClipboard"
          class="ml-2 px-2 py-1 text-xs bg-green-400/10 hover:bg-green-400/20 text-green-400 rounded transition-colors"
          :title="copied ? 'Copied!' : 'Copy to clipboard'"
        >
          <i :class="copied ? 'ph ph-check' : 'ph ph-copy'"></i>
        </button>
      </div>
    </div>
    
    <p v-if="hint" class="text-xs text-gray-500">
      {{ hint }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = withDefaults(
  defineProps<{
    value: number | string
    label?: string
    unit?: string
    decimals?: number
    copyable?: boolean
    hint?: string
  }>(),
  {
    decimals: 3,
    copyable: false,
  }
)

const copied = ref(false)

const formattedValue = computed(() => {
  if (typeof props.value === 'number') {
    const formatted = props.value.toFixed(props.decimals)
    return props.unit ? `${formatted} ${props.unit}` : formatted
  }
  return props.unit ? `${props.value} ${props.unit}` : props.value
})

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(formattedValue.value)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}
</script>
