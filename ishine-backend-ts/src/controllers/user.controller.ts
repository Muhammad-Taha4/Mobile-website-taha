import { Request, Response } from 'express';
import { prisma } from '../config/prisma';

/**
 * GET /api/users
 * List all users (Admin only)
 */
export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const { role, page = '1', limit = '20' } = req.query;
        const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

        const where: any = {};
        if (role) where.role = role;

        const [users, total] = await Promise.all([
            prisma.user.findMany({
                where,
                select: {
                    id: true,
                    email: true,
                    firstName: true,
                    lastName: true,
                    role: true,
                    businessName: true,
                    businessPhone: true,
                    isActive: true,
                    createdAt: true,
                },
                skip,
                take: parseInt(limit as string),
                orderBy: { createdAt: 'desc' },
            }),
            prisma.user.count({ where }),
        ]);

        res.json({
            users,
            pagination: {
                page: parseInt(page as string),
                limit: parseInt(limit as string),
                total,
                totalPages: Math.ceil(total / parseInt(limit as string)),
            },
        });
    } catch (error) {
        console.error('GetUsers error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * PATCH /api/users/:id (Admin only)
 */
export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { role, isActive, firstName, lastName, businessName } = req.body;
        
        const user = await prisma.user.update({
            where: { id: req.params.id as string },
            data: { role, isActive, firstName, lastName, businessName },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                role: true,
                isActive: true,
            }
        });

        res.json({ message: 'User updated successfully', user });
    } catch (error) {
        console.error('UpdateUser error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * DELETE /api/users/:id (Admin only)
 */
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        await prisma.user.delete({
            where: { id: req.params.id as string }
        });
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('DeleteUser error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
