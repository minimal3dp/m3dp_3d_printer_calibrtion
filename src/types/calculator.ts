export interface Calculator {
  id: string
  name: string
  description: string
  category: 'basic' | 'hardware' | 'calibration' | 'tuning'
}

export interface CalculatorInput {
  id: string
  label: string
  value: number
  unit?: string
  placeholder?: string
  step?: number
  min?: number
  max?: number
  hint?: string
}

export interface CalculatorResult {
  id: string
  label: string
  value: number | string
  unit?: string
  decimals?: number
  copyable?: boolean
  hint?: string
}
