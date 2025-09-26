const mongoose = require("mongoose");

const burgerSchema = new mongoose.Schema({
  image: {
    type: String,
    required: [true, "Burger image is required"],
    validate: {
      validator: function (v) {
        return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)(\?.*)?$|^https?:\/\/.*unsplash\.com\/.+/i.test(
          v
        );
      },
      message: "Image must be a valid URL",
    },
  },
  title: {
    type: String,
    required: [true, "Burger title is required"],
    trim: true,
    maxlength: [100, "Title cannot exceed 100 characters"],
  },
  text: {
    type: String,
    required: [true, "Burger description is required"],
    trim: true,
    maxlength: [500, "Description cannot exceed 500 characters"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [0, "Price cannot be negative"],
  },
  gramms: {
    type: Number,
    required: [true, "Weight is required"],
    min: [1, "Weight must be at least 1 gram"],
  },
  basePrice: {
    type: Number,
    required: [true, "Base price is required"],
    min: [0, "Base price cannot be negative"],
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  category: {
    type: String,
    enum: ["beef", "chicken", "veggie", "special"],
    default: "beef",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field before saving
burgerSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Create indexes for better performance
burgerSchema.index({ title: 1 });
burgerSchema.index({ category: 1 });
burgerSchema.index({ isAvailable: 1 });

module.exports = mongoose.model("Burger", burgerSchema);
