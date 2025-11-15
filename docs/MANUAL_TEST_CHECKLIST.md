# Quick Visual Test Checklist

**Date**: November 14, 2025  
**Tester**: _______________

Use this checklist to manually verify all features are working in the browser.

---

## 🌐 Browser Testing

Open http://localhost:3000 in your browser.

### Initial Load
- [ ] Page loads without errors (check browser console - F12)
- [ ] Dark theme applied correctly
- [ ] Sidebar visible on left side
- [ ] Welcome message appears on home page

---

## 🧭 Navigation Test

Click through each page in the sidebar:

### Calculator Pages
- [ ] **Home** - Welcome page displays
- [ ] **Basic Checks** - Klipper config checker loads
- [ ] **Extruder Rotation** - ⭐ Enhanced wizard page loads
- [ ] **Belt Rotation** - GT2/GT3 calculator loads
- [ ] **Lead Screw** - Z-axis calculator loads
- [ ] **Run Current** - TMC current calculator loads
- [ ] **Probe Offset** - XY offset calculator loads
- [ ] **Flow Wall** - Wall thickness method loads
- [ ] **Orca Flow** - OrcaSlicer flow loads
- [ ] **Pressure Advance** - PA calculator loads
- [ ] **Volumetric Orca** - OrcaSlicer volumetric loads
- [ ] **Volumetric Ellis** - Ellis method loads
- [ ] **Max Speed** - Speed calculator loads
- [ ] **Input Shaping** - Resonance calculator loads
- [ ] **Line Widths** - Width recommendations load
- [ ] **Extrusion Smoothing** - ERS calculator loads

### Settings Pages
- [ ] **Profiles** - Profile management page loads

---

## 🎨 Enhanced Extruder Calibration Test

Navigate to **Extruder Rotation** page:

### Step 1: Extruder Type Selection
- [ ] Three cards visible: Direct Drive ⚡, Bowden 🔗, Dual Drive ⚙️
- [ ] Click each type - cyan border appears on selection
- [ ] Info box updates with type-specific information
- [ ] Measurement tip changes based on type

### Step 2: Method Selection
- [ ] Two method cards: E-Steps and Physical Measurement
- [ ] Click each - yellow border appears on selection
- [ ] Time estimates shown (~1 min vs ~5-10 min)

### Step 3: E-Steps Method
- [ ] Select "E-Steps" method
- [ ] Calculator card appears with inputs
- [ ] Change stepper type dropdown (200/400 steps)
- [ ] Enter microsteps value (e.g., 16)
- [ ] Enter e-steps value (e.g., 400)
- [ ] Result calculates automatically
- [ ] Result shows in green with "mm" unit
- [ ] Formula explanation visible
- [ ] Command block appears with printer.cfg command
- [ ] Copy button works (copies to clipboard)

### Step 4: Physical Measurement Wizard
- [ ] Select "Physical Measurement" method
- [ ] Wizard card appears with 6-step progress indicator

#### Wizard Progress Bar
- [ ] 6 numbered circles visible
- [ ] Current step highlighted in cyan
- [ ] Other steps gray
- [ ] Connecting lines between circles
- [ ] Step title and description shown below

#### Step 0: Preparation
- [ ] Tool checklist visible (marker, ruler, scissors, console)
- [ ] Preparation steps listed (1-5)
- [ ] Extruder-specific warning shown (changes with type)
- [ ] "I'm Ready" button enabled
- [ ] Click button - advances to step 1

#### Step 1: Mark Filament
- [ ] Instructions visible (1-4 steps)
- [ ] ASCII diagram showing measurement
- [ ] Input field for initial mark (default 120mm)
- [ ] Tip about using 120mm shown
- [ ] "Back" button works (returns to step 0)
- [ ] "Next" button disabled until value entered
- [ ] Enter value - button enables
- [ ] Click next - advances to step 2

#### Step 2: Input Previous Value
- [ ] Info box explains where to find rotation_distance
- [ ] Input field for current rotation distance
- [ ] Preset buttons visible (4 buttons)
- [ ] Preset values change based on extruder type:
  - Direct/Bowden: Generic, Voron M4, Ender 3, Prusa MK3
  - Dual Drive: BMG, Orbiter 2.0, Sherpa Mini, LGX Lite
- [ ] Click preset - populates input field
- [ ] "Back" and "Next" buttons work correctly
- [ ] Next disabled until value entered

#### Step 3: Extrude Filament
- [ ] Safety warning visible (temperature check)
- [ ] Console command instructions (M83, G1 E100 F60)
- [ ] Input field for requested extrude amount
- [ ] Default 100mm shown
- [ ] Pro tip about F60 speed visible
- [ ] Navigation buttons work

#### Step 4: Measure Result
- [ ] Instructions for final measurement
- [ ] Input field for final mark distance
- [ ] "Actual Extruded Distance" result calculates
- [ ] "New Rotation Distance" result calculates
- [ ] Accuracy percentage shown (e.g., "99.5%")
- [ ] Status message shown ("Excellent!", "Good", etc.)
- [ ] Border color matches status (green/yellow/red)
- [ ] Command block shows updated printer.cfg entry
- [ ] Command includes previous value and date as comments

#### Step 5: Completion
- [ ] Green success box with checkmark
- [ ] New rotation distance highlighted in yellow
- [ ] "What to do next" checklist (1-5 steps)
- [ ] "Should I test again?" info box
- [ ] Troubleshooting section with 4+ common issues
- [ ] "Start Over" button resets wizard to step 0
- [ ] "Next: Flow Calibration" link goes to #flow-wall

### References Section
- [ ] "References & Additional Information" card visible
- [ ] External links work:
  - [ ] Klipper Rotation Distance docs
  - [ ] Ellis3DP guide
  - [ ] TeachingTech guide
- [ ] Pro tips list visible (6 items)

---

## 📊 Calculator Function Tests

Test a few calculators to ensure calculations work:

### Extruder Rotation (E-Steps)
- [ ] Input: 200 steps, 16 microsteps, 400 e-steps
- [ ] Expected result: 8.000 mm
- [ ] Actual result: ___________

### Belt Rotation
- [ ] Input: 2mm pitch, 20 teeth, 200 steps, 16 microsteps
- [ ] Expected result: 40 mm
- [ ] Actual result: ___________

### Run Current (RMS)
- [ ] Input: 1.5A peak current
- [ ] Expected result: ~1.061A RMS
- [ ] Actual result: ___________

### Flow Wall
- [ ] Input: 100% current, 1.2mm target, 1.15mm measured
- [ ] Expected result: ~95.8%
- [ ] Actual result: ___________

---

## 🗂️ Profile System Tests

Navigate to **Profiles** page:

### Initial State
- [ ] Profile selector dropdown visible
- [ ] Default profile exists (Profile 1)
- [ ] Two grid sections: Printers and Filaments
- [ ] "Add Printer" and "Add Filament" buttons visible
- [ ] Import/Export buttons visible

### Create New Profile
- [ ] Click "+ New Profile" button
- [ ] New profile appears in dropdown
- [ ] Select new profile from dropdown
- [ ] Empty printer/filament grids shown

### Add Printer
- [ ] Click "Add Printer" button
- [ ] Dialog opens with form
- [ ] Fill in basic info:
  - [ ] Name (e.g., "Voron 2.4")
  - [ ] Type dropdown (Cartesian/CoreXY/Delta)
  - [ ] Firmware dropdown (Klipper/Marlin/etc.)
- [ ] Fill in build volume (X, Y, Z)
- [ ] Fill in extruder settings
- [ ] Fill in motion settings
- [ ] Toggle hardware flags (probe, TMC, input shaping)
- [ ] Click "Save"
- [ ] Dialog closes
- [ ] New printer card appears in grid
- [ ] Card shows name, type, build volume

### Edit Printer
- [ ] Click "Edit" button on printer card
- [ ] Dialog opens with existing values populated
- [ ] Change name
- [ ] Click "Save"
- [ ] Card updates with new name

### Set Active Printer
- [ ] Click printer card (not edit button)
- [ ] Card gets cyan border
- [ ] Other printer cards lose active state

### Delete Printer
- [ ] Click "Delete" button on printer card
- [ ] Card removed from grid

### Add Filament
- [ ] Click "Add Filament" button
- [ ] Dialog opens
- [ ] Fill in basic info:
  - [ ] Name (e.g., "eSun PLA+ Red")
  - [ ] Material dropdown (PLA/PETG/ABS/etc.)
  - [ ] Brand
  - [ ] Color
- [ ] Fill in temperatures
- [ ] Fill in print settings
- [ ] Fill in retraction settings
- [ ] Click "Save"
- [ ] New filament card appears

### Edit Filament
- [ ] Click "Edit" on filament card
- [ ] Dialog opens with values
- [ ] Modify values
- [ ] Save works

### Set Active Filament
- [ ] Click filament card
- [ ] Gets green border
- [ ] Only one active at a time

### Delete Filament
- [ ] Delete button removes filament

### Import/Export
- [ ] Click "Export Profile"
- [ ] JSON file downloads with timestamp
- [ ] Open file - verify valid JSON
- [ ] Click "Import Profile"
- [ ] Select downloaded JSON file
- [ ] Profile imports successfully
- [ ] All printers and filaments restored

### Active Configuration Summary
- [ ] Summary panel shows active printer name
- [ ] Shows active filament name
- [ ] Updates when selections change

---

## 📱 Responsive Design Test

### Desktop View (>1024px)
- [ ] Sidebar always visible
- [ ] Grid layouts show 2-3 columns
- [ ] Forms use side-by-side layout

### Tablet View (768px - 1024px)
- [ ] Sidebar collapsible (if implemented)
- [ ] Grid layouts show 2 columns
- [ ] Forms start stacking

### Mobile View (<768px)
- [ ] Sidebar becomes hamburger menu (if implemented)
- [ ] Grid layouts single column
- [ ] All forms vertical
- [ ] Touch targets large enough

**Test Method**: Use browser dev tools (F12) and toggle device toolbar

---

## ♿ Accessibility Test

### Keyboard Navigation
- [ ] Press Tab - focus moves logically through page
- [ ] Focus indicator visible (yellow ring)
- [ ] All interactive elements reachable
- [ ] Enter key activates buttons
- [ ] Arrow keys work in number inputs

### Screen Reader (Optional)
- [ ] Turn on screen reader (VoiceOver on Mac, NVDA on Windows)
- [ ] Labels read correctly
- [ ] Form fields announced properly
- [ ] Button purposes clear

---

## 🔍 Console Error Check

Open browser console (F12 → Console tab):

- [ ] No red errors on initial load
- [ ] No errors when navigating between pages
- [ ] No errors when using calculators
- [ ] No errors when using profile system
- [ ] No warnings about missing dependencies

---

## 💾 Data Persistence Test

### localStorage Test
- [ ] Enter values in a calculator
- [ ] Navigate to different page
- [ ] Return to original calculator
- [ ] Values still present

### Profile Persistence
- [ ] Add a printer profile
- [ ] Close browser tab completely
- [ ] Reopen http://localhost:3000
- [ ] Navigate to Profiles page
- [ ] Printer profile still exists

---

## 🎯 Final Checks

- [ ] All calculator results are reasonable (no NaN, Infinity, or 0 for valid inputs)
- [ ] Copy-to-clipboard buttons work (paste in notepad to verify)
- [ ] All external links open in new tabs
- [ ] No broken images or missing icons
- [ ] Dark theme consistent throughout
- [ ] Text readable (good contrast)
- [ ] No horizontal scrolling on any page
- [ ] Buttons respond to hover states

---

## 📝 Notes Section

Record any issues found:

**Issues Found:**
```
[Write any problems discovered here]
```

**Browser Used:**
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

**Screen Size:** ___________

**Operating System:** ___________

---

## ✅ Sign-Off

- [ ] All critical features working
- [ ] No blocking bugs found
- [ ] Ready for production deployment

**Tester Signature:** _______________  
**Date:** _______________  
**Overall Status:** ⭐⭐⭐⭐⭐

---

## 🚀 Deployment Checklist

If all tests pass:

- [ ] Run production build: `npm run build`
- [ ] Verify dist/ folder created
- [ ] Test production build locally: `npm run preview`
- [ ] Deploy to Vercel: `vercel --prod`
- [ ] Test deployed site
- [ ] Share URL with users

**Production URL:** _______________
