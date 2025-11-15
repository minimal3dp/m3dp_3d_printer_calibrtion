<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50" @click.self="close">
    <div class="bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto m-4">
      <div class="sticky top-0 bg-gray-800 border-b border-gray-700 p-6 flex justify-between items-center">
        <h2 class="text-2xl font-bold text-white">
          {{ editingFilament ? 'Edit Filament' : 'Add Filament' }}
        </h2>
        <button @click="close" class="text-gray-400 hover:text-white">
          <i class="ph ph-x text-2xl"></i>
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
        <!-- Basic Info -->
        <div class="space-y-4">
          <h3 class="font-semibold text-green-400">Basic Information</h3>
          
          <div>
            <label class="block text-sm font-medium mb-2">Filament Name *</label>
            <input
              v-model="form.name"
              type="text"
              required
              placeholder="e.g., Red PLA, Black PETG"
              class="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border-2 border-gray-600 focus:border-green-400 focus:outline-none"
            />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-2">Material Type *</label>
              <select
                v-model="form.material"
                required
                class="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border-2 border-gray-600 focus:border-green-400 focus:outline-none"
              >
                <option value="PLA">PLA</option>
                <option value="PETG">PETG</option>
                <option value="ABS">ABS</option>
                <option value="ASA">ASA</option>
                <option value="TPU">TPU</option>
                <option value="Nylon">Nylon</option>
                <option value="PC">Polycarbonate</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">Brand (Optional)</label>
              <input
                v-model="form.brand"
                type="text"
                placeholder="e.g., Prusament, eSun"
                class="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border-2 border-gray-600 focus:border-green-400 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium mb-2">Color (Optional)</label>
            <input
              v-model="form.color"
              type="text"
              placeholder="e.g., Red, Black, Transparent"
              class="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border-2 border-gray-600 focus:border-green-400 focus:outline-none"
            />
          </div>
        </div>

        <!-- Temperature Settings -->
        <div class="space-y-4">
          <h3 class="font-semibold text-green-400">Temperature Settings (°C)</h3>
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-2">Nozzle Temperature *</label>
              <input
                v-model.number="form.nozzleTemp"
                type="number"
                required
                min="0"
                class="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border-2 border-gray-600 focus:border-green-400 focus:outline-none"
              />
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">Bed Temperature *</label>
              <input
                v-model.number="form.bedTemp"
                type="number"
                required
                min="0"
                class="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border-2 border-gray-600 focus:border-green-400 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <!-- Print Settings -->
        <div class="space-y-4">
          <h3 class="font-semibold text-green-400">Print Settings</h3>
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-2">Flow Rate (%)</label>
              <input
                v-model.number="form.flowRate"
                type="number"
                step="0.1"
                min="0"
                class="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border-2 border-gray-600 focus:border-green-400 focus:outline-none"
              />
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">Print Speed (mm/s)</label>
              <input
                v-model.number="form.printSpeed"
                type="number"
                min="1"
                class="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border-2 border-gray-600 focus:border-green-400 focus:outline-none"
              />
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">Max Volumetric Speed (mm³/s)</label>
              <input
                v-model.number="form.maxVolumetricSpeed"
                type="number"
                step="0.1"
                min="0"
                class="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border-2 border-gray-600 focus:border-green-400 focus:outline-none"
              />
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">Cooling Fan Speed (%)</label>
              <input
                v-model.number="form.coolingFanSpeed"
                type="number"
                min="0"
                max="100"
                class="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border-2 border-gray-600 focus:border-green-400 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <!-- Retraction Settings -->
        <div class="space-y-4">
          <h3 class="font-semibold text-green-400">Retraction Settings</h3>
          
          <div class="grid grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium mb-2">Retraction Distance (mm)</label>
              <input
                v-model.number="form.retractionDistance"
                type="number"
                step="0.1"
                min="0"
                class="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border-2 border-gray-600 focus:border-green-400 focus:outline-none"
              />
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">Retraction Speed (mm/s)</label>
              <input
                v-model.number="form.retractionSpeed"
                type="number"
                min="1"
                class="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border-2 border-gray-600 focus:border-green-400 focus:outline-none"
              />
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">Z Hop (mm)</label>
              <input
                v-model.number="form.zHop"
                type="number"
                step="0.1"
                min="0"
                class="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border-2 border-gray-600 focus:border-green-400 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <!-- Calibration Values -->
        <div class="space-y-4">
          <h3 class="font-semibold text-green-400">Calibration Values (Optional)</h3>
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-2">Pressure Advance</label>
              <input
                v-model.number="form.pressureAdvance"
                type="number"
                step="0.001"
                class="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border-2 border-gray-600 focus:border-green-400 focus:outline-none"
              />
            </div>

          </div>

          <div>
            <label class="block text-sm font-medium mb-2">Notes</label>
            <textarea
              v-model="form.notes"
              rows="3"
              placeholder="Add any notes about this filament..."
              class="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border-2 border-gray-600 focus:border-green-400 focus:outline-none resize-none"
            ></textarea>
          </div>
        </div>

        <!-- Buttons -->
        <div class="flex gap-4 pt-4">
          <button
            type="submit"
            class="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
          >
            {{ editingFilament ? 'Update Filament' : 'Add Filament' }}
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
import type { FilamentProfile } from '../types/profiles'

const props = defineProps<{
  isOpen: boolean
  editingFilament?: FilamentProfile | null
}>()

const emit = defineEmits<{
  close: []
  save: [filament: Omit<FilamentProfile, 'id'>]
}>()

const form = ref({
  name: '',
  material: 'PLA' as FilamentProfile['material'],
  brand: '',
  color: '',
  nozzleTemp: 210,
  bedTemp: 60,
  flowRate: 100,
  printSpeed: 100,
  maxVolumetricSpeed: 15,
  retractionDistance: 0.8,
  retractionSpeed: 40,
  zHop: undefined as number | undefined,
  pressureAdvance: undefined as number | undefined,
  coolingFanSpeed: 100,
  notes: '',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
})

watch(() => props.editingFilament, (filament) => {
  if (filament) {
    form.value = {
      name: filament.name,
      material: filament.material,
      brand: filament.brand || '',
      color: filament.color || '',
      nozzleTemp: filament.nozzleTemp,
      bedTemp: filament.bedTemp,
      flowRate: filament.flowRate || 100,
      printSpeed: filament.printSpeed || 100,
      maxVolumetricSpeed: filament.maxVolumetricSpeed,
      retractionDistance: filament.retractionDistance || 0.8,
      retractionSpeed: filament.retractionSpeed || 40,
      zHop: filament.zHop,
      pressureAdvance: filament.pressureAdvance,
      coolingFanSpeed: filament.coolingFanSpeed || 100,
      notes: filament.notes || '',
      createdAt: filament.createdAt,
      updatedAt: new Date().toISOString(),
    }
  } else {
    resetForm()
  }
}, { immediate: true })

const resetForm = () => {
  form.value = {
    name: '',
    material: 'PLA',
    brand: '',
    color: '',
    nozzleTemp: 210,
    bedTemp: 60,
    flowRate: 100,
    printSpeed: 100,
    maxVolumetricSpeed: 15,
    retractionDistance: 0.8,
    retractionSpeed: 40,
    zHop: undefined,
    pressureAdvance: undefined,
    coolingFanSpeed: 100,
    notes: '',
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
