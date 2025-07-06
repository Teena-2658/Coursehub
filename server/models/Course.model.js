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
    ref: "User"
  }],
  lectures: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lecture"
  }],
  Creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  isPublished: {
    type: Boolean,
    default: false
  },
}, { timestamps: true });

export default mongoose.model("Course", CourseSchema);
