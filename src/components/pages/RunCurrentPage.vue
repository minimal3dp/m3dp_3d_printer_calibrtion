<template>
  <CalcLayout 
    title="Stepper Run Current (TMC2208/2209)"
    description="This calculator helps you determine the correct 'run_current' for your stepper motors based on their peak current rating. Setting this value correctly is crucial for preventing motor overheating and ensuring reliable performance.">
    
    <CalcCard title="Calculator">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Input -->
        <div class="space-y-4">
          <CalcInput
            v-model="peakCurrent"
            label="Motor Peak Current"
            unit="A"
            :step="0.1"
            :min="0.1"
            :max="3.0"
            hint="Check your motor's datasheet for peak current rating"
          />
        </div>

        <!-- Results -->
        <div class="space-y-4">
          <CalcResult
            :value="result"
            label="Calculated run_current"
            unit="A"
            :decimals="3"
            :copyable="true"
          />

          <AlertBox type="warning">
            <p class="font-semibold">Safety Margin</p>
            <p class="text-sm">
              It's recommended to use 75-85% of this calculated value to reduce heat and noise.
              Adjust based on your motor and driver specifications.
            </p>
          </AlertBox>

          <CommandBlock
            v-if="result"
            label="Add to printer.cfg [tmc2209 stepper_x]"
            :command="`run_current: ${result.toFixed(3)}`"
          />
        </div>
      </div>
    </CalcCard>

    <CalcCard title="Formula & Reference">
      <div class="prose-custom space-y-2">
        <p><strong>Formula:</strong> RMS = Peak Current / √2 (or Peak Current × 0.707)</p>
        <p>
          Reference: 
          <a 
            href="https://docs.vorondesign.com/community/howto/120decibell/calculating_driver_current.html"
            target="_blank"
            rel="noopener"
          >
            Voron Design - Calculating Driver Current
          </a>
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
import { calculateRMSCurrent } from '../../utils/calculations'

const peakCurrent = ref<number | undefined>(undefined)

const result = computed(() => {
  if (!peakCurrent.value) return undefined
  return calculateRMSCurrent(peakCurrent.value)
})
</script>
