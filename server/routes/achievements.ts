import { Router, Request, Response } from 'express';
import { inMemoryStore } from '../db.js';
import { authenticateJWT, AuthenticatedRequest } from '../middleware/auth.js';
import { IAchievement } from '../types.js';

const router = Router();

// GET /api/achievements - get all achievements & certifications
router.get('/', (req: Request, res: Response) => {
  try {
    const achievements = [...inMemoryStore.achievements].sort((a, b) => a.order - b.order);
    res.json({ success: true, count: achievements.length, data: achievements });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to retrieve achievements', error: error.message });
  }
});

// POST /api/achievements - create achievement (Protected)
router.post('/', authenticateJWT, (req: AuthenticatedRequest, res: Response) => {
  try {
    const { title, organization, type, date, imageUrl, verificationUrl, description, order } = req.body;

    if (!title || !organization) {
      res.status(400).json({ success: false, message: 'Title and organization are required.' });
      return;
    }

    const newAch: IAchievement = {
      id: 'ach-' + Date.now(),
      title: title.trim(),
      organization: organization.trim(),
      type: type || 'Certification',
      date: date || '',
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80',
      verificationUrl: verificationUrl || '',
      description: description || '',
      order: Number(order) || (inMemoryStore.achievements.length + 1)
    };

    inMemoryStore.achievements.push(newAch);
    res.status(201).json({ success: true, message: 'Achievement created', data: newAch });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to create achievement', error: error.message });
  }
});

// PUT /api/achievements/:id - update achievement (Protected)
router.put('/:id', authenticateJWT, (req: AuthenticatedRequest, res: Response) => {
  try {
    const index = inMemoryStore.achievements.findIndex(a => a.id === req.params.id);
    if (index === -1) {
      res.status(404).json({ success: false, message: 'Achievement not found' });
      return;
    }

    const existing = inMemoryStore.achievements[index];
    const { title, organization, type, date, imageUrl, verificationUrl, description, order } = req.body;

    const updatedAch: IAchievement = {
      ...existing,
      title: title !== undefined ? title.trim() : existing.title,
      organization: organization !== undefined ? organization.trim() : existing.organization,
      type: type !== undefined ? type : existing.type,
      date: date !== undefined ? date : existing.date,
      imageUrl: imageUrl !== undefined ? imageUrl : existing.imageUrl,
      verificationUrl: verificationUrl !== undefined ? verificationUrl : existing.verificationUrl,
      description: description !== undefined ? description : existing.description,
      order: order !== undefined ? Number(order) : existing.order
    };

    inMemoryStore.achievements[index] = updatedAch;
    res.json({ success: true, message: 'Achievement updated', data: updatedAch });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to update achievement', error: error.message });
  }
});

// DELETE /api/achievements/:id - delete achievement (Protected)
router.delete('/:id', authenticateJWT, (req: AuthenticatedRequest, res: Response) => {
  try {
    const index = inMemoryStore.achievements.findIndex(a => a.id === req.params.id);
    if (index === -1) {
      res.status(404).json({ success: false, message: 'Achievement not found' });
      return;
    }

    const deleted = inMemoryStore.achievements.splice(index, 1);
    res.json({ success: true, message: 'Achievement deleted', data: deleted[0] });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to delete achievement', error: error.message });
  }
});

export default router;
