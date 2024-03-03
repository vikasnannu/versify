import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useFollowUnfollow from "../hooks/useFollowUnfollow";
import { FiUserPlus, FiUserCheck } from "react-icons/fi";

const SuggestedUser = ({ user }) => {
  const { handleFollowUnfollow, following, updating } = useFollowUnfollow(user);

  return (
    <>
      <Flex
        gap={2}
        justifyContent={"space-between"}
        alignItems={"center"}
        bg="white"
        p={4}
        borderRadius="md"
        boxShadow="md"
      >
        <Flex gap={2} as={Link} to={`/user/${user.username}`}>
          <Avatar src={user.profilePic} />
          <Box>
            <Text fontSize={"sm"} fontWeight={"bold"}>
              {user.username}
            </Text>
            <Text color={"gray.light"} fontSize={"sm"}>
              {user.name}
            </Text>
          </Box>
        </Flex>

        <Button
          size="sm"
          colorScheme={following ? "red" : "green"}
          leftIcon={following ? <FiUserCheck /> : <FiUserPlus />}
          onClick={handleFollowUnfollow}
          isLoading={updating}
        >
          {following ? "Tune Out" : "Tune In"}
        </Button>
      </Flex>
    </>
  );
};

const SearchedUsers = ({ users }) => {
  const [searchedUsers, setSearchedUsers] = useState([]);

  useEffect(() => {
    setSearchedUsers(users);
  }, [users]);

  return (
    <>
      <Flex direction={"column"} gap={4}>
        {searchedUsers.map((user) => (
          <SuggestedUser key={user._id} user={user} />
        ))}
      </Flex>
    </>
  );
};

export default SearchedUsers;
