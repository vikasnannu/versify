import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Flex,
  Heading,
  Text,
  Box,
  List,
  ListItem,
  ListIcon,
  Button,
} from "@chakra-ui/react";
import { MdCheckCircle } from "react-icons/md";
import { FiBox } from "react-icons/fi";

const AboutUs = () => {
  const tealColor = "teal.500"

  return (
    <>
      <Flex direction="column" align="center" minHeight="100vh">
        <Box textAlign="center" mb={8} px={4}>
          <Heading
            as="h1"
            size="xl"
            fontSize={["3xl", "4xl", "5xl"]}
            color={tealColor}
            mt={6}
            mb={4}
          >
            Welcome to Versify 📝
          </Heading>
          <Text fontSize={["md", "lg", "xl"]} fontStyle={"italic"}>
            Compose, share, and explore unique verses in a community that
            celebrates diverse voices.
          </Text>
        </Box>
        <Box width={["90%", "80%"]} maxWidth="1200px" px={4} pb={6}>
          <Heading
            as="h2"
            size="lg"
            fontSize={["lg", "xl", "2xl"]}
            mb={4}
            textAlign="center"
          >
            Why Versify?
          </Heading>
          <List spacing={2}>
            <ListItem>
              <ListIcon as={MdCheckCircle} color={tealColor} />
              <Text as="span" ml={2}>
                <strong>Craft Your Verses:</strong> Express your thoughts and
                stories through unique verses.
              </Text>
            </ListItem>
            <ListItem>
              <ListIcon as={MdCheckCircle} color={tealColor} />
              <Text as="span" ml={2}>
                <strong>Connect with Creatives:</strong> Engage with a community
                of artists, writers, and thinkers.
              </Text>
            </ListItem>
            <ListItem>
              <ListIcon as={MdCheckCircle} color={tealColor} />
              <Text as="span" ml={2}>
                <strong>Safe Space:</strong> Share and discuss in an environment
                that respects and protects your voice.
              </Text>
            </ListItem>
          </List>
          <Text mt={6} fontSize={["xs", "md"]} textAlign="justify">
            Embark on a journey where words become the brushstrokes of the soul,
            where the rhythm of verse dances with the melody of emotions. At
            Versify, we cherish the power of language to transcend boundaries
            and ignite connections. Our platform is a sanctuary, a haven where
            every voice finds resonance, every story finds solace. Whether
            you're a seasoned bard or a novice scribbler, our community beckons
            you to weave your tales, to sculpt your dreams, and to paint your
            truths upon the canvas of expression. Join us in celebrating the
            boundless tapestry of human experience through the artistry of
            verse. 🌟
          </Text>
          <Flex justify="center" mt={8}>
            <Button
              as={RouterLink}
              to="/signup"
              colorScheme="teal"
              variant="outline"
              mr={4}
            >
              Sign Up
            </Button>
            <Button
              as={RouterLink}
              to="/login"
              colorScheme="teal"
              variant="solid"
            >
              Log In
            </Button>
          </Flex>
        </Box>

        <Box
          p={3}
          fontSize={{ base: "sm", md: "md" }}
          fontStyle="italic"
          fontWeight="bold"
          color="gray.600"
          textAlign="center"
          botton="0"
          width="100%"
        >
          © 2024 Versify. All rights reserved.
        </Box>
      </Flex>
    </>
  );
};

export default AboutUs;
