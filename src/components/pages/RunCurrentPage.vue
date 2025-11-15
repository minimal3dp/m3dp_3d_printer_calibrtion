<template>
  <CalcLayout title="Stepper Run Current">
    <template #info>
      <AlertBox type="info">
        <p class="font-semibold mb-2">Purpose</p>
        <p>
          Verify that your stepper motor run_current settings are appropriate by checking 
          motor temperatures under load.
        </p>
      </AlertBox>
    </template>

    <CalcCard title="Instructions">
      <div class="prose-custom space-y-4">
        <ol class="list-decimal list-inside space-y-2">
          <li>Heat your printer and run a print for at least 10 minutes</li>
          <li>Immediately after, carefully touch the stepper motors</li>
          <li>Note their temperature (too hot to touch comfortably = ~70°C+)</li>
          <li>Enter your current run_current setting and estimated temperature below</li>
        </ol>

        <AlertBox type="warning">
          <p class="font-semibold">Target Temperature Range</p>
          <p>Stepper motors should be warm (40-70°C) but not too hot to touch comfortably.</p>
        </AlertBox>
      </div>
    </CalcCard>

    <CalcCard title="Calculate New Run Current">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Inputs -->
        <div class="space-y-4">
          <CalcInput
            v-model="currentSetting"
            label="Current run_current Setting"
            unit="A"
            :step="0.01"
            :min="0.1"
            :max="2.0"
            hint="Check your printer.cfg for current run_current value"
          />

          <CalcInput
            v-model="tempReading"
            label="Estimated Motor Temperature"
            unit="°C"
            :step="1"
            :min="20"
            :max="100"
            hint="Estimate: too hot to touch = 70°C+, warm = 40-70°C"
          />
        </div>

        <!-- Results -->
        <div class="space-y-4">
          <CalcResult
            :value="newRunCurrent"
            label="New run_current Value"
            unit="A"
            :decimals="3"
            :copyable="true"
          />

          <AlertBox 
            :type="tempReading < 40 ? 'warning' : tempReading > 70 ? 'error' : 'success'"
          >
            <p class="font-semibold">{{ statusMessage }}</p>
            <p class="text-sm mt-1">{{ recommendationMessage }}</p>
          </AlertBox>

          <CommandBlock
            v-if="showCommand"
            label="Add to printer.cfg"
            :command="`run_current: ${newRunCurrent.toFixed(3)}`"
          />
        </div>
      </div>
    </CalcCard>

    <CalcCard title="Reference">
      <div class="prose-custom">
        <p>
          This calculator is based on the 
          <a 
            href="https://ellis3dp.com/Print-Tuning-Guide/articles/determining_motor_currents.html"
            target="_blank"
            rel="noopener"
          >
            Ellis3DP guide for determining motor currents
          </a>.
        </p>
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
import { calculateRunCurrent } from '../../utils/calculations'

const currentSetting = ref(0.8)
const tempReading = ref(50)

const newRunCurrent = computed(() => {
  return calculateRunCurrent(currentSetting.value, tempReading.value)
})

const showCommand = computed(() => {
  return currentSetting.value > 0 && tempReading.value > 0
})

const statusMessage = computed(() => {
  if (tempReading.value < 40) {
    return 'Motors Too Cool'
  } else if (tempReading.value > 70) {
    return 'Motors Too Hot'
  }
  return 'Temperature OK'
})

const recommendationMessage = computed(() => {
  if (tempReading.value < 40) {
    return 'Your motors are cooler than ideal. Consider increasing run_current slightly.'
  } else if (tempReading.value > 70) {
    return 'Your motors are too hot! Reduce run_current to prevent damage and skipping.'
  }
  return 'Your motor temperature is in the ideal range. Current settings are good!'
})
</script>
