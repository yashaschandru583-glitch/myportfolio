import { Router, Request, Response } from 'express';
import { inMemoryStore } from '../db.js';
import { authenticateJWT, AuthenticatedRequest } from '../middleware/auth.js';
import { IProject } from '../types.js';

const router = Router();

// GET /api/projects - list all projects (with optional category filter)
router.get('/', (req: Request, res: Response) => {
  try {
    const { category, featured } = req.query;
    let projects = [...inMemoryStore.projects];

    if (category && category !== 'All') {
      projects = projects.filter(p => p.category.toLowerCase() === (category as string).toLowerCase());
    }

    if (featured === 'true') {
      projects = projects.filter(p => p.featured);
    }

    // Sort by order ascending
    projects.sort((a, b) => a.order - b.order);

    res.json({ success: true, count: projects.length, data: projects });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to retrieve projects', error: error.message });
  }
});

// GET /api/projects/:id - single project details
router.get('/:id', (req: Request, res: Response) => {
  try {
    const project = inMemoryStore.projects.find(p => p.id === req.params.id);
    if (!project) {
      res.status(404).json({ success: false, message: 'Project not found' });
      return;
    }
    res.json({ success: true, data: project });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to retrieve project', error: error.message });
  }
});

// POST /api/projects - create a new project (Protected)
router.post('/', authenticateJWT, (req: AuthenticatedRequest, res: Response) => {
  try {
    const {
      title,
      category,
      shortDescription,
      image,
      technologies,
      githubUrl,
      liveDemoUrl,
      problemStatement,
      solution,
      features,
      challenges,
      results,
      featured,
      order
    } = req.body;

    if (!title || !shortDescription) {
      res.status(400).json({ success: false, message: 'Title and short description are required.' });
      return;
    }

    const newProject: IProject = {
      id: 'proj-' + Date.now(),
      title: title.trim(),
      category: category || 'Web',
      shortDescription: shortDescription.trim(),
      image: image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
      technologies: Array.isArray(technologies) ? technologies : (technologies ? technologies.split(',').map((t: string) => t.trim()) : ['React', 'Node.js']),
      githubUrl: githubUrl || '',
      liveDemoUrl: liveDemoUrl || '',
      problemStatement: problemStatement || '',
      solution: solution || '',
      features: Array.isArray(features) ? features : (features ? features.split('\n').filter(Boolean) : []),
      challenges: challenges || '',
      results: results || '',
      featured: Boolean(featured),
      order: Number(order) || (inMemoryStore.projects.length + 1),
      createdAt: new Date().toISOString()
    };

    inMemoryStore.projects.push(newProject);

    res.status(201).json({ success: true, message: 'Project created successfully', data: newProject });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to create project', error: error.message });
  }
});

// PUT /api/projects/:id - update an existing project (Protected)
router.put('/:id', authenticateJWT, (req: AuthenticatedRequest, res: Response) => {
  try {
    const index = inMemoryStore.projects.findIndex(p => p.id === req.params.id);
    if (index === -1) {
      res.status(404).json({ success: false, message: 'Project not found' });
      return;
    }

    const existing = inMemoryStore.projects[index];
    const {
      title,
      category,
      shortDescription,
      image,
      technologies,
      githubUrl,
      liveDemoUrl,
      problemStatement,
      solution,
      features,
      challenges,
      results,
      featured,
      order
    } = req.body;

    const updatedProject: IProject = {
      ...existing,
      title: title !== undefined ? title.trim() : existing.title,
      category: category !== undefined ? category : existing.category,
      shortDescription: shortDescription !== undefined ? shortDescription.trim() : existing.shortDescription,
      image: image !== undefined ? image : existing.image,
      technologies: technologies !== undefined ? (Array.isArray(technologies) ? technologies : technologies.split(',').map((t: string) => t.trim())) : existing.technologies,
      githubUrl: githubUrl !== undefined ? githubUrl : existing.githubUrl,
      liveDemoUrl: liveDemoUrl !== undefined ? liveDemoUrl : existing.liveDemoUrl,
      problemStatement: problemStatement !== undefined ? problemStatement : existing.problemStatement,
      solution: solution !== undefined ? solution : existing.solution,
      features: features !== undefined ? (Array.isArray(features) ? features : features.split('\n').filter(Boolean)) : existing.features,
      challenges: challenges !== undefined ? challenges : existing.challenges,
      results: results !== undefined ? results : existing.results,
      featured: featured !== undefined ? Boolean(featured) : existing.featured,
      order: order !== undefined ? Number(order) : existing.order
    };

    inMemoryStore.projects[index] = updatedProject;

    res.json({ success: true, message: 'Project updated successfully', data: updatedProject });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to update project', error: error.message });
  }
});

// DELETE /api/projects/:id - delete a project (Protected)
router.delete('/:id', authenticateJWT, (req: AuthenticatedRequest, res: Response) => {
  try {
    const index = inMemoryStore.projects.findIndex(p => p.id === req.params.id);
    if (index === -1) {
      res.status(404).json({ success: false, message: 'Project not found' });
      return;
    }

    const deleted = inMemoryStore.projects.splice(index, 1);
    res.json({ success: true, message: 'Project deleted successfully', data: deleted[0] });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to delete project', error: error.message });
  }
});

export default router;
