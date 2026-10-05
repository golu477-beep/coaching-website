import Course from '../models/Course.js';
import User from '../models/User.js';

export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCourse = async (req, res) => {
  const { title, description, duration, fee, instructor } = req.body;
  if (![title, description, duration, fee].every((value) => value !== undefined && String(value).trim())) {
    return res.status(400).json({ message: 'Title, description, duration and fee are required.' });
  }
  if (!Number.isFinite(Number(fee)) || Number(fee) < 0) {
    return res.status(400).json({ message: 'Fee must be a valid non-negative number.' });
  }

  try {
    const course = await Course.create({
      title: String(title).trim(),
      description: String(description).trim(),
      duration: String(duration).trim(),
      fee: Number(fee),
      instructor: typeof instructor === 'string' ? instructor.trim() : '',
    });
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const enrollInCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).select('_id');
    if (!course) return res.status(404).json({ message: 'Class not found.' });

    await User.updateOne(
      { _id: req.user.id },
      { $addToSet: { enrolledCourses: course._id } }
    );
    res.json({ message: 'You are enrolled in this class.' });
  } catch (error) {
    if (error.name === 'CastError') return res.status(400).json({ message: 'Invalid class.' });
    res.status(500).json({ message: error.message });
  }
};