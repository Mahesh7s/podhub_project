import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    episode: { type: mongoose.Schema.Types.ObjectId, ref: "Episode", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    replies: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        text: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Comment", commentSchema);
