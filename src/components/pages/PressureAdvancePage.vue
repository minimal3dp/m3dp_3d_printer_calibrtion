<template>
  <CalcLayout title="Pressure Advance">
    <CalcCard title="Klipper PA Tower Method">
      <p class="text-sm text-gray-400 mb-4">
        Reference: 
        <a href="https://www.klipper3d.org/Pressure_Advance.html" target="_blank" rel="noopener" class="text-cyan-400 hover:underline">
          Klipper PA Docs
        </a>
      </p>

      <CommandBlock label="Console Commands" :command="`SET_VELOCITY_LIMIT SQUARE_CORNER_VELOCITY=1 ACCEL=500`" class="mb-4" />
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <CommandBlock label="For Direct Drive" :command="`TUNING_TOWER COMMAND=SET_PRESSURE_ADVANCE PARAMETER=ADVANCE START=0 FACTOR=0.005`" />
        <CommandBlock label="For Bowden" :command="`TUNING_TOWER COMMAND=SET_PRESSURE_ADVANCE PARAMETER=ADVANCE START=0 FACTOR=0.020`" />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-4">
          <CalcInput v-model="start" label="Start Value (from command)" />
          <CalcInput v-model="measuredHeight" label="Measured Height" unit="mm" placeholder="e.g., 12.29" />
          <CalcInput v-model="factorDD" label="Direct Drive Factor" />
          <CalcInput v-model="factorBowden" label="Bowden Factor" />
        </div>

        <div class="space-y-4">
          <CalcResult :value="paDD" label="Direct Drive Pressure Advance" :decimals="5" :copyable="true" />
          <CalcResult :value="paBowden" label="Bowden Pressure Advance" :decimals="5" :copyable="true" />
        </div>
      </div>
    </CalcCard>

    <CalcCard title="OrcaSlicer PA Tower Method">
      <p class="text-sm text-gray-400 mb-4">
        Reference: 
        <a href="https://github.com/SoftFever/OrcaSlicer/wiki/Calibration#pressure-advance" target="_blank" rel="noopener" class="text-cyan-400 hover:underline">
          OrcaSlicer PA Docs
        </a>
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-4">
          <CalcInput v-model="orcaStart" label="Start PA Value" />
          <CalcInput v-model="orcaHeight" label="Measured Height" unit="mm" placeholder="e.g., 30.3" />
          <CalcInput v-model="orcaStep" label="PA Step (per mm)" />
        </div>

        <div class="space-y-4">
          <CalcResult :value="orcaPA" label="Pressure Advance Value" :decimals="5" :copyable="true" />
          <CommandBlock v-if="orcaPA > 0" label="Add to printer.cfg" :command="`pressure_advance: ${orcaPA.toFixed(5)}`" />
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
import CommandBlock from '../CommandBlock.vue'
import { calculatePressureAdvance } from '../../utils/calculations'

// Klipper method
const start = ref(0)
const measuredHeight = ref(0)
const factorDD = ref(0.005)
const factorBowden = ref(0.020)

const paDD = computed(() => {
  if (measuredHeight.value > 0) return calculatePressureAdvance(start.value, measuredHeight.value, factorDD.value)
  return 0
})

const paBowden = computed(() => {
  if (measuredHeight.value > 0) return calculatePressureAdvance(start.value, measuredHeight.value, factorBowden.value)
  return 0
})

// Orca method
const orcaStart = ref(0)
const orcaHeight = ref(0)
const orcaStep = ref(0.002)

const orcaPA = computed(() => {
  if (orcaHeight.value > 0) return calculatePressureAdvance(orcaStart.value, orcaHeight.value, orcaStep.value)
  return 0
})
</script>
