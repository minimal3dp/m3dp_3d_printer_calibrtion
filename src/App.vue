<template>
  <div class="flex h-screen bg-gray-900 text-gray-300">
    <!-- Sidebar -->
    <Sidebar 
      :active-page="activePage"
      @navigate="handleNavigate"
    />

    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto p-6 md:p-10">
      <component 
        :is="currentComponent" 
        @navigate="handleNavigate"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import Sidebar from './components/Sidebar.vue'
import HomePage from './components/pages/HomePage.vue'
import BasicChecksPage from './components/pages/BasicChecksPage.vue'
import RunCurrentPage from './components/pages/RunCurrentPage.vue'
import ExtruderRotationPage from './components/pages/ExtruderRotationPage.vue'
import OrcaFlowPage from './components/pages/OrcaFlowPage.vue'
import FlowWallPage from './components/pages/FlowWallPage.vue'
import VolumetricOrcaPage from './components/pages/VolumetricOrcaPage.vue'
import VolumetricEllisPage from './components/pages/VolumetricEllisPage.vue'
import PressureAdvancePage from './components/pages/PressureAdvancePage.vue'
import InputShapingPage from './components/pages/InputShapingPage.vue'
import AccelerationTowerPage from './components/pages/AccelerationTowerPage.vue'
import TemperatureTowerPage from './components/pages/TemperatureTowerPage.vue'
import TemperatureTowerEllisPage from './components/pages/TemperatureTowerEllisPage.vue'
import PIDTuningPage from './components/pages/PIDTuningPage.vue'
import ExtrusionSmoothingPage from './components/pages/ExtrusionSmoothingPage.vue'
import LeadScrewPage from './components/pages/LeadScrewPage.vue'
import BeltRotationPage from './components/pages/BeltRotationPage.vue'
import ProbeOffsetPage from './components/pages/ProbeOffsetPage.vue'
import SkewCorrectionPage from './components/pages/SkewCorrectionPage.vue'
import StepperDirectionPage from './components/pages/StepperDirectionPage.vue'
import EndstopTestingPage from './components/pages/EndstopTestingPage.vue'
import ZOffsetCalibrationPage from './components/pages/ZOffsetCalibrationPage.vue'
import MaxSpeedPage from './components/pages/MaxSpeedPage.vue'
import LineWidthsPage from './components/pages/LineWidthsPage.vue'
import ProfilesPage from './components/pages/ProfilesPage.vue'
import VolumetricFlowPage from './components/pages/VolumetricFlowPage.vue'
import { useKlipperTuningGuideStore } from './stores/klipperTuningGuide'

const store = useKlipperTuningGuideStore()

// Page registry - all calculator components
const pages = {
  home: HomePage,
  checks: BasicChecksPage,
  run_current: RunCurrentPage,
  extruder: ExtruderRotationPage,
  flow: OrcaFlowPage,
  flow_wall: FlowWallPage,
  volumetric_orca: VolumetricOrcaPage,
  volumetric_ellis: VolumetricEllisPage,
  volumetric_flow: VolumetricFlowPage,
  pa: PressureAdvancePage,
  shaping: InputShapingPage,
  acceleration: AccelerationTowerPage,
  temp_tower: TemperatureTowerPage,
  temp_tower_ellis: TemperatureTowerEllisPage,
  pid_tuning: PIDTuningPage,
  ers: ExtrusionSmoothingPage,
  leadscrew: LeadScrewPage,
  belt_rotation: BeltRotationPage,
  probe_offset: ProbeOffsetPage,
  skew: SkewCorrectionPage,
  stepper_direction: StepperDirectionPage,
  endstop_testing: EndstopTestingPage,
  z_offset: ZOffsetCalibrationPage,
  max_speed: MaxSpeedPage,
  linewidth: LineWidthsPage,
  profiles: ProfilesPage,
}

const activePage = ref(store.lastVisitedPage || 'home')

const currentComponent = computed(() => {
  return pages[activePage.value as keyof typeof pages] || pages.home
})

const handleNavigate = (pageId: string) => {
  activePage.value = pageId
  window.location.hash = pageId
}

// Watch for page changes and save to store
watch(activePage, (newPage) => {
  store.setLastVisitedPage(newPage)
})

onMounted(() => {
  // Handle initial hash
  const hash = window.location.hash.substring(1)
  if (hash && pages[hash as keyof typeof pages]) {
    activePage.value = hash
  } else if (store.lastVisitedPage && pages[store.lastVisitedPage as keyof typeof pages]) {
    // Restore last visited page if no hash
    activePage.value = store.lastVisitedPage
    window.location.hash = store.lastVisitedPage
  }

  // Handle browser back/forward
  window.addEventListener('hashchange', () => {
    const newHash = window.location.hash.substring(1)
    if (newHash && pages[newHash as keyof typeof pages]) {
      activePage.value = newHash
    }
  })
})
</script>

<style scoped>
/* Component-specific styles if needed */
</style>
