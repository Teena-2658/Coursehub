import React, { useState } from "react";
import { Input } from "@/components/components/ui/input";
import { Label } from "@/components/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { setUser } from "../../redux/authSlice"; // Assuming you're two levels down from 'src'
import { useDispatch } from "react-redux";



const Login = () => {
  const navigate=useNavigate()
  const dispatch = useDispatch();
  const[input,setInput]=useState({
    email:"",
    password:""
  })
  const handlechange=(e)=>{
    const {name,value}=e.target
    setInput((prev)=>({
      ...prev,
      [name]:value,
    }))
  }
  const handlesubmit = async (e) => {
    e.preventDefault();
    console.log(input);  // Check user values before sending
  
    try {
      const response = await axios.post('http://localhost:8000/api/v1/user/login', input, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });
  
      if (response.data.success) {
        navigate('/');
        dispatch(setUser(response.data.user))
        toast.success(response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log("Error in login:", error);
      // Display the exact error from the backend
      toast.error(error.response?.data?.message || "Login failed");
    }
  };
  
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 px-4 py-20 flex justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Welcome Back 👋
        </h1>
        <p className="text-center text-gray-600 mb-6 text-sm">
          Please login to your account
        </p>

        {/* Email */}
        <div className="mb-4">
          <Label htmlFor="email" className="text-gray-700">
            Email Address
          </Label>
          <Input
            id="email"
            placeholder="Enter your email"
            className="mt-1 border-gray-300" type="email"
            name="email" value={input.email} onChange={handlechange} 
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <Label htmlFor="password"  className="text-gray-700">
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              name="password" value={input.password} onChange={handlechange} 
              className="mt-1 pr-10"
            />
            <button
              type="button"
              className="absolute right-2 top-2 text-sm text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {/* Login Button */}
        <button onClick={handlesubmit}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-base hover:bg-blue-700 shadow-md transition duration-300 ease-in-out"
        >
          Login
        </button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-3 text-gray-500">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Social Logins */}
        <div className="flex flex-col gap-3">
          <button className="flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-md hover:bg-gray-50 transition">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            <span className="text-sm text-gray-700 font-medium">
              Continue with Google
            </span>
          </button>
          <button className="flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-md hover:bg-gray-50 transition">
            <img
              src="https://www.svgrepo.com/show/512317/github-142.svg"
              alt="GitHub"
              className="w-5 h-5"
            />
            <span className="text-sm text-gray-700 font-medium">
              Continue with GitHub
            </span>
          </button>
        </div>

        {/* Signup Redirect */}
        <p className="text-center mt-6 text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 font-semibold hover:underline hover:text-blue-700 transition"
          >
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
