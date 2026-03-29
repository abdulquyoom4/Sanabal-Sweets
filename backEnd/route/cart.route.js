import express from 'express';
import { getCart, addCart, deleteCart } from '../controller/cart.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';
const router = express.Router();

router.get('/', verifyToken, getCart);
router.post('/', verifyToken, addCart);
router.delete('/:id', verifyToken, deleteCart);
export default router;