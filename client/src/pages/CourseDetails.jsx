import { Button } from "@/components/components/ui/button";
import { Card } from "@/components/components/ui/card";
import axios from "axios";
import { ArrowLeft, PlayCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";



import { useLocation } from "react-router-dom";

const CourseDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();

  // STEP 1: Check state first
  const selectedCourse = location.state?.course;

  // STEP 2: Fallback to Redux if not found
  const { course: courseList } = useSelector((store) => store.course) || { course: [] };
  const backupCourse = courseList.find((course) => course._id === params.courseId);

  const[courseLecture,setCourseLecture]=useState(null)
  useEffect(()=>{
    const getCourseLecture=async()=>{
        try {
            const res=await axios.get(`http://localhost:8000/api/v1/course/${courseId}/lecture`,{withCredentials:true})
            if(res.data.success){
                setCourseLecture(res.data.lectures)
            }
        } catch (error) {
            console.log(error);
            
            
        }
    }
    getCourseLecture()
  })

  // Use fallback if selectedCourse is undefined
  const courseData = selectedCourse || backupCourse;

  if (!courseData) {
    return <div className="text-center text-red-500 mt-10">Course Not Found</div>;
  }

  return (
    <div className="bg-gray-100 md:p-10">
      <Card className="max-w-7xl rounded-md mx-auto bg-white shadow-md pt-5 mt-14">
        {/* header */}
        <div className="px-4 py-1">
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <Button className="rounded-full" variant="outline" size="icon" onClick={() => navigate("/")}>
                <ArrowLeft size={16} />
              </Button>
              <h1 className="md:text-2xl font-bold text-gray-800">{courseData.title}</h1>
            </div>
            <div className="flex space-x-4">
              <Button className="bg-blue-500 hover:bg-blue-600">Enroll Now</Button>
            </div>
          </div>
        </div>

        {/* course overview */}
        <div className="p-6">
          <div className="flex flex-col lg:flex-row lg:space-x-8">
            <img
              src={courseData.image}
              alt={courseData.title}
              className="rounded-md w-full lg:w-1/2 h-auto object-cover"
            />
            <div>
                <p className="text-gray-800 font-bold mb-4 capitalize">{selectedCourse.title}</p>
                <p className="text-gray-800 font-semibold mb-4 capitalize" dangerouslySetInnerHTML={{__html:selectedCourse.description}} ></p>
                <p className="text-gray-800 font-semibold">⭐⭐⭐⭐⭐(4.8) | 1,200 reviews</p>
                <div className="mt-1">
                    <p className="font-bold font-gray-800">₹{selectedCourse.courseprice}</p>
                    <p className="text-gray-500 line-through">₹499</p>
                </div>
                <ul className="mt-4 space-y-2">
                    <li className="text-gray-600">Access to 50+ video lectures</li>
                    <li className="text-gray-600">Downloadable resources and project files</li>
                    <li className="text-gray-600">Certificate of Completion</li>
                </ul>
            </div>
          </div>
        </div>

        <div className="p-6">
        {/* Course Details Section */}
        <h2 className="text-xl font-bold text-gray-800 mb-4">What You'll Learn</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>Build dynamic web applications with React and Node.js</li>
          <li>Deploy websites with modern tools like Vercel and Netlify</li>
          <li>Understand REST APIs and database integration</li>
        </ul>

        <h2 className="text-xl font-bold text-gray-800 mt-6 mb-4">Requirements</h2>
        <p className="text-gray-700">
          Basic programming knowledge is helpful but not required.
        </p>

        <h2 className="text-xl font-bold text-gray-800 mt-6 mb-4">Who This Course is For</h2>
        <p className="text-gray-700">
          Beginners, aspiring developers, and professionals looking to upgrade skills.
        </p>
      </div>


     {/* course lecture */}
{
  courseLecture?.length === 0 ? null : (
    <div className="flex flex-col md:flex-row justify-between gap-10 p-6">
      
      {/* Left - Curriculum */}
      <div className="flex-1">
        <h2 className="text-xl font-bold text-gray-800">Course Curriculum</h2>
        <p className="text-gray-400 italic my-2">{courseLecture?.length} Lectures</p>
        <div className="space-y-4">
          {courseLecture?.map((lecture, index) => (
            <div key={index} className="flex items-center gap-3 bg-gray-200 p-4 rounded-md cursor-pointer">
              <span>
                {lecture.isPreviewFree ? <PlayCircle size={20} /> : <Lock size={20} />}
              </span>
              <p className="font-semibold">{lecture.lectureTitle}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right - Video and Description */}
      <div className="w-full md:w-1/3">
        <div className="bg-white p-4 rounded-lg shadow-md">
          {/* Example Video */}
          <video
            controls={true}
            className="rounded-lg w-full h-48 object-cover"
            src={courseLecture?courseLecture[0]?.videoUrl:null} // yahan tum apna video link laga sakte ho
          ></video>

          {/* Lecture Title */}
          <h3 className="text-xl font-semibold mt-4">{courseLecture?courseLecture[0]?.lectureTitle:"Lecture Title"}</h3>

          {/* Lecture Description */}
          <p className="text-gray-600 mt-2">
            Learn the basics of Excel including formulas, functions, and chart creation.
          </p>

          {/* Continue Course Button */}
          <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition">
            Continue Course
          </button>
        </div>
      </div>

    </div>
  )
}
{/* instructor section  */}
{/* instructor section */}
<div className="p-6">
    <h2 className="font-bold mb-4 text-gray-800 text-xl">Instructor</h2>
    <div className="flex items-center space-x-4">
        {/* Add a fallback for creator photo */}
        <img 
            src={selectedCourse?.creator?.photoUrl || 'fallback-image-url'} 
            alt="Instructor" 
            className="w-16 h-16 rounded-full" 
        />
        <div>
            {/* Check if creator is defined before accessing 'name' */}
            <h3 className="text-gray-700 font-bold text-lg">
                {selectedCourse?.creator?.name || 'Instructor Name'}
            </h3>
            <p className="text-gray-500 mt-4">
                {selectedCourse?.creator?.title || 'Instructor Title'}
            </p>
        </div>
    </div>
    {/* Check if creator description is available */}
    <p className="text-gray-700 mt-4">
        {selectedCourse?.creator?.description || 'Instructor Description'}
    </p>
</div>

      </Card>
    </div>
  );
};

export default CourseDetails