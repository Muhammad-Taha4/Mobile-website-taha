import 'dotenv/config';
import { prisma } from './src/config/prisma';

async function check() {
    try {
        const productCount = await prisma.product.count();
        const categoryCount = await prisma.category.count();
        console.log(`Products: ${productCount}`);
        console.log(`Categories: ${categoryCount}`);
    } catch (error) {
        console.error('Check failed:', error);
    } finally {
        await prisma.$disconnect();
    }
}

check();
