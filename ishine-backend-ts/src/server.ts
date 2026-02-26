import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { prisma } from './config/prisma';
import { errorHandler, notFound } from './middlewares/errorMiddleware';

// Routes
import userRoutes from './routes/userRoutes';
import productRoutes from './routes/productRoutes';
import categoryRoutes from './routes/categoryRoutes';
import orderRoutes from './routes/orderRoutes';
import adminRoutes from './routes/adminRoutes';

// ─── Config ─────────────────────────────────
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ─────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Routes ─────────────────────────────────
app.use('/api/auth', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);

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
    // Server started
});

// ─── Graceful Shutdown ──────────────────────
process.on('SIGINT', async () => {
    await prisma.$disconnect();
    console.log('\n🔌 Prisma disconnected. Server shutting down.');
    process.exit(0);
});

export default app;
