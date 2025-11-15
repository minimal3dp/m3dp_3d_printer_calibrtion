<template>
  <CalcLayout title="Pressure Advance / Linear Advance">
    <CalcCard title="Marlin Linear Advance K-Factor">
      <p class="text-sm text-gray-400 mb-4">
        Reference:
        <a href="https://marlinfw.org/tools/lin_advance/k-factor.html" target="_blank" rel="noopener" class="text-cyan-400 hover:underline">
          Marlin Linear Advance Docs
        </a>
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-4">
          <CalcInput v-model="measuredLength" label="Measured Length" unit="mm" placeholder="e.g., 50.5" />
          <CalcInput v-model="kFactorStart" label="K-Factor Start" />
          <CalcInput v-model="kFactorEnd" label="K-Factor End" />
          <CalcInput v-model="testSpeed" label="Test Speed" unit="mm/s" />
        </div>

        <div class="space-y-4">
          <CalcResult :value="kFactor" label="Calculated K-Factor" :decimals="5" :copyable="true" />
          <CommandBlock v-if="kFactor > 0" label="Add to Marlin Config" :command="`#define LIN_ADVANCE_K ${kFactor.toFixed(5)}`" />
        </div>
      </div>

      <div class="mt-6">
        <h3 class="text-lg font-medium text-white mb-2">G-Code Generator</h3>
        <p class="text-sm text-gray-400 mb-4">Generate the G-Code for the test pattern below. Upload the generated file to your printer and print it.</p>
        <CommandBlock label="G-Code for Test Pattern" :command="gcode" class="mb-4" :copyable="true"/>
      </div>
    </CalcCard>

    <CalcCard title="RepRapFirmware Pressure Advance">
        <p class="text-sm text-gray-400 mb-4">
        Reference:
        <a href="https://duet3d.dozuki.com/Wiki/Pressure_advance" target="_blank" rel="noopener" class="text-cyan-400 hover:underline">
          RepRapFirmware Pressure Advance Docs
        </a>
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-4">
          <CalcInput v-model="rrfMeasuredLength" label="Measured Length from test print" unit="mm" placeholder="e.g., 25.3" />
        </div>
        <div class="space-y-4">
          <CalcResult :value="rrfPA" label="Pressure Advance Value" :decimals="5" :copyable="true" />
          <CommandBlock v-if="rrfPA > 0" label="Add to config.g" :command="`M572 D0 S${rrfPA.toFixed(5)}`" />
        </div>
      </div>
    </CalcCard>

    <CalcCard title="PA/LA Validation">
      <p class="text-sm text-gray-400 mb-4">Print this validation model to check your PA/LA settings. The corners should be sharp and there should be no bulging or ringing.</p>
      <CommandBlock label="Validation G-Code" :command="validationGcode" :copyable="true" />
    </CalcCard>

    <CalcCard title="Troubleshooting">
        <p class="text-sm text-gray-400 mb-4">Common issues and solutions:</p>
        <ul class="list-disc list-inside text-sm text-gray-400 space-y-2">
            <li><span class="font-semibold">Under-extrusion at the start of a line:</span> Increase the K-Factor/PA value.</li>
            <li><span class="font-semibold">Over-extrusion at the start of a line:</span> Decrease the K-Factor/PA value.</li>
            <li><span class="font-semibold">Bulging corners:</span> Your PA/LA value is too high.</li>
            <li><span class="font-semibold">Ringing or ghosting after corners:</span> Your PA/LA value is too low. This can also be caused by loose belts or a wobbly frame.</li>
            <li><span class="font-semibold">No change in line width:</span> Your printer may not have Linear Advance/Pressure Advance enabled or properly configured. Check your firmware settings.</li>
            <li><span class="font-semibold">Gaps in infill:</span> Your PA/LA value might be too high, causing the extruder to retract too much.</li>
        </ul>
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

const measuredLength = ref(0)
const kFactorStart = ref(0)
const kFactorEnd = ref(2)
const testSpeed = ref(100)

const rrfMeasuredLength = ref(0)

const kFactor = computed(() => {
  if (measuredLength.value > 0) {
    return kFactorStart.value + (kFactorEnd.value - kFactorStart.value) * (measuredLength.value / 100)
  }
  return 0
})

const rrfPA = computed(() => {
  if (rrfMeasuredLength.value > 0) {
    return rrfMeasuredLength.value * 0.0025
  }
  return 0
})

const gcode = computed(() => {
  return `
M900 K0 ; Reset K-Factor
G28 ; Home all axes
G1 X10 Y10 Z0.2 F3000 ; Move to starting position
G92 E0 ; Reset extruder
M109 S200 ; Set nozzle temperature
G1 E25 F100 ; Purge nozzle
G92 E0 ; Reset extruder
M900 K-0.2

; Pattern generation start

; Outer frame
G1 X20 Y20 F${testSpeed.value * 60}
G1 X220 Y20 E20 F${testSpeed.value * 60}
G1 X220 Y220 E40
G1 X20 Y220 E20
G1 X20 Y20 E40

; Diagonal lines
G1 X25 Y25 E0.5
G1 X215 Y215 E18

G1 X25 Y215 E0.5
G1 X215 Y25 E18

; K-factor lines
` + [...Array(11)].map((_, i) => {
    const k = kFactorStart.value + (kFactorEnd.value - kFactorStart.value) * (i / 10);
    return `M900 K${k.toFixed(5)}\nG1 X${30 + i * 18} Y25 F${testSpeed.value * 60}\nG1 Y215 E18`;
  }).join('\n') + '\n\n; End of pattern\n'
})

const validationGcode = computed(() => {
    return `
G28 ; Home all axes
G92 E0 ; Reset extruder
G1 Z20 F3000 ; Move Z up
G1 X20 Y20 F9000
G1 Z0.2 F3000
M109 S200 ; Set nozzle temp
G1 F200 E30 ; Extrude 30mm of filament
G92 E0

; Print a 40x40mm square with sharp corners
G1 X20 Y20 F9000
G1 X60 Y20 E20 F6000
G1 X60 Y60 E20
G1 X20 Y60 E20
G1 X20 Y20 E20

; Move to center and print a smaller square
G1 X30 Y30 F9000
G1 X50 Y30 E10 F4000
G1 X50 Y50 E10
G1 X30 Y50 E10
G1 X30 Y30 E10

; Lift Z
G1 Z10 F3000
`
})
</script>
