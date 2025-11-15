<template>
  <CalcLayout title="OrcaSlicer Flow Calibration (Recommended)">
    <CalcCard title="Pass 1 & Pass 2 Method">
      <p class="text-sm text-gray-400 mb-4">
        Use Orca Slicer → Calibration → Flow Rate → Pass 1 & 2. Find the smoothest patch and enter its value below.
      </p>

      <!-- Pass 1 -->
      <div class="border-b border-gray-700 pb-6 mb-6">
        <h4 class="text-lg font-semibold text-white mb-3">Pass 1</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <CalcInput
              v-model="pass1OldFlow"
              label="Old Flow Rate"
              placeholder="e.g., 0.99"
            />

            <CalcInput
              v-model="pass1Slide"
              label="Pass 1 Slide Value"
              unit="%"
              placeholder="e.g., -10"
              hint="Can be negative or positive"
            />
          </div>

          <div class="space-y-4">
            <CalcResult
              :value="pass1FlowResult"
              label="Pass 1 Flow Value (use for Pass 2)"
              :decimals="3"
            />

            <AlertBox type="info">
              <p class="text-sm"><strong>Formula:</strong> Old Flow × (1 + Slide Value / 100)</p>
            </AlertBox>
          </div>
        </div>
      </div>

      <!-- Pass 2 -->
      <div>
        <h4 class="text-lg font-semibold text-white mb-3">Pass 2</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <CalcInput
              v-model="pass2Slide"
              label="Pass 2 Slide Value"
              unit="%"
              placeholder="e.g., -1"
              hint="Fine adjustment (-2% to +2%)"
            />
          </div>

          <div class="space-y-4">
            <CalcResult
              :value="pass2FlowResult"
              label="New FLOW Value (Final)"
              :decimals="3"
              :copyable="true"
            />

            <CommandBlock
              v-if="pass2FlowResult > 0"
              label="Add to OrcaSlicer filament settings"
              :command="`Flow Ratio: ${pass2FlowResult.toFixed(3)}`"
            />
          </div>
        </div>
      </div>
    </CalcCard>

    <CalcCard title="YOLO Method">
      <p class="text-sm text-gray-400 mb-4">
        Use Orca Slicer → Calibration → Flow Rate → YOLO. Find the smoothest patch and enter its value below.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-4">
          <CalcInput
            v-model="yoloOldFlow"
            label="Old Flow Rate"
            placeholder="e.g., 1"
          />

          <CalcInput
            v-model="yoloSlide"
            label="YOLO Slide Value"
            placeholder="e.g., -0.035"
            hint="Direct addition (can be negative)"
          />
        </div>

        <div class="space-y-4">
          <CalcResult
            :value="yoloFlowResult"
            label="New FLOW Value (Final)"
            :decimals="3"
            :copyable="true"
          />

          <AlertBox type="info">
            <p class="text-sm"><strong>Formula:</strong> Old Flow + Slide Value</p>
          </AlertBox>

          <CommandBlock
            v-if="yoloFlowResult > 0"
            label="Add to OrcaSlicer filament settings"
            :command="`Flow Ratio: ${yoloFlowResult.toFixed(3)}`"
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
import { calculateOrcaFlowPass, calculateOrcaFlowYOLO } from '../../utils/calculations'

// Pass 1 & 2 Method
const pass1OldFlow = ref(0.99)
const pass1Slide = ref(0)
const pass2Slide = ref(0)

const pass1FlowResult = computed(() => {
  if (pass1OldFlow.value > 0 && pass1Slide.value !== 0) {
    return calculateOrcaFlowPass(pass1OldFlow.value, pass1Slide.value)
  }
  return 0
})

const pass2FlowResult = computed(() => {
  if (pass1FlowResult.value > 0 && pass2Slide.value !== 0) {
    return calculateOrcaFlowPass(pass1FlowResult.value, pass2Slide.value)
  }
  return 0
})

// YOLO Method
const yoloOldFlow = ref(1)
const yoloSlide = ref(0)

const yoloFlowResult = computed(() => {
  if (yoloOldFlow.value > 0 && yoloSlide.value !== 0) {
    return calculateOrcaFlowYOLO(yoloOldFlow.value, yoloSlide.value)
  }
  return 0
})
</script>
