import { Router } from 'express';
import { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory } from '../controllers/category.controller';
import { authenticate, isAdmin } from '../middlewares/auth';

const router = Router();

// Public
router.get('/', getCategories);
router.get('/:id', getCategoryById);

// Admin only
router.post('/', authenticate, isAdmin, createCategory);
router.put('/:id', authenticate, isAdmin, updateCategory);
router.delete('/:id', authenticate, isAdmin, deleteCategory);

export default router;
