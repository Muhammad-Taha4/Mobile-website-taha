import { Request, Response } from 'express';
import { prisma } from '../config/prisma';

export const getProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const { page = '1', limit = '20', category, search, featured, minPrice, maxPrice, inStock, brand } = req.query;

        const where: any = { isActive: true };

        if (category) {
            where.category = { slug: category as string };
        }
        if (brand) {
            where.brand = { slug: brand as string };
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
                { name: { contains: search as string } },
                { sku: { contains: search as string } },
            ];
        }

        const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
        const take = parseInt(limit as string);

        const [products, total] = await Promise.all([
            prisma.product.findMany({
                where,
                include: { category: true, brand: true, model: true },
                skip,
                take,
                orderBy: { createdAt: 'desc' },
            }),
            prisma.product.count({ where }),
        ]);

        if (req.query.page) {
            res.json({
                products,
                pagination: {
                    page: parseInt(page as string),
                    limit: take,
                    total,
                    totalPages: Math.ceil(total / take),
                },
            });
        } else {
            res.json(products);
        }
    } catch (error) {
        console.error('GetProducts ERROR:', error);
        res.json([]);
    }
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id as string);
        if (isNaN(id)) { res.status(400).json({ message: 'Invalid ID' }); return; }

        const product = await prisma.product.findUnique({
            where: { id },
            include: { category: true, brand: true, model: true, reviews: true },
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

export const createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const product = await prisma.product.create({ data: req.body });
        res.status(201).json({ message: 'Product created', product });
    } catch (error) {
        console.error('CreateProduct error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id as string);
        const product = await prisma.product.update({
            where: { id },
            data: req.body,
        });
        res.json({ message: 'Product updated', product });
    } catch (error) {
        console.error('UpdateProduct error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id as string);
        await prisma.product.update({
            where: { id },
            data: { isActive: false },
        });
        res.json({ message: 'Product deactivated' });
    } catch (error) {
        console.error('DeleteProduct error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getProductBySlug = async (req: Request, res: Response): Promise<void> => {
    try {
        const product = await prisma.product.findUnique({
            where: { slug: req.params.slug as string },
            include: { category: true, brand: true, model: true, reviews: { include: { user: { select: { name: true } } } } },
        });

        if (!product) {
            res.status(404).json({ message: 'Product not found.' });
            return;
        }

        res.json(product);
    } catch (error) {
        console.error('GetProductBySlug error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getFeaturedProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const products = await prisma.product.findMany({
            where: { isFeatured: true, isActive: true },
            take: 10,
            include: { category: true, brand: true },
            orderBy: { createdAt: 'desc' }
        });
        res.json(products);
    } catch (error) {
        console.error('GetFeaturedProducts error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const addProductReview = async (req: Request, res: Response): Promise<void> => {
    try {
        const { rating, title, comment } = req.body;
        const productId = parseInt(req.params.id as string);
        const userId = (req as any).user.id; // User integer id from JWT

        if (isNaN(productId)) { res.status(400).json({ message: 'Invalid product ID' }); return; }

        const product = await prisma.product.findUnique({ where: { id: productId } });
        if (!product) { res.status(404).json({ message: 'Product not found' }); return; }

        // Check if review already exists
        const existingReview = await prisma.review.findFirst({
            where: { productId, userId }
        });

        if (existingReview) {
            res.status(400).json({ message: 'You have already reviewed this product' });
            return;
        }

        const review = await prisma.review.create({
            data: {
                rating: parseInt(rating),
                title,
                comment,
                productId,
                userId,
                isApproved: true, // Auto approve or set to false to moderate
            }
        });

        res.json({ message: 'Review added', review });
    } catch (error) {
        console.error('AddProductReview error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
