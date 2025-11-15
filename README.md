# M3DP 3D Printer Calibration Suite

A comprehensive web-based calibration suite for 3D printers, with a focus on Klipper firmware and OrcaSlicer. This project consolidates calibration knowledge from Ellis3DP, OrcaSlicer Wiki, TeachingTech, and community best practices into an easy-to-use web application.

## 🎯 Project Overview

This application provides interactive calculators and guides for calibrating every aspect of your 3D printer and slicer settings:

- **Extruder Calibration**: Rotation distance, flow rate, volumetric speed
- **Motion Tuning**: Pressure advance, input shaping, acceleration
- **Hardware Setup**: Probe offsets, skew correction, stepper currents
- **Slicer Optimization**: Line widths, speeds, temperatures, retraction

## 🚀 Quick Start

### Modern Vue.js Application (Recommended)

The calibration suite is now a modern Vue 3 single-page application:

```bash
# Clone the repository
git clone https://github.com/minimal3dp/m3dp_3d_printer_calibrtion.git
cd m3dp_3d_printer_calibrtion

# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser at http://localhost:3000
```

**Features:**
- ⚡ Lightning-fast hot reload with Vite
- 🎨 Modern component-based architecture
- 📱 Fully responsive design
- 🔧 TypeScript type safety
- 🌙 Beautiful dark theme with Tailwind CSS

### Production Build

Build for production deployment:

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview

# Deploy dist/ folder to any static host
```

### Legacy Versions

Legacy implementations have been archived and are available in the `archive/` folder:
- `archive/legacy-html/` - Original standalone HTML versions
- `archive/legacy-js/` - Modular JavaScript implementations  
- `archive/legacy-hugo/` - Hugo-based static site

Note: The Vue.js version is actively maintained and recommended for the best experience.

## 📚 Documentation

All comprehensive documentation is organized in the `docs/` folder:

- **[TODO.md](TODO.md)**: Development roadmap and feature tracking
- **[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)**: Production deployment guide (Vercel, Netlify, GitHub Pages)
- **[docs/VUE_SETUP_COMPLETE.md](docs/VUE_SETUP_COMPLETE.md)**: Vue.js migration details
- **[docs/MVP_COMPLETE.md](docs/MVP_COMPLETE.md)**: Milestone 1 achievement summary
- **[docs/PROFILE_SYSTEM_COMPLETE.md](docs/PROFILE_SYSTEM_COMPLETE.md)**: User profile system documentation
- **[docs/TEST_RESULTS.md](docs/TEST_RESULTS.md)**: Comprehensive test report (133 tests)
- **[docs/MANUAL_TEST_CHECKLIST.md](docs/MANUAL_TEST_CHECKLIST.md)**: Step-by-step testing guide

**Calibration Guides**: Each calculator includes inline instructions and references

**External References**:
- [Ellis3DP Print Tuning Guide](https://ellis3dp.com/Print-Tuning-Guide/)
- [OrcaSlicer Calibration Wiki](https://github.com/SoftFever/OrcaSlicer/wiki/Calibration)
- [TeachingTech Calibration](https://teachingtechyt.github.io/calibration.html)

## 🧮 Available Calculators (17 Active)

### Profile Management
- ✅ **Printer & Filament Profiles** - Save and manage multiple printer/filament configurations
  - Create printer profiles (Voron, Ender, Prusa, custom)
  - Create filament profiles (PLA, PETG, ABS, TPU, etc.)
  - Import/export profiles as JSON
  - Set active profiles for quick reference

### Basic Setup
- ✅ **Basic Configuration Checks** - Verify your printer.cfg settings
- ✅ **Stepper Run Current** - TMC driver current optimization

### Hardware Calibration
- ✅ **Lead Screw Rotation Distance** - Z-axis calibration
- ✅ **Belt Rotation Distance** - X/Y axis calibration  
- ✅ **Extruder Rotation Distance** - E-steps calibration (2 methods)
  - 6-step interactive wizard with visual guides
  - Extruder type support (Direct Drive, Bowden, Dual Drive)
  - Smart presets (BMG, Orbiter, Voron M4, etc.)
  - Real-time accuracy calculator with feedback
- ✅ **Probe XY Offset** - Nozzle to probe offset
- ⏳ Skew Correction (Coming Soon)

### Extrusion & Flow
- ✅ **Flow Calibration (Wall Method)** - Measure actual vs expected
  - 7 material types with temp/flow presets (PLA, PETG, ABS, ASA, TPU, Nylon, PC)
  - Temperature vs flow rate comprehensive table
  - Flow difference calculator with color-coded feedback
  - Best practices and troubleshooting guides
- ✅ **Flow Calibration (OrcaSlicer)** - Pass 1, Pass 2, YOLO methods
  - Method comparison (Pass 1&2 vs YOLO)
  - Detailed step-by-step instructions
  - Visual inspection tips and best practices
  - Alternative methods documentation
- ✅ **Max Volumetric Speed (OrcaSlicer)** - Flow rate testing
- ✅ **Max Volumetric Speed (Ellis)** - Alternative method

### Motion Tuning
- ✅ **Pressure Advance** - Klipper PA calculator with multiple methods
  - Tower method (Direct Drive & Bowden)
  - OrcaSlicer PA Tower integration
  - Adaptive PA calculator
- ✅ **Input Shaping** - Ringing tower method
- ✅ **Max Print Speed** - Calculate theoretical max speeds

### Slicer Optimization
- ✅ **Line Width Recommendations** - Optimal line widths for your nozzle
- ✅ **Extrusion Rate Smoothing** - ERS calculator for Klipper

### Coming Soon (Phase 2)
- ⏳ Skew Correction (Section 2.9 - Hardware)
- ⏳ Temperature Towers (TeachingTech & Ellis methods)
- ⏳ Retraction Tuning (Tower calculator)
- ⏳ Marlin Linear Advance (K-factor)
- ⏳ CNC Kitchen Flow Rate Test
- ⏳ Acceleration Tower Calculator

## 🛠️ Technology Stack

**Current Implementation (Vue.js)**:
- **Vue 3.4** - Composition API with `<script setup>`
- **TypeScript 5.3** - Strict type checking
- **Vite 5.0** - Ultra-fast dev server and build tool
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Pinia 2.1** - State management (ready for use)
- **Phosphor Icons** - Beautiful icon set

**Development Tools**:
- ESLint - Code quality
- Prettier - Code formatting
- PostCSS - CSS processing
- TypeScript - Type safety

**Legacy Version**:
- Pure HTML/CSS/JavaScript (index.html)
- Tailwind CSS via CDN
- No build step required

**Future Considerations**:
- Progressive Web App (PWA) for offline use
- Backend API for profile sharing (optional)
- Mobile app version

## 📁 Project Structure

```
m3dp_3d_printer_calibrtion/
├── src/                           # Vue.js application source
│   ├── main.ts                    # Application entry point
│   ├── App.vue                    # Root component with routing
│   ├── components/                # Reusable components
│   │   ├── Sidebar.vue            # Navigation sidebar
│   │   ├── CalcLayout.vue         # Page layout wrapper
│   │   ├── CalcCard.vue           # Section card component
│   │   ├── CalcInput.vue          # Input field component
│   │   ├── CalcResult.vue         # Result display component
│   │   ├── AlertBox.vue           # Alert/info boxes
│   │   ├── CommandBlock.vue       # Code block with copy
│   │   ├── PrinterFormDialog.vue  # Printer profile form
│   │   ├── FilamentFormDialog.vue # Filament profile form
│   │   └── pages/                 # Calculator pages (17 pages)
│   │       ├── HomePage.vue
│   │       ├── ProfilesPage.vue   # Profile management
│   │       ├── BasicChecksPage.vue
│   │       ├── ExtruderRotationPage.vue
│   │       ├── FlowWallPage.vue
│   │       ├── OrcaFlowPage.vue
│   │       └── ... (14 more pages)
│   ├── composables/
│   │   └── usePersistedCalculator.ts  # Calculator state persistence
│   ├── stores/
│   │   ├── calculatorStore.ts     # Calculator state management
│   │   └── profileStore.ts        # User profiles (printers/filaments)
│   ├── types/
│   │   ├── calculator.ts          # TypeScript interfaces
│   │   └── profiles.ts            # Profile type definitions
│   ├── utils/
│   │   └── calculations.ts        # Pure calculation functions (100+ functions)
│   └── assets/
│       └── styles/
│           └── main.css           # Tailwind + custom styles
│
├── docs/                          # Documentation
│   ├── DEPLOYMENT.md              # Production deployment guide
│   ├── VUE_SETUP_COMPLETE.md     # Vue.js migration details
│   ├── MVP_COMPLETE.md           # Milestone 1 summary
│   ├── PROFILE_SYSTEM_COMPLETE.md # Profile system docs
│   ├── EXTRUDER_CALIBRATION_ENHANCEMENT.md
│   ├── TEST_RESULTS.md           # Test report (133 tests)
│   └── MANUAL_TEST_CHECKLIST.md  # Testing guide
│
├── archive/                       # Legacy implementations
│   ├── legacy-html/              # Original HTML versions
│   ├── legacy-js/                # Modular JavaScript
│   ├── legacy-hugo/              # Hugo static site
│   └── unused-python/            # Python placeholder files
│
├── research/
│   └── Klipper Calibrations.xlsx # Source spreadsheet
│
├── public/                        # Static assets (empty, ready for images)
├── dist/                          # Production build output
│
├── package.json                   # Node.js dependencies
├── vite.config.ts                # Vite configuration
├── tsconfig.json                 # TypeScript configuration
├── tailwind.config.js            # Tailwind customization
├── netlify.toml                  # Netlify deploy config
├── vercel.json                   # Vercel deploy config
├── TODO.md                        # Development roadmap
└── README.md                      # This file
```

## 🎨 Features

- **⚡ Lightning Fast**: Vite dev server with instant hot reload
- **🎯 Type Safe**: Full TypeScript support with strict checking
- **🧩 Component Based**: Reusable Vue 3 components with Composition API
- **🌙 Dark Theme**: Easy on the eyes for long calibration sessions
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **💾 Local Storage**: Saves your inputs (browser-based, no account needed) *
- **📋 Copy to Clipboard**: One-click copying of results and Klipper commands
- **🔗 Hash Navigation**: Share specific calculators via URL hash
- **📖 Inline Documentation**: Step-by-step instructions and references
- **🎨 Modern UI**: Clean, intuitive interface with Tailwind CSS
- **♿ Accessible**: Semantic HTML with ARIA labels

*State persistence coming soon with Pinia stores

## 🤝 Contributing

Contributions are welcome! Please see [TODO.md](TODO.md) for the development roadmap and areas where help is needed.

### Ways to Contribute
- **Testing**: Try the calculators with your printer and report issues
- **Documentation**: Improve instructions, add examples, fix typos
- **Features**: Implement new calculators from the TODO list
- **Research**: Find and document calibration methods from journals/papers
- **Design**: Improve UI/UX, add visualizations, create tutorials

## 📄 License

This project is open source. License TBD (considering MIT or GPL).

## 🙏 Acknowledgments

This project builds upon the excellent work of:
- **Ellis** ([Ellis3DP Print Tuning Guide](https://ellis3dp.com/Print-Tuning-Guide/))
- **SoftFever** ([OrcaSlicer](https://github.com/SoftFever/OrcaSlicer))
- **TeachingTech** ([Calibration Website](https://teachingtechyt.github.io/calibration.html))
- The Klipper, Voron, and 3D printing communities

## 📞 Contact

- **GitHub**: [@minimal3dp](https://github.com/minimal3dp)
- **Website**: [minimal3dp.com](https://minimal3dp.com)
- **Repository**: [m3dp_3d_printer_calibrtion](https://github.com/minimal3dp/m3dp_3d_printer_calibrtion)

## 🔄 Project Status

**Current Phase**: Phase 2 - Core Features Complete (Nov 2025)
- ✅ Vue 3 + TypeScript application fully operational
- ✅ 16 calculators migrated from legacy HTML to Vue components
- ✅ Modern component library with 7 reusable components
- ✅ Production-ready build system with Vite
- ✅ Responsive design with Tailwind CSS dark theme
- ⏳ State management implementation (Pinia ready)
- ⏳ Additional calculators (temperature, retraction, skew)
- ⏳ Production deployment setup

**What's New:**
- Complete rewrite in Vue 3 with TypeScript
- Component-based architecture for maintainability
- Fast development with hot module replacement
- Type-safe calculations with validation
- Modern build pipeline for optimized production bundles

See [TODO.md](TODO.md) for detailed roadmap and [docs/VUE_SETUP_COMPLETE.md](docs/VUE_SETUP_COMPLETE.md) for migration details.
