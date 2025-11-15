<template>
  <aside class="w-72 flex-shrink-0 overflow-y-auto bg-gray-900 border-r border-gray-700 p-4 flex flex-col">
    <!-- Application Title -->
    <h1 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
      <i class="ph-bold ph-gear text-cyan-400"></i>
      Klipper Calculators
    </h1>
    
    <!-- Navigation Links -->
    <nav class="flex-grow space-y-1">
      <a
        href="#home"
        :class="linkClass('home')"
        @click.prevent="navigate('home')"
      >
        <i class="ph ph-house"></i> Home
      </a>

      <!-- Basic Checks Section -->
      <p class="text-xs font-medium text-gray-500 uppercase px-3 pt-4 pb-1">
        Basic Checks
      </p>
      <a
        href="#checks"
        :class="linkClass('checks')"
        @click.prevent="navigate('checks')"
      >
        <i class="ph ph-check-list"></i> Basic Config Checks
      </a>
      <a
        href="#run_current"
        :class="linkClass('run_current')"
        @click.prevent="navigate('run_current')"
      >
        <i class="ph ph-lightning"></i> Stepper Run Current
      </a>

      <!-- Extruder Section -->
      <p class="text-xs font-medium text-gray-500 uppercase px-3 pt-4 pb-1">
        Extruder
      </p>
      <a
        href="#extruder"
        :class="linkClass('extruder')"
        @click.prevent="navigate('extruder')"
      >
        <i class="ph ph-ruler"></i> Extruder Rotation
      </a>
      <a
        href="#flow"
        :class="linkClass('flow')"
        @click.prevent="navigate('flow')"
      >
        <i class="ph ph-waves"></i> OrcaSlicer Flow
      </a>
      <a
        href="#flow_wall"
        :class="linkClass('flow_wall')"
        @click.prevent="navigate('flow_wall')"
      >
        <i class="ph ph-square"></i> Flow (Wall Thickness)
      </a>
      <a
        href="#volumetric_orca"
        :class="linkClass('volumetric_orca')"
        @click.prevent="navigate('volumetric_orca')"
      >
        <i class="ph ph-gauge"></i> Max Volumetric (Orca)
      </a>
      <a
        href="#volumetric_ellis"
        :class="linkClass('volumetric_ellis')"
        @click.prevent="navigate('volumetric_ellis')"
      >
        <i class="ph ph-thermometer-hot"></i> Max Volumetric (Ellis)
      </a>

      <!-- Tuning Section -->
      <p class="text-xs font-medium text-gray-500 uppercase px-3 pt-4 pb-1">
        Tuning
      </p>
      <a
        href="#pa"
        :class="linkClass('pa')"
        @click.prevent="navigate('pa')"
      >
        <i class="ph ph-corners-out"></i> Pressure Advance
      </a>
      <a
        href="#shaping"
        :class="linkClass('shaping')"
        @click.prevent="navigate('shaping')"
      >
        <i class="ph ph-waveform"></i> Input Shaping
      </a>
      <a
        href="#ers"
        :class="linkClass('ers')"
        @click.prevent="navigate('ers')"
      >
        <i class="ph ph-wind"></i> Extrusion Smoothing
      </a>

      <!-- Hardware Section -->
      <p class="text-xs font-medium text-gray-500 uppercase px-3 pt-4 pb-1">
        Hardware
      </p>
      <a
        href="#leadscrew"
        :class="linkClass('leadscrew')"
        @click.prevent="navigate('leadscrew')"
      >
        <i class="ph ph-arrows-vertical"></i> Lead Screw Rotation
      </a>
      <a
        href="#belt_rotation"
        :class="linkClass('belt_rotation')"
        @click.prevent="navigate('belt_rotation')"
      >
        <i class="ph ph-arrows-horizontal"></i> Belt Rotation
      </a>
      <a
        href="#probe_offset"
        :class="linkClass('probe_offset')"
        @click.prevent="navigate('probe_offset')"
      >
        <i class="ph ph-crosshair"></i> Probe XY Offset
      </a>

      <!-- Slicer Settings Section -->
      <p class="text-xs font-medium text-gray-500 uppercase px-3 pt-4 pb-1">
        Slicer
      </p>
      <a
        href="#max_speed"
        :class="linkClass('max_speed')"
        @click.prevent="navigate('max_speed')"
      >
        <i class="ph ph-speedometer"></i> Max Print Speed
      </a>
      <a
        href="#linewidth"
        :class="linkClass('linewidth')"
        @click.prevent="navigate('linewidth')"
      >
        <i class="ph ph-pen-nib"></i> Line Widths
      </a>
    </nav>
    
    <!-- Footer Credits -->
    <div class="mt-6 pt-6 border-t border-gray-700">
      <p class="text-xs text-gray-500">
        From spreadsheet by Minimal 3DP.
        <br>Based on guides from
        <a 
          href="https://github.com/SoftFever/OrcaSlicer/wiki" 
          target="_blank" 
          rel="noopener"
          class="text-cyan-400 hover:underline"
        >
          OrcaSlicer
        </a> &
        <a 
          href="https://ellis3dp.com/Print-Tuning-Guide/" 
          target="_blank" 
          rel="noopener"
          class="text-cyan-400 hover:underline"
        >
          Ellis3DP
        </a>.
      </p>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  activePage: string
}>()

const emit = defineEmits<{
  navigate: [pageId: string]
}>()

const linkClass = (pageId: string) => {
  const baseClasses = 'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors'
  const inactiveClasses = 'text-gray-300 hover:bg-gray-700 hover:text-white'
  const activeClasses = 'bg-gray-700 text-white font-semibold'
  
  return computed(() => 
    `${baseClasses} ${props.activePage === pageId ? activeClasses : inactiveClasses}`
  ).value
}

const navigate = (pageId: string) => {
  emit('navigate', pageId)
}
</script>
