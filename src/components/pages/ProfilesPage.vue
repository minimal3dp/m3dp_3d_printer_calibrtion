<template>
  <CalcLayout title="Profiles Manager">
    <template #info>
      <AlertBox type="info">
        <p class="font-semibold mb-2">Manage Your Printer & Filament Profiles</p>
        <p>
          Save configurations for multiple printers and filaments. Switch between profiles
          to quickly apply calibrated settings to calculators.
        </p>
      </AlertBox>
    </template>

    <!-- Profile Selector -->
    <CalcCard title="Active Profile">
      <div class="space-y-4">
        <div class="flex items-center gap-4">
          <select
            v-model="selectedProfileId"
            @change="handleProfileChange"
            class="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg border-2 border-gray-600 focus:border-cyan-400 focus:outline-none"
          >
            <option v-for="profile in profileStore.profiles" :key="profile.id" :value="profile.id">
              {{ profile.name }}
            </option>
          </select>
          
          <button
            @click="showNewProfileDialog = true"
            class="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors"
          >
            <i class="ph ph-plus"></i> New Profile
          </button>
        </div>

        <div v-if="profileStore.currentProfile" class="flex gap-2">
          <button
            @click="showRenameDialog = true"
            class="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 text-gray-300 rounded transition-colors"
          >
            <i class="ph ph-pencil"></i> Rename
          </button>
          <button
            @click="handleExportProfile"
            class="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 text-gray-300 rounded transition-colors"
          >
            <i class="ph ph-download"></i> Export
          </button>
          <button
            @click="handleImportProfile"
            class="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 text-gray-300 rounded transition-colors"
          >
            <i class="ph ph-upload"></i> Import
          </button>
          <button
            v-if="profileStore.profiles.length > 1"
            @click="handleDeleteProfile"
            class="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 text-white rounded transition-colors ml-auto"
          >
            <i class="ph ph-trash"></i> Delete
          </button>
        </div>
      </div>
    </CalcCard>

    <!-- Printers Section -->
    <CalcCard title="Printer Profiles">
      <div class="space-y-4">
        <div v-if="profileStore.currentProfile?.printers.length === 0" class="text-gray-500 text-center py-8">
          <i class="ph ph-printer text-4xl mb-2"></i>
          <p>No printers configured yet</p>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="printer in profileStore.currentProfile?.printers"
            :key="printer.id"
            :class="[
              'p-4 rounded-lg border-2 cursor-pointer transition-colors',
              printer.id === profileStore.currentProfile?.activePrinterId
                ? 'border-cyan-400 bg-cyan-900/20'
                : 'border-gray-700 bg-gray-800 hover:border-gray-600'
            ]"
            @click="profileStore.setActivePrinter(printer.id)"
          >
            <div class="flex items-start justify-between mb-2">
              <div>
                <h4 class="font-semibold text-white">{{ printer.name }}</h4>
                <p class="text-sm text-gray-400">
                  {{ printer.type }} | {{ printer.firmware }}
                </p>
              </div>
              <div class="flex gap-1">
                <button
                  @click.stop="editPrinter(printer)"
                  class="p-1 text-gray-400 hover:text-white"
                >
                  <i class="ph ph-pencil"></i>
                </button>
                <button
                  @click.stop="deletePrinter(printer.id)"
                  class="p-1 text-gray-400 hover:text-red-400"
                >
                  <i class="ph ph-trash"></i>
                </button>
              </div>
            </div>
            <div class="text-xs text-gray-400 space-y-1">
              <p>Build: {{ printer.buildVolume.x }}×{{ printer.buildVolume.y }}×{{ printer.buildVolume.z }}mm</p>
              <p>Nozzle: {{ printer.nozzleDiameter }}mm | {{ printer.extruderType }}</p>
            </div>
          </div>
        </div>

        <button
          @click="showNewPrinterDialog = true"
          class="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
        >
          <i class="ph ph-plus"></i> Add Printer
        </button>
      </div>
    </CalcCard>

    <!-- Filaments Section -->
    <CalcCard title="Filament Profiles">
      <div class="space-y-4">
        <div v-if="profileStore.currentProfile?.filaments.length === 0" class="text-gray-500 text-center py-8">
          <i class="ph ph-package text-4xl mb-2"></i>
          <p>No filaments configured yet</p>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="filament in profileStore.currentProfile?.filaments"
            :key="filament.id"
            :class="[
              'p-4 rounded-lg border-2 cursor-pointer transition-colors',
              filament.id === profileStore.currentProfile?.activeFilamentId
                ? 'border-green-400 bg-green-900/20'
                : 'border-gray-700 bg-gray-800 hover:border-gray-600'
            ]"
            @click="profileStore.setActiveFilament(filament.id)"
          >
            <div class="flex items-start justify-between mb-2">
              <div>
                <h4 class="font-semibold text-white">{{ filament.name }}</h4>
                <p class="text-sm text-gray-400">{{ filament.material }}</p>
                <p v-if="filament.brand" class="text-xs text-gray-500">{{ filament.brand }}</p>
              </div>
              <div class="flex gap-1">
                <button
                  @click.stop="editFilament(filament)"
                  class="p-1 text-gray-400 hover:text-white"
                >
                  <i class="ph ph-pencil"></i>
                </button>
                <button
                  @click.stop="deleteFilament(filament.id)"
                  class="p-1 text-gray-400 hover:text-red-400"
                >
                  <i class="ph ph-trash"></i>
                </button>
              </div>
            </div>
            <div class="text-xs text-gray-400 space-y-1">
              <p>Nozzle: {{ filament.nozzleTemp }}°C | Bed: {{ filament.bedTemp }}°C</p>
              <p>Flow: {{ filament.flowRate }}% | Speed: {{ filament.printSpeed }}mm/s</p>
            </div>
          </div>
        </div>

        <button
          @click="showNewFilamentDialog = true"
          class="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
        >
          <i class="ph ph-plus"></i> Add Filament
        </button>
      </div>
    </CalcCard>

    <!-- Active Configuration Summary -->
    <CalcCard v-if="profileStore.activePrinter || profileStore.activeFilament" title="Active Configuration">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div v-if="profileStore.activePrinter">
          <h4 class="font-semibold text-cyan-400 mb-2">Active Printer</h4>
          <div class="text-sm space-y-1">
            <p><strong>Name:</strong> {{ profileStore.activePrinter.name }}</p>
            <p><strong>Type:</strong> {{ profileStore.activePrinter.type }}</p>
            <p><strong>Firmware:</strong> {{ profileStore.activePrinter.firmware }}</p>
            <p><strong>Nozzle:</strong> {{ profileStore.activePrinter.nozzleDiameter }}mm</p>
          </div>
        </div>
        
        <div v-if="profileStore.activeFilament">
          <h4 class="font-semibold text-green-400 mb-2">Active Filament</h4>
          <div class="text-sm space-y-1">
            <p><strong>Name:</strong> {{ profileStore.activeFilament.name }}</p>
            <p><strong>Material:</strong> {{ profileStore.activeFilament.material }}</p>
            <p><strong>Temperatures:</strong> {{ profileStore.activeFilament.nozzleTemp }}°C / {{ profileStore.activeFilament.bedTemp }}°C</p>
            <p><strong>Flow Rate:</strong> {{ profileStore.activeFilament.flowRate }}%</p>
          </div>
        </div>
      </div>
    </CalcCard>
  </CalcLayout>

  <!-- Printer Form Dialog -->
  <PrinterFormDialog
    :is-open="showNewPrinterDialog || editingPrinter !== null"
    :editing-printer="editingPrinter"
    @close="closePrinterDialog"
    @save="savePrinter"
  />

  <!-- Filament Form Dialog -->
  <FilamentFormDialog
    :is-open="showNewFilamentDialog || editingFilament !== null"
    :editing-filament="editingFilament"
    @close="closeFilamentDialog"
    @save="saveFilament"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CalcLayout from '../CalcLayout.vue'
import CalcCard from '../CalcCard.vue'
import AlertBox from '../AlertBox.vue'
import PrinterFormDialog from '../PrinterFormDialog.vue'
import FilamentFormDialog from '../FilamentFormDialog.vue'
import { useProfileStore } from '../../stores/profileStore'
import type { PrinterProfile, FilamentProfile } from '../../types/profiles'

const profileStore = useProfileStore()
const selectedProfileId = ref(profileStore.currentProfile?.id || '')
const editingPrinter = ref<PrinterProfile | null>(null)
const editingFilament = ref<FilamentProfile | null>(null)

const showNewProfileDialog = ref(false)
const showRenameDialog = ref(false)
const showNewPrinterDialog = ref(false)
const showNewFilamentDialog = ref(false)

const handleProfileChange = () => {
  if (selectedProfileId.value) {
    profileStore.setActiveProfile(selectedProfileId.value)
  }
}

const handleDeleteProfile = () => {
  if (confirm('Are you sure you want to delete this profile?')) {
    profileStore.deleteProfile(profileStore.currentProfile!.id)
    selectedProfileId.value = profileStore.currentProfile?.id || ''
  }
}

const deletePrinter = (id: string) => {
  if (confirm('Delete this printer profile?')) {
    profileStore.deletePrinter(id)
  }
}

const deleteFilament = (id: string) => {
  if (confirm('Delete this filament profile?')) {
    profileStore.deleteFilament(id)
  }
}

const handleExportProfile = () => {
  const data = profileStore.exportProfile()
  if (data) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${profileStore.currentProfile!.name}-profile.json`
    a.click()
    URL.revokeObjectURL(url)
  }
}

const handleImportProfile = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.json'
  input.onchange = (e: any) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e: any) => {
        try {
          const data = JSON.parse(e.target.result)
          if (profileStore.importProfile(data)) {
            alert('Profile imported successfully!')
            selectedProfileId.value = profileStore.currentProfile?.id || ''
          } else {
            alert('Failed to import profile. Invalid format.')
          }
        } catch (error) {
          alert('Failed to import profile. Invalid JSON.')
        }
      }
      reader.readAsText(file)
    }
  }
  input.click()
}

const editPrinter = (printer: PrinterProfile) => {
  editingPrinter.value = printer
  showNewPrinterDialog.value = false
}

const editFilament = (filament: FilamentProfile) => {
  editingFilament.value = filament
  showNewFilamentDialog.value = false
}

const closePrinterDialog = () => {
  showNewPrinterDialog.value = false
  editingPrinter.value = null
}

const closeFilamentDialog = () => {
  showNewFilamentDialog.value = false
  editingFilament.value = null
}

const savePrinter = (printer: Omit<PrinterProfile, 'id'>) => {
  if (editingPrinter.value) {
    profileStore.updatePrinter(editingPrinter.value.id, printer)
  } else {
    profileStore.addPrinter(printer)
  }
  closePrinterDialog()
}

const saveFilament = (filament: Omit<FilamentProfile, 'id'>) => {
  if (editingFilament.value) {
    profileStore.updateFilament(editingFilament.value.id, filament)
  } else {
    profileStore.addFilament(filament)
  }
  closeFilamentDialog()
}

onMounted(() => {
  selectedProfileId.value = profileStore.currentProfile?.id || ''
})
</script>
