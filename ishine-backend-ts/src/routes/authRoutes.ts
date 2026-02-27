import { Router } from 'express';
import { register, login, logout, forgotPassword, getSession } from '../controllers/auth.controller';
import { authenticate } from '../middlewares/auth';

const router = Router();

router.post('/signup', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/forgot-password', forgotPassword);
router.get('/session', authenticate, getSession);

export default router;
