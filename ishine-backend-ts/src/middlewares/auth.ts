import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/prisma';

// Extend Express Request to include user information
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: number;
                email: string;
                role: string;
            };
        }
    }
}

/**
 * Middleware: Verify JWT Token
 * Protects routes that require authentication.
 */
export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ message: 'Access denied. No token provided.' });
            return;
        }

        const token = authHeader.split(' ')[1];
        const secret = process.env.JWT_SECRET || 'fallback_secret';

        const decoded = jwt.verify(token, secret) as { id: number; email: string; role: string };

        // Verify user still exists and is active
        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
            select: { id: true, email: true, role: true, status: true },
        });

        if (!user || user.status !== 'active') {
            res.status(401).json({ message: 'User account is deactivated or does not exist.' });
            return;
        }

        req.user = { id: user.id, email: user.email, role: user.role };
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid or expired token.' });
    }
};

/**
 * Middleware: Require Admin Role
 * Must be used AFTER the `authenticate` middleware.
 */
export const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user || req.user.role !== 'admin') {
        res.status(403).json({ message: 'Access denied. Admin privileges required.' });
        return;
    }
    next();
};
