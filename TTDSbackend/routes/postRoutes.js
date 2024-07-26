import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { createPost, getPosts, getUserPosts, likePost, unlikePost, commentOnPost, getPostComments, uploadImage } from '../controllers/postController.js';

const router = express.Router();

router.post('/', authMiddleware, uploadImage, createPost); // Protected route for creating posts
router.get('/', getPosts); // Public route for getting homepage posts
router.get('/:userId', getUserPosts); // Public route for getting user-specific posts
router.post('/:id/like', authMiddleware, likePost); // Protected route for liking posts
router.post('/:id/unlike', authMiddleware, unlikePost); // Protected route for unliking posts
router.post('/:id/comment', authMiddleware, commentOnPost); // Protected route for commenting on posts
router.get('/:id/comments', getPostComments); // Public route for getting post comments

export default router;