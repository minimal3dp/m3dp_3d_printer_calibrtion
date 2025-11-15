<template>
  <div class="space-y-4">
    <h3 
      v-if="title" 
      class="text-xl font-semibold text-white border-b border-gray-700 pb-2"
    >
      {{ title }}
    </h3>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>
