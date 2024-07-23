import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { createPost, getPosts, getUserPosts, likePost, unlikePost, commentOnPost, getPostComments } from '../controllers/postController.js';

const router = express.Router();

router.post('/', authMiddleware, createPost);
router.get('/', authMiddleware, getPosts);
router.get('/:userId', authMiddleware, getUserPosts);
router.post('/:id/like', authMiddleware, likePost);
router.post('/:id/unlike', authMiddleware, unlikePost);
router.post('/:id/comment', authMiddleware, commentOnPost);
router.get('/:id/comments', authMiddleware, getPostComments);

export default router;