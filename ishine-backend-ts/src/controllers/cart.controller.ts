import { Request, Response } from 'express';
import { prisma } from '../config/prisma';

// Helper to get user/session identifier
const getCartIdentifier = (req: Request) => {
    const userId = (req as any).user?.id as number | undefined;
    const sessionId = req.headers['x-session-id'] as string | undefined;
    return { userId, sessionId: !userId ? sessionId : undefined };
};

export const getCart = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, sessionId } = getCartIdentifier(req);

        if (!userId && !sessionId) {
            res.json({ items: [] });
            return;
        }

        const items = await prisma.cartItem.findMany({
            where: userId ? { userId } : { sessionId },
            include: {
                product: {
                    select: { id: true, name: true, sku: true, wholesalePrice: true, stock: true, images: true, isNew: true, qualityGrade: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        res.json({ items });
    } catch (error) {
        console.error('GetCart error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const addToCart = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, sessionId } = getCartIdentifier(req);
        const { productId, quantity = 1 } = req.body;

        if (!userId && !sessionId) {
            res.status(400).json({ message: 'Session ID or Auth required' });
            return;
        }

        const pid = parseInt(productId);
        if (isNaN(pid)) {
            res.status(400).json({ message: 'Invalid product ID' });
            return;
        }

        const product = await prisma.product.findUnique({ where: { id: pid } });
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }

        // Check stock
        if (product.stock < quantity) {
            res.status(400).json({ message: 'Insufficient stock' });
            return;
        }

        // Upsert cart item
        const existingItem = await prisma.cartItem.findFirst({
            where: userId ? { userId, productId: pid } : { sessionId, productId: pid }
        });

        let cartItem;
        if (existingItem) {
            cartItem = await prisma.cartItem.update({
                where: { id: existingItem.id },
                data: { quantity: existingItem.quantity + quantity },
                include: { product: true }
            });
        } else {
            cartItem = await prisma.cartItem.create({
                data: {
                    userId,
                    sessionId,
                    productId: pid,
                    quantity
                },
                include: { product: true }
            });
        }

        res.status(201).json({ message: 'Item added to cart', cartItem });
    } catch (error) {
        console.error('AddToCart error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateCart = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, sessionId } = getCartIdentifier(req);
        const { quantity } = req.body;
        const id = parseInt(req.params.id as string);

        if (isNaN(id) || typeof quantity !== 'number' || quantity < 1) {
            res.status(400).json({ message: 'Invalid input' });
            return;
        }

        const cartItemMatch = await prisma.cartItem.findFirst({
            where: { id, ...(userId ? { userId } : { sessionId }) }
        });

        if (!cartItemMatch) {
            res.status(404).json({ message: 'Cart item not found' });
            return;
        }

        const product = await prisma.product.findUnique({ where: { id: cartItemMatch.productId } });
        if (product && product.stock < quantity) {
            res.status(400).json({ message: 'Insufficient stock' });
            return;
        }

        const updatedItem = await prisma.cartItem.update({
            where: { id },
            data: { quantity },
            include: { product: true }
        });

        res.json({ message: 'Cart updated', cartItem: updatedItem });
    } catch (error) {
        console.error('UpdateCart error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const removeFromCart = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, sessionId } = getCartIdentifier(req);
        const id = parseInt(req.params.id as string);

        if (isNaN(id)) {
            res.status(400).json({ message: 'Invalid cart item ID' });
            return;
        }

        const existingItem = await prisma.cartItem.findFirst({
            where: { id, ...(userId ? { userId } : { sessionId }) }
        });

        if (!existingItem) {
            res.status(404).json({ message: 'Cart item not found or unauthorized' });
            return;
        }

        await prisma.cartItem.delete({
            where: { id }
        });

        res.json({ message: 'Item removed from cart' });
    } catch (error) {
        console.error('RemoveFromCart error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
