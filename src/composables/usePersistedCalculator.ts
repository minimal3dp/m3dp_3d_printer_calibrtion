import { ref, watch, onMounted } from 'vue'
import { useCalculatorStore } from '../stores/calculatorStore'

/**
 * Composable for persisting calculator values to localStorage
 * @param calculatorId Unique identifier for the calculator
 * @param fields Object with field names and default values
 */
export function usePersistedCalculator<T extends Record<string, number | string>>(
  calculatorId: string,
  fields: T
) {
  const store = useCalculatorStore()
  const values = ref<T>({ ...fields })

  // Load persisted values on mount
  onMounted(() => {
    const stored = store.getCalculatorValues(calculatorId)
    Object.keys(fields).forEach((key) => {
      if (stored[key] !== undefined) {
        values.value[key as keyof T] = stored[key] as any
      }
    })
  })

  // Watch for changes and persist
  watch(
    values,
    (newValues) => {
      store.setCalculatorValues(calculatorId, newValues as Record<string, number | string>)
    },
    { deep: true }
  )

  // Clear all values for this calculator
  const reset = () => {
    values.value = { ...fields }
    store.clearCalculator(calculatorId)
  }

  return {
    values,
    reset
  }
}
