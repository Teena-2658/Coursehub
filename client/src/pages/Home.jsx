import React from "react";
import Hero from "../components/components/Hero";

import { courses } from "./Courses";
import CourseCard from "@/components/components/CourseCard";

const Home=()=>{
  return(
    <div>
      <Hero/>
      <div className="py-10 mt-10">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">Our Courses</h1>
                    <p className="text-center text-gray-600 text-lg">
                        Discover a variety of courses to boost your skills and career. Start your learning journey with us today!
                    </p>
      </div>
      <div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {
        courses.slice(0,6).map((course)=>{
          return <CourseCard course={course}/>
        })
      }
      </div>
      </div>
    </div>
  )
}

export default Home