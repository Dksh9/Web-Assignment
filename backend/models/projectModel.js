import mongoose from "mongoose";

// Regular expression for validating URLs
const urlRegex = /^(ftp|http|https):\/\/[^\s/$.?#].[^\s]*$/i;

// Define the project schema
const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
      minlength: [1, "Title cannot be empty"],
      maxlength: [100, "Title cannot be more than 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Project description is required"],
      minlength: [1, "Description cannot be empty"],
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    images: {
      type: [String],
      required: [true, "At least one image is required"],
      validate: {
        validator: function (array) {
          return (
            array.length > 0 &&
            array.every((url) => typeof url === "string" && urlRegex.test(url))
          );
        },
        message: "There must be at least one valid image URL.",
      },
    },
    date: {
      type: Date,
      default: Date.now,
    },
    category: {
      type: String,
      enum: ["Wedding", "Event", "Portrait", "Other"],
      default: "Other",
    },
  },
  {
    timestamps: true,
  }
);

// Create the Project model from the schema
const Project = mongoose.model("Project", projectSchema);

export default Project;
