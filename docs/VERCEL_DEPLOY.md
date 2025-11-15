# Quick Vercel Deployment Guide

## One-Command Deploy

```bash
# Install Vercel CLI globally (one-time)
npm install -g vercel

# Deploy to production
npm run deploy
# or
vercel --prod
```

That's it! Your site will be live at `https://[project-name].vercel.app`

## First-Time Setup

When you run `vercel --prod` for the first time, you'll be asked:

1. **Set up and deploy?** → Yes
2. **Which scope?** → Select your account
3. **Link to existing project?** → No
4. **Project name?** → `m3dp-calibration-suite` (or press Enter for default)
5. **Directory?** → `./` (press Enter)
6. **Override settings?** → No (Vercel auto-detects from vercel.json)

## Auto-Deploy from GitHub

### Option 1: Via Vercel Dashboard (Recommended)
1. Visit [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Click "Deploy"
4. **Done!** Every push to `main` auto-deploys

### Option 2: Via CLI
```bash
# Link repo (one-time)
vercel link

# Subsequent deploys
vercel --prod
```

## Configuration

Already configured in `vercel.json`:
- ✅ Build command: `npm run build`
- ✅ Output directory: `dist`
- ✅ SPA routing (all routes → index.html)
- ✅ Framework: Vite (auto-detected)

## Environment Variables (Optional)

If you need environment variables:

```bash
# Via CLI
vercel env add VITE_APP_TITLE

# Or via dashboard
# Project Settings → Environment Variables
```

## Custom Domain

1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records as instructed
4. HTTPS auto-enabled ✅

## Useful Commands

```bash
vercel                    # Deploy to preview
vercel --prod            # Deploy to production
vercel ls                # List deployments
vercel logs              # View logs
vercel domains           # Manage domains
vercel env               # Manage environment variables
vercel remove [project]  # Delete project
```

## Deployment Previews

Every git push gets a unique preview URL:
- `main` branch → Production (`your-site.vercel.app`)
- Other branches → Preview URLs
- Pull requests → Auto-commented with preview URL

## Rollback

1. Visit [vercel.com](https://vercel.com)
2. Go to your project → Deployments
3. Click any previous deployment
4. Click "Promote to Production"

## Build Logs

View build logs:
- In Vercel dashboard
- Or run: `vercel logs [deployment-url]`

## Performance

Vercel automatically provides:
- ✅ Global CDN (Edge Network)
- ✅ Automatic HTTPS
- ✅ DDoS protection
- ✅ Gzip/Brotli compression
- ✅ HTTP/2 & HTTP/3
- ✅ Immutable caching for assets

## Troubleshooting

### "Command not found: vercel"
```bash
npm install -g vercel
```

### Build fails
```bash
# Test locally first
npm run build
npm run preview
```

### SPA routing not working
- Already configured in `vercel.json` ✅
- All routes redirect to `/index.html`

## Cost

- ✅ **Free tier** includes:
  - Unlimited deployments
  - 100 GB bandwidth/month
  - Custom domains with SSL
  - Preview deployments
  - Automatic Git integration

Perfect for this project! 🎉

## Next Steps After Deploy

1. ✅ Visit your live site
2. ✅ Test all calculators work
3. ✅ Add custom domain (optional)
4. ✅ Share with community!

---

**Your app is now live on Vercel!** 🚀

Share it:
- Reddit: r/3Dprinting, r/klipper, r/voroncorexy
- Discord: Klipper, Voron communities
- Twitter/X: Tag @vercel @minimal3dp
