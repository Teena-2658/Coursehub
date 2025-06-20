import React from "react";
import { GraduationCap } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"; 
import axios from "axios";
import { setUser } from "../../redux/authSlice"; 
import { toast } from "sonner";

const Navbar = () => {
  const dispatch = useDispatch();  
  const navigate=useNavigate();
  const { user } = useSelector((state) => state.auth);  

  const logoutHandler = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/v1/user/logout', { withCredentials: true });
      if (res.data.success) {
        navigate('/')
        dispatch(setUser(null));  
        toast.success(res.data.message);  
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'An error occurred during logout');  
    }
  };

  return (
    <div className="bg-gray-900 z-50 w-full py-3 fixed top-0 left-0 right-0">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-16"> {/* Fixed height here */}
        {/* Logo Section */}
        <Link to="/">
          <div className="flex gap-2 items-center">
            <GraduationCap className="text-gray-300 w-10 h-10" />
            <h1 className="text-gray-300 text-3xl font-bold">CourseHub</h1>
          </div>
        </Link>
        
        {/* Menu Section */}
        <nav>
          <ul className="flex gap-7 text-xl items-center font-semibold text-white">
            <Link to="/"><li className="font-bold cursor-pointer">Home</li></Link> 
            <Link to="/courses">
              <li className="font-bold cursor-pointer">Courses</li>
            </Link>

            {/* Conditional rendering for user authentication state */}
            {
              !user ? (
                <div className="flex gap-9">
                  <Link to="/login">
                    <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded font-bold cursor-pointer">Login</button>
                  </Link>
                  <Link to="/signup">
                    <button className="bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded font-bold cursor-pointer">Signup</button>
                  </Link>
                </div>
              ) : (
                <div className="flex items-center gap-7">
                  {
                    user.role==="instructor" && <Link to="/admin/dashboard"><li className="cursor-pointer">Admin</li></Link>
                  }
                  <Link to="/profile">
                    <Avatar className="w-8 h-8 rounded-full">
                      <AvatarImage className="w-8 h-8 object-cover rounded-full" src={user.photoUrl} alt="@shadcn" />
                      <AvatarFallback>Profile</AvatarFallback>
                    </Avatar>
                  </Link>
                  <button onClick={logoutHandler} className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded font-bold cursor-pointer">Logout</button>
                </div>
              )
            }
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
