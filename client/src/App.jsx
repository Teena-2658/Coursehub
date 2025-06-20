import React from "react";
import Navbar from "./components/components/Navbar";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from "./pages/Home";
import Courses from "./pages/Courses";

import Login from "./pages/auth/Login";  
import Signup from "./pages/auth/Signup";  
import Footer from "./components/components/Footer";
import Profile from "./pages/Profile";

import Admin from "./pages/admin/Admin";  
import Dashboard from "./pages/admin/Dashboard";
import Course from "./pages/admin/Course";
import CreateCourse from "./pages/admin/CreateCourse";
import UpdateCourse from "./pages/admin/UpdateCourse";
import CreateLecture from "./pages/admin/CreateLecture";
import EditLecture from "./pages/admin/EditLecture";
import CourseDetails from "./pages/CourseDetails";


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Home />
      </>
    ),
  },
  {
    path: "/courses",
    element: (
      <>
        <Navbar />
        <Courses />
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <Navbar />
        <Login />
      </>
    ),
  },
  {
    path: "/signup",
    element: (
      <>
        <Navbar />
        <Signup />
      </>
    ),
  },
  {
    path: "/Profile",
    element: (
      <>
        <Navbar />
        <Profile />
      </>
    ),
  },
  {
    path: "/courses/:courseId",
    element: (
      <>
        <Navbar />
        <CourseDetails />
      </>
    ),
  },

  {
    path: "/admin",
    element: 
      <>
        <Navbar />
        <Admin />
      </>,
     children:[
      {
        path: "dashboard",  // ✅ Use quotes here
        element: <Dashboard />
      },
      {
        path: "course",  // ✅ Use quotes here
        element: <Course />
      },
      {
        path: "course/create",  // ✅ Use quotes here
        element: <CreateCourse />
      },
      {
        path: "course/:courseId",  // use lowercase 'courseId'
        element: <UpdateCourse />
      },
      {
        path: "course/:courseId/lecture",  // use lowercase 'courseId'
        element: <CreateLecture />
      },
      {
        path: "course/:courseId/lecture/:lectureId",  // use lowercase 'courseId'
        element: <EditLecture />
      },
      
    ]
    
    
  },
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
      <Footer /> {/* This will ensure the footer appears on all pages */}
    </div>
  );
};

export default App;
