import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { prisma } from './config/prisma';
import { errorHandler, notFound } from './middlewares/errorMiddleware';

// Routes
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import productRoutes from './routes/productRoutes';
import categoryRoutes from './routes/categoryRoutes';
import orderRoutes from './routes/orderRoutes';
import adminRoutes from './routes/adminRoutes';
import cartRoutes from './routes/cartRoutes';

// ─── Config ─────────────────────────────────
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ─────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Serve uploaded files (banner images, etc.)
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// ─── Routes ─────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/cart', cartRoutes);

// ─── Health Check ───────────────────────────
app.get('/api/health', async (_req, res) => {
    try {
        await prisma.$queryRaw`SELECT 1`;
        res.json({
            status: 'ok',
            message: 'iShine Wireless API is running',
            database: 'connected',
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Database connection failed',
            database: 'disconnected',
        });
    }
});

// ─── Error Handling ─────────────────────────
app.use(notFound);
app.use(errorHandler);

// ─── Start Server ───────────────────────────
app.listen(PORT, () => {
    console.log(`🚀 iShine Backend running at http://localhost:${PORT}`);
    console.log(`📡 API Health Check: http://localhost:${PORT}/api/health`);
});

// ─── Graceful Shutdown ──────────────────────
process.on('SIGINT', async () => {
    await prisma.$disconnect();
    console.log('\n🔌 Prisma disconnected. Server shutting down.');
    process.exit(0);
});

export default app;
