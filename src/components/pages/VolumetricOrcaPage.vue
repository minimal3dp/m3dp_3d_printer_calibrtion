<template>
  <CalcLayout title="Max Volumetric Speed (OrcaSlicer)">
    <CalcCard title="OrcaSlicer Max Flowrate Test">
      <p class="text-sm text-gray-400 mb-4">
        Reference: 
        <a href="https://github.com/SoftFever/OrcaSlicer/wiki/Calibration#max-volumetric-speed" target="_blank" rel="noopener" class="text-cyan-400 hover:underline">
          OrcaSlicer Max Flowrate Docs
        </a>
      </p>

      <ol class="list-decimal list-inside text-sm text-gray-400 mb-4 space-y-1">
        <li>Go to "Calibration" → "More..." → "Max Flowrate".</li>
        <li>Print the generated model.</li>
        <li>Measure the height (mm) where the print quality starts to fail.</li>
        <li>Enter the values from the test below.</li>
      </ol>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-4">
          <CalcInput v-model="startFlow" label="Start Flow" unit="mm³/s" />
          <CalcInput v-model="measuredHeight" label="Measured Height" unit="mm" placeholder="e.g., 27.23" />
          <CalcInput v-model="step" label="Step" unit="mm³/s per mm" />
        </div>

        <div class="space-y-4">
          <CalcResult :value="maxFlow" label="Max Flowrate" unit="mm³/s" :decimals="3" />
          <CalcResult :value="recommendedFlow" label="Slicer Value (90%)" unit="mm³/s" :decimals="3" :copyable="true" />
          <AlertBox type="info">
            <p class="text-sm">Recommended to use 80-90% of the max value in your slicer.</p>
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
import { calculateVolumetricOrca } from '../../utils/calculations'

const startFlow = ref(5)
const measuredHeight = ref(0)
const step = ref(0.5)

const result = computed(() => {
  if (measuredHeight.value > 0 && step.value > 0) {
    return calculateVolumetricOrca(startFlow.value, measuredHeight.value, step.value)
  }
  return { maxFlow: 0, recommendedFlow: 0 }
})

const maxFlow = computed(() => result.value.maxFlow)
const recommendedFlow = computed(() => result.value.recommendedFlow)
</script>
