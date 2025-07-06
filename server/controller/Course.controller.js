import Course from "../models/Course.model.js";
import Lecture from "../models/lecture.model.js";


// 📌 Create a new course
export const createCourse = async (req, res) => {
  try {
    const { title, description, category, createdBy } = req.body;
    const thumbnail = {
      public_id: req.body.public_id,
      secure_url: req.body.secure_url,
    };

    if (!title || !description || !category || !createdBy) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const course = await Course.create({
      title,
      description,
      category,
      createdBy,
      thumbnail,
    });

    return res.status(201).json({
      success: true,
      message: "Course Created Successfully",
      course,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// 📌 Add lecture to course
export const CreateLecture = async (req, res) => {
  try {
    const { lectureTitle, description } = req.body;
    const { courseId } = req.params;

    const lecture = await Lecture.create({
      lectureTitle,
      description,
      videoUrl: req.body.videoUrl,
      publicId: req.body.publicId,
    });

    const course = await Course.findById(courseId);
    course.lectures.push(lecture._id);
    await course.save();

    return res.status(201).json({
      success: true,
      message: "Lecture added successfully",
      lecture,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to add lecture",
      success: false,
    });
  }
};

// 📌 Get all published courses
export const getPublishedCourse = async (req, res) => {
  try {
    const courses = await Course.find({ published: true });
    return res.status(200).json({
      success: true,
      courses,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to fetch courses",
      success: false,
    });
  }
};

// 📌 Get creator's courses
export const getCreatorCourse = async (req, res) => {
  try {
    const courses = await Course.find({ createdBy: req.user._id });
    return res.status(200).json({
      success: true,
      courses,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to fetch creator courses",
      success: false,
    });
  }
};

// 📌 Edit course
export const editCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { title, description, category } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    if (title) course.title = title;
    if (description) course.description = description;
    if (category) course.category = category;

    if (req.file) {
      course.thumbnail = {
        public_id: req.file.filename,
        secure_url: req.file.path,
      };
    }

    await course.save();

    return res.status(200).json({
      success: true,
      message: "Course updated successfully",
      course,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to update course",
      success: false,
    });
  }
};

// 📌 Get course by ID
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId).populate("lectures");
    if (!course) {
      return res.status(404).json({
        message: "Course not found",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      course,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to get course",
      success: false,
    });
  }
};

// 📌 Get lectures of a course
export const getCourseLecture = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId).populate("lectures");
    if (!course) {
      return res.status(404).json({
        message: "Course not found",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      lectures: course.lectures,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to fetch lectures",
      success: false,
    });
  }
};

// 📌 Edit lecture
export const editLecture = async (req, res) => {
  try {
    const { lectureTitle, videoinfo, isPreviewFree } = req.body;
    const { courseId, lectureId } = req.params;

    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({ message: "Lecture not found" });
    }

    if (lectureTitle) lecture.lectureTitle = lectureTitle;
    if (videoinfo?.videoUrl) lecture.videoUrl = videoinfo.videoUrl;
    if (videoinfo?.publicId) lecture.publicId = videoinfo.publicId;
    lecture.isPreviewFree = isPreviewFree;

    await lecture.save();

    const course = await Course.findById(courseId);
    if (course && !course.lectures.includes(lecture._id)) {
      course.lectures.push(lecture._id);
      await course.save();
    }

    return res.status(200).json({
      success: true,
      lecture,
      message: "Lecture updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to edit lecture",
      success: false,
    });
  }
};

// 📌 Remove lecture
export const removeLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;

    const lecture = await Lecture.findByIdAndDelete(lectureId);
    if (!lecture) {
      return res.status(404).json({
        message: "Lecture not found",
      });
    }

    await Course.updateOne(
      { lectures: lectureId },
      { $pull: { lectures: lectureId } }
    );

    return res.status(200).json({
      success: true,
      message: "Lecture removed successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to remove lecture",
    });
  }
};
