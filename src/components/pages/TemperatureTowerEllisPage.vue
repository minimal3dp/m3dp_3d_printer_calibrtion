<template>
  <CalcLayout title="Temperature Tower (Ellis' Method)">
    <p class="text-sm text-gray-400 mb-4">
      This tool generates G-code for a temperature tower based on the methodology from Ellis' Print Tuning Guide.
      It helps you find the optimal printing temperature for a specific filament by evaluating print quality at different heat levels.
      The tower is printed from hottest to coolest to ensure good layer adhesion for the initial layers.
    </p>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Left Column: Settings -->
      <div class="space-y-4">
        <CalcCard title="Filament &amp; Temperature Settings">
          <div class="grid grid-cols-2 gap-4">
            <CalcInput v-model="startTemp" label="Start Temperature" unit="°C" />
            <CalcInput v-model="endTemp" label="End Temperature" unit="°C" />
            <CalcInput v-model="tempIncrement" label="Temp. Increment" unit="°C" />
            <CalcInput v-model="bedTemp" label="Bed Temperature" unit="°C" />
          </div>
        </CalcCard>

        <CalcCard title="Print Speed Settings">
          <div class="grid grid-cols-2 gap-4">
            <CalcInput v-model="outerWallSpeed" label="Outer Wall Speed" unit="mm/s" />
            <CalcInput v-model="innerWallSpeed" label="Inner Wall Speed" unit="mm/s" />
            <CalcInput v-model="bridgeSpeed" label="Bridge Speed" unit="mm/s" />
            <CalcInput v-model="travelSpeed" label="Travel Speed" unit="mm/s" />
          </div>
        </CalcCard>
        
        <CalcCard title="Tower Geometry &amp; Layer Settings">
           <div class="grid grid-cols-2 gap-4">
            <CalcInput v-model="layerHeight" label="Layer Height" unit="mm" />
            <CalcInput v-model="segmentHeight" label="Segment Height" unit="mm" />
            <CalcInput v-model="towerWidth" label="Tower Width" unit="mm" />
            <CalcInput v-model="towerDepth" label="Tower Depth" unit="mm" />
            <CalcInput v-model="bridgeLength" label="Bridge Length" unit="mm" />
           </div>
        </CalcCard>
      </div>

      <!-- Right Column: Results & Instructions -->
      <div class="space-y-4">
        <CalcCard title="Generated G-Code">
          <CommandBlock :command="gcode" filename="ellis_temp_tower.gcode" />
        </CalcCard>
        
        <CalcCard title="How to Analyze the Results">
            <ol class="list-decimal list-inside text-sm text-gray-300 space-y-3">
                <li>
                    <strong>Visual Inspection:</strong> Examine each temperature segment for overall quality. Look for the best balance of sharp corners, minimal stringing, and a smooth, even surface finish.
                </li>
                <li>
                    <strong>Bridging:</strong> Check the quality of the bridges. The ideal temperature will produce straight, clean bridges with minimal sagging or drooping.
                </li>
                <li>
                    <strong>Overhangs:</strong> Inspect the underside of the angled overhangs. The best temperature will show the least amount of curling and drooping.
                </li>
                 <li>
                    <strong>Layer Adhesion (Strength Test):</strong> Once the print cools, try to break the tower apart at each temperature segment with your hands. The hottest temperatures usually have the strongest layer adhesion. The ideal temperature is the coolest one that still provides excellent layer bonding you can't break.
                </li>
                 <li>
                    <strong>Select Your Temperature:</strong> Choose the temperature that provides the best combination of visual quality and layer strength. This will be your optimal print temperature for this filament.
                </li>
            </ol>
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

// Temp Settings
const startTemp = ref(250)
const endTemp = ref(220)
const tempIncrement = ref(5)
const bedTemp = ref(60)

// Speed Settings
const outerWallSpeed = ref(40)
const innerWallSpeed = ref(80)
const bridgeSpeed = ref(30)
const travelSpeed = ref(150)

// Geometry Settings
const layerHeight = ref(0.2)
const segmentHeight = ref(10)
const towerWidth = ref(50)
const towerDepth = ref(10)
const bridgeLength = ref(20)


const gcode = computed(() => {
  const numSegments = Math.floor((startTemp.value - endTemp.value) / tempIncrement.value) + 1
  const totalHeight = numSegments * segmentHeight.value
  const layersPerSegment = Math.floor(segmentHeight.value / layerHeight.value)

  let g = `; Ellis-Style Temperature Tower Generator\n`
  g += `; Total Height: ${totalHeight.toFixed(2)} mm\n`
  g += `; Segments: ${numSegments} (${segmentHeight.value} mm each)\n`
  g += `; Temps: ${startTemp.value}C to ${endTemp.value}C in ${-tempIncrement.value}C steps\n`
  g += `\n`

  // Initial Setup
  g += `M104 S${startTemp.value} ; Set initial extruder temp\n`
  g += `M140 S${bedTemp.value} ; Set bed temp\n`
  g += `G90 ; Use absolute positioning\n`
  g += `M82 ; Use absolute extrusion\n`
  g += `G28 ; Home all axes\n`
  g += `M190 S${bedTemp.value} ; Wait for bed temp\n`
  g += `M109 S${startTemp.value} ; Wait for extruder temp\n`
  g += `G92 E0 ; Reset extruder\n`

  // Prime Line
  g += `G1 Z1.0 F3000 ; Move to prime start Z\n`
  g += `G1 X5 Y5 F5000 ; Move to prime start XY\n`
  g += `G1 Z0.3 F3000 ; Move to prime Z\n`
  g += `G1 F2000 E10 ; Extrude a line\n`
  g += `G92 E0 ; Reset extruder again\n`

  const centerX = 110
  const X1 = centerX - towerWidth.value / 2
  const X2 = centerX + towerWidth.value / 2
  const Y1 = 110 - towerDepth.value / 2
  const Y2 = 110 + towerDepth.value / 2
  
  const bridgeY1 = Y1 + towerDepth.value / 3
  const bridgeY2 = Y1 + (towerDepth.value / 3) * 2

  let currentZ = layerHeight.value
  let extrusion = 0

  for (let i = 0; i < numSegments; i++) {
    const currentTemp = startTemp.value - (i * tempIncrement.value)
    g += `\n; --- SEGMENT ${i + 1}: ${currentTemp}C ---\n`
    g += `M104 S${currentTemp} ; Set nozzle temperature\n`
    g += `M117 Temp: ${currentTemp}C\n`

    for (let j = 0; j < layersPerSegment; j++) {
      g += `; LAYER ${i * layersPerSegment + j + 1}, Z = ${currentZ.toFixed(2)}\n`
      
      g += `G1 X${X1} Y${Y1} Z${currentZ.toFixed(2)} F${travelSpeed.value * 60}\n`
      
      // Overhang/Wall part
      g += `G1 F${innerWallSpeed.value * 60}\n`
      g += `G1 X${X2} Y${Y1} E${towerWidth.value * 0.05}\n`
      g += `G1 X${X2} Y${Y2} E${towerDepth.value * 0.05}\n`
      g += `G1 F${outerWallSpeed.value * 60}\n`
      g += `G1 X${X1} Y${Y2} E${towerWidth.value * 0.05}\n`
      g += `G1 X${X1} Y${Y1} E${towerDepth.value * 0.05}\n`

      // Bridge part (if layer is in the middle of a segment)
      if (j > layersPerSegment / 3 && j < (layersPerSegment / 3) * 2) {
        g += `G1 X${X1 - bridgeLength.value} Y${bridgeY1} F${travelSpeed.value * 60}\n`
        g += `G1 F${bridgeSpeed.value * 60}\n`
        g += `G1 X${X1} Y${bridgeY1} E${bridgeLength.value * 0.05}\n`

        g += `G1 X${X1 - bridgeLength.value} Y${bridgeY2} F${travelSpeed.value * 60}\n`
        g += `G1 F${bridgeSpeed.value * 60}\n`
        g += `G1 X${X1} Y${bridgeY2} E${bridgeLength.value * 0.05}\n`
      }

      currentZ += layerHeight.value
    }
  }

  // End G-code
  g += `\n; Print finished\n`
  g += `M117 Done!\n`
  g += `G91 ; Relative positioning\n`
  g += `G1 Z10 F3000 ; Raise Z\n`
  g += `G90 ; Absolute positioning\n`
  g += `G1 X0 Y220 F3000 ; Present print\n`
  g += `M104 S0 ; Turn off extruder\n`
  g += `M140 S0 ; Turn off bed\n`
  g += `M84 ; Disable motors\n`

  return g
})

</script>
