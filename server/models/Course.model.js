import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
  courseTitle: {
    type: String,
    required: true
  },
  subTitle: {
    type: String,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  courseLevel: {
    type: String,
    enum: ["Beginner", "Medium", "Advance"]
  },
  coursePrice: {
    type: Number,
  },
  courseThumbnail: {
    type: String,
  },
  enrolledStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"  // Ensure the "User" model exists
  }],
  lectures: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lecture"  // Ensure the "Lecture" model exists
  }],
  Creator: {  // Ensure you meant "Creator"
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"  // Ensure the "User" model exists
  },
  isPublished: {
    type: Boolean,
    default: false
  },
}, { timestamps: true });

export const Course = mongoose.model("Course", CourseSchema);
