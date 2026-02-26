import { Request, Response } from 'express';
import { prisma } from '../config/prisma';

/**
 * GET /api/admin/taxonomy/brands (Admin only)
 */
export const getBrands = async (_req: Request, res: Response): Promise<void> => {
    try {
        const brands = await prisma.product.findMany({
            select: { brand: true },
            distinct: ['brand'],
        });
        const brandList = brands.map(b => b.brand).filter(Boolean);
        res.json(brandList);
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
 * This is a helper for cascading selection. 
 * Since we don't have a Model table yet, we extract from compatibility or products.
 */
export const getModels = async (req: Request, res: Response): Promise<void> => {
    try {
        const { brand, categoryId } = req.query;
        // Optimization: return a fixed known list for demo purposes if DB is empty on models
        const models = await prisma.product.findMany({
            where: { 
                brand: brand as string,
                categoryId: categoryId as string
            },
            select: { compatibility: true },
            distinct: ['compatibility']
        });
        const modelList = models.flatMap(m => m.compatibility?.split(',')).map(s => s?.trim()).filter(Boolean);
        const uniqueModels = Array.from(new Set(modelList));
        res.json(uniqueModels);
    } catch (error) {
        console.error('GetModels error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
