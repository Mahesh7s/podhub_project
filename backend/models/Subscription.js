import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  listener: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

subscriptionSchema.index({ listener: 1, creator: 1 }, { unique: true });

export default mongoose.model("Subscription", subscriptionSchema);
