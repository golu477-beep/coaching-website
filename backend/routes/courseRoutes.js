import express from 'express';
import { getCourses, createCourse } from '../controllers/courseController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getCourses);
router.post('/', protect, adminOnly, createCourse);

export default router;