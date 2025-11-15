<template>
  <CalcLayout title="Extruder Rotation Distance">
    <!-- Extruder Type Selection -->
    <CalcCard title="1. Select Your Extruder Type">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <button
          v-for="type in extruderTypes"
          :key="type.value"
          @click="selectedExtruderType = type.value"
          :class="[
            'p-4 rounded-lg border-2 transition-all',
            selectedExtruderType === type.value
              ? 'border-cyan-400 bg-cyan-400/10 shadow-lg shadow-cyan-400/20'
              : 'border-gray-600 bg-gray-700/50 hover:border-gray-500'
          ]"
        >
          <div class="text-2xl mb-2">{{ type.icon }}</div>
          <div class="font-semibold text-white">{{ type.label }}</div>
          <div class="text-xs text-gray-400 mt-1">{{ type.description }}</div>
        </button>
      </div>

      <AlertBox :type="extruderTypeInfo.type">
        <p class="text-sm"><strong>{{ extruderTypeInfo.title }}</strong></p>
        <p class="text-sm mt-1">{{ extruderTypeInfo.message }}</p>
      </AlertBox>
    </CalcCard>

    <!-- Method Selection -->
    <CalcCard title="2. Choose Calibration Method">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <button
          @click="calculationMethod = 'esteps'"
          :class="[
            'p-4 rounded-lg border-2 transition-all text-left',
            calculationMethod === 'esteps'
              ? 'border-yellow-400 bg-yellow-400/10'
              : 'border-gray-600 bg-gray-700/50 hover:border-gray-500'
          ]"
        >
          <div class="font-semibold text-white mb-1">Quick Conversion from E-Steps</div>
          <div class="text-sm text-gray-400">Convert Marlin/RRF E-steps to Klipper rotation distance</div>
          <div class="text-xs text-gray-500 mt-2">⏱️ ~1 minute • No physical measurement needed</div>
        </button>

        <button
          @click="calculationMethod = 'measurement'"
          :class="[
            'p-4 rounded-lg border-2 transition-all text-left',
            calculationMethod === 'measurement'
              ? 'border-yellow-400 bg-yellow-400/10'
              : 'border-gray-600 bg-gray-700/50 hover:border-gray-500'
          ]"
        >
          <div class="font-semibold text-white mb-1">Physical Measurement (Most Accurate)</div>
          <div class="text-sm text-gray-400">Mark and measure actual filament extrusion</div>
          <div class="text-xs text-gray-500 mt-2">⏱️ ~5-10 minutes • Requires ruler and marker</div>
        </button>
      </div>
    </CalcCard>

    <!-- E-Steps Method -->
    <CalcCard v-if="calculationMethod === 'esteps'" title="3. Calculate from E-Steps">
      <div class="mb-4">
        <AlertBox type="info">
          <p class="text-sm">
            <strong>Converting from Marlin/RepRapFirmware?</strong> This method converts your old E-steps value to Klipper's rotation_distance format.
          </p>
        </AlertBox>
      </div>

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
              <option :value="200">1.8° Stepper (200 steps/rev) - Most Common</option>
              <option :value="400">0.9° Stepper (400 steps/rev) - High Precision</option>
            </select>
            <p class="text-xs text-gray-400 mt-1">Check your stepper motor specification (usually printed on motor)</p>
          </div>

          <CalcInput
            v-model="microsteps"
            label="Microsteps"
            :step="1"
            hint="Common values: 16, 32, 64, 128"
          />
          <p class="text-xs text-gray-400 -mt-3">Found in your TMC driver configuration (e.g., TMC2209 typically uses 16 or 32)</p>

          <CalcInput
            v-model="eSteps"
            label="Your Old E-Steps Value"
            placeholder="e.g., 400"
            hint="From Marlin (M503) or RepRapFirmware (M92)"
          />
          <p class="text-xs text-gray-400 -mt-3">
            <strong>Marlin:</strong> Send <code class="bg-gray-700 px-1 py-0.5 rounded">M503</code> and look for "M92 E"<br>
            <strong>RRF:</strong> Send <code class="bg-gray-700 px-1 py-0.5 rounded">M92</code> to see current E-steps
          </p>
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
            <p class="text-sm"><strong>Formula:</strong></p>
            <p class="text-xs font-mono mt-1">rotation_distance = (full_steps × microsteps) / e_steps</p>
            <p class="text-xs mt-2">
              <strong>Example:</strong> (200 × 16) / 400 = 8.000 mm
            </p>
          </AlertBox>

          <CommandBlock
            v-if="rotationFromESteps > 0"
            label="Add to printer.cfg [extruder] section"
            :command="`rotation_distance: ${rotationFromESteps.toFixed(3)}`"
          />

          <AlertBox v-if="rotationFromESteps > 0" type="warning">
            <p class="text-sm">
              <strong>Next Step:</strong> This is a calculated estimate. For best accuracy, verify with the physical measurement method below and fine-tune with flow calibration.
            </p>
          </AlertBox>
        </div>
      </div>
    </CalcCard>

    <!-- Measurement Method with Wizard -->
    <div v-if="calculationMethod === 'measurement'">
      <!-- Wizard Progress -->
      <CalcCard title="3. Physical Measurement Wizard">
        <div class="mb-6">
          <div class="flex items-center justify-between mb-2">
            <div
              v-for="(step, index) in wizardSteps"
              :key="index"
              class="flex items-center flex-1"
            >
              <div
                :class="[
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all',
                  currentWizardStep >= index
                    ? 'bg-cyan-400 text-gray-900'
                    : 'bg-gray-700 text-gray-400'
                ]"
              >
                {{ index + 1 }}
              </div>
              <div
                v-if="index < wizardSteps.length - 1"
                :class="[
                  'flex-1 h-1 mx-2 transition-all',
                  currentWizardStep > index ? 'bg-cyan-400' : 'bg-gray-700'
                ]"
              ></div>
            </div>
          </div>
          <div class="text-center">
            <p class="text-sm text-gray-300 font-semibold">{{ wizardSteps[currentWizardStep].title }}</p>
            <p class="text-xs text-gray-400 mt-1">{{ wizardSteps[currentWizardStep].description }}</p>
          </div>
        </div>

        <!-- Step 0: Preparation -->
        <div v-if="currentWizardStep === 0" class="space-y-4">
          <AlertBox type="info">
            <p class="text-sm"><strong>You will need:</strong></p>
            <ul class="text-sm mt-2 space-y-1 ml-4 list-disc">
              <li>Permanent marker (Sharpie or similar)</li>
              <li>Ruler or calipers (at least 120mm range)</li>
              <li>Scissors or wire cutters</li>
              <li>Access to your printer console (Mainsail/Fluidd/OctoPrint)</li>
            </ul>
          </AlertBox>

          <div class="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
            <p class="text-sm font-semibold text-white mb-2">🔧 Preparation Steps:</p>
            <ol class="text-sm text-gray-300 space-y-2 ml-4 list-decimal">
              <li>Heat your hotend to normal printing temperature (e.g., 200°C for PLA)</li>
              <li>Remove filament from hotend completely (unload)</li>
              <li>Cut the tip of your filament straight across</li>
              <li>Ensure extruder gears are clean (no debris)</li>
              <li>If using Bowden: disconnect tube at hotend, leave connected to extruder</li>
            </ol>
          </div>

          <div class="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-lg">
            <p class="text-sm text-yellow-200"><strong>⚠️ {{ extruderTypeInfo.measurementTip }}</strong></p>
          </div>

          <button
            @click="currentWizardStep = 1"
            class="w-full bg-cyan-400 hover:bg-cyan-500 text-gray-900 font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            I'm Ready → Mark Filament
          </button>
        </div>

        <!-- Step 1: Mark Filament -->
        <div v-if="currentWizardStep === 1" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
              <p class="text-sm text-gray-300">
                <strong>Instructions:</strong>
              </p>
              <ol class="text-sm text-gray-400 space-y-2 ml-4 list-decimal">
                <li>Insert filament into extruder until it reaches the entrance</li>
                <li>Using your ruler, measure <strong>120mm</strong> up from the extruder entrance</li>
                <li>Make a clear mark with your permanent marker at exactly 120mm</li>
                <li>Double-check your measurement before proceeding</li>
              </ol>

              <CalcInput
                v-model="initialMark"
                label="Initial Mark Distance"
                unit="mm"
                :step="1"
                hint="Recommended: 120mm (ensures mark stays visible)"
              />

              <AlertBox type="info">
                <p class="text-sm">
                  <strong>Tip:</strong> Use 120mm to ensure your mark doesn't get pulled into the extruder during the test. You can use a different value if needed.
                </p>
              </AlertBox>
            </div>

            <div class="bg-gray-700/30 rounded-lg p-4 border border-gray-600">
              <p class="text-xs text-gray-400 mb-2 text-center">Visual Guide</p>
              <div class="bg-gray-800 rounded p-6 text-center">
                <div class="space-y-3">
                  <div class="flex items-center justify-center">
                    <div class="text-6xl">📏</div>
                  </div>
                  <div class="text-sm text-gray-300">
                    <span class="text-yellow-400 font-bold">← 120mm →</span>
                  </div>
                  <div class="text-xs text-gray-400">
                    ┌── Mark here (Sharpie)
                  </div>
                  <div class="border-t-2 border-red-500 w-16 mx-auto"></div>
                  <div class="text-xs text-gray-500">↑</div>
                  <div class="text-xs text-gray-400">Filament</div>
                  <div class="text-xs text-gray-500">↓</div>
                  <div class="bg-cyan-400/20 rounded p-2 text-xs">
                    Extruder Entrance
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="flex gap-3">
            <button
              @click="currentWizardStep = 0"
              class="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors"
            >
              ← Back
            </button>
            <button
              @click="currentWizardStep = 2"
              :disabled="initialMark <= 0"
              :class="[
                'flex-1 font-semibold py-2 px-4 rounded-lg transition-colors',
                initialMark > 0
                  ? 'bg-cyan-400 hover:bg-cyan-500 text-gray-900'
                  : 'bg-gray-700 text-gray-500 cursor-not-allowed'
              ]"
            >
              Mark Made → Input Previous Value
            </button>
          </div>
        </div>

        <!-- Step 2: Input Previous Rotation Distance -->
        <div v-if="currentWizardStep === 2" class="space-y-4">
          <AlertBox type="info">
            <p class="text-sm">
              <strong>Enter your current rotation_distance value from printer.cfg</strong>
            </p>
            <p class="text-xs mt-1">
              Found in the <code class="bg-gray-700 px-1 py-0.5 rounded">[extruder]</code> section of your Klipper config.
              If this is your first calibration, use a starting value based on your extruder type.
            </p>
          </AlertBox>

          <CalcInput
            v-model="prevRotation"
            label="Current Rotation Distance"
            unit="mm"
            placeholder="e.g., 22.678"
            hint="From printer.cfg [extruder] section"
          />

          <div class="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
            <p class="text-sm font-semibold text-white mb-2">📋 Common Starting Values (if unknown):</p>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
              <button
                v-for="preset in rotationPresets"
                :key="preset.value"
                @click="prevRotation = preset.value"
                class="bg-gray-700 hover:bg-gray-600 text-white text-xs py-2 px-3 rounded transition-colors"
              >
                {{ preset.label }}<br>
                <span class="text-gray-400">{{ preset.value }}mm</span>
              </button>
            </div>
          </div>

          <div class="flex gap-3">
            <button
              @click="currentWizardStep = 1"
              class="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors"
            >
              ← Back
            </button>
            <button
              @click="currentWizardStep = 3"
              :disabled="prevRotation <= 0"
              :class="[
                'flex-1 font-semibold py-2 px-4 rounded-lg transition-colors',
                prevRotation > 0
                  ? 'bg-cyan-400 hover:bg-cyan-500 text-gray-900'
                  : 'bg-gray-700 text-gray-500 cursor-not-allowed'
              ]"
            >
              Continue → Extrude Filament
            </button>
          </div>
        </div>

        <!-- Step 3: Extrude Filament -->
        <div v-if="currentWizardStep === 3" class="space-y-4">
          <AlertBox type="warning">
            <p class="text-sm">
              <strong>⚠️ Safety Check:</strong> Ensure your hotend is at printing temperature and there's nothing below the nozzle!
            </p>
          </AlertBox>

          <div class="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
            <p class="text-sm font-semibold text-white mb-2">🖥️ Console Commands:</p>
            <ol class="text-sm text-gray-300 space-y-2 ml-4 list-decimal">
              <li>Open your printer console (Mainsail/Fluidd/OctoPrint)</li>
              <li>Send command: <code class="bg-gray-800 px-2 py-1 rounded text-yellow-400">M83</code> (set extruder to relative mode)</li>
              <li>Send command: <code class="bg-gray-800 px-2 py-1 rounded text-yellow-400">G1 E100 F60</code> (extrude 100mm at slow speed)</li>
              <li>Wait for the extrusion to complete (takes ~1-2 minutes)</li>
            </ol>
          </div>

          <CalcInput
            v-model="requestedExtrude"
            label="Requested Extrude Amount"
            unit="mm"
            :step="1"
            hint="Amount in your G1 E command (typically 100mm)"
          />

          <div class="bg-cyan-400/10 border border-cyan-400/30 p-4 rounded-lg">
            <p class="text-sm text-cyan-200">
              <strong>💡 Pro Tip:</strong> Use F60 (60mm/min) for the feed rate. This slow speed prevents slipping and gives you time to stop if something goes wrong.
            </p>
          </div>

          <div class="flex gap-3">
            <button
              @click="currentWizardStep = 2"
              class="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors"
            >
              ← Back
            </button>
            <button
              @click="currentWizardStep = 4"
              :disabled="requestedExtrude <= 0"
              :class="[
                'flex-1 font-semibold py-2 px-4 rounded-lg transition-colors',
                requestedExtrude > 0
                  ? 'bg-cyan-400 hover:bg-cyan-500 text-gray-900'
                  : 'bg-gray-700 text-gray-500 cursor-not-allowed'
              ]"
            >
              Extrusion Complete → Measure Result
            </button>
          </div>
        </div>

        <!-- Step 4: Measure Result -->
        <div v-if="currentWizardStep === 4" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
              <p class="text-sm text-gray-300">
                <strong>Final Measurement:</strong>
              </p>
              <ol class="text-sm text-gray-400 space-y-2 ml-4 list-decimal">
                <li>Locate your original mark on the filament</li>
                <li>Measure the distance from the extruder entrance to your mark</li>
                <li>Enter this new measurement below</li>
              </ol>

              <CalcInput
                v-model="subsequentMark"
                label="Final Mark Distance"
                unit="mm"
                placeholder="e.g., 19.5"
                hint="Distance from extruder entrance to mark after extrusion"
              />

              <AlertBox type="info">
                <p class="text-sm">
                  <strong>What should I see?</strong>
                </p>
                <ul class="text-xs mt-1 space-y-1 ml-4 list-disc">
                  <li><strong>Mark closer (e.g., 20mm):</strong> Extruder is working well ✓</li>
                  <li><strong>Mark exactly at 20mm:</strong> Perfect calibration! 🎯</li>
                  <li><strong>Mark farther (e.g., 30mm):</strong> Extruder under-extruding</li>
                  <li><strong>Mark very close (&lt;5mm):</strong> Extruder over-extruding</li>
                </ul>
              </AlertBox>
            </div>

            <div class="space-y-4">
              <CalcResult
                :value="actualExtruded"
                label="Actual Extruded Distance"
                unit="mm"
                :decimals="2"
              />

              <CalcResult
                :value="rotationFromMeasurement"
                label="New Rotation Distance"
                unit="mm"
                :decimals="3"
                :copyable="true"
              />

              <div v-if="extrusionAccuracy" class="bg-gray-700/50 p-4 rounded-lg border" :class="extrusionAccuracyColor">
                <p class="text-sm font-semibold mb-1">📊 Accuracy: {{ extrusionAccuracy }}%</p>
                <p class="text-xs">{{ extrusionAccuracyMessage }}</p>
              </div>

              <CommandBlock
                v-if="showCommand"
                label="Update your printer.cfg [extruder] section"
                :command="`rotation_distance: ${rotationFromMeasurement.toFixed(3)}\n# Previous value: ${prevRotation.toFixed(3)}\n# Date: ${new Date().toLocaleDateString()}`"
              />
            </div>
          </div>

          <div class="flex gap-3">
            <button
              @click="currentWizardStep = 3"
              class="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors"
            >
              ← Back
            </button>
            <button
              @click="currentWizardStep = 5"
              :disabled="subsequentMark <= 0"
              :class="[
                'flex-1 font-semibold py-2 px-4 rounded-lg transition-colors',
                subsequentMark > 0
                  ? 'bg-green-500 hover:bg-green-600 text-white'
                  : 'bg-gray-700 text-gray-500 cursor-not-allowed'
              ]"
            >
              Done → See Next Steps
            </button>
          </div>
        </div>

        <!-- Step 5: Completion & Next Steps -->
        <div v-if="currentWizardStep === 5" class="space-y-4">
          <div class="bg-green-500/10 border-2 border-green-500 p-6 rounded-lg text-center">
            <div class="text-4xl mb-2">✅</div>
            <p class="text-lg font-semibold text-green-400">Extruder Calibration Complete!</p>
            <p class="text-sm text-gray-300 mt-2">
              Your new rotation distance: <span class="text-yellow-400 font-bold">{{ rotationFromMeasurement.toFixed(3) }}mm</span>
            </p>
          </div>

          <div class="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
            <p class="text-sm font-semibold text-white mb-2">📝 What to do next:</p>
            <ol class="text-sm text-gray-300 space-y-2 ml-4 list-decimal">
              <li>Copy the command above and add it to your <code class="bg-gray-800 px-1 py-0.5 rounded">printer.cfg</code></li>
              <li>Restart Klipper (Mainsail: FIRMWARE_RESTART)</li>
              <li>Verify the change by sending <code class="bg-gray-800 px-1 py-0.5 rounded">GET_POSITION</code></li>
              <li><strong>Important:</strong> Re-run this test to verify the new value is correct</li>
              <li>Once verified, proceed to <strong>Flow Calibration</strong> for fine-tuning</li>
            </ol>
          </div>

          <AlertBox type="info">
            <p class="text-sm">
              <strong>Should I test again?</strong> Yes! A second test confirms your calibration. The result should be within 0.5mm of your target (e.g., 99.5-100.5mm for a 100mm extrusion).
            </p>
          </AlertBox>

          <div class="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-lg">
            <p class="text-sm text-yellow-200 font-semibold mb-2">⚠️ Troubleshooting:</p>
            <ul class="text-xs text-gray-300 space-y-1 ml-4 list-disc">
              <li><strong>Extruder skipping/clicking:</strong> Hotend too cold, nozzle clogged, or extruder tension too tight</li>
              <li><strong>Filament not moving:</strong> Check idler arm tension, verify motor direction, ensure hotend is hot</li>
              <li><strong>Massive under-extrusion (>10mm off):</strong> Likely wrong microstep setting or motor wiring issue</li>
              <li><strong>Inconsistent results:</strong> Clean extruder gears, check filament diameter, ensure consistent temperature</li>
            </ul>
          </div>

          <div class="flex gap-3">
            <button
              @click="resetWizard"
              class="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors"
            >
              🔄 Start Over
            </button>
            <a
              href="#flow-wall"
              class="flex-1 bg-cyan-400 hover:bg-cyan-500 text-gray-900 font-semibold py-2 px-4 rounded-lg transition-colors text-center"
            >
              Next: Flow Calibration →
            </a>
          </div>
        </div>
      </CalcCard>
    </div>

    <!-- Reference & Tips -->
    <CalcCard title="References & Additional Information">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p class="text-sm font-semibold text-white mb-2">📚 Official Documentation:</p>
          <ul class="text-sm text-gray-400 space-y-1 ml-4 list-disc">
            <li>
              <a href="https://www.klipper3d.org/Rotation_Distance.html" target="_blank" rel="noopener" class="text-cyan-400 hover:underline">
                Klipper Rotation Distance
              </a>
            </li>
            <li>
              <a href="https://ellis3dp.com/Print-Tuning-Guide/articles/extruder_calibration.html" target="_blank" rel="noopener" class="text-cyan-400 hover:underline">
                Ellis3DP Extruder Calibration Guide
              </a>
            </li>
            <li>
              <a href="https://teachingtechyt.github.io/calibration.html#esteps" target="_blank" rel="noopener" class="text-cyan-400 hover:underline">
                TeachingTech E-Steps Guide
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p class="text-sm font-semibold text-white mb-2">💡 Pro Tips:</p>
          <ul class="text-sm text-gray-400 space-y-1 ml-4 list-disc">
            <li>Always calibrate at your normal printing temperature</li>
            <li>Use fresh filament (moisture can affect results)</li>
            <li>Clean extruder gears before calibration</li>
            <li>For Bowden setups, disconnect tube at hotend</li>
            <li>Re-test after any extruder maintenance</li>
            <li>Verify with a second test before proceeding to flow calibration</li>
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
import { calculateExtruderFromESteps, calculateExtruderFromMeasurement } from '../../utils/calculations'

// Extruder type selection
type ExtruderType = 'direct' | 'bowden' | 'dual'

const extruderTypes = [
  {
    value: 'direct' as ExtruderType,
    label: 'Direct Drive',
    icon: '⚡',
    description: 'Motor mounted on print head'
  },
  {
    value: 'bowden' as ExtruderType,
    label: 'Bowden',
    icon: '🔗',
    description: 'Motor on frame, PTFE tube'
  },
  {
    value: 'dual' as ExtruderType,
    label: 'Dual Drive',
    icon: '⚙️',
    description: 'Two gears grip filament'
  }
]

const selectedExtruderType = ref<ExtruderType>('direct')

const extruderTypeInfo = computed(() => {
  switch (selectedExtruderType.value) {
    case 'direct':
      return {
        type: 'info' as const,
        title: 'Direct Drive Extruder',
        message: 'Motor directly mounted to the print head. Typical rotation distance: 20-24mm. Known for better retraction control and flexible filament compatibility.',
        measurementTip: 'Direct Drive: Measure from where filament enters the extruder motor housing.'
      }
    case 'bowden':
      return {
        type: 'info' as const,
        title: 'Bowden Extruder',
        message: 'Motor mounted on frame with PTFE tube to hotend. Typical rotation distance: 20-24mm. For calibration, disconnect PTFE tube at hotend to measure accurately.',
        measurementTip: 'Bowden: Disconnect PTFE tube at hotend, measure from extruder motor. This prevents tube friction affecting results.'
      }
    case 'dual':
      return {
        type: 'info' as const,
        title: 'Dual Drive Extruder',
        message: 'Two counter-rotating gears grip filament (e.g., BMG, Orbiter). Typical rotation distance: 7-8mm. Higher precision and grip force than single gear designs.',
        measurementTip: 'Dual Drive: These often have smaller rotation distances (7-8mm). Mark and measure carefully.'
      }
    default:
      return {
        type: 'info' as const,
        title: 'Select your extruder type',
        message: 'Choose the type that matches your printer setup.',
        measurementTip: ''
      }
  }
})

// Calculation method selection
type CalculationMethod = 'esteps' | 'measurement'
const calculationMethod = ref<CalculationMethod>('measurement')

// Wizard state for measurement method
const currentWizardStep = ref(0)
const wizardSteps = [
  { title: 'Preparation', description: 'Gather tools and prepare printer' },
  { title: 'Mark Filament', description: 'Measure and mark starting point' },
  { title: 'Current Value', description: 'Input existing rotation distance' },
  { title: 'Extrude', description: 'Run extrusion test' },
  { title: 'Measure', description: 'Measure final result' },
  { title: 'Complete', description: 'Save and verify' }
]

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

// Rotation distance presets based on common extruder types
const rotationPresets = computed(() => {
  if (selectedExtruderType.value === 'dual') {
    return [
      { label: 'BMG', value: 7.71 },
      { label: 'Orbiter 2.0', value: 7.5 },
      { label: 'Sherpa Mini', value: 7.824 },
      { label: 'LGX Lite', value: 5.7 }
    ]
  } else {
    return [
      { label: 'Generic', value: 22.67 },
      { label: 'Voron M4', value: 22.23 },
      { label: 'Ender 3', value: 33.5 },
      { label: 'Prusa MK3', value: 23.0 }
    ]
  }
})

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

// Calculate extrusion accuracy
const extrusionAccuracy = computed(() => {
  if (requestedExtrude.value > 0 && actualExtruded.value > 0) {
    return ((actualExtruded.value / requestedExtrude.value) * 100).toFixed(1)
  }
  return null
})

const extrusionAccuracyMessage = computed(() => {
  if (!extrusionAccuracy.value) return ''
  const accuracy = parseFloat(extrusionAccuracy.value)
  
  if (accuracy >= 99 && accuracy <= 101) {
    return 'Excellent! Your extruder is very well calibrated.'
  } else if (accuracy >= 97 && accuracy <= 103) {
    return 'Good calibration. Within acceptable range.'
  } else if (accuracy >= 90 && accuracy <= 110) {
    return 'Needs adjustment. Apply the new rotation distance.'
  } else {
    return 'Significant deviation detected. Check for mechanical issues.'
  }
})

const extrusionAccuracyColor = computed(() => {
  if (!extrusionAccuracy.value) return 'border-gray-600'
  const accuracy = parseFloat(extrusionAccuracy.value)
  
  if (accuracy >= 99 && accuracy <= 101) {
    return 'border-green-500'
  } else if (accuracy >= 97 && accuracy <= 103) {
    return 'border-yellow-500'
  } else {
    return 'border-red-500'
  }
})

const resetWizard = () => {
  currentWizardStep.value = 0
  prevRotation.value = 0
  initialMark.value = 120
  requestedExtrude.value = 100
  subsequentMark.value = 0
}
</script>
