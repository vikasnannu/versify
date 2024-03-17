import { Avatar, Divider, Flex, Text, Image } from "@chakra-ui/react";

const Comment = ({ reply, lastReply }) => {
  return (
    <>
      <Flex
        py={3}
        my={3}
        w="100%"
        alignItems="flex-start"
        borderRadius="md"
        boxShadow="md"
        bg="teal.50"
        p={4}
      >
        <Avatar src={reply.userProfilePic} size="md" />
        <Flex flexDirection="column" ml={4} width="100%">
          <Flex alignItems="center">
            <Text fontSize="md" fontWeight="bold" color="teal.700">
              {reply.username}
            </Text>
            <Image src="/verified.png" w="4" h={4} ml={1} />
          </Flex>
          <Text fontSize="lg" color="teal.900">
            {reply.text}
          </Text>
        </Flex>
      </Flex>
      {!lastReply && <Divider borderColor="teal.300" />}
    </>
  );
};

export default Comment;