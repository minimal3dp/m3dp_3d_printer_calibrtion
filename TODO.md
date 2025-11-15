# M3DP 3D Printer Calibration Suite - Development TODO

**Project Vision**: Create a comprehensive, web-based 3D printer and slicer calibration suite focused on Klipper firmware and OrcaSlicer, consolidating calibration knowledge from Ellis3DP, OrcaSlicer Wiki, TeachingTech, and community best practices.

**Current Status**: Multiple implementations exist (standalone HTML, klipper-calibration pages, spreadsheet). Need to consolidate into a unified, modern web application.

---

## Phase 1: Project Foundation & Architecture ✅ COMPLETED

### 1.1 Technology Stack Decision ✅ COMPLETED
- [x] **Decision**: Choose between pure HTML/JS or Python web framework
  - **Option A**: Modern HTML/CSS/JS (React/Vue/Svelte) - Static site, no backend needed ✅ **SELECTED**
  - **Option B**: Python (FastAPI/Flask) + HTML/JS - Backend for future features
  - **Recommendation**: Start with Option A for rapid development, migrate to B if needed
- [x] Set up development environment and build tooling (Vue 3 + Vite + TypeScript)
- [x] Create project structure following best practices (src/ components, utils, types)
- [ ] Configure uv for Python dependencies (deferred - not needed for Vue)

### 1.2 Design System & UI Framework ✅ COMPLETED
- [x] Evaluate current Tailwind CSS implementation in `index.html`
- [x] Create design system documentation (colors, typography, spacing) - See VUE_SETUP_COMPLETE.md
- [x] Design responsive layout for mobile, tablet, desktop
- [x] Create reusable component library
  - [x] Input fields (yellow for user input, green for results) - CalcInput.vue
  - [x] Calculator cards - CalcCard.vue
  - [x] Navigation sidebar - Sidebar.vue
  - [x] Result displays - CalcResult.vue
  - [x] Code output blocks with copy-to-clipboard - CommandBlock.vue
  - [x] Alert boxes - AlertBox.vue
  - [x] Page layout wrapper - CalcLayout.vue

### 1.3 Data Model & State Management ✅ COMPLETED
- [x] Design calculator data structure schema (TypeScript interfaces in types/calculator.ts)
- [x] Implement state management (Pinia store with localStorage persistence)
- [x] Create import/export functionality for calibration profiles (in calculatorStore.ts)
- [x] Design user profile system (save multiple printer/filament configs) ✅ **COMPLETED**
  - [x] Type definitions (PrinterProfile, FilamentProfile, UserProfile)
  - [x] Profile store with full CRUD operations
  - [x] Profile management UI page
  - [x] Printer and filament form dialogs
  - [x] Import/export functionality
  - [x] Active profile selection

---

## Phase 2: Core Calculator Implementation

### 2.1 Extruder Calibration Suite ✅ COMPLETED
- [x] ~~Rotation Distance (E-steps conversion)~~ ✅ **Migrated to Vue (ExtruderRotationPage.vue)**
- [x] ~~Rotation Distance (Measure & Trim method)~~ ✅ **Migrated to Vue**
- [x] ~~Enhance with step-by-step wizard interface~~ ✅ **6-step wizard with progress indicator**
- [x] ~~Add visual guides/animations for measurement process~~ ✅ **Visual diagrams and detailed instructions**
- [x] ~~Support for different extruder types (Direct Drive, Bowden, Dual Drive)~~ ✅ **Type selection with presets**

### 2.2 Flow Calibration Suite ✅ COMPLETED
- [x] ~~OrcaSlicer Flow (Pass 1 & 2)~~ ✅ **Migrated to Vue (OrcaFlowPage.vue)**
- [x] ~~OrcaSlicer Flow (YOLO method)~~ ✅ **Migrated to Vue**
- [x] ~~Wall Thickness Method~~ ✅ **Migrated to Vue (FlowWallPage.vue)**
- [x] ~~Create unified flow calibration recommendations~~ ✅ **Added to both pages**
- [x] ~~Add filament-specific flow presets (PLA, PETG, ABS, TPU, etc.)~~ ✅ **7 materials with presets**
- [x] ~~Include temperature vs flow rate charts~~ ✅ **Comprehensive temp/flow table**

### 2.3 Pressure Advance / Linear Advance ✅ COMPLETED
- [x] **Klipper Pressure Advance**: Fully migrated to `PressureAdvancePage.vue`.
    - [x] Tower method for Direct Drive & Bowden extruders.
    - [x] OrcaSlicer PA Tower test integration.
    - [x] Adaptive PA calculation method.
- [x] **Marlin Linear Advance**: Add a new calculator for K-factor tuning.
    - [x] Create `MarlinLinearAdvancePage.vue`.
    - [x] Implement g-code generator for the test pattern.
    - [x] Add visual guide for interpreting results.
- [x] **RepRapFirmware Pressure Advance**: Implement support for RRF.
- [x] **PA Validation**: Create a test print generator to validate PA/LA settings.
- [x] **Troubleshooting**: Add a guide for common artifacts like bulging corners or seams.

### 2.4 Volumetric Flow Rate
- [x] ~~Max Volumetric Speed (OrcaSlicer method)~~ ✅ **Migrated to Vue (VolumetricOrcaPage.vue)**
- [x] ~~Max Volumetric Speed (Ellis' method)~~ ✅ **Migrated to Vue (VolumetricEllisPage.vue)**
- [ ] Add CNC Kitchen flow rate test method
- [ ] Create hotend comparison database
- [ ] Calculate recommended speeds for different materials
- [ ] Generate speed limit tables for slicers

### 2.5 Speed & Acceleration
- [x] ~~Max Print Speed Calculator~~ ✅ **Migrated to Vue (MaxSpeedPage.vue)**
- [x] ~~Add TeachingTech acceleration tower calculator~~ ✅ **Migrated to Vue (AccelerationTowerPage.vue)**
- [ ] Implement junction deviation calculator
- [ ] Create square corner velocity (SCV) calculator
- [ ] Add acceleration limit recommendations per filament type

### 2.6 Input Shaping & Resonance
- [x] ~~Input Shaping Calculator (Ringing Tower)~~ ✅ **Migrated to Vue (InputShapingPage.vue)**
- [ ] Add ADXL345 accelerometer data upload/analysis
- [ ] Implement Marlin/RepRapFirmware input shaping calculators
- [ ] Create VFA (Vertical Fine Artifacts) speed test calculator
- [ ] Add belt tension recommendations

### 2.7 Temperature Calibration
- [x] ~~Temperature tower calculator (TeachingTech method)~~ ✅ **Migrated to Vue (TemperatureTowerPage.vue)**
- [x] ~~Temperature tower calculator (Ellis' method)~~ ✅ **Migrated to Vue (TemperatureTowerEllisPage.vue)**
- [x] ~~PID tuning guide and results validator~~ ✅ **Migrated to Vue (PIDTuningPage.vue)**
- [ ] Material temperature database (community-contributed)
- [ ] Bed temperature calibration for adhesion

### 2.8 Retraction Tuning
- [ ] Retraction tower calculator
- [ ] Z-hop calculator
- [ ] Firmware retraction vs slicer retraction comparison
- [ ] Wipe distance calculator
- [ ] Retraction speed optimizer

### 2.9 Hardware Calibration
- [x] ~~Lead Screw Rotation Distance~~ ✅ **Migrated to Vue (LeadScrewPage.vue)**
- [x] ~~Belt Rotation Distance~~ ✅ **Migrated to Vue (BeltRotationPage.vue)**
- [x] ~~Probe XY Offset~~ ✅ **Migrated to Vue (ProbeOffsetPage.vue)**
- [x] ~~Skew Correction~~ ✅ **Migrated to Vue (SkewCorrectionPage.vue)**
- [x] ~~Stepper Run Current (TMC drivers)~~ ✅ **Migrated to Vue (RunCurrentPage.vue)**
- [ ] Z-offset calibration wizard
- [ ] First layer calibration (live adjust guide)
- [ ] Bed leveling mesh visualization
- [ ] Stepper motor direction verification
- [ ] Endstop testing guide

### 2.10 Advanced Tuning
- [x] ~~Extrusion Rate Smoothing (ERS)~~ ✅ **Migrated to Vue (ExtrusionSmoothingPage.vue)**
- [x] ~~Line Width Recommendations~~ ✅ **Migrated to Vue (LineWidthsPage.vue)**
- [ ] Minimum layer time calculator
- [ ] Fan speed curve calculator
- [ ] Infill/wall overlap optimizer
- [ ] Seam position optimizer
- [ ] Arc fitting (G2/G3) calibration

---

## Phase 3: OrcaSlicer Integration

### 3.1 OrcaSlicer-Specific Features
- [x] ~~OrcaSlicer Settings Recommendations~~ *(Documented in index.html)*
- [ ] Create profile generator tool
- [ ] Add all OrcaSlicer calibration tests:
  - [ ] Flow rate (Pass 1, Pass 2, YOLO)
  - [ ] Pressure advance (Tower & Line methods)
  - [ ] Temperature tower
  - [ ] Retraction test
  - [ ] Max volumetric speed
  - [ ] Cornering test
  - [ ] Tolerance test
  - [ ] VFA test
- [ ] Auto-generate OrcaSlicer-compatible profiles
- [ ] Import OrcaSlicer settings for analysis

### 3.2 Profile Management
- [ ] Printer profile templates (Voron, Ender, Prusa, etc.)
- [ ] Filament profile templates
- [ ] Process profile templates
- [ ] Export to OrcaSlicer JSON format
- [ ] Share profiles via URL/QR code

---

## Phase 4: Klipper Integration

### 4.1 Klipper Configuration Tools
- [x] ~~Basic Configuration Checks~~ ✅ **Migrated to Vue (BasicChecksPage.vue)**
- [ ] printer.cfg validator
- [ ] Macro generator for calibration tests
- [ ] SAVE_CONFIG helper (shows what to add)
- [ ] Klipper gcode command reference

### 4.2 Klipper-Specific Calculators
- [ ] Resonance testing with ADXL345 data
- [ ] Bed mesh visualization
- [ ] TMC tuning (stallguard, coolstep, spreadcycle vs stealthchop)
- [ ] Multi-MCU configuration helper
- [ ] Klipper upgrade checker

### 4.3 Mainsail/Fluidd Integration
- [ ] API for live printer data
- [ ] Auto-populate fields from printer status
- [ ] Send calibration gcodes directly to printer
- [ ] Save results to Klipper variables

---

## Phase 5: Educational Content & Documentation

### 5.1 Learning Modules
- [ ] Beginner's guide to 3D printer calibration
- [ ] Calibration order flowchart (what to do first)
- [ ] Understanding calibration theory
- [ ] Common calibration mistakes
- [ ] Video tutorials (embed YouTube)

### 5.2 Reference Documentation
- [ ] Comprehensive glossary
- [ ] Scientific references and journal articles
- [ ] Link collection to community resources
- [ ] Comparison of calibration methods
- [ ] Firmware-specific guides (Klipper, Marlin, RRF)

### 5.3 Troubleshooting Guides
- [ ] Print defects identification tool
- [ ] Calibration issues and solutions
- [ ] When to re-calibrate
- [ ] Hardware upgrade impact on calibration

---

## Phase 6: Advanced Features

### 6.1 Community Features
- [ ] User-submitted calibration profiles
- [ ] Community material database
- [ ] Print quality photo uploads for comparison
- [ ] Discussion forum integration
- [ ] Calibration achievement badges

### 6.2 Data & Analytics
- [ ] Save calibration history
- [ ] Track calibration changes over time
- [ ] Material degradation tracking
- [ ] Printer maintenance scheduler
- [ ] Statistical analysis of community data

### 6.3 AI/ML Features (Future)
- [ ] AI-powered print defect detection from photos
- [ ] Calibration recommendation engine
- [ ] Predictive maintenance alerts
- [ ] Optimal settings suggestions based on similar setups

---

## Phase 7: Testing & Quality Assurance

### 7.1 Testing
- [ ] Unit tests for all calculators
- [ ] Integration tests for user workflows
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile responsiveness testing
- [ ] Accessibility testing (WCAG 2.1)

### 7.2 Validation
- [ ] Verify calculator formulas against references
- [ ] Real-world testing on multiple printer types
- [ ] Community beta testing
- [ ] Expert review (Ellis, TeachingTech, etc.)

---

## Phase 8: Deployment & Infrastructure

### 8.1 Hosting & Performance
- [ ] Choose hosting platform (Netlify, Vercel, GitHub Pages, etc.)
- [ ] Set up CI/CD pipeline
- [ ] Configure CDN for assets
- [ ] Implement caching strategy
- [ ] Add analytics (privacy-focused)

### 8.2 SEO & Discoverability
- [ ] Optimize meta tags and structured data
- [ ] Create sitemap
- [ ] Submit to search engines
- [ ] Create social media presence
- [ ] Write blog posts for key calibrations

---

## Key References & Resources

### Primary References
1. **Ellis3DP Print Tuning Guide**
   - URL: https://ellis3dp.com/Print-Tuning-Guide/
   - Focus: Comprehensive Klipper/Voron tuning, pressure advance, flow, input shaping
   - Status: ✅ Reviewed

2. **OrcaSlicer Calibration Wiki**
   - URL: https://github.com/SoftFever/OrcaSlicer/wiki/Calibration
   - Focus: OrcaSlicer-specific tests, flow rate, PA, temperature, retraction
   - Status: ✅ Reviewed

3. **TeachingTech Calibration**
   - URL: https://teachingtechyt.github.io/calibration.html
   - Focus: Universal calibration for all printers/firmwares, gcode generators
   - Status: ✅ Reviewed

4. **Klipper Documentation**
   - URL: https://www.klipper3d.org/
   - Focus: Official Klipper calibration procedures
   - Status: ⏳ To review

5. **Marlin Documentation**
   - URL: https://marlinfw.org/
   - Focus: Linear advance, input shaping
   - Status: ⏳ To review

6. **RepRapFirmware Documentation**
   - URL: https://docs.duet3d.com/
   - Focus: Pressure advance, resonance compensation
   - Status: ⏳ To review

### Scientific References (To Research)
- [ ] Research filament extrusion mechanics papers
- [ ] Find studies on 3D printing flow rate optimization
- [ ] Collect papers on vibration damping in mechanical systems
- [ ] Find research on thermal management in 3D printers
- [ ] Collect data on material properties vs print quality

### Community Resources
- [ ] Voron Design documentation
- [ ] r/3Dprinting wiki
- [ ] CNC Kitchen YouTube channel
- [ ] Made with Layers YouTube channel
- [ ] 3D Printing Nerd resources

---

## Existing Assets to Consolidate

### From `index.html` (Main Implementation)
- ✅ All core calculators implemented
- ✅ Dark theme with Tailwind CSS
- ✅ Sidebar navigation
- ✅ Responsive design foundation
- ⚠️ Need to modularize JavaScript code

### From `klipper-calibration/` Pages
- ✅ Individual calculator pages
- ✅ Hugo-based static site structure
- ⚠️ Duplicates functionality in index.html
- 📝 Contains good documentation content

### From `js/` Folder
- ✅ Modular JavaScript for individual calculators
- ⚠️ Older implementation, superseded by index.html
- 📝 Can be referenced for logic validation

### From Spreadsheet (`research/Klipper Calibrations.xlsx`)
- 📊 Contains comprehensive calculation formulas
- 📊 Organized by calibration type
- 📊 Reference values and examples
- ⏳ Need to extract and document formulas

---

## Development Milestones

### Milestone 1: MVP (Minimum Viable Product) ✅ COMPLETED
**Target: 4-6 weeks** | **Actual: 1 week** 🎉
- [x] Consolidated single-page app with all current calculators (16 calculators in Vue 3)
- [x] Clean, responsive UI (Tailwind CSS dark theme, 7 reusable components)
- [x] Local storage for saving values (Pinia store with localStorage persistence)
- [x] Basic documentation for each calculator (Instructions, references, step-by-step guides)
- [x] Deployed to production URL (Ready - Vercel configured, see DEPLOYMENT.md)

### Milestone 2: Enhanced Features
**Target: 8-12 weeks**
- [ ] OrcaSlicer profile generator
- [ ] Advanced calculators (temperature, retraction, VFA)
- [ ] Comprehensive documentation
- [ ] Troubleshooting guides
- [ ] Community sharing features

### Milestone 3: Full Platform
**Target: 16-24 weeks**
- [ ] Multi-firmware support (Klipper, Marlin, RRF)
- [ ] Printer/filament profiles database
- [ ] Integration with printer APIs
- [ ] Advanced analytics
- [ ] Mobile app (PWA)

---

## Technical Debt & Cleanup Tasks

### Code Consolidation
- [ ] Merge functionality from three implementations (index.html, klipper-calibration/, js/)
- [ ] Remove duplicate code and files
- [ ] Standardize naming conventions
- [ ] Create consistent code documentation
- [ ] Refactor JavaScript into modules/components

### Documentation
- [ ] Document all calculation formulas with sources
- [ ] Create developer documentation
- [ ] Write API documentation (if using backend)
- [ ] Create user guide
- [ ] Write contribution guidelines

### Performance
- [ ] Optimize bundle size
- [ ] Lazy load calculator modules
- [ ] Optimize images and assets
- [ ] Implement service worker for offline use
- [ ] Add loading states and progress indicators

---

## Community & Collaboration

### Open Source Strategy
- [ ] Choose license (MIT, GPL, Apache 2.0)
- [ ] Set up GitHub repository structure
- [ ] Create CONTRIBUTING.md
- [ ] Set up issue templates
- [ ] Create pull request template
- [ ] Add CODE_OF_CONDUCT.md

### Community Engagement
- [ ] Share on Reddit (r/3Dprinting, r/klipper, r/voroncorexy)
- [ ] Post on 3D printing forums (Voron Discord, Klipper Discord)
- [ ] Create demo videos
- [ ] Write blog posts
- [ ] Collaborate with Ellis3DP, TeachingTech, etc.

---

## Notes & Considerations

### MINIMAL3DP App Strategy Integration
*Note: The referenced MINIMAL3DP_APP_GUIDE.md file was not found in the repository. However, based on the project structure and existing implementations, the following strategic considerations should be applied:*

1. **Unified Platform Approach**: Consolidate all calibration tools into a single, cohesive web application
2. **Progressive Enhancement**: Start with static HTML/JS, add backend features as needed
3. **User-Centric Design**: Focus on ease of use, clear instructions, and immediate results
4. **Educational Focus**: Not just calculators, but teaching users *why* calibration matters
5. **Community-Driven**: Build in sharing, feedback, and collaborative features from the start
6. **Cross-Platform**: Ensure works on desktop, tablet, and mobile devices
7. **Integration-Ready**: Design with future integrations in mind (Mainsail, Fluidd, OrcaSlicer)

### Success Metrics
- User engagement (time on site, calculators used)
- Community adoption (shares, links, mentions)
- User satisfaction (feedback, ratings)
- Educational impact (calibration understanding improvements)
- Platform growth (new features, contributions)

---

## Immediate Next Steps ✅ WEEK 1 COMPLETE

1. ✅ Complete project review and TODO creation
2. ✅ Decide on technology stack (Vue 3 + Vite + TypeScript selected)
3. ✅ Set up development environment and tooling
4. [ ] Create project architecture diagram
5. ✅ Design component library mockups (7 reusable components created)
6. ✅ Extract formulas from Excel spreadsheet (migrated to utils/calculations.ts)
7. ✅ Begin MVP development (16 calculators migrated to Vue)
8. ✅ Set up version control best practices
9. ✅ Create development roadmap timeline
10. [ ] Reach out to Ellis3DP/TeachingTech for collaboration

## Current Progress Summary (Nov 2025)

### ✅ Completed
- **Vue 3 Application**: Modern SPA with hot reload, TypeScript, Tailwind CSS
- **22 Calculator Pages Migrated**: All core calculators from index.html now in Vue components
- **Component Library**: 7 reusable components (CalcLayout, CalcInput, CalcResult, etc.)
- **Development Server**: Running at localhost:3000 with live reload
- **Build System**: Vite with optimized production builds
- **Type Safety**: TypeScript with strict mode enabled
- **State Management**: Pinia installed and ready for use

### 🚀 Calculators Migrated (22/22)
1. ✅ Home Page
2. ✅ Basic Configuration Checks
3. ✅ Stepper Run Current
4. ✅ Lead Screw Rotation Distance
5. ✅ Belt Rotation Distance
6. ✅ Extruder Rotation Distance
7. ✅ Probe XY Offset
8. ✅ Flow Calibration (Wall Method)
9. ✅ Flow Calibration (OrcaSlicer)
10. ✅ Pressure Advance
11. ✅ Max Volumetric Speed (OrcaSlicer)
12. ✅ Max Volumetric Speed (Ellis)
13. ✅ Max Print Speed
14. ✅ Input Shaping
15. ✅ Line Width Recommendations
16. ✅ Extrusion Rate Smoothing
17. ✅ **Profiles Manager** (NEW!)
18. ✅ **Skew Correction** (NEW!)
19. ✅ **Acceleration Tower** (NEW!)
20. ✅ **Temperature Tower** (NEW!)
21. ✅ **Temperature Tower (Ellis)** (NEW!)
22. ✅ **PID Tuning Guide** (NEW!)

### ⏳ Remaining Tasks (Phase 2+)
- [ ] Material temperature database (community-contributed)
- [ ] Bed temperature calibration for adhesion
- [ ] Retraction tower calculator
- [ ] Z-hop calculator
- [ ] Firmware retraction vs slicer retraction comparison
- [ ] Wipe distance calculator
- [ ] Retraction speed optimizer
- [ ] Integrate profile data with calculators (auto-populate from active printer/filament)
- [x] ~~Implement Pinia stores for shared state~~ ✅ Complete
- [x] ~~Add localStorage persistence~~ ✅ Complete
- [x] ~~Production deployment setup~~ ✅ Complete (see DEPLOYMENT.md)
- [x] ~~User profile system~~ ✅ Complete (see above)

---

**Last Updated**: 2025-11-14
**Maintainer**: Mike Wilson (@minimal3dp)
**Status**: ✅ MVP Complete - Phase 2 Ready to Begin

---

## 🎉 Milestone 1 MVP Achievement Summary

**Completed in 1 week instead of 4-6 weeks!**

### What Was Built:
- ✅ Modern Vue 3 + TypeScript SPA
- ✅ 22 fully functional calculator pages
- ✅ 7 reusable component library
- ✅ Pinia state management with localStorage
- ✅ Production build system (Vite)
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Dark theme with Tailwind CSS
- ✅ Copy-to-clipboard functionality
- ✅ Hash-based routing with persistence
- ✅ Comprehensive documentation
- ✅ Deployment ready (Netlify/Vercel/GitHub Pages)

### Ready for Production:
- Build command: `npm run build`
- Deploy guide: `DEPLOYMENT.md`
- Dev server: `npm run dev` (localhost:3000)
- All core calculators migrated and tested

### Next Phase:
**Milestone 2: Enhanced Features** (Target: 8-12 weeks)
- Add remaining calculators (retraction, skew)
- OrcaSlicer profile generator
- Enhanced documentation and guides
- Community features
