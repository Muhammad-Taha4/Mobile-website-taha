import { Router } from 'express';
import { getAdminStats } from '../controllers/admin.controller';
import { getBrands, getAllCategories, getModels } from '../controllers/taxonomy.controller';
import { authenticate, isAdmin } from '../middlewares/auth';

const router = Router();

router.get('/stats', authenticate, isAdmin, getAdminStats);
router.get('/taxonomy/brands', authenticate, isAdmin, getBrands);
router.get('/taxonomy/categories', authenticate, isAdmin, getAllCategories);
router.get('/taxonomy/models', authenticate, isAdmin, getModels);

export default router;
