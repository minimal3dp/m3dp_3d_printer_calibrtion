<template>
  <CalcLayout title="Volumetric Flow Rate Calculator">
    <template #description>
      <p>
        This calculator helps you determine the maximum volumetric flow rate your hotend can handle. This is a crucial parameter for determining your printer's maximum printing speed.
      </p>
    </template>

    <template #content>
      <div class="grid grid-cols-1 gap-8">
        <CommandBlock
          title="1. Measure and Mark Filament"
          description="Measure 120mm of filament from the entry of your extruder and mark it. This will be the amount of filament we test."
        />

        <CommandBlock
          title="2. Heat Up Your Hotend"
          description="Heat up your hotend to the printing temperature you want to test. For PLA, this is typically around 220°C. Wait for the temperature to stabilize."
          command="M109 S220"
        />

        <CommandBlock
          title="3. Extrude Filament"
          description="Extrude 100mm of filament at a speed of 2mm/s. This is a good starting point for the test."
          command="G1 E100 F120"
        />

        <AlertBox
          title="Listen for Clicking"
          type="info"
        >
          <p>
            Listen for any clicking sounds from your extruder. This is a sign that your hotend cannot keep up with the extrusion rate.
          </p>
        </AlertBox>

        <CommandBlock
          title="4. Increase Extrusion Speed"
          description="If you don't hear any clicking, increase the extrusion speed and repeat the test. For example, you can increase the speed to 4mm/s."
          command="G1 E100 F240"
        />

        <AlertBox
          title="Find the Limit"
          type="info"
        >
          <p>
            Continue increasing the extrusion speed until you hear clicking. This is the maximum volumetric flow rate your hotend can handle.
          </p>
        </AlertBox>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="extrusion-speed" class="block text-sm font-medium text-gray-400">Max Extrusion Speed (mm/s)</label>
            <input
              type="number"
              id="extrusion-speed"
              v-model.number="extrusionSpeed"
              class="mt-1 block w-full bg-gray-800 border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white"
            />
          </div>
          <div>
            <label for="filament-diameter" class="block text-sm font-medium text-gray-400">Filament Diameter (mm)</label>
            <input
              type="number"
              id="filament-diameter"
              v-model.number="filamentDiameter"
              class="mt-1 block w-full bg-gray-800 border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white"
            />
          </div>
        </div>

        <div v-if="volumetricFlowRate" class="p-4 bg-gray-800 rounded-md">
          <h3 class="text-lg font-medium text-white">Maximum Volumetric Flow Rate</h3>
          <p class="mt-2 text-3xl font-bold text-green-400">{{ volumetricFlowRate.toFixed(2) }} mm³/s</p>
        </div>
      </div>
    </template>
  </CalcLayout>
</template>

<script setup>
import { ref, computed } from 'vue';
import CalcLayout from '@/components/CalcLayout.vue';
import CommandBlock from '@/components/CommandBlock.vue';
import AlertBox from '@/components/AlertBox.vue';

const extrusionSpeed = ref(null);
const filamentDiameter = ref(1.75);

const volumetricFlowRate = computed(() => {
  if (extrusionSpeed.value && filamentDiameter.value) {
    const crossSectionalArea = Math.PI * (filamentDiameter.value / 2) ** 2;
    return extrusionSpeed.value * crossSectionalArea;
  }
  return null;
});
</script>
