import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Edit, Loader2 } from "lucide-react";
import { setLecture } from "../../redux/lectureSlice";
import { useDispatch, useSelector } from "react-redux";

const CreateLecture = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [lectureTitle, setLectureTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const { lecture } = useSelector((store) => store.lecture);

  // Handler for creating a lecture
  const CreateLectureHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const data = { lectureTitle };

      const res = await axios.post(
        `http://localhost:8000/api/v1/course/${params?.courseId}/lecture`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message || "Lecture created successfully");
        dispatch(setLecture([...lecture, res.data.lecture])); // Update Redux state with the new lecture
        setLectureTitle(""); // Reset input field
      } else {
        toast.error(`Error: ${res.data.message}`);
      }
    } catch (error) {
      if (error.response) {
        console.error("Backend error:", error.response);
        toast.error(`Backend Error: ${error.response.data.message || 'Server Error'}`);
      } else if (error.request) {
        console.error("No response received:", error.request);
        toast.error("Server not responding");
      } else {
        console.error("Unexpected error:", error.message);
        toast.error("Unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch lectures on component mount or when courseId changes
  useEffect(() => {
    const getLectures = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/v1/course/${params.courseId}/lecture`,
          { withCredentials: true }
        );
        if (res.data.success) {
          dispatch(setLecture(res.data.lectures)); // Store fetched lectures in Redux
        } else {
          toast.error(res.data.message || "Failed to load lectures.");
        }
      } catch (error) {
        console.log(error);
        toast.error("Error fetching lectures.");
      }
    };

    getLectures(); // Fetch lectures when component mounts or courseId changes
  }, [dispatch, params.courseId]); // Re-fetch lectures when courseId changes

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 shadow-lg rounded-2xl bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Create New Lecture</h2>

      <button
        onClick={() => navigate(-1)}
        className="mb-4 py-2 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
      >
        Back
      </button>

      <form onSubmit={CreateLectureHandler} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Lecture Title</label>
          <input
            type="text"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            placeholder="Enter lecture title"
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
        >
          {loading ? (
            <>
              <Loader2 className="mr-1 h-4 w-4 animate-spin inline-block" />
              Please wait...
            </>
          ) : (
            "Create Lecture"
          )}
        </button>
      </form>

      <div className="mt-10">
        {lecture?.map((lecture, index) => (
          <div
            key={index}
            className="flex items-center justify-between px-4 py-2 rounded-md my-2 border bg-gray-50"
          >
            <h1 className="font-bold text-gray-800">
              Lecture-{index + 1}: {lecture.lectureTitle}
            </h1>
            <Edit
              onClick={() => navigate(`${lecture._id}`)}
              size={20}
              className="cursor-pointer text-gray-400 hover:text-blue-600"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateLecture;
