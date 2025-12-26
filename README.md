# Apogee Blog Platform

<div align="center">

![Apogee Logo](https://img.shields.io/badge/Apogee-Modern%20Blogging-purple?style=for-the-badge)

**A modern, AI-powered blogging platform with role-based access control**

[![React](https://img.shields.io/badge/React-18.x-blue?logo=react)](https://reactjs.org/)
[![Appwrite](https://img.shields.io/badge/Appwrite-BaaS-red?logo=appwrite)](https://appwrite.io/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite)](https://vitejs.dev/)

</div>

---

## ✨ Production Ready

**Clean • Optimized • Professional**

This project is production-ready with:
- ✅ **Clean codebase**: Consistent PascalCase naming, organized structure
- ✅ **Minimal dependencies**: No testing overhead, ~15MB smaller node_modules
- ✅ **Fast builds**: Optimized Vite configuration
- ✅ **Industry-standard**: Professional folder structure and documentation

---

## 🚀 Features

- **🔐 Authentication**: Email/password, OAuth (Google, GitHub, LinkedIn), email verification, password recovery
- **👥 Role-Based Access**: Admin, Author, and Reader roles with granular permissions
- **✍️ Rich Text Editor**: TinyMCE with auto-save and AI writing assistance
- **🤖 AI-Powered**: Writing assistant, tag generation, comment moderation (Google Gemini)
- **📊 Analytics**: Post views, read time, visitor tracking, author/admin dashboards
- **🏷️ Content Organization**: Tags system, full-text search, post filtering
- **🎨 Modern UI**: Dark mode, skeleton loaders, responsive design, Wix-inspired aesthetics
- **🔍 SEO Optimized**: Meta tags, OpenGraph, Twitter Cards, sitemap, RSS feeds

---

## 📋 Prerequisites

- Node.js 18+ and npm
- Appwrite account ([sign up free](https://appwrite.io/))
- Google Gemini API key (optional, for AI features)

---

## ⚡ Quick Start

### 1. Clone and Install

```bash
git clone <repository-url>
cd blog3
npm install
```

### 2. Environment Setup

Create `.env` file:

```bash
# Appwrite Configuration
VITE_APPWRITE_URL=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_COLLECTION_ID=your_collection_id
VITE_APPWRITE_BUCKET_ID=your_bucket_id

# AI Configuration (Optional)
VITE_AI_PROVIDER=gemini
VITE_GEMINI_API_KEY=your_gemini_api_key

# Analytics (Optional)
VITE_APPWRITE_ANALYTICS_COLLECTION_ID=your_analytics_collection_id
```

### 3. Appwrite Setup

**Create Database:**
1. Go to Appwrite Console → Databases → Create Database
2. Create Collection with these attributes:
   - `title` (String, 200, required)
   - `slug` (String, 36, required, unique)
   - `content` (String, 50000, required)
   - `featuredimages` (String, 2000, required)
   - `status` (String, 20, required)
   - `userId` (String, 100, required)
   - `tags` (String, 1000, optional) - Array of strings

**Permissions:**
- Create: `users` (any authenticated user)
- Read: `any` (public)
- Update: `users` (owner only)
- Delete: `users` (owner only)

**Create Storage Bucket:**
1. Storage → Create Bucket
2. Set permissions: Create (`users`), Read (`any`), Update/Delete (`users`)
3. Allowed file extensions: `jpg, jpeg, png, gif, webp`
4. Maximum file size: `10MB`

**OAuth Setup (Optional):**
1. Auth → Settings → OAuth2 Providers
2. Enable Google, GitHub, LinkedIn
3. Add success/failure redirect URLs:
   - Success: `http://localhost:5173/`
   - Failure: `http://localhost:5173/login`

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:5173`

### 5. Default User Roles

- **Unauthenticated**: Reader (view posts only)
- **After signup**: Automatically assigned Author role
- **Admin**: Manually set in Appwrite console under user preferences (`role: admin`)

---

## 📁 Project Structure

```
src/
├── components/          # React components (PascalCase)
│   ├── Header/         # Navigation
│   ├── Footer/         # Footer
│   ├── Container/      # Layout container
│   ├── PostForm/       # Post creation/editing
│   ├── PostCard.jsx    # Post preview card
│   ├── ui/             # shadcn/ui components
│   ├── skeletons/      # Loading skeletons
│   └── ...
├── pages/              # Route pages
│   ├── Home.jsx
│   ├── AllPost.jsx
│   ├── Post.jsx
│   ├── AddPost.jsx
│   ├── EditPost.jsx
│   └── ...
├── appwrite/           # Appwrite services
│   ├── auth.js         # Authentication
│   └── config.js       # Database & storage
├── store/              # Redux state management
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── services/           # AI service (Gemini)
├── contexts/           # React contexts (Theme)
└── conf/               # Environment config
```

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | React 18, Redux Toolkit, React Router |
| **Styling** | TailwindCSS, shadcn/ui components |
| **Backend** | Appwrite (BaaS) |
| **Editor** | TinyMCE |
| **AI** | Google Gemini API |
| **Build** | Vite |

---

## 📝 Available Scripts

```bash
# Development
npm run dev              # Start dev server

# Build
npm run build            # Production build
npm run preview          # Preview production build

# Linting
npm run lint             # Run ESLint
```

---

## 🔑 Key Features Setup

### AI Writing Assistant

1. Get API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add to `.env`: `VITE_GEMINI_API_KEY=your_key`
3. Set provider: `VITE_AI_PROVIDER=gemini`
4. Features available in post editor:
   - Improve writing
   - Fix grammar & tone
   - Change tone (professional/casual/technical)
   - Generate summary
   - Auto-generate tags

### Analytics

1. Create analytics collections in Appwrite:
   - `analytics` - Post views
   - `readtime` - Read time tracking
   - `engagement` - User engagement
2. Add collection IDs to `.env`
3. Access dashboards:
   - Author: `/author-dashboard`
   - Admin: `/admin-dashboard`

### Role Management

**Set user as Admin:**
1. Appwrite Console → Auth → Users
2. Select user → Preferences
3. Add: `{ "role": "admin" }`

**Role Permissions:**
- **Reader**: View posts
- **Author**: Create/edit own posts, view analytics
- **Admin**: All permissions + platform analytics + user management

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

#### Method 1: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

#### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

#### Method 3: Git Integration (Recommended)

1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [Vercel Dashboard](https://vercel.com/new)
3. Import your repository
4. Vercel will auto-detect Vite configuration
5. Add environment variables (see below)
6. Click "Deploy"

#### Environment Variables on Vercel

Go to **Project Settings → Environment Variables** and add:

**Required:**
```env
VITE_APPWRITE_URL=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_COLLECTION_ID=your_collection_id
VITE_APPWRITE_BUCKET_ID=your_bucket_id
```

**Optional (AI Features):**
```env
VITE_AI_PROVIDER=gemini
VITE_GEMINI_API_KEY=your_gemini_api_key
```

**Optional (Analytics):**
```env
VITE_APPWRITE_ANALYTICS_COLLECTION_ID=your_analytics_collection_id
```

#### Update Appwrite OAuth Redirects

After deployment, update OAuth redirect URLs in Appwrite:
- Success: `https://your-domain.vercel.app/`
- Failure: `https://your-domain.vercel.app/login`

---

### Other Deployment Options

**Build for Production:**
```bash
npm run build
```

Outputs to `dist/` directory.

**Netlify:**
```bash
netlify deploy --prod
```

**Cloudflare Pages:**
Connect via Git integration

---

## 🔧 Troubleshooting

### Common Issues

**Text appears backwards in editor:**
- Ensure React Hook Form's `value` prop is used (not `initialValue`)
- Check TinyMCE config has `directionality: "ltr"`

**Posts not creating:**
- Verify Appwrite attribute names match code (especially `featuredimages`)
- Check collection permissions allow `Create` for authenticated users
- Ensure slug is unique and under 36 characters

**AI features not working:**
- Verify `VITE_AI_PROVIDER=gemini` in `.env`
- Check API key is valid
- Hard refresh browser (Ctrl+Shift+R)
- Use model name: `gemini-2.0-flash-exp` or `gemini-1.5-flash`

**OAuth not working:**
- Add both success and failure redirect URLs in Appwrite
- Ensure URLs match exactly (include trailing slashes if needed)
- Check OAuth provider credentials

---

## 📂 Database Schema

### Posts Collection

| Attribute | Type | Size | Required | Notes |
|-----------|------|------|----------|-------|
| title | String | 200 | Yes | Post title |
| slug | String | 36 | Yes | URL-friendly identifier (unique) |
| content | String | 50000 | Yes | HTML content |
| featuredimages | String | 2000 | Yes | Image file ID |
| status | String | 20 | Yes | 'active' or 'inactive' |
| userId | String | 100 | Yes | Author's user ID |
| tags | String[] | 1000 | No | Array of tag strings |

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgments

- [Appwrite](https://appwrite.io/) - Backend as a Service
- [TinyMCE](https://www.tiny.cloud/) - Rich text editor
- [Google Gemini](https://ai.google.dev/) - AI capabilities
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Tailwind CSS](https://tailwindcss.com/) - Styling

---

<div align="center">

**Made with ❤️ using React and Appwrite**

[⭐ Star on GitHub](.) • [🐛 Report Bug](.) • [✨ Request Feature](.)

</div>
# blogXupgraded
