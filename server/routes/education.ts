import { Router, Request, Response } from 'express';
import { inMemoryStore } from '../db.js';
import { authenticateJWT, AuthenticatedRequest } from '../middleware/auth.js';
import { IEducation } from '../types.js';

const router = Router();

// GET /api/education - get all education entries
router.get('/', (req: Request, res: Response) => {
  try {
    const education = [...inMemoryStore.education].sort((a, b) => a.order - b.order);
    res.json({ success: true, count: education.length, data: education });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to retrieve education entries', error: error.message });
  }
});

// POST /api/education - create education (Protected)
router.post('/', authenticateJWT, (req: AuthenticatedRequest, res: Response) => {
  try {
    const { degree, fieldOfStudy, college, university, startYear, endYear, cgpaOrPercentage, relevantCoursework, order } = req.body;

    if (!degree || !college) {
      res.status(400).json({ success: false, message: 'Degree and college name are required.' });
      return;
    }

    const newEdu: IEducation = {
      id: 'edu-' + Date.now(),
      degree: degree.trim(),
      fieldOfStudy: (fieldOfStudy || '').trim(),
      college: college.trim(),
      university: (university || '').trim(),
      startYear: startYear || '',
      endYear: endYear || '',
      cgpaOrPercentage: cgpaOrPercentage || '',
      relevantCoursework: Array.isArray(relevantCoursework) ? relevantCoursework : (relevantCoursework ? relevantCoursework.split(',').map((c: string) => c.trim()) : []),
      order: Number(order) || (inMemoryStore.education.length + 1)
    };

    inMemoryStore.education.push(newEdu);
    res.status(201).json({ success: true, message: 'Education entry created', data: newEdu });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to create education entry', error: error.message });
  }
});

// PUT /api/education/:id - update education (Protected)
router.put('/:id', authenticateJWT, (req: AuthenticatedRequest, res: Response) => {
  try {
    const index = inMemoryStore.education.findIndex(e => e.id === req.params.id);
    if (index === -1) {
      res.status(404).json({ success: false, message: 'Education entry not found' });
      return;
    }

    const existing = inMemoryStore.education[index];
    const { degree, fieldOfStudy, college, university, startYear, endYear, cgpaOrPercentage, relevantCoursework, order } = req.body;

    const updatedEdu: IEducation = {
      ...existing,
      degree: degree !== undefined ? degree.trim() : existing.degree,
      fieldOfStudy: fieldOfStudy !== undefined ? fieldOfStudy.trim() : existing.fieldOfStudy,
      college: college !== undefined ? college.trim() : existing.college,
      university: university !== undefined ? university.trim() : existing.university,
      startYear: startYear !== undefined ? startYear : existing.startYear,
      endYear: endYear !== undefined ? endYear : existing.endYear,
      cgpaOrPercentage: cgpaOrPercentage !== undefined ? cgpaOrPercentage : existing.cgpaOrPercentage,
      relevantCoursework: relevantCoursework !== undefined ? (Array.isArray(relevantCoursework) ? relevantCoursework : relevantCoursework.split(',').map((c: string) => c.trim())) : existing.relevantCoursework,
      order: order !== undefined ? Number(order) : existing.order
    };

    inMemoryStore.education[index] = updatedEdu;
    res.json({ success: true, message: 'Education updated', data: updatedEdu });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to update education', error: error.message });
  }
});

// DELETE /api/education/:id - delete education (Protected)
router.delete('/:id', authenticateJWT, (req: AuthenticatedRequest, res: Response) => {
  try {
    const index = inMemoryStore.education.findIndex(e => e.id === req.params.id);
    if (index === -1) {
      res.status(404).json({ success: false, message: 'Education entry not found' });
      return;
    }

    const deleted = inMemoryStore.education.splice(index, 1);
    res.json({ success: true, message: 'Education entry deleted', data: deleted[0] });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to delete education entry', error: error.message });
  }
});

export default router;
