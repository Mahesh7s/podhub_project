import dotenv from "dotenv";
dotenv.config();
// consol/e.log("ENV KEYS:", Object.keys(process.env));

import express from "express";

import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import loyaltyRoutes from "./routes/loyalty.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";
import commentRoutes from "./routes/comment.routes.js";
import subscriptionRoutes from "./routes/subscription.routes.js";
import episodeRoutes from "./routes/episode.routes.js";
import subscriptionLinkRoutes from "./routes/subscriptionLink.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";

connectDB();

const app = express();
app.use(
  cors({
  origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "http://localhost:5176", "http://localhost:5177", "https://podcast-hub-project7.netlify.app"],
     // your frontend URL
             // allow cookies/auth headers
  })
);
app.use(express.json());
app.use(errorHandler);
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/episodes", episodeRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/loyalty", loyaltyRoutes);
app.use("/api/subscription-links", subscriptionLinkRoutes);
// Default route
app.get("/", (req, res) => {
  res.send("PodHub API is running...");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT} ${process.env.CLOUDINARY_CLOUD_NAME}`));
