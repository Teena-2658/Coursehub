// src/pages/admin/CourseTab.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux"; // Add this line

import axios from 'axios';

// Corrected import paths based on your provided file structure
import { Button } from "../../components/components/ui/button"; 
import { Card, CardContent,CardHeader, CardTitle, CardDescription } from "../../components/components/ui/card"; 
import { Input } from "../../components/components/ui/input"; 
import { Label } from "@radix-ui/react-label"; 
import { Loader2 } from "lucide-react"; 

// Your component logic continues here...


const CourseTab = () => {
  const { courseId: id } = useParams();
  console.log("Course ID:", id);  // Log to check the value
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { course } = useSelector((store) => store.course) || {};


  // Find initial course from Redux store
  const selectCourse = Array.isArray(course) ? course.find((c) => c._id === id) : null;

  const [selectedCourse, setSelectedCourse] = useState(selectCourse);
  const [loading, setLoading] = useState(false);
 
  const [previewThumbnail, setPreviewThumbnail] = useState(
    selectedCourse?.Thumnail
  );

  const [input, setInput] = useState({
    courseTitle: selectedCourse?.courseTitle || "",
    subTitle: selectedCourse?.subTitle || "",
    description: selectedCourse?.description || "",
    category: selectedCourse?.category || "",
    courseLevel: selectedCourse?.courseLevel || "",
    coursePrice: selectedCourse?.coursePrice || "",
    courseThumbnail: null,
  });


  const getCourseById = async () => {
    if (!id) {
      console.error("Course ID is missing");
      return; // Exit if the ID is missing
    }
  
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:8000/api/v1/course/${id}`, { withCredentials: true });
      if (res.data.success) {
        const c = res.data.course;
        setSelectedCourse(c);
        setInput({
          courseTitle: c.courseTitle,
          subTitle: c.subTitle,
          description: c.description,
          category: c.category,
          courseLevel: c.courseLevel,
          coursePrice: c.coursePrice,
          courseThumbnail: null,
        });
        setPreviewThumbnail(c.Thumnail);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    getCourseById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle simple text input changes
  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  // Handle thumbnail file selection
  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput((prev) => ({ ...prev, courseThumbnail: file }));
      const reader = new FileReader();
      reader.onloadend = () => setPreviewThumbnail(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const updateCourseHandler = async () => {
    if (!id) {
        console.error("Course ID is missing");
        return;
    }

    const formData = new FormData();
    formData.append("courseTitle", input.courseTitle);
    formData.append("subTitle", input.subTitle);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("courseLevel", input.courseLevel);
    formData.append("coursePrice", input.coursePrice);

    if (input.courseThumbnail) {
        formData.append("file", input.courseThumbnail);
    }

    try {
        setLoading(true);
        const res = await axios.put(
            `http://localhost:8000/api/v1/course/${id}`,
            formData,
            {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
            }
        );
        if (res.data.success) {
            setSelectedCourse(res.data.course); // Update course state
            toast.success(res.data.message);
            navigate("lecture");
        } else {
            // Log error from the response
            console.error("Error:", res.data.message);
            toast.error(res.data.message || "Failed to update the course.");
        }
    } catch (err) {
        // Log full error details
        console.error("Error during update:", err.response ? err.response.data : err.message);
        toast.error("Something went wrong while updating the course.");
    } finally {
        setLoading(false);
    }
};

  

  
  
  
  
  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-200 via-pink-300 to-pink-500 flex justify-center items-center">
      <Card className="bg-white shadow-lg rounded-lg w-full max-w-4xl">
        <CardHeader className="flex justify-between bg-gradient-to-r from-pink-400 to-pink-500 text-white rounded-t-lg p-6">
          <div>
            <CardTitle className="text-2xl font-semibold">
              Course Information
            </CardTitle>
            <CardDescription className="text-white font-medium">
              Edit your course details and click save when you're done.
            </CardDescription>
          </div>
         

        </CardHeader>
    
        <CardContent className="p-6 space-y-6">
          {/* Title */}
          <div className="space-y-4">
            <Label className="text-lg font-medium text-gray-700">Title</Label>
            <Input
              name="courseTitle"
              value={input.courseTitle}
              onChange={changeEventHandler}
              placeholder="Ex. Fullstack Developer"
              className="p-4 border-2 border-gray-300 rounded-lg"
            />
          </div>

          {/* Subtitle */}
          <div className="space-y-4">
            <Label className="text-lg font-medium text-gray-700">
              Subtitle
            </Label>
            <Input
              name="subTitle"
              value={input.subTitle}
              onChange={changeEventHandler}
              placeholder="Ex. Become a FullStack Developer"
              className="p-4 border-2 border-gray-300 rounded-lg"
            />
          </div>

          {/* Description */}
          <div className="space-y-4">
            <Label className="text-lg font-medium text-gray-700">
              Description
            </Label>
            <Input
              name="description"
              value={input.description}
              onChange={changeEventHandler}
              placeholder="Write a brief description..."
              className="p-4 border-2 border-gray-300 rounded-lg"
            />
          </div>

          {/* Category */}
          <div className="space-y-4">
            <Label className="text-lg font-medium text-gray-700">Category</Label>
            <Input
              name="category"
              value={input.category}
              onChange={changeEventHandler}
              placeholder="Ex. Web Development"
              className="p-4 border-2 border-gray-300 rounded-lg"
            />
          </div>

          {/* Level */}
          <div className="space-y-4">
            <Label className="text-lg font-medium text-gray-700">
              Course Level
            </Label>
            <Input
              name="courseLevel"
              value={input.courseLevel}
              onChange={changeEventHandler}
              placeholder="Beginner / Intermediate / Advanced"
              className="p-4 border-2 border-gray-300 rounded-lg"
            />
          </div>

          {/* Price */}
          <div className="space-y-4">
            <Label className="text-lg font-medium text-gray-700">Price</Label>
            <Input
              name="coursePrice"
              value={input.coursePrice}
              onChange={changeEventHandler}
              type="number"
              placeholder="Ex. 99.99"
              className="p-4 border-2 border-gray-300 rounded-lg"
            />
          </div>

          {/* Thumbnail */}
          <div className="space-y-4">
            <Label className="text-lg font-medium text-gray-700">
              Thumbnail
            </Label>
            <Input
              name="courseThumbnail"
              type="file"
              onChange={selectThumbnail}
              className="p-4 border-2 border-gray-300 rounded-lg"
            />
            {previewThumbnail && (
              <img
                src={previewThumbnail}
                alt="Thumbnail"
                className="w-64 my-2"
              />
            )}
          </div>
        </CardContent>

        <div className="flex justify-end space-x-4 bg-gray-50 rounded-b-lg p-4">
          <Button 
            onClick={updateCourseHandler} 
            disabled={loading}
            className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-2 rounded-lg"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2" />
                Saving...
              </>
            ) : (
              "Save"
            )}
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
            className="border-gray-300 text-gray-700"
          >
            Cancel
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CourseTab;
