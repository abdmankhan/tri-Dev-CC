import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    pickupLocation: {
      type: String,
      required: true,
    },
    itemLocation: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    urgency: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    // Instead of a string like "1 hour", we expect a numeric value in minutes.
    expiryTime: {
      type: String, // expiry duration in minutes
      required: true,
    },
    // This field will be computed: creation time plus expiryTime (in ms)
    // expiresAt: {
    //   type: Date,
    //   // TTL index: MongoDB can automatically remove expired posts.
    //   index: { expires: 0 },
    // },
    category: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to compute expiresAt based on expiryTime (in minutes)
postSchema.pre("save", function (next) {
  if (!this.expiresAt && this.expiryTime) {
    // Calculate expiresAt as current time plus expiryTime (converted to ms)
    this.expiresAt = new Date(Date.now() + this.expiryTime * 60 * 1000);
  }
  next();
});

const Post = mongoose.model("Post", postSchema);
export default Post;
