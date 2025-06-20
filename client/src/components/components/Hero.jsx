import React from "react";
import { Search, User, Award } from "lucide-react";
import learninggirl from "../../assets/learninggirl.jpg";
import CountUp from "react-countup";

const Hero = () => {
    return (
        <div className="bg-slate-800 min-h-screen flex items-center">
            <div className="max-w-7xl mx-auto flex md:flex-row flex-col items-center justify-between gap-10 px-8 md:px-0 py-10 relative">

                {/* Left Section */}
                <div className="space-y-7 w-full md:w-[50%] flex flex-col justify-center pl-16 relative">

                    {/* Stat on Top Left */}
                    <div className="absolute -top-16 left-10 flex items-center gap-2 bg-white/90 px-4 py-2 rounded-lg shadow-md">
                        <div className="bg-blue-500 text-white rounded-full p-2">
                            <User />
                        </div>
                        <div>
                            <h2 className="font-bold text-lg"><CountUp end={5000} />+</h2>
                            <p className="text-sm text-gray-600">Active Students</p>
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-200 leading-tight">
                        Explore Our <span className="text-blue-500">15000+</span><br />
                        Online Courses For All
                    </h1>
                    <p className="text-gray-300 text-lg">
                        Our platform offers a wide range of online courses designed to
                        help you learn new skills, advance your career, and pursue your
                        passions.
                    </p>

                    {/* Search */}
                    <div className="relative w-full max-w-[450px]">
                        <input
                            type="text"
                            placeholder="Search Your Course Here..."
                            className="bg-gray-200 w-full text-gray-800 p-4 pr-36 rounded-lg placeholder:text-gray-500"
                        />
                        <button className="absolute top-1/2 right-2 -translate-y-1/2 px-4 py-2 flex gap-1 items-center bg-blue-500 font-semibold text-white rounded-lg text-sm">
                            Search <Search width={18} height={18} />
                        </button>
                    </div>
                </div>

                {/* Right Section - Image */}
                <div className="w-full md:w-[50%] h-full flex items-center justify-center relative mt-10 md:mt-0">
                    <div className="relative">
                        <img
                            src={learninggirl}
                            alt="Learning Girl"
                            className="w-full max-w-md object-cover rounded-3xl shadow-2xl border-4 border-blue-500"
                        />

                        {/* Stat on Right Bottom */}
                        <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-white/90 px-4 py-2 rounded-lg shadow-md">
                            <div className="bg-blue-500 text-white rounded-full p-2">
                                <Award />
                            </div>
                            <div>
                                <h2 className="font-bold text-lg"><CountUp end={500} />+</h2>
                                <p className="text-sm text-gray-600">Certified Students</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Hero;
