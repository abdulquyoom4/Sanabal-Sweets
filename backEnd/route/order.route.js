import express from 'express';
import { getOrder, placeOrder } from '../controller/order.controller.js';
import { verifyToken, isAdmin } from '../middleware/auth.middleware.js';
const router = express.Router();

router.get('/getorder', verifyToken, isAdmin, getOrder);
router.post('/placeorder', verifyToken, placeOrder);

export default router;