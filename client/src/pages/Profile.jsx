// Modified Profile.jsx with all fixes
import React, { useState } from "react";
import Userimage from "../assets/istockphoto-1337144146-612x612.jpg";
import { Button } from "@/components/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/components/ui/dialog";
import { Label } from "@/components/components/ui/label";
import { Input } from "@/components/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/authSlice";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const [input, setInput] = useState({
    name: user?.name || "",
    description: user?.description || "",
    file: null,
  });
  const [loading, setLoading] = useState(false);

  const[open,setOpen]=useState(false)
  const ChangeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const ChangeFileHandler = (e) => {
    setInput((prev) => ({ ...prev, file: e.target.files?.[0] }));
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    if (input.file) formData.append("file", input.file);

    try {
      setLoading(true);
      const res = await axios.put(
        "http://localhost:8000/api/v1/user/profile/update",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        setOpen(false)
        toast.success(res.data.message);
        dispatch(setUser(res.data.user));
      }
    } catch (error) {
      toast.error("Update failed. Please login again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 py-12 px-4 lg:px-0 min-h-screen">
      <div className="max-w-6xl mx-auto p-8 bg-white bg-gradient-to-r from-blue-100 to-purple-100 shadow-xl rounded-2xl mt-14">
        <div className="flex flex-col items-center md:flex-row md:items-start space-y-6 md:space-y-0 md:space-x-12">
          <div className="w-40 h-40">
            <img
              src={user?.photoUrl || Userimage}
              alt="Profile"
              className="w-full h-full rounded-full border-4 border-blue-500 object-cover shadow-md"
            />
          </div>

          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold text-blue-500">
              Welcome, {user?.name?.split(" ")[0] || "User"}
            </h1>
            <p className="text-lg text-gray-600 mt-3">
              <span className="font-bold">Email:</span> {user?.email || "Email not available"}
            </p>
            <p className="text-gray-600 my-1 capitalize">
              <span className="font-bold">Role: </span> {user?.role || "User"}
            </p>
            <p className="text-gray-700 text-base leading-relaxed mb-3">
              <span className="font-bold">Bio: </span> {user?.description || "Add Your Bio"}
            </p>

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button onClick={()=>setOpen(true)} className="bg-blue-500">Edit Profile</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>Make changes to your profile here.</DialogDescription>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={input.name}
                      onChange={ChangeEventHandler}
                      className="col-span-3 text-gray-500"
                    />
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Input
                      id="description"
                      name="description"
                      value={input.description}
                      onChange={ChangeEventHandler}
                      className="col-span-3 text-gray-500"
                    />
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="file" className="text-right">
                      Picture
                    </Label>
                    <Input
                      id="file"
                      type="file"
                      accept="image/*"
                      onChange={ChangeFileHandler}
                      className="w-[277px]"
                    />
                  </div>
                </div>
                <DialogFooter>
                  {loading ? (
                    <Button className="bg-blue-400" disabled>
                      <Loader2 className="w-4 h-4 animate-spin" /> Please Wait
                    </Button>
                  ) : (
                    <Button onClick={SubmitHandler} className="bg-blue-500">
                      Save Changes
                    </Button>
                  )}
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
