<template>
  <CalcLayout title="PID Tuning Guide">
    <p class="text-sm text-gray-400 mb-4">
      PID tuning calibrates the algorithm that keeps your hotend and heated bed at a stable temperature.
      A proper PID tune prevents large temperature fluctuations, which can cause print artifacts like banding and poor layer adhesion.
      You should perform a PID tune after changing any components related to heating, such as the heater cartridge, thermistor, or even the hotend fan.
    </p>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Left Column: Tuning -->
      <div class="space-y-4">
        <CalcCard title="Step 1: PID Tuning Commands">
          <p class="text-sm text-gray-300 mb-4">Select which heater to tune and set the target temperature. For the hotend, this should be the temperature you most commonly print with.</p>
          <div class="flex items-center space-x-4 mb-4">
            <select v-model="heaterSelection" class="bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400">
              <option value="extruder">Hotend (extruder)</option>
              <option value="heater_bed">Heated Bed (heater_bed)</option>
            </select>
            <CalcInput v-model="targetTemp" label="Target Temperature" unit="°C" />
          </div>
          <CommandBlock :command="pidCommand" />
        </CalcCard>

        <CalcCard title="Step 2: Save Configuration">
          <p class="text-sm text-gray-300 mb-4">After the PID tuning process completes successfully, your console will output the PID parameters. You must then save them to your configuration.</p>
          <CommandBlock command="SAVE_CONFIG" />
          <p class="text-xs text-gray-500 mt-2">This command will save the new PID values to the end of your `printer.cfg` file and restart Klipper.</p>
        </CalcCard>

        <CalcCard title="Step 3: Results Validation">
          <p class="text-sm text-gray-300 mb-4">After the restart, go to your printer's web interface (Mainsail/Fluidd) and watch the temperature graph for the heater you just tuned. Set it to the target temperature again.</p>
            <ul class="list-disc list-inside text-sm text-gray-300 space-y-2">
                <li>
                    <strong>Good Result:</strong> The temperature should quickly rise to the target, overshoot by no more than 1-2°C, and then settle firmly at the target with minimal fluctuation (ideally &lt; ±0.5°C).
                </li>
                <li>
                    <strong>Bad Result:</strong> The temperature swings wildly, takes a very long time to stabilize, or never quite settles at the target. If you see this, double-check your `printer.cfg` to ensure the new PID values were saved correctly and try the tuning process again.
                </li>
            </ul>
        </CalcCard>
      </div>

      <!-- Right Column: Instructions & Info -->
      <div class="space-y-4">
        <CalcCard title="Understanding PID Components">
            <dl class="text-sm text-gray-300 space-y-3">
                <div>
                    <dt class="font-semibold text-cyan-400">Proportional (P)</dt>
                    <dd class="ml-4">This is the main driving force. It applies power proportional to the difference between the current temperature and the target temperature. A higher P value means a more aggressive response to temperature errors.</dd>
                </div>
                <div>
                    <dt class="font-semibold text-cyan-400">Integral (I)</dt>
                    <dd class="ml-4">This component corrects for small, steady-state errors. It accumulates the error over time and adjusts the power to eliminate any residual temperature difference that the P term alone can't fix. It helps the heater hold the target temperature precisely.</dd>
                </div>
                <div>
                    <dt class="font-semibold text-cyan-400">Derivative (D)</dt>
                    <dd class="ml-4">This component anticipates the future. It looks at the rate of temperature change and dampens the heater's response as it approaches the target. This prevents overshooting and oscillations, helping the temperature to stabilize faster.</dd>
                </div>
            </dl>
        </CalcCard>
        <CalcCard title="Important Considerations">
            <ul class="list-disc list-inside text-sm text-gray-300 space-y-3">
                <li>
                    <strong>Part Cooling Fan:</strong> For hotend PID tuning, it is crucial to have your part cooling fan running at a typical speed (e.g., 25-50%). This ensures the PID values are accurate for real-world printing conditions where the fan will be cooling the hotend.
                    <CommandBlock command="M106 S128 ; Set fan to 50%" class="mt-2"/>
                </li>
                <li>
                    <strong>Silicone Sock:</strong> Always perform PID tuning with the silicone sock on your heater block if you intend to print with it. The sock significantly changes the thermal properties of your hotend.
                </li>
                <li>
                    <strong>Ambient Temperature:</strong> PID values can be affected by significant changes in ambient room temperature. If you move your printer to a much warmer or cooler environment, it's a good idea to re-tune.
                </li>
            </ul>
        </CalcCard>
      </div>
    </div>
  </CalcLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import CalcLayout from '../CalcLayout.vue'
import CalcCard from '../CalcCard.vue'
import CalcInput from '../CalcInput.vue'
import CommandBlock from '../CommandBlock.vue'

const heaterSelection = ref('extruder')
const targetTemp = ref(240)

const pidCommand = computed(() => {
  const heater = heaterSelection.value
  const temp = targetTemp.value
  return `PID_CALIBRATE HEATER=${heater} TARGET=${temp}`
})

</script>
