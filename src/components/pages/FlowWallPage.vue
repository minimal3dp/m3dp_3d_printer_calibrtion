<template>
  <CalcLayout title="Flow Calibration (Wall Thickness)">
    <CalcCard title="Wall Thickness Method">
      <p class="text-sm text-gray-400 mb-4">
        Print a hollow cube with 2 perimeters and 0% infill. Measure the four walls with calipers.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-4">
          <CalcInput v-model="lineWidth" label="Slicer Line Width" unit="mm" />
          <CalcInput v-model="perimeters" label="Slicer Perimeters" :step="1" />
          <CalcInput v-model="m1" label="Measurement 1" unit="mm" placeholder="e.g., 0.95" />
          <CalcInput v-model="m2" label="Measurement 2" unit="mm" placeholder="e.g., 0.94" />
          <CalcInput v-model="m3" label="Measurement 3" unit="mm" placeholder="e.g., 0.95" />
          <CalcInput v-model="m4" label="Measurement 4" unit="mm" placeholder="e.g., 0.96" />
        </div>

        <div class="space-y-4">
          <CalcResult :value="expected" label="Expected Thickness" unit="mm" :decimals="3" />
          <CalcResult :value="average" label="Average Measured Thickness" unit="mm" :decimals="4" />
          <CalcResult :value="flowPercentage" label="New Flow Value" unit="%" :decimals="1" :copyable="true" />
          <AlertBox type="info">
            <p class="text-sm"><strong>Formula:</strong> 100 × (Expected / Average)</p>
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
import { calculateFlowFromWall } from '../../utils/calculations'

const lineWidth = ref(0.5)
const perimeters = ref(2)
const m1 = ref(0)
const m2 = ref(0)
const m3 = ref(0)
const m4 = ref(0)

const result = computed(() => {
  if (lineWidth.value > 0 && perimeters.value > 0 && m1.value > 0 && m2.value > 0 && m3.value > 0 && m4.value > 0) {
    return calculateFlowFromWall(lineWidth.value, perimeters.value, [m1.value, m2.value, m3.value, m4.value])
  }
  return { expected: 0, average: 0, flow: 0 }
})

const expected = computed(() => result.value.expected)
const average = computed(() => result.value.average)
const flowPercentage = computed(() => result.value.flow)
</script>
