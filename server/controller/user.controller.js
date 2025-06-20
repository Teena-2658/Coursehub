import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "../utils/Cloudnary.js";
import streamifier from 'streamifier';

// helper to upload a Buffer to Cloudinary
const uploadFromBuffer = (buffer) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'profiles' },     // optional folder
      (error, result) => {
        if (result) resolve(result);
        else     reject(error);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });


// REGISTER
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    return res.status(201).json({
      success: true,
      message: "Account Created Successfully",
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to register",
    });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email }); // ⬅️ use `user` here

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email or password",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email or password",
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    return res
    .cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",   // ← allow cross-origin
      secure: false,       // ← needed for sameSite: none
      maxAge: 1 * 24 * 60 * 60 * 1000,
    })
    .json({
      message: `Welcome back ${user.name}`,
      success: true,
      user,
    });
  

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to login",
    });
  }
};

// LOGOUT
export const logout = async (_, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", { maxAge: 0 })
      .json({
        message: "Logout successfully",
        success: true,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to logout",
    });
  }
};
export const updateprofile = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    console.log("File:", req.file); // <--- Yeh check karega ki file aa bhi rahi ya nahi

    const userId = req.id;
    const { name, description } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "No file received",
      });
    }

    // let cloudResponse = await cloudinary.uploader.upload(file.path);
    // NEW — stream the in‑memory buffer
let cloudResponse = await uploadFromBuffer(file.buffer);

    console.log("Cloudinary Response:", cloudResponse);

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (name) user.name = name;
    if (description) user.description = description;
    if (file) user.photoUrl = cloudResponse.secure_url;

    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully",
      success: true,
      user,
    });

  } catch (error) {
    console.error("Error in updateprofile:", error);  // <--- Print full error
    return res.status(500).json({
      success: false,
      message: "Failed to update profile",
      error: error.message,
    });
  }
};

