import React, { useState } from "react";
import {
  Text,
  Box,
  Image,
  Button,
  Flex,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Divider,
  Heading,
} from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react"; // Importing Swiper and SwiperSlide
import { keyframes } from "@emotion/react";
import { Autoplay } from "swiper/modules";
import { Pagination } from "swiper/modules"; // Importing Autoplay and Pagination modules
import "swiper/swiper-bundle.css"; // Importing Swiper styles
import "swiper/css/pagination"; // Importing Pagination styles
import { useNavigate } from "react-router-dom"; // Import useNavigate

// Importing your images
import DikeshImage from "../components/Dikesh.jpg"; //
import Dikesh1Image from "../components/Dikesh1.jpg"; //
import KidImage from "../components/kid.jpg"; //
import BikeImage from "../components/Bike.jpg";
import manishImage from "../components/manish.jpg";
import collectionImage from "../components/collection.jpg";
import cmImage from "../components/cm.jpg";
import m1Image from "../components/m1.jpg";

// Navigation to Photographers page

const HomePage = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleClick = () => {
    navigate("/photographers");
  };

  const handleClick1 = () => {
    navigate("/Projects");
  };
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message); // Notify success
        // Clear form
        setFormData({
          name: "",
          location: "",
          email: "",
          phone: "",
        });
      } else {
        alert(data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Server error, please try again later.");
    }
  };

  return (
    <Box textAlign="center" py={8} backgroundColor="#0D1B2E" minH="100vh">
      {/* Main Title and Subtitle */}
      <Text
        fontSize={{ base: "30px", md: "45px" }}
        color="white"
        fontWeight="bold"
        fontFamily="Poppins" // Use a rounded font family
        textShadow="2px 2px 4px rgba(0, 0, 0, 0.5)"
        letterSpacing="wider"
        lineHeight="shorter"
        transform="translateY(-3px)" // Slight bounce effect
        transition="transform 0.3s ease-in-out"
        _hover={{
          transform: "translateY(-6px)", // More bounce on hover
          color: "silver", // Change color on hover
        }}
      >
        Timeless Memories
      </Text>
      <Text fontSize={{ base: "16px", md: "20px" }} color="gray.300" mt={2}>
        Capturing your best moments.
      </Text>
      {/* Image Slider */}
      <Box mt={8} backgroundColor="#0C1D33" py={6}>
        <Swiper
          modules={[Autoplay, Pagination]} // Includes Autoplay and Pagination modules
          spaceBetween={30} // Space between slides
          pagination={{ clickable: true }} // Enable pagination bullets
          autoplay={{
            delay: 4000, // Changes slide every 3 seconds
            disableOnInteraction: false, // Continues autoplay after interactions
          }}
          loop // Enable looping of slides
          style={{ width: "100%", height: "500px" }} // Set a specific height for the slider
        >
          {/* Add SwiperSlide for each image */}
          <SwiperSlide>
            <Image
              src={Dikesh1Image} // Use the imported image
              alt="Dikesh"
              width="100%"
              height="100%"
              objectFit="cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={cmImage} // Use the imported image
              alt="Dikesh"
              width="100%"
              height="100%"
              objectFit="cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Box
              boxShadow="0 4px 20px rgba(0, 0, 0, 0.3)" // Subtle shadow for depth
              borderRadius="lg" // Rounded corners
              display="flex" // Flexbox to center the image
              alignItems="center" // Center vertically
              justifyContent="center" // Center horizontally
              height="100%" // Ensure the Box takes full height of the SwiperSlide
              backgroundColor="0D1B2E" // Transparent background for minimal look
              overflow="hidden" // Hide any overflow from the image
            >
              <Image
                src={KidImage} // Use the imported image
                alt="Kid"
                maxWidth="100%" // Limit width to prevent overflow
                maxHeight="100%" // Limit height to prevent overflow
                objectFit="contain" // Ensure the entire image is visible without stretching
                borderRadius="lg" // Match the border radius for a smooth look
              />
            </Box>
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={m1Image} // Use the imported image
              alt="Dikesh"
              width="100%"
              height="100%"
              objectFit="contain"
            />
          </SwiperSlide>
        </Swiper>
      </Box>
      <Button
        colorScheme="teal"
        variant="outline"
        size="sm"
        mt="12"
        borderRadius="20"
        onClick={handleClick1}
      >
        View More
      </Button>
      <Box mt={20} display={{ base: "block", md: "flex" }} alignItems="stretch">
        {/* First Box for Image */}
        <Box flex={{ base: "0 0 100%", md: "0 0 30%" }} mb={{ base: 8, md: 0 }}>
          <Image
            src={BikeImage}
            alt="Dikesh"
            width="100%"
            height="auto"
            objectFit="cover"
            borderRadius="lg"
          />
        </Box>

        {/* Second Box for Photographers Section */}
        <Box
          flex="1"
          backgroundColor="#FFF8EC"
          borderRadius="lg"
          p={{ base: 5, md: 10 }}
          paddingLeft={{ base: 4, md: 200 }}
        >
          <Text
            fontSize={{ base: "xl", md: "2xl" }}
            fontWeight="extrabold"
            color="black"
            marginLeft={{ base: "0", md: "-150" }}
          >
            Our Team:
          </Text>
          <Box display={{ base: "block", md: "flex" }}>
            {/* First Photographer Card */}
            <Box
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              boxShadow="lg"
              bg="white"
              width={{ base: "100%", md: "300px" }}
              height="auto"
              mb={{ base: 6, md: 0 }}
              margin={{ base: "10px auto", md: "10px" }}
            >
              <Image
                src={DikeshImage}
                alt="Photographer"
                width="100%"
                height="200px"
                objectFit="cover"
              />
              <Stack padding="4">
                <Text fontWeight="bold" fontSize="xl" color="black">
                  Dikesh
                </Text>
                <Text color="gray.600">
                  "Dikesh founded Timeless Memories, a photography organization
                  dedicated to capturing life's most precious moments. With a
                  passion for storytelling, we create stunning visual
                  experiences that preserve memories in every frame."
                </Text>
              </Stack>
            </Box>

            {/* Second Photographer Card */}
            <Box
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              boxShadow="lg"
              bg="white"
              width={{ base: "100%", md: "300px" }}
              height="auto"
              margin={{ base: "10px auto", md: "10px 20px" }}
            >
              <Image
                src={manishImage} // Replace with actual image
                alt="Photographer"
                width="100%"
                height="200px"
                objectFit="cover"
              />
              <Stack padding="4">
                <Text fontWeight="bold" fontSize="xl" color="black">
                  Manish
                </Text>
                <Text color="gray.600">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis
                  dignissimos dolorem nisi illo exercitationem hic tempora
                  nesciunt, perspiciatis ducimus eius blanditiis molestiae atque
                  et aperiam earum assumenda iure minima nulla!
                </Text>
              </Stack>
            </Box>
          </Box>
          <Button
            colorScheme="blue"
            variant="outline"
            size="md"
            onClick={handleClick}
            marginLeft="-180px"
            marginTop="20px"
          >
            View Photographers
          </Button>
        </Box>
      </Box>

      {/* Yellow Container Box */}
      <Box
        display="flex"
        flexDirection="column" // Change to column to stack elements vertically
        alignItems="center" // Center align items
        backgroundColor="#FFF8EC"
        borderRadius="lg"
        p={10}
        marginTop="40px" // Add 'px' to ensure it's recognized as pixels
        width={{ base: "90%", md: "60%" }} // Responsive width
      >
        <Text
          fontSize={{ base: "xl", md: "2xl" }}
          fontWeight="bold"
          mb={4}
          color="black"
        >
          Our Projects:
        </Text>

        <Box
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          boxShadow="lg"
          bg="white"
          width={{ base: "100%", md: "900px" }} // Responsive width for the project card
          height="500px" // Set height for consistency
          margin="10px" // Margin between cards
        >
          <Image
            src={collectionImage} // Replace with your image path
            alt="Photographer"
            width="100%"
            height="200px" // Set height for consistency
            objectFit="cover" // Maintain aspect ratio
          />
          <Stack padding="4">
            <Text fontWeight="bold" fontSize="xl"></Text>
            <Text color="gray.600">
              "At Timeless Memories, we have embarked on an incredible journey
              of capturing life’s most cherished moments. From stunning weddings
              to captivating landscapes, professional portraits, and heartfelt
              events, our diverse projects highlight our dedication to artistry
              and passion for photography. Over the years, we’ve embraced growth
              and innovation, perfecting our craft while staying true to our
              mission of storytelling. Each experience reflects our commitment
              to creating timeless visuals and unforgettable memories for every
              client."
            </Text>
            <Button
              colorScheme="teal"
              variant="outline"
              size="md"
              marginTop="10"
              onClick={handleClick1}
            >
              View Projects
            </Button>
          </Stack>
        </Box>
      </Box>
      {/*  */}

      <Box w="100%" pt={12}>
        <Box w="full" textAlign="center" mb={10}>
          <Heading fontSize={{ base: "2xl", md: "3xl" }} mb={6} color="white">
            Our Portfolio
          </Heading>
          <Text fontSize="lg" color="gray.600">
            A timeline of our recent works and client feedback
          </Text>
        </Box>

        <Box
          w="full"
          maxW="3xl"
          mx="auto"
          spacing={12}
          divider={<Divider borderColor="gray.200" />}
        >
          {/* Timeline Item 1 */}
          <Box p={6} bg="#FFF8EC" borderRadius="lg" boxShadow="md" mb={8}>
            <Heading fontSize="xl" color="gray.800" mb={3}>
              Wedding Shoot - Timeless Love
            </Heading>
            <Text fontSize="sm" color="gray.500" mb={2}>
              March 2023
            </Text>
            <Text mt={2} fontSize="md" color="gray.700" mb={3}>
              Captured the beautiful moments of a destination wedding. The
              couple praised our attention to detail and creativity.
            </Text>
            <Text mt={1} fontSize="sm" color="teal.500">
              "Exceptional photography, made our day memorable!"
            </Text>
          </Box>

          {/* Timeline Item 2 */}
          <Box p={6} bg="#FFF8EC" borderRadius="lg" boxShadow="md" mb={8}>
            <Heading fontSize="xl" color="gray.800" mb={3}>
              Corporate Event - Annual Summit
            </Heading>
            <Text fontSize="sm" color="gray.500" mb={2}>
              July 2023
            </Text>
            <Text mt={2} fontSize="md" color="gray.700" mb={3}>
              Covered a high-profile corporate event with over 500 attendees.
              The client appreciated our ability to capture both highlights and
              candid moments.
            </Text>
            <Text mt={1} fontSize="sm" color="teal.500">
              "Professional and impressive results!"
            </Text>
          </Box>

          {/* Timeline Item 3 */}
          <Box p={6} bg="#FFF8EC" borderRadius="lg" boxShadow="md">
            <Heading fontSize="xl" color="gray.800" mb={3}>
              Fashion Photoshoot - Spring Collection
            </Heading>
            <Text fontSize="sm" color="gray.500" mb={2}>
              September 2023
            </Text>
            <Text mt={2} fontSize="md" color="gray.700" mb={3}>
              Collaborated with a local fashion brand for their spring
              collection launch. The feedback highlighted our vibrant and
              creative approach.
            </Text>
            <Text mt={1} fontSize="sm" color="teal.500">
              "Captured our vision perfectly!"
            </Text>
          </Box>
        </Box>
      </Box>

      <Box padding="50px" backgroundColor="#0D1B2E" marginTop="40px">
        <Text
          fontSize={{ base: "xl", md: "2xl" }}
          color="white"
          textAlign="center"
          marginBottom="20px"
          fontWeight="bold"
        >
          Contact Us
        </Text>
        <Box
          backgroundColor="#0C1D33"
          padding="30px"
          borderRadius="md"
          width={{ base: "90%", md: "60%" }}
          margin="0 auto"
          boxShadow="lg"
        >
          <form onSubmit={handleSubmit}>
            <FormControl isRequired marginBottom="15px">
              <FormLabel color="white" fontSize="sm" fontWeight="semibold">
                Name
              </FormLabel>
              <Input
                name="name"
                type="text"
                placeholder="Enter your name"
                size="md"
                borderColor="white"
                focusBorderColor="white"
                borderRadius="md"
                backgroundColor="#2A2D3E"
                color="white"
                value={formData.name}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl isRequired marginBottom="15px">
              <FormLabel color="white" fontSize="sm" fontWeight="semibold">
                Location
              </FormLabel>
              <Input
                name="location"
                type="text"
                placeholder="Enter your location"
                size="md"
                borderColor="white"
                focusBorderColor="white"
                borderRadius="md"
                backgroundColor="#2A2D3E"
                color="white"
                value={formData.location}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl isRequired marginBottom="15px">
              <FormLabel color="white" fontSize="sm" fontWeight="semibold">
                Email Address
              </FormLabel>
              <Input
                name="email"
                type="email"
                placeholder="Enter your email address"
                size="md"
                borderColor="white"
                focusBorderColor="white"
                borderRadius="md"
                backgroundColor="#2A2D3E"
                color="white"
                value={formData.email}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl isRequired marginBottom="20px">
              <FormLabel color="white" fontSize="sm" fontWeight="semibold">
                Phone Number
              </FormLabel>
              <Input
                name="phone"
                type="tel"
                placeholder="Enter your phone number"
                size="md"
                borderColor="white"
                focusBorderColor="white"
                borderRadius="md"
                backgroundColor="#2A2D3E"
                color="white"
                value={formData.phone}
                onChange={handleChange}
              />
            </FormControl>

            <Button
              type="submit"
              variant="outline"
              colorScheme="blue"
              color="white"
              borderColor="white"
              _hover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              width="100%"
              size="md"
              borderRadius="md"
            >
              Submit
            </Button>
          </form>
        </Box>
      </Box>

      <Box padding="50px" backgroundColor="#0C1D33" marginTop="40px">
        {/* Dark background for contrast */}
        <Text
          fontSize={{ base: "xl", md: "2xl" }}
          color="white"
          textAlign="center"
        >
          Our Conacts
        </Text>
        <Text
          fontSize={{ base: "sm", md: "lg" }}
          color="gray.300"
          textAlign="center"
          mt={2}
        >
          For any inquiries, reach out to us at info@timelessmemories.com
        </Text>
      </Box>
    </Box>
  );
};

export default HomePage;
