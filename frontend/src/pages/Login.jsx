import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Text,
  VStack,
  Stack,
  useToast,
  Image,
  Divider,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const toast = useToast();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token); // Store the token
        setIsAuthenticated(true); // Update authentication state
        toast({
          title: "Login successful!",
          description: "You are being redirected to the admin panel.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        navigate("/admin"); // Use navigate to redirect to the admin panel
      } else {
        const errorText = await response.text();
        setMessage(errorText); // Set the error message
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <Container maxW="lg" centerContent py={8}>
      <VStack spacing={6} w="full">
        <Box w="full" p={8} shadow="lg" borderRadius="lg" bg="white">
          <Heading as="h2" size="lg" mb={6} textAlign="center" color="blue.600">
            Welcome!
          </Heading>
          <Divider mb={6} />
          <Stack spacing={4}>
            <FormControl id="username">
              <FormLabel color="gray.700">Username</FormLabel>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                size="lg"
                borderColor="gray.300"
                _hover={{ borderColor: "blue.400" }}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel color="gray.700">Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                size="lg"
                borderColor="gray.300"
                _hover={{ borderColor: "blue.400" }}
              />
            </FormControl>
            {message && (
              <Text color="red.500" fontSize="sm" textAlign="center">
                {message}
              </Text>
            )}
            <Button
              colorScheme="blue"
              size="lg"
              onClick={handleLogin}
              w="full"
              _hover={{ bg: "blue.500" }}
            >
              Login
            </Button>
          </Stack>
        </Box>
        <Text color="gray.600" fontSize="sm" textAlign="center">
          Don't have an account?{" "}
          <Button variant="link" colorScheme="blue">
            Sign Up
          </Button>
        </Text>
      </VStack>
    </Container>
  );
};

export default Login;
