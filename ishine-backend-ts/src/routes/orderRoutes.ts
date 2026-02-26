import { Router } from 'express';
import { createOrder, getOrders, getOrderById, updateOrderStatus } from '../controllers/order.controller';
import { authenticate, isAdmin } from '../middlewares/auth';

const router = Router();

// All order routes require authentication
router.post('/', authenticate, createOrder);
router.get('/', authenticate, getOrders);
router.get('/:id', authenticate, getOrderById);

// Admin only
router.patch('/:id/status', authenticate, isAdmin, updateOrderStatus);

export default router;
