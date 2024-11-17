import React, { useState, useEffect } from "react";
import {
  Text,
  Box,
  Image,
  Flex,
  Stack,
  Button,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  IconButton,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

const MotionBox = motion(Box);

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentProjectImages, setCurrentProjectImages] = useState([]);

  const fetchProjects = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/projects");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setError("Failed to load projects. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  useEffect(() => {
    fetchProjects();
  }, []);

  const openModal = (images, index) => {
    setCurrentProjectImages(images);
    setCurrentImageIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setCurrentImageIndex(0);
    setCurrentProjectImages([]);
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === currentProjectImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? currentProjectImages.length - 1 : prevIndex - 1
    );
  };

  return (
    <Box textAlign="center" py={8} backgroundColor="#0D1B2E" minH="100vh">
      <Text color="white" fontWeight="bold" fontSize="45px" mb={6}>
        Project Gallery
      </Text>

      <Stack direction="row" spacing={4} mb={6} justifyContent="center">
        {["All", "Wedding", "Event", "Portrait"].map((category) => (
          <Button
            key={category}
            onClick={() => setSelectedCategory(category)}
            colorScheme="teal"
            variant="solid"
            size="lg"
          >
            {category}
          </Button>
        ))}
      </Stack>

      {error && (
        <Text color="red.300" mb={4}>
          {error}
        </Text>
      )}

      {loading ? (
        <Spinner color="teal.500" size="xl" />
      ) : filteredProjects.length === 0 ? (
        <Text color="white">No projects available in this category.</Text>
      ) : (
        <Flex wrap="wrap" justify="center" mt={4}>
          {filteredProjects.map((project) => (
            <MotionBox
              key={project._id}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              boxShadow="lg"
              m={2}
              width={{ base: "250px", md: "350px" }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              {/* Show first image in each project folder */}
              <Image
                src={project.images[0]}
                alt={`Project ${project.title}`}
                width="100%"
                height="250px"
                objectFit="cover"
                onClick={() => openModal(project.images, 0)}
                cursor="pointer"
                _hover={{
                  transform: "scale(1.1)",
                  transition: "transform 0.3s ease",
                }}
              />
              <Text color="white" fontWeight="bold" mt={2} fontSize="lg">
                {project.title}
              </Text>
              <Text color="gray.300" fontSize="sm">
                {project.description}
              </Text>
            </MotionBox>
          ))}
        </Flex>
      )}

      <Modal isOpen={isOpen} onClose={closeModal} size="full">
        <ModalOverlay />
        <ModalContent backgroundColor="blackAlpha.900" boxShadow="none">
          <ModalHeader color="white">Image Preview</ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody display="flex" justifyContent="center" alignItems="center">
            {currentProjectImages.length > 0 && (
              <Flex align="center" justify="center" position="relative">
                <IconButton
                  icon={<ArrowBackIcon />}
                  onClick={goToPreviousImage}
                  colorScheme="teal"
                  aria-label="Previous Image"
                  position="absolute"
                  left="0"
                  transform="translateX(-50%)"
                />
                <Image
                  src={currentProjectImages[currentImageIndex]}
                  alt="Selected Project Image"
                  maxW="500px"
                  maxH="700px"
                  objectFit="contain"
                />
                <IconButton
                  icon={<ArrowForwardIcon />}
                  onClick={goToNextImage}
                  colorScheme="teal"
                  aria-label="Next Image"
                  position="absolute"
                  right="0"
                  transform="translateX(50%)"
                />
              </Flex>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Projects;
