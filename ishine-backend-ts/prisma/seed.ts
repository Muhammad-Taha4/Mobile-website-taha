import { prisma } from '../src/config/prisma';

const realProducts = [
    {
        "name": "Galaxy S24 Ultra LCD with Frame Soft OLED",
        "sku": "ISW-16001",
        "slug": "galaxy-s24-ultra-lcd-with-frame-soft-oled-175",
        "description": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "shortDescription": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "wholesalePrice": 88.5,
        "retailPrice": 115.05,
        "costPrice": 61.949999999999996,
        "stock": 150,
        "brand": "Samsung",
        "compatibility": "Galaxy S24 Ultra",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2026/02/S24-Ultra-LCD.svg"
        ]
    },
    {
        "name": "Moto G Play 2023 OEM LCD Display with Frame",
        "sku": "IA0005",
        "slug": "moto-g-play-2023-oem-lcd-display-with-frame-775",
        "description": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "shortDescription": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "wholesalePrice": 17.95,
        "retailPrice": 23.335,
        "costPrice": 12.565,
        "stock": 150,
        "brand": "Motorola",
        "compatibility": "Moto G Play",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2026/02/Moto-G-Play-2023-LCD.svg"
        ]
    },
    {
        "name": "Moto G Stylus 5G 2022 LCD Display with Frame",
        "sku": "IA0019",
        "slug": "moto-g-stylus-5g-2022-lcd-display-with-frame-316",
        "description": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "shortDescription": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "wholesalePrice": 27.95,
        "retailPrice": 36.335,
        "costPrice": 19.564999999999998,
        "stock": 150,
        "brand": "Motorola",
        "compatibility": "Moto G Stylus",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2026/02/Moto-G-Stylus-2022-LCD-1.svg"
        ]
    },
    {
        "name": "Moto G Play 2021 LCD Display Assembly with Frame",
        "sku": "IA0018",
        "slug": "moto-g-play-2021-lcd-display-assembly-with-frame-240",
        "description": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "shortDescription": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "wholesalePrice": 18,
        "retailPrice": 23.400000000000002,
        "costPrice": 12.6,
        "stock": 150,
        "brand": "Motorola",
        "compatibility": "Moto G Play",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2026/02/Moto-G-Play-2021-LCD.svg"
        ]
    },
    {
        "name": "Moto G Power 2021 LCD Display with Frame OEM",
        "sku": "IA0016",
        "slug": "moto-g-power-2021-lcd-display-with-frame-oem-506",
        "description": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "shortDescription": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "wholesalePrice": 18,
        "retailPrice": 23.400000000000002,
        "costPrice": 12.6,
        "stock": 150,
        "brand": "Motorola",
        "compatibility": "Moto G Power",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2026/02/Moto-G-Power-2021-LCD.png"
        ]
    },
    {
        "name": "Samsung A35 LCD with Frame incell",
        "sku": "EA0015",
        "slug": "samsung-a35-lcd-with-frame-incell-243",
        "description": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "shortDescription": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "wholesalePrice": 25.5,
        "retailPrice": 33.15,
        "costPrice": 17.849999999999998,
        "stock": 150,
        "brand": "Samsung",
        "compatibility": "Samsung A35 LCD",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2026/02/Samsung-A35-LCD.png"
        ]
    },
    {
        "name": "Moto G Play 2026 LCD Display Assembly with Frame",
        "sku": "IA0021",
        "slug": "moto-g-play-2026-lcd-display-assembly-with-frame-370",
        "description": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "shortDescription": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "wholesalePrice": 24.5,
        "retailPrice": 31.85,
        "costPrice": 17.15,
        "stock": 150,
        "brand": "Motorola",
        "compatibility": "Moto G Play",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2026/02/Moto-G-Play-2026-LCD.svg"
        ]
    },
    {
        "name": "Galaxy S25 LCD with Frame Soft OLED",
        "sku": "ES0013",
        "slug": "galaxy-s25-lcd-with-frame-soft-oled-465",
        "description": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "shortDescription": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "wholesalePrice": 131,
        "retailPrice": 170.3,
        "costPrice": 91.69999999999999,
        "stock": 150,
        "brand": "Samsung",
        "compatibility": "Galaxy S25 LCD",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2026/02/S25-LCD.png"
        ]
    },
    {
        "name": "Galaxy S24 LCD with Frame",
        "sku": "ES0027",
        "slug": "galaxy-s24-lcd-with-frame-91",
        "description": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "shortDescription": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "wholesalePrice": 109,
        "retailPrice": 141.70000000000002,
        "costPrice": 76.3,
        "stock": 150,
        "brand": "Samsung",
        "compatibility": "Galaxy S24 LCD",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2026/02/S24-LCD.png"
        ]
    },
    {
        "name": "iPhone 17 Soft OLED LCD Display Assembly",
        "sku": "D00028",
        "slug": "iphone-17-soft-oled-lcd-display-assembly-718",
        "description": "High-quality professional replacement part.",
        "shortDescription": "High-quality professional replacement part.",
        "wholesalePrice": 105,
        "retailPrice": 136.5,
        "costPrice": 73.5,
        "stock": 150,
        "brand": "Apple",
        "compatibility": "iPhone 17 Soft",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2026/02/iPhone-17-Soft-OLED.png"
        ]
    },
    {
        "name": "iPhone 17 Pro Soft OLED LCD Display Assembly",
        "sku": "D00029",
        "slug": "iphone-17-pro-soft-oled-lcd-display-assembly-654",
        "description": "High-quality professional replacement part.",
        "shortDescription": "High-quality professional replacement part.",
        "wholesalePrice": 119,
        "retailPrice": 154.70000000000002,
        "costPrice": 83.3,
        "stock": 150,
        "brand": "Apple",
        "compatibility": "iPhone 17 Pro",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2026/02/iPhone-17-pro-Soft-OLED-1.png"
        ]
    },
    {
        "name": "iPhone 16 FHD incell LCD with Frame",
        "sku": "B00021",
        "slug": "iphone-16-fhd-incell-lcd-with-frame-226",
        "description": "High-quality professional replacement part.",
        "shortDescription": "High-quality professional replacement part.",
        "wholesalePrice": 33.95,
        "retailPrice": 44.135000000000005,
        "costPrice": 23.765,
        "stock": 150,
        "brand": "Apple",
        "compatibility": "iPhone 16 FHD",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2026/02/iPhone-16-FHD-incell.png"
        ]
    },
    {
        "name": "iPhone 12 Mini LCD Display Assembly HD+ incell IC Transplant",
        "sku": "A00010",
        "slug": "iphone-12-mini-lcd-display-assembly-hd-incell-ic-transplant-166",
        "description": "Support True Tone Display\n\nHD High Brightness over 500 plus-minus 50 cd/m2\n\nSupport Multi-touch Function\n\nOriginal Notch Size\n\nESR High Color Gamut\n\nWith Oleophobic Coating\n\n360 Sunglasses Readable",
        "shortDescription": "Support True Tone Display\n\nHD High Brightness over 500 plus-minus 50 cd/m2\n\nSupport Multi-touch Function\n\nOriginal Notch Size\n\nESR High Color Gamut\n\nW",
        "wholesalePrice": 19.75,
        "retailPrice": 25.675,
        "costPrice": 13.825,
        "stock": 150,
        "brand": "Apple",
        "compatibility": "iPhone 12 Mini",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2026/02/iPhone-12-mini-LCD-.svg",
            "https://ishinewireless.com/wp-content/uploads/2025/01/12-Mini-7-400x400-2.webp",
            "https://ishinewireless.com/wp-content/uploads/2025/01/12-Mini-6-400x400-2.webp",
            "https://ishinewireless.com/wp-content/uploads/2025/01/12-Mini-5-400x400-2.webp",
            "https://ishinewireless.com/wp-content/uploads/2025/01/12-Mini-3-400x400-2.webp",
            "https://ishinewireless.com/wp-content/uploads/2025/01/12-Mini-2-400x400-2.webp",
            "https://ishinewireless.com/wp-content/uploads/2025/01/12-Mini-1-400x400-2.webp"
        ]
    },
    {
        "name": "Nokia G310 LCD without Frame",
        "sku": "ISW-15804",
        "slug": "nokia-g310-lcd-without-frame-669",
        "description": "Nokia G310 LCD without Frame",
        "shortDescription": "Nokia G310 LCD without Frame",
        "wholesalePrice": 18.5,
        "retailPrice": 24.05,
        "costPrice": 12.95,
        "stock": 150,
        "brand": "Nokia",
        "compatibility": "Nokia G310 LCD",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2026/02/Nokia-G310-LCD.png"
        ]
    },
    {
        "name": "HDMI Port Connector for Xbox One X",
        "sku": "JF0006",
        "slug": "hdmi-port-connector-for-xbox-one-x-542",
        "description": "High-quality professional replacement part.",
        "shortDescription": "High-quality professional replacement part.",
        "wholesalePrice": 4.5,
        "retailPrice": 5.8500000000000005,
        "costPrice": 3.15,
        "stock": 150,
        "brand": "iShine Tools",
        "compatibility": "HDMI Port Connector",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2026/01/HDMI-Port-Connector-for-Xbox-One-X.svg"
        ]
    },
    {
        "name": "HDMI Port Connector for Xbox One S",
        "sku": "JF0005",
        "slug": "hdmi-port-connector-for-xbox-one-s-584",
        "description": "High-quality professional replacement part.",
        "shortDescription": "High-quality professional replacement part.",
        "wholesalePrice": 4.5,
        "retailPrice": 5.8500000000000005,
        "costPrice": 3.15,
        "stock": 150,
        "brand": "iShine Tools",
        "compatibility": "HDMI Port Connector",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2026/01/HDMI-Port-Connector-For-Xbox-One-S.svg"
        ]
    },
    {
        "name": "Bottoman HDMI Charging Port for Nintendo Switch 2",
        "sku": "JF0004",
        "slug": "bottoman-hdmi-charging-port-for-nintendo-switch-2-762",
        "description": "High-quality professional replacement part.",
        "shortDescription": "High-quality professional replacement part.",
        "wholesalePrice": 3.95,
        "retailPrice": 5.135000000000001,
        "costPrice": 2.765,
        "stock": 150,
        "brand": "iShine Tools",
        "compatibility": "Bottoman HDMI Charging",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2026/01/Bottoman-HDMI-Charging-Port-for-Nintendo-Switch-2.svg"
        ]
    },
    {
        "name": "USB-C Charging Port for Nintendo Switch OLED",
        "sku": "JF0003",
        "slug": "usb-c-charging-port-for-nintendo-switch-oled-92",
        "description": "High-quality professional replacement part.",
        "shortDescription": "High-quality professional replacement part.",
        "wholesalePrice": 3.95,
        "retailPrice": 5.135000000000001,
        "costPrice": 2.765,
        "stock": 150,
        "brand": "iShine Tools",
        "compatibility": "USB-C Charging Port",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2026/01/USB-C-Charging-Port-for-Nintendo-Switch-OLED.svg"
        ]
    },
    {
        "name": "USB Charging Port for Nintendo Switch",
        "sku": "JF0002",
        "slug": "usb-charging-port-for-nintendo-switch-570",
        "description": "High-quality professional replacement part.",
        "shortDescription": "High-quality professional replacement part.",
        "wholesalePrice": 3.95,
        "retailPrice": 5.135000000000001,
        "costPrice": 2.765,
        "stock": 150,
        "brand": "iShine Tools",
        "compatibility": "USB Charging Port",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2026/01/USB-Charging-Port-for-Nintendo-Switch.svg"
        ]
    },
    {
        "name": "Charging Port for Samsung Tab A9 Plus",
        "sku": "HA0013",
        "slug": "charging-port-for-samsung-tab-a9-plus-61",
        "description": "High-quality professional replacement part.",
        "shortDescription": "High-quality professional replacement part.",
        "wholesalePrice": 4.5,
        "retailPrice": 5.8500000000000005,
        "costPrice": 3.15,
        "stock": 150,
        "brand": "Samsung",
        "compatibility": "Charging Port for",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2026/01/Charging-Port-for-Samsung-Tab-A9-Plus.svg"
        ]
    },
    {
        "name": "Battery for iPad Air 4 / Air 5 / 10 Gen",
        "sku": "G00061",
        "slug": "battery-for-ipad-air-4-air-5-10-gen-909",
        "description": "Powerful Lithium Chip\n\nOriginal Capacity\n\nMultiple Protection\n\nQuick Charging",
        "shortDescription": "Powerful Lithium Chip\n\nOriginal Capacity\n\nMultiple Protection\n\nQuick Charging",
        "wholesalePrice": 27.5,
        "retailPrice": 35.75,
        "costPrice": 19.25,
        "stock": 150,
        "brand": "Apple",
        "compatibility": "Battery for iPad",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2026/01/iPad-Air-4-Air-5-10-Gen-battery.svg"
        ]
    },
    {
        "name": "Battery for iPad 6/7/8/9",
        "sku": "G00063",
        "slug": "battery-for-ipad-6-7-8-9-880",
        "description": "Powerful Lithium Chip\n\nOriginal Capacity\n\nMultiple Protection\n\nQuick Charging",
        "shortDescription": "Powerful Lithium Chip\n\nOriginal Capacity\n\nMultiple Protection\n\nQuick Charging",
        "wholesalePrice": 14.5,
        "retailPrice": 18.85,
        "costPrice": 10.149999999999999,
        "stock": 150,
        "brand": "Apple",
        "compatibility": "Battery for iPad",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2026/01/iPad-6789-battery.svg"
        ]
    },
    {
        "name": "iPhone 16E Battery",
        "sku": "G00003",
        "slug": "iphone-16e-battery-23",
        "description": "New 0 Cycle Battery\n\nPowerful Lithium Chip\n\nOriginal Capacity\n\nSupport Low Temp Working\n\nMultiple Protection\n\nQuick Charging",
        "shortDescription": "New 0 Cycle Battery\n\nPowerful Lithium Chip\n\nOriginal Capacity\n\nSupport Low Temp Working\n\nMultiple Protection\n\nQuick Charging",
        "wholesalePrice": 15,
        "retailPrice": 19.5,
        "costPrice": 10.5,
        "stock": 150,
        "brand": "Apple",
        "compatibility": "iPhone 16E Battery",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2026/01/iPhone-16E-Battery.svg"
        ]
    },
    {
        "name": "Galaxy S23 FE Battery",
        "sku": "ISW-15728",
        "slug": "galaxy-s23-fe-battery-939",
        "description": "Powerful Lithium Chip\n\nOriginal Capacity\n\nMultiple Protection\n\nQuick Charging",
        "shortDescription": "Powerful Lithium Chip\n\nOriginal Capacity\n\nMultiple Protection\n\nQuick Charging",
        "wholesalePrice": 10,
        "retailPrice": 13,
        "costPrice": 7,
        "stock": 150,
        "brand": "Samsung",
        "compatibility": "Galaxy S23 FE",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2025/02/Samsung-Battery-1000x1333-1.webp"
        ]
    },
    {
        "name": "Galaxy Note 20 Ultra Battery",
        "sku": "ISW-15727",
        "slug": "galaxy-note-20-ultra-battery-943",
        "description": "Powerful Lithium Chip\n\nOriginal Capacity\n\nMultiple Protection\n\nQuick Charging",
        "shortDescription": "Powerful Lithium Chip\n\nOriginal Capacity\n\nMultiple Protection\n\nQuick Charging",
        "wholesalePrice": 9.75,
        "retailPrice": 12.675,
        "costPrice": 6.824999999999999,
        "stock": 150,
        "brand": "Samsung",
        "compatibility": "Galaxy Note 20",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2025/02/Samsung-Battery-1000x1333-1.webp"
        ]
    },
    {
        "name": "Pixel 8A LCD with Frame",
        "sku": "ISW-15725",
        "slug": "pixel-8a-lcd-with-frame-208",
        "description": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "shortDescription": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "wholesalePrice": 0,
        "retailPrice": 0,
        "costPrice": 0,
        "stock": 150,
        "brand": "Google",
        "compatibility": "Pixel 8A LCD",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2026/01/Pixel-8A-LCD-1.svg"
        ]
    },
    {
        "name": "Pixel 7A LCD with Frame",
        "sku": "ISW-15722",
        "slug": "pixel-7a-lcd-with-frame-256",
        "description": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "shortDescription": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "wholesalePrice": 0,
        "retailPrice": 0,
        "costPrice": 0,
        "stock": 150,
        "brand": "Google",
        "compatibility": "Pixel 7A LCD",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2026/01/Pixel-7A-LCD-.svg"
        ]
    },
    {
        "name": "Galaxy S25 LCD with Frame",
        "sku": "ESA002-1",
        "slug": "galaxy-s25-lcd-with-frame-35",
        "description": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "shortDescription": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "wholesalePrice": 135,
        "retailPrice": 175.5,
        "costPrice": 94.5,
        "stock": 150,
        "brand": "Samsung",
        "compatibility": "Galaxy S25 LCD",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2026/01/S25-LCD.png"
        ]
    },
    {
        "name": "Galaxy S25 Ultra LCD with Frame",
        "sku": "ISW-15674",
        "slug": "galaxy-s25-ultra-lcd-with-frame-184",
        "description": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "shortDescription": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "wholesalePrice": 198,
        "retailPrice": 257.40000000000003,
        "costPrice": 138.6,
        "stock": 150,
        "brand": "Samsung",
        "compatibility": "Galaxy S25 Ultra",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2025/07/S25-Ultra-LCD.png"
        ]
    },
    {
        "name": "iPhone 17 Pro Max Soft OLED LCD Display Assembly",
        "sku": "D00030",
        "slug": "iphone-17-pro-max-soft-oled-lcd-display-assembly-466",
        "description": "High-quality professional replacement part.",
        "shortDescription": "High-quality professional replacement part.",
        "wholesalePrice": 160,
        "retailPrice": 208,
        "costPrice": 112,
        "stock": 150,
        "brand": "Apple",
        "compatibility": "iPhone 17 Pro",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2026/01/iPhone-17-pro-max-Soft-OLED.webp"
        ]
    },
    {
        "name": "Moto G Power 2022 LCD Display with Frame OEM",
        "sku": "IA0015",
        "slug": "moto-g-power-2022-lcd-display-with-frame-oem-648",
        "description": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "shortDescription": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "wholesalePrice": 16.5,
        "retailPrice": 21.45,
        "costPrice": 11.549999999999999,
        "stock": 150,
        "brand": "Motorola",
        "compatibility": "Moto G Power",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2026/01/Moto-G-Power-2022-LCD.svg"
        ]
    },
    {
        "name": "iPhone 16E FHD incell LCD with Frame",
        "sku": "B00023",
        "slug": "iphone-16e-fhd-incell-lcd-with-frame-187",
        "description": "High-quality professional replacement part.",
        "shortDescription": "High-quality professional replacement part.",
        "wholesalePrice": 24,
        "retailPrice": 31.200000000000003,
        "costPrice": 16.799999999999997,
        "stock": 150,
        "brand": "Apple",
        "compatibility": "iPhone 16E FHD",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2026/01/iPhone-16E-FHD-incell.svg"
        ]
    },
    {
        "name": "Charging Port Flex Cable for iPad 5/6 (High Quality)",
        "sku": "ISW-15620",
        "slug": "charging-port-flex-cable-for-ipad-5-6-high-quality-422",
        "description": "High-quality professional replacement part.",
        "shortDescription": "High-quality professional replacement part.",
        "wholesalePrice": 4.5,
        "retailPrice": 5.8500000000000005,
        "costPrice": 3.15,
        "stock": 150,
        "brand": "Apple",
        "compatibility": "Charging Port Flex",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2026/01/Charging-port-for-iPad-5-6-Black.svg"
        ]
    },
    {
        "name": "Charging Port Flex Cable for iPad 7/8/9 (High Quality)",
        "sku": "ISW-15610",
        "slug": "charging-port-flex-cable-for-ipad-7-8-9-high-quality-555",
        "description": "High-quality professional replacement part.",
        "shortDescription": "High-quality professional replacement part.",
        "wholesalePrice": 4.5,
        "retailPrice": 5.8500000000000005,
        "costPrice": 3.15,
        "stock": 150,
        "brand": "Apple",
        "compatibility": "Charging Port Flex",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2026/01/iPad-789-Black.svg"
        ]
    },
    {
        "name": "Samsung A17 5G LCD with Frame incell",
        "sku": "EA0067",
        "slug": "samsung-a17-5g-lcd-with-frame-incell-492",
        "description": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "shortDescription": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "wholesalePrice": 26.5,
        "retailPrice": 34.45,
        "costPrice": 18.549999999999997,
        "stock": 150,
        "brand": "Samsung",
        "compatibility": "Samsung A17 5G",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2026/01/Samsung-A17-5G-LCD.svg"
        ]
    },
    {
        "name": "OnePlus 5G N10 LCD with Frame OEM",
        "sku": "JE0005",
        "slug": "oneplus-5g-n10-lcd-with-frame-oem-829",
        "description": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "shortDescription": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "wholesalePrice": 19.5,
        "retailPrice": 25.35,
        "costPrice": 13.649999999999999,
        "stock": 150,
        "brand": "OnePlus",
        "compatibility": "OnePlus 5G N10",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2026/01/OnePlus-N10-5G-LCD.svg"
        ]
    },
    {
        "name": "Samsung A51 4G LCD with Frame Incell",
        "sku": "EA0018",
        "slug": "samsung-a51-4g-lcd-with-frame-incell-179",
        "description": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "shortDescription": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "wholesalePrice": 16.5,
        "retailPrice": 21.45,
        "costPrice": 11.549999999999999,
        "stock": 150,
        "brand": "Samsung",
        "compatibility": "Samsung A51 4G",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2026/01/Samsung-A51-LCD.svg"
        ]
    },
    {
        "name": "OnePlus N300 LCD with Frame OEM",
        "sku": "JE0003",
        "slug": "oneplus-n300-lcd-with-frame-oem-118",
        "description": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "shortDescription": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "wholesalePrice": 19,
        "retailPrice": 24.7,
        "costPrice": 13.299999999999999,
        "stock": 150,
        "brand": "OnePlus",
        "compatibility": "OnePlus N300 LCD",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2026/01/OnePlus-N300-LCD.svg"
        ]
    },
    {
        "name": "Moto G Stylus 5G 2025 LCD Display with Frame",
        "sku": "IA0004",
        "slug": "moto-g-stylus-5g-2025-lcd-display-with-frame-373",
        "description": "Display Assembly with Frame OG for MOTO G STYLUS 2025\n\n9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "shortDescription": "Display Assembly with Frame OG for MOTO G STYLUS 2025\n\n9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "wholesalePrice": 53.5,
        "retailPrice": 69.55,
        "costPrice": 37.449999999999996,
        "stock": 150,
        "brand": "Motorola",
        "compatibility": "Moto G Stylus",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2026/01/Moto-G-Stylus-2025-LCD.svg"
        ]
    },
    {
        "name": "Moto G Power 2024 LCD Display with Frame OEM",
        "sku": "ISW-15565",
        "slug": "moto-g-power-2024-lcd-display-with-frame-oem-684",
        "description": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "shortDescription": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "wholesalePrice": 22.5,
        "retailPrice": 29.25,
        "costPrice": 15.749999999999998,
        "stock": 150,
        "brand": "Motorola",
        "compatibility": "Moto G Power",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2026/01/Moto-G-Power-2024-LCD.svg"
        ]
    },
    {
        "name": "Pixel 6A Hard OLED LCD with Frame",
        "sku": "JD0008-1-2",
        "slug": "pixel-6a-hard-oled-lcd-with-frame-259",
        "description": "Hard OLED LCD Display Assembly with Frame For Google Pixel 6A",
        "shortDescription": "Hard OLED LCD Display Assembly with Frame For Google Pixel 6A",
        "wholesalePrice": 62.75,
        "retailPrice": 81.575,
        "costPrice": 43.925,
        "stock": 150,
        "brand": "Google",
        "compatibility": "Pixel 6A Hard",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2026/01/Pixel-6A-LCD-OLED.svg"
        ]
    },
    {
        "name": "Pixel 6 Pro Soft OLED LCD with Frame",
        "sku": "JD0008-1",
        "slug": "pixel-6-pro-soft-oled-lcd-with-frame-163",
        "description": "Soft OLED LCD Display Assembly with Frame For Google Pixel 6 Pro",
        "shortDescription": "Soft OLED LCD Display Assembly with Frame For Google Pixel 6 Pro",
        "wholesalePrice": 38.75,
        "retailPrice": 50.375,
        "costPrice": 27.125,
        "stock": 150,
        "brand": "Google",
        "compatibility": "Pixel 6 Pro",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2026/01/Pixel-6-Pro-LCD-OLED.svg"
        ]
    },
    {
        "name": "OnePlus N30 5G LCD with Frame OEM",
        "sku": "JE0004",
        "slug": "oneplus-n30-5g-lcd-with-frame-oem-325",
        "description": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "shortDescription": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "wholesalePrice": 18.5,
        "retailPrice": 24.05,
        "costPrice": 12.95,
        "stock": 150,
        "brand": "OnePlus",
        "compatibility": "OnePlus N30 5G",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2026/01/OnePlus-N30-5G-LCD.svg"
        ]
    },
    {
        "name": "Samsung A23 5G LCD with Frame OEM",
        "sku": "ISW-15555",
        "slug": "samsung-a23-5g-lcd-with-frame-oem-893",
        "description": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "shortDescription": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "wholesalePrice": 15.5,
        "retailPrice": 20.150000000000002,
        "costPrice": 10.85,
        "stock": 150,
        "brand": "Samsung",
        "compatibility": "Samsung A23 5G",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2026/01/Samsung-A23-5G-LCD.png"
        ]
    },
    {
        "name": "iPhone 13 VeriPro Hard OLED LCD Assembly IC Transplant",
        "sku": "B0932501-1",
        "slug": "iphone-13-veripro-hard-oled-lcd-assembly-ic-transplant-145",
        "description": "Support True Tone Display\n\n360 Sunglasses Readable\n\nHigh Brightness over 600 plus-minus 50 cd/m2\n\nLow Power Consumption\n\n1:1 Original Thickness\n\n1:1 Original Resolution\n\nWith Oleophobic Coating",
        "shortDescription": "Support True Tone Display\n\n360 Sunglasses Readable\n\nHigh Brightness over 600 plus-minus 50 cd/m2\n\nLow Power Consumption\n\n1:1 Original Thickness\n\n1:1 O",
        "wholesalePrice": 37.77,
        "retailPrice": 49.101000000000006,
        "costPrice": 26.439,
        "stock": 150,
        "brand": "Apple",
        "compatibility": "iPhone 13 VeriPro",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2026/01/iPhone-13-1.svg",
            "https://ishinewireless.com/wp-content/uploads/2025/01/ncc13-6-400x400-1.webp",
            "https://ishinewireless.com/wp-content/uploads/2025/01/ncc13-5-400x400-1.webp",
            "https://ishinewireless.com/wp-content/uploads/2025/01/ncc13-4-400x400-1.webp",
            "https://ishinewireless.com/wp-content/uploads/2025/01/ncc13-3-400x400-1.webp",
            "https://ishinewireless.com/wp-content/uploads/2025/01/ncc13-2-400x400-1.webp",
            "https://ishinewireless.com/wp-content/uploads/2025/01/ncc13-1-400x400-1.webp"
        ]
    },
    {
        "name": "Pixel 6 Soft OLED LCD with Frame",
        "sku": "JD0008",
        "slug": "pixel-6-soft-oled-lcd-with-frame-216",
        "description": "Soft OLED LCD Display Assembly with Frame For Google Pixel 6",
        "shortDescription": "Soft OLED LCD Display Assembly with Frame For Google Pixel 6",
        "wholesalePrice": 39.5,
        "retailPrice": 51.35,
        "costPrice": 27.65,
        "stock": 150,
        "brand": "Google",
        "compatibility": "Pixel 6 Soft",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2025/12/Pixel-6-LCD-OLED.svg"
        ]
    },
    {
        "name": "Charging Port for iPhone 16e",
        "sku": "ISW-15353",
        "slug": "charging-port-for-iphone-16e-252",
        "description": "High-quality professional replacement part.",
        "shortDescription": "High-quality professional replacement part.",
        "wholesalePrice": 22.8,
        "retailPrice": 29.64,
        "costPrice": 15.959999999999999,
        "stock": 150,
        "brand": "Apple",
        "compatibility": "Charging Port for",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2025/12/charging-port-for-iPhone-16e-white.webp"
        ]
    },
    {
        "name": "Charging Port Board for Revvl 7 (High Quality)",
        "sku": "JA001",
        "slug": "charging-port-board-for-revvl-7-high-quality-370",
        "description": "High-quality professional replacement part.",
        "shortDescription": "High-quality professional replacement part.",
        "wholesalePrice": 7.5,
        "retailPrice": 9.75,
        "costPrice": 5.25,
        "stock": 150,
        "brand": "iShine Tools",
        "compatibility": "Charging Port Board",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2025/12/Charging-port-for-revvl-7.svg"
        ]
    },
    {
        "name": "Charging Port Board for MOTO G 5G 2023 (High Quality)",
        "sku": "IAA008",
        "slug": "charging-port-board-for-moto-g-5g-2023-high-quality-743",
        "description": "Charging Port Board for MOTO G 5G 2023",
        "shortDescription": "Charging Port Board for MOTO G 5G 2023",
        "wholesalePrice": 6.5,
        "retailPrice": 8.450000000000001,
        "costPrice": 4.55,
        "stock": 150,
        "brand": "Motorola",
        "compatibility": "Charging Port Board",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2025/12/charging-port-board-for-moto-g-5g-2023.webp"
        ]
    },
    {
        "name": "Charging Port Board for Samsung A15 5G",
        "sku": "HA0007",
        "slug": "charging-port-board-for-samsung-a15-5g-740",
        "description": "Charging Port Board (OG) for Samsung A15 5G",
        "shortDescription": "Charging Port Board (OG) for Samsung A15 5G",
        "wholesalePrice": 8.5,
        "retailPrice": 11.05,
        "costPrice": 5.949999999999999,
        "stock": 150,
        "brand": "Samsung",
        "compatibility": "Charging Port Board",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2025/12/charging-port-for-A15.webp"
        ]
    },
    {
        "name": "Samsung A16 Charging Port Board",
        "sku": "ISW-15343",
        "slug": "samsung-a16-charging-port-board-901",
        "description": "High-quality professional replacement part.",
        "shortDescription": "High-quality professional replacement part.",
        "wholesalePrice": 6.5,
        "retailPrice": 8.450000000000001,
        "costPrice": 4.55,
        "stock": 150,
        "brand": "Samsung",
        "compatibility": "Samsung A16 Charging",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2025/12/charging-port-for-A16.webp"
        ]
    },
    {
        "name": "HDMI Tail Port for PS5",
        "sku": "JC0001",
        "slug": "hdmi-tail-port-for-ps5-766",
        "description": "High-quality professional replacement part.",
        "shortDescription": "High-quality professional replacement part.",
        "wholesalePrice": 2.5,
        "retailPrice": 3.25,
        "costPrice": 1.75,
        "stock": 150,
        "brand": "iShine Tools",
        "compatibility": "HDMI Tail Port",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2025/12/HDMI-port.svg"
        ]
    },
    {
        "name": "Charging Port Board for MOTO G 5G 2025 (High Quality)",
        "sku": "IAA010",
        "slug": "charging-port-board-for-moto-g-5g-2025-high-quality-296",
        "description": "Charging Port Board for MOTO G 5G 2025",
        "shortDescription": "Charging Port Board for MOTO G 5G 2025",
        "wholesalePrice": 7.5,
        "retailPrice": 9.75,
        "costPrice": 5.25,
        "stock": 150,
        "brand": "Motorola",
        "compatibility": "Charging Port Board",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2025/12/charging-port-board-for-moto-g-5g-2025.webp"
        ]
    },
    {
        "name": "Charging Port Board for MOTO G 5G 2024 (High Quality)",
        "sku": "IAA009",
        "slug": "charging-port-board-for-moto-g-5g-2024-high-quality-247",
        "description": "Charging Port Board for MOTO G 5G 2024",
        "shortDescription": "Charging Port Board for MOTO G 5G 2024",
        "wholesalePrice": 7,
        "retailPrice": 9.1,
        "costPrice": 4.8999999999999995,
        "stock": 150,
        "brand": "Motorola",
        "compatibility": "Charging Port Board",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2025/12/charging-port-board-for-moto-g-5g-2024.webp"
        ]
    },
    {
        "name": "iPhone 16 Pro Max incell FHD COF LCD (120 Hz)",
        "sku": "G0001616",
        "slug": "iphone-16-pro-max-incell-fhd-cof-lcd-120-hz-61",
        "description": "High-quality professional replacement part.",
        "shortDescription": "High-quality professional replacement part.",
        "wholesalePrice": 57.5,
        "retailPrice": 74.75,
        "costPrice": 40.25,
        "stock": 150,
        "brand": "Apple",
        "compatibility": "iPhone 16 Pro",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2025/12/iPhone-16-Pro-Max-FHD-incell.svg"
        ]
    },
    {
        "name": "Moto G 5G 2023 OEM LCD Display with Frame",
        "sku": "IA0008",
        "slug": "moto-g-5g-2023-oem-lcd-display-with-frame-858",
        "description": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "shortDescription": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "wholesalePrice": 18.5,
        "retailPrice": 24.05,
        "costPrice": 12.95,
        "stock": 150,
        "brand": "Motorola",
        "compatibility": "Moto G 5G",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2025/12/Moto-G-5G-2023-LCD.svg"
        ]
    },
    {
        "name": "Galaxy S9 Plus LCD with Frame Soft OLED 1:1",
        "sku": "ES0076",
        "slug": "galaxy-s9-plus-lcd-with-frame-soft-oled-1-1-443",
        "description": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "shortDescription": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "wholesalePrice": 85.5,
        "retailPrice": 111.15,
        "costPrice": 59.849999999999994,
        "stock": 150,
        "brand": "Samsung",
        "compatibility": "Galaxy S9 Plus",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2025/12/S9-Plus-LCD.svg"
        ]
    },
    {
        "name": "Galaxy S9 LCD with Frame Soft OLED (Big Size 6.0)",
        "sku": "ES0090",
        "slug": "galaxy-s9-lcd-with-frame-soft-oled-big-size-6-0-904",
        "description": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "shortDescription": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "wholesalePrice": 74.5,
        "retailPrice": 96.85000000000001,
        "costPrice": 52.15,
        "stock": 150,
        "brand": "Samsung",
        "compatibility": "Galaxy S9 LCD",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2025/12/S9-LCD.svg"
        ]
    },
    {
        "name": "Galaxy S8 Plus LCD with Frame Soft OLED 1:1",
        "sku": "ES0081",
        "slug": "galaxy-s8-plus-lcd-with-frame-soft-oled-1-1-419",
        "description": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "shortDescription": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "wholesalePrice": 77.5,
        "retailPrice": 100.75,
        "costPrice": 54.25,
        "stock": 150,
        "brand": "Samsung",
        "compatibility": "Galaxy S8 Plus",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2025/12/S8-Plus-LCD.svg"
        ]
    },
    {
        "name": "Galaxy S8 LCD with Frame Soft OLED (Big Size 6.0)",
        "sku": "ES0091",
        "slug": "galaxy-s8-lcd-with-frame-soft-oled-big-size-6-0-514",
        "description": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "shortDescription": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "wholesalePrice": 72.5,
        "retailPrice": 94.25,
        "costPrice": 50.75,
        "stock": 150,
        "brand": "Samsung",
        "compatibility": "Galaxy S8 LCD",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2025/12/S8-LCD.svg"
        ]
    },
    {
        "name": "Galaxy S22 Plus LCD with Frame Soft OLED 1:1",
        "sku": "ISW-15294",
        "slug": "galaxy-s22-plus-lcd-with-frame-soft-oled-1-1-146",
        "description": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "shortDescription": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "wholesalePrice": 69.5,
        "retailPrice": 90.35000000000001,
        "costPrice": 48.65,
        "stock": 150,
        "brand": "Samsung",
        "compatibility": "Galaxy S22 Plus",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2025/12/S22-plus-LCD.svg"
        ]
    },
    {
        "name": "Galaxy S20 FE 5G LCD with Frame Hard OLED (with Big Size)",
        "sku": "ISW-15290",
        "slug": "galaxy-s20-fe-5g-lcd-with-frame-hard-oled-with-big-size-456",
        "description": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "shortDescription": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "wholesalePrice": 45,
        "retailPrice": 58.5,
        "costPrice": 31.499999999999996,
        "stock": 150,
        "brand": "Samsung",
        "compatibility": "Galaxy S20 FE",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2025/12/S20-FE-LCD.svg"
        ]
    },
    {
        "name": "Galaxy S21 FE LCD with Frame Hard OLED (with Big Size)",
        "sku": "ISW-15286",
        "slug": "galaxy-s21-fe-lcd-with-frame-hard-oled-with-big-size-398",
        "description": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "shortDescription": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "wholesalePrice": 49,
        "retailPrice": 63.7,
        "costPrice": 34.3,
        "stock": 150,
        "brand": "Samsung",
        "compatibility": "Galaxy S21 FE",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2025/12/S21-FE-LCD.svg"
        ]
    },
    {
        "name": "Samsung A54 LCD with Frame incell",
        "sku": "EA0022",
        "slug": "samsung-a54-lcd-with-frame-incell-168",
        "description": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "shortDescription": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "wholesalePrice": 19.5,
        "retailPrice": 25.35,
        "costPrice": 13.649999999999999,
        "stock": 150,
        "brand": "Samsung",
        "compatibility": "Samsung A54 LCD",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2025/12/Samsung-A54-LCD.svg"
        ]
    },
    {
        "name": "Samsung A35 LCD with Frame",
        "sku": "EAC001",
        "slug": "samsung-a35-lcd-with-frame-248",
        "description": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "shortDescription": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "wholesalePrice": 73,
        "retailPrice": 94.9,
        "costPrice": 51.099999999999994,
        "stock": 150,
        "brand": "Samsung",
        "compatibility": "Samsung A35 LCD",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2025/02/Samsung-A35-LCD.png"
        ]
    },
    {
        "name": "OnePlus 5G N20 LCD with Frame Soft OLED",
        "sku": "JE0001",
        "slug": "oneplus-5g-n20-lcd-with-frame-soft-oled-341",
        "description": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "shortDescription": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "wholesalePrice": 49,
        "retailPrice": 63.7,
        "costPrice": 34.3,
        "stock": 150,
        "brand": "OnePlus",
        "compatibility": "OnePlus 5G N20",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2025/12/OnePlus-N20-5G-Soft-OLED.svg"
        ]
    },
    {
        "name": "Pixel 7 Pro LCD with Frame SOFT OLED",
        "sku": "JD0002",
        "slug": "pixel-7-pro-lcd-with-frame-soft-oled-149",
        "description": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "shortDescription": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "wholesalePrice": 47.5,
        "retailPrice": 61.75,
        "costPrice": 33.25,
        "stock": 150,
        "brand": "Google",
        "compatibility": "Pixel 7 Pro",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2025/03/Pixel-7-Pro-LCD-SOFT-OLED.svg"
        ]
    },
    {
        "name": "Pixel 7 Soft OLED LCD with Frame",
        "sku": "JD0001",
        "slug": "pixel-7-soft-oled-lcd-with-frame-544",
        "description": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "shortDescription": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "wholesalePrice": 42.5,
        "retailPrice": 55.25,
        "costPrice": 29.749999999999996,
        "stock": 150,
        "brand": "Google",
        "compatibility": "Pixel 7 Soft",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2025/12/Pixel-7-LCD-SOFT-OLED.svg"
        ]
    },
    {
        "name": "YCS Q18 Mobile Phone Repair Screen Quick Separation Screen Remover for Mobile Phone Repair Screen Removal Suction Screen Tool",
        "sku": "ISW-15267",
        "slug": "ycs-q18-mobile-phone-repair-screen-quick-separation-screen-remover-for-mobile-phone-repair-screen-removal-suction-screen-tool-448",
        "description": "YCS Q18 Mobile Phone Repair Screen Quick Separation Screen Remover for Mobile Phone Repair Screen Removal Suction Screen Tool",
        "shortDescription": "YCS Q18 Mobile Phone Repair Screen Quick Separation Screen Remover for Mobile Phone Repair Screen Removal Suction Screen Tool",
        "wholesalePrice": 45,
        "retailPrice": 58.5,
        "costPrice": 31.499999999999996,
        "stock": 150,
        "brand": "iShine Tools",
        "compatibility": "YCS Q18 Mobile",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2025/12/YCS-Q18-Mobile-Phone-Repair-Screen.webp"
        ]
    },
    {
        "name": "Mechanic Irock 5 Back Glass Breaking Pen For iPhone Android Mobile Phone Rear Glass Cover Broken Lens Disassembly Tools",
        "sku": "ISW-15268",
        "slug": "mechanic-irock-5-back-glass-breaking-pen-for-iphone-android-mobile-phone-rear-glass-cover-broken-lens-disassembly-tools-630",
        "description": "Mechanic Irock 5 Back Glass Breaking Pen For iPhone Android Mobile Phone Rear Glass Cover Broken Lens Disassembly Tools",
        "shortDescription": "Mechanic Irock 5 Back Glass Breaking Pen For iPhone Android Mobile Phone Rear Glass Cover Broken Lens Disassembly Tools",
        "wholesalePrice": 8,
        "retailPrice": 10.4,
        "costPrice": 5.6,
        "stock": 150,
        "brand": "iShine Tools",
        "compatibility": "Mechanic Irock 5",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2025/12/Mechanic-Irock-5.webp"
        ]
    },
    {
        "name": "iPhone 16 Pro FHD incell LCD IC Transplant (support 120 Hz)",
        "sku": "ISW-15254",
        "slug": "iphone-16-pro-fhd-incell-lcd-ic-transplant-support-120-hz-650",
        "description": "High-quality professional replacement part.",
        "shortDescription": "High-quality professional replacement part.",
        "wholesalePrice": 57,
        "retailPrice": 74.10000000000001,
        "costPrice": 39.9,
        "stock": 150,
        "brand": "Apple",
        "compatibility": "iPhone 16 Pro",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2025/12/iPhone-16-Pro-FHD-incell.svg"
        ]
    },
    {
        "name": "iPhone 16 Plus FHD incell LCD",
        "sku": "B00022",
        "slug": "iphone-16-plus-fhd-incell-lcd-177",
        "description": "High-quality professional replacement part.",
        "shortDescription": "High-quality professional replacement part.",
        "wholesalePrice": 35.75,
        "retailPrice": 46.475,
        "costPrice": 25.025,
        "stock": 150,
        "brand": "Apple",
        "compatibility": "iPhone 16 Plus",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2025/12/iPhone-16-plus-FHD-incell.png"
        ]
    },
    {
        "name": "Battery for MOTO G 5G 2025",
        "sku": "ISW-15242",
        "slug": "battery-for-moto-g-5g-2025-354",
        "description": "Battery for MOTO G 5G 2025",
        "shortDescription": "Battery for MOTO G 5G 2025",
        "wholesalePrice": 10.5,
        "retailPrice": 13.65,
        "costPrice": 7.35,
        "stock": 150,
        "brand": "Motorola",
        "compatibility": "Battery for MOTO",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2025/11/moto-G.webp"
        ]
    },
    {
        "name": "Battery for MOTO G 5G 2024 / MOTO G Play 2024",
        "sku": "ISW-15241",
        "slug": "battery-for-moto-g-5g-2024-moto-g-play-2024-634",
        "description": "Battery for MOTO G 5G 2024 / MOTO G Play 2024",
        "shortDescription": "Battery for MOTO G 5G 2024 / MOTO G Play 2024",
        "wholesalePrice": 10.5,
        "retailPrice": 13.65,
        "costPrice": 7.35,
        "stock": 150,
        "brand": "Motorola",
        "compatibility": "Battery for MOTO",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2025/11/moto-G.webp"
        ]
    },
    {
        "name": "Battery for MOTO G 5G 2023",
        "sku": "ISW-15239",
        "slug": "battery-for-moto-g-5g-2023-324",
        "description": "Battery for MOTO G 5G 2023",
        "shortDescription": "Battery for MOTO G 5G 2023",
        "wholesalePrice": 10.5,
        "retailPrice": 13.65,
        "costPrice": 7.35,
        "stock": 150,
        "brand": "Motorola",
        "compatibility": "Battery for MOTO",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2025/11/moto-G.webp"
        ]
    },
    {
        "name": "Battery for MOTO G Power 2025",
        "sku": "ISW-15237",
        "slug": "battery-for-moto-g-power-2025-218",
        "description": "Battery for moto g power 2025",
        "shortDescription": "Battery for moto g power 2025",
        "wholesalePrice": 10.5,
        "retailPrice": 13.65,
        "costPrice": 7.35,
        "stock": 150,
        "brand": "Motorola",
        "compatibility": "Battery for MOTO",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2025/11/moto-g-power-2023-24-25.webp"
        ]
    },
    {
        "name": "Battery for MOTO G Power 2024",
        "sku": "ISW-15236",
        "slug": "battery-for-moto-g-power-2024-998",
        "description": "Battery for moto g power 2024",
        "shortDescription": "Battery for moto g power 2024",
        "wholesalePrice": 10.5,
        "retailPrice": 13.65,
        "costPrice": 7.35,
        "stock": 150,
        "brand": "Motorola",
        "compatibility": "Battery for MOTO",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2025/11/moto-g-power-2023-24-25.webp"
        ]
    },
    {
        "name": "Battery for MOTO G Power 2023",
        "sku": "ISW-15234",
        "slug": "battery-for-moto-g-power-2023-938",
        "description": "Battery for moto g power 2023",
        "shortDescription": "Battery for moto g power 2023",
        "wholesalePrice": 10.5,
        "retailPrice": 13.65,
        "costPrice": 7.35,
        "stock": 150,
        "brand": "Motorola",
        "compatibility": "Battery for MOTO",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2025/11/moto-g-power-2023-24-25.webp"
        ]
    },
    {
        "name": "Battery for Samsung A56/A36",
        "sku": "ISW-15235",
        "slug": "battery-for-samsung-a56-a36-970",
        "description": "Battery for Samsung A56/36 (with glue battery)",
        "shortDescription": "Battery for Samsung A56/36 (with glue battery)",
        "wholesalePrice": 11.5,
        "retailPrice": 14.950000000000001,
        "costPrice": 8.049999999999999,
        "stock": 150,
        "brand": "Samsung",
        "compatibility": "Battery for Samsung",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2025/11/Battery-for-A16-A56-A36.webp"
        ]
    },
    {
        "name": "Battery for Samsung A16",
        "sku": "ISW-15233",
        "slug": "battery-for-samsung-a16-798",
        "description": "Battery for A16 (with glue battery)",
        "shortDescription": "Battery for A16 (with glue battery)",
        "wholesalePrice": 9.25,
        "retailPrice": 12.025,
        "costPrice": 6.475,
        "stock": 150,
        "brand": "Samsung",
        "compatibility": "Battery for Samsung",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2025/11/Battery-for-A16-A56-A36.webp"
        ]
    },
    {
        "name": "Battery for iPad Pro 11&#8243; 1st Gen",
        "sku": "ISW-15229",
        "slug": "battery-for-ipad-pro-11-8243-1st-gen-803",
        "description": "Battery for iPad Pro 11&#8243; 1st Gen",
        "shortDescription": "Battery for iPad Pro 11&#8243; 1st Gen",
        "wholesalePrice": 32.5,
        "retailPrice": 42.25,
        "costPrice": 22.75,
        "stock": 150,
        "brand": "Apple",
        "compatibility": "Battery for iPad",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2025/11/Battery-for-iPadPro-11-1st-Gen.webp"
        ]
    },
    {
        "name": "TCL K32 LCD with Frame",
        "sku": "ISW-15225",
        "slug": "tcl-k32-lcd-with-frame-701",
        "description": "High-quality professional replacement part.",
        "shortDescription": "High-quality professional replacement part.",
        "wholesalePrice": 39.5,
        "retailPrice": 51.35,
        "costPrice": 27.65,
        "stock": 150,
        "brand": "iShine Tools",
        "compatibility": "TCL K32 LCD",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2025/11/TCL-K32-LCD-with-Frame.svg"
        ]
    },
    {
        "name": "iPad 7/8/9 LCD",
        "sku": "ISW-15204",
        "slug": "ipad-7-8-9-lcd-614",
        "description": "High-quality professional replacement part.",
        "shortDescription": "High-quality professional replacement part.",
        "wholesalePrice": 42.5,
        "retailPrice": 55.25,
        "costPrice": 29.749999999999996,
        "stock": 150,
        "brand": "Apple",
        "compatibility": "iPad 7/8/9 LCD",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2025/11/iPad-7-8-9-LCD.webp"
        ]
    },
    {
        "name": "iPad 6 LCD",
        "sku": "ISW-15201",
        "slug": "ipad-6-lcd-460",
        "description": "High-quality professional replacement part.",
        "shortDescription": "High-quality professional replacement part.",
        "wholesalePrice": 39.5,
        "retailPrice": 51.35,
        "costPrice": 27.65,
        "stock": 150,
        "brand": "Apple",
        "compatibility": "iPad 6 LCD",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2025/11/iPad-6-LCD.webp"
        ]
    },
    {
        "name": "Galaxy S24 FE Hard OLED LCD",
        "sku": "ISW-15196",
        "slug": "galaxy-s24-fe-hard-oled-lcd-813",
        "description": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "shortDescription": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "wholesalePrice": 53.5,
        "retailPrice": 69.55,
        "costPrice": 37.449999999999996,
        "stock": 150,
        "brand": "Samsung",
        "compatibility": "Galaxy S24 FE",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2025/11/S24-FE-LCD.svg"
        ]
    },
    {
        "name": "Samsung A71 5G LCD with Frame OLED",
        "sku": "ISW-15190",
        "slug": "samsung-a71-5g-lcd-with-frame-oled-33",
        "description": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "shortDescription": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "wholesalePrice": 49.5,
        "retailPrice": 64.35000000000001,
        "costPrice": 34.65,
        "stock": 150,
        "brand": "Samsung",
        "compatibility": "Samsung A71 5G",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2025/11/Samsung-A71-5G-LCD-1.svg"
        ]
    },
    {
        "name": "Samsung A36 5G LCD with Frame incell",
        "sku": "ISW-15189",
        "slug": "samsung-a36-5g-lcd-with-frame-incell-419",
        "description": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "shortDescription": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "wholesalePrice": 32.5,
        "retailPrice": 42.25,
        "costPrice": 22.75,
        "stock": 150,
        "brand": "Samsung",
        "compatibility": "Samsung A36 5G",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2025/11/Samsung-A36-5G-LCD.svg"
        ]
    },
    {
        "name": "Galaxy S24 Plus LCD with Frame Soft OLED",
        "sku": "ES0020",
        "slug": "galaxy-s24-plus-lcd-with-frame-soft-oled-701",
        "description": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "shortDescription": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "wholesalePrice": 84.5,
        "retailPrice": 109.85000000000001,
        "costPrice": 59.15,
        "stock": 150,
        "brand": "Samsung",
        "compatibility": "Galaxy S24 Plus",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2025/11/S24-Plus-LCD.svg"
        ]
    },
    {
        "name": "NOTE 8 DISPLAY ASSEMBLY WITH FRAME SOFT OLED",
        "sku": "ISW-15184",
        "slug": "note-8-display-assembly-with-frame-soft-oled-776",
        "description": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "shortDescription": "9H Anti-Scratch\n\nEasy To Touch\n\nEasy to Fit",
        "wholesalePrice": 90,
        "retailPrice": 117,
        "costPrice": 62.99999999999999,
        "stock": 150,
        "brand": "iShine Tools",
        "compatibility": "NOTE 8 DISPLAY",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2025/11/NOTE-8-LCD-Soft-OLED.svg"
        ]
    },
    {
        "name": "Display assembly for Samsung tab A9+ combo",
        "sku": "ISW-15100",
        "slug": "display-assembly-for-samsung-tab-a9-combo-136",
        "description": "High-quality professional replacement part.",
        "shortDescription": "High-quality professional replacement part.",
        "wholesalePrice": 35,
        "retailPrice": 45.5,
        "costPrice": 24.5,
        "stock": 150,
        "brand": "Samsung",
        "compatibility": "Display assembly for",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2025/11/TAB-a9.webp"
        ]
    },
    {
        "name": "Galaxy S25 Battery",
        "sku": "ISW-15098",
        "slug": "galaxy-s25-battery-195",
        "description": "Powerful Lithium Chip\n\nOriginal Capacity\n\nMultiple Protection\n\nQuick Charging",
        "shortDescription": "Powerful Lithium Chip\n\nOriginal Capacity\n\nMultiple Protection\n\nQuick Charging",
        "wholesalePrice": 10.75,
        "retailPrice": 13.975,
        "costPrice": 7.5249999999999995,
        "stock": 150,
        "brand": "Samsung",
        "compatibility": "Galaxy S25 Battery",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2025/02/Samsung-Battery-1000x1333-1.webp"
        ]
    },
    {
        "name": "Galaxy S25 Plus Battery",
        "sku": "ISW-15097",
        "slug": "galaxy-s25-plus-battery-602",
        "description": "Powerful Lithium Chip\n\nOriginal Capacity\n\nMultiple Protection\n\nQuick Charging",
        "shortDescription": "Powerful Lithium Chip\n\nOriginal Capacity\n\nMultiple Protection\n\nQuick Charging",
        "wholesalePrice": 10.75,
        "retailPrice": 13.975,
        "costPrice": 7.5249999999999995,
        "stock": 150,
        "brand": "Samsung",
        "compatibility": "Galaxy S25 Plus",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2025/02/Samsung-Battery-1000x1333-1.webp"
        ]
    },
    {
        "name": "Charging Port for TCL Stylus 5G",
        "sku": "ISW-15060",
        "slug": "charging-port-for-tcl-stylus-5g-659",
        "description": "Charging Port With Board TCL Stylus 5G",
        "shortDescription": "Charging Port With Board TCL Stylus 5G",
        "wholesalePrice": 8.5,
        "retailPrice": 11.05,
        "costPrice": 5.949999999999999,
        "stock": 150,
        "brand": "iShine Tools",
        "compatibility": "Charging Port for",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2025/10/Charging-Port-For-TCL-Stylus-5G.svg"
        ]
    },
    {
        "name": "Charging Port for TCL 50 XE 5G",
        "sku": "ISW-15059",
        "slug": "charging-port-for-tcl-50-xe-5g-735",
        "description": "Charging Port With Board TCL 50 XE 5G",
        "shortDescription": "Charging Port With Board TCL 50 XE 5G",
        "wholesalePrice": 7.5,
        "retailPrice": 9.75,
        "costPrice": 5.25,
        "stock": 150,
        "brand": "iShine Tools",
        "compatibility": "Charging Port for",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2025/10/Charging-Port-For-TCL-50-XE-5G.svg"
        ]
    },
    {
        "name": "Charging Port for TCL 50 XL 5G",
        "sku": "ISW-15057",
        "slug": "charging-port-for-tcl-50-xl-5g-47",
        "description": "Charging Port With Board TCL 50 XL 5G",
        "shortDescription": "Charging Port With Board TCL 50 XL 5G",
        "wholesalePrice": 7.5,
        "retailPrice": 9.75,
        "costPrice": 5.25,
        "stock": 150,
        "brand": "iShine Tools",
        "compatibility": "Charging Port for",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2025/10/Charging-Port-For-TCL-50-XL-5G.svg"
        ]
    },
    {
        "name": "TCL 50 XL 5G LCD with Frame",
        "sku": "ISW-15046",
        "slug": "tcl-50-xl-5g-lcd-with-frame-704",
        "description": "High-quality professional replacement part.",
        "shortDescription": "High-quality professional replacement part.",
        "wholesalePrice": 28.25,
        "retailPrice": 36.725,
        "costPrice": 19.775,
        "stock": 150,
        "brand": "iShine Tools",
        "compatibility": "TCL 50 XL",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2025/10/TCL-50-XL-5G-LCD-with-Frame.svg"
        ]
    },
    {
        "name": "TCL 50 XE 5G LCD with Frame",
        "sku": "ISW-15045",
        "slug": "tcl-50-xe-5g-lcd-with-frame-202",
        "description": "High-quality professional replacement part.",
        "shortDescription": "High-quality professional replacement part.",
        "wholesalePrice": 27,
        "retailPrice": 35.1,
        "costPrice": 18.9,
        "stock": 150,
        "brand": "iShine Tools",
        "compatibility": "TCL 50 XE",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2025/10/TCL-50-XE-5G-LCD-with-Frame.svg"
        ]
    },
    {
        "name": "TCL Stylus 5G LCD without Frame",
        "sku": "ISW-15047",
        "slug": "tcl-stylus-5g-lcd-without-frame-943",
        "description": "High-quality professional replacement part.",
        "shortDescription": "High-quality professional replacement part.",
        "wholesalePrice": 25.95,
        "retailPrice": 33.735,
        "costPrice": 18.165,
        "stock": 150,
        "brand": "iShine Tools",
        "compatibility": "TCL Stylus 5G",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2025/10/TCL-Stylus-5G-LCD-without-Frame.svg"
        ]
    },
    {
        "name": "Wireless NFC Charging Flex With Flashlight Flex Cable for iPhone 16 Pro Max",
        "sku": "G0001551",
        "slug": "wireless-nfc-charging-flex-with-flashlight-flex-cable-for-iphone-16-pro-max-192",
        "description": "Flash Cable Assembly with Wireless Charging Cable for iPhone 16 Pro Max Brand New Original with Magsafe",
        "shortDescription": "Flash Cable Assembly with Wireless Charging Cable for iPhone 16 Pro Max Brand New Original with Magsafe",
        "wholesalePrice": 24.5,
        "retailPrice": 31.85,
        "costPrice": 17.15,
        "stock": 150,
        "brand": "Apple",
        "compatibility": "Wireless NFC Charging",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2025/10/Wireless-NFC-Charging-Flex-With-Flashlight-Flex-Cable.svg"
        ]
    },
    {
        "name": "Wireless NFC Charging Flex With Flashlight Flex Cable for iPhone 16 Pro",
        "sku": "G0001550",
        "slug": "wireless-nfc-charging-flex-with-flashlight-flex-cable-for-iphone-16-pro-938",
        "description": "Flash Cable Assembly with Wireless Charging Cable for iPhone 16 Pro Brand New Original with Magsafe",
        "shortDescription": "Flash Cable Assembly with Wireless Charging Cable for iPhone 16 Pro Brand New Original with Magsafe",
        "wholesalePrice": 22.75,
        "retailPrice": 29.575,
        "costPrice": 15.924999999999999,
        "stock": 150,
        "brand": "Apple",
        "compatibility": "Wireless NFC Charging",
        "images": [
            "https://ishinewireless.com/wp-content/uploads/2025/10/Wireless-NFC-Charging-Flex-With-Flashlight-Flex-Cable.svg"
        ]
    }
];
import bcrypt from 'bcryptjs';

async function main() {
    console.log("🌱 Seeding Database with HIGH-PRECISION mirror data...");

    // 1. CLEAR EXISTING DATA
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.product.deleteMany();
    await prisma.brand.deleteMany();
    await prisma.category.deleteMany();
    await prisma.user.deleteMany();

    // 1.5 CREATE ADMIN USER
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await prisma.user.create({
        data: {
            email: 'admin@ishine.com',
            password: hashedPassword,
            name: 'System Admin',
            role: 'ADMIN',
            status: 'active'
        }
    });

    // 2. CREATE MASTER BRANDS
    const brands = [
        { name: "Apple", slug: "apple" },
        { name: "Samsung", slug: "samsung" },
        { name: "Motorola", slug: "motorola" },
        { name: "Google", slug: "google" },
        { name: "OnePlus", slug: "oneplus" },
        { name: "Nokia", slug: "nokia" },
        { name: "iShine Tools", slug: "ishine-tools" }
    ];

    const brandMap: Record<string, number> = {};
    for (const b of brands) {
        const created = await prisma.brand.create({ data: b });
        brandMap[b.name] = created.id;
    }

    // 3. CREATE MASTER CATEGORIES
    const categoriesData = [
        { name: "LCD Screens", slug: "lcd-screens", description: "Premium mobile display assemblies." },
        { name: "Batteries", slug: "batteries", description: "High-capacity replacement batteries." },
        { name: "Charging Ports", slug: "charging-ports", description: "USB-C and Lightning charging port flex cables." },
        { name: "Tools & Supplies", slug: "tools-supplies", description: "Professional repair tools." },
        { name: "Accessories", slug: "accessories", description: "Cases, cables, and more." },
        { name: "Board Components", slug: "board-components", description: "ICs and motherboard parts." }
    ];

    const catMap: Record<string, number> = {};
    for (const cat of categoriesData) {
        const created = await prisma.category.create({ data: cat });
        catMap[cat.slug] = created.id;
    }

    // 4. SEED PRODUCTS
    const qualityGrades = ["OEM Refurb", "Premium Aftermarket", "Standard"];

    for (const prod of realProducts) {
        const name = prod.name.toLowerCase();
        let catId = catMap["accessories"]; // Default

        if (name.includes("lcd") || name.includes("display") || name.includes("screen")) catId = catMap["lcd-screens"];
        else if (name.includes("battery")) catId = catMap["batteries"];
        else if (name.includes("charging port") || name.includes("usb-c") || name.includes("hdmi")) catId = catMap["charging-ports"];
        else if (name.includes("tool")) catId = catMap["tools-supplies"];
        else if (name.includes("ic") || name.includes("chip") || name.includes("board")) catId = catMap["board-components"];

        const brandName = prod.brand || "iShine";
        const brandId = brandMap[brandName] || brandMap["iShine Tools"];
        const qualityGrade = qualityGrades[Math.floor(Math.random() * qualityGrades.length)];

        const { brand: _, ...productData } = prod;

        const richDescription = `
            <div class="space-y-4">
                <p>Experience peak performance with the <strong>${productData.name}</strong>. Engineered for durability and precision, this part meets or exceeds original equipment specifications, ensuring a seamless fit and long-lasting reliability for your repair needs.</p>
                <div>
                    <h4 class="font-bold text-slate-800 mb-2">Key Features:</h4>
                    <ul class="list-disc pl-5 space-y-1 text-sm">
                        <li>Ultra-high precision fit for ${brandName} devices</li>
                        <li>Tested under extreme conditions for quality assurance</li>
                        <li>Premium materials for enhanced heat dissipation and durability</li>
                        <li>Industry-leading warranty coverage included</li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-bold text-slate-800 mb-2">Technical Specifications:</h4>
                    <table class="w-full text-sm border-collapse border border-slate-200">
                        <tr class="bg-slate-50">
                            <td class="border border-slate-200 p-2 font-semibold">SKU</td>
                            <td class="border border-slate-200 p-2">${productData.sku}</td>
                        </tr>
                        <tr>
                            <td class="border border-slate-200 p-2 font-semibold">Quality Grade</td>
                            <td class="border border-slate-200 p-2">${qualityGrade}</td>
                        </tr>
                        <tr class="bg-slate-50">
                            <td class="border border-slate-200 p-2 font-semibold">Compatibility</td>
                            <td class="border border-slate-200 p-2">${brandName} Series</td>
                        </tr>
                    </table>
                </div>
                <p class="text-xs text-slate-500 italic mt-4">Note: Professional installation is highly recommended to ensure the lifetime of the component and maintain device integrity.</p>
            </div>
        `.trim();

        await prisma.product.create({
            data: {
                ...productData,
                description: richDescription,
                categoryId: catId,
                brandId: brandId,
                qualityGrade: qualityGrade,
                isFeatured: Math.random() > 0.8 // Mark 20% of products as featured
            }
        });
    }

    console.log(`✅ Successfully mirrored ${realProducts.length} products to the database seed!`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
