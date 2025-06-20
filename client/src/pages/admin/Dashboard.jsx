import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/components/ui/button"; // Assuming you're using a Button component from your UI library.
import { Card, CardHeader, CardContent } from "@/components/components/ui/card"; // Assuming you're using a Card component from your UI library.

const Dashboard = () => {
  // Dynamic Recent Activities
  const activities = [
    {
      description: <>New course <span className="font-semibold text-blue-600">"Full Stack Web Development"</span> created</>,
      time: "10 mins ago",
    },
    {
      description: <>User <span className="font-semibold text-green-600">"Amit Kumar"</span> enrolled in <span className="text-blue-600">"Data Structures"</span></>,
      time: "30 mins ago",
    },
    {
      description: <>Admin approved <span className="font-semibold text-blue-600">"Machine Learning Basics"</span> course</>,
      time: "1 hour ago",
    },
    {
      description: <>New review added on <span className="text-blue-600">"ReactJS Fundamentals"</span></>,
      time: "2 hours ago",
    },
    {
      description: <>Payment of <span className="text-green-700 font-bold">₹1200</span> received from <span className="text-green-600">"Priya Sharma"</span></>,
      time: "4 hours ago",
    },
    {
      description: <>User <span className="font-semibold text-green-600">"Ravi Verma"</span> signed up</>,
      time: "6 hours ago",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-50 to-gray-100 pt-20 px-6">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header Section */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-700">Admin Dashboard</h2>
          <p className="text-lg text-gray-500 mt-2">Manage and oversee your courses, students, and settings.</p>
        </div>

        {/* Overview Cards Section */}
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-white shadow-lg rounded-2xl border border-gray-200">
            <CardHeader className="bg-blue-100 text-gray-800 p-5 rounded-t-2xl">
              <h3 className="font-semibold text-lg">Total Courses</h3>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-3xl font-bold text-gray-700">25</p>
              <Link to="/admin/courses" className="text-sm text-blue-600 hover:text-blue-700 mt-4 block">
                View All
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg rounded-2xl border border-gray-200">
            <CardHeader className="bg-blue-100 text-gray-800 p-5 rounded-t-2xl">
              <h3 className="font-semibold text-lg">Pending Approvals</h3>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-3xl font-bold text-gray-700">5</p>
              <Link to="/admin/pending" className="text-sm text-blue-600 hover:text-blue-700 mt-4 block">
                Review Now
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg rounded-2xl border border-gray-200">
            <CardHeader className="bg-blue-100 text-gray-800 p-5 rounded-t-2xl">
              <h3 className="font-semibold text-lg">Revenue</h3>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-3xl font-bold text-gray-700">₹ 10,500</p>
              <Link to="/admin/revenue" className="text-sm text-blue-600 hover:text-blue-700 mt-4 block">
                View Details
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Actions Section */}
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <Link to="/admin/create-course" className="w-full md:w-auto">
            <Button className="w-full px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 shadow-md transition">
              Create New Course
            </Button>
          </Link>
          <Link to="/admin/manage-users" className="w-full md:w-auto">
            <Button className="w-full px-8 py-4 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 shadow-md transition">
              Manage Users
            </Button>
          </Link>
        </div>

        {/* Recent Activity Section */}
        <div className="mt-10 bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-700 mb-6">Recent Activity</h3>
          <ul className="space-y-6">
            {activities.map((activity, index) => (
              <li key={index} className="flex justify-between items-center">
                <div className="text-gray-700 font-medium">{activity.description}</div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
