import express from 'express';
import PostController from '../controllers/socialMediaController.js';
import { verifyUser } from '../middleware/AuthUser.js';
import fetchEmployeeId from '../middleware/fetchEmployeeId.js';

const router = express.Router();

// Get all posts
router.get('/posts', verifyUser, PostController.getAllPosts);

// Create a new post
router.post('/posts', verifyUser, PostController.createPost);

// Get details of a specific post
router.get('/posts/:postId', verifyUser, PostController.getPostById);

// Update a specific post
router.patch('/posts/:postId', verifyUser, PostController.updatePost);

// Delete a specific post
router.delete('/posts/:postId', verifyUser, PostController.deletePost);

// Create a new comment for a specific post
router.post('/posts/:postId/comments', verifyUser, PostController.createCommentForPost);

// Get likes for a specific post
router.get('/posts/:postId/likes', verifyUser, PostController.getLikesForPost);

// Add/Create a like to a specific post
router.post('/posts/:postId/likes', verifyUser, PostController.toggleLike);

// // Delete/Remove a like from a specific post
// router.delete('/posts/:postId/likes', verifyUser, PostController.toggleLike);

// Get/Show all comments for a specific post
router.get('/posts/:postId/all-comments', verifyUser, PostController.getAllCommentsForPost);

export default router;
