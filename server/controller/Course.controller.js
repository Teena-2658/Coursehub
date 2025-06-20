
import { Course } from "../models/Course.model.js";
import cloudinary from "../utils/Cloudnary.js";
import getDataUri from "../utils/datauri.js";
import { Lecture } from "../models/lecture.model.js";


// Create Course
export const createCourse = async (req, res) => {
    try {
        const { courseTitle, category } = req.body;

        if (!courseTitle || !category) {
            return res.status(400).json({
                message: "Course title and category are required",
                success: false
            });
        }

        const course = await Course.create({
            courseTitle,
            category,
            Creator: req.id,
        });

        return res.status(201).json({
            success: true,
            course,
            message: "Course created successfully"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to create course",
            success: false
        });
    }
};

// Get Published Courses
export const getPublishedCourse = async (_, res) => {
    try {
        const courses = await Course.find({ isPublished: true }).populate({path:"creator",select:"name photoUrl description"});

        if (!courses || courses.length === 0) {
            return res.status(404).json({
                message: "No published courses found",
                success: false
            });
        }

        return res.status(200).json({
            success: true,
            courses,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to get courses",
            success: false
        });
    }
};

// Get Creator's Courses
export const getCreatorCourse = async (req, res) => {
    try {
        const courses = (await Course.find({ Creator: req.id })).populate("lectures");

        if (!courses || courses.length === 0) {
            return res.status(404).json({
                message: "No courses found",
                success: false
            });
        }

        return res.status(200).json({
            success: true,
            courses,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};

// Edit Course
export const editCourse = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const {
            courseTitle,
            subTitle,
            description,
            category,
            courseLevel,
            coursePrice
        } = req.body;
        const file = req.file;

        let course = await Course.findById(courseId).populate("lectures");
        if (!course) {
            return res.status(404).json({
                message: "Course not found!",
                success: false
            });
        }

        let courseThumbnail;
        if (file) {
            const fileUri = getDataUri(file);
            const uploadedFile = await cloudinary.uploader.upload(fileUri);
            courseThumbnail = uploadedFile.secure_url;
        }

        const updateData = {
            courseTitle,
            subTitle,
            description,
            category,
            courseLevel,
            coursePrice,
            ...(courseThumbnail && { courseThumbnail })
        };

        course = await Course.findByIdAndUpdate(courseId, updateData, { new: true });

        return res.status(200).json({
            success: true,
            course,
            message: "Course updated successfully"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to update course",
            success: false
        });
    }
};

// Get Course By ID
export const getCourseById = async (req, res) => {
    try {
        const { courseId } = req.params;
        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({
                message: "Course not found",
                success: false
            });
        }

        return res.status(200).json({
            success: true,
            course,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to get course",
            success: false
        });
    }
};



export const CreateLecture = async (req, res) => {
    try {
      const { lectureTitle } = req.body;
  
      if (!lectureTitle) {
        return res.status(400).json({
          message: "Lecture title is required",
        });
      }
  
      // Create the lecture only (no course update)
      const lecture = await Lecture.create({
        lectureTitle,
        videoUrl: "",
        publicId: "",
        isPreviewFree: false,
      });
  
      return res.status(201).json({
        success: true,
        lecture,
        message: "Lecture Created Successfully",
      });
    } catch (error) {
      console.error("Error creating lecture:", error); // Log error details
      return res.status(500).json({
        message: "Failed to create lecture",
        success: false,
        error: error.message,
        stack: error.stack,
      });
    }
  };
  
  
  

export const getCourseLecture=async(req,res)=>{
    try {
    const {courseId} =req.params
    const course = await Course.findById(courseId).populate('lectures');

    if(!course){
        return res.status(404).json({
            message:"course not found"
        })
    }
    return res.status(200).json({
        success:true,
        lectures:course.lectures
    })
} catch (error) {
 console.log(error);
    return res.status(500).json({
        message:"failed to get lectures"
    })
}
}

export const editLecture=async(req,res)=>{
    try {
        const {lectureTitle,videoinfo,isPreviewFree}=req.body
        const {courseId,lectureId}=req.params
        const lecture=await Lecture.findById(lectureId)
if(!lecture){
    return res.status(404).json({
        message:"Lecture not found"
    })
}
// update lecture
if(lectureTitle) lecture.lectureTitle=lectureTitle
if(videoinfo?.videoUrl) lecture.videoUrl=videoinfo.videoUrl
if(videoinfo?.publicId) lecture.publicId=videoinfo.publicId
lecture.isPreviewFree=isPreviewFree

await lecture.save()

const course=await course.findById(courseId)
if(course && !course.lectures.includes(lecture._id)){
    course.lectures.push(lecture._id)
    await course.save()
}
return res.status(200).json({
    success:true,
    lecture,
    message:"Lecture update successfully"
})

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"failed to edit lectures",
            success:false   
        })
        
    }
}

export const  removeLecture=async(req,res)=>{
    try {
        const {lectureId}=req.params
        const lecture=await Lecture.findByIdAndDelete(lectureId)
        if(!lecture){
            return res.status(404).json({
                message:"lecture not found"
            })
        }
        await course.updateOne(
            {lectures:lectureId},
            {$pull:{lectures:lectureId}}
        );
        return res.status(200).json({
            success:true,
            message:"lecture removed successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"failed to remove lecture"
        })
        
    }
}
