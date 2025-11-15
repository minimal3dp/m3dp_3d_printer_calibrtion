<template>
  <div class="space-y-6">
    <header>
      <h2 class="text-3xl font-bold text-white border-b border-gray-700 pb-2">
        {{ title }}
      </h2>
      <p v-if="description" class="mt-2 text-gray-400 max-w-3xl">
        {{ description }}
      </p>
    </header>
    
    <div v-if="$slots.default" class="space-y-6">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">

defineProps<{
  title: string;
  description?: string;
}>();

</script>
