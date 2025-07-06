import { Input } from "@/components/components/ui/input";
import { Label } from "@/components/components/ui/label";
import { RadioGroup } from "@/components/components/ui/radio-group";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

const Signup = () => {
    const navigate = useNavigate();
    const [user, setuser] = useState({
        name: "",
        email: "",
        password: "",
        role: "student"
    });

    const handlechange = (e) => {
        const { name, value } = e.target;
        setuser((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handlesubmit = async (e) => {
        e.preventDefault();

        // Validation: Check if fields are empty
        if (!user.name || !user.email || !user.password) {
            toast.error("Please fill out all fields.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/api/v1/user/register', user, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });

            if (response.data.success) {
                toast.success(response.data.message);
                navigate('/login');
            } else {
                toast.error(response.data.message || "Something went wrong");
            }
        } catch (error) {
            console.log(error);

            if (error.response) {
                // Server-side error (e.g., 400, 500)
                toast.error(error.response.data.message || "Server error. Please try again.");
            } else {
                // Client-side error (e.g., network issues)
                toast.error("Network error. Please check your internet connection.");
            }
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-tr from-indigo-100 via-purple-100 to-pink-100 px-4 pt-16">

            <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md transition-all duration-300">
                <h1 className="text-3xl font-extrabold text-center text-purple-800 mb-2 tracking-tight mt-4">
                    Join the Course Hub
                </h1>
                <p className="text-center text-gray-600 mb-6 text-sm">
                    Create your account and start your journey 🚀
                </p>

                {/* Full Name */}
                <div className="mb-4">
                    <Label htmlFor="name" className="flex items-center gap-2">
                        <User className="w-4 h-4 text-purple-600" />
                        <span>Full Name</span>
                    </Label>
                    <Input id="name" placeholder="Enter Your Name" name="name" value={user.name} type="text" onChange={handlechange} className="w-full mt-2" />
                </div>

                {/* Email */}
                <div className="mb-4">
                    <Label htmlFor="email" className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-purple-600" />
                        <span>Email Address</span>
                    </Label>
                    <Input id="email" placeholder="Enter Your Email" name="email" value={user.email} onChange={handlechange} type="email" className="w-full mt-2" />
                </div>

                {/* Password */}
                <div className="mb-4">
                    <Label htmlFor="password" className="flex items-center gap-2">
                        <Lock className="w-4 h-4 text-purple-600" />
                        <span>Password</span>
                    </Label>
                    <Input id="password" placeholder="Enter Your Password" name="password" value={user.password} onChange={handlechange} type="password" className="w-full mt-2" />
                </div>

                {/* Role */}
                <div className="mb-6">
                    <Label className="mb-2 block text-purple-700">Role</Label>
                    <RadioGroup
                        value={user.role}
                        onChange={handlechange}
                        className="flex flex-col gap-3 sm:flex-row sm:gap-6"
                    >
                        <div className="flex items-center space-x-2">
                            <Input type="radio" id="role1" name="role" value="student" checked={user.role === 'student'} onChange={handlechange} />
                            <Label htmlFor="role1">Student</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Input type="radio" id="role2" name="role" value="instructor" checked={user.role === 'instructor'} onChange={handlechange} />
                            <Label htmlFor="role2">Instructor</Label>
                        </div>
                    </RadioGroup>
                </div>

                {/* Signup Button */}
                <button onClick={handlesubmit} className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-xl font-semibold text-base hover:opacity-90 shadow-lg transition duration-300 ease-in-out">
                    Create Account
                </button>

                {/* Redirect to Login */}
                <p className="text-center mt-6 text-sm text-gray-700">
                    Already registered?{" "}
                    <Link
                        to="/login"
                        className="text-purple-700 font-semibold hover:underline transition-colors"
                    >
                        Log in here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
