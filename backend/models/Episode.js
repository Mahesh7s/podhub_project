import mongoose from "mongoose";

const episodeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    audioPublicId: { type: String }, 
    audioUrl: { type: String, required: true },
    duration: { type: Number, required: true,default: 0 },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    // Analytics
    plays: { type: Number, default: 0 },
    downloads: { type: Number, default: 0 },
    commentsCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Episode", episodeSchema);
