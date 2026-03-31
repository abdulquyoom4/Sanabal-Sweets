import express from 'express';
import { getItem, addItem, editItem, deleteItem } from '../controller/item.controller.js';
import { verifyToken, isAdmin } from '../middleware/auth.middleware.js';
const router = express.Router();

router.get('/', getItem);
router.post('/admin/menu', verifyToken, isAdmin, addItem);
router.put('/admin/menu', verifyToken, isAdmin, editItem);
router.delete('/admin/menu', verifyToken, isAdmin, deleteItem);
export default router;