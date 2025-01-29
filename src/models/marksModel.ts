import mongoose from 'mongoose';

const studentsMarksSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter first name'],
      min: 3,
      max: 255,
    },
    rollNumber: {
      type: String,
      required: [true, 'Please enter rollNumber'],
      max: 255,
      min: 6,
      unique: true,
    },
    grade: {
      type: String,
      required: [true, 'Please enter class'],
    },
    section: {
      type: String,
      required: [true, 'Please enter section'],
    },
    subject: {
      type: String,
      required: [true, 'Please enter subject'],
    },
    marks: {
      type: Number,
      required: [true, 'Please enter marks'],
    },
  },
  {
    timestamps: true,
  }
);

const Marks = mongoose.models.marks || mongoose.model('marks', studentsMarksSchema);

export default Marks;
