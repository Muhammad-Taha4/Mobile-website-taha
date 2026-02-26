import { Router } from 'express';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/product.controller';
import { authenticate, isAdmin } from '../middlewares/auth';

const router = Router();

// Public
router.get('/', getProducts);
router.get('/:id', getProductById);

// Admin only
router.post('/', authenticate, isAdmin, createProduct);
router.put('/:id', authenticate, isAdmin, updateProduct);
router.delete('/:id', authenticate, isAdmin, deleteProduct);

export default router;
