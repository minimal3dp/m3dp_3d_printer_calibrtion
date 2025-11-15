/**
 * Calculate RMS run current from peak current
 * @param peakCurrent - Motor peak current rating (Amps)
 * @returns RMS run_current value
 */
export function calculateRMSCurrent(peakCurrent: number): number {
  return peakCurrent / Math.sqrt(2) // RMS = Peak / sqrt(2) ≈ Peak * 0.7071
}

/**
 * Calculate extruder rotation distance from E-steps
 * @param fullSteps - Full steps per rotation (200 for 1.8°, 400 for 0.9°)
 * @param microsteps - Microstep setting (e.g., 16, 32)
 * @param eSteps - Old E-steps value
 * @returns New rotation_distance value
 */
export function calculateExtruderFromESteps(
  fullSteps: number,
  microsteps: number,
  eSteps: number
): number {
  return (fullSteps * microsteps) / eSteps
}

/**
 * Calculate extruder rotation distance from measurement
 * @param prevRotation - Previous rotation_distance value
 * @param initialMark - Initial mark distance before extrusion (mm)
 * @param requestedExtrude - Requested extrusion distance (mm)
 * @param subsequentMark - Subsequent mark distance after extrusion (mm)
 * @returns Object with actualExtruded and newRotation
 */
export function calculateExtruderFromMeasurement(
  prevRotation: number,
  initialMark: number,
  requestedExtrude: number,
  subsequentMark: number
): { actualExtruded: number; newRotation: number } {
  const actualExtruded = initialMark - subsequentMark
  const newRotation = (prevRotation * actualExtruded) / requestedExtrude
  return { actualExtruded, newRotation }
}

/**
 * Calculate OrcaSlicer flow using Pass 1 method
 * @param oldFlow - Old flow rate value
 * @param slideValue - Slide value percentage from test
 * @returns New flow rate value
 */
export function calculateOrcaFlowPass(
  oldFlow: number,
  slideValue: number
): number {
  return oldFlow * (1 + slideValue / 100)
}

/**
 * Calculate OrcaSlicer flow using YOLO method
 * @param oldFlow - Old flow rate value
 * @param slideValue - Slide value from test (direct addition)
 * @returns New flow rate value
 */
export function calculateOrcaFlowYOLO(
  oldFlow: number,
  slideValue: number
): number {
  return oldFlow + slideValue
}

/**
 * Calculate flow rate from wall thickness measurements
 * @param lineWidth - Slicer line width (mm)
 * @param perimeters - Number of perimeters
 * @param measurements - Array of wall measurements (mm)
 * @returns Object with expected, average, and flow percentage
 */
export function calculateFlowFromWall(
  lineWidth: number,
  perimeters: number,
  measurements: number[]
): { expected: number; average: number; flow: number } {
  const expected = lineWidth * perimeters
  const average = measurements.reduce((a, b) => a + b, 0) / measurements.length
  const flow = 100 * (expected / average)
  return { expected, average, flow }
}

/**
 * Calculate max volumetric speed (OrcaSlicer method)
 * @param startFlow - Starting flow value (mm³/s)
 * @param measuredHeight - Height where quality fails (mm)
 * @param step - Step increment (mm³/s per mm)
 * @returns Object with maxFlow and recommendedFlow (90%)
 */
export function calculateVolumetricOrca(
  startFlow: number,
  measuredHeight: number,
  step: number
): { maxFlow: number; recommendedFlow: number } {
  const maxFlow = startFlow + measuredHeight * step
  const recommendedFlow = maxFlow * 0.9
  return { maxFlow, recommendedFlow }
}

/**
 * Calculate max volumetric speed (Ellis method)
 * @param fValue - Highest successful F value (mm/min)
 * @param filamentDiameter - Filament diameter (mm)
 * @returns Object with extrusionSpeed (mm/s) and maxVolumetric (mm³/s)
 */
export function calculateVolumetricEllis(
  fValue: number,
  filamentDiameter: number
): { extrusionSpeed: number; maxVolumetric: number } {
  const extrusionSpeed = fValue / 60
  const radius = filamentDiameter / 2
  const area = Math.PI * radius * radius
  const maxVolumetric = area * extrusionSpeed
  return { extrusionSpeed, maxVolumetric }
}

/**
 * Calculate pressure advance from tuning tower
 * @param start - Starting PA value
 * @param measuredHeight - Height where print looks best (mm)
 * @param factor - Factor increment (PA per mm)
 * @returns Pressure advance value
 */
export function calculatePressureAdvance(
  start: number,
  measuredHeight: number,
  factor: number
): number {
  return start + measuredHeight * factor
}

/**
 * Calculate input shaping frequency
 * @param printSpeed - Print speed used (mm/s)
 * @param rings - Number of rings counted
 * @param measurement - Distance of rings (mm)
 * @returns Frequency in Hz
 */
export function calculateInputShapingFreq(
  printSpeed: number,
  rings: number,
  measurement: number
): number {
  return (rings * printSpeed) / measurement
}

/**
 * Calculate extrusion rate smoothing value
 * @param accel - Acceleration (mm/s²)
 * @param lineWidth - Line width (mm)
 * @param layerHeight - Layer height (mm)
 * @returns Object with max ERS and recommended range (60-80%)
 */
export function calculateERS(
  accel: number,
  lineWidth: number,
  layerHeight: number
): { max: number; minRecommended: number; maxRecommended: number } {
  const max = accel * lineWidth * layerHeight
  return {
    max,
    minRecommended: max * 0.6,
    maxRecommended: max * 0.8,
  }
}

/**
 * Calculate lead screw rotation distance
 * @param pitch - Thread pitch (mm)
 * @param threads - Number of thread starts
 * @returns Rotation distance
 */
export function calculateLeadScrew(pitch: number, threads: number): number {
  return pitch * threads
}

/**
 * Calculate belt rotation distance
 * @param beltPitch - Belt pitch (mm)
 * @param pulleyTeeth - Number of pulley teeth
 * @returns Rotation distance
 */
export function calculateBeltRotation(
  beltPitch: number,
  pulleyTeeth: number
): number {
  return beltPitch * pulleyTeeth
}

/**
 * Calculate probe XY offset
 * @param probeX - Probe X coordinate
 * @param probeY - Probe Y coordinate
 * @param nozzleX - Nozzle X coordinate
 * @param nozzleY - Nozzle Y coordinate
 * @returns Offset object {x, y}
 */
export function calculateProbeOffset(
  probeX: number,
  probeY: number,
  nozzleX: number,
  nozzleY: number
): { x: number; y: number } {
  return {
    x: nozzleX - probeX,
    y: nozzleY - probeY,
  }
}

/**
 * Calculate maximum print speed from volumetric flow
 * @param maxVolumetric - Max volumetric speed (mm³/s)
 * @param layerHeight - Layer height (mm)
 * @param lineWidth - Line width (mm)
 * @returns Maximum print speed (mm/s)
 */
export function calculateMaxPrintSpeed(
  maxVolumetric: number,
  layerHeight: number,
  lineWidth: number
): number {
  return maxVolumetric / (layerHeight * lineWidth)
}

/**
 * Calculate line width from nozzle diameter and percentage
 * @param nozzleDiameter - Nozzle diameter (mm)
 * @param percentage - Percentage of nozzle diameter
 * @returns Line width (mm)
 */
export function calculateLineWidth(
  nozzleDiameter: number,
  percentage: number
): number {
  return nozzleDiameter * (percentage / 100)
}
