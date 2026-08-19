import { Router, Request, Response } from 'express';
import { inMemoryStore } from '../db.js';
import { authenticateJWT, AuthenticatedRequest } from '../middleware/auth.js';
import { IExperience } from '../types.js';

const router = Router();

// GET /api/experience - get all experience entries
router.get('/', (req: Request, res: Response) => {
  try {
    const experience = [...inMemoryStore.experience].sort((a, b) => a.order - b.order);
    res.json({ success: true, count: experience.length, data: experience });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to retrieve experience', error: error.message });
  }
});

// POST /api/experience - create new experience (Protected)
router.post('/', authenticateJWT, (req: AuthenticatedRequest, res: Response) => {
  try {
    const { role, organization, type, location, startDate, endDate, current, description, achievements, technologies, order } = req.body;

    if (!role || !organization || !description) {
      res.status(400).json({ success: false, message: 'Role, organization, and description are required.' });
      return;
    }

    const newExp: IExperience = {
      id: 'exp-' + Date.now(),
      role: role.trim(),
      organization: organization.trim(),
      type: type || 'Internship',
      location: location || '',
      startDate: startDate || '',
      endDate: current ? 'Present' : (endDate || ''),
      current: Boolean(current),
      description: description.trim(),
      achievements: Array.isArray(achievements) ? achievements : (achievements ? achievements.split('\n').filter(Boolean) : []),
      technologies: Array.isArray(technologies) ? technologies : (technologies ? technologies.split(',').map((t: string) => t.trim()) : []),
      order: Number(order) || (inMemoryStore.experience.length + 1)
    };

    inMemoryStore.experience.push(newExp);
    res.status(201).json({ success: true, message: 'Experience entry created', data: newExp });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to create experience entry', error: error.message });
  }
});

// PUT /api/experience/:id - update experience (Protected)
router.put('/:id', authenticateJWT, (req: AuthenticatedRequest, res: Response) => {
  try {
    const index = inMemoryStore.experience.findIndex(e => e.id === req.params.id);
    if (index === -1) {
      res.status(404).json({ success: false, message: 'Experience entry not found' });
      return;
    }

    const existing = inMemoryStore.experience[index];
    const { role, organization, type, location, startDate, endDate, current, description, achievements, technologies, order } = req.body;

    const updatedExp: IExperience = {
      ...existing,
      role: role !== undefined ? role.trim() : existing.role,
      organization: organization !== undefined ? organization.trim() : existing.organization,
      type: type !== undefined ? type : existing.type,
      location: location !== undefined ? location : existing.location,
      startDate: startDate !== undefined ? startDate : existing.startDate,
      endDate: current ? 'Present' : (endDate !== undefined ? endDate : existing.endDate),
      current: current !== undefined ? Boolean(current) : existing.current,
      description: description !== undefined ? description.trim() : existing.description,
      achievements: achievements !== undefined ? (Array.isArray(achievements) ? achievements : achievements.split('\n').filter(Boolean)) : existing.achievements,
      technologies: technologies !== undefined ? (Array.isArray(technologies) ? technologies : technologies.split(',').map((t: string) => t.trim())) : existing.technologies,
      order: order !== undefined ? Number(order) : existing.order
    };

    inMemoryStore.experience[index] = updatedExp;
    res.json({ success: true, message: 'Experience updated', data: updatedExp });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to update experience', error: error.message });
  }
});

// DELETE /api/experience/:id - delete experience (Protected)
router.delete('/:id', authenticateJWT, (req: AuthenticatedRequest, res: Response) => {
  try {
    const index = inMemoryStore.experience.findIndex(e => e.id === req.params.id);
    if (index === -1) {
      res.status(404).json({ success: false, message: 'Experience entry not found' });
      return;
    }

    const deleted = inMemoryStore.experience.splice(index, 1);
    res.json({ success: true, message: 'Experience entry deleted', data: deleted[0] });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to delete experience entry', error: error.message });
  }
});

export default router;
