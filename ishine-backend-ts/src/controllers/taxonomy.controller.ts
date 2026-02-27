import { Request, Response } from 'express';
import { prisma } from '../config/prisma';

/**
 * GET /api/admin/taxonomy/brands (Admin only)
 */
export const getBrands = async (_req: Request, res: Response): Promise<void> => {
    try {
        const brands = await prisma.brand.findMany({
            where: { isActive: true },
            orderBy: { sortOrder: 'asc' }
        });
        res.json(brands);
    } catch (error) {
        console.error('GetBrands error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * GET /api/admin/taxonomy/categories (Admin only)
 */
export const getAllCategories = async (_req: Request, res: Response): Promise<void> => {
    try {
        const categories = await prisma.category.findMany({
            include: { parent: true }
        });
        res.json(categories);
    } catch (error) {
        console.error('GetAllCategories error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * GET /api/admin/taxonomy/models (Admin only)
 */
export const getModels = async (req: Request, res: Response): Promise<void> => {
    try {
        const { brandId } = req.query;
        const where: any = { isActive: true };

        if (brandId) {
            where.brandId = parseInt(brandId as string);
        }

        const models = await prisma.model.findMany({
            where,
            orderBy: { sortOrder: 'asc' }
        });
        res.json(models);
    } catch (error) {
        console.error('GetModels error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
