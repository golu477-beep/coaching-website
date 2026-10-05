import express from 'express';
import { getCourses, createCourse, enrollInCourse } from '../controlles/courseController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getCourses);
router.post('/', protect, adminOnly, createCourse);
router.post('/:id/enroll', protect, enrollInCourse);

export default router;