import { prisma } from '../src/config/prisma';

async function main() {
    try {
        const products = await prisma.product.findMany({ take: 10 });
        for (const p of products) {
            await prisma.product.update({
                where: { id: p.id },
                data: { isFeatured: true }
            });
        }
        console.log(`Updated 10 products to be featured.`);
    } catch (e) {
        console.error("DB Error:", e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
