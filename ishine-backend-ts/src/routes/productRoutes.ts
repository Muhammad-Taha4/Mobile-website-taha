import { Router } from 'express';
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductBySlug,
    getFeaturedProducts,
    addProductReview
} from '../controllers/product.controller';
import { authenticate, isAdmin } from '../middlewares/auth';

const router = Router();

// Public
router.get('/', getProducts);
router.get('/featured', getFeaturedProducts);
router.get('/slug/:slug', getProductBySlug);
router.get('/:id', getProductById);

// Protected
router.post('/:id/reviews', authenticate, addProductReview);

// Admin only
router.post('/', authenticate, isAdmin, createProduct);
router.put('/:id', authenticate, isAdmin, updateProduct);
router.delete('/:id', authenticate, isAdmin, deleteProduct);

export default router;
