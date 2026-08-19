# DevFolio Pro — Full-Stack Developer Portfolio & CMS

A modern, production-ready full-stack personal portfolio and content management system engineered with **React 18**, **Vite**, **Tailwind CSS**, **Node.js**, **Express.js**, and **MongoDB / Mongoose**.

---

## 🌟 Highlights & Features

### 🖥️ Frontend
- **Hero Section**: Dynamic typing title effect, professional summary, quick CTA buttons (View Work, Download Resume, Contact Me), social connectivity, and active opportunity availability indicator badge.
- **About Me**: Career objective, engineering philosophy, technical interests, and dynamic CountUp statistics (Projects Completed, Technologies Learned, Certifications, Years Experience).
- **Skills & Proficiency**: Categorized filterable technical skills (Frontend, Backend, Database, Programming, Tools) with animated proficiency indicators and visual technology icons.
- **Projects Showcase & Interactive Modal**: Filter by category (*All, Web, Java, C/C++, Arduino, Other*) and search bar. Detailed modal view with problem statements, engineered solutions, architectural features, challenges, and live demo / source code links.
- **Experience Timeline**: Career milestones across software engineering internships, open-source initiatives, campus leadership, and freelance work.
- **Education & Qualifications**: Degrees, institutions, CGPA/percentages, and relevant computer science coursework.
- **Certifications & Achievements**: Verified certifications with external credential validation links, hackathon podium honors, and technical awards.
- **ATS Resume Preview & Download**: Print-ready interactive resume modal with 1-click print and PDF generation.
- **Direct Contact Messaging**: Form with validation, state management, animated confetti feedback, and direct persistence to MongoDB via Express REST API.
- **AI Portfolio Assistant**: Context-aware floating chatbot powered by Gemini / intelligent heuristics to answer visitor questions regarding technical skills, projects, and career background.
- **Theme Switcher**: Dark mode with subtle glassmorphism and ambient lighting, with support for light mode.

### ⚙️ Backend & API
- **Express.js Server**: RESTful endpoints for projects, skills, experience, education, achievements, messages, profile, and stats.
- **MongoDB & Mongoose ODM**: Schemas with in-memory fallback for immediate zero-config previews.
- **JWT Authentication**: Protected `/api/admin/*` and CRUD routes with token verification.
- **Admin CMS Portal**: Complete management interface to add, edit, or delete projects, skills, profile information, and review contact messages.

---

## 🚀 Quick Start

### 1. Installation
```bash
# Clone repository
git clone https://github.com/your-username/devfolio-pro.git
cd devfolio-pro

# Install dependencies
npm install
```

### 2. Environment Configuration
Create a `.env` file based on `.env.example`:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your_super_secret_jwt_key
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
GEMINI_API_KEY=your_gemini_api_key
```

### 3. Running Locally
```bash
# Start development server (Full-stack with Vite & Express)
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

---

## 🔐 Admin Dashboard Access

- **Route / Trigger**: Click the **Admin** shield icon in the navigation bar or footer.
- **Default Username**: `admin`
- **Default Password**: `admin123`

---

## 📦 Deployment Guides

### Vercel / Netlify (Frontend)
Run `npm run build` to generate static assets in `dist/`.

### Render / Railway / Cloud Run (Full-Stack)
Set the build command to `npm run build` and start command to `npm start`. Configure `MONGODB_URI` and `JWT_SECRET` in environment variables.

---

## 📄 License
Licensed under the Apache-2.0 License.
