import React, { useEffect, useState } from "react";
import {
  Box,
  Image,
  Text,
  Stack,
  Spinner,
  Alert,
  Button,
} from "@chakra-ui/react";
import usePhotographersStore from "../store/photographerStore";

const PhotographersPage = () => {
  const { photographers, fetchPhotographers } = usePhotographersStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const photographersPerPage = 4; // Number of photographers per page

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await fetchPhotographers();
      } catch (err) {
        setError("Failed to load photographers.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchPhotographers]);

  // Calculate pagination details
  const indexOfLastPhotographer = currentPage * photographersPerPage;
  const indexOfFirstPhotographer =
    indexOfLastPhotographer - photographersPerPage;
  const currentPhotographers = photographers.slice(
    indexOfFirstPhotographer,
    indexOfLastPhotographer
  );
  const totalPages = Math.ceil(photographers.length / photographersPerPage);

  const handleNextPage = () =>
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  const handlePreviousPage = () =>
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));

  if (loading) {
    return (
      <Box textAlign="center" py={8} backgroundColor="#0D1B2E" minH="100vh">
        <Spinner size="xl" color="white" />
        <Text color="white" mt={4}>
          Loading...
        </Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" py={8} backgroundColor="#0D1B2E" minH="100vh">
        <Alert status="error" mb={4}>
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box textAlign="center" py={8} backgroundColor="#0D1B2E" minH="100vh">
      <Text fontSize="4xl" color="white" mb={8}>
        Our Photographers
      </Text>
      <Box display="flex" justifyContent="center" flexWrap="wrap">
        {currentPhotographers.map((photographer) => (
          <Box
            key={photographer._id}
            width={{ base: "100%", md: "350px" }}
            height="500px"
            borderWidth="2px"
            borderRadius="lg"
            overflow="hidden"
            m={4}
            bg="white"
            boxShadow="md"
            transition="transform 0.3s, box-shadow 0.3s"
            _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
            position="relative"
            borderColor="gray.200"
          >
            <Image
              src={photographer.imageUrl}
              alt={photographer.name}
              height="300px"
              objectFit="cover"
              width="100%"
              borderBottomWidth="2px"
              borderBottomColor="gray.200"
            />
            <Stack p={4} spacing={3}>
              <Text fontWeight="bold" fontSize="xl" color="black">
                {photographer.name}
              </Text>
              <Text color="gray.600" fontSize="sm">
                {photographer.description}
              </Text>
            </Stack>
            <Box
              position="absolute"
              top="0"
              left="0"
              width="100%"
              height="100%"
              bg="rgba(0, 0, 0, 0.7)"
              color="white"
              display="flex"
              justifyContent="center"
              alignItems="center"
              opacity="0"
              transition="opacity 0.3s ease"
              _hover={{ opacity: "1" }}
              p={4}
              textAlign="center"
            >
              <Text fontSize="lg" fontWeight="medium">
                {photographer.bio}
              </Text>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Pagination Controls */}
      <Box mt={8} display="flex" justifyContent="center" gap={4}>
        <Button
          onClick={handlePreviousPage}
          isDisabled={currentPage === 1}
          colorScheme="teal"
          variant="outline"
        >
          Previous
        </Button>
        <Text color="white" fontSize="lg">
          Page {currentPage} of {totalPages}
        </Text>
        <Button
          onClick={handleNextPage}
          isDisabled={currentPage === totalPages}
          colorScheme="teal"
          variant="outline"
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default PhotographersPage;
