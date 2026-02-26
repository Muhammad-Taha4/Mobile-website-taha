import { prisma } from '../src/config/prisma';

async function main() {
    try {
        const productCount = await prisma.product.count();
        const categoryCount = await prisma.category.count();
        console.log(`Products: ${productCount}`);
        console.log(`Categories: ${categoryCount}`);
    } catch (e) {
        console.error("DB Error:", e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
