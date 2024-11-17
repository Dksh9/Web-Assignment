import express from "express";
import Contact from "../models/contactModel.js";

const router = express.Router();

// @route  POST /api/contact
// @desc   Save contact form data
router.post("/", async (req, res) => {
  const { name, location, email, phone } = req.body;

  // Basic validation
  if (!name || !location || !email || !phone) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  try {
    // Create a new contact document
    const newContact = new Contact({
      name,
      location,
      email,
      phone,
    });

    // Save to the database
    await newContact.save();

    // Return success response
    res.status(201).json({ message: "Contact saved successfully!" });
  } catch (error) {
    console.error("Error saving contact:", error.message);
    res.status(500).json({ message: "Server error, please try again later." });
  }
});

// @route  GET /api/contact
// @desc   Get all contact form data
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    console.error("Error retrieving contacts:", error.message);
    res.status(500).json({ message: "Server error, please try again later." });
  }
});

// @route  DELETE /api/contact/:id
// @desc   Delete a contact by ID
// @route  DELETE /api/contact/:id
// @desc   Delete a contact by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  // Validate ID format (you can customize this regex as needed)
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ message: "Invalid contact ID format" });
  }

  try {
    const contact = await Contact.findByIdAndDelete(id);

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
});

export default router;
