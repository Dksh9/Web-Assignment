import { Box } from "@chakra-ui/react";
import { Routes, Route, Navigate } from "react-router-dom"; // Import Navigate for redirection
import HomePage from "./pages/HomePage";
import Photographers from "./pages/Photographers";
import Projects from "./pages/Projects";
import Navbar from "./components/Navbar";
import Admin from "./pages/Admin";
import Login from "./pages/Login"; // Import Login component
import { useState, useEffect } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication state

  // Check for token in localStorage to set initial authentication state
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Box minH={"100vh"}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/photographers" element={<Photographers />} />
        <Route
          path="/admin"
          element={
            isAuthenticated ? (
              <Admin />
            ) : (
              <Navigate to="/login" replace /> // Redirect to /login if not authenticated
            )
          }
        />
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />} // Direct access to the login page
        />
      </Routes>
    </Box>
  );
}

export default App;
