import Project from "../models/projectModel.js";
import mongoose from "mongoose";

// Utility function to validate MongoDB ObjectID
const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

// Validate URL format
const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

// Fetch all projects
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find(); // Fetch all projects from the database
    res.status(200).json(projects); // Respond with projects
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({
      message:
        error.message ||
        "An unexpected error occurred. Please try again later.",
    });
  }
};

// Create a new project
export const createProject = async (req, res) => {
  try {
    const { title, description, images, category } = req.body || {};

    // Validate the request body
    if (
      !title ||
      typeof title !== "string" ||
      title.trim().length === 0 ||
      !description ||
      typeof description !== "string" ||
      description.trim().length === 0 ||
      !Array.isArray(images) ||
      images.length === 0 ||
      !category ||
      typeof category !== "string" ||
      category.trim().length === 0
    ) {
      console.error("Error creating project, invalid input:", req.body);
      return res.status(400).json({ message: "All fields are required." });
    }

    // Validate image URLs
    images.forEach((image) => {
      if (typeof image !== "string" || !isValidUrl(image)) {
        return res
          .status(400)
          .json({ message: "All image URLs must be valid." });
      }
    });

    const project = new Project({ title, description, images, category });
    await project.save(); // Save the project to the database

    res.status(201).json(project); // Respond with the created project
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({
      message:
        error.message ||
        "An unexpected error occurred. Please try again later.",
    });
  }
};

// Update a project by ID
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params; // Get project ID from request parameters

    // Validate project ID
    if (!isValidId(id)) {
      return res.status(400).json({ message: "Invalid project ID." });
    }

    const { title, description, images, category } = req.body || {};

    // Validate request body for update
    if (
      !title ||
      typeof title !== "string" ||
      title.trim().length === 0 ||
      !description ||
      typeof description !== "string" ||
      description.trim().length === 0 ||
      !Array.isArray(images) ||
      images.length === 0 ||
      !category ||
      typeof category !== "string" ||
      category.trim().length === 0
    ) {
      console.error("Error updating project, invalid input:", req.body);
      return res.status(400).json({ message: "All fields are required." });
    }

    const updatedProject = await Project.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found." });
    }

    res.status(200).json(updatedProject); // Respond with the updated project
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({
      message:
        error.message ||
        "An unexpected error occurred. Please try again later.",
    });
  }
};

// Delete a project by ID
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params; // Get project ID from request parameters

    // Validate project ID
    if (!isValidId(id)) {
      return res.status(400).json({ message: "Invalid project ID." });
    }

    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found." });
    }

    res.status(200).json({ message: "Project deleted successfully." });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({
      message:
        error.message ||
        "An unexpected error occurred. Please try again later.",
    });
  }
};
