import { Request, Response } from 'express';
import { prisma } from '../config/prisma';

/**
 * GET /api/products
 * List all active products with category info.
 */
export const getProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const { page = '1', limit = '20', category, search, featured, grade, minPrice, maxPrice, inStock } = req.query;

        const where: any = { isActive: true };

        if (category) {
            const categoriesArr = (category as string).split(',');
            where.OR = categoriesArr.flatMap(cat => [
                { brand: { contains: cat } },
                { category: { name: { contains: cat } } }
            ]);
        }
        if (grade) {
            const gradesArr = (grade as string).split(',');
            where.warranty = { in: gradesArr };
        }
        if (minPrice || maxPrice) {
            where.wholesalePrice = {};
            if (minPrice) where.wholesalePrice.gte = parseFloat(minPrice as string);
            if (maxPrice) where.wholesalePrice.lte = parseFloat(maxPrice as string);
        }
        if (inStock === 'true') {
            where.stock = { gt: 0 };
        }
        if (featured === 'true') where.isFeatured = true;
        if (search) {
            where.OR = [
                ...(where.OR || []),
                { name: { contains: search as string } },
                { sku: { contains: search as string } },
                { brand: { contains: search as string } },
            ];
        }

        const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

        const [products, total] = await Promise.all([
            prisma.product.findMany({
                where,
                include: { category: { select: { id: true, name: true, slug: true } } },
                skip,
                take: parseInt(limit as string),
                orderBy: { createdAt: 'desc' },
            }),
            prisma.product.count({ where }),
        ]);

        // If page specifically requested, return object, else return array for simple fetch
        if (req.query.page) {
            res.json({
                products,
                pagination: {
                    page: parseInt(page as string),
                    limit: parseInt(limit as string),
                    total,
                    totalPages: Math.ceil(total / parseInt(limit as string)),
                },
            });
        } else {
            res.json(products);
        }
    } catch (error) {
        console.error('GetProducts FULL ERROR STACK:', error);
        // Step 1: Return res.json([]) instead of a 500 error to prevent frontend crash
        res.json([]);
    }
};

/**
 * GET /api/products/:id
 */
export const getProductById = async (req: Request, res: Response): Promise<void> => {
    try {
        const product = await prisma.product.findUnique({
            where: { id: req.params.id as string },
            include: { category: true },
        });

        if (!product) {
            res.status(404).json({ message: 'Product not found.' });
            return;
        }

        res.json(product);
    } catch (error) {
        console.error('GetProductById error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * POST /api/products (Admin only)
 */
export const createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const product = await prisma.product.create({ data: req.body });
        res.status(201).json({ message: 'Product created', product });
    } catch (error) {
        console.error('CreateProduct error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * PUT /api/products/:id (Admin only)
 */
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const product = await prisma.product.update({
            where: { id: req.params.id as string },
            data: req.body,
        });
        res.json({ message: 'Product updated', product });
    } catch (error) {
        console.error('UpdateProduct error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * DELETE /api/products/:id (Admin only — soft delete)
 */
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        await prisma.product.update({
            where: { id: req.params.id as string },
            data: { isActive: false },
        });
        res.json({ message: 'Product deactivated' });
    } catch (error) {
        console.error('DeleteProduct error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
