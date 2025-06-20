import React, { useEffect } from "react";
import CourseCard from "@/components/components/CourseCard";
import axios from "axios";
import { setCourse } from "../redux/CourseSlice";

import { useSelector,useDispatch } from "react-redux";


// Define the courses array
export const courses = [
  {
    "id": 1,
    "title": "Web Development Basics",
    "description": "Learn the fundamentals of web development, including HTML, CSS, and JavaScript, to build modern websites.",
    "image":"https://miro.medium.com/v2/resize:fit:1200/1*V-Jp13LvtVc2IiY2fp4qYw.jpeg"
  },
  {
    "id": 2,
    "title": "Advanced JavaScript",
    "description": "Master advanced JavaScript concepts like closures, promises, async/await, and more to enhance your web development skills.",
    "image": "https://d1jnx9ba8s6j9r.cloudfront.net/blog/wp-content/uploads/2019/12/Advanced-JavaScript-Tutorial-1.jpg"
  },
  {
    "id": 3,
    "title": "React for Beginners",
    "description": "Get started with React, a popular front-end framework, and learn how to build interactive user interfaces.",
    "image": "https://i.ytimg.com/vi/JPT3bFIwJYA/maxresdefault.jpg"
  },
  {
    "id": 4,
    "title": "Data Science with Python",
    "description": "Explore the world of data science and learn how to analyze data, visualize results, and apply machine learning with Python.",
    "image": "https://miro.medium.com/v2/resize:fit:1400/1*LxP1qwPjHE1CDFmLBh3bxQ.jpeg"
  },
  {
    "id": 5,
    "title": "Introduction to Machine Learning",
    "description": "Learn the basics of machine learning, including algorithms, data processing, and model evaluation, using Python.",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjI1DPEaVEvMU7Facf4wDpyo1vg0oz51gxtA&s",
  },
  {
    "id": 6,
    "title": "Digital Marketing Strategies",
    "description": "Understand the key concepts of digital marketing, including SEO, social media marketing, and paid advertising.",
    "image": "https://media.licdn.com/dms/image/v2/C5612AQFbvLgbFTvaFw/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1633899610825?e=2147483647&v=beta&t=IUNY_R0iH79Cdut3jp8dC3x9YpWUVmGnNQ-I5iRm1DY"
  },
  {
    "id": 7,
    "title": "Python for Data Analysis",
    "description": "Dive into Python programming for data analysis, working with libraries like pandas, NumPy, and Matplotlib.",
    "image": "https://media.geeksforgeeks.org/wp-content/uploads/20230510174745/Data-Analysis-with-Python.webp"
  },
  {
    "id": 8,
    "title": "Full Stack Web Development",
    "description": "Become a full-stack web developer by learning both front-end and back-end technologies like Node.js, Express, and MongoDB.",
    "image": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fyourstory.com%2Fmystory%2Fa-developers-insight-on-android-app-development-wh&psig=AOvVaw0nd0gtCf6fvl9o485HHCv-&ust=1745751066168000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCIj7itPD9YwDFQAAAAAdAAAAABAJ"
  },
  {
    "id": 9,
    "title": "UI/UX Design Principles",
    "description": "Learn the principles of UI/UX design and how to create user-friendly and visually appealing websites and apps.",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9muoO2X20zTGDV61C16bKvZRK8ZIhYPJbCw&s"
  },
  {
    "id": 10,
    "title": "Mobile App Development with React Native",
    "description": "Learn how to build cross-platform mobile apps using React Native, the popular framework for mobile development.",
    "image": "https://www.yujdesigns.com/wp-content/uploads/2019/10/infographics_1.png"
  },
  {
    "id": 11,
    "title": "Cloud Computing with AWS",
    "description": "Understand the basics of cloud computing and learn how to use Amazon Web Services (AWS) for deploying scalable applications.",
    "image": "https://media.licdn.com/dms/image/v2/D5612AQHcu_GS7_gCjw/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1711346329406?e=2147483647&v=beta&t=6QIIaWcllZIxtZz1bj_7GDxXO467smO-AioBlQqD_Xo"
  },
  {
    "id": 12,
    "title": "DevOps Essentials",
    "description": "Learn about the practices of DevOps, including continuous integration, continuous deployment, and infrastructure automation.",
    "image": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fmedium.com%2Fcloud-native-daily%2Fdelving-into-devops-essential-tools-%25EF%25B8%258Fand-stepping-stones-for-a-smooth-landing-679f5c70c9ed&psig=AOvVaw2JFgyD5VlUwjVDRrGt3Rzj&ust=1745751189732000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCLjSiI7E9YwDFQAAAAAdAAAAABAE"
  },
  {
    "id": 13,
    "title": "Blockchain Technology and Cryptocurrency",
    "description": "Get introduced to blockchain technology, how cryptocurrencies work, and how to create your own blockchain applications.",
    "image": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fshardeum.org%2Fblog%2Fdifference-between-cryptocurrency-and-blockchain%2F&psig=AOvVaw1P1sT6jpJvbr13d5IQHMx2&ust=1745751227761000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCLC595_E9YwDFQAAAAAdAAAAABAE"
  },
  {
    "id": 14,
    "title": "Ethical Hacking and Cybersecurity",
    "description": "Understand the fundamentals of cybersecurity and ethical hacking to secure systems and networks from vulnerabilities.",
    "image": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fgo4customer.com%2Fblog%2Finformation-verification%2Fethical-hacking-and-cyber-security-for-enterprises-purpose-security-stance&psig=AOvVaw3frrHP8F6Z0D6wI8xp0EBa&ust=1745751266140000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCIiIurHE9YwDFQAAAAAdAAAAABAE"
  },
  {
    "id": 15,
    "title": "Game Development with Unity",
    "description": "Learn how to develop interactive 2D and 3D games using the Unity game engine and programming with C#.",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjI1DPEaVEvMU7Facf4wDpyo1vg0oz51gxtA&s"
  }
];

const Coursesjson = () => {
   const dispatch = useDispatch();
   const courseState = useSelector((store) => store.course || { course: [] });
   const { course } = courseState;
   

 useEffect(()=>{
  const getAllPublishedCourse=async()=>{
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/course/published-courses`, { withCredentials: true });

      if(res.data.success){
dispatch(setCourse(res.data.courses))
      }
    } catch (error) {
      console.log(error);
      
      
    }
  }
  getAllPublishedCourse()
 })
  
  
  return (
    <div className="bg-gray-100 pt-14">
      <div className="min-h-screen max-w-7xl mx-auto py-10">
        <div className="px-4">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">Our Courses</h1>
          <p className="text-center text-gray-600 text-lg">
            Discover a variety of courses to boost your skills and career. Start your learning journey with us today!
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {
              // Ensure that you're using the correct `courses` array here
              courses.slice(0, 7).map((course) => {
                return <CourseCard key={course.id} course={course} />;
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coursesjson;
