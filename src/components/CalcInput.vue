<template>
  <div class="space-y-2">
    <label v-if="label" :for="inputId" class="block text-sm font-medium text-gray-300">
      {{ label }}
      <span v-if="required" class="text-red-400">*</span>
      <span v-if="unit" class="text-gray-500">({{ unit }})</span>
    </label>
    
    <input
      :id="inputId"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :step="step"
      :min="min"
      :max="max"
      :required="required"
      :disabled="disabled"
      @input="handleInput"
      class="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border-2 border-transparent focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed input-yellow"
    />
    
    <p v-if="hint" class="text-xs text-gray-500">
      {{ hint }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue: number | string
    label?: string
    unit?: string
    type?: 'text' | 'number' | 'email'
    placeholder?: string
    step?: string | number
    min?: string | number
    max?: string | number
    required?: boolean
    disabled?: boolean
    hint?: string
  }>(),
  {
    type: 'number',
    step: 'any',
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: number | string]
}>()

const inputId = computed(() => `input-${Math.random().toString(36).substr(2, 9)}`)

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = props.type === 'number' ? parseFloat(target.value) : target.value
  emit('update:modelValue', value)
}
</script>
