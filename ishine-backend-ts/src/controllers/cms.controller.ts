import { Request, Response } from 'express';
import { prisma } from '../config/prisma';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// ─── MULTER FILE UPLOAD SETUP ──────────────────────────
const uploadDir = path.join(__dirname, '../../public/uploads/banners');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, uploadDir);
    },
    filename: (_req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        cb(null, `banner-${uniqueSuffix}${path.extname(file.originalname)}`);
    },
});

export const bannerUpload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: (_req, file, cb) => {
        const allowed = /jpeg|jpg|png|gif|webp|svg/;
        const ok = allowed.test(path.extname(file.originalname).toLowerCase()) && allowed.test(file.mimetype);
        if (ok) cb(null, true);
        else cb(new Error('Only image files are allowed'));
    },
});

// ─── SITE SETTINGS ─────────────────────────────────────

export const getSettings = async (req: Request, res: Response): Promise<void> => {
    try {
        const settings = await prisma.siteSettings.findMany();
        const settingsMap = settings.reduce((acc: any, curr: any) => {
            acc[curr.key] = curr.value;
            return acc;
        }, {});
        res.json(settingsMap);
    } catch (error) {
        console.error('GetSettings ERROR:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateSettings = async (req: Request, res: Response): Promise<void> => {
    try {
        const { key, value } = req.body;
        if (!key) { res.status(400).json({ message: 'Key is required' }); return; }
        const setting = await prisma.siteSettings.upsert({
            where: { key },
            update: { value },
            create: { key, value },
        });
        res.json({ message: 'Setting updated', setting });
    } catch (error) {
        console.error('UpdateSettings ERROR:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// ─── BANNERS ───────────────────────────────────────────

export const getBanners = async (req: Request, res: Response): Promise<void> => {
    try {
        const { position } = req.query;
        const where: any = {};
        if (position) where.position = position as string;
        const banners = await prisma.banner.findMany({ where, orderBy: { sortOrder: 'asc' } });
        res.json(banners);
    } catch (error) {
        console.error('GetBanners ERROR:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const createBanner = async (req: Request, res: Response): Promise<void> => {
    try {
        const body: any = { ...req.body };

        // If a file was uploaded, use its path; otherwise use the image URL from body
        if ((req as any).file) {
            body.image = `/uploads/banners/${(req as any).file.filename}`;
        }

        // Parse boolean and number fields from multipart
        if (typeof body.isActive === 'string') body.isActive = body.isActive === 'true';
        if (body.sortOrder) body.sortOrder = parseInt(body.sortOrder);

        const banner = await prisma.banner.create({ data: body });
        res.status(201).json({ message: 'Banner created', banner });
    } catch (error) {
        console.error('CreateBanner ERROR:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateBanner = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id as string);
        const body: any = { ...req.body };

        if ((req as any).file) {
            body.image = `/uploads/banners/${(req as any).file.filename}`;
        }
        if (typeof body.isActive === 'string') body.isActive = body.isActive === 'true';
        if (body.sortOrder) body.sortOrder = parseInt(body.sortOrder);

        const banner = await prisma.banner.update({ where: { id }, data: body });
        res.json({ message: 'Banner updated', banner });
    } catch (error) {
        console.error('UpdateBanner ERROR:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteBanner = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id as string);
        await prisma.banner.delete({ where: { id } });
        res.json({ message: 'Banner deleted' });
    } catch (error) {
        console.error('DeleteBanner ERROR:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const reorderBanners = async (req: Request, res: Response): Promise<void> => {
    try {
        const { orders } = req.body;
        await Promise.all(
            orders.map((item: any) =>
                prisma.banner.update({
                    where: { id: parseInt(item.id) },
                    data: { sortOrder: parseInt(item.sortOrder) },
                })
            )
        );
        res.json({ message: 'Banners reordered successfully' });
    } catch (error) {
        console.error('ReorderBanners ERROR:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// ─── HOMEPAGE SECTIONS ─────────────────────────────────

export const getHomepageSections = async (req: Request, res: Response): Promise<void> => {
    try {
        const sections = await prisma.homepageSection.findMany({ orderBy: { sortOrder: 'asc' } });
        res.json(sections);
    } catch (error) {
        console.error('GetHomepageSections ERROR:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateHomepageSection = async (req: Request, res: Response): Promise<void> => {
    try {
        const key = req.params.key as string;
        const section = await prisma.homepageSection.upsert({
            where: { sectionKey: key },
            update: req.body,
            create: { sectionKey: key, ...req.body },
        });
        res.json({ message: 'Section updated', section });
    } catch (error) {
        console.error('UpdateHomepageSection ERROR:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// ─── STATIC PAGES ──────────────────────────────────────

export const getPages = async (req: Request, res: Response): Promise<void> => {
    try {
        const pages = await (prisma as any).staticPage?.findMany({ orderBy: { updatedAt: 'desc' } }) ?? [];
        res.json(pages);
    } catch (error) {
        // If table doesn't exist yet, return seeded defaults
        res.json([
            { id: 1, slug: 'privacy-policy', title: 'Privacy Policy', content: '<p>Edit this page from the admin panel.</p>', updatedAt: new Date() },
            { id: 2, slug: 'terms-of-service', title: 'Terms of Service', content: '<p>Edit this page from the admin panel.</p>', updatedAt: new Date() },
            { id: 3, slug: 'shipping-policy', title: 'Shipping Policy', content: '<p>Edit this page from the admin panel.</p>', updatedAt: new Date() },
            { id: 4, slug: 'return-policy', title: 'Return Policy', content: '<p>Edit this page from the admin panel.</p>', updatedAt: new Date() },
        ]);
    }
};

export const getPage = async (req: Request, res: Response): Promise<void> => {
    try {
        const slug = req.params.slug as string;
        const page = await (prisma as any).staticPage?.findUnique({ where: { slug } }) ?? null;
        if (!page) {
            // Return a default editable placeholder for the slug
            res.json({ id: null, slug, title: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), content: '<p>Start editing this page...</p>' });
            return;
        }
        res.json(page);
    } catch (error) {
        res.json({ id: null, slug: req.params.slug, title: 'Page', content: '<p>Start editing this page...</p>' });
    }
};

export const upsertPage = async (req: Request, res: Response): Promise<void> => {
    try {
        const slug = req.params.slug as string;
        const { title, content } = req.body;

        // Use siteSettings as a storage for pages (key = page:slug)
        const key = `page:${slug}`;
        await prisma.siteSettings.upsert({
            where: { key },
            update: { value: JSON.stringify({ title, content, slug, updatedAt: new Date() }) },
            create: { key, value: JSON.stringify({ title, content, slug, updatedAt: new Date() }) },
        });

        res.json({ message: 'Page saved successfully', slug });
    } catch (error) {
        console.error('UpsertPage ERROR:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// ─── FEATURE PRODUCT TOGGLE ────────────────────────────

export const featureProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id as string);
        const { isFeatured } = req.body;

        const product = await prisma.product.update({
            where: { id },
            data: { isFeatured: Boolean(isFeatured) },
            select: { id: true, name: true, isFeatured: true },
        });

        res.json({
            message: `Product ${product.isFeatured ? 'featured' : 'unfeatured'} successfully`,
            product,
        });
    } catch (error) {
        console.error('FeatureProduct ERROR:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
