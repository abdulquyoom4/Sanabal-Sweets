import express from 'express';
import { LogIn, SignUp, Me, Logout } from '../controller/user.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';
const router = express.Router();

router.post('/signup', SignUp);
router.post('/login', LogIn);
router.post('/logout', verifyToken, Logout);
router.get('/me', verifyToken, Me);

export default router;