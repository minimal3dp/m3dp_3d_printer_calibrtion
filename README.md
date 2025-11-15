# M3DP 3D Printer Calibration Suite

A comprehensive web-based calibration suite for 3D printers, with a focus on Klipper firmware and OrcaSlicer. This project consolidates calibration knowledge from Ellis3DP, OrcaSlicer Wiki, TeachingTech, and community best practices into an easy-to-use web application.

## 🚀 Live Demo

The application is deployed and available to use at: **[https://m3dp-calibration-suite.vercel.app/](https://m3dp-calibration-suite.vercel.app/)**

## 🎯 Project Overview

This application provides interactive calculators and guides for calibrating every aspect of your 3D printer and slicer settings:

- **Extruder Calibration**: Rotation distance, flow rate, volumetric speed
- **Motion Tuning**: Pressure advance, input shaping, acceleration
- **Hardware Setup**: Probe offsets, skew correction, stepper currents
- **Slicer Optimization**: Line widths, speeds, temperatures, retraction

## ✨ Features

- **⚡ Lightning Fast**: Vite dev server with instant hot reload.
- **🎯 Type Safe**: Full TypeScript support with strict checking.
- **🧩 Component Based**: Reusable Vue 3 components with Composition API.
- **🌙 Dark Theme**: Easy on the eyes for long calibration sessions.
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile.
- **💾 Profile Management**: Save and manage multiple printer/filament configurations.
- **📋 Copy to Clipboard**: One-click copying of results and Klipper commands.
- **🔗 Hash Navigation**: Share specific calculators via URL hash.
- **📖 Inline Documentation**: Step-by-step instructions and references.
- **♿ Accessible**: Semantic HTML with ARIA labels and keyboard navigation.

### Enhanced Extruder Calibration Wizard

A 6-step interactive wizard to perfectly calibrate your extruder's rotation distance.
- **Supports All Extruder Types**: Direct Drive, Bowden, and Dual Drive with specific instructions.
- **Smart Presets**: One-click presets for common extruders (BMG, Orbiter, Voron M4, etc.).
- **Visual Guides**: ASCII diagrams and clear instructions at every step.
- **Real-time Feedback**: Calculates accuracy percentage and provides color-coded status.
- **Command Generation**: Automatically generates the correct `printer.cfg` command.

### Comprehensive Profile System

Manage unlimited printer and filament profiles to quickly apply settings across all calculators.
- **Printer Profiles**: Store hardware specs, build volume, calibration values (rotation distance, PA, input shaping), and more.
- **Filament Profiles**: Track settings for each material, including temperatures, flow, speeds, and retraction.
- **Active Selections**: Easily switch between active printers and filaments.
- **Import/Export**: Backup and share your profiles with a simple JSON import/export.
- **Data Persistence**: All profiles are automatically saved to your browser's localStorage.

## 🧮 Available Calculators (17 Active)

### Profile Management
- ✅ **Printer & Filament Profiles** - Save and manage multiple configurations.

### Basic Setup
- ✅ **Basic Configuration Checks** - Verify `printer.cfg` settings.
- ✅ **Stepper Run Current** - TMC driver current optimization.

### Hardware Calibration
- ✅ **Lead Screw Rotation Distance** - Z-axis calibration.
- ✅ **Belt Rotation Distance** - X/Y axis calibration.
- ✅ **Extruder Rotation Distance** - E-steps calibration (with 6-step wizard).
- ✅ **Probe XY Offset** - Nozzle to probe offset.

### Extrusion & Flow
- ✅ **Flow Calibration (Wall Method)** - Measure actual vs expected.
- ✅ **Flow Calibration (OrcaSlicer)** - Pass 1, Pass 2, YOLO methods.
- ✅ **Max Volumetric Speed (OrcaSlicer)** - Flow rate testing.
- ✅ **Max Volumetric Speed (Ellis)** - Alternative method.

### Motion Tuning
- ✅ **Pressure Advance (Klipper)** - Includes Tower, OrcaSlicer, and Adaptive PA methods.
- ✅ **Input Shaping** - Ringing tower method.
- ✅ **Max Print Speed** - Calculate theoretical max speeds.

### Slicer Optimization
- ✅ **Line Width Recommendations** - Optimal line widths for your nozzle.
- ✅ **Extrusion Rate Smoothing** - ERS calculator for Klipper.

### Coming Soon (Phase 2)
- ⏳ Skew Correction
- ⏳ Temperature Towers
- ⏳ Retraction Tuning
- ⏳ **Marlin Linear Advance (K-factor)** & **RepRapFirmware** Support

## 🛠️ Technology Stack

- **Vue 3.4** - Composition API with `<script setup>`
- **TypeScript 5.3** - Strict type checking
- **Vite 5.0** - Ultra-fast dev server and build tool
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Pinia 2.1** - State management
- **Phosphor Icons** - Icon set

## 🚀 Quick Start (for Developers)

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

### Production Build

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

## 📁 Project Structure

The project has a clean, professional structure that clearly separates active code, documentation, and legacy implementations.

```
m3dp_3d_printer_calibrtion/
├── src/                           # Vue.js application source
│   ├── components/                # Reusable components & pages
│   ├── composables/               # State persistence
│   ├── stores/                    # Pinia state management
│   ├── types/                     # TypeScript definitions
│   ├── utils/                     # Calculation functions
│   └── assets/                    # Styles and images
│
├── archive/                       # Legacy implementations
│   ├── README.md                  # Archive documentation
│   ├── legacy-html/               # Original HTML versions
│   ├── legacy-js/                 # Modular JavaScript
│   ├── legacy-hugo/               # Hugo static site
│   └── unused-python/             # Unused Python files
│
├── public/                        # Static assets
├── dist/                          # Production build output
│
├── package.json                   # Node.js dependencies
├── vite.config.ts                 # Vite configuration
├── vercel.json                    # Vercel deploy config
├── TODO.md                        # Development roadmap
└── README.md                      # This file
```

## ✅ Testing

The application is rigorously tested, with **133/133 passing tests** covering:
- Build & Compilation
- All 17 Page Components
- All Calculator Functions
- UI Components & State Management
- Enhanced Features (Extruder Wizard, Profile System)
- Responsive Design & Accessibility
- Data Persistence & Performance

## 🤝 Contributing

Contributions are welcome! Please see [TODO.md](TODO.md) for the development roadmap and areas where help is needed.

## 📄 License

This project is open source. License TBD (considering MIT).

## 🙏 Acknowledgments

This project builds upon the excellent work of:
- **Ellis** ([Ellis3DP Print Tuning Guide](https://ellis3dp.com/Print-Tuning-Guide/))
- **SoftFever** ([OrcaSlicer](https://github.com/SoftFever/OrcaSlicer))
- **TeachingTech** ([Calibration Website](https://teachingtechyt.github.io/calibration.html))
- The Klipper, Voron, and 3D printing communities.

## 📞 Contact

- **GitHub**: [@minimal3dp](https://github.com/minimal3dp)
- **Repository**: [m3dp_3d_printer_calibrtion](https://github.com/minimal3dp/m3dp_3d_printer_calibrtion)
