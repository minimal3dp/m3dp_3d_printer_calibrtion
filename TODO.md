# M3DP 3D Printer Calibration Suite - Development TODO

**Project Vision**: Create a comprehensive, web-based 3D printer and slicer calibration suite focused on Klipper firmware and OrcaSlicer, consolidating calibration knowledge from Ellis3DP, OrcaSlicer Wiki, TeachingTech, and community best practices.

---

## Incomplete Tasks

### Phase 2: Core Calculator Implementation

#### 2.4 Volumetric Flow Rate
- [ ] Add CNC Kitchen flow rate test method
- [ ] Create hotend comparison database
- [ ] Calculate recommended speeds for different materials
- [ ] Generate speed limit tables for slicers

#### 2.5 Speed & Acceleration
- [ ] Implement junction deviation calculator
- [ ] Create square corner velocity (SCV) calculator
- [ ] Add acceleration limit recommendations per filament type

#### 2.6 Input Shaping & Resonance
- [ ] Add ADXL345 accelerometer data upload/analysis
- [ ] Implement Marlin/RepRapFirmware input shaping calculators
- [ ] Create VFA (Vertical Fine Artifacts) speed test calculator
- [ ] Add belt tension recommendations

#### 2.7 Temperature Calibration
- [ ] Material temperature database (community-contributed)
- [ ] Bed temperature calibration for adhesion

#### 2.8 Retraction Tuning
- [ ] Retraction tower calculator
- [ ] Z-hop calculator
- [ ] Firmware retraction vs slicer retraction comparison
- [ ] Wipe distance calculator
- [ ] Retraction speed optimizer

#### 2.9 Hardware Calibration
- [ ] Z-offset calibration wizard
- [ ] First layer calibration (live adjust guide)
- [ ] Bed leveling mesh visualization
- [ ] Stepper motor direction verification
- [ ] Endstop testing guide

#### 2.10 Advanced Tuning
- [ ] Minimum layer time calculator
- [ ] Fan speed curve calculator
- [ ] Infill/wall overlap optimizer
- [ ] Seam position optimizer
- [ ] Arc fitting (G2/G3) calibration

### Phase 3: OrcaSlicer Integration

#### 3.1 OrcaSlicer-Specific Features
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

#### 3.2 Profile Management
- [ ] Printer profile templates (Voron, Ender, Prusa, etc.)
- [ ] Filament profile templates
- [ ] Process profile templates
- [ ] Export to OrcaSlicer JSON format
- [ ] Share profiles via URL/QR code

### Phase 4: Klipper Integration

#### 4.1 Klipper Configuration Tools
- [ ] printer.cfg validator
- [ ] Macro generator for calibration tests
- [ ] SAVE_CONFIG helper (shows what to add)
- [ ] Klipper gcode command reference

#### 4.2 Klipper-Specific Calculators
- [ ] Resonance testing with ADXL345 data
- [ ] Bed mesh visualization
- [ ] TMC tuning (stallguard, coolstep, spreadcycle vs stealthchop)
- [ ] Multi-MCU configuration helper
- [ ] Klipper upgrade checker

#### 4.3 Mainsail/Fluidd Integration
- [ ] API for live printer data
- [ ] Auto-populate fields from printer status
- [ ] Send calibration gcodes directly to printer
- [ ] Save results to Klipper variables

### Phase 5: Educational Content & Documentation

#### 5.1 Learning Modules
- [ ] Beginner's guide to 3D printer calibration
- [ ] Calibration order flowchart (what to do first)
- [ ] Understanding calibration theory
- [ ] Common calibration mistakes
- [ ] Video tutorials (embed YouTube)

#### 5.2 Reference Documentation
- [ ] Comprehensive glossary
- [ ] Scientific references and journal articles
- [ ] Link collection to community resources
- [ ] Comparison of calibration methods
- [ ] Firmware-specific guides (Klipper, Marlin, RRF)

#### 5.3 Troubleshooting Guides
- [ ] Print defects identification tool
- [ ] Calibration issues and solutions
- [ ] When to re-calibrate
- [ ] Hardware upgrade impact on calibration

### Phase 6: Advanced Features

#### 6.1 Community Features
- [ ] User-submitted calibration profiles
- [ ] Community material database
- [ ] Print quality photo uploads for comparison
- [ ] Discussion forum integration
- [ ] Calibration achievement badges

#### 6.2 Data & Analytics
- [ ] Save calibration history
- [ ] Track calibration changes over time
- [ ] Material degradation tracking
- [ ] Printer maintenance scheduler
- [ ] Statistical analysis of community data

#### 6.3 AI/ML Features (Future)
- [ ] AI-powered print defect detection from photos
- [ ] Calibration recommendation engine
- [ ] Predictive maintenance alerts
- [ ] Optimal settings suggestions based on similar setups

### Phase 7: Testing & Quality Assurance

#### 7.1 Testing
- [ ] Unit tests for all calculators
- [ ] Integration tests for user workflows
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile responsiveness testing
- [ ] Accessibility testing (WCAG 2.1)

#### 7.2 Validation
- [ ] Verify calculator formulas against references
- [ ] Real-world testing on multiple printer types
- [ ] Community beta testing
- [ ] Expert review (Ellis, TeachingTech, etc.)

### Phase 8: Deployment & Infrastructure

#### 8.1 Hosting & Performance
- [ ] Choose hosting platform (Netlify, Vercel, GitHub Pages, etc.)
- [ ] Set up CI/CD pipeline
- [ ] Configure CDN for assets
- [ ] Implement caching strategy
- [ ] Add analytics (privacy-focused)

#### 8.2 SEO & Discoverability
- [ ] Optimize meta tags and structured data
- [ ] Create sitemap
- [ ] Submit to search engines
- [ ] Create social media presence
- [ ] Write blog posts for key calibrations

### Technical Debt & Cleanup Tasks

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

### Immediate Next Steps
- [ ] Create project architecture diagram
- [ ] Reach out to Ellis3DP/TeachingTech for collaboration

### Remaining Tasks (Phase 2+)
- [ ] Material temperature database (community-contributed)
- [ ] Bed temperature calibration for adhesion
- [ ] Retraction tower calculator
- [ ] Z-hop calculator
- [ ] Firmware retraction vs slicer retraction comparison
- [ ] Wipe distance calculator
- [ ] Retraction speed optimizer
- [ ] Integrate profile data with calculators (auto-populate from active printer/filament)

---

## Completed Tasks

### Phase 1: Project Foundation & Architecture
- [x] **Decision**: Choose between pure HTML/JS or Python web framework (Vue 3 + Vite + TypeScript)
- [x] Set up development environment and build tooling
- [x] Create project structure
- [x] Configure uv for Python dependencies (deferred)
- [x] Evaluate current Tailwind CSS implementation
- [x] Create design system documentation
- [x] Design responsive layout
- [x] Create reusable component library
- [x] Design calculator data structure schema
- [x] Implement state management (Pinia store with localStorage persistence)
- [x] Create import/export functionality for calibration profiles
- [x] Design user profile system

### Phase 2: Core Calculator Implementation
- [x] Extruder Calibration Suite
- [x] Flow Calibration Suite
- [x] Pressure Advance / Linear Advance
- [x] Volumetric Flow Rate (OrcaSlicer & Ellis methods)
- [x] Speed & Acceleration (Max Speed & Acceleration Tower)
- [x] Input Shaping & Resonance (Ringing Tower)
- [x] Temperature Calibration (TeachingTech & Ellis methods, PID tuning)
- [x] Hardware Calibration (Lead Screw, Belt, Probe Offset, Skew, Run Current)
- [x] Advanced Tuning (ERS, Line Widths)

### Phase 3: OrcaSlicer Integration
- [x] OrcaSlicer Settings Recommendations

### Phase 4: Klipper Integration
- [x] Basic Configuration Checks

### Milestone 1: MVP (Minimum Viable Product)
- [x] Consolidated single-page app with all current calculators (22 calculators in Vue 3)
- [x] Clean, responsive UI
- [x] Local storage for saving values
- [x] Basic documentation for each calculator
- [x] Deployed to production URL

### Immediate Next Steps
- [x] Complete project review and TODO creation
- [x] Decide on technology stack
- [x] Set up development environment and tooling
- [x] Design component library mockups
- [x] Extract formulas from Excel spreadsheet
- [x] Begin MVP development
- [x] Set up version control best practices
- [x] Create development roadmap timeline

---
**Last Updated**: 2025-11-14
**Maintainer**: Mike Wilson (@minimal3dp)
**Status**: ✅ MVP Complete - Phase 2 Ready to Begin
