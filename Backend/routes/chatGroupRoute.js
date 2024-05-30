import express from 'express';
import { createChatGroup, addUserToGroup, getAllChatGroups, sendMessage, getGroupMessages, getUsersInSameDepartment } from '../controllers/chatGroupController.js';
import { verifyUser } from '../middleware/AuthUser.js';

const router = express.Router();

// Create a new chat group
router.post('/create-chat-groups', verifyUser, createChatGroup);

// Add a user to a chat group
router.post('/chat-groups/:groupId/add-user', verifyUser, addUserToGroup);

// Get all chat groups
router.get('/get-all-chat-groups', verifyUser, getAllChatGroups);

// Send a message to a chat group
router.post('/chat-groups/:groupId/send-message', verifyUser, sendMessage);

// // send an attachment to a chat gp
// router.post('/chat-groups/:groupId/send-attachment', verifyUser, sendAttachment);

// Get messages for a specific chat group
router.get('/chat-groups/:groupId/messages', verifyUser, getGroupMessages);

// Get users belonging to the same department as the logged-in user
router.get('/users/same-department', verifyUser, getUsersInSameDepartment);

export default router;