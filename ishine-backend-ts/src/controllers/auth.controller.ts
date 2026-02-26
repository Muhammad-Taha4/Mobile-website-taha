import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/prisma';

/**
 * POST /api/auth/register
 * Register a new user (customer or admin).
 */
export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password, firstName, lastName, businessName, businessPhone, taxId, companyAddress } = req.body;

        // Check if user exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            res.status(400).json({ message: 'User with this email already exists.' });
            return;
        }

        // Hash password
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                firstName,
                lastName,
                businessName,
                businessPhone,
                taxId,
                companyAddress,
            },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                role: true,
                businessName: true,
                createdAt: true,
            },
        });

        // Generate JWT
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET || 'fallback_secret',
            { expiresIn: 604800 } // 7 days in seconds
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

/**
 * POST /api/auth/login
 * Authenticate a user and return a JWT.
 */
export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            res.status(401).json({ message: 'Invalid email or password.' });
            return;
        }

        if (!user.isActive) {
            res.status(403).json({ message: 'Account has been deactivated. Contact support.' });
            return;
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ message: 'Invalid email or password.' });
            return;
        }

        // Generate JWT
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET || 'fallback_secret',
            { expiresIn: 604800 } // 7 days in seconds
        );

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                businessName: user.businessName,
            },
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * GET /api/auth/me
 * Get the current authenticated user's profile.
 */
export const getMe = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user!.id },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                role: true,
                businessName: true,
                businessPhone: true,
                taxId: true,
                companyAddress: true,
                createdAt: true,
            },
        });

        if (!user) {
            res.status(404).json({ message: 'User not found.' });
            return;
        }

        res.json(user);
    } catch (error) {
        console.error('GetMe error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
