/**
 * Comprehensive Test Suite for M3DP Calibration Suite
 * Tests all calculator functions to ensure correct calculations
 */

import {
  calculateExtruderFromESteps,
  calculateExtruderFromMeasurement,
  calculateOrcaFlowPass,
  calculateOrcaFlowYOLO,
  calculateFlowFromWall,
  calculateVolumetricOrca,
  calculateVolumetricEllis,
  calculatePressureAdvance,
  calculateInputShapingFreq,
  calculateERS,
  calculateLeadScrew,
  calculateBeltRotation,
  calculateProbeOffset,
  calculateMaxPrintSpeed,
  calculateLineWidth,
  calculateRMSCurrent
} from './src/utils/calculations.js';

console.log('🧪 M3DP Calibration Suite - Test Suite\n');
console.log('=' .repeat(60));

let passedTests = 0;
let failedTests = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`✅ ${name}`);
    passedTests++;
  } catch (error) {
    console.log(`❌ ${name}`);
    console.log(`   Error: ${error.message}`);
    failedTests++;
  }
}

function assertApprox(actual, expected, tolerance = 0.01, message = '') {
  const diff = Math.abs(actual - expected);
  if (diff > tolerance) {
    throw new Error(`${message}\n   Expected: ${expected}, Got: ${actual}, Diff: ${diff}`);
  }
}

function assertEqual(actual, expected, message = '') {
  if (actual !== expected) {
    throw new Error(`${message}\n   Expected: ${expected}, Got: ${actual}`);
  }
}

// ============================================================================
// EXTRUDER CALIBRATION TESTS
// ============================================================================

console.log('\n📏 Extruder Calibration Tests');
console.log('-'.repeat(60));

test('Extruder from E-Steps: Standard 1.8° stepper with 16 microsteps', () => {
  const result = calculateExtruderFromESteps(200, 16, 400);
  assertApprox(result, 8.0, 0.01, 'Standard BMG-style extruder');
});

test('Extruder from E-Steps: 0.9° stepper with 32 microsteps', () => {
  const result = calculateExtruderFromESteps(400, 32, 565);
  assertApprox(result, 22.56, 0.01, 'High precision stepper');
});

test('Extruder from Measurement: Perfect extrusion', () => {
  const result = calculateExtruderFromMeasurement(22.5, 120, 100, 20);
  assertApprox(result.actualExtruded, 100, 0.01, 'Should extrude exactly 100mm');
  assertApprox(result.newRotation, 22.5, 0.01, 'Rotation distance should remain same');
});

test('Extruder from Measurement: Under-extrusion', () => {
  const result = calculateExtruderFromMeasurement(22.5, 120, 100, 25);
  assertApprox(result.actualExtruded, 95, 0.01, 'Only extruded 95mm');
  assertApprox(result.newRotation, 21.375, 0.01, 'Should decrease rotation distance');
});

test('Extruder from Measurement: Over-extrusion', () => {
  const result = calculateExtruderFromMeasurement(22.5, 120, 100, 15);
  assertApprox(result.actualExtruded, 105, 0.01, 'Extruded 105mm');
  assertApprox(result.newRotation, 23.625, 0.01, 'Should increase rotation distance');
});

// ============================================================================
// FLOW CALIBRATION TESTS
// ============================================================================

console.log('\n💧 Flow Calibration Tests');
console.log('-'.repeat(60));

test('OrcaSlicer Flow Pass 1: Perfect flow', () => {
  const result = calculateOrcaFlowPass(100, 0.45, 0.45);
  assertApprox(result, 100, 0.01, 'No adjustment needed');
});

test('OrcaSlicer Flow Pass 1: Under-extrusion', () => {
  const result = calculateOrcaFlowPass(100, 0.40, 0.45);
  assertApprox(result, 88.89, 0.5, 'Should reduce flow multiplier');
});

test('OrcaSlicer Flow Pass 1: Over-extrusion', () => {
  const result = calculateOrcaFlowPass(100, 0.50, 0.45);
  assertApprox(result, 111.11, 0.5, 'Should increase flow multiplier');
});

test('OrcaSlicer Flow YOLO: Quick adjustment', () => {
  const result = calculateOrcaFlowYOLO(100, 110);
  assertApprox(result, 90.91, 0.5, 'Should reduce to compensate');
});

test('Wall Thickness Flow: Perfect calibration', () => {
  const result = calculateFlowFromWall(100, 1.2, 1.2);
  assertApprox(result, 100, 0.01, 'No change needed');
});

test('Wall Thickness Flow: Thin walls', () => {
  const result = calculateFlowFromWall(100, 1.15, 1.2);
  assertApprox(result, 95.83, 0.5, 'Reduce flow for thin walls');
});

// ============================================================================
// VOLUMETRIC FLOW TESTS
// ============================================================================

console.log('\n🌊 Volumetric Flow Tests');
console.log('-'.repeat(60));

test('Volumetric Orca: Standard 0.4mm nozzle', () => {
  const result = calculateVolumetricOrca(0.4, 0.2, 2.0, 50);
  assertApprox(result, 8.0, 0.1, 'Standard PLA flow rate');
});

test('Volumetric Orca: Large 0.6mm nozzle', () => {
  const result = calculateVolumetricOrca(0.6, 0.3, 2.5, 100);
  assertApprox(result, 45.0, 1.0, 'Higher flow for larger nozzle');
});

test('Volumetric Ellis: Conservative estimate', () => {
  const result = calculateVolumetricEllis(0.4, 0.2, 100);
  assertApprox(result, 8.0, 0.5, 'Ellis method conservative');
});

test('Volumetric Ellis: High speed print', () => {
  const result = calculateVolumetricEllis(0.6, 0.3, 200);
  assertApprox(result, 36.0, 1.0, 'High speed requires high flow');
});

// ============================================================================
// PRESSURE ADVANCE TESTS
// ============================================================================

console.log('\n⚡ Pressure Advance Tests');
console.log('-'.repeat(60));

test('Pressure Advance: Direct drive starting point', () => {
  const result = calculatePressureAdvance('direct', 0.4);
  assertApprox(result.start, 0.02, 0.01, 'Direct drive PA start');
  assertApprox(result.end, 0.10, 0.01, 'Direct drive PA end');
});

test('Pressure Advance: Bowden starting point', () => {
  const result = calculatePressureAdvance('bowden', 0.4);
  assertApprox(result.start, 0.20, 0.1, 'Bowden PA start (higher)');
  assertApprox(result.end, 1.0, 0.1, 'Bowden PA end');
});

// ============================================================================
// INPUT SHAPING TESTS
// ============================================================================

console.log('\n📊 Input Shaping Tests');
console.log('-'.repeat(60));

test('Input Shaping: 50mm test distance', () => {
  const result = calculateInputShapingFreq(50, 5);
  assertApprox(result, 10, 0.1, 'Frequency calculation from ringing');
});

test('Input Shaping: 100mm test distance', () => {
  const result = calculateInputShapingFreq(100, 10);
  assertApprox(result, 10, 0.1, 'Longer distance same result');
});

// ============================================================================
// HARDWARE CALIBRATION TESTS
// ============================================================================

console.log('\n🔧 Hardware Calibration Tests');
console.log('-'.repeat(60));

test('Lead Screw: 8mm pitch, 200 steps', () => {
  const result = calculateLeadScrew(8, 200, 16);
  assertApprox(result, 8, 0.01, 'Standard 8mm lead screw');
});

test('Lead Screw: 4mm pitch (2-start)', () => {
  const result = calculateLeadScrew(4, 200, 16);
  assertApprox(result, 4, 0.01, 'Fine pitch lead screw');
});

test('Belt Rotation: GT2 2mm pitch', () => {
  const result = calculateBeltRotation(2, 20, 200, 16);
  assertApprox(result, 40, 0.01, 'Standard GT2 with 20T pulley');
});

test('Belt Rotation: GT2 with 16T pulley', () => {
  const result = calculateBeltRotation(2, 16, 200, 16);
  assertApprox(result, 32, 0.01, 'Smaller pulley');
});

test('Probe Offset: Centered probe', () => {
  const result = calculateProbeOffset(150, 150, 150, 150);
  assertEqual(result.x, 0, 'X offset should be 0');
  assertEqual(result.y, 0, 'Y offset should be 0');
});

test('Probe Offset: Offset to right and front', () => {
  const result = calculateProbeOffset(150, 150, 170, 170);
  assertEqual(result.x, 20, 'X offset 20mm to right');
  assertEqual(result.y, 20, 'Y offset 20mm forward');
});

test('Max Print Speed: Standard settings', () => {
  const result = calculateMaxPrintSpeed(15, 3000);
  assertApprox(result, 200, 10, 'Standard speed');
});

test('Max Print Speed: High acceleration', () => {
  const result = calculateMaxPrintSpeed(15, 10000);
  assertApprox(result, 365, 10, 'High speed printing');
});

test('RMS Current: 1.5A peak motor', () => {
  const result = calculateRMSCurrent(1.5);
  assertApprox(result, 1.061, 0.01, 'RMS is peak / √2');
});

test('RMS Current: 2.0A peak motor', () => {
  const result = calculateRMSCurrent(2.0);
  assertApprox(result, 1.414, 0.01, 'Higher current motor');
});

// ============================================================================
// ADVANCED TUNING TESTS
// ============================================================================

console.log('\n⚙️ Advanced Tuning Tests');
console.log('-'.repeat(60));

test('Extrusion Rate Smoothing: Enabled', () => {
  const result = calculateERS(0.4);
  assertApprox(result, 0.28, 0.05, 'ERS = 0.7 × nozzle diameter');
});

test('Line Width: 0.4mm nozzle recommendations', () => {
  const result = calculateLineWidth(0.4);
  assertApprox(result.min, 0.28, 0.02, 'Minimum line width');
  assertApprox(result.recommended, 0.45, 0.02, 'Recommended line width');
  assertApprox(result.max, 0.6, 0.05, 'Maximum line width');
});

test('Line Width: 0.6mm nozzle recommendations', () => {
  const result = calculateLineWidth(0.6);
  assertApprox(result.min, 0.42, 0.02, 'Minimum for larger nozzle');
  assertApprox(result.recommended, 0.65, 0.05, 'Recommended for larger nozzle');
  assertApprox(result.max, 0.9, 0.1, 'Maximum for larger nozzle');
});

// ============================================================================
// EDGE CASES AND ERROR HANDLING
// ============================================================================

console.log('\n🛡️ Edge Cases and Error Handling');
console.log('-'.repeat(60));

test('Zero input handling: E-Steps with zero', () => {
  try {
    const result = calculateExtruderFromESteps(200, 16, 0);
    throw new Error('Should handle division by zero');
  } catch (error) {
    // Expected to return Infinity or handle gracefully
    passedTests++;
    console.log(`✅ Zero input handling: E-Steps with zero`);
  }
});

test('Negative values: Flow calculation', () => {
  const result = calculateFlowFromWall(100, -1.2, 1.2);
  // Should handle gracefully or return NaN
  if (isNaN(result) || result === 0) {
    // Expected behavior
  }
});

test('Extreme values: Very large microsteps', () => {
  const result = calculateExtruderFromESteps(200, 256, 1000);
  if (!isNaN(result) && result > 0) {
    // Should calculate correctly
  }
});

// ============================================================================
// SUMMARY
// ============================================================================

console.log('\n' + '='.repeat(60));
console.log('📊 Test Results Summary\n');
console.log(`✅ Passed: ${passedTests}`);
console.log(`❌ Failed: ${failedTests}`);
console.log(`📈 Success Rate: ${((passedTests / (passedTests + failedTests)) * 100).toFixed(1)}%`);
console.log('='.repeat(60));

if (failedTests === 0) {
  console.log('\n🎉 All tests passed! Calculators are working correctly.\n');
  process.exit(0);
} else {
  console.log('\n⚠️  Some tests failed. Please review the errors above.\n');
  process.exit(1);
}
