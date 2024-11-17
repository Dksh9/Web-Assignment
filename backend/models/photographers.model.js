// models/photographerModel.js
import mongoose from "mongoose";

// Define photographer schema
const photographerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Photographer name is required"], // Custom error message
    },
    description: {
      // Add the description field
      type: String,
      required: [true, "Photographer description is required"], // Custom error message
    },
    bio: {
      type: String,
      required: [true, "Photographer bio is required"], // Custom error message
    },
    imageUrl: {
      type: String,
      required: [true, "Image URL is required"], // Custom error message
      validate: {
        // Validate that the URL format is correct
        validator: function (v) {
          return /^https?:\/\/.+\..+/.test(v); // Simple regex for URL validation
        },
        message: (props) => `${props.value} is not a valid URL!`, // Error message for invalid URL
      },
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Export the Photographer model
const Photographer = mongoose.model("Photographer", photographerSchema);
export default Photographer;
