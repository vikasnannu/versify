import { Box, Button, Heading, Flex, Spacer, Stack } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import LoginCard from "../components/LoginCard";

const LoginPage = () => {
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

          <LoginCard />
        </Box>

        <Box
          p={3}
          fontSize={{ base: "sm", md: "md" }}
          fontStyle="italic"
          fontWeight="bold"
          color="gray.600"
          textAlign="center"
          position="fixed"
          bottom="0"
          width="100%"
        >
          © 2024 Versify. All rights reserved.
        </Box>
      </Flex>
    </>
  );
};

export default LoginPage;
