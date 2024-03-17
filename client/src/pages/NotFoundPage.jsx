import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import Header from "./../components/Header";

const NotFoundPage = () => {
  return (
    <>
      <Header />
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        minHeight="80vh"
        p={{ base: 4, md: 8 }}
        textAlign="center"
        bgGradient="linear(to-l, teal.500, teal.300)"
        color="white"
        mb={"30px"}
      >
        <Box
          width="100%"
          maxWidth={{ base: "90%", md: "xl" }}
          px={{ base: 4, md: 0 }}
        >
          {" "}
          <Text fontSize={{ base: "4xl", md: "6xl" }} fontWeight="bold" mb={3}>
            404
          </Text>
          <Text fontSize={{ base: "xl", md: "2xl" }} mb={5}>
            Page Not Found
          </Text>
          <Text fontSize={{ base: "md", md: "lg" }} mb={8}>
            {" "}
          </Text>
          <Button colorScheme="pink" variant="solid" as={Link} to="/">
            Go Home
          </Button>
        </Box>
      </Flex>
    </>
  );
};

export default NotFoundPage;