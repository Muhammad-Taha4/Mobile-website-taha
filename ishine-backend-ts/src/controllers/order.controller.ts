import { Request, Response } from 'express';
import { prisma } from '../config/prisma';

export const createOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const { items, shippingAddress, shippingMethod, paymentMethod, notes } = req.body;

        if (!items || items.length === 0) {
            res.status(400).json({ message: 'Order must contain at least one item.' });
            return;
        }

        let subtotal = 0;
        const orderItems: any[] = [];

        for (const item of items) {
            const productId = parseInt(item.productId);
            const product = await prisma.product.findUnique({ where: { id: productId } });

            if (!product) {
                res.status(404).json({ message: `Product ${productId} not found.` });
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
                productId: product.id,
                productName: product.name,
                productSku: product.sku,
                productImage: Array.isArray(product.images) && product.images.length > 0 ? (product.images as any)[0] : null,
                quantity: item.quantity,
                unitPrice,
                totalPrice,
            });
        }

        const tax = subtotal * 0.08;
        const shipping = subtotal > 500 ? 0 : 25;
        const total = subtotal + tax + shipping;

        const date = new Date();
        const dateStr = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
        const orderCount = await prisma.order.count();
        const orderNumber = `ISW-${dateStr}-${String(orderCount + 1).padStart(4, '0')}`;

        const order = await prisma.$transaction(async (tx: any) => {
            const newOrder = await tx.order.create({
                data: {
                    orderNumber,
                    userId: (req as any).user.id,
                    subtotal,
                    tax,
                    shipping,
                    total,
                    shippingAddress,
                    shippingMethod: shippingMethod || 'standard',
                    paymentMethod: paymentMethod || 'credit_card',
                    notes,
                    items: {
                        create: orderItems,
                    },
                },
                include: { items: { include: { product: true } } },
            });

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

export const getOrders = async (req: Request, res: Response): Promise<void> => {
    try {
        const { page = '1', limit = '20', status } = req.query;
        const take = parseInt(limit as string);
        const skip = (parseInt(page as string) - 1) * take;

        const where: any = {};
        if ((req as any).user.role !== 'admin') where.userId = (req as any).user.id;
        if (status) where.status = status;

        const [orders, totalRecords] = await Promise.all([
            prisma.order.findMany({
                where,
                include: {
                    items: { include: { product: { select: { name: true, sku: true, images: true } } } },
                    user: { select: { name: true, email: true, businessName: true } },
                },
                skip,
                take,
                orderBy: { createdAt: 'desc' },
            }),
            prisma.order.count({ where }),
        ]);

        res.json({
            orders,
            pagination: {
                page: parseInt(page as string),
                limit: take,
                total: totalRecords,
                totalPages: Math.ceil(totalRecords / take),
            },
        });
    } catch (error) {
        console.error('GetOrders error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getOrderById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id as string);
        if (isNaN(id)) { res.status(400).json({ message: 'Invalid order ID' }); return; }

        const where: any = { id };
        if ((req as any).user.role !== 'admin') where.userId = (req as any).user.id;

        const order = await prisma.order.findFirst({
            where,
            include: {
                items: { include: { product: true } },
                user: { select: { name: true, email: true, businessName: true } },
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

export const updateOrderStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id as string);
        const { status } = req.body;

        if (isNaN(id)) { res.status(400).json({ message: 'Invalid order ID' }); return; }

        const order = await prisma.order.update({
            where: { id },
            data: { status },
        });

        res.json({ message: `Order status updated to ${status}`, order });
    } catch (error) {
        console.error('UpdateOrderStatus error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const trackOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const { orderNumber, email } = req.query;

        if (!orderNumber || !email) {
            res.status(400).json({ message: 'Order number and email are required' });
            return;
        }

        const order = await prisma.order.findFirst({
            where: {
                orderNumber: orderNumber as string,
                user: { email: email as string }
            },
            include: {
                user: { select: { name: true } },
                items: true
            }
        });

        if (!order) {
            res.status(404).json({ message: 'Order not found or email mismatch' });
            return;
        }

        res.json({
            orderNumber: order.orderNumber,
            status: order.status,
            createdAt: order.createdAt,
            shippingMethod: order.shippingMethod,
            trackingNumber: order.trackingNumber,
            subtotal: order.subtotal,
            total: order.total
        });
    } catch (error) {
        console.error('TrackOrder error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
