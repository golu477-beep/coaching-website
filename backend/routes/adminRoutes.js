import express from 'express';
import { getAllStudents, postNotice } from '../controllers/adminController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/students', protect, adminOnly, getAllStudents);
router.post('/notice', protect, adminOnly, postNotice);

export default router;