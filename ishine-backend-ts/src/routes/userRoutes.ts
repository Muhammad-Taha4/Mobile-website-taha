import { Router } from 'express';
import {
    getUserProfile, updateUserProfile, updateUserPassword,
    getUserAddresses, addUserAddress, updateUserAddress, deleteUserAddress,
    avatarUpload
} from '../controllers/user.controller';
import { authenticate } from '../middlewares/auth';

const router = Router();

// User Profile
router.get('/profile', authenticate, getUserProfile);
router.put('/profile', authenticate, avatarUpload.single('avatar'), updateUserProfile);
router.put('/password', authenticate, updateUserPassword);

// User Addresses
router.get('/addresses', authenticate, getUserAddresses);
router.post('/addresses', authenticate, addUserAddress);
router.put('/addresses/:id', authenticate, updateUserAddress);
router.delete('/addresses/:id', authenticate, deleteUserAddress);

export default router;
