import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: String, required: true },
  fee: { type: Number, required: true },
  instructor: { type: String }
}, { timestamps: true });

export default mongoose.model('Course', courseSchema);