import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Stack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

const AdminPanel = () => {
  const [photographer, setPhotographer] = useState({
    name: "",
    description: "",
    bio: "",
    imageUrl: "",
  });

  const [project, setProject] = useState({
    title: "",
    description: "",
    images: ["", "", ""], // Array to hold multiple image URLs
    category: "",
  });

  const [photographers, setPhotographers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [contactMessages, setContactMessages] = useState([]); // New state for contact messages
  const toast = useToast();

  // Fetch photographers, projects, and contact messages from the backend when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [photographersResponse, projectsResponse, contactResponse] =
          await Promise.all([
            axios.get("http://localhost:5000/api/photographers"),
            axios.get("http://localhost:5000/api/projects"),
            axios.get("http://localhost:5000/api/contact"), // Fetching contact messages
          ]);

        setPhotographers(photographersResponse.data);
        setProjects(projectsResponse.data);
        setContactMessages(contactResponse.data); // Setting contact messages
      } catch (error) {
        console.error("Error fetching data:", error);
        showToast(
          "Error fetching data.",
          "Could not fetch photographers, projects, or contact messages.",
          "error"
        );
      }
    };

    fetchData();
  }, []);

  const showToast = (title, description, status) => {
    toast({
      title,
      description,
      status,
      duration: 3000,
      isClosable: true,
    });
  };

  const handlePhotographerChange = (e) => {
    const { name, value } = e.target;
    setPhotographer((prevPhotographer) => ({
      ...prevPhotographer,
      [name]: value,
    }));
  };

  const handleProjectChange = (e, index) => {
    const { name, value } = e.target;
    if (name === "images") {
      const newImages = [...project.images];
      newImages[index] = value; // Update specific index for images
      setProject((prevProject) => ({ ...prevProject, images: newImages }));
    } else {
      setProject((prevProject) => ({ ...prevProject, [name]: value }));
    }
  };

  const handlePhotographerSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/photographers",
        photographer
      );
      setPhotographers((prevPhotographers) => [
        ...prevPhotographers,
        response.data,
      ]);
      setPhotographer({ name: "", description: "", bio: "", imageUrl: "" });
      showToast(
        "Photographer Added",
        `${photographer.name} has been added to the list.`,
        "success"
      );
    } catch (error) {
      console.error("Error adding photographer:", error);
      showToast(
        "Error adding photographer",
        "Could not add the photographer.",
        "error"
      );
    }
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/projects",
        project
      );
      setProjects((prevProjects) => [...prevProjects, response.data]);
      setProject({
        title: "",
        description: "",
        images: ["", "", ""],
        category: "",
      });
      showToast(
        "Project Added",
        `${project.title} has been added to the list.`,
        "success"
      );
    } catch (error) {
      console.error("Error adding project:", error);
      showToast("Error adding project", "Could not add the project.", "error");
    }
  };

  const handleDelete = async (id, type) => {
    const url =
      type === "photographer"
        ? `http://localhost:5000/api/photographers/${id}`
        : type === "project"
        ? `http://localhost:5000/api/projects/${id}`
        : `http://localhost:5000/api/contact/${id}`; // Delete contact messages

    try {
      await axios.delete(url);
      if (type === "photographer") {
        setPhotographers((prevPhotographers) =>
          prevPhotographers.filter((ph) => ph._id !== id)
        );
        showToast(
          "Photographer Deleted",
          "Photographer successfully deleted.",
          "success"
        );
      } else if (type === "project") {
        setProjects((prevProjects) =>
          prevProjects.filter((proj) => proj._id !== id)
        );
        showToast(
          "Project Deleted",
          "Project successfully deleted.",
          "success"
        );
      } else {
        setContactMessages((prevMessages) =>
          prevMessages.filter((msg) => msg._id !== id)
        );
        showToast(
          "Message Deleted",
          "Contact message successfully deleted.",
          "success"
        );
      }
    } catch (error) {
      console.error(`Error deleting ${type}:`, error);
      showToast(
        `Error deleting ${type}`,
        `Could not delete the ${type}.`,
        "error"
      );
    }
  };

  return (
    <Box p={6} bg="#FFF8EC" minH="100vh">
      <Text fontSize="2xl" mb={4} color="#0D1B2E">
        Admin Panel
      </Text>

      {/* Add Photographer Section */}
      <Box mb={6} p={4} borderRadius="md" boxShadow="lg" bg="#0D1B2E">
        <Text fontSize="xl" mb={2} color="#FFF8EC">
          Add Photographer
        </Text>
        <form onSubmit={handlePhotographerSubmit}>
          <Stack spacing={3}>
            {["name", "description", "bio", "imageUrl"].map((field) => (
              <FormControl key={field}>
                <FormLabel color="#FFF8EC">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </FormLabel>
                <Input
                  type="text"
                  name={field}
                  value={photographer[field]}
                  onChange={handlePhotographerChange}
                  required
                  bg="#FFF8EC"
                  borderColor="#0D1B2E"
                />
              </FormControl>
            ))}
            <Button type="submit" colorScheme="teal" variant="solid">
              Add Photographer
            </Button>
          </Stack>
        </form>
      </Box>

      {/* Photographers List */}
      <Box mb={6}>
        <Text fontSize="xl" mb={2} color="#0D1B2E">
          Photographers List
        </Text>
        <Table variant="simple" bg="#FFF8EC" borderColor="#0D1B2E">
          <Thead>
            <Tr>
              <Th color="#0D1B2E">Name</Th>
              <Th color="#0D1B2E">Description</Th>
              <Th color="#0D1B2E">Image</Th>
              <Th color="#0D1B2E">Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {photographers.map((photographer) => (
              <Tr key={photographer._id}>
                <Td>{photographer.name}</Td>
                <Td>{photographer.description}</Td>
                <Td>
                  <img
                    src={photographer.imageUrl}
                    alt={photographer.name}
                    style={{ width: "100px", height: "auto" }}
                  />
                </Td>
                <Td>
                  <Button
                    colorScheme="red"
                    onClick={() =>
                      handleDelete(photographer._id, "photographer")
                    }
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* Add Project Section */}
      <Box mb={6} p={4} borderRadius="md" boxShadow="lg" bg="#0D1B2E">
        <Text fontSize="xl" mb={2} color="#FFF8EC">
          Add Project
        </Text>
        <form onSubmit={handleProjectSubmit}>
          <Stack spacing={3}>
            {["title", "description", "category"].map((field) => (
              <FormControl key={field}>
                <FormLabel color="#FFF8EC">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </FormLabel>
                <Input
                  type="text"
                  name={field}
                  value={project[field]}
                  onChange={handleProjectChange}
                  required
                  bg="#FFF8EC"
                  borderColor="#0D1B2E"
                />
              </FormControl>
            ))}
            {project.images.map((image, index) => (
              <FormControl key={index}>
                <FormLabel color="#FFF8EC">Image URL {index + 1}</FormLabel>
                <Input
                  type="text"
                  name="images"
                  value={image}
                  onChange={(e) => handleProjectChange(e, index)}
                  required
                  bg="#FFF8EC"
                  borderColor="#0D1B2E"
                />
              </FormControl>
            ))}
            <Button type="submit" colorScheme="teal" variant="solid">
              Add Project
            </Button>
          </Stack>
        </form>
      </Box>

      {/* Projects List */}
      <Box mb={6}>
        <Text fontSize="xl" mb={2} color="#0D1B2E">
          Projects List
        </Text>
        <Table variant="simple" bg="#FFF8EC" borderColor="#0D1B2E">
          <Thead>
            <Tr>
              <Th color="#0D1B2E">Title</Th>
              <Th color="#0D1B2E">Description</Th>
              <Th color="#0D1B2E">Images</Th>
              <Th color="#0D1B2E">Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {projects.map((project) => (
              <Tr key={project._id}>
                <Td>{project.title}</Td>
                <Td>{project.description}</Td>
                <Td>
                  {project.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Project ${project.title} - ${index + 1}`}
                      style={{
                        width: "100px",
                        height: "auto",
                        marginRight: "5px",
                      }}
                    />
                  ))}
                </Td>
                <Td>
                  <Button
                    colorScheme="red"
                    onClick={() => handleDelete(project._id, "project")}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* Contact Messages Section */}
      <Box mb={6}>
        <Text fontSize="xl" mb={2} color="#0D1B2E">
          Contact Messages
        </Text>
        <Table variant="simple" bg="#FFF8EC" borderColor="#0D1B2E">
          <Thead>
            <Tr>
              <Th color="#0D1B2E">Name</Th>
              <Th color="#0D1B2E">Email</Th>
              <Th color="#0D1B2E">Message</Th>
              <Th color="#0D1B2E">Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {contactMessages.map((message) => (
              <Tr key={message._id}>
                <Td>{message.name}</Td>
                <Td>{message.email}</Td>
                <Td>{message.message}</Td>
                <Td>
                  <Button
                    colorScheme="red"
                    onClick={() => handleDelete(message._id, "contact")}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default AdminPanel;
