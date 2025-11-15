<template>
  <CalcLayout title="Max Volumetric Speed (Ellis' Method)">
    <CalcCard title="Ellis' Max Volumetric Flow Rate">
      <p class="text-sm text-gray-400 mb-4">
        Reference: 
        <a href="https://ellis3dp.com/Print-Tuning-Guide/articles/determining_max_volumetric_flow_rate.html" target="_blank" rel="noopener" class="text-cyan-400 hover:underline">
          Ellis' Print Tuning Guide
        </a>
      </p>

      <div class="prose-custom space-y-4 mb-6">
        <p>This method finds the maximum speed your extruder can push filament before it starts slipping or grinding.</p>
        <ol class="list-decimal">
          <li>Heat the printer to your normal printing temperature.</li>
          <li>Mark your filament at 120mm before it enters the extruder.</li>
          <li>Open your Klipper console.</li>
          <li>Send <code>M83</code> to enter relative extrusion mode.</li>
          <li>Send <code>G1 E100 F300</code>. This attempts to extrude 100mm at 5mm/s.</li>
          <li>When it finishes, measure the distance from the extruder to your mark.</li>
          <li>If it is 20mm (120 - 100), your extruder kept up. If it is > 20mm, your extruder skipped.</li>
          <li>If it succeeded, increase the F value and try again.</li>
          <li>Find the highest F value that can successfully extrude 100mm.</li>
        </ol>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-4">
          <CalcInput v-model="fValue" label="Highest Successful F Value" unit="mm/min" placeholder="e.g., 600" />
          <CalcInput v-model="filamentDiameter" label="Filament Diameter" unit="mm" />
        </div>

        <div class="space-y-4">
          <CalcResult :value="extrusionSpeed" label="Extrusion Speed" unit="mm/s" :decimals="2" />
          <CalcResult :value="maxVolumetric" label="Max Volumetric Flow" unit="mm³/s" :decimals="3" :copyable="true" />
          <AlertBox type="info">
            <p class="text-sm"><strong>Formula:</strong> (Filament Diameter / 2)² × π × Extrusion Speed</p>
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
import { calculateVolumetricEllis } from '../../utils/calculations'

const fValue = ref(0)
const filamentDiameter = ref(1.75)

const result = computed(() => {
  if (fValue.value > 0 && filamentDiameter.value > 0) {
    return calculateVolumetricEllis(fValue.value, filamentDiameter.value)
  }
  return { extrusionSpeed: 0, maxVolumetric: 0 }
})

const extrusionSpeed = computed(() => result.value.extrusionSpeed)
const maxVolumetric = computed(() => result.value.maxVolumetric)
</script>
