# 🎨 CV Portfolio Platform

> A modern, professional full-stack portfolio website built with cutting-edge technologies for showcasing projects and managing content seamlessly.

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=nextdotjs)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8-green?style=flat-square&logo=mongodb)](https://www.mongodb.com/)

**Developed by:** [Eng. Anglous Rezq](mailto:eng.anglous.rezq@example.com)

</div>

---

## ✨ Key Features

- 🎯 **Modern & Professional UI** - Built with Next.js 15, React 19, and Tailwind CSS
- 🌙 **Dark Mode Support** - Fully styled with seamless theme switching
- 👨‍💼 **Admin Dashboard** - Powerful management panel with JWT authentication
- 📋 **Project Management** - Create, update, and delete projects with ease
- 🖼️ **Smart Image Upload** - Secure image uploads with validation
- 📱 **Fully Responsive** - Mobile-first design for all devices
- 🔒 **Type Safe** - Complete TypeScript support across frontend and backend
- 🛡️ **Secure API** - JWT-protected endpoints with proper authorization

## � Project Structure

```
portfolio-app/
├── src/                          # Frontend Application (Next.js)
│   ├── app/                      # App Directory Routes
│   │   ├── page.tsx             # Homepage
│   │   ├── layout.tsx           # Root layout
│   │   ├── admin/               # Admin pages
│   │   ├── login/               # Authentication page
│   │   ├── dash-admin/          # Admin Dashboard
│   │   └── api/                 # API routes
│   │
│   ├── components/              # React Components
│   │   ├── ui/                  # Reusable UI components
│   │   ├── Hero.tsx            # Hero section
│   │   ├── ProjectGallery.tsx  # Projects showcase
│   │   ├── Navbar.tsx          # Navigation
│   │   └── ...                 # Other components
│   │
│   ├── hooks/                   # Custom React Hooks
│   │   ├── use-projects-api.ts
│   │   ├── use-image-upload.ts
│   │   └── use-mobile.tsx
│   │
│   ├── lib/                     # Utilities & Helpers
│   │   ├── mongodb.ts
│   │   ├── utils.ts
│   │   └── models/
│   │
│   ├── firebase/                # Firebase Integration
│   │   ├── config.ts
│   │   ├── provider.tsx
│   │   └── auth/
│   │
│   └── data/                    # Static Data
│
├── docs/                        # Documentation
├── public/                      # Static Assets
├── scripts/                     # Build & Migration Scripts
├── package.json
├── tsconfig.json
├── next.config.ts
└── tailwind.config.ts
```

## 🛠️ Technology Stack

### Frontend Architecture
| Technology | Purpose | Version |
|------------|---------|---------|
| **Next.js** | React Framework | 15+ |
| **React** | UI Library | 19+ |
| **TypeScript** | Type Safety | 5+ |
| **Tailwind CSS** | Styling Framework | 3+ |
| **Radix UI** | Component Primitives | Latest |
| **React Hook Form** | Form Management | 7+ |
| **Framer Motion** | Animations | 11+ |

### Backend Infrastructure
| Technology | Purpose | Version |
|------------|---------|---------|
| **Node.js** | Runtime Environment | 18+ |
| **Express** | Web Framework | 4+ |
| **MongoDB** | NoSQL Database | 8+ |
| **Mongoose** | MongoDB ODM | Latest |
| **Multer** | File Upload Handling | Latest |
| **Bcrypt** | Password Hashing | Latest |
| **JWT** | Authentication | Latest |

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js** 18.0 or higher
- **npm** or **yarn** package manager
- **MongoDB** (local or Atlas cloud instance)

### Installation Steps

#### 1️⃣ Clone & Setup
```bash
git clone <repository-url>
cd portfolio-app
npm install
```

#### 2️⃣ Environment Configuration

Create `.env.local` in the root directory:
```env
# Frontend Configuration
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
NEXT_PUBLIC_APP_URL=http://localhost:9002
```

#### 3️⃣ Database Setup

Ensure MongoDB is running and accessible:
```bash
# Local MongoDB
mongodb://localhost:27017/portfolio

# Or use MongoDB Atlas
mongodb+srv://username:password@cluster.mongodb.net/portfolio
```

### Running Development Servers

**Start Frontend** (Terminal 1):
```bash
npm run dev
# Runs on http://localhost:9002
```

**Start Backend** (Terminal 2):
```bash
cd cv-backend
npm install
npm run dev
# Runs on http://localhost:5000
```

The application is now ready! 🎉
## 📚 API Documentation

### Authentication Endpoints

**Admin Login**
```http
POST /api/auth/login
Content-Type: application/json

{
  "password": "your-admin-password"
}

Response: {
  "success": true,
  "token": "jwt-token-here",
  "message": "Login successful"
}
```

**Verify Token**
```http
POST /api/auth/verify
Content-Type: application/json

{
  "token": "jwt-token-here"
}

Response: {
  "success": true,
  "message": "Token is valid"
}
```

### Projects Endpoints

**Get All Projects** (Public)
```http
GET /api/projects

Response: {
  "success": true,
  "data": [Project, ...]
}
```

**Get Single Project** (Public)
```http
GET /api/projects/:id

Response: {
  "success": true,
  "data": Project
}
```

**Create Project** (Protected)
```http
POST /api/projects
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Project Name",
  "description": "Project description",
  "tech": ["React", "Node.js", "MongoDB"],
  "image": "image-url",
  "demo": "https://demo-link.com",
  "github": "https://github.com/...",
  "drive": "https://drive-link.com"
}

Response: {
  "success": true,
  "data": Project
}
```

**Update Project** (Protected)
```http
PUT /api/projects/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Name",
  ...
}

Response: {
  "success": true,
  "data": Project
}
```

**Delete Project** (Protected)
```http
DELETE /api/projects/:id
Authorization: Bearer <token>

Response: {
  "success": true,
  "message": "Project deleted successfully"
}
```

### File Upload Endpoint

**Upload Image** (Protected)
```http
POST /api/upload/file
Authorization: Bearer <token>
Content-Type: multipart/form-data

file: <binary-file-data>

Response: {
  "success": true,
  "imageUrl": "https://..."
}
```

## �‍💼 Admin Dashboard Usage

### Access Admin Panel

1. Navigate to admin login: `http://localhost:9002/login`
2. Enter your admin password
3. Access dashboard: `http://localhost:9002/dash-admin`

### Dashboard Features

✅ **Project Management**
- Create new projects
- Edit existing projects
- Delete projects
- View project statistics

✅ **Image Management**
- Upload project images
- Validate file types and sizes
- Automatic image optimization

✅ **Content Management**
- Update project descriptions
- Manage technologies
- Add demo and GitHub links

## 🏗️ Production Deployment

### Build & Optimize

**Frontend Build:**
```bash
npm run build
npm run start
```

**Backend Build:**
```bash
cd cv-backend
npm run build
npm run start
```

### Environment Variables for Production

**.env.local (Frontend)**
```env
NEXT_PUBLIC_BACKEND_URL=https://api.yourdomain.com
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

**cv-backend/.env (Backend)**
```env
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/portfolio
ADMIN_PASSWORD=your-super-secure-password
FRONTEND_URL=https://yourdomain.com
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
```

## 🔐 Security Best Practices

⚠️ **Critical Security Guidelines:**

✓ **Environment Variables**
- Never commit `.env`, `.env.local` to git
- Use strong, random secrets (min 32 characters)
- Rotate secrets regularly
- Use environment-specific configurations

✓ **Authentication & Authorization**
- JWT tokens expire after set duration
- Always validate tokens on protected routes
- Implement rate limiting on API endpoints
- Use HTTPS only in production

✓ **File Uploads**
- Validate file types (whitelist approach)
- Check file size limits
- Scan for malware
- Store in secure location

✓ **Database Security**
- Use strong MongoDB credentials
- Enable IP whitelist (Atlas)
- Regular backups
- Encrypt sensitive data

✓ **API Security**
- Implement CORS properly
- Use security headers
- Sanitize user input
- Implement request validation

## 🐛 Troubleshooting

### Common Issues

**Port Already in Use**
```bash
# Change port in environment variables
NEXT_PUBLIC_BACKEND_URL=http://localhost:9002
```

**MongoDB Connection Error**
- Verify MongoDB is running
- Check connection string format
- Verify network access (if Atlas)

**CORS Errors**
- Ensure `FRONTEND_URL` matches frontend domain
- Check origin headers
- Verify API endpoints

**JWT Token Errors**
- Verify `JWT_SECRET` matches between frontend and backend
- Check token expiration
- Re-login if needed

## 📞 Support & Contact

For issues, questions, or suggestions:

- **Developer**: Eng. Anglous Rezq
- **Email**: eng.anglousr@gmail.com
- **GitHub**: https://github.com/anglousrezq

## 📄 License

**ISC License** - Feel free to use this project as a reference or template.

---

<div align="center">

### ⭐ Show Your Support

If you found this helpful, please star this repository!

**Made with  by Eng. Anglous Rezq**

*Last Updated: April 2026*

</div>