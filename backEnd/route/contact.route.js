import express from 'express';
import { Contact, getMessages } from '../controller/contact.controller.js';
import { verifyToken, isAdmin } from '../middleware/auth.middleware.js';
const router = express.Router();

router.post('/', Contact);
router.get('/admin/messages', verifyToken, isAdmin, getMessages);

export default router;
