import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface CalculatorValues {
  [calculatorId: string]: {
    [fieldId: string]: number | string
  }
}

export const useCalculatorStore = defineStore('calculator', () => {
  // State
  const values = ref<CalculatorValues>({})
  const lastVisitedPage = ref<string>('home')

  // Load from localStorage on init
  const loadFromStorage = () => {
    try {
      const stored = localStorage.getItem('m3dp-calculator-values')
      if (stored) {
        values.value = JSON.parse(stored)
      }
      
      const lastPage = localStorage.getItem('m3dp-last-page')
      if (lastPage) {
        lastVisitedPage.value = lastPage
      }
    } catch (error) {
      console.error('Failed to load from localStorage:', error)
    }
  }

  // Save to localStorage
  const saveToStorage = () => {
    try {
      localStorage.setItem('m3dp-calculator-values', JSON.stringify(values.value))
      localStorage.setItem('m3dp-last-page', lastVisitedPage.value)
    } catch (error) {
      console.error('Failed to save to localStorage:', error)
    }
  }

  // Get value for a specific calculator field
  const getValue = (calculatorId: string, fieldId: string, defaultValue: number | string = 0) => {
    return values.value[calculatorId]?.[fieldId] ?? defaultValue
  }

  // Set value for a specific calculator field
  const setValue = (calculatorId: string, fieldId: string, value: number | string) => {
    if (!values.value[calculatorId]) {
      values.value[calculatorId] = {}
    }
    values.value[calculatorId][fieldId] = value
    saveToStorage()
  }

  // Get all values for a calculator
  const getCalculatorValues = (calculatorId: string) => {
    return values.value[calculatorId] || {}
  }

  // Set multiple values for a calculator at once
  const setCalculatorValues = (calculatorId: string, calculatorValues: Record<string, number | string>) => {
    values.value[calculatorId] = { ...calculatorValues }
    saveToStorage()
  }

  // Clear all values for a calculator
  const clearCalculator = (calculatorId: string) => {
    delete values.value[calculatorId]
    saveToStorage()
  }

  // Clear all stored values
  const clearAll = () => {
    values.value = {}
    saveToStorage()
  }

  // Set last visited page
  const setLastVisitedPage = (pageId: string) => {
    lastVisitedPage.value = pageId
    saveToStorage()
  }

  // Export all data (for backup/sharing)
  const exportData = () => {
    return {
      values: values.value,
      exportedAt: new Date().toISOString(),
      version: '1.0'
    }
  }

  // Import data (from backup/sharing)
  const importData = (data: any) => {
    try {
      if (data.values) {
        values.value = data.values
        saveToStorage()
        return true
      }
      return false
    } catch (error) {
      console.error('Failed to import data:', error)
      return false
    }
  }

  // Initialize store
  loadFromStorage()

  return {
    values,
    lastVisitedPage,
    getValue,
    setValue,
    getCalculatorValues,
    setCalculatorValues,
    clearCalculator,
    clearAll,
    setLastVisitedPage,
    exportData,
    importData
  }
})
