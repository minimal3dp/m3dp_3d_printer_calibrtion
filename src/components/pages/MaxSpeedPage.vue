<template>
  <CalcLayout title="Max Print Speed">
    <CalcCard title="Calculate Maximum Print Speed from Volumetric Flow">
      <p class="text-sm text-gray-400 mb-4">
        Determines the fastest speed possible with given layer height and line width based on your max volumetric speed.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-4">
          <CalcInput v-model="maxVolumetric" label="Max Volumetric Speed" unit="mm³/s" />
          <CalcInput v-model="layerHeight" label="Layer Height" unit="mm" />
          <CalcInput v-model="lineWidth" label="Line Width" unit="mm" />
        </div>

        <div class="space-y-4">
          <CalcResult :value="maxSpeed" label="Maximum Print Speed" unit="mm/s" :decimals="1" :copyable="true" />
          
          <AlertBox type="info">
            <p class="text-sm"><strong>Formula:</strong> Max Volumetric Speed / (Layer Height × Line Width)</p>
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
import { calculateMaxPrintSpeed } from '../../utils/calculations'

const maxVolumetric = ref(0)
const layerHeight = ref(0.2)
const lineWidth = ref(0.4)

const maxSpeed = computed(() => {
  if (maxVolumetric.value > 0 && layerHeight.value > 0 && lineWidth.value > 0) {
    return calculateMaxPrintSpeed(maxVolumetric.value, layerHeight.value, lineWidth.value)
  }
  return 0
})
</script>
