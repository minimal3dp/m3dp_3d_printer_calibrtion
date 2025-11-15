<template>
  <CalcLayout title="Extrusion Rate Smoothing (ERS)">
    <CalcCard title="ERS Calculator (OrcaSlicer)">
      <p class="text-sm text-gray-400 mb-4">
        Reference: 
        <a href="https://github.com/SoftFever/OrcaSlicer/wiki/extrusion-rate-smoothing" target="_blank" rel="noopener" class="text-cyan-400 hover:underline">
          OrcaSlicer ERS Docs
        </a>
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-4">
          <CalcInput v-model="accel" label="External Perimeter Accel" unit="mm/s²" />
          <CalcInput v-model="lineWidth" label="Line Width" unit="mm" />
          <CalcInput v-model="layerHeight" label="Line Height" unit="mm" />
        </div>

        <div class="space-y-4">
          <CalcResult :value="maxERS" label="Max ERS Value" :decimals="0" />
          <AlertBox type="warning">
            <p class="font-semibold mb-2">Experimental Start (60-80%):</p>
            <p class="text-lg font-bold text-yellow-300">{{ minRecommended.toFixed(0) }} - {{ maxRecommended.toFixed(0) }}</p>
            <p class="text-sm mt-2">Start with 60-80% of the max value in OrcaSlicer.</p>
          </AlertBox>
        </div>
      </div>
    </CalcCard>
  </CalcLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import CalcLayout from '../CalcLayout.vue'
import CalcCard from '../CalcCard.vue'
import CalcInput from '../CalcInput.vue'
import CalcResult from '../CalcResult.vue'
import AlertBox from '../AlertBox.vue'
import { calculateERS } from '../../utils/calculations'

const accel = ref(12000)
const lineWidth = ref(0.6)
const layerHeight = ref(0.2)

const result = computed(() => {
  if (accel.value > 0 && lineWidth.value > 0 && layerHeight.value > 0) {
    return calculateERS(accel.value, lineWidth.value, layerHeight.value)
  }
  return { max: 0, minRecommended: 0, maxRecommended: 0 }
})

const maxERS = computed(() => result.value.max)
const minRecommended = computed(() => result.value.minRecommended)
const maxRecommended = computed(() => result.value.maxRecommended)
</script>
