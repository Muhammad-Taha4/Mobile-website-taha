import { Router } from 'express';
import { getAdminStats } from '../controllers/admin.controller';
import { getBrands, getAllCategories, getModels } from '../controllers/taxonomy.controller';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../controllers/product.controller';
import { getOrders, updateOrderStatus } from '../controllers/order.controller';
import { getUsers, updateUser, deleteUser } from '../controllers/user.controller';
import {
    getSettings, updateSettings,
    getBanners, createBanner, updateBanner, deleteBanner, reorderBanners,
    getHomepageSections, updateHomepageSection,
    getPages, getPage, upsertPage,
    featureProduct,
    bannerUpload,
} from '../controllers/cms.controller';
import { authenticate, isAdmin } from '../middlewares/auth';

const router = Router();

// Dashboard Stats
router.get('/stats', authenticate, isAdmin, getAdminStats);

// Users
router.get('/users', authenticate, isAdmin, getUsers);
router.put('/users/:id', authenticate, isAdmin, updateUser);
router.delete('/users/:id', authenticate, isAdmin, deleteUser);

// Products
router.get('/products', authenticate, isAdmin, getProducts);
router.post('/products', authenticate, isAdmin, createProduct);
router.put('/products/:id', authenticate, isAdmin, updateProduct);
router.delete('/products/:id', authenticate, isAdmin, deleteProduct);
// Feature toggle — must be before /:id to avoid conflict
router.put('/products/:id/feature', authenticate, isAdmin, featureProduct);

// Orders
router.get('/orders', authenticate, isAdmin, getOrders);
router.put('/orders/:id/status', authenticate, isAdmin, updateOrderStatus);

// Taxonomy
router.get('/taxonomy/brands', authenticate, isAdmin, getBrands);
router.get('/taxonomy/categories', authenticate, isAdmin, getAllCategories);
router.get('/taxonomy/models', authenticate, isAdmin, getModels);

// CMS - Site Settings
router.get('/settings', authenticate, isAdmin, getSettings);
router.put('/settings', authenticate, isAdmin, updateSettings);

// CMS - Banners (with multer file upload middleware)
router.get('/banners', authenticate, isAdmin, getBanners);
router.post('/banners', authenticate, isAdmin, bannerUpload.single('image'), createBanner);
router.put('/banners/:id', authenticate, isAdmin, bannerUpload.single('image'), updateBanner);
router.delete('/banners/:id', authenticate, isAdmin, deleteBanner);
router.put('/banners/reorder', authenticate, isAdmin, reorderBanners);

// CMS - Homepage Sections
router.get('/homepage-sections', authenticate, isAdmin, getHomepageSections);
router.put('/homepage-sections/:key', authenticate, isAdmin, updateHomepageSection);

// CMS - Static Pages
router.get('/pages', authenticate, isAdmin, getPages);
router.get('/pages/:slug', authenticate, isAdmin, getPage);
router.put('/pages/:slug', authenticate, isAdmin, upsertPage);

export default router;
