<template>
  <CalcLayout title="Temperature Tower (Teaching Tech)">
    <p class="text-sm text-gray-400 mb-4">
      This tool generates G-code for a temperature tower to help you find the optimal printing temperature for your filament.
      Based on the method by
      <a href="https://teachingtechyt.github.io/calibration.html#temp" target="_blank" rel="noopener" class="text-cyan-400 hover:underline">
        Teaching Tech
      </a>.
    </p>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Left Column: Settings -->
      <div class="space-y-4">
        <CalcCard title="Print Settings">
          <div class="grid grid-cols-2 gap-4">
            <CalcInput v-model="printSpeed" label="Print Speed" unit="mm/s" />
            <CalcInput v-model="layerHeight" label="Layer Height" unit="mm" />
            <CalcInput v-model="nozzleSize" label="Nozzle Size" unit="mm" />
            <CalcInput v-model="bedTemp" label="Bed Temp" unit="°C" />
          </div>
        </CalcCard>

        <CalcCard title="Tower Settings">
           <div class="grid grid-cols-2 gap-4">
            <CalcInput v-model="startTemp" label="Start Temperature" unit="°C" />
            <CalcInput v-model="tempIncrement" label="Temp Increment" unit="°C" />
            <CalcInput v-model="towerHeight" label="Tower Height" unit="mm" />
            <CalcInput v-model="tempStepHeight" label="Temp Step Height" unit="mm" />
            <CalcInput v-model="towerSize" label="Tower Size" unit="mm" />
           </div>
        </CalcCard>
        <CalcCard title="Firmware Type">
          <div class="flex items-center space-x-4">
              <label class="flex items-center">
                  <input type="radio" v-model="firmware" value="klipper" class="form-radio text-cyan-500">
                  <span class="ml-2 text-white">Klipper</span>
              </label>
              <label class="flex items-center">
                  <input type="radio" v-model="firmware" value="marlin" class="form-radio text-cyan-500">
                  <span class="ml-2 text-white">Marlin</span>
              </label>
          </div>
        </CalcCard>
      </div>

      <!-- Right Column: Results & Instructions -->
      <div class="space-y-4">
        <CalcCard title="Generated G-Code">
          <CommandBlock :command="gcode" filename="temperature_tower.gcode" />
        </CalcCard>
        
        <CalcCard title="How to Use">
            <ol class="list-decimal list-inside text-sm text-gray-300 space-y-2">
                <li>Configure the settings to match your printer and desired test range.</li>
                <li>Copy the generated G-code into a new file named `temperature_tower.gcode`.</li>
                <li>"Print" this file from your printer interface (Mainsail, Fluidd, OctoPrint).</li>
                <li>Observe the print quality at different heights. Note the height (in mm) where the quality is best.</li>
                <li>Enter the measured height below to find the corresponding temperature.</li>
            </ol>
            <div class="mt-4 pt-4 border-t border-gray-700">
                <CalcInput v-model="measuredHeight" label="Measured Height" unit="mm" placeholder="Height from bed"/>
                <CalcResult :value="calculatedTemp" label="Your Optimal Temperature" unit="°C" />
            </div>
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
import CalcResult from '../CalcResult.vue'
import CommandBlock from '../CommandBlock.vue'

const firmware = ref('klipper')
const printSpeed = ref(50)
const layerHeight = ref(0.2)
const nozzleSize = ref(0.4)
const bedTemp = ref(60)

const startTemp = ref(230)
const tempIncrement = ref(-5) // Typically decrease for temp towers
const towerHeight = ref(100)
const tempStepHeight = ref(10)
const towerSize = ref(40)

const measuredHeight = ref(0)

const gcode = computed(() => {
  const setTempCmd = 'M104'
  const setTempAndWaitCmd = 'M109'
  const tempParam = 'S'

  let g = `; Temperature Tower Generator\n`
  g += `; Firmware: ${firmware.value}\n`
  g += `; Settings:\n`
  g += `;   Start Temp: ${startTemp.value}°C\n`
  g += `;   Temp Increment: ${tempIncrement.value}°C\n`
  g += `;   Step Height: ${tempStepHeight.value} mm\n`
  g += `;   Print Speed: ${printSpeed.value} mm/s\n`
  g += `; =============================================\n\n`

  g += `M107 ; fan off\n`
  g += `${setTempCmd} ${tempParam}${startTemp.value} ; set initial extruder temp\n`
  g += `M140 S${bedTemp.value} ; set bed temp\n`
  g += `${setTempAndWaitCmd} ${tempParam}${startTemp.value} ; wait for extruder temp\n`
  g += `M190 S${bedTemp.value} ; wait for bed temp\n\n`

  g += `G28 ; home all\n`
  g += `G90 ; absolute positioning\n`
  g += `G1 Z5 F5000 ; lift Z\n\n`

  g += `; Prime line\n`
  g += `G1 X2 Y10 F3000\n`
  g += `G1 Z0.3\n`
  g += `G1 Y20 E15 F1500 ; prime line\n`
  g += `G1 Y100 E15\n`
  g += `G92 E0\n\n`
  
  g += `; Set initial temp\n`
  g += `${setTempAndWaitCmd} ${tempParam}${startTemp.value}\n`

  g += `; Start printing tower\n`
  const numLayers = Math.floor(towerHeight.value / layerHeight.value)
  const x1 = 50 - towerSize.value / 2
  const y1 = 50 - towerSize.value / 2
  const x2 = 50 + towerSize.value / 2
  const y2 = 50 + towerSize.value / 2
  const f = printSpeed.value * 60

  for (let i = 1; i <= numLayers; i++) {
    const z = i * layerHeight.value
    g += `\nG1 Z${z.toFixed(2)} F5000\n`
    
    const currentStep = Math.floor((z - layerHeight.value) / tempStepHeight.value)
    const prevStep = Math.floor((z - layerHeight.value * 2) / tempStepHeight.value)

    if (currentStep > prevStep && z > layerHeight.value) {
      const newTemp = startTemp.value + (currentStep * tempIncrement.value)
      g += `${setTempCmd} ${tempParam}${newTemp}\n`
      g += `M117 Temp: ${newTemp}C\n`
      // No wait, to allow printing to continue while temp changes
    }

    // Simple rectangular tower G-code
    g += `G1 X${x1} Y${y1} F${f}\n`
    g += `G1 X${x2} Y${y1}\n`
    g += `G1 X${x2} Y${y2}\n`
    g += `G1 X${x1} Y${y2}\n`
    g += `G1 X${x1} Y${y1}\n`
  }

  g += `\n; Tower finished\n`
  g += `M117 Done!\n`
  g += `G91 ; relative positioning\n`
  g += `G1 Z5 F5000 ; lift Z\n`
  g += `G90 ; absolute positioning\n`
  g += `G1 X0 Y0 F5000 ; present print\n`
  g += `M104 S0 ; turn off extruder\n`
  g += `M140 S0 ; turn off bed\n`
  g += `M84 ; disable motors\n`
  
  return g
});

const calculatedTemp = computed(() => {
    if (measuredHeight.value <= 0) return 0;
    if (measuredHeight.value < tempStepHeight.value) return startTemp.value;

    const steps = Math.floor(measuredHeight.value / tempStepHeight.value);
    return startTemp.value + (steps * tempIncrement.value);
});

</script>
