import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/prisma';

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password, name, businessName, phone, taxId } = req.body;

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            res.status(400).json({ message: 'User with this email already exists.' });
            return;
        }

        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                businessName,
                phone,
                taxId,
            },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                businessName: true,
                createdAt: true,
            },
        });

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET || 'fallback_secret',
            { expiresIn: 604800 }
        );

        res.status(201).json({
            message: 'Registration successful',
            token,
            user,
        });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            res.status(401).json({ message: 'Invalid email or password.' });
            return;
        }

        if (user.status !== 'active') {
            res.status(403).json({ message: 'Account has been deactivated. Contact support.' });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ message: 'Invalid email or password.' });
            return;
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET || 'fallback_secret',
            { expiresIn: 604800 }
        );

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                businessName: user.businessName,
            },
        });
    } catch (error) {
        console.error('Login error detailed:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
    res.json({ message: 'Logged out successfully' });
};

export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
    const { email } = req.body;
    if (!email) {
        res.status(400).json({ message: 'Email is required' });
        return;
    }
    res.json({ message: 'Password reset instructions sent if email exists' });
};

export const getSession = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: (req as any).user.id },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
            },
        });

        if (!user) {
            res.status(401).json({ message: 'Not authenticated' });
            return;
        }

        res.json({ user });
    } catch (error) {
        console.error('GetSession error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
