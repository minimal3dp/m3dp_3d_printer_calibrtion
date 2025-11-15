<template>
  <div 
    class="p-4 rounded-lg border-l-4"
    :class="[
      type === 'info' ? 'bg-cyan-900/20 border-cyan-500' : '',
      type === 'warning' ? 'bg-yellow-900/20 border-yellow-500' : '',
      type === 'error' ? 'bg-red-900/20 border-red-500' : '',
      type === 'success' ? 'bg-green-900/20 border-green-500' : '',
    ]"
  >
    <div class="flex items-start gap-3">
      <i 
        class="text-xl"
        :class="[
          type === 'info' ? 'ph ph-info text-cyan-400' : '',
          type === 'warning' ? 'ph ph-warning text-yellow-400' : '',
          type === 'error' ? 'ph ph-x-circle text-red-400' : '',
          type === 'success' ? 'ph ph-check-circle text-green-400' : '',
        ]"
      ></i>
      <div class="flex-1">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    type?: 'info' | 'warning' | 'error' | 'success'
  }>(),
  {
    type: 'info',
  }
)
</script>
