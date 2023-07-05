import express from "express";
import dotenv from "dotenv"
import morgan from "morgan"
import cookieParser from "cookie-parser";

import userRoutes from "../routes/users.js"
import videoRoutes from "../routes/videos.js"
import commentRoutes from "../routes/comments.js"
import authRoutes from "../routes/auths.js"

dotenv.config()

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(morgan('tiny'))



app.use("/api/users", userRoutes)
app.use("/api/videos", videoRoutes)
app.use("/api/comments", commentRoutes)
app.use("/api/auths", authRoutes)

export default app