import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { UserProfile, PrinterProfile, FilamentProfile } from '../types/profiles'

export const useProfileStore = defineStore('profiles', () => {
  // State
  const currentProfile = ref<UserProfile | null>(null)
  const profiles = ref<UserProfile[]>([])

  // Load from localStorage
  const loadProfiles = () => {
    try {
      const stored = localStorage.getItem('m3dp-user-profiles')
      if (stored) {
        profiles.value = JSON.parse(stored)
      }
      
      const activeProfileId = localStorage.getItem('m3dp-active-profile')
      if (activeProfileId) {
        currentProfile.value = profiles.value.find(p => p.id === activeProfileId) || null
      }
      
      // Create default profile if none exist
      if (profiles.value.length === 0) {
        createDefaultProfile()
      }
    } catch (error) {
      console.error('Failed to load profiles:', error)
    }
  }

  // Save to localStorage
  const saveProfiles = () => {
    try {
      localStorage.setItem('m3dp-user-profiles', JSON.stringify(profiles.value))
      if (currentProfile.value) {
        localStorage.setItem('m3dp-active-profile', currentProfile.value.id)
      }
    } catch (error) {
      console.error('Failed to save profiles:', error)
    }
  }

  // Create default profile
  const createDefaultProfile = () => {
    const defaultProfile: UserProfile = {
      id: generateId(),
      name: 'Default Profile',
      printers: [],
      filaments: [],
      preferences: {
        defaultUnits: 'metric',
        theme: 'dark',
        autoSave: true
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    profiles.value.push(defaultProfile)
    currentProfile.value = defaultProfile
    saveProfiles()
  }

  // Profile Management
  const createProfile = (name: string): UserProfile => {
    const profile: UserProfile = {
      id: generateId(),
      name,
      printers: [],
      filaments: [],
      preferences: {
        defaultUnits: 'metric',
        theme: 'dark',
        autoSave: true
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    profiles.value.push(profile)
    saveProfiles()
    return profile
  }

  const updateProfile = (id: string, updates: Partial<UserProfile>) => {
    const index = profiles.value.findIndex(p => p.id === id)
    if (index !== -1) {
      profiles.value[index] = {
        ...profiles.value[index],
        ...updates,
        updatedAt: new Date().toISOString()
      }
      if (currentProfile.value?.id === id) {
        currentProfile.value = profiles.value[index]
      }
      saveProfiles()
    }
  }

  const deleteProfile = (id: string) => {
    profiles.value = profiles.value.filter(p => p.id !== id)
    if (currentProfile.value?.id === id) {
      currentProfile.value = profiles.value[0] || null
    }
    saveProfiles()
  }

  const setActiveProfile = (id: string) => {
    const profile = profiles.value.find(p => p.id === id)
    if (profile) {
      currentProfile.value = profile
      saveProfiles()
    }
  }

  // Printer Management
  const addPrinter = (printer: Omit<PrinterProfile, 'id' | 'createdAt' | 'updatedAt'>): PrinterProfile => {
    if (!currentProfile.value) return {} as PrinterProfile
    
    const newPrinter: PrinterProfile = {
      ...printer,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    currentProfile.value.printers.push(newPrinter)
    currentProfile.value.updatedAt = new Date().toISOString()
    saveProfiles()
    return newPrinter
  }

  const updatePrinter = (id: string, updates: Partial<PrinterProfile>) => {
    if (!currentProfile.value) return
    
    const index = currentProfile.value.printers.findIndex(p => p.id === id)
    if (index !== -1) {
      currentProfile.value.printers[index] = {
        ...currentProfile.value.printers[index],
        ...updates,
        updatedAt: new Date().toISOString()
      }
      currentProfile.value.updatedAt = new Date().toISOString()
      saveProfiles()
    }
  }

  const deletePrinter = (id: string) => {
    if (!currentProfile.value) return
    
    currentProfile.value.printers = currentProfile.value.printers.filter(p => p.id !== id)
    if (currentProfile.value.activePrinterId === id) {
      currentProfile.value.activePrinterId = undefined
    }
    currentProfile.value.updatedAt = new Date().toISOString()
    saveProfiles()
  }

  const setActivePrinter = (id: string) => {
    if (!currentProfile.value) return
    
    const printer = currentProfile.value.printers.find(p => p.id === id)
    if (printer) {
      currentProfile.value.activePrinterId = id
      currentProfile.value.updatedAt = new Date().toISOString()
      saveProfiles()
    }
  }

  // Filament Management
  const addFilament = (filament: Omit<FilamentProfile, 'id' | 'createdAt' | 'updatedAt'>): FilamentProfile => {
    if (!currentProfile.value) return {} as FilamentProfile
    
    const newFilament: FilamentProfile = {
      ...filament,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    currentProfile.value.filaments.push(newFilament)
    currentProfile.value.updatedAt = new Date().toISOString()
    saveProfiles()
    return newFilament
  }

  const updateFilament = (id: string, updates: Partial<FilamentProfile>) => {
    if (!currentProfile.value) return
    
    const index = currentProfile.value.filaments.findIndex(f => f.id === id)
    if (index !== -1) {
      currentProfile.value.filaments[index] = {
        ...currentProfile.value.filaments[index],
        ...updates,
        updatedAt: new Date().toISOString()
      }
      currentProfile.value.updatedAt = new Date().toISOString()
      saveProfiles()
    }
  }

  const deleteFilament = (id: string) => {
    if (!currentProfile.value) return
    
    currentProfile.value.filaments = currentProfile.value.filaments.filter(f => f.id !== id)
    if (currentProfile.value.activeFilamentId === id) {
      currentProfile.value.activeFilamentId = undefined
    }
    currentProfile.value.updatedAt = new Date().toISOString()
    saveProfiles()
  }

  const setActiveFilament = (id: string) => {
    if (!currentProfile.value) return
    
    const filament = currentProfile.value.filaments.find(f => f.id === id)
    if (filament) {
      currentProfile.value.activeFilamentId = id
      currentProfile.value.updatedAt = new Date().toISOString()
      saveProfiles()
    }
  }

  // Computed
  const activePrinter = computed(() => {
    if (!currentProfile.value?.activePrinterId) return null
    return currentProfile.value.printers.find(p => p.id === currentProfile.value!.activePrinterId) || null
  })

  const activeFilament = computed(() => {
    if (!currentProfile.value?.activeFilamentId) return null
    return currentProfile.value.filaments.find(f => f.id === currentProfile.value!.activeFilamentId) || null
  })

  // Import/Export
  const exportProfile = () => {
    if (!currentProfile.value) return null
    return {
      profile: currentProfile.value,
      exportedAt: new Date().toISOString(),
      version: '1.0'
    }
  }

  const importProfile = (data: any): boolean => {
    try {
      if (data.profile && data.version === '1.0') {
        const profile: UserProfile = {
          ...data.profile,
          id: generateId(), // Generate new ID to avoid conflicts
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
        profiles.value.push(profile)
        saveProfiles()
        return true
      }
      return false
    } catch (error) {
      console.error('Failed to import profile:', error)
      return false
    }
  }

  const exportAllProfiles = () => {
    return {
      profiles: profiles.value,
      exportedAt: new Date().toISOString(),
      version: '1.0'
    }
  }

  const importAllProfiles = (data: any): boolean => {
    try {
      if (data.profiles && Array.isArray(data.profiles) && data.version === '1.0') {
        profiles.value = data.profiles
        if (profiles.value.length > 0 && !currentProfile.value) {
          currentProfile.value = profiles.value[0]
        }
        saveProfiles()
        return true
      }
      return false
    } catch (error) {
      console.error('Failed to import profiles:', error)
      return false
    }
  }

  // Helper function
  const generateId = (): string => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  // Initialize
  loadProfiles()

  return {
    // State
    currentProfile,
    profiles,
    activePrinter,
    activeFilament,
    
    // Profile Management
    createProfile,
    updateProfile,
    deleteProfile,
    setActiveProfile,
    
    // Printer Management
    addPrinter,
    updatePrinter,
    deletePrinter,
    setActivePrinter,
    
    // Filament Management
    addFilament,
    updateFilament,
    deleteFilament,
    setActiveFilament,
    
    // Import/Export
    exportProfile,
    importProfile,
    exportAllProfiles,
    importAllProfiles
  }
})
