<template>
  <div class="space-y-6">
    <h2 class="text-3xl font-bold text-white border-b border-gray-700 pb-2">
      Home & Instructions
    </h2>
    
    <div class="bg-gray-800 shadow-lg rounded-lg p-6">
      <p class="text-lg mb-4">
        Welcome to the M3DP Calibration Suite!
      </p>
      
      <p class="mb-2">
        This tool is a comprehensive web-based calibration suite for 3D printers,
        with a focus on Klipper firmware and OrcaSlicer.
      </p>
      
      <p class="mb-4">
        Select a calculator from the sidebar on the left to get started. All calculations 
        are based on the fantastic guides from the 
        <a 
          href="https://github.com/SoftFever/OrcaSlicer/wiki" 
          target="_blank"
          rel="noopener" 
          class="text-cyan-400 hover:underline"
        >
          OrcaSlicer Wiki
        </a> and 
        <a
          href="https://ellis3dp.com/Print-Tuning-Guide/" 
          target="_blank" 
          rel="noopener"
          class="text-cyan-400 hover:underline"
        >
          Ellis' Print Tuning Guide
        </a>.
      </p>
      
      <div class="mt-4 p-4 bg-gray-900 border border-cyan-500/30 rounded-lg">
        <p class="font-semibold text-cyan-400 flex items-center gap-2">
          <i class="ph ph-info"></i> How to Use
        </p>
        <ol class="list-decimal list-inside mt-2 space-y-1 text-gray-300">
          <li>Select a calibration tool from the sidebar menu.</li>
          <li>
            Enter your measured values into the 
            <span class="text-yellow-400">yellow input fields</span>.
          </li>
          <li>
            Your results will be calculated automatically and shown in the 
            <span class="text-green-400">green result boxes</span>.
          </li>
          <li>Follow the instructions and copy any generated commands to your Klipper console.</li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Home page component
</script>
