import { Flex, Box, Text } from "@chakra-ui/react";

const Header = () => {
  return (
    <>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        wrap="wrap"
        mt={3}
        mb={6}
        px={4}
        bg="yellow.50"
        width="100%"
      >
        <Box flex={{ base: 1, md: "auto" }} ml={{ base: -2, md: 0 }}>
          <Flex justifyContent="center" alignItems="center">
            <Text fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }} fontWeight="bold" color="black">
              Versify
            </Text>
          </Flex>
        </Box>
      </Flex>
    </>
  );
};

export default Header;