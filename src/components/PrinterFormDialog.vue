<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50" @click.self="close">
    <div class="bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto m-4">
      <div class="sticky top-0 bg-gray-800 border-b border-gray-700 p-6 flex justify-between items-center">
        <h2 class="text-2xl font-bold text-white">
          {{ editingPrinter ? 'Edit Printer' : 'Add Printer' }}
        </h2>
        <button @click="close" class="text-gray-400 hover:text-white">
          <i class="ph ph-x text-2xl"></i>
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
        <!-- Basic Info -->
        <div class="space-y-4">
          <h3 class="font-semibold text-cyan-400">Basic Information</h3>
          
          <div>
            <label class="block text-sm font-medium mb-2">Printer Name *</label>
            <input
              v-model="form.name"
              type="text"
              required
              placeholder="e.g., Prusa MK4, Voron 2.4"
              class="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border-2 border-gray-600 focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-2">Printer Type *</label>
              <select
                v-model="form.type"
                required
                class="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border-2 border-gray-600 focus:border-cyan-400 focus:outline-none"
              >
                <option value="cartesian">Cartesian</option>
                <option value="corexy">CoreXY</option>
                <option value="delta">Delta</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">Firmware *</label>
              <select
                v-model="form.firmware"
                required
                class="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border-2 border-gray-600 focus:border-cyan-400 focus:outline-none"
              >
                <option value="klipper">Klipper</option>
                <option value="marlin">Marlin</option>
                <option value="reprapfirmware">RepRapFirmware</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Build Volume -->
        <div class="space-y-4">
          <h3 class="font-semibold text-cyan-400">Build Volume (mm)</h3>
          <div class="grid grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium mb-2">X *</label>
              <input
                v-model.number="form.buildVolume.x"
                type="number"
                required
                min="1"
                class="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border-2 border-gray-600 focus:border-cyan-400 focus:outline-none"
              />
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">Y *</label>
              <input
                v-model.number="form.buildVolume.y"
                type="number"
                required
                min="1"
                class="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border-2 border-gray-600 focus:border-cyan-400 focus:outline-none"
              />
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">Z *</label>
              <input
                v-model.number="form.buildVolume.z"
                type="number"
                required
                min="1"
                class="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border-2 border-gray-600 focus:border-cyan-400 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <!-- Extruder Settings -->
        <div class="space-y-4">
          <h3 class="font-semibold text-cyan-400">Extruder Settings</h3>
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-2">Extruder Type *</label>
              <select
                v-model="form.extruderType"
                required
                class="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border-2 border-gray-600 focus:border-cyan-400 focus:outline-none"
              >
                <option value="bowden">Bowden</option>
                <option value="direct_drive">Direct Drive</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">Nozzle Diameter (mm) *</label>
              <input
                v-model.number="form.nozzleDiameter"
                type="number"
                required
                step="0.1"
                min="0.1"
                class="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border-2 border-gray-600 focus:border-cyan-400 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <!-- Motion System -->
        <div class="space-y-4">
          <h3 class="font-semibold text-cyan-400">Motion System</h3>
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-2">Max Speed (mm/s)</label>
              <input
                v-model.number="form.maxSpeed"
                type="number"
                step="10"
                min="1"
                class="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border-2 border-gray-600 focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">Max Accel (mm/s²)</label>
              <input
                v-model.number="form.maxAcceleration"
                type="number"
                step="100"
                min="1"
                class="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border-2 border-gray-600 focus:border-cyan-400 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <!-- Calibration Values (Optional) -->
        <div class="space-y-4">
          <h3 class="font-semibold text-cyan-400">Calibration Values (Optional)</h3>
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-2">Rotation Distance</label>
              <input
                v-model.number="form.calibration.rotationDistance"
                type="number"
                step="0.001"
                class="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border-2 border-gray-600 focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">Pressure Advance</label>
              <input
                v-model.number="form.calibration.pressureAdvance"
                type="number"
                step="0.001"
                class="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border-2 border-gray-600 focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">Input Shaping Type</label>
              <select
                v-model="form.calibration.inputShaping.shaperType"
                class="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border-2 border-gray-600 focus:border-cyan-400 focus:outline-none"
              >
                <option value="">None</option>
                <option value="mzv">MZV</option>
                <option value="ei">EI</option>
                <option value="2hump_ei">2HUMP_EI</option>
                <option value="3hump_ei">3HUMP_EI</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">Shaping Freq X (Hz)</label>
              <input
                v-model.number="form.calibration.inputShaping.shaperFreqX"
                type="number"
                step="0.1"
                class="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border-2 border-gray-600 focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">Run Current (A)</label>
              <input
                v-model.number="form.calibration.runCurrent"
                type="number"
                step="0.01"
                class="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border-2 border-gray-600 focus:border-cyan-400 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <!-- Buttons -->
        <div class="flex gap-4 pt-4">
          <button
            type="submit"
            class="flex-1 px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg transition-colors"
          >
            {{ editingPrinter ? 'Update Printer' : 'Add Printer' }}
          </button>
          <button
            type="button"
            @click="close"
            class="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { PrinterProfile } from '../types/profiles'

const props = defineProps<{
  isOpen: boolean
  editingPrinter?: PrinterProfile | null
}>()

const emit = defineEmits<{
  close: []
  save: [printer: Omit<PrinterProfile, 'id'>]
}>()

const form = ref({
  name: '',
  type: 'cartesian' as PrinterProfile['type'],
  firmware: 'klipper' as PrinterProfile['firmware'],
  buildVolume: { x: 220, y: 220, z: 250 },
  extruderType: 'direct_drive' as PrinterProfile['extruderType'],
  nozzleDiameter: 0.4,
  maxHotendTemp: 285,
  maxSpeed: 300,
  maxAcceleration: 3000,
  hasProbe: false,
  probeType: undefined as PrinterProfile['probeType'],
  hasTMCDrivers: false,
  hasInputShaping: false,
  calibration: {
    rotationDistance: undefined as { x?: number; y?: number; z?: number; e?: number } | undefined,
    pressureAdvance: undefined as number | undefined,
    inputShaping: {
      shaperType: '' as string | undefined,
      shaperFreqX: undefined as number | undefined,
      shaperFreqY: undefined as number | undefined,
    },
    runCurrent: undefined as { x?: number; y?: number; z?: number; e?: number } | undefined,
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
})

watch(() => props.editingPrinter, (printer) => {
  if (printer) {
    form.value = {
      name: printer.name,
      type: printer.type,
      firmware: printer.firmware,
      buildVolume: { ...printer.buildVolume },
      extruderType: printer.extruderType,
      nozzleDiameter: printer.nozzleDiameter,
      maxHotendTemp: printer.maxHotendTemp || 285,
      maxSpeed: printer.maxSpeed || 300,
      maxAcceleration: printer.maxAcceleration || 3000,
      hasProbe: printer.hasProbe,
      probeType: printer.probeType,
      hasTMCDrivers: printer.hasTMCDrivers,
      hasInputShaping: printer.hasInputShaping,
      calibration: {
        rotationDistance: printer.calibration?.rotationDistance,
        pressureAdvance: printer.calibration?.pressureAdvance,
        inputShaping: {
          shaperType: printer.calibration?.inputShaping?.shaperType || '',
          shaperFreqX: printer.calibration?.inputShaping?.shaperFreqX,
          shaperFreqY: printer.calibration?.inputShaping?.shaperFreqY,
        },
        runCurrent: printer.calibration?.runCurrent,
      },
      createdAt: printer.createdAt,
      updatedAt: new Date().toISOString(),
    }
  } else {
    resetForm()
  }
}, { immediate: true })

const resetForm = () => {
  form.value = {
    name: '',
    type: 'cartesian',
    firmware: 'klipper',
    buildVolume: { x: 220, y: 220, z: 250 },
    extruderType: 'direct_drive',
    nozzleDiameter: 0.4,
    maxHotendTemp: 285,
    maxSpeed: 300,
    maxAcceleration: 3000,
    hasProbe: false,
    probeType: undefined,
    hasTMCDrivers: false,
    hasInputShaping: false,
    calibration: {
      rotationDistance: undefined,
      pressureAdvance: undefined,
      inputShaping: {
        shaperType: '',
        shaperFreqX: undefined,
        shaperFreqY: undefined,
      },
      runCurrent: undefined,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}

const handleSubmit = () => {
  emit('save', form.value)
  close()
}

const close = () => {
  resetForm()
  emit('close')
}
</script>
