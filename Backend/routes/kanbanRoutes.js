import express from 'express';
import { verifyUser } from '../middleware/AuthUser.js';
import { accessKanbanBoard } from '../controllers/kanbanController.js';

const router = express.Router();

// Route to access kanban board
router.get('/employee-access/kanban', verifyUser, accessKanbanBoard);

export default router;
