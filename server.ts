import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

// Load environment variables
dotenv.config();

// Database & Seed Initializer
import { initDatabase } from './server/db.js';

// Route Handlers
import authRoutes from './server/routes/auth.js';
import projectRoutes from './server/routes/projects.js';
import skillRoutes from './server/routes/skills.js';
import experienceRoutes from './server/routes/experience.js';
import educationRoutes from './server/routes/education.js';
import achievementRoutes from './server/routes/achievements.js';
import messageRoutes from './server/routes/messages.js';
import profileRoutes from './server/routes/profile.js';
import statsRoutes from './server/routes/stats.js';
import aiRoutes from './server/routes/ai.js';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Initialize Database (MongoDB / fallback store)
  await initDatabase();

  // Basic Security & Parsing Middlewares
  app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // REST API Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/projects', projectRoutes);
  app.use('/api/skills', skillRoutes);
  app.use('/api/experience', experienceRoutes);
  app.use('/api/education', educationRoutes);
  app.use('/api/achievements', achievementRoutes);
  app.use('/api/messages', messageRoutes);
  app.use('/api/profile', profileRoutes);
  app.use('/api/stats', statsRoutes);
  app.use('/api/ai', aiRoutes);

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'DevFolio Pro API Server',
      timestamp: new Date().toISOString()
    });
  });

  // Vite middleware for development vs Production static serving
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 DevFolio Pro Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Fatal error starting server:', err);
  process.exit(1);
});
