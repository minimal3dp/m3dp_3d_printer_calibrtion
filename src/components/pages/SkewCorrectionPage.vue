<template>
  <CalcLayout title="Skew Correction">
    <CalcCard title="Skew Correction Calculator">
      <p class="text-sm text-gray-400 mb-4">
        Reference:
        <a href="https://marlinfw.org/docs/gcode/M852.html" target="_blank" rel="noopener" class="text-cyan-400 hover:underline">
          Marlin M852 Documentation
        </a>
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-4">
          <CalcInput v-model="lengthA" label="Length A" unit="mm" placeholder="e.g., 100" />
          <CalcInput v-model="lengthB" label="Length B" unit="mm" placeholder="e.g., 100" />
          <CalcInput v-model="lengthC" label="Length C" unit="mm" placeholder="e.g., 141.4" />
        </div>

        <div class="space-y-4">
          <CalcResult :value="skewFactor" label="Calculated Skew Factor" :decimals="5" :copyable="true" />
          <CommandBlock v-if="skewFactor" label="G-Code for Skew Correction" :command="`M852 S${skewFactor.toFixed(5)}`" />
        </div>
      </div>

      <div class="mt-6">
        <h3 class="text-lg font-medium text-white mb-2">Instructions</h3>
        <ol class="list-decimal list-inside text-sm text-gray-400 space-y-2">
          <li>Print the test model provided below.</li>
          <li>Measure the lengths of the three sides of the printed triangle, as shown in the visual guide.</li>
          <li>Enter the measured lengths into the calculator.</li>
          <li>The calculator will determine the skew factor for your printer.</li>
          <li>Send the generated G-code command to your printer to apply the skew correction.</li>
        </ol>
      </div>
    </CalcCard>

    <CalcCard title="Visual Guide">
      <p class="text-sm text-gray-400 mb-4">The test print is a simple triangle. Measure the lengths of the three sides as indicated below.</p>
      <img src="/skew_guide.png" alt="Skew Correction Visual Guide" class="rounded-lg">
      <CommandBlock label="Test Print G-Code" :command="testPrintGcode" :copyable="true" class="mt-4" />
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

const lengthA = ref(0)
const lengthB = ref(0)
const lengthC = ref(0)

const skewFactor = computed(() => {
  if (lengthA.value > 0 && lengthB.value > 0 && lengthC.value > 0) {
    const cosC = (Math.pow(lengthA.value, 2) + Math.pow(lengthB.value, 2) - Math.pow(lengthC.value, 2)) / (2 * lengthA.value * lengthB.value)
    const angleC = Math.acos(cosC) * (180 / Math.PI)
    return (90 - angleC).toFixed(5)
  }
  return 0
})

const testPrintGcode = computed(() => {
  return `
G28 ; Home all axes
G90 ; Absolute positioning
G1 Z0.2 F3000

; Print a 100mm x 100mm triangle
G1 X0 Y0 F6000
G1 X100 Y0 E20 F1200
G1 X0 Y100 E20
G1 X0 Y0 E20

; Lift Z
G1 Z10 F3000
`
})
</script>
