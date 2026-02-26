import { prisma } from '../src/config/prisma';

function generateSlug(name: string) {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

const CATEGORIES_HIERARCHY = {
    "Apple": {
        "iPhone": ["iPhone 16 Pro Max", "iPhone 16 Pro", "iPhone 15 Pro Max", "iPhone 15 Pro", "iPhone 14 Pro Max"],
        "iPad": ["iPad Pro", "iPad Air 5", "iPad (10th Gen)"],
        "MacBook & iMac": ["MacBook Pro", "MacBook Air"]
    },
    "Samsung": {
        "Galaxy S Series": ["Galaxy S25 Ultra 5G", "Galaxy S24 Ultra", "Galaxy S23 Ultra"],
        "Galaxy Z Series": ["Galaxy Z Fold 5", "Galaxy Z Flip 5"]
    },
    "Google": {
        "Pixel Phones": ["Pixel 10", "Pixel 9 Pro", "Pixel 8 Pro"]
    },
    "Motorola": {
        "Moto G Series": ["Moto G Stylus 5G 2025", "Moto G Power 2024"]
    },
    "OnePlus": {
        "OnePlus Phones": ["OnePlus 12", "OnePlus Open"]
    }
};

const DUMMY_REVIEWS = [
    { rating: 5, author: "Michael T.", date: "Oct 12, 2025", comment: "Excellent quality replacement part. The screen feels just like the original, colors are vibrant and touch response is perfect." },
    { rating: 5, author: "Sarah B.", date: "Sep 28, 2025", comment: "Saved my life! Fast shipping and perfectly described. The tools included were a nice touch even though I had my own." },
    { rating: 4, author: "David R.", date: "Nov 05, 2025", comment: "Great part. Installation was a bit tricky but an online tutorial helped. Once in, it works flawlessly." },
    { rating: 5, author: "Alex K.", date: "Dec 18, 2025", comment: "iShine never disappoints. The OEM grade really means OEM here. Everything lines up perfectly." },
    { rating: 5, author: "Jessica M.", date: "Jan 10, 2026", comment: "Battery life is back to 100% capacity! It holds charge exactly like it did on day one." },
    { rating: 4, author: "Brian L.", date: "Feb 02, 2026", comment: "Screen looks great. Slight difference in the deepest blacks compared to original but for the price, 10/10." },
    { rating: 5, author: "Tech Repair LLC", date: "Jan 22, 2026", comment: "We buy these in bulk. Lowest defect rate of any supplier we've used in 5 years. Highly recommended B2B partner." }
];

function getRandomReviews(count: number) {
    const shuffled = [...DUMMY_REVIEWS].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

const REALISTIC_PRODUCTS = [
    // APPLE 
    {
        name: "iPhone 16 Pro Max Soft OLED Assembly",
        brand: "Apple",
        categoryPath: ["Apple", "iPhone", "iPhone 16 Pro Max"],
        price: 245.50,
        condition: "OEM Refurb",
        description: `
            <p>Restore your flagship device with this Premium Soft OLED Display Assembly exclusively engineered for the iPhone 16 Pro Max. Soft OLED technology ensures maximum flexibility inside the chassis, greatly reducing the chance of internal fracture from minor drops compared to hard OLEDs.</p>
            <p>Every single screen undergoes a strict 14-point QA inspection in our California facility. We verify color accuracy, 120Hz ProMotion stability, and peak brightness identical to original specifications. No more washed-out colors or unresponsive touch zones.</p>
            <p><strong>Note:</strong> True Tone functionality requires programming the new screen with your original screen's serial number using an EEPROM programmer.</p>
        `,
        features: [
            "Advanced Soft OLED Technology (Flexible & Durable)",
            "Supports 120Hz ProMotion Refresh Rate",
            "1:1 Original Color Gamut & Peak HDR Brightness",
            "Pre-installed Camera Ring & Sensor Brackets",
            "Lifetime Warranty against manufacturer defects",
            "True Tone programmable"
        ],
        images: [
            "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=800&q=80",
            "https://images.unsplash.com/photo-1592890288564-76628a30a657?w=800&q=80",
            "https://images.unsplash.com/photo-1512054502232-10a0a035d672?w=800&q=80",
            "https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=800&q=80"
        ]
    },
    {
        name: "iPhone 15 Pro Max High-Capacity Replacement Battery",
        brand: "Apple",
        categoryPath: ["Apple", "iPhone", "iPhone 15 Pro Max"],
        price: 38.00,
        condition: "New",
        description: `
            <p>Is your iPhone 15 Pro Max constantly dying before the end of the day? Revive its endurance with our Zero-Cycle High-Capacity Replacement Battery. Manufactured to original specifications utilizing premium lithium-ion cells for stable voltage output and long-term degradation resistance.</p>
            <p>Included with the battery is a perfectly die-cut battery adhesive strip ensuring strict adherence to Apple's design and preventing battery movement or flex cable tear over time.</p>
        `,
        features: [
            "Zero Cycle Premium Grade-A Battery Cells",
            "Original or Higher mAh Capacity (4422 mAh)",
            "Overcharge and Over-heat Protection IC built-in",
            "Includes pre-cut OEM grade battery adhesive",
            "1-Year Performance Warranty"
        ],
        images: [
            "https://images.unsplash.com/photo-1616422285623-14c1d47cd9b2?w=800&q=80",
            "https://images.unsplash.com/photo-1544465227-2b7febeebed0?w=800&q=80",
            "https://images.unsplash.com/photo-1574044195191-496696d01d4a?w=800&q=80"
        ]
    },
    {
        name: "iPhone 14 Pro Max Charging Port Flex Cable",
        brand: "Apple",
        categoryPath: ["Apple", "iPhone", "iPhone 14 Pro Max"],
        price: 18.50,
        condition: "New",
        description: `
            <p>Solve intermittent charging, dropped microphone audio, or lack of data transfer with this Premium Charging Port Flex Cable for the iPhone 14 Pro Max. This entire lower assembly includes the Lightning connector, dual lower microphones, and the taptic engine connection pads.</p>
            <p>Every port is tested with high-amperage testers prior to packaging, ensuring it supports Fast Charging metrics flawlessly.</p>
        `,
        features: [
            "Supports 20W+ Fast Charging safely",
            "Original microphone clarity layout",
            "Reinforced Lightning connector pins",
            "Includes lower cellular antenna connectors"
        ],
        images: [
            "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&q=80",
            "https://images.unsplash.com/photo-1596742578443-7682ef5251cd?w=800&q=80",
            "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?w=800&q=80"
        ]
    },
    {
        name: "iPad Pro 12.9 (6th Gen) Digitizer Glass",
        brand: "Apple",
        categoryPath: ["Apple", "iPad", "iPad Pro"],
        price: 85.00,
        condition: "Premium Aftermarket",
        description: `
            <p>Shattered glass on your iPad Pro? If the underlying LCD/OLED is still functioning normally (no black ink spots or lines), you can simply replace the front digitizer glass. This Premium Aftermarket Glass ensures flawlessly responsive touch input for finger and Apple Pencil.</p>
            <p>An oleophobic coating is applied at the factory level, maintaining the smooth, smudge-resistant glide you expect from an iPad Pro.</p>
        `,
        features: [
            "9H Hardness Tempered Glass integration",
            "Factory Applied Oleophobic Coating",
            "100% Apple Pencil Precision Compatibility",
            "Includes pre-installed camera bracket"
        ],
        images: [
            "https://images.unsplash.com/photo-1589739900266-43b2843f4c12?w=800&q=80",
            "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80",
            "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&q=80"
        ]
    },

    // SAMSUNG
    {
        name: "Galaxy S24 Ultra Dynamic AMOLED 2X Assembly (With Frame)",
        brand: "Samsung",
        categoryPath: ["Samsung", "Galaxy S Series", "Galaxy S24 Ultra"],
        price: 310.00,
        condition: "OEM Refurb",
        description: `
            <p>A true masterwork in mobile displays. This Dynamic AMOLED 2X assembly for the Galaxy S24 Ultra restores the brilliant 2600 nits peak brightness and flawlessly uniform bezels. The assembly comes pre-installed in the aluminum frame, dramatically simplifying the repair process and ensuring water-resistant sealing integrity.</p>
            <p>Ultrasonic fingerprint sensor is pre-calibrated and responds incredibly fast. Absolutely zero "dead patches" across the S-Pen digitizer grid.</p>
        `,
        features: [
            "Pre-installed in robust Aluminum Frame",
            "Supports full 2600 nits peak brightness",
            "Flawless Ultrasonic Fingerprint Sensor integration",
            "100% S-Pen Tracking Accuracy across entire surface",
            "Zero Dead Pixel Guarantee"
        ],
        images: [
            "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&q=80",
            "https://images.unsplash.com/photo-1610945265064-3201021bc1e3?w=800&q=80",
            "https://images.unsplash.com/photo-1634676527582-8bc81fa3fdc6?w=800&q=80",
            "https://images.unsplash.com/photo-1628191140026-6a13dabb2eab?w=800&q=80"
        ]
    },
    {
        name: "Galaxy S23 Ultra Back Glass Cover",
        brand: "Samsung",
        categoryPath: ["Samsung", "Galaxy S Series", "Galaxy S23 Ultra"],
        price: 26.50,
        condition: "New",
        description: `
            <p>Cracked the beautiful matte back glass of your Galaxy S23 Ultra? This OEM-quality rear panel replacement will make your device look mint condition again. It features the exact matte texture, color uniformity, and camera cutouts as the original.</p>
            <p>Pre-installed industrial-grade adhesive makes installation a breeze with a heat gun, ensuring a tight, gap-less fit.</p>
        `,
        features: [
            "Exact OEM Matte Finish Texture",
            "Pre-installed Precision Cut Adhesive",
            "Includes pre-installed camera lens glass",
            "Restore original water-resistant seals (requires proper heating)"
        ],
        images: [
            "https://images.unsplash.com/photo-1678229895068-d05de447477b?w=800&q=80",
            "https://images.unsplash.com/photo-1678229896010-8580c85c3bdf?w=800&q=80",
            "https://images.unsplash.com/photo-1618451121171-ec5af7ce1afb?w=800&q=80"
        ]
    },
    {
        name: "Galaxy Z Fold 5 Inner Folding Screen Matrix",
        brand: "Samsung",
        categoryPath: ["Samsung", "Galaxy Z Series", "Galaxy Z Fold 5"],
        price: 540.00,
        condition: "OEM Refurb",
        description: `
            <p>The crown jewel of the Samsung foldable lineup. Replacing the inner folding screen of the Z Fold 5 is no small feat, but this immaculate OEM Refurbished matrix part provides everything needed for a successful restoration.</p>
            <p>The ultra-thin glass (UTG) layer is factory laminated beneath the protective polymer, ensuring the crease remains as minimal as factory original.</p>
        `,
        features: [
            "Factory Laminated Ultra-Thin Glass (UTG)",
            "Includes revised, flatter hinge integration points",
            "S-Pen Fold Edition fully supported",
            "Pre-applied factory screen protector"
        ],
        images: [
            "https://images.unsplash.com/photo-1692257912423-f2abdb51bada?w=800&q=80",
            "https://images.unsplash.com/photo-1692257912301-3b7c4d5ab797?w=800&q=80",
            "https://images.unsplash.com/photo-1692257912642-1e7a4b64be80?w=800&q=80"
        ]
    },

    // GOOGLE
    {
        name: "Pixel 9 Pro LTPO OLED Display Assembly",
        brand: "Google",
        categoryPath: ["Google", "Pixel Phones", "Pixel 9 Pro"],
        price: 215.00,
        condition: "New",
        description: `
            <p>Revive Google's premium flagship with this gorgeous LTPO OLED Display Assembly for the Pixel 9 Pro. The LTPO technology intelligently dials down the refresh rate to 1Hz when viewing static content, preserving massive amounts of battery life.</p>
            <p>This part features the precise symmetrical bezels and integrates flawlessly with Google's under-display optical fingerprint scanner.</p>
        `,
        features: [
            "LTPO Technology (1Hz - 120Hz Variable Refresh)",
            "Supports peak HDR video brightness",
            "Optical Fingerprint Scanner Window precision cut",
            "Pre-installed ear speaker mesh"
        ],
        images: [
            "https://images.unsplash.com/photo-1664478546384-d57ffe74a78c?w=800&q=80",
            "https://images.unsplash.com/photo-1664478546059-45e0f119e34d?w=800&q=80",
            "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&q=80"
        ]
    },
    {
        name: "Pixel 8 Pro Rear Camera Module",
        brand: "Google",
        categoryPath: ["Google", "Pixel Phones", "Pixel 8 Pro"],
        price: 95.00,
        condition: "OEM Refurb",
        description: `
            <p>The magic behind Google's computational photography lies in the hardware. If your Pixel 8 Pro camera is vibrating uncontrollably, failing to focus, or showing black spots, replacing the main multi-lens module is required.</p>
            <p>This OEM module includes the Main width, Ultra-wide, and Telephoto periscope lenses. OIS (Optical Image Stabilization) is meticulously calibrated.</p>
        `,
        features: [
            "Triple Lens Array (Wide, Ultra-wide, Telephoto)",
            "Factory Calibrated Optical Image Stabilization (OIS)",
            "Supports fully features: Night Sight, Magic Eraser, Video Boost"
        ],
        images: [
            "https://images.unsplash.com/photo-1517404215738-15263e9f9178?w=800&q=80",
            "https://images.unsplash.com/photo-1592862808006-258169136ca5?w=800&q=80",
            "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&q=80"
        ]
    },

    // MOTOROLA
    {
        name: "Moto G Stylus 5G 2025 LCD Screen",
        brand: "Motorola",
        categoryPath: ["Motorola", "Moto G Series", "Moto G Stylus 5G 2025"],
        price: 45.00,
        condition: "Premium Aftermarket",
        description: `
            <p>A cost-effective, brilliant LCD replacement for the Moto G Stylus 5G (2025 Edition). This highly responsive digitizer supports the embedded Motorola active stylus perfectly.</p>
            <p>Don't tolerate a cracked screen when this aftermarket option restores 100% functionality and color reproduction at a fraction of the device's cost.</p>
        `,
        features: [
            "Vibrant IPS LCD Technology",
            "100% Stylus tracking accuracy",
            "Includes pre-installed framing brackets"
        ],
        images: [
            "https://images.unsplash.com/photo-1541344460029-478acb6fc910?w=800&q=80",
            "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&q=80",
            "https://images.unsplash.com/photo-1518118014377-ce746ce014cc?w=800&q=80"
        ]
    },
    {
        name: "Moto G Power 2024 OEM Battery (5000 mAh)",
        brand: "Motorola",
        categoryPath: ["Motorola", "Moto G Series", "Moto G Power 2024"],
        price: 24.00,
        condition: "New",
        description: `
            <p>The "Power" moniker is earned by its legendary 3-day battery lifespan. If your Moto G Power 2024 is struggling to make it through a single afternoon, this brand new, zero-cycle 5000mAh OEM battery will revive it.</p>
            <p>Manufactured using advanced dense cell chemistry to provide stable discharge under heavy CPU loads.</p>
        `,
        features: [
            "Massive 5000 mAh True Capacity",
            "Zero Cycle / Brand New Manufacture",
            "Advanced dense cell lithium-ion chemistry",
            "Includes battery flex ribbon and seating adhesive"
        ],
        images: [
            "https://images.unsplash.com/photo-1616422285623-14c1d47cd9b2?w=800&q=80",
            "https://images.unsplash.com/photo-1574044195191-496696d01d4a?w=800&q=80",
            "https://images.unsplash.com/photo-1542456561-bd8cde9bfb10?w=800&q=80"
        ]
    },

    // ONEPLUS
    {
        name: "OnePlus 12 Fluid AMOLED Pro Display Integration",
        brand: "OnePlus",
        categoryPath: ["OnePlus", "OnePlus Phones", "OnePlus 12"],
        price: 280.00,
        condition: "OEM Refurb",
        description: `
            <p>Ensure the hyper-smooth "Never Settle" experience continues. This stunning Fluid AMOLED Pro display for the OnePlus 12 delivers insanely smooth 120Hz scrolling and incredible color depth.</p>
            <p>This assembly includes the frame for structural rigidity and houses the cooling vapor chamber backing seamlessly.</p>
        `,
        features: [
            "Fluid AMOLED Technology with 120Hz refresh",
            "Extremely low touch latency (hyper-responsive)",
            "Pre-installed in structural frame",
            "Aqua-touch firmware functionality supported"
        ],
        images: [
            "https://images.unsplash.com/photo-1654269666270-f421f15886a0?w=800&q=80",
            "https://images.unsplash.com/photo-1654269666016-5bda61b0a880?w=800&q=80",
            "https://images.unsplash.com/photo-1511385348-a52b4a160dc2?w=800&q=80"
        ]
    },
    {
        name: "OnePlus Open Inner Flex Sub-Screen Matrix",
        brand: "OnePlus",
        categoryPath: ["OnePlus", "OnePlus Phones", "OnePlus Open"],
        price: 610.00,
        condition: "New",
        description: `
            <p>The pinnacle of OnePlus engineering. The inner display matrix of the OnePlus Open boasts the least visible crease in the industry. Replacing it demands absolute precision. This brand-new OEM internal matrix ensures uniform tension and factory-certified flexibility.</p>
            <p>It comes with the entire hinge articulation mechanism attached to ensure proper closing resistance and long lifespan.</p>
        `,
        features: [
            "Industry-leading Anti-Crease tension system",
            "Peak brightness uniformity validated",
            "Includes integrated hinge articulation mechanics",
            "Requires specialized foldable jig for installation"
        ],
        images: [
            "https://images.unsplash.com/photo-1692257912423-f2abdb51bada?w=800&q=80",
            "https://images.unsplash.com/photo-1504270997636-07ddfbd48945?w=800&q=80",
            "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?w=800&q=80"
        ]
    },

    // TOOLS
    {
        name: "iFixit Pro Tech Toolkit (Master Mobile Fixes)",
        brand: "iFixit",
        categoryPath: ["Tools & Supplies", "Repair Tools", "iFixit Pro Tech Toolkit"],
        price: 65.00,
        condition: "New",
        description: `
            <p>The industry standard for electronics repair. The Pro Tech Toolkit contains every screwdriver bit, prying tool, and suction handle needed to break into any modern smartphone, tablet, or laptop.</p>
            <p>The Mako Driver Kit includes 64 high-quality S2 steel bits ranging from standard Phillips to specialized Pentalobe and Tri-point tips. A must-have for any repair business.</p>
        `,
        features: [
            "64-Bit Mako Precision Driver Kit (S2 Steel)",
            "Anti-static wrist strap & tweezers",
            "Multiple specialized opening picks and spudgers",
            "Magnetic pad for screw tracking",
            "Heavy-duty nylon roll-up tool bag"
        ],
        images: [
            "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=800&q=80",
            "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80",
            "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=800&q=80"
        ]
    },
    {
        name: "Mechanic iShort Max Short Circuit Killer",
        brand: "Mechanic",
        categoryPath: ["Tools & Supplies", "Repair Tools", "Precision Screwdrivers"],
        price: 89.99,
        condition: "New",
        description: `
            <p>The ultimate micro-soldering diagnostic tool. The Mechanic iShort Max injects a highly controlled current into logic boards to instantly identify short circuits by rapidly heating the failing capacitor or IC.</p>
            <p>Features an adjustable voltage and current limiting dial to prevent damage to surrounding sensitive components on modern high-density motherboards.</p>
        `,
        features: [
            "Rapidly burns out VCC_MAIN or VDD_BOOST shorts",
            "1-second diagnostic heat indication",
            "Adjustable 0.5V - 4.2V limits",
            "Heavy-gauge injection probes included",
            "Digital LED telemetry screen"
        ],
        images: [
            "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=800&q=80",
            "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800&q=80",
            "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80"
        ]
    }
];

async function main() {
    console.log("🧹 Cleaning up old db records...");
    try {
        await prisma.orderItem.deleteMany({});
        await prisma.order.deleteMany({});
        await prisma.product.deleteMany({});
        await prisma.category.deleteMany({});
        await prisma.user.deleteMany({});
        console.log("✅ Cleanup complete.");
    } catch (e) {
        console.log("ℹ️ Cleanup encountered an issue or database is already clean:", e);
    }

    // CREATE CATEGORIES
    console.log("📁 Seeding Nested Categories...");
    const categoryMap = new Map();

    for (const [parentName, subCategories] of Object.entries(CATEGORIES_HIERARCHY)) {
        const parent = await prisma.category.create({
            data: {
                name: parentName,
                slug: generateSlug(parentName),
            }
        });
        categoryMap.set(parentName, parent.id);

        for (const [subCatName, models] of Object.entries(subCategories)) {
            const subCat = await prisma.category.create({
                data: {
                    name: subCatName,
                    slug: generateSlug(`${parentName}-${subCatName}`),
                    parentId: parent.id
                }
            });
            categoryMap.set(`${parentName}-${subCatName}`, subCat.id);

            for(const modelName of models) {
                const modelCat = await prisma.category.create({
                    data: {
                        name: modelName,
                        slug: generateSlug(modelName),
                        parentId: subCat.id
                    }
                });
                categoryMap.set(modelName, modelCat.id);
            }
        }
    }

    // Seed "Tools & Supplies" uniquely
    const toolsParent = await prisma.category.create({ data: { name: "Tools & Supplies", slug: "tools-supplies" }});
    const repairTools = await prisma.category.create({ data: { name: "Repair Tools", slug: "repair-tools", parentId: toolsParent.id }});
    const screwdrivers = await prisma.category.create({ data: { name: "Precision Screwdrivers", slug: "precision-screwdrivers", parentId: repairTools.id }});
    const iFixitCat = await prisma.category.create({ data: { name: "iFixit Pro Tech Toolkit", slug: "ifixit-pro-tech-toolkit", parentId: repairTools.id }});
    
    categoryMap.set("Tools & Supplies", toolsParent.id);
    categoryMap.set("Repair Tools", repairTools.id);
    categoryMap.set("Precision Screwdrivers", screwdrivers.id);
    categoryMap.set("iFixit Pro Tech Toolkit", iFixitCat.id);

    console.log("🛍️ Seeding Ultra-Realistic Products...");
    let skuCounter = 1000;

    for (const prod of REALISTIC_PRODUCTS) {
        // Find the deepest category ID
        const targetModelName = prod.categoryPath[prod.categoryPath.length - 1];
        let catId = categoryMap.get(targetModelName);

        if (!catId) {
            console.warn(`Warning: Category ${targetModelName} not found mapped. Falling back to root.`);
            catId = categoryMap.values().next().value; 
        }

        const retailPrice = +(prod.price * 1.8).toFixed(2); // Retail is roughly 80% markup

        await prisma.product.create({
            data: {
                sku: `ISW-${skuCounter++}`,
                name: prod.name,
                slug: generateSlug(prod.name),
                brand: prod.brand,
                description: prod.description,
                shortDescription: "High-quality premium replacement part.",
                wholesalePrice: prod.price,
                retailPrice: retailPrice,
                compatibility: prod.categoryPath.join(', '),
                stock: Math.floor(Math.random() * 200) + 15,
                images: JSON.stringify(prod.images),
                features: JSON.stringify(prod.features),
                reviews: JSON.stringify(getRandomReviews(Math.floor(Math.random() * 3) + 2)), // 2 to 4 reviews
                categoryId: catId,
                isFeatured: Math.random() > 0.5,
                // Passing condition inside brand if needed, or we just map it in UI badge. 
                // We'll store it in warranty field to easily pull it out in UI.
                warranty: prod.condition 
            }
        });
    }

    console.log("🚀 Database entirely seeded with premium, realistic data!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
