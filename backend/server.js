import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

import authRoutes from './routes/authRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const app = express();
let databaseConnection;

app.use(cors());
app.use(express.json());

app.use('/api', async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      if (!process.env.MONGO_URI) {
        return res.status(503).json({ message: 'Database is not configured on the server.' });
      }
      if (!databaseConnection) {
        databaseConnection = mongoose.connect(process.env.MONGO_URI).catch((error) => {
          databaseConnection = null;
          throw error;
        });
      }
      await databaseConnection;
    }
    next();
  } catch (error) {
    console.error('MongoDB Connection Error:', error.message);
    res.status(503).json({ message: 'Database unavailable. Check the server configuration and try again.' });
  }
});

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
  res.send('Backend Server Running Successfully!');
});

const PORT = process.env.PORT || 5000;
if (!process.env.VERCEL) {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;