<template>
  <CalcLayout title="Belt Rotation Distance">
    <CalcCard title="Belt Calculator (X/Y-Axis)">
      <p class="text-sm text-gray-400 mb-4">
        Reference: 
        <a href="https://www.klipper3d.org/Rotation_Distance.html#calculating-rotation_distance-from-steps_per_mm" target="_blank" rel="noopener" class="text-cyan-400 hover:underline">
          Klipper Rotation Distance Docs
        </a>
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-4">
          <div>
            <label for="belt_pitch" class="block text-sm font-medium text-gray-300 mb-2">
              Belt Pitch
            </label>
            <select
              v-model="beltPitch"
              id="belt_pitch"
              class="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border-2 border-gray-600 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            >
              <option :value="2">GT2 (2mm)</option>
              <option :value="3">GT3 (3mm)</option>
              <option :value="5">HTD (5mm)</option>
            </select>
          </div>

          <CalcInput
            v-model="pulleyTeeth"
            label="Pulley Tooth Count"
            :step="1"
            hint="e.g., 16, 20"
          />
        </div>

        <div class="space-y-4">
          <CalcResult
            :value="rotationDistance"
            label="Calculated rotation_distance"
            unit="mm"
            :decimals="3"
            :copyable="true"
          />

          <AlertBox type="info">
            <p class="text-sm"><strong>Formula:</strong> Belt Pitch × Pulley Tooth Count</p>
            <p class="text-sm mt-2">Common: GT2 belt (2mm) × 20 teeth = 40mm</p>
          </AlertBox>

          <CommandBlock
            v-if="rotationDistance > 0"
            label="Add to printer.cfg [stepper_x/y]"
            :command="`rotation_distance: ${rotationDistance.toFixed(3)}`"
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
import { calculateBeltRotation } from '../../utils/calculations'

const beltPitch = ref(2)
const pulleyTeeth = ref(20)

const rotationDistance = computed(() => {
  if (beltPitch.value > 0 && pulleyTeeth.value > 0) {
    return calculateBeltRotation(beltPitch.value, pulleyTeeth.value)
  }
  return 0
})
</script>
