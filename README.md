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

### Legacy HTML Version

The original standalone HTML version is still available:

```bash
# Open index.html directly in your browser
open index.html  # macOS
xdg-open index.html  # Linux
# or double-click index.html in Windows
```

Note: The Vue.js version is actively maintained and recommended for the best experience.

## 📚 Documentation

- **[TODO.md](TODO.md)**: Comprehensive development roadmap and feature tracking
- **Calibration Guides**: Each calculator includes inline instructions and references
- **External References**:
  - [Ellis3DP Print Tuning Guide](https://ellis3dp.com/Print-Tuning-Guide/)
  - [OrcaSlicer Calibration Wiki](https://github.com/SoftFever/OrcaSlicer/wiki/Calibration)
  - [TeachingTech Calibration](https://teachingtechyt.github.io/calibration.html)

## 🧮 Available Calculators (16 Active)

### Basic Setup
- ✅ **Basic Configuration Checks** - Verify your printer.cfg settings
- ✅ **Stepper Run Current** - TMC driver current optimization

### Hardware Calibration
- ✅ **Lead Screw Rotation Distance** - Z-axis calibration
- ✅ **Belt Rotation Distance** - X/Y axis calibration  
- ✅ **Extruder Rotation Distance** - E-steps calibration (2 methods)
- ✅ **Probe XY Offset** - Nozzle to probe offset
- ⏳ Skew Correction (Coming Soon)

### Extrusion & Flow
- ✅ **Flow Calibration (Wall Method)** - Measure actual vs expected
- ✅ **Flow Calibration (OrcaSlicer)** - Pass 1, Pass 2, YOLO methods
- ✅ **Max Volumetric Speed (OrcaSlicer)** - Flow rate testing
- ✅ **Max Volumetric Speed (Ellis)** - Alternative method

### Motion Tuning
- ✅ **Pressure Advance** - Klipper PA calculator with multiple methods
- ✅ **Input Shaping** - Ringing tower method
- ✅ **Max Print Speed** - Calculate theoretical max speeds

### Slicer Optimization
- ✅ **Line Width Recommendations** - Optimal line widths for your nozzle
- ✅ **Extrusion Rate Smoothing** - ERS calculator for Klipper

### Coming Soon
- ⏳ Temperature Towers
- ⏳ Retraction Tuning
- ⏳ Z-Offset Calibration
- ⏳ First Layer Wizard

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
│   ├── components/
│   │   ├── Sidebar.vue            # Navigation sidebar
│   │   ├── CalcLayout.vue         # Page layout wrapper
│   │   ├── CalcCard.vue           # Section card component
│   │   ├── CalcInput.vue          # Input field component
│   │   ├── CalcResult.vue         # Result display component
│   │   ├── AlertBox.vue           # Alert/info boxes
│   │   ├── CommandBlock.vue       # Code block with copy
│   │   └── pages/                 # Calculator pages (16 pages)
│   │       ├── HomePage.vue
│   │       ├── BasicChecksPage.vue
│   │       ├── RunCurrentPage.vue
│   │       └── ...
│   ├── utils/
│   │   └── calculations.ts        # Pure calculation functions
│   ├── types/
│   │   └── calculator.ts          # TypeScript interfaces
│   └── assets/
│       └── styles/
│           └── main.css            # Tailwind + custom styles
│
├── public/                        # Static assets
├── dist/                          # Production build output
│
├── package.json                   # Node.js dependencies
├── vite.config.ts                # Vite configuration
├── tsconfig.json                 # TypeScript configuration
├── tailwind.config.js            # Tailwind customization
├── TODO.md                        # Development roadmap
├── README.md                      # This file
├── VUE_SETUP_COMPLETE.md         # Vue migration guide
│
├── index.html                     # Legacy standalone version
├── js/                           # Legacy JavaScript (deprecated)
├── klipper-calibration/          # Legacy Hugo site (deprecated)
└── research/
    └── Klipper Calibrations.xlsx  # Source spreadsheet
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

See [TODO.md](TODO.md) for detailed roadmap and [VUE_SETUP_COMPLETE.md](VUE_SETUP_COMPLETE.md) for migration details.
