import React from "react";
import { Container, Flex, Box, Link, Text, Button } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Container maxW="full" px={0}>
      <Flex
        h={16}
        alignItems="center"
        justifyContent="space-between"
        flexDir={{
          base: "column",
          sm: "row",
        }}
        px={8}
        backgroundColor="#0D1B2E"
        boxShadow="0 4px 12px rgba(0, 0, 0, 0.1)"
      >
        {/* Gradient Text Logo */}
        <Box>
          <Text
            as="span"
            fontSize={{ base: "24px", sm: "32px" }}
            fontWeight="bold"
            textTransform="uppercase"
            textAlign="center"
            letterSpacing="wider"
            display="inline-block"
            transition="transform 0.3s ease"
            textShadow="1px 1px 4px rgba(0, 0, 0, 0.4)" // Add text shadow for better visibility
            _hover={{
              transform: "scale(1.1)",
              transition: "transform 0.3s ease",
            }}
          >
            <Link href="/" style={{ textDecoration: "none" }}>
              <Text
                as="span"
                bgGradient="linear(to-r, #4169E1, #B76E79)" // Warm metallic gold for "T"
                bgClip="text"
                fontWeight="extrabold"
              >
                T
              </Text>
              <Text
                as="span"
                bgGradient="linear(to-r, #C0C0C0, #B0B0B0)" // Light subtle gray for "M"
                bgClip="text"
                fontWeight="medium"
                ml={1}
              >
                M
              </Text>
            </Link>
          </Text>
        </Box>

        {/* Navigation Links */}
        <Flex gap={6} alignItems="center" mt={{ base: 4, sm: 0 }}>
          <Link
            href="/"
            fontSize="lg"
            color="white"
            position="relative"
            _before={{
              content: '""',
              position: "absolute",
              width: "0%",
              height: "2px",
              bottom: "-4px",
              left: "0",
              backgroundColor: "#A9A9A9",
              visibility: "hidden",
              transition: "all 0.3s ease-in-out",
            }}
            _hover={{
              color: "#A9A9A9",
              _before: {
                visibility: "visible",
                width: "100%",
              },
            }}
          >
            Home
          </Link>

          <Link
            href="/photographers"
            fontSize="lg"
            color="white"
            position="relative"
            _before={{
              content: '""',
              position: "absolute",
              width: "0%",
              height: "2px",
              bottom: "-4px",
              left: "0",
              backgroundColor: "#A9A9A9",
              visibility: "hidden",
              transition: "all 0.3s ease-in-out",
            }}
            _hover={{
              color: "#A9A9A9",
              _before: {
                visibility: "visible",
                width: "100%",
              },
            }}
          >
            Photographers
          </Link>

          {/* Animated Button for Projects */}
          <Button
            as="a"
            href="/projects"
            variant="outline"
            borderColor="#A9A9A9"
            color="white"
            borderRadius="8px"
            px={6}
            py={2}
            _hover={{
              backgroundColor: "#A9A9A9",
              color: "#0C1D33",
              borderColor: "#A9A9A9",
              transform: "scale(1.1)",
              transition: "all 0.3s ease",
            }}
            transition="transform 0.3s ease"
          >
            Projects
          </Button>
        </Flex>
      </Flex>
    </Container>
  );
};

export default Navbar;
