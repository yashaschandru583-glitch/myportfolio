import { Router, Request, Response } from 'express';
import { inMemoryStore, getDatabaseStatus } from '../db.js';
import { authenticateJWT, AuthenticatedRequest } from '../middleware/auth.js';

const router = Router();

// GET /api/stats - dashboard statistics & summary
router.get('/', (req: Request, res: Response) => {
  try {
    const unreadMessages = inMemoryStore.messages.filter(m => !m.isRead).length;
    const dbStatus = getDatabaseStatus();

    const categoryBreakdown = inMemoryStore.projects.reduce((acc: Record<string, number>, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + 1;
      return acc;
    }, {});

    const skillCategoryBreakdown = inMemoryStore.skills.reduce((acc: Record<string, number>, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + 1;
      return acc;
    }, {});

    res.json({
      success: true,
      data: {
        totalProjects: inMemoryStore.projects.length,
        featuredProjects: inMemoryStore.projects.filter(p => p.featured).length,
        totalSkills: inMemoryStore.skills.length,
        totalExperience: inMemoryStore.experience.length,
        totalEducation: inMemoryStore.education.length,
        totalAchievements: inMemoryStore.achievements.length,
        totalMessages: inMemoryStore.messages.length,
        unreadMessages,
        categoryBreakdown,
        skillCategoryBreakdown,
        database: dbStatus
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to retrieve stats', error: error.message });
  }
});

export default router;
