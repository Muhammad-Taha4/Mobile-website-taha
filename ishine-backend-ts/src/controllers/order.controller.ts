import { Request, Response } from 'express';
import { prisma } from '../config/prisma';

/**
 * POST /api/orders
 * Create a new order from the cart.
 */
export const createOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const { items, shippingAddress, shippingCity, shippingState, shippingZip, shippingCountry, shippingMethod, paymentMethod, notes } = req.body;

        if (!items || items.length === 0) {
            res.status(400).json({ message: 'Order must contain at least one item.' });
            return;
        }

        // Calculate totals
        let subtotal = 0;
        const orderItems: { productId: string; quantity: number; unitPrice: number; totalPrice: number }[] = [];

        for (const item of items) {
            const product = await prisma.product.findUnique({ where: { id: item.productId } });
            if (!product) {
                res.status(404).json({ message: `Product ${item.productId} not found.` });
                return;
            }
            if (product.stock < item.quantity) {
                res.status(400).json({ message: `Insufficient stock for ${product.name}.` });
                return;
            }

            const unitPrice = Number(product.wholesalePrice);
            const totalPrice = unitPrice * item.quantity;
            subtotal += totalPrice;

            orderItems.push({
                productId: item.productId,
                quantity: item.quantity,
                unitPrice,
                totalPrice,
            });
        }

        const tax = subtotal * 0.08; // 8% tax
        const shippingCost = subtotal > 500 ? 0 : 25; // Free shipping over $500
        const totalAmount = subtotal + tax + shippingCost;

        // Generate order number
        const date = new Date();
        const dateStr = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
        const orderCount = await prisma.order.count();
        const orderNumber = `ISW-${dateStr}-${String(orderCount + 1).padStart(4, '0')}`;

        // Create order with items in a transaction
        const order = await prisma.$transaction(async (tx: any) => {
            const newOrder = await tx.order.create({
                data: {
                    orderNumber,
                    userId: req.user!.id,
                    subtotal,
                    tax,
                    shippingCost,
                    totalAmount,
                    shippingAddress,
                    shippingCity,
                    shippingState,
                    shippingZip,
                    shippingCountry: shippingCountry || 'US',
                    shippingMethod,
                    paymentMethod,
                    notes,
                    items: {
                        create: orderItems,
                    },
                },
                include: { items: { include: { product: true } } },
            });

            // Decrement stock
            for (const item of orderItems) {
                await tx.product.update({
                    where: { id: item.productId },
                    data: { stock: { decrement: item.quantity } },
                });
            }

            return newOrder;
        });

        res.status(201).json({ message: 'Order placed successfully', order });
    } catch (error) {
        console.error('CreateOrder error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * GET /api/orders
 * List orders (admin: all, customer: own orders).
 */
export const getOrders = async (req: Request, res: Response): Promise<void> => {
    try {
        const { page = '1', limit = '20', status } = req.query;
        const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

        const where: any = {};
        if (req.user!.role !== 'ADMIN') where.userId = req.user!.id;
        if (status) where.status = status;

        const [orders, total] = await Promise.all([
            prisma.order.findMany({
                where,
                include: {
                    items: { include: { product: { select: { name: true, sku: true, images: true } } } },
                    user: { select: { firstName: true, lastName: true, email: true, businessName: true } },
                },
                skip,
                take: parseInt(limit as string),
                orderBy: { createdAt: 'desc' },
            }),
            prisma.order.count({ where }),
        ]);

        res.json({
            orders,
            pagination: {
                page: parseInt(page as string),
                limit: parseInt(limit as string),
                total,
                totalPages: Math.ceil(total / parseInt(limit as string)),
            },
        });
    } catch (error) {
        console.error('GetOrders error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * GET /api/orders/:id
 */
export const getOrderById = async (req: Request, res: Response): Promise<void> => {
    try {
        const where: any = { id: req.params.id };
        if (req.user!.role !== 'ADMIN') where.userId = req.user!.id;

        const order = await prisma.order.findFirst({
            where,
            include: {
                items: { include: { product: true } },
                user: { select: { firstName: true, lastName: true, email: true, businessName: true } },
            },
        });

        if (!order) {
            res.status(404).json({ message: 'Order not found.' });
            return;
        }

        res.json(order);
    } catch (error) {
        console.error('GetOrderById error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * PATCH /api/orders/:id/status (Admin only)
 */
export const updateOrderStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const { status } = req.body;

        const order = await prisma.order.update({
            where: { id: req.params.id as string },
            data: { status },
        });

        res.json({ message: `Order status updated to ${status}`, order });
    } catch (error) {
        console.error('UpdateOrderStatus error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
