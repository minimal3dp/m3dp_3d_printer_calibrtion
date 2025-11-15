<template>
  <div class="space-y-6">
    <h2 class="text-3xl font-bold text-white border-b border-gray-700 pb-2">
      {{ title }}
    </h2>
    
    <div v-if="$slots.info" class="bg-gray-800 shadow-lg rounded-lg p-6">
      <slot name="info" />
    </div>
    
    <div class="bg-gray-800 shadow-lg rounded-lg p-6">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>
