<template>
  <CalcLayout title="OrcaSlicer Flow Calibration (Recommended)">
    <!-- Introduction -->
    <CalcCard title="Overview">
      <AlertBox type="info">
        <p class="text-sm">
          <strong>OrcaSlicer Flow Calibration</strong> uses visual test patterns to find the optimal flow rate. This is the <strong>recommended method</strong> for OrcaSlicer users as it's quick, accurate, and accounts for your specific printer/filament combination.
        </p>
      </AlertBox>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div class="bg-gray-700/50 p-4 rounded-lg">
          <p class="text-sm font-semibold text-white mb-2">📐 Pass 1 & Pass 2 (Recommended)</p>
          <p class="text-xs text-gray-400">Two-step method for precise calibration:</p>
          <ul class="text-xs text-gray-400 mt-2 space-y-1 ml-4 list-disc">
            <li><strong>Pass 1:</strong> Coarse adjustment (-10% to +10%)</li>
            <li><strong>Pass 2:</strong> Fine-tuning (-2% to +2%)</li>
            <li><strong>Time:</strong> ~30 minutes</li>
            <li><strong>Accuracy:</strong> Excellent</li>
          </ul>
        </div>

        <div class="bg-gray-700/50 p-4 rounded-lg">
          <p class="text-sm font-semibold text-white mb-2">⚡ YOLO Method</p>
          <p class="text-xs text-gray-400">Quick single-step calibration:</p>
          <ul class="text-xs text-gray-400 mt-2 space-y-1 ml-4 list-disc">
            <li>Single test with direct value adjustment</li>
            <li>Range: -0.10 to +0.10 (additive)</li>
            <li><strong>Time:</strong> ~15 minutes</li>
            <li><strong>Accuracy:</strong> Good for quick adjustments</li>
          </ul>
        </div>
      </div>
    </CalcCard>

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

    <!-- How to Use OrcaSlicer Calibration -->
    <CalcCard title="How to Run OrcaSlicer Flow Calibration">
      <div class="space-y-4">
        <div>
          <p class="text-sm font-semibold text-white mb-2">🖥️ Step-by-Step Instructions:</p>
          <ol class="text-sm text-gray-400 space-y-2 ml-4 list-decimal">
            <li>
              <strong>Open OrcaSlicer</strong> and select your printer/filament profiles
            </li>
            <li>
              Navigate to: <code class="bg-gray-700 px-2 py-1 rounded">Calibration → Flow Rate</code>
            </li>
            <li>
              Choose either <strong>Pass 1 & Pass 2</strong> or <strong>YOLO</strong> method
            </li>
            <li>
              <strong>For Pass 1:</strong> Select a coarse step size (-10% to +10%), click Generate
            </li>
            <li>
              Print the test and <strong>examine under good lighting</strong> (ideally angled light)
            </li>
            <li>
              Look for the <strong>smoothest, most uniform surface</strong> - no over-extrusion bumps or under-extrusion gaps
            </li>
            <li>
              Note the <strong>percentage value</strong> of the best patch (e.g., -5%, 0%, +3%)
            </li>
            <li>
              Enter that value in the calculator above to get your new flow multiplier
            </li>
            <li>
              <strong>For Pass 2:</strong> Repeat with fine adjustment (-2% to +2%)
            </li>
            <li>
              Update your filament profile's Flow Ratio setting
            </li>
          </ol>
        </div>

        <AlertBox type="warning">
          <p class="text-sm">
            <strong>Visual Inspection Tips:</strong>
          </p>
          <ul class="text-xs mt-2 space-y-1 ml-4 list-disc">
            <li><strong>Over-extrusion:</strong> Bulging, rough texture, blobs at corners</li>
            <li><strong>Under-extrusion:</strong> Gaps between lines, matte finish, weak layers</li>
            <li><strong>Perfect flow:</strong> Smooth, glossy surface, no gaps or bumps</li>
            <li><strong>Lighting:</strong> Use a flashlight at an angle to see surface texture</li>
          </ul>
        </AlertBox>

        <div class="bg-cyan-400/10 border border-cyan-400/30 p-4 rounded-lg">
          <p class="text-sm text-cyan-200">
            <strong>💡 Pro Tip:</strong> Take photos of each patch with your phone. It's easier to compare them side-by-side than looking at the print from different angles. Use photo editing to increase contrast if needed.
          </p>
        </div>
      </div>
    </CalcCard>

    <!-- Unified Recommendations -->
    <CalcCard title="Flow Calibration Best Practices">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p class="text-sm font-semibold text-white mb-2">✅ Do's:</p>
          <ul class="text-sm text-gray-400 space-y-1 ml-4 list-disc">
            <li>Calibrate extruder rotation distance <strong>first</strong></li>
            <li>Use the same line width you'll print with</li>
            <li>Calibrate at your normal printing temperature</li>
            <li>Print on a clean, level bed</li>
            <li>Wait for test to cool before judging</li>
            <li>Recalibrate for each new filament brand/color</li>
            <li>Save profiles for different materials</li>
          </ul>
        </div>

        <div>
          <p class="text-sm font-semibold text-white mb-2">❌ Don'ts:</p>
          <ul class="text-sm text-gray-400 space-y-1 ml-4 list-disc">
            <li>Don't calibrate flow before extruder steps</li>
            <li>Don't use a different temp than your prints</li>
            <li>Don't judge by top surface alone (check sides too)</li>
            <li>Don't assume all filaments of same type need same flow</li>
            <li>Don't over-adjust - flow should rarely be >105% or <95%</li>
            <li>If flow is way off (&gt;10%), check extruder calibration</li>
          </ul>
        </div>
      </div>

      <div class="mt-4 bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-lg">
        <p class="text-sm text-yellow-200">
          <strong>⚠️ Troubleshooting:</strong> If your flow multiplier ends up very high (&gt;110%) or very low (&lt;90%), there's likely an issue with your extruder calibration (rotation distance). Go back and verify that first.
        </p>
      </div>
    </CalcCard>

    <!-- Alternative Methods -->
    <CalcCard title="Alternative Flow Calibration Methods">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-gray-700/50 p-4 rounded-lg">
          <p class="text-sm font-semibold text-white mb-2">📏 Wall Thickness Method</p>
          <p class="text-xs text-gray-400 mb-2">
            Print a hollow cube and measure walls with calipers. More precise but requires tools.
          </p>
          <a href="#flow-wall" class="text-cyan-400 hover:underline text-xs">
            → Go to Wall Thickness Calculator
          </a>
        </div>

        <div class="bg-gray-700/50 p-4 rounded-lg">
          <p class="text-sm font-semibold text-white mb-2">🎯 Single Wall Method</p>
          <p class="text-xs text-gray-400 mb-2">
            Advanced: Print single-wall test and measure with micrometer. Most accurate.
          </p>
          <p class="text-xs text-gray-500">
            (Not yet implemented - use Ellis3DP guide)
          </p>
        </div>

        <div class="bg-gray-700/50 p-4 rounded-lg">
          <p class="text-sm font-semibold text-white mb-2">📊 SuperSlicer Built-in</p>
          <p class="text-xs text-gray-400 mb-2">
            SuperSlicer has built-in flow calibration similar to OrcaSlicer's method.
          </p>
          <a href="https://github.com/supermerill/SuperSlicer/wiki/Calibration" target="_blank" rel="noopener" class="text-cyan-400 hover:underline text-xs">
            → SuperSlicer Wiki ↗
          </a>
        </div>

        <div class="bg-gray-700/50 p-4 rounded-lg">
          <p class="text-sm font-semibold text-white mb-2">🧪 Test Cube Method</p>
          <p class="text-xs text-gray-400 mb-2">
            Print 20mm calibration cube and measure with calipers. Simple but less accurate.
          </p>
          <a href="https://www.thingiverse.com/thing:1278865" target="_blank" rel="noopener" class="text-cyan-400 hover:underline text-xs">
            → Download Test Cube ↗
          </a>
        </div>
      </div>
    </CalcCard>

    <!-- References -->
    <CalcCard title="References & Documentation">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p class="text-sm font-semibold text-white mb-2">📚 Official Documentation:</p>
          <ul class="text-sm text-gray-400 space-y-1 ml-4 list-disc">
            <li>
              <a href="https://github.com/SoftFever/OrcaSlicer/wiki/Calibration" target="_blank" rel="noopener" class="text-cyan-400 hover:underline">
                OrcaSlicer Calibration Wiki
              </a>
            </li>
            <li>
              <a href="https://ellis3dp.com/Print-Tuning-Guide/articles/extrusion_multiplier.html" target="_blank" rel="noopener" class="text-cyan-400 hover:underline">
                Ellis3DP - Extrusion Multiplier Guide
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
          <p class="text-sm font-semibold text-white mb-2">🎥 Video Tutorials:</p>
          <ul class="text-sm text-gray-400 space-y-1 ml-4 list-disc">
            <li>
              <a href="https://www.youtube.com/results?search_query=orcaslicer+flow+calibration" target="_blank" rel="noopener" class="text-cyan-400 hover:underline">
                OrcaSlicer Flow Calibration Videos
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/c/TeachingTech" target="_blank" rel="noopener" class="text-cyan-400 hover:underline">
                TeachingTech YouTube Channel
              </a>
            </li>
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
