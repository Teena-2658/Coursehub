import { useNavigate } from "react-router-dom";
import { Button } from "../../components/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/components/ui/table";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCourse } from "../../redux/CourseSlice";
import { Badge } from "@/components/components/ui/badge";
import { Edit } from "lucide-react";

const Course = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { Course } = useSelector((store) => store.Course);

  useEffect(() => {
    const getCreatorCourse = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/course/creator-courses",
          { withCredentials: true }
        );
        if (res.data.success) {
          dispatch(setCourse(res.data.courses));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCreatorCourse();
  }, [dispatch]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-tr from-gray-50 to-gray-100 py-10 px-4 md:px-10">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-700">Your Courses</h2>
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition"
          onClick={() => navigate("create")}
        >
          Create New Course
        </Button>
      </div>

      <div className="bg-white shadow-xl rounded-xl p-6 overflow-x-auto">
        <Table>
          <TableCaption className="text-gray-500 mt-4">
            A list of your recently created courses.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Course</TableHead>
              <TableHead className="text-center">Price</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Course?.map((course) => (
              <TableRow key={course._id} className="hover:bg-gray-50 transition">
                <TableCell className="flex items-center gap-4 py-4">
                  <img
                    src={course?.courseThumbnail}
                    alt="Thumbnail"
                    className="w-16 h-16 object-cover rounded-md border"
                  />
                  <div className="font-semibold text-gray-700">
                    {course.courseTitle}
                  </div>
                </TableCell>

                <TableCell className="text-center font-medium text-gray-600">
                  {course.coursePrice ? `₹ ${course.coursePrice}` : "NA"}
                </TableCell>

                <TableCell className="text-center">
                  <Badge
                    className={`text-white ${
                      course.isPublished ? "bg-green-500" : "bg-yellow-500"
                    }`}
                  >
                    {course.isPublished ? "Published" : "Draft"}
                  </Badge>
                </TableCell>

                <TableCell className="text-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigate(`/admin/course/${course._id}`)}
                    className="hover:bg-blue-100"
                  >
                    <Edit className="w-5 h-5 text-gray-600" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {Course?.length === 0 && (
            <tfoot>
              <tr>
                <td colSpan="4" className="text-center py-10 text-gray-500">
                  No courses found.
                </td>
              </tr>
            </tfoot>
          )}
        </Table>
      </div>
    </div>
  );
};

export default Course;
