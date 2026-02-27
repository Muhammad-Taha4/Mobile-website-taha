import { Request, Response } from 'express';
import { prisma } from '../config/prisma';

export const getAdminStats = async (req: Request, res: Response): Promise<void> => {
    try {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const [
            revenue,
            orderCount,
            userCount,
            pendingOrders,
            recentActivity
        ] = await Promise.all([
            // Revenue (30d)
            prisma.order.aggregate({
                where: { createdAt: { gte: thirtyDaysAgo }, status: { not: 'cancelled' } },
                _sum: { total: true }
            }),
            // Total Orders (30d)
            prisma.order.count({
                where: { createdAt: { gte: thirtyDaysAgo } }
            }),
            // Total Active Users
            prisma.user.count({
                where: { status: 'active' }
            }),
            // Pending Shipments
            prisma.order.count({
                where: { status: 'pending' }
            }),
            // Recent Orders for Activity Feed
            prisma.order.findMany({
                take: 10,
                orderBy: { createdAt: 'desc' },
                include: { user: { select: { name: true, businessName: true } } }
            })
        ]);

        res.json({
            stats: {
                totalRevenue: Number(revenue._sum.total || 0),
                totalOrders: orderCount,
                activeUsers: userCount,
                pendingShipments: pendingOrders
            },
            recentActivity
        });
    } catch (error) {
        console.error('GetAdminStats error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
