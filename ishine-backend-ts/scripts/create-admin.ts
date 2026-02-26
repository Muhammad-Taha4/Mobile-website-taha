import { prisma } from '../src/config/prisma';
import bcrypt from 'bcryptjs';

async function main() {
    console.log('Seeding Admin User...');
    
    const email = 'admin@iShinewireless';
    const password = await bcrypt.hash('Admin@12390', 12);

    const adminUser = await prisma.user.upsert({
        where: { email },
        update: {},
        create: {
            email,
            password,
            role: 'ADMIN',
            firstName: 'Admin',
            lastName: 'User',
            isActive: true, // Making sure account is active
        },
    });

    console.log('Admin user created/verified successfully:', adminUser.email);
}

main()
    .catch((e) => {
        console.error('Error seeding admin user:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
