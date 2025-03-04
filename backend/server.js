import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRouter.js";
import userRoutes from "./routes/userRouter.js";
import postRoutes from "./routes/postRouter.js";
import notificationRoutes from "./routes/notificationRouter.js";
import connectMongoDB from "./db/connectMongoDB.js";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors()); // Enable CORS for all origins
app.use(express.json({ limit: "5mb" })); // to parse req.body
app.use(express.urlencoded({ extended: true })); //to parse form data
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/notification", notificationRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
    connectMongoDB();
});
