import Photographer from "../models/photographers.model.js";

// Get all photographers
export const getPhotographers = async (req, res) => {
  try {
    const photographers = await Photographer.find();
    res.status(200).json(photographers);
  } catch (error) {
    console.error("Error fetching photographers:", error);
    res.status(500).json({
      message: "Failed to retrieve photographers",
    });
  }
};

// Create a new photographer
export const createPhotographer = async (req, res) => {
  const { name, bio, description, imageUrl } = req.body; // Add description here

  // Basic validation
  if (!name || !bio || !description || !imageUrl) {
    // Validate description
    return res.status(400).json({ message: "All fields are required." });
  }

  const newPhotographer = new Photographer({
    name,
    bio,
    description, // Include description in the new photographer object
    imageUrl,
  });

  try {
    const savedPhotographer = await newPhotographer.save();
    res.status(201).json(savedPhotographer);
  } catch (error) {
    console.error("Error creating photographer:", error);
    res.status(400).json({
      message: "Failed to create photographer",
    });
  }
};

// Update a photographer by ID
export const updatePhotographer = async (req, res) => {
  const { id } = req.params;
  const { name, bio, description, imageUrl } = req.body; // Add description here

  try {
    const updatedPhotographer = await Photographer.findByIdAndUpdate(
      id,
      { name, bio, description, imageUrl }, // Include description in update
      { new: true, runValidators: true }
    );

    if (!updatedPhotographer) {
      return res.status(404).json({ message: "Photographer not found" });
    }
    res.status(200).json(updatedPhotographer);
  } catch (error) {
    console.error("Error updating photographer:", error);
    res.status(400).json({
      message: "Failed to update photographer",
    });
  }
};

// Delete a photographer by ID
export const deletePhotographer = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPhotographer = await Photographer.findByIdAndDelete(id);
    if (!deletedPhotographer) {
      return res.status(404).json({ message: "Photographer not found" });
    }
    res.status(200).json({ message: "Photographer deleted successfully" });
  } catch (error) {
    console.error("Error deleting photographer:", error);
    res.status(400).json({
      message: "Failed to delete photographer",
    });
  }
};
