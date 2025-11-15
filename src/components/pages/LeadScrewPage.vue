<template>
  <CalcLayout title="Lead Screw Rotation Distance">
    <CalcCard title="Lead Screw Calculator (Z-Axis)">
      <p class="text-sm text-gray-400 mb-4">
        Reference: 
        <a href="https://www.klipper3d.org/Rotation_Distance.html#axes-with-a-lead-screw" target="_blank" rel="noopener" class="text-cyan-400 hover:underline">
          Klipper Lead Screw Docs
        </a>
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-4">
          <CalcInput
            v-model="pitch"
            label="Pitch"
            unit="mm"
            hint="Distance between threads (e.g., T8x8 pitch is 2mm)"
          />

          <CalcInput
            v-model="threads"
            label="Number of Threads (Starts)"
            :step="1"
            hint="Number of separate threads (e.g., T8x8 has 4 starts)"
          />
        </div>

        <div class="space-y-4">
          <CalcResult
            :value="rotationDistance"
            label="Calculated rotation_distance"
            unit="mm"
            :decimals="1"
            :copyable="true"
          />

          <AlertBox type="info">
            <p class="text-sm"><strong>Formula:</strong> Pitch × Number of Threads</p>
            <p class="text-sm mt-2">Common: T8x8 lead screw = 2mm pitch × 4 starts = 8mm</p>
          </AlertBox>

          <CommandBlock
            v-if="rotationDistance > 0"
            label="Add to printer.cfg [stepper_z]"
            :command="`rotation_distance: ${rotationDistance.toFixed(1)}`"
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
import { calculateLeadScrew } from '../../utils/calculations'

const pitch = ref(2)
const threads = ref(4)

const rotationDistance = computed(() => {
  if (pitch.value > 0 && threads.value > 0) {
    return calculateLeadScrew(pitch.value, threads.value)
  }
  return 0
})
</script>
