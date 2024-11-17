import express from "express";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";
import mongoose from "mongoose";

// Utility function to validate MongoDB ObjectID
const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

// Utility function to validate URL format
const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

// Middleware for validating project data
const validateProjectData = (req, res, next) => {
  const { title, description, images, category } = req.body;

  if (
    !title ||
    !description ||
    !Array.isArray(images) ||
    images.length === 0 ||
    !category
  ) {
    return res.status(400).json({ message: "All fields are required." });
  }

  if (
    typeof title !== "string" ||
    title.trim().length === 0 ||
    typeof description !== "string" ||
    description.trim().length === 0 ||
    typeof category !== "string" ||
    category.trim().length === 0
  ) {
    return res.status(400).json({
      message: "Title, description, and category must be non-empty strings.",
    });
  }

  for (const image of images) {
    if (typeof image !== "string" || !isValidUrl(image)) {
      return res.status(400).json({ message: "All image URLs must be valid." });
    }
  }

  next(); // Proceed to the next middleware or route handler
};

// Middleware for validating project ID
const validateProjectId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidId(id)) {
    return res.status(400).json({ message: "Invalid project ID." });
  }
  next();
};

const router = express.Router();

// Route to get all projects
router.get("/", getProjects);

// Route to create a new project
router.post("/", validateProjectData, createProject); // Add validation middleware here

// Route to update a project by ID
router.put("/:id", validateProjectId, validateProjectData, updateProject); // Add validation middleware here

// Route to delete a project by ID
router.delete("/:id", validateProjectId, deleteProject);

export default router;
