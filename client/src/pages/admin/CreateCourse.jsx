import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const CreateCourse = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [courseTitle, setCourseTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState("");
  const [price, setPrice] = useState("");

  const createCourseHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = {
        courseTitle,
        subtitle,
        category,
        description,
        level,
        price,
      };

      const res = await axios.post("http://localhost:8000/api/v1/course/", formData, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/course");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please check your inputs or try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 to-purple-100 pt-20 px-6">
      <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-3xl p-10 border border-purple-100">
        <h2 className="text-3xl font-extrabold mb-3 text-center text-purple-700">Create New Course</h2>
        <p className="text-gray-600 text-center mb-8">
          Fill out the details below to create a new course.
        </p>

        <form onSubmit={createCourseHandler} className="space-y-6">
          <div>
            <label className="block mb-1 font-semibold text-purple-800">Course Title</label>
            <input
              type="text"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              placeholder="Enter course title"
              className="w-full border border-purple-300 bg-purple-50 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-purple-800">Subtitle</label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Enter course subtitle"
              className="w-full border border-purple-300 bg-purple-50 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-purple-800">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Enter course category"
              className="w-full border border-purple-300 bg-purple-50 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-purple-800">Description</label>
            <textarea
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write a course description..."
              className="w-full border border-purple-300 bg-purple-50 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            ></textarea>
          </div>

          <div>
            <label className="block mb-1 font-semibold text-purple-800">Level</label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full border border-purple-300 bg-purple-50 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select level</option>
              <option value="Beginner">Beginner</option>
              <option value="Medium">Medium</option>
              <option value="Advance">Advance</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-semibold text-purple-800">Price (₹)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter course price"
              className="w-full border border-purple-300 bg-purple-50 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={() => navigate("/admin/course")}
              className="px-6 py-2 bg-red-100 text-red-600 font-medium rounded-xl hover:bg-red-200 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 shadow-md transition flex items-center gap-2"
            >
              {loading ? <><Loader2 className="animate-spin w-4 h-4" /> Please wait</> : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;
