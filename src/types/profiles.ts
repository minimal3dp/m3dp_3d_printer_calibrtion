export interface PrinterProfile {
  id: string
  name: string
  type: 'cartesian' | 'corexy' | 'delta' | 'other'
  firmware: 'klipper' | 'marlin' | 'reprapfirmware' | 'other'
  
  // Dimensions
  buildVolume: {
    x: number
    y: number
    z: number
  }
  
  // Extruder
  extruderType: 'direct_drive' | 'bowden'
  nozzleDiameter: number
  maxHotendTemp: number
  
  // Motion
  maxSpeed: number
  maxAcceleration: number
  
  // Hardware
  hasProbe: boolean
  probeType?: 'bltouch' | 'inductive' | 'capacitive' | 'klicky' | 'other'
  hasTMCDrivers: boolean
  hasInputShaping: boolean
  
  // Calibration Values
  calibration: {
    rotationDistance?: {
      x?: number
      y?: number
      z?: number
      e?: number
    }
    pressureAdvance?: number
    inputShaping?: {
      shaperType?: string
      shaperFreqX?: number
      shaperFreqY?: number
    }
    runCurrent?: {
      x?: number
      y?: number
      z?: number
      e?: number
    }
  }
  
  createdAt: string
  updatedAt: string
}

export interface FilamentProfile {
  id: string
  name: string
  brand?: string
  material: 'PLA' | 'PETG' | 'ABS' | 'ASA' | 'TPU' | 'Nylon' | 'PC' | 'Other'
  color?: string
  
  // Temperature
  nozzleTemp: number
  bedTemp: number
  
  // Speed & Flow
  flowRate: number
  maxVolumetricSpeed: number
  printSpeed: number
  
  // Retraction
  retractionDistance: number
  retractionSpeed: number
  zHop?: number
  
  // Advanced
  pressureAdvance?: number
  coolingFanSpeed?: number
  
  // Notes
  notes?: string
  
  createdAt: string
  updatedAt: string
}

export interface UserProfile {
  id: string
  name: string
  
  // Active selections
  activePrinterId?: string
  activeFilamentId?: string
  
  // Collections
  printers: PrinterProfile[]
  filaments: FilamentProfile[]
  
  // Preferences
  preferences: {
    defaultUnits: 'metric' | 'imperial'
    theme: 'dark' | 'light' | 'auto'
    autoSave: boolean
  }
  
  createdAt: string
  updatedAt: string
}
