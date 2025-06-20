import { Button } from "@/components/components/ui/button";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { Link, useParams } from "react-router-dom";
import LectureTab from "./LectureTab";

const EditLecture = () => {
    const params = useParams();
    const courseId = params.courseId;

    return (
        <div className="p-6 md:p-10 bg-white rounded-xl shadow-md h-screen flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <Link to={`/admin/course/${courseId}/lecture`}>
                        <Button
                            size="icon"
                            variant="outline"
                            className="rounded-full border-gray-300 text-gray-700 hover:bg-gray-100 transition-all duration-300"
                        >
                            <ArrowLeft size={16} />
                        </Button>
                    </Link>
                    <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800">
                        Update Your Lecture
                    </h1>
                </div>
            </div>
            <div className="mt-8">
                <LectureTab />
            </div>
        </div>
    );
};

export default EditLecture;
