import { Flex, Text } from "@chakra-ui/react";

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
        bg="gray.200"
		width="100%"
      >
        <Flex flex={1} justifyContent="center" alignItems="center">
          <Text fontSize="2xl" fontWeight="bold" color="black">
            Versify
          </Text>
        </Flex>
      </Flex>
    </>
  );
};

export default Header;