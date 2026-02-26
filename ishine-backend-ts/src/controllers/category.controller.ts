import { Request, Response } from 'express';
import { prisma } from '../config/prisma';

/**
 * GET /api/categories
 * Returns a nested tree of all active categories.
 */
export const getCategories = async (_req: Request, res: Response): Promise<void> => {
    try {
        const categories = await prisma.category.findMany({
            where: { parentId: null, isActive: true },
            include: {
                children: {
                    where: { isActive: true },
                    include: {
                        children: {
                            where: { isActive: true },
                            include: {
                                children: { where: { isActive: true } }, // 4 levels deep
                            },
                        },
                    },
                },
                _count: { select: { products: true } },
            },
            orderBy: { sortOrder: 'asc' },
        });

        res.json(categories);
    } catch (error) {
        console.error('GetCategories error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * GET /api/categories/:id
 */
export const getCategoryById = async (req: Request, res: Response): Promise<void> => {
    try {
        const category = await prisma.category.findUnique({
            where: { id: req.params.id as string },
            include: {
                children: { where: { isActive: true } },
                products: { where: { isActive: true }, take: 20 },
                parent: { select: { id: true, name: true, slug: true } },
            },
        });

        if (!category) {
            res.status(404).json({ message: 'Category not found.' });
            return;
        }

        res.json(category);
    } catch (error) {
        console.error('GetCategoryById error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * POST /api/categories (Admin only)
 */
export const createCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const category = await prisma.category.create({ data: req.body });
        res.status(201).json({ message: 'Category created', category });
    } catch (error) {
        console.error('CreateCategory error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * PUT /api/categories/:id (Admin only)
 */
export const updateCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const category = await prisma.category.update({
            where: { id: req.params.id as string },
            data: req.body,
        });
        res.json({ message: 'Category updated', category });
    } catch (error) {
        console.error('UpdateCategory error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * DELETE /api/categories/:id (Admin only — soft delete)
 */
export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        await prisma.category.update({
            where: { id: req.params.id as string },
            data: { isActive: false },
        });
        res.json({ message: 'Category deactivated' });
    } catch (error) {
        console.error('DeleteCategory error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
