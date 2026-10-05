import User from '../models/User.js';
import Notice from '../models/Notice.js';
import Course from '../models/Course.js';

export const getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: 'student' })
      .select('-password')
      .populate('enrolledCourses', 'title');
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getClasses = async (req, res) => {
  try {
    const [courses, students] = await Promise.all([
      Course.find().sort({ createdAt: -1 }).lean(),
      User.find({ role: 'student' })
        .select('name email phone rollNo enrolledCourses')
        .lean(),
    ]);
    const classes = courses.map((course) => ({
      ...course,
      students: students.filter((student) =>
        (student.enrolledCourses || []).some((courseId) => courseId.toString() === course._id.toString())
      ),
    }));
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const postNotice = async (req, res) => {
  try {
    const notice = await Notice.create(req.body);
    res.status(201).json(notice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};