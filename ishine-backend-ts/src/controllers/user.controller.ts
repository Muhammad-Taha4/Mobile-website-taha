import { Request, Response } from 'express';
import { prisma } from '../config/prisma';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const avatarUploadDir = path.join(__dirname, '../../public/uploads/avatars');
if (!fs.existsSync(avatarUploadDir)) {
    fs.mkdirSync(avatarUploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, avatarUploadDir),
    filename: (_req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        cb(null, `avatar-${uniqueSuffix}${path.extname(file.originalname)}`);
    },
});

export const avatarUpload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (_req, file, cb) => {
        const allowed = /jpeg|jpg|png|gif|webp/;
        const ok = allowed.test(path.extname(file.originalname).toLowerCase()) && allowed.test(file.mimetype);
        if (ok) cb(null, true);
        else cb(new Error('Only image files are allowed'));
    },
});

export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const { role, page = '1', limit = '20' } = req.query;
        const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
        const take = parseInt(limit as string);

        const where: any = {};
        if (role) where.role = role;

        const [users, total] = await Promise.all([
            prisma.user.findMany({
                where,
                select: {
                    id: true,
                    email: true,
                    name: true,
                    role: true,
                    businessName: true,
                    phone: true,
                    status: true,
                    createdAt: true,
                },
                skip,
                take,
                orderBy: { createdAt: 'desc' },
            }),
            prisma.user.count({ where }),
        ]);

        res.json({
            users,
            pagination: {
                page: parseInt(page as string),
                limit: take,
                total,
                totalPages: Math.ceil(total / take),
            },
        });
    } catch (error) {
        console.error('GetUsers error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { role, status, name, businessName } = req.body;
        const id = parseInt(req.params.id as string);

        if (isNaN(id)) { res.status(400).json({ message: 'Invalid ID' }); return; }

        const user = await prisma.user.update({
            where: { id },
            data: { role, status, name, businessName },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                status: true,
            }
        });

        res.json({ message: 'User updated successfully', user });
    } catch (error) {
        console.error('UpdateUser error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id as string);
        if (isNaN(id)) { res.status(400).json({ message: 'Invalid ID' }); return; }

        await prisma.user.delete({
            where: { id }
        });
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('DeleteUser error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user!.id as number;
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, email: true, name: true, businessName: true, phone: true, taxId: true, avatar: true }
        });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateUserProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        let { name, businessName, phone, taxId } = req.body;
        const userId = req.user!.id as number;

        const dataToUpdate: any = { name, businessName, phone, taxId };
        if ((req as any).file) {
            dataToUpdate.avatar = `/uploads/avatars/${(req as any).file.filename}`;
        }

        const user = await prisma.user.update({
            where: { id: userId },
            data: dataToUpdate,
            select: { id: true, email: true, name: true, businessName: true, avatar: true }
        });
        res.json({ message: 'Profile updated', user });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateUserPassword = async (req: Request, res: Response): Promise<void> => {
    try {
        const { currentPassword, newPassword } = req.body;
        const userId = req.user!.id as number;

        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) { res.status(404).json({ message: 'User not found' }); return; }

        const bcrypt = require('bcryptjs');
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) { res.status(400).json({ message: 'Incorrect current password' }); return; }

        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(newPassword, salt);
        await prisma.user.update({ where: { id: userId }, data: { password: passwordHash } });

        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getUserAddresses = async (req: Request, res: Response): Promise<void> => {
    const userId = req.user!.id as number;
    const addresses = await prisma.address.findMany({ where: { userId } });
    res.json(addresses);
};

export const addUserAddress = async (req: Request, res: Response): Promise<void> => {
    const userId = req.user!.id as number;
    const { type, isDefault, businessName, firstName, lastName, street, street2, city, state, zip, country, phone } = req.body;
    const address = await prisma.address.create({
        data: { userId, type, isDefault, businessName, firstName, lastName, street, street2, city, state, zip, country, phone }
    });
    res.json({ message: 'Address added', address });
};

export const updateUserAddress = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id as string);
    const { type, isDefault, businessName, firstName, lastName, street, street2, city, state, zip, country, phone } = req.body;
    const address = await prisma.address.update({
        where: { id },
        data: { type, isDefault, businessName, firstName, lastName, street, street2, city, state, zip, country, phone }
    });
    res.json({ message: 'Address updated', address });
};

export const deleteUserAddress = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id as string);
    await prisma.address.delete({ where: { id } });
    res.json({ message: 'Address deleted' });
};

