import { Router } from 'express';
import { register, login, getMe } from '../controllers/auth.controller';
import { getUsers, updateUser, deleteUser } from '../controllers/user.controller';
import { authenticate, isAdmin } from '../middlewares/auth';

const router = Router();

// Auth routes
router.post('/register', register);
router.post('/login', login);
router.get('/me', authenticate, getMe);

// Admin routes
router.get('/', authenticate, isAdmin, getUsers);
router.patch('/:id', authenticate, isAdmin, updateUser);
router.delete('/:id', authenticate, isAdmin, deleteUser);

export default router;
