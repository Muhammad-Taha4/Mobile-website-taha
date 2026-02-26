const fs = require('fs');
const path = require('path');

async function main() {
    console.log("🚀 Starting High-Precision Data Sync from ishinewireless.com...");

    // Fetch 100 products for a comprehensive mirror
    const res = await fetch('https://ishinewireless.com/wp-json/wc/store/products?per_page=100');
    if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);
    const wpProducts = await res.json();

    console.log(`✅ Fetched ${wpProducts.length} live products!`);

    const productsData = wpProducts.map(p => {
        const title = p.name;

        let priceNum = 0;
        if (p.prices) {
            priceNum = parseInt(p.prices.price) / (10 ** p.prices.currency_minor_unit);
            // If price is 0, try regular_price
            if (priceNum === 0 && p.prices.regular_price) {
                priceNum = parseInt(p.prices.regular_price) / (10 ** p.prices.currency_minor_unit);
            }
        }

        const price = priceNum.toFixed(2);

        // Technical specs from description
        const cleanDesc = (p.short_description || p.description || "")
            .replace(/<br\s*\/?>/gi, '\n') // Preserve line breaks
            .replace(/<\/p>/gi, '\n')
            .replace(/<[^>]+>/g, '') // Strip other tags
            .replace(/&nbsp;/g, ' ')
            .replace(/&amp;/g, '&')
            .replace(/&quot;/g, '"')
            .trim();

        const desc = cleanDesc || "High-quality professional replacement part.";

        // Grab ALL images for gallery support
        const images = p.images && p.images.length > 0
            ? p.images.map(img => img.src)
            : ["https://ishinewireless.com/wp-content/uploads/2025/05/Untitled-design-1.png"];

        const sku = p.sku || `ISW-${p.id}`;

        // Better Brand Logic
        let brand = "iShine Tools";
        const titleLower = title.toLowerCase();
        if (titleLower.includes('iphone') || titleLower.includes('ipad') || titleLower.includes('apple') || titleLower.includes('itouch')) {
            brand = "Apple";
        } else if (titleLower.includes('samsung') || titleLower.includes('galaxy')) {
            brand = "Samsung";
        } else if (titleLower.includes('moto') || titleLower.includes('motorola')) {
            brand = "Motorola";
        } else if (titleLower.includes('pixel') || titleLower.includes('google')) {
            brand = "Google";
        } else if (titleLower.includes('oneplus')) {
            brand = "OnePlus";
        } else if (titleLower.includes('nokia')) {
            brand = "Nokia";
        } else if (titleLower.includes('lg')) {
            brand = "LG";
        }

        return {
            title,
            brand: titleLower.includes('repair') || titleLower.includes('tool') ? "iShine Tools" : brand,
            price: `$${price}`,
            badge: priceNum > 100 ? "Premium" : (p.is_on_sale ? "Sale" : "New"),
            badgeColor: priceNum > 100 ? "purple" : (p.is_on_sale ? "red" : "blue"),
            stockStatus: p.is_in_stock ? "In Stock" : "Backorder",
            stockCount: p.is_in_stock ? "150+ units" : "Only 5 left",
            imageSrc: images[0],
            allImages: images,
            description: desc,
            sku,
            wsPrice: priceNum
        };
    });

    // -------------------------------------------------------------
    // GENERATE MOCK DATA (FRONTEND)
    // -------------------------------------------------------------
    const mockDataFile = path.resolve(__dirname, '..', 'ishine-frontend', 'src', 'lib', 'mockData.ts');

    const frontendData = productsData.map(p => ({
        title: p.title,
        brand: p.brand,
        price: p.price,
        badge: p.badge,
        badgeColor: p.badgeColor,
        stockStatus: p.stockStatus,
        stockCount: p.stockCount,
        imageSrc: p.imageSrc,
        images: p.allImages,
        description: p.description,
        sku: p.sku
    }));

    const mockContent = `export const generatedProducts = ${JSON.stringify(frontendData, null, 4)};\n`;
    fs.writeFileSync(mockDataFile, mockContent, 'utf-8');
    console.log("✨ Updated frontend 'src/lib/mockData.ts' with 100 mirror products.");

    // -------------------------------------------------------------
    // GENERATE SEED SCRIPT (BACKEND)
    // -------------------------------------------------------------
    const seedFile = path.resolve(__dirname, '..', 'ishine-backend-ts', 'prisma', 'seed.ts');

    const backendItems = productsData.map(p => ({
        name: p.title,
        sku: p.sku,
        slug: p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Math.floor(Math.random() * 1000),
        description: p.description,
        shortDescription: p.description.substring(0, 150),
        wholesalePrice: p.wsPrice,
        retailPrice: p.wsPrice * 1.3,
        costPrice: p.wsPrice * 0.7,
        stock: 150,
        brand: p.brand,
        compatibility: p.title.split(' ').slice(0, 3).join(' '),
        images: p.allImages
    }));

    const seedContent = `import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const realProducts = ${JSON.stringify(backendItems, null, 4)};

async function main() {
    console.log("🌱 Seeding Database with HIGH-PRECISION mirror data...");

    // 1. CLEAR EXISTING DATA
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    await prisma.user.deleteMany();

    // 2. CREATE MASTER CATEGORIES
    const categories = [
        { name: "Apple", slug: "apple", description: "Genuine and high-quality Apple replacement parts." },
        { name: "Samsung", slug: "samsung", description: "Samsung Service Pack and OEM display assemblies." },
        { name: "Motorola", slug: "motorola", description: "Motorola series LCDs and charging ports." },
        { name: "Google", slug: "google", description: "Google Pixel repair components." },
        { name: "OnePlus", slug: "oneplus", description: "OnePlus phone parts." },
        { name: "Repair Tools", slug: "repair-tools", description: "Professional grade tools for mobile repair shops." }
    ];

    const catMap: Record<string, string> = {};
    for (const cat of categories) {
        const created = await prisma.category.create({ data: cat });
        catMap[cat.name] = created.id;
    }

    // 3. SEED PRODUCTS
    for (const prod of realProducts) {
        let catId = catMap["Repair Tools"]; // Default
        if (prod.brand === "Apple") catId = catMap["Apple"];
        else if (prod.brand === "Samsung") catId = catMap["Samsung"];
        else if (prod.brand === "Motorola") catId = catMap["Motorola"];
        else if (prod.brand === "Google") catId = catMap["Google"];
        else if (prod.brand === "OnePlus") catId = catMap["OnePlus"];

        await prisma.product.create({
            data: {
                ...prod,
                categoryId: catId
            }
        });
    }

    console.log(\`✅ Successfully mirrored \${realProducts.length} products to the database seed!\`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
`;

    fs.writeFileSync(seedFile, seedContent, 'utf-8');
    console.log("✨ Updated backend 'prisma/seed.ts' with identical production data.");
}

main().catch(err => {
    console.error("❌ Fatal Error during sync:", err);
    process.exit(1);
});
