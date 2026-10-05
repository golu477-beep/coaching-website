import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const publicUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  phone: user.phone || '',
  role: user.role,
  rollNo: user.rollNo || '',
});

const createToken = (user) => jwt.sign(
  { id: user._id, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: '1d' }
);

export const registerUser = async (req, res) => {
  const name = typeof req.body.name === 'string' ? req.body.name.trim() : '';
  const email = typeof req.body.email === 'string' ? req.body.email.trim().toLowerCase() : '';
  const password = typeof req.body.password === 'string' ? req.body.password : '';
  const phone = typeof req.body.phone === 'string' ? req.body.phone.trim() : '';

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email and password are required.' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: 'Enter a valid email address.' });
  }
  if (password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters long.' });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, phone, password: hashedPassword, role: 'student' });

    res.status(201).json({
      token: createToken(user),
      user: publicUser(user),
    });
  } catch (error) {
    if (error.code === 11000) return res.status(400).json({ message: 'An account with this email already exists.' });
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  const email = typeof req.body.email === 'string' ? req.body.email.trim().toLowerCase() : '';
  const password = typeof req.body.password === 'string' ? req.body.password : '';
  if (!email || !password) return res.status(400).json({ message: 'Email and password are required.' });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    res.json({ token: createToken(user), user: publicUser(user) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select('-password')
      .populate('enrolledCourses', 'title description duration fee instructor');
    if (!user) return res.status(404).json({ message: 'Account not found.' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};