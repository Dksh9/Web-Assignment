// routes/photographerRoutes.js
import express from "express";
import {
  getPhotographers,
  createPhotographer,
  updatePhotographer,
  deletePhotographer,
} from "../controllers/photographer.controller.js";

const router = express.Router();

// GET: /api/photographers - Get all photographers
router.get("/", getPhotographers); // Directly use the controller

// POST: /api/photographers - Create a new photographer
router.post("/", createPhotographer); // Directly use the controller

// PUT: /api/photographers/:id - Update a photographer by ID
router.put("/:id", updatePhotographer); // Directly use the controller

// DELETE: /api/photographers/:id - Delete a photographer by ID
router.delete("/:id", deletePhotographer); // Directly use the controller

export default router;
