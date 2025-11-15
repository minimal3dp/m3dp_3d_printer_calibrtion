<template>
  <div 
    class="p-4 bg-gray-900 border rounded-lg"
    :class="[
      canCopy ? 'border-fuchsia-500/30' : 'border-gray-700',
    ]"
  >
    <div class="flex items-start justify-between gap-4">
      <div class="flex-1">
        <p v-if="label" class="text-xs text-gray-500 uppercase mb-1">
          {{ label }}
        </p>
        <code class="block text-fuchsia-300 font-mono text-sm break-all">
          {{ command }}
        </code>
      </div>
      
      <button
        v-if="canCopy"
        @click="copyToClipboard"
        class="px-3 py-2 bg-fuchsia-600 hover:bg-fuchsia-700 text-white rounded transition-colors flex-shrink-0"
        :title="copied ? 'Copied!' : 'Copy command'"
      >
        <i :class="copied ? 'ph ph-check' : 'ph ph-copy'"></i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = withDefaults(
  defineProps<{
    command: string
    label?: string
    canCopy?: boolean
  }>(),
  {
    canCopy: true,
  }
)

const copied = ref(false)

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(props.command)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}
</script>
