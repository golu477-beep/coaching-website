import express from 'express';
import { getAllStudents, getClasses, postNotice } from '../controlles/adminController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/students', protect, adminOnly, getAllStudents);
router.get('/classes', protect, adminOnly, getClasses);
router.post('/notice', protect, adminOnly, postNotice);

export default router;