// 1️⃣ Imports
import express from "express"
import dotenv from "dotenv"
import connectDB from "./utils/db.js"
import userRoute from "./routes/user.routes.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import courseRoute from "./routes/course.route.js"
import mediaRoute from "./routes/media.routes.js"
import path from "path"
import { fileURLToPath } from "url"
import { v2 as cloudinary } from "cloudinary";

// 2️⃣ Config
dotenv.config()
const app = express()
const PORT = process.env.PORT || 8000

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 3️⃣ CORS
app.use(
  cors({
    origin: "http://localhost:5173", // dev mode ke liye
    credentials: true,
  })
)

// 4️⃣ Middlewares
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

// 5️⃣ Routes
app.use("/api/v1/user", userRoute)
app.use("/api/v1/course", courseRoute)
app.use("/api/v1/media", mediaRoute)

// 6️⃣ Serve Vite build from "dist"
const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
}

// 7️⃣ Start Server
app.listen(PORT, () => {
  connectDB()
  console.log(`✅ Server running at http://localhost:${PORT}`)
})
