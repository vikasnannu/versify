import {
	Box,
	Text,
	Button,
	VStack,
	Heading,
	Flex,
	Spacer,
	Container,
	Stack,
  } from "@chakra-ui/react";
  import { Link as RouterLink } from "react-router-dom";
  
  const LandingPage = () => {
	return (
	  <>
		<Flex direction="column" minHeight="100vh">
		  <Box
			textAlign={{ base: "left", md: "center" }}
			fontSize={{ base: "md", md: "xl" }}
			p={{ base: 2, md: 5 }}
			flex="1"
		  >
			<Flex
			  direction={{ base: "row", md: "row" }}
			  alignItems="center"
			  p={5}
			>
			  <Box p="2">
				<Stack direction={"row"} align="center" spacing={4}>
				  <Heading size={{ base: "lg", md: "xl" }}>Versify</Heading>
				</Stack>
			  </Box>
			  <Spacer />
			  <Button
				as={RouterLink}
				to="/about"
				colorScheme="teal"
				variant="outline"
			  >
				About Us
			  </Button>
			</Flex>
  
			<Container maxW="container.md">
			  <VStack spacing={6} py={{ base: 10, md: 20 }}>
				<Heading size={{ base: "md", md: "xl" }}>
				  Welcome to Versify
				</Heading>
				<Text
				  fontSize={{ base: "xl", md: "2xl" }}
				  fontWeight="bold"
				  fontStyle="italic"
				  color="teal.800"
				  textAlign="center"
				>
				  Compose, share, and explore unique verses in a community that
				  celebrates diverse voices.
				</Text>
  
				<Stack direction={{ base: "row", sm: "row" }} spacing={4}>
				  <Button
					as={RouterLink}
					to="/login"
					colorScheme="teal"
					variant="outline"
				  >
					Log In
				  </Button>
				  <Button as={RouterLink} to="/signup" colorScheme="teal">
					Sign Up
				  </Button>
				</Stack>
			  </VStack>
			</Container>
  
			<Box
			  p={5}
			  shadow="md"
			  borderWidth="1px"
			  border="2px solid"
			  borderColor="teal.500"
			  borderRadius="md"
			  bg={"teal.50"}
			  mt={{ base: 4, md: 8 }}
			>
			  <Heading fontSize={{ base: "xl", md: "2xl" }} color={"yellow.800"}>
				Why Versify?
			  </Heading>
			  <VStack spacing={4} mt={4}>
				<Text fontSize={{ base: "md", md: "lg" }} fontWeight="bold">
				  ✍️ Craft Your Verses: Express your thoughts and stories through
				  unique verses.
				</Text>
				<Text fontSize={{ base: "md", md: "lg" }} fontWeight="bold">
				  🌐 Connect with Creatives: Engage with a community of artists,
				  writers, and thinkers.
				</Text>
				<Text fontSize={{ base: "md", md: "lg" }} fontWeight="bold">
				  🔐 Safe Space: Share and discuss in an environment that respects
				  and protects your voice.
				</Text>
			  </VStack>
			</Box>
		  </Box>
  
		  <Box
			p={3}
			fontSize={{ base: "sm", md: "md" }}
			fontStyle="italic"
			fontWeight="bold"
			color="gray.600"
			textAlign="center"
		  >
			© 2024 Versify. All rights reserved.
		  </Box>
		</Flex>
	  </>
	);
  };
  
  export default LandingPage;  