<template>
  <CalcLayout title="Input Shaping">
    <CalcCard title="Ringing Tower Method">
      <p class="text-sm text-gray-400 mb-4">
        Reference: 
        <a href="https://www.klipper3d.org/Resonance_Compensation.html" target="_blank" rel="noopener" class="text-cyan-400 hover:underline">
          Klipper Resonance Compensation Docs
        </a>
      </p>

      <AlertBox type="info" class="mb-4">
        <p class="font-semibold mb-2">Slicer Settings:</p>
        <ul class="list-disc ml-6 text-sm space-y-1">
          <li>Layer Height: 0.2 or 0.25</li>
          <li>Perimeters: 1 or 2 (or Vase Mode)</li>
          <li>Infill: 0%</li>
          <li>Top Layers: 0</li>
          <li>Print Speed: 80-100 mm/s</li>
        </ul>
      </AlertBox>

      <div class="space-y-2 mb-6">
        <CommandBlock :command="`SET_VELOCITY_LIMIT ACCEL_TO_DECEL=7000`" />
        <CommandBlock :command="`SET_PRESSURE_ADVANCE ADVANCE=0`" />
        <CommandBlock :command="`SET_INPUT_SHAPER SHAPER_FREQ_X=0 SHAPER_FREQ_Y=0`" />
        <CommandBlock :command="`TUNING_TOWER COMMAND=SET_VELOCITY_LIMIT PARAMETER=ACCEL START=1500 STEP_DELTA=500 STEP_HEIGHT=5`" />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-4">
          <CalcInput v-model="printSpeed" label="Print Speed" unit="mm/s" />
          <CalcInput v-model="xRings" label="X Rings (Count)" :step="1" placeholder="e.g., 3" />
          <CalcInput v-model="xMeasure" label="X Measurement" unit="mm" placeholder="e.g., 14.58" />
          <CalcInput v-model="yRings" label="Y Rings (Count)" :step="1" placeholder="e.g., 6" />
          <CalcInput v-model="yMeasure" label="Y Measurement" unit="mm" placeholder="e.g., 16.75" />
        </div>

        <div class="space-y-4">
          <CalcResult :value="xFreq" label="X Frequency" unit="Hz" :decimals="3" :copyable="true" />
          <CalcResult :value="yFreq" label="Y Frequency" unit="Hz" :decimals="3" :copyable="true" />
          
          <AlertBox type="success" v-if="xFreq > 0 && yFreq > 0">
            <p class="font-semibold mb-2">Add to printer.cfg:</p>
            <pre class="text-sm text-green-300">[input_shaper]
shaper_freq_x: {{ xFreq.toFixed(3) }}
shaper_freq_y: {{ yFreq.toFixed(3) }}
shaper_type: mzv</pre>
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
import CommandBlock from '../CommandBlock.vue'
import { calculateInputShapingFreq } from '../../utils/calculations'

const printSpeed = ref(100)
const xRings = ref(0)
const xMeasure = ref(0)
const yRings = ref(0)
const yMeasure = ref(0)

const xFreq = computed(() => {
  if (printSpeed.value > 0 && xRings.value > 0 && xMeasure.value > 0) {
    return calculateInputShapingFreq(printSpeed.value, xRings.value, xMeasure.value)
  }
  return 0
})

const yFreq = computed(() => {
  if (printSpeed.value > 0 && yRings.value > 0 && yMeasure.value > 0) {
    return calculateInputShapingFreq(printSpeed.value, yRings.value, yMeasure.value)
  }
  return 0
})
</script>
