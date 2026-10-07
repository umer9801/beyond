# Beyond1 Deployment Guide

## Prerequisites
- GitHub account
- Vercel account (free tier works great)

## Step 1: Push to GitHub

1. Initialize git repository (if not already done):
```bash
git init
git add .
git commit -m "Initial commit - Beyond1 website"
```

2. Create a new repository on GitHub
3. Push your code:
```bash
git remote add origin https://github.com/YOUR_USERNAME/beyond1.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Vercel

### Option A: Using Vercel Dashboard (Easiest)

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "Add New Project"
4. Import your GitHub repository
5. Vercel will auto-detect settings from `vercel.json`
6. Click "Deploy"

That's it! Your site will be live in ~2 minutes.

### Option B: Using Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Follow the prompts:
   - Set up and deploy? **Y**
   - Which scope? (select your account)
   - Link to existing project? **N**
   - Project name? (press enter for default)
   - Directory? **./` (press enter)
   - Override settings? **N**

5. For production deployment:
```bash
vercel --prod
```

## Configuration

The `vercel.json` file is already configured with:
- Build command: `npm run build`
- Output directory: `dist`
- SPA routing (redirects all routes to index.html)

## Environment Variables (if needed later)

If you add API keys or environment variables:

1. In Vercel Dashboard:
   - Project Settings → Environment Variables
   - Add your variables

2. Or using CLI:
```bash
vercel env add SECRET_KEY
```

## Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

## Auto Deployments

Once connected to GitHub, Vercel will automatically:
- Deploy on every push to `main` branch
- Create preview deployments for pull requests
- Show deployment status in GitHub

## Deployment Status

Your site will be available at:
- Production: `https://YOUR_PROJECT_NAME.vercel.app`
- Custom domain (if configured): `https://yourdomain.com`

## Troubleshooting

If build fails:
1. Check build logs in Vercel dashboard
2. Ensure all dependencies are in `package.json`
3. Test build locally: `npm run build`

## Contact

For Vercel support: [vercel.com/support](https://vercel.com/support)
