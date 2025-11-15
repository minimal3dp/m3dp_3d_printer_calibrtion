# Archive - Legacy Implementations

This folder contains previous implementations of the M3DP 3D Printer Calibration Suite that have been superseded by the modern Vue.js application.

## 📂 Contents

### `legacy-html/`
Original standalone HTML implementations:
- `index-old.html` - First complete version with all calculators in one file
- `index.html` - Refined single-page HTML version

**Technology**: Pure HTML/CSS/JavaScript with Tailwind CSS via CDN

**Status**: Deprecated - No longer maintained

**Why Archived**: 
- Difficult to maintain as single 2000+ line file
- No component reusability
- No type safety
- Manual DOM manipulation
- All code in one monolithic file

### `legacy-js/`
Modular JavaScript implementations:
- Individual `.js` files for each calculator
- Separate utility libraries (prism.js, deflate.js, etc.)
- Click-to-copy functionality
- Tab persistence logic

**Technology**: Vanilla JavaScript modules

**Status**: Deprecated - No longer maintained

**Why Archived**:
- Superseded by TypeScript in Vue components
- No framework structure
- Duplicate functionality across files
- Lack of type safety and validation

### `legacy-hugo/`
Hugo static site generator implementation:
- `klipper-calibration/` - Hugo-based multi-page site
- Individual HTML pages for each calculator
- Static site structure

**Technology**: Hugo static site generator + HTML/JS

**Status**: Deprecated - No longer maintained

**Why Archived**:
- Overhead of Hugo build system
- Duplicate content management
- Less interactive than SPA approach
- Harder to maintain consistency

### `unused-python/`
Python placeholder files from initial project setup:
- `main.py` - Basic Python entry point (unused)
- `pyproject.toml` - Python project config
- `uv.lock` - UV package manager lock file
- `.python-version` - Python version specification

**Technology**: Python 3.x with UV package manager

**Status**: Never used - Project pivoted to Vue.js

**Why Archived**:
- Project chose Vue.js frontend over Python backend
- No backend needed for current feature set
- All calculations run client-side in browser
- May be useful if future backend API is needed

## 🔄 Migration to Vue.js

The current Vue.js implementation provides:

### ✅ Improvements Over Legacy Versions
- **Component Architecture**: Reusable Vue components (7 core components)
- **Type Safety**: Full TypeScript with strict checking
- **State Management**: Pinia stores with localStorage persistence
- **Developer Experience**: Hot module replacement, instant feedback
- **Maintainability**: Separation of concerns, single responsibility
- **Performance**: Optimized Vite builds with code splitting
- **Scalability**: Easy to add new calculators and features
- **Testing**: Easier to unit test individual components
- **Modern Tooling**: ESLint, Prettier, TypeScript, Vite

### 📊 Code Comparison

| Metric | Legacy HTML | Vue.js Implementation |
|--------|-------------|---------------------|
| **Lines of Code** | ~2000 (monolithic) | ~3500 (modular) |
| **Files** | 1-2 main files | 30+ organized files |
| **Type Safety** | ❌ None | ✅ Full TypeScript |
| **Component Reuse** | ❌ Copy-paste | ✅ Import components |
| **State Management** | ❌ Manual DOM | ✅ Pinia stores |
| **Build Time** | ⚡ None (static) | ⚡ 1.06s production |
| **Bundle Size** | ~50KB (unoptimized) | 125KB (~29KB gzipped) |
| **Hot Reload** | ❌ Full page refresh | ✅ Instant HMR |
| **Testing** | ❌ Manual only | ✅ Unit + E2E ready |

### 📝 Migration Timeline
- **Week 1 (Nov 2025)**: Complete Vue.js migration
  - ✅ All 16 calculators migrated
  - ✅ Component library created
  - ✅ TypeScript integration
  - ✅ Production build system
  - ✅ Profile system added

- **Week 2 (Nov 2025)**: Enhanced features
  - ✅ Extruder calibration 6-step wizard
  - ✅ Flow calibration material presets
  - ✅ Comprehensive documentation
  - ✅ Project organization and cleanup

## 🗄️ When to Use Legacy Versions

### Use Legacy HTML if:
- ❌ You cannot run Node.js/npm
- ❌ You need offline access without build step
- ❌ You want absolute minimal dependencies

**Recommendation**: Use the modern Vue.js version instead. It provides:
- Better user experience
- More features (profile system, enhanced wizards)
- Active maintenance and bug fixes
- Future feature additions

### Legacy HTML Usage:
```bash
# Option 1: Open directly in browser
open archive/legacy-html/index.html

# Option 2: Serve with simple HTTP server
cd archive/legacy-html
python3 -m http.server 8000
# Open http://localhost:8000
```

## 📦 Archive Maintenance

**Policy**: Files in this archive are preserved for reference but not maintained.

- ✅ **Preserved**: Code is kept for historical reference and potential feature extraction
- ❌ **Not Updated**: No bug fixes or feature additions
- ❌ **Not Tested**: May break with modern browsers
- ✅ **Documented**: This README explains purpose and context

**Last Active**: November 2025

**Archived**: November 14, 2025

## 🔗 References

For the current implementation, see:
- [Main README](../README.md) - Project overview
- [TODO.md](../TODO.md) - Development roadmap
- [docs/VUE_SETUP_COMPLETE.md](../docs/VUE_SETUP_COMPLETE.md) - Migration details
- [docs/DEPLOYMENT.md](../docs/DEPLOYMENT.md) - Production deployment

---

**Note**: If you need features from the legacy versions, please open an issue on GitHub rather than using these archived implementations. The Vue.js version is the actively maintained codebase.
