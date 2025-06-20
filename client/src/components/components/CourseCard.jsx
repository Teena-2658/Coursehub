import React from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import store from "src/redux/Store";

const CourseCard = ({ course }) => {
    const navigate = useNavigate()
    const { user } = useSelector(store => store.auth)
    return (
        <Card className="bg-white shadow-lg">
            {/* Update course.courseThumbnail to course.image */}
            <img
                src={course.image}  // Corrected from course.courseThumbnail
                alt={course.title}
                className="object-cover rounded-t-md"
                style={{ width: "100%", height: "12rem" }}
            />
            <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">{course.title}</h2>
                <p className="text-gray-600 mb-4">{course.description}</p>
                {/* <Button onClick={()=>navigate(user?`/courses/${course._id}`:"login")}>Learn More</Button> */}
                <Button
                    onClick={() => navigate(user ? `/courses/${course._id}` : "/login", { state: { course } })}
                >
                    Learn More
                </Button>

            </div>
        </Card>
    );
};

export default CourseCard;
