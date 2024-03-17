import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useFollowUnfollow from "../hooks/useFollowUnfollow";
import useShowToast from "../hooks/useShowToast";
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

const SuggestedUsers = () => {
  const [loading, setLoading] = useState(true);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const showToast = useShowToast();

  useEffect(() => {
    const getSuggestedUsers = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/users/suggested");
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setSuggestedUsers(data);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setLoading(false);
      }
    };

    getSuggestedUsers();
  }, [showToast]);

  return (
    <>
      {!loading && suggestedUsers.length === 0 && (
        <Flex
          direction="column"
          gap={4}
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          p={8}
          bg="red.200"
          borderRadius="md"
        >
          <Text fontSize="2xl" fontWeight="bold" color="red.800">
            No users to discover
          </Text>
          <Text fontSize="lg" color="red.600">
            Looks like there are no users to discover at the moment.
          </Text>
          <Text fontSize="lg" color="red.600">
            Help grow our community by inviting your friends to join!
          </Text>
        </Flex>
      )}
      {!loading && suggestedUsers.length > 0 && (
        <Flex direction="column" gap={4}>
          {suggestedUsers.map((user) => (
            <SuggestedUser key={user._id} user={user} />
          ))}
        </Flex>
      )}
    </>
  );
};

export default SuggestedUsers;