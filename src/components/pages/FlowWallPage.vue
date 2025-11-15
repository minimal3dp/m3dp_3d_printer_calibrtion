<template>
  <CalcLayout title="Flow Calibration (Wall Thickness)">
    <!-- Filament Selection -->
    <CalcCard title="1. Select Filament Type (Optional)">
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-4">
        <button
          v-for="material in materials"
          :key="material.type"
          @click="selectedMaterial = material.type"
          :class="[
            'p-3 rounded-lg border-2 transition-all text-center',
            selectedMaterial === material.type
              ? 'border-cyan-400 bg-cyan-400/10'
              : 'border-gray-600 bg-gray-700/50 hover:border-gray-500'
          ]"
        >
          <div class="text-xl mb-1">{{ material.icon }}</div>
          <div class="text-xs font-semibold text-white">{{ material.type }}</div>
        </button>
      </div>

      <AlertBox :type="materialInfo.type">
        <p class="text-sm"><strong>{{ materialInfo.name }}</strong></p>
        <p class="text-xs mt-1">{{ materialInfo.description }}</p>
        <div class="mt-2 text-xs">
          <strong>Typical Flow Range:</strong> {{ materialInfo.flowRange }}<br>
          <strong>Temperature Range:</strong> {{ materialInfo.tempRange }}°C
        </div>
      </AlertBox>
    </CalcCard>

    <!-- Wall Thickness Method -->
    <CalcCard title="2. Wall Thickness Calibration">
      <div class="mb-4">
        <AlertBox type="info">
          <p class="text-sm"><strong>Instructions:</strong></p>
          <ol class="text-xs mt-2 space-y-1 ml-4 list-decimal">
            <li>Slice a hollow cube with <strong>2 perimeters</strong> and <strong>0% infill</strong></li>
            <li>Set your line width (typically 110-125% of nozzle diameter)</li>
            <li>Print the test cube</li>
            <li>Measure all four walls with calipers at multiple heights</li>
            <li>Calculate the average and adjust flow multiplier</li>
          </ol>
        </AlertBox>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-4">
          <CalcInput v-model="lineWidth" label="Slicer Line Width" unit="mm" hint="Typically 0.45-0.5mm for 0.4mm nozzle" />
          <CalcInput v-model="perimeters" label="Slicer Perimeters" :step="1" hint="Use 2 for this test" />
          
          <div class="border-t border-gray-700 pt-4">
            <p class="text-sm font-semibold text-white mb-2">Wall Measurements:</p>
            <div class="space-y-3">
              <CalcInput v-model="m1" label="Wall 1 (North)" unit="mm" placeholder="e.g., 0.95" />
              <CalcInput v-model="m2" label="Wall 2 (East)" unit="mm" placeholder="e.g., 0.94" />
              <CalcInput v-model="m3" label="Wall 3 (South)" unit="mm" placeholder="e.g., 0.95" />
              <CalcInput v-model="m4" label="Wall 4 (West)" unit="mm" placeholder="e.g., 0.96" />
            </div>
          </div>
        </div>

        <div class="space-y-4">
          <CalcResult :value="expected" label="Expected Thickness" unit="mm" :decimals="3" />
          <CalcResult :value="average" label="Average Measured Thickness" unit="mm" :decimals="4" />
          <CalcResult :value="flowPercentage" label="New Flow Multiplier" unit="%" :decimals="1" :copyable="true" />
          
          <div v-if="flowDifference" class="bg-gray-700/50 p-4 rounded-lg border" :class="flowDifferenceColor">
            <p class="text-sm font-semibold mb-1">📊 Analysis: {{ flowDifferenceMessage }}</p>
            <p class="text-xs">Adjustment needed: {{ flowDifference > 0 ? '+' : '' }}{{ flowDifference.toFixed(1) }}%</p>
          </div>

          <AlertBox type="info">
            <p class="text-sm"><strong>Formula:</strong> New Flow = 100% × (Expected / Measured Average)</p>
            <p class="text-xs mt-1">If walls are thinner than expected, increase flow. If thicker, decrease flow.</p>
          </AlertBox>

          <CommandBlock
            v-if="flowPercentage > 0"
            label="Update your slicer settings"
            :command="`Flow Ratio: ${(flowPercentage / 100).toFixed(3)}\n# Previous: 1.000 (100%)\n# Measured: ${average.toFixed(3)}mm vs Expected: ${expected.toFixed(3)}mm\n# Date: ${new Date().toLocaleDateString()}`"
          />
        </div>
      </div>
    </CalcCard>

    <!-- Flow Recommendations -->
    <CalcCard title="3. Flow Calibration Best Practices">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p class="text-sm font-semibold text-white mb-2">📋 When to Calibrate Flow:</p>
          <ul class="text-sm text-gray-400 space-y-1 ml-4 list-disc">
            <li>After calibrating extruder rotation distance</li>
            <li>When switching to a new filament brand/type</li>
            <li>If print quality degrades (over/under extrusion)</li>
            <li>After changing nozzle or hotend</li>
            <li>Temperature changes affect flow (recalibrate per temp)</li>
          </ul>

          <p class="text-sm font-semibold text-white mt-4 mb-2">🎯 Calibration Order:</p>
          <ol class="text-sm text-gray-400 space-y-1 ml-4 list-decimal">
            <li><strong>Extruder Steps/Rotation Distance</strong> (mechanical)</li>
            <li><strong>Flow Multiplier</strong> (this test)</li>
            <li><strong>Pressure Advance</strong> (after flow is correct)</li>
            <li><strong>Temperature Tower</strong> (fine-tuning)</li>
          </ol>
        </div>

        <div>
          <p class="text-sm font-semibold text-white mb-2">💡 Troubleshooting:</p>
          <div class="space-y-2 text-xs text-gray-400">
            <div class="bg-gray-700/50 p-2 rounded">
              <strong class="text-white">Walls too thin (&lt;expected):</strong><br>
              Under-extrusion. Increase flow multiplier. Check for clogs or extruder issues.
            </div>
            <div class="bg-gray-700/50 p-2 rounded">
              <strong class="text-white">Walls too thick (&gt;expected):</strong><br>
              Over-extrusion. Decrease flow multiplier. Verify rotation distance is correct.
            </div>
            <div class="bg-gray-700/50 p-2 rounded">
              <strong class="text-white">Inconsistent walls:</strong><br>
              Check belt tension, check if filament diameter varies, ensure consistent temperature.
            </div>
            <div class="bg-gray-700/50 p-2 rounded">
              <strong class="text-white">Good at one temp, bad at another:</strong><br>
              Flow rate is temperature-dependent. Create separate profiles for different temps.
            </div>
          </div>
        </div>
      </div>
    </CalcCard>

    <!-- Temperature vs Flow Chart -->
    <CalcCard title="4. Temperature vs Flow Rate Guide">
      <AlertBox type="warning">
        <p class="text-sm">
          <strong>Important:</strong> Flow rate changes with temperature! Higher temperatures allow faster flow but may reduce quality. Lower temperatures are more precise but limit speed.
        </p>
      </AlertBox>

      <div class="mt-4 overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-gray-700">
            <tr>
              <th class="px-4 py-2 text-left">Material</th>
              <th class="px-4 py-2 text-center">Low Temp</th>
              <th class="px-4 py-2 text-center">Mid Temp</th>
              <th class="px-4 py-2 text-center">High Temp</th>
              <th class="px-4 py-2 text-left">Notes</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-700">
            <tr>
              <td class="px-4 py-3 font-semibold">PLA</td>
              <td class="px-4 py-3 text-center text-gray-400">195-200°C<br><span class="text-xs">95-98% flow</span></td>
              <td class="px-4 py-3 text-center text-cyan-400">205-215°C<br><span class="text-xs">100% flow</span></td>
              <td class="px-4 py-3 text-center text-yellow-400">220-230°C<br><span class="text-xs">102-105% flow</span></td>
              <td class="px-4 py-3 text-xs">Higher temps risk stringing. Keep at 200-215°C for best quality.</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-semibold">PETG</td>
              <td class="px-4 py-3 text-center text-gray-400">230-235°C<br><span class="text-xs">96-98% flow</span></td>
              <td class="px-4 py-3 text-center text-cyan-400">240-250°C<br><span class="text-xs">100% flow</span></td>
              <td class="px-4 py-3 text-center text-yellow-400">255-260°C<br><span class="text-xs">103-106% flow</span></td>
              <td class="px-4 py-3 text-xs">Very temperature sensitive. Test in 5°C increments.</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-semibold">ABS</td>
              <td class="px-4 py-3 text-center text-gray-400">230-235°C<br><span class="text-xs">95-97% flow</span></td>
              <td class="px-4 py-3 text-center text-cyan-400">240-250°C<br><span class="text-xs">100% flow</span></td>
              <td class="px-4 py-3 text-center text-yellow-400">255-265°C<br><span class="text-xs">104-108% flow</span></td>
              <td class="px-4 py-3 text-xs">Higher temps improve layer adhesion, require enclosure.</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-semibold">ASA</td>
              <td class="px-4 py-3 text-center text-gray-400">235-240°C<br><span class="text-xs">96-98% flow</span></td>
              <td class="px-4 py-3 text-center text-cyan-400">245-255°C<br><span class="text-xs">100% flow</span></td>
              <td class="px-4 py-3 text-center text-yellow-400">260-270°C<br><span class="text-xs">103-107% flow</span></td>
              <td class="px-4 py-3 text-xs">Similar to ABS. Better UV resistance.</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-semibold">TPU</td>
              <td class="px-4 py-3 text-center text-gray-400">210-220°C<br><span class="text-xs">92-95% flow</span></td>
              <td class="px-4 py-3 text-center text-cyan-400">225-235°C<br><span class="text-xs">100% flow</span></td>
              <td class="px-4 py-3 text-center text-yellow-400">240-250°C<br><span class="text-xs">105-110% flow</span></td>
              <td class="px-4 py-3 text-xs">Print slow (20-40mm/s). Direct drive recommended.</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-semibold">Nylon</td>
              <td class="px-4 py-3 text-center text-gray-400">240-245°C<br><span class="text-xs">94-96% flow</span></td>
              <td class="px-4 py-3 text-center text-cyan-400">250-260°C<br><span class="text-xs">100% flow</span></td>
              <td class="px-4 py-3 text-center text-yellow-400">265-275°C<br><span class="text-xs">105-110% flow</span></td>
              <td class="px-4 py-3 text-xs">Hygroscopic - dry before printing. Higher temps = stronger parts.</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-semibold">PC</td>
              <td class="px-4 py-3 text-center text-gray-400">260-270°C<br><span class="text-xs">95-97% flow</span></td>
              <td class="px-4 py-3 text-center text-cyan-400">275-285°C<br><span class="text-xs">100% flow</span></td>
              <td class="px-4 py-3 text-center text-yellow-400">290-300°C<br><span class="text-xs">104-108% flow</span></td>
              <td class="px-4 py-3 text-xs">Requires all-metal hotend. Enclosure mandatory.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="mt-4 text-xs text-gray-400">
        <strong>Note:</strong> These are general guidelines. Actual values vary by brand, color additives, and printer setup. Always calibrate for your specific combination.
      </div>
    </CalcCard>

    <!-- References -->
    <CalcCard title="References & Alternative Methods">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p class="text-sm font-semibold text-white mb-2">📚 Documentation:</p>
          <ul class="text-sm text-gray-400 space-y-1 ml-4 list-disc">
            <li>
              <a href="https://ellis3dp.com/Print-Tuning-Guide/articles/extrusion_multiplier.html" target="_blank" rel="noopener" class="text-cyan-400 hover:underline">
                Ellis3DP - Extrusion Multiplier Calibration
              </a>
            </li>
            <li>
              <a href="https://github.com/SoftFever/OrcaSlicer/wiki/Calibration" target="_blank" rel="noopener" class="text-cyan-400 hover:underline">
                OrcaSlicer Flow Calibration
              </a>
            </li>
            <li>
              <a href="https://teachingtechyt.github.io/calibration.html#flow" target="_blank" rel="noopener" class="text-cyan-400 hover:underline">
                TeachingTech Flow Calibration
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p class="text-sm font-semibold text-white mb-2">🔄 Alternative Methods:</p>
          <ul class="text-sm text-gray-400 space-y-1 ml-4 list-disc">
            <li><a href="#orca-flow" class="text-cyan-400 hover:underline">OrcaSlicer Pass 1 & 2</a> (recommended for OrcaSlicer users)</li>
            <li><a href="#orca-flow" class="text-cyan-400 hover:underline">OrcaSlicer YOLO Method</a> (quick adjustment)</li>
            <li>Single-wall method (advanced users)</li>
            <li>SuperSlicer's built-in calibration</li>
          </ul>
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
import { calculateFlowFromWall } from '../../utils/calculations'

// Material types
type MaterialType = 'PLA' | 'PETG' | 'ABS' | 'ASA' | 'TPU' | 'Nylon' | 'PC'

const materials = [
  { type: 'PLA' as MaterialType, icon: '🌱' },
  { type: 'PETG' as MaterialType, icon: '💧' },
  { type: 'ABS' as MaterialType, icon: '🔥' },
  { type: 'ASA' as MaterialType, icon: '☀️' },
  { type: 'TPU' as MaterialType, icon: '🔀' },
  { type: 'Nylon' as MaterialType, icon: '💪' },
  { type: 'PC' as MaterialType, icon: '🛡️' }
]

const selectedMaterial = ref<MaterialType>('PLA')

const materialInfo = computed(() => {
  const info = {
    'PLA': {
      name: 'PLA (Polylactic Acid)',
      description: 'Most common beginner filament. Easy to print, biodegradable, low warping.',
      flowRange: '95-105% (typically 100%)',
      tempRange: '195-230',
      type: 'info' as const
    },
    'PETG': {
      name: 'PETG (Polyethylene Terephthalate Glycol)',
      description: 'Durable, flexible, good layer adhesion. More stringing than PLA.',
      flowRange: '95-108% (typically 100-102%)',
      tempRange: '230-260',
      type: 'info' as const
    },
    'ABS': {
      name: 'ABS (Acrylonitrile Butadiene Styrene)',
      description: 'Strong, heat resistant. Requires enclosure due to warping and fumes.',
      flowRange: '95-110% (typically 100-105%)',
      tempRange: '230-265',
      type: 'warning' as const
    },
    'ASA': {
      name: 'ASA (Acrylonitrile Styrene Acrylate)',
      description: 'Similar to ABS but UV resistant. Better outdoor durability.',
      flowRange: '96-108% (typically 100-104%)',
      tempRange: '235-270',
      type: 'warning' as const
    },
    'TPU': {
      name: 'TPU (Thermoplastic Polyurethane)',
      description: 'Flexible rubber-like material. Print slowly, direct drive recommended.',
      flowRange: '92-110% (varies by hardness)',
      tempRange: '210-250',
      type: 'info' as const
    },
    'Nylon': {
      name: 'Nylon (Polyamide)',
      description: 'Very strong, flexible, abrasion resistant. Absorbs moisture - must dry.',
      flowRange: '94-110% (typically 100-105%)',
      tempRange: '240-275',
      type: 'warning' as const
    },
    'PC': {
      name: 'PC (Polycarbonate)',
      description: 'Extremely strong, heat resistant. Requires high temp hotend and enclosure.',
      flowRange: '95-108% (typically 100-104%)',
      tempRange: '260-300',
      type: 'warning' as const
    }
  }
  return info[selectedMaterial.value]
})

const lineWidth = ref(0.5)
const perimeters = ref(2)
const m1 = ref(0)
const m2 = ref(0)
const m3 = ref(0)
const m4 = ref(0)

const result = computed(() => {
  if (lineWidth.value > 0 && perimeters.value > 0 && m1.value > 0 && m2.value > 0 && m3.value > 0 && m4.value > 0) {
    return calculateFlowFromWall(lineWidth.value, perimeters.value, [m1.value, m2.value, m3.value, m4.value])
  }
  return { expected: 0, average: 0, flow: 0 }
})

const expected = computed(() => result.value.expected)
const average = computed(() => result.value.average)
const flowPercentage = computed(() => result.value.flow)

// Calculate flow difference from 100%
const flowDifference = computed(() => {
  if (flowPercentage.value > 0) {
    return flowPercentage.value - 100
  }
  return null
})

const flowDifferenceMessage = computed(() => {
  if (!flowDifference.value) return ''
  const diff = Math.abs(flowDifference.value)
  
  if (diff < 2) {
    return 'Excellent! Flow is nearly perfect.'
  } else if (diff < 5) {
    return 'Good calibration. Minor adjustment recommended.'
  } else if (diff < 10) {
    return 'Moderate adjustment needed.'
  } else {
    return 'Significant adjustment required. Check extruder calibration first.'
  }
})

const flowDifferenceColor = computed(() => {
  if (!flowDifference.value) return 'border-gray-600'
  const diff = Math.abs(flowDifference.value)
  
  if (diff < 2) {
    return 'border-green-500'
  } else if (diff < 5) {
    return 'border-yellow-500'
  } else {
    return 'border-red-500'
  }
})
</script>
