# 🚀 Deploy to Vercel - Quick Guide

## ⚡ Fastest Method: Git Integration

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Ready for deployment"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import Git Repository"
3. Select your repository
4. Vercel will auto-detect Vite
5. Click "Deploy"

### Step 3: Add Environment Variables

After initial deployment:

1. Go to **Project Settings → Environment Variables**
2. Add all variables from `.env.example`
3. Click "Save"
4. **Redeploy** (Settings → Deployments → Redeploy)

---

## 🔐 Environment Variables (Copy-Paste Ready)

```env
# Appwrite (Required)
VITE_APPWRITE_URL=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id_here
VITE_APPWRITE_DATABASE_ID=your_database_id_here
VITE_APPWRITE_COLLECTION_ID=your_collection_id_here
VITE_APPWRITE_BUCKET_ID=your_bucket_id_here

# AI Features (Optional)
VITE_AI_PROVIDER=gemini
VITE_GEMINI_API_KEY=your_gemini_key_here

# Analytics (Optional)
VITE_APPWRITE_ANALYTICS_COLLECTION_ID=your_analytics_collection_id_here
```

---

## 🔧 Post-Deployment Setup

### 1. Update Appwrite OAuth Redirects

**Your Vercel URL:** `https://your-project-name.vercel.app`

**In Appwrite Console:**
- Go to **Auth → Settings → OAuth2 Providers**
- For each provider (Google, GitHub, LinkedIn):
  - Success URL: `https://your-project-name.vercel.app/`
  - Failure URL: `https://your-project-name.vercel.app/login`

### 2. Add Vercel Domain to Appwrite

**In Appwrite Console:**
- Go to **Project → Settings → Platforms**
- Click "Add Platform" → "Web App"
- Add: `https://your-project-name.vercel.app`
- Add: `https://*.vercel.app` (for preview deployments)

---

## ✅ Test Your Deployment

1. ✅ Visit your site
2. ✅ Test signup/login
3. ✅ Test OAuth (Google/GitHub/LinkedIn)
4. ✅ Create a post
5. ✅ Upload an image
6. ✅ Test AI features (if enabled)
7. ✅ Check analytics (if enabled)

---

## 🐛 Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| **404 on page refresh** | Already fixed by `vercel.json` rewrites |
| **Environment variables not working** | Redeploy after adding them |
| **CORS errors** | Add Vercel domain to Appwrite platforms |
| **OAuth redirect errors** | Update OAuth URLs in Appwrite |
| **Build fails** | Check build logs, ensure all dependencies are in `package.json` |

---

## 🎯 Custom Domain (Optional)

1. Go to **Project Settings → Domains**
2. Click "Add Domain"
3. Enter your custom domain
4. Follow DNS configuration instructions
5. Update Appwrite OAuth redirects with new domain

---

## 🔄 Auto-Deploy Setup

**Already configured!** Every push to `main` branch will:
- ✅ Automatically trigger a deployment
- ✅ Build your project
- ✅ Deploy to production
- ✅ Provide instant preview URL

---

## 📱 Preview Deployments

Every pull request gets a unique preview URL:
- Test changes before merging
- Share with team for review
- No impact on production

---

## 🎉 That's It!

Your Apogee blog is now live on Vercel!

**Next Steps:**
- Share your blog URL
- Start writing posts
- Monitor analytics
- Invite authors

---

**Need Help?**
- [Vercel Docs](https://vercel.com/docs)
- [Appwrite Docs](https://appwrite.io/docs)
- Check `README.md` for detailed project documentation

