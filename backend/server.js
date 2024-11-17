import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // Import CORS middleware
import { connectDB } from "./config/db.js"; // Database connection
import photographerRoutes from "./routes/photographer.Routes.js"; // Photographer routes
import projectRoutes from "./routes/projectRoutes.js"; // Project routes
import contactRoutes from "./routes/contactRoutes.js"; // Import contact routes
import bcrypt from "bcryptjs"; // For hashing passwords
import jwt from "jsonwebtoken"; // For generating JSON Web Tokens

dotenv.config();

const app = express();

// Enable CORS for all requests
app.use(cors());

// Middleware for parsing JSON requests
app.use(express.json());

// Utility function to send error responses
const sendErrorResponse = (res, status, message) => {
  return res.status(status).json({ message });
};

// Sample user data (replace with database model later)
let users = [
  {
    id: 1,
    username: "admin",
    password: process.env.HASHED_PASSWORD || "$2a$10$abcd1234efg5678hij1234", // Hashed password for 'password123'
  },
];

// Hash the password for the new user (username: dksh, password: dksh123)
const hashedPassword = bcrypt.hashSync("dksh123", 10); // 10 is the salt rounds
users.push({
  id: 2, // Make sure to give a unique ID
  username: "dksh",
  password: hashedPassword,
});

// Login endpoint
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);

  if (!user) return sendErrorResponse(res, 401, "User not found");

  // Compare password
  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) return sendErrorResponse(res, 401, "Invalid credentials");

  // Create a token
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "1111", {
    expiresIn: "1h",
  });
  res.json({ token });
});

// Middleware to authenticate the token
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return sendErrorResponse(res, 401, "No token, unauthorized");

  jwt.verify(token, process.env.JWT_SECRET || "1111", (err, user) => {
    if (err) return sendErrorResponse(res, 403, "Invalid token");
    req.user = user;
    next();
  });
};

// Protected route example
app.get("/api/protected", authenticateToken, (req, res) => {
  res.send("Protected content accessible only with a valid token");
});

// Connect to MongoDB and start the server
const startServer = async () => {
  try {
    await connectDB(); // Attempt to connect to the database
    console.log("Connected to MongoDB successfully.");

    // Use photographer routes
    app.use("/api/photographers", photographerRoutes);

    // Use project routes
    app.use("/api/projects", projectRoutes); // Ensure to include project routes

    // Use contact routes
    app.use("/api/contact", contactRoutes); // New contact routes added

    // Define a basic route for testing the server
    app.get("/", (req, res) => {
      res.send("API is running...");
    });

    // Catch 404 errors
    app.use((req, res, next) => {
      sendErrorResponse(res, 404, "Resource not found");
    });

    // Error handling middleware
    app.use((err, req, res, next) => {
      console.error(err.stack);
      sendErrorResponse(res, 500, "Server Error");
    });

    // Starting the server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server started at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    process.exit(1); // Exit the process if the connection fails
  }
};

startServer();
