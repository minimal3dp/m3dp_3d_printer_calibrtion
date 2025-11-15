# M3DP Calibration Suite - Deployment Guide

## Quick Deploy to Production

### Option 1: Vercel (Recommended - Fastest)

**Method A: Vercel CLI (Easiest)**

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy** (one command!):
   ```bash
   vercel --prod
   ```
   
   Follow the prompts:
   - Link to existing project? No
   - Project name: m3dp-calibration-suite
   - Directory: ./ (press Enter)
   
   **Done!** Your site will be live at `https://[project-name].vercel.app`

**Method B: Vercel Dashboard (Auto-deploy)**

1. **Push to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "MVP complete - ready for deployment"
   git push origin main
   ```

2. **Deploy via Vercel**:
   - Go to [vercel.com](https://vercel.com) and sign in
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Vercel auto-detects Vite settings from `vercel.json`
   - Click "Deploy"
   - Your site will be live at `https://[project-name].vercel.app`

**Done!** Vercel will auto-deploy on every push to main.

### Option 2: Netlify

1. **Push to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "MVP complete - ready for deployment"
   git push origin main
   ```

2. **Deploy to Netlify**:
   - Go to [netlify.com](https://netlify.com) and sign in
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub and select this repository
   - Netlify will auto-detect the settings from `netlify.toml`
   - Click "Deploy site"
   - Your site will be live at `https://[random-name].netlify.app`

### Option 3: GitHub Pages

1. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add to package.json scripts**:
   ```json
   "deploy": "npm run build && gh-pages -d dist"
   ```

3. **Update vite.config.ts** (add base path):
   ```typescript
   base: '/m3dp_3d_printer_calibrtion/'
   ```

4. **Deploy**:
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: Deploy from branch `gh-pages`
   - Save

### Option 4: Self-Hosted (VPS/Dedicated Server)

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Upload the `dist/` folder** to your web server:
   ```bash
   rsync -avz dist/ user@yourserver.com:/var/www/html/
   ```

3. **Configure web server** (nginx example):
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       root /var/www/html;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }

       # Cache static assets
       location /assets/ {
           expires 1y;
           add_header Cache-Control "public, immutable";
       }
   }
   ```

4. **Restart web server**:
   ```bash
   sudo systemctl restart nginx
   ```

## Build Commands Reference

### Development
```bash
npm run dev          # Start dev server on localhost:3000
```

### Production Build
```bash
npm run build        # Build for production in dist/
npm run preview      # Preview production build locally
```

### Code Quality
```bash
npm run lint         # Check for linting errors
npm run format       # Format code with Prettier
npm run type-check   # TypeScript type checking
```

## Environment Variables (Optional)

Create `.env.production` for production-specific settings:

```env
VITE_APP_TITLE=M3DP Calibration Suite
VITE_APP_VERSION=1.0.0
VITE_ANALYTICS_ID=your-analytics-id
```

Access in code:
```typescript
const title = import.meta.env.VITE_APP_TITLE
```

## Performance Optimization

The production build automatically includes:
- ✅ Minified JavaScript and CSS
- ✅ Tree-shaking (removes unused code)
- ✅ Code splitting (separate vendor chunk)
- ✅ Asset optimization
- ✅ Gzip compression (via hosting platform)

### Bundle Analysis

To analyze bundle size:
```bash
npm run build -- --mode analyze
```

## Post-Deployment Checklist

- [ ] Test all calculators on production URL
- [ ] Verify mobile responsiveness
- [ ] Test localStorage persistence
- [ ] Check all external links work
- [ ] Verify copy-to-clipboard functions
- [ ] Test in multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] Check browser console for errors
- [ ] Verify page navigation and hash routing
- [ ] Test with browser devtools throttling (slow 3G)
- [ ] Verify meta tags for SEO (view page source)

## Custom Domain Setup

### Vercel
1. Go to Project settings → Domains
2. Add domain and follow DNS instructions
3. HTTPS enabled automatically (via Let's Encrypt)
4. Supports automatic SSL for subdomains

### Netlify
1. Go to Site settings → Domain management
2. Add custom domain
3. Follow DNS configuration instructions
4. Enable HTTPS (automatic with Let's Encrypt)

### Cloudflare Pages
1. Deploy via Cloudflare Pages
2. Add custom domain in Pages settings
3. Cloudflare handles DNS and SSL automatically

## Continuous Integration (CI/CD)

### GitHub Actions with Vercel (Recommended)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

**Note:** Vercel already auto-deploys on push when connected via dashboard, so CI/CD is optional.

## Monitoring & Analytics

### Recommended Tools (Privacy-Friendly)

1. **Plausible Analytics** - Privacy-focused, GDPR compliant
2. **Fathom Analytics** - Simple, privacy-first
3. **Umami** - Self-hosted, open source

### Setup Plausible (Example)

Add to `index.html` before `</head>`:
```html
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
```

## Troubleshooting

### Build fails with "out of memory"
```bash
NODE_OPTIONS=--max-old-space-size=4096 npm run build
```

### Assets not loading after deploy
- Check `vite.config.ts` base path setting
- Verify asset paths are relative
- Check browser console for 404 errors

### localStorage not persisting
- Check browser privacy settings
- Verify HTTPS is enabled (required for some browsers)
- Test in incognito/private mode

### Hash routing not working
- Verify server redirects all routes to index.html
- Check `netlify.toml` or server configuration

## Security Considerations

- ✅ All external links use `rel="noopener"`
- ✅ Security headers configured in `netlify.toml`
- ✅ No sensitive data stored in localStorage
- ✅ HTTPS enforced by hosting platform
- ✅ No external API calls (fully client-side)
- ✅ Content Security Policy headers recommended

## Backup & Rollback

### Vercel
- All deployments preserved forever (free tier)
- Instant rollback from Deployments page
- One-click to promote any previous deploy to production
- View deployment previews for every commit

### Netlify
- All deploys are saved
- Rollback from Deploys tab (click "Publish" on old deploy)

### Manual Backup
```bash
# Download production build
npm run build
tar -czf m3dp-backup-$(date +%Y%m%d).tar.gz dist/

# Restore
tar -xzf m3dp-backup-YYYYMMDD.tar.gz
```

## Support & Updates

After deployment:
1. Monitor user feedback
2. Check analytics for popular calculators
3. Watch for browser console errors
4. Keep dependencies updated: `npm update`
5. Test after major browser updates

## Success! 🎉

Your M3DP Calibration Suite is now live and accessible to the 3D printing community!

**Next Steps:**
- Share on Reddit (r/3Dprinting, r/klipper, r/voroncorexy)
- Post on Klipper/Voron Discord servers
- Submit to 3D printing resource lists
- Create demo video
- Write blog post announcement
