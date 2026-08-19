import { Router, Request, Response } from 'express';
import { inMemoryStore } from '../db.js';
import { authenticateJWT, AuthenticatedRequest } from '../middleware/auth.js';
import { IProfile } from '../types.js';

const router = Router();

// GET /api/profile - public profile info
router.get('/', (req: Request, res: Response) => {
  try {
    res.json({ success: true, data: inMemoryStore.profile });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to retrieve profile data', error: error.message });
  }
});

// POST /api/profile/upload-photo - upload or update profile photo (data URL / base64 / URL)
router.post('/upload-photo', (req: Request, res: Response) => {
  try {
    const { photoUrl } = req.body;
    if (!photoUrl || typeof photoUrl !== 'string') {
      res.status(400).json({ success: false, message: 'photoUrl (base64 or valid URL string) is required.' });
      return;
    }

    inMemoryStore.profile.avatarUrl = photoUrl;
    res.json({ 
      success: true, 
      message: 'Profile photo updated successfully', 
      avatarUrl: inMemoryStore.profile.avatarUrl,
      data: inMemoryStore.profile 
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to upload profile photo', error: error.message });
  }
});

// PUT /api/profile - update profile info (Protected)
router.put('/', authenticateJWT, (req: AuthenticatedRequest, res: Response) => {
  try {
    const updates = req.body;
    inMemoryStore.profile = {
      ...inMemoryStore.profile,
      ...updates,
      socials: {
        ...inMemoryStore.profile.socials,
        ...(updates.socials || {})
      },
      stats: {
        ...inMemoryStore.profile.stats,
        ...(updates.stats || {})
      }
    };

    res.json({ success: true, message: 'Profile updated successfully', data: inMemoryStore.profile });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to update profile', error: error.message });
  }
});

export default router;
