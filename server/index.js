// 1️⃣ Imports
import express from "express"
import dotenv from "dotenv"
import connectDB from "./utils/db.js"
import userRoute from "./routes/user.routes.js"
import cookieParser from "cookie-parser"
import cors from 'cors'
import courseRoute from "./routes/course.route.js"
import mediaRoute from "./routes/media.routes.js"

// 2️⃣ Config
dotenv.config()
const app = express()
const PORT = process.env.PORT || 8000

// ✅ 3️⃣ YAHAN LAGANA HAI CORS
app.use(cors({
  origin: "http://localhost:5173", // ← React app ka port
  credentials: true
}))

// 4️⃣ Middlewares
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

// 5️⃣ Routes
app.use("/api/v1/user", userRoute)
app.use("/api/v1/course", courseRoute)
app.use("/api/v1/media", mediaRoute)

// 6️⃣ Start Server
app.listen(PORT, () => {
  connectDB()
  console.log(`✅ Server running at http://localhost:${PORT}`)
})
