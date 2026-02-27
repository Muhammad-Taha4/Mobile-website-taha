import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import bcrypt from 'bcryptjs';

const adapter = new PrismaMariaDb({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'ishine_db'
});

const prisma = new PrismaClient({ adapter });

async function main() {
    const hashedPassword = await bcrypt.hash('Admin@12390', 12);

    const admin = await prisma.user.upsert({
        where: { email: 'admin@iShinewireless' },
        update: {
            password: hashedPassword,
            role: 'ADMIN',
            updatedAt: new Date(),
        },
        create: {
            email: 'admin@iShinewireless',
            password: hashedPassword,
            name: 'Admin User',
            role: 'ADMIN',
            updatedAt: new Date(),
        },
    });

    console.log('✅ Admin user created/updated:', admin.email);
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
