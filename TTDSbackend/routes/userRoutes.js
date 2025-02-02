import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { getUser, updateUser, followUser, unfollowUser, searchUsers } from '../controllers/userController.js';

const router = express.Router();

router.get('/:id', authMiddleware, getUser);
router.put('/:id', authMiddleware, updateUser);
router.post('/:id/follow', authMiddleware, followUser);
router.post('/:id/unfollow', authMiddleware, unfollowUser);
router.get('/search', authMiddleware, searchUsers);

export default router;