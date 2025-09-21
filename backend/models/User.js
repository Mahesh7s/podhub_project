import mongoose from "mongoose";
import bcrypt from "bcryptjs"; // safer cross-platform

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "creator", "admin"],
      default: "user",
    },

    // Loyalty Program
    loyalty: {
      points: { type: Number, default: 0 },
      tier: { type: String, enum: ["Bronze", "Silver", "Gold"], default: "Bronze" },
    },

    // Discounted Subscription Links (for creators)
    subscriptionLinks: [
      {
        code: { type: String },
        discount: { type: Number },
        redeemed: { type: Boolean, default: false },
        expiresAt: { type: Date },
      },
    ],
  },
  { timestamps: true }
);

// ✅ Hash password before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (err) {
    next(err);
  }
});

// ✅ Compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
