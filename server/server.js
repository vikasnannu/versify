import dotenv from "dotenv";
import express from "express";
import connectDatabase from "./configurations/connectDatabase.js";
import connectCloudinary from "./configurations/connectCloudinary.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import messageRoutes from "./routes/message.routes.js";
import { app, server } from "./configurations/socket.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

// Connecting Database/s
await connectDatabase();
await connectCloudinary();

// Middlewares
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/messages", messageRoutes);

try {
  server.listen(PORT, () =>
    console.log(`Server Started Succesfully at Port: ${PORT}`),
  );
} catch (error) {
  console.error(`Server Connection Failed: ${error.message}`);
  process.exit(1);
}