<template>
  <CalcLayout title="Probe XY Offset">
    <CalcCard title="Calculate Probe XY Offset from Nozzle">
      <p class="text-sm text-gray-400 mb-4">
        Determines where the probe is relative to the nozzle. Measure the coordinates when probe triggers vs nozzle position.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-4">
          <CalcInput v-model="probeX" label="Probe X Coordinate" unit="mm" />
          <CalcInput v-model="probeY" label="Probe Y Coordinate" unit="mm" />
          <CalcInput v-model="nozzleX" label="Nozzle X Coordinate" unit="mm" />
          <CalcInput v-model="nozzleY" label="Nozzle Y Coordinate" unit="mm" />
        </div>

        <div class="space-y-4">
          <CalcResult :value="offsetX" label="X Offset" unit="mm" :decimals="3" :copyable="true" />
          <CalcResult :value="offsetY" label="Y Offset" unit="mm" :decimals="3" :copyable="true" />
          
          <CommandBlock
            v-if="offsetX !== 0 || offsetY !== 0"
            label="Add to printer.cfg [probe]"
            :command="`x_offset: ${offsetX.toFixed(3)}\ny_offset: ${offsetY.toFixed(3)}`"
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
import CommandBlock from '../CommandBlock.vue'
import { calculateProbeOffset } from '../../utils/calculations'

const probeX = ref(0)
const probeY = ref(0)
const nozzleX = ref(0)
const nozzleY = ref(0)

const result = computed(() => calculateProbeOffset(probeX.value, probeY.value, nozzleX.value, nozzleY.value))
const offsetX = computed(() => result.value.x)
const offsetY = computed(() => result.value.y)
</script>
