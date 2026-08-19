import { Router, Request, Response } from 'express';
import { inMemoryStore } from '../db.js';
import { authenticateJWT, AuthenticatedRequest } from '../middleware/auth.js';
import { ISkill } from '../types.js';

const router = Router();

// GET /api/skills - get all skills
router.get('/', (req: Request, res: Response) => {
  try {
    const { category } = req.query;
    let skills = [...inMemoryStore.skills];

    if (category && category !== 'All') {
      skills = skills.filter(s => s.category.toLowerCase() === (category as string).toLowerCase());
    }

    skills.sort((a, b) => a.order - b.order);
    res.json({ success: true, count: skills.length, data: skills });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to retrieve skills', error: error.message });
  }
});

// POST /api/skills - create new skill (Protected)
router.post('/', authenticateJWT, (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name, category, proficiency, iconName, order } = req.body;

    if (!name || !category) {
      res.status(400).json({ success: false, message: 'Skill name and category are required.' });
      return;
    }

    const newSkill: ISkill = {
      id: 'sk-' + Date.now(),
      name: name.trim(),
      category,
      proficiency: Number(proficiency) || 80,
      iconName: iconName || 'Code',
      order: Number(order) || (inMemoryStore.skills.length + 1)
    };

    inMemoryStore.skills.push(newSkill);
    res.status(201).json({ success: true, message: 'Skill created successfully', data: newSkill });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to create skill', error: error.message });
  }
});

// PUT /api/skills/:id - update skill (Protected)
router.put('/:id', authenticateJWT, (req: AuthenticatedRequest, res: Response) => {
  try {
    const index = inMemoryStore.skills.findIndex(s => s.id === req.params.id);
    if (index === -1) {
      res.status(404).json({ success: false, message: 'Skill not found' });
      return;
    }

    const existing = inMemoryStore.skills[index];
    const { name, category, proficiency, iconName, order } = req.body;

    const updatedSkill: ISkill = {
      ...existing,
      name: name !== undefined ? name.trim() : existing.name,
      category: category !== undefined ? category : existing.category,
      proficiency: proficiency !== undefined ? Number(proficiency) : existing.proficiency,
      iconName: iconName !== undefined ? iconName : existing.iconName,
      order: order !== undefined ? Number(order) : existing.order
    };

    inMemoryStore.skills[index] = updatedSkill;
    res.json({ success: true, message: 'Skill updated successfully', data: updatedSkill });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to update skill', error: error.message });
  }
});

// DELETE /api/skills/:id - delete skill (Protected)
router.delete('/:id', authenticateJWT, (req: AuthenticatedRequest, res: Response) => {
  try {
    const index = inMemoryStore.skills.findIndex(s => s.id === req.params.id);
    if (index === -1) {
      res.status(404).json({ success: false, message: 'Skill not found' });
      return;
    }

    const deleted = inMemoryStore.skills.splice(index, 1);
    res.json({ success: true, message: 'Skill deleted successfully', data: deleted[0] });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to delete skill', error: error.message });
  }
});

export default router;
