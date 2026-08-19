import { Router, Request, Response } from 'express';
import { inMemoryStore } from '../db.js';
import { authenticateJWT, AuthenticatedRequest } from '../middleware/auth.js';
import { IMessage } from '../types.js';

const router = Router();

// POST /api/messages - submit new contact message (Public)
router.post('/', (req: Request, res: Response) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      res.status(400).json({ success: false, message: 'Please provide your name, email, and message.' });
      return;
    }

    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
      return;
    }

    const newMessage: IMessage = {
      id: 'msg-' + Date.now(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : '',
      subject: subject ? subject.trim() : 'Portfolio Inquiry',
      message: message.trim(),
      isRead: false,
      createdAt: new Date().toISOString()
    };

    inMemoryStore.messages.unshift(newMessage);

    res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been sent successfully.',
      data: {
        id: newMessage.id,
        createdAt: newMessage.createdAt
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to send message', error: error.message });
  }
});

// GET /api/messages - get all messages (Protected)
router.get('/', authenticateJWT, (req: AuthenticatedRequest, res: Response) => {
  try {
    res.json({
      success: true,
      count: inMemoryStore.messages.length,
      unreadCount: inMemoryStore.messages.filter(m => !m.isRead).length,
      data: inMemoryStore.messages
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to retrieve messages', error: error.message });
  }
});

// PUT /api/messages/:id/read - toggle read state (Protected)
router.put('/:id/read', authenticateJWT, (req: AuthenticatedRequest, res: Response) => {
  try {
    const message = inMemoryStore.messages.find(m => m.id === req.params.id);
    if (!message) {
      res.status(404).json({ success: false, message: 'Message not found' });
      return;
    }

    const { isRead } = req.body;
    message.isRead = isRead !== undefined ? Boolean(isRead) : !message.isRead;

    res.json({ success: true, message: `Message marked as ${message.isRead ? 'read' : 'unread'}`, data: message });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to update message status', error: error.message });
  }
});

// DELETE /api/messages/:id - delete message (Protected)
router.delete('/:id', authenticateJWT, (req: AuthenticatedRequest, res: Response) => {
  try {
    const index = inMemoryStore.messages.findIndex(m => m.id === req.params.id);
    if (index === -1) {
      res.status(404).json({ success: false, message: 'Message not found' });
      return;
    }

    const deleted = inMemoryStore.messages.splice(index, 1);
    res.json({ success: true, message: 'Message deleted successfully', data: deleted[0] });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to delete message', error: error.message });
  }
});

export default router;
