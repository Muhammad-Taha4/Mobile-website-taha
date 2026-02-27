import { Router } from 'express';
import { getCart, addToCart, updateCart, removeFromCart } from '../controllers/cart.controller';
import { authenticate } from '../middlewares/auth';

const router = Router();

// We temporarily remove `authenticate` for cart so guest carts work (via x-session-id header).
// If a user is logged in, the frontend can pass the token and we can parse it, 
// but require auth middleware strictly denies without token.
// To support both gracefully, we will parse token manually in controller if we need,
// or we make a softAuthenticate middleware. For now, let's keep it simple without strict auth.
router.get('/', getCart);
router.post('/add', addToCart);
router.put('/update/:id', updateCart);
router.delete('/remove/:id', removeFromCart);

export default router;
