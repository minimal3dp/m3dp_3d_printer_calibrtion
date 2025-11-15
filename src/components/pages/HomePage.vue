<template>
  <div class="space-y-8">
    <header class="bg-gray-800 rounded-lg p-6 shadow-lg">
      <h1 class="text-4xl font-bold text-white">Welcome to the 3D Printer Calibration Suite</h1>
      <p class="mt-4 text-lg text-gray-300">
        A collection of tools to help you calibrate your 3D printer for optimal performance. This guide is structured to walk you through the essential calibration steps in a logical order, from basic checks to advanced tuning.
      </p>
    </header>

    <div class="space-y-6">
      <h2 class="text-2xl font-semibold text-white">Calibration Roadmap</h2>
      
      <!-- Step 1: Basic Checks -->
      <div class="bg-gray-800 rounded-lg p-6 shadow-md">
        <h3 class="text-xl font-bold text-cyan-400">Step 1: Foundational Checks</h3>
        <p class="text-gray-300 mt-2">
          Start here. These initial checks ensure your printer's hardware and basic configuration are sound before proceeding to more advanced tuning.
        </p>
        <div class="mt-4 space-x-2">
          <button @click="navigate('checks')" class="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded">
            Basic Config Checks
          </button>
          <button @click="navigate('run_current')" class="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded">
            Stepper Run Current
          </button>
        </div>
      </div>

      <!-- Step 2: Extruder Calibration -->
      <div class="bg-gray-800 rounded-lg p-6 shadow-md">
        <h3 class="text-xl font-bold text-green-400">Step 2: Extruder & Flow Calibration</h3>
        <p class="text-gray-300 mt-2">
          Calibrate your extruder and dial in your filament flow rate. This is critical for accurate and strong prints.
        </p>
        <div class="mt-4 space-x-2">
          <button @click="navigate('extruder')" class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Extruder Rotation
          </button>
          <button @click="navigate('flow')" class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            OrcaSlicer Flow
          </button>
           <button @click="navigate('volumetric_flow')" class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Volumetric Flow
          </button>
        </div>
      </div>

      <!-- Step 3: Advanced Tuning -->
      <div class="bg-gray-800 rounded-lg p-6 shadow-md">
        <h3 class="text-xl font-bold text-purple-400">Step 3: Advanced Tuning</h3>
        <p class="text-gray-300 mt-2">
          Fine-tune your printer's performance with advanced calibration methods like Pressure Advance and Input Shaping.
        </p>
        <div class="mt-4 space-x-2">
          <button @click="navigate('pa')" class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
            Pressure Advance
          </button>
          <button @click="navigate('shaping')" class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
            Input Shaping
          </button>
          <button @click="navigate('temp_tower')" class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
            Temperature Tower
          </button>
        </div>
      </div>

      <!-- Step 4: Hardware & Slicer -->
      <div class="bg-gray-800 rounded-lg p-6 shadow-md">
        <h3 class="text-xl font-bold text-orange-400">Step 4: Hardware & Slicer Settings</h3>
        <p class="text-gray-300 mt-2">
          Finalize your setup by calibrating hardware-specific settings and optimizing your slicer profiles.
        </p>
        <div class="mt-4 space-x-2">
          <button @click="navigate('z_offset')" class="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
            Z-Offset Calibration
          </button>
          <button @click="navigate('max_speed')" class="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
            Max Print Speed
          </button>
          <button @click="navigate('linewidth')" class="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
            Line Widths
          </button>
        </div>
      </div>
    </div>

    <footer class="text-center text-sm text-gray-500 pt-4">
      <p>This calibration suite is designed to be a comprehensive resource. For a full list of calculators, please use the sidebar.</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  navigate: [pageId: string]
}>()

const navigate = (pageId: string) => {
  emit('navigate', pageId)
}
</script>
