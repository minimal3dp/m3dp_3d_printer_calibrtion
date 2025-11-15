<template>
  <CalcLayout title="Line Widths">
    <CalcCard title="Recommended Line Width Table for OrcaSlicer">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <CalcInput v-model="nozzleDiameter" label="Nozzle Diameter" unit="mm" />
        </div>
      </div>

      <div class="overflow-x-auto mt-6">
        <table class="min-w-full border border-gray-700">
          <thead class="bg-gray-900">
            <tr>
              <th class="px-4 py-2 text-left text-sm font-semibold text-white">Line Type</th>
              <th class="px-4 py-2 text-left text-sm font-semibold text-white">Suggestion</th>
              <th class="px-4 py-2 text-left text-sm font-semibold text-white">Percent</th>
              <th class="px-4 py-2 text-left text-sm font-semibold text-white">Calculated (mm)</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-700">
            <tr v-for="setting in settings" :key="setting.type">
              <td class="px-4 py-2 text-white font-medium">{{ setting.type }}</td>
              <td class="px-4 py-2 text-gray-400">{{ setting.suggestion }}</td>
              <td class="px-4 py-2 text-gray-400">{{ setting.percent }}%</td>
              <td class="px-4 py-2 text-green-400 font-bold">{{ calculateWidth(setting.percent) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </CalcCard>
  </CalcLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import CalcLayout from '../CalcLayout.vue'
import CalcCard from '../CalcCard.vue'
import CalcInput from '../CalcInput.vue'
import { calculateLineWidth } from '../../utils/calculations'

const nozzleDiameter = ref(0.4)

const settings = [
  { type: 'Default', suggestion: '105-150%', percent: 125 },
  { type: 'First Layer', suggestion: '105-115%', percent: 110 },
  { type: 'Outer Wall', suggestion: '105-150%', percent: 150 },
  { type: 'Inner Wall', suggestion: '120-125%', percent: 125 },
  { type: 'Top Surface', suggestion: '100-105%', percent: 105 },
  { type: 'Sparse Infill', suggestion: '125%', percent: 125 },
  { type: 'Internal Solid Infill', suggestion: '125%', percent: 125 },
  { type: 'Support', suggestion: '95-105%', percent: 95 },
]

const calculateWidth = (percent: number) => {
  if (nozzleDiameter.value > 0) {
    return calculateLineWidth(nozzleDiameter.value, percent).toFixed(2)
  }
  return '...'
}
</script>
