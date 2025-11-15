<template>
  <CalcLayout title="Extruder Rotation Distance">
    <CalcCard title="Calculate from E-Steps">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-4">
          <div>
            <label for="full_steps" class="block text-sm font-medium text-gray-300 mb-2">
              Full Steps per Rotation
            </label>
            <select
              v-model="fullSteps"
              id="full_steps"
              class="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border-2 border-gray-600 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            >
              <option :value="200">1.8° Stepper (200)</option>
              <option :value="400">0.9° Stepper (400)</option>
            </select>
          </div>

          <CalcInput
            v-model="microsteps"
            label="Microsteps"
            :step="1"
            hint="e.g., 16, 32, 64"
          />

          <CalcInput
            v-model="eSteps"
            label="Your Old E-Steps Value"
            placeholder="e.g., 400"
            hint="From your old firmware configuration"
          />
        </div>

        <div class="space-y-4">
          <CalcResult
            :value="rotationFromESteps"
            label="Calculated Rotation Distance"
            unit="mm"
            :decimals="3"
            :copyable="true"
          />

          <AlertBox type="info">
            <p class="text-sm"><strong>Formula:</strong> (Full Steps × Microsteps) / E-Steps</p>
          </AlertBox>
        </div>
      </div>
    </CalcCard>

    <CalcCard title="Calculate from Measurement (Measure & Trim)">
      <p class="text-sm text-gray-400 mb-4">
        Reference: 
        <a
          href="https://www.klipper3d.org/Rotation_Distance.html"
          target="_blank"
          rel="noopener"
          class="text-cyan-400 hover:underline"
        >
          Klipper Rotation Distance Docs
        </a>
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-4">
          <CalcInput
            v-model="prevRotation"
            label="Previous Rotation Distance"
            unit="mm"
            placeholder="e.g., 20.112"
          />

          <CalcInput
            v-model="initialMark"
            label="Initial Mark Distance"
            unit="mm"
            hint="Mark filament this distance before extruder (e.g., 120mm)"
          />

          <CalcInput
            v-model="requestedExtrude"
            label="Requested Extrude Distance"
            unit="mm"
            hint="How much you asked printer to extrude (e.g., 100mm)"
          />

          <CalcInput
            v-model="subsequentMark"
            label="Subsequent Mark Distance"
            unit="mm"
            placeholder="e.g., 19"
            hint="Distance from extruder to mark after extrusion"
          />
        </div>

        <div class="space-y-4">
          <CalcResult
            :value="actualExtruded"
            label="Actual Extruded Distance"
            unit="mm"
            :decimals="3"
          />

          <CalcResult
            :value="rotationFromMeasurement"
            label="New Rotation Distance"
            unit="mm"
            :decimals="3"
            :copyable="true"
          />

          <CommandBlock
            v-if="showCommand"
            label="Add to printer.cfg"
            :command="`rotation_distance: ${rotationFromMeasurement.toFixed(3)}`"
          />
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
import { calculateExtruderFromESteps, calculateExtruderFromMeasurement } from '../../utils/calculations'

// E-Steps method
const fullSteps = ref(200)
const microsteps = ref(16)
const eSteps = ref(0)

const rotationFromESteps = computed(() => {
  if (eSteps.value > 0) {
    return calculateExtruderFromESteps(fullSteps.value, microsteps.value, eSteps.value)
  }
  return 0
})

// Measurement method
const prevRotation = ref(0)
const initialMark = ref(120)
const requestedExtrude = ref(100)
const subsequentMark = ref(0)

const measurementResult = computed(() => {
  if (prevRotation.value > 0 && initialMark.value > 0 && requestedExtrude.value > 0 && subsequentMark.value >= 0) {
    return calculateExtruderFromMeasurement(
      prevRotation.value,
      initialMark.value,
      requestedExtrude.value,
      subsequentMark.value
    )
  }
  return { actualExtruded: 0, newRotation: 0 }
})

const actualExtruded = computed(() => measurementResult.value.actualExtruded)
const rotationFromMeasurement = computed(() => measurementResult.value.newRotation)

const showCommand = computed(() => rotationFromMeasurement.value > 0)
</script>
