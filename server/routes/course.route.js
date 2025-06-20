import express from 'express';
import { isAuthenticated } from '../middleware/isAuthenticated.js';
import { 
  createCourse, 
  CreateLecture, 
  editCourse, 
  editLecture, 
  getCourseById, 
  getCourseLecture, 
  getCreatorCourse, 
  getPublishedCourse, 
  removeLecture,
  
} from '../controller/Course.controller.js';
import { singleUpload } from '../middleware/multer.js';

const router = express.Router();

// Create new course
router.post("/", isAuthenticated, createCourse);

// Get all published courses
router.get("/published-courses", getPublishedCourse);

// Get courses created by the authenticated user
router.get("/creator-courses", isAuthenticated, getCreatorCourse);

// Update a course by ID
router.put("/:courseId", isAuthenticated, singleUpload, editCourse);


// Get a specific course by ID
router.get("/:courseId", isAuthenticated, getCourseById);

router.route("/:courseId/lecture").post(isAuthenticated, CreateLecture);

router.route("/:courseId/lecture").get(isAuthenticated, getCourseLecture);

router.route("/:courseId/lecture/:lectureId").post(isAuthenticated, editLecture);

router.route("lecture/:lectureId").delete(isAuthenticated, removeLecture);


export default router;
