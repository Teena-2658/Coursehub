
import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { 
  createCourse, 
  CreateLecture, 
  editCourse, 
  editLecture, 
  getCourseById, 
  getCourseLecture, 
  getCreatorCourse, 
  getPublishedCourse, 
  removeLecture 
} from "../controller/Course.controller.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

// ✅ Create a new course
router.post("/", isAuthenticated, singleUpload, createCourse);

// ✅ Get all published courses
router.get("/published-courses", getPublishedCourse);

// ✅ Get all courses created by the authenticated creator
router.get("/creator-courses", isAuthenticated, getCreatorCourse);

// ✅ Update a course by ID
router.put("/:courseId", isAuthenticated, singleUpload, editCourse);

// ✅ Get a course by ID
router.get("/:courseId", isAuthenticated, getCourseById);

// ✅ Add a lecture to a course
router.post("/:courseId/lecture", isAuthenticated, CreateLecture);

// ✅ Get lectures for a course
router.get("/:courseId/lecture", isAuthenticated, getCourseLecture);

// ✅ Edit a specific lecture in a course
router.post("/:courseId/lecture/:lectureId", isAuthenticated, editLecture);

// ✅ Delete a lecture by ID
router.delete("/lecture/:lectureId", isAuthenticated, removeLecture);

export default router;
