import { Avatar, Box, Flex, Text, Image } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import { formatDistanceToNow } from "date-fns";
import Actions from "./Actions";

const Post = ({ post, postedBy }) => {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const showToast = useShowToast();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/users/profile/${postedBy}`);
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setUser(data);
      } catch (error) {
        showToast("Error", error.message, "error");
        setUser(null);
      }
    };

    getUser();
  }, [postedBy, showToast]);

  if (!user) {
    return null;
  }

  return (
    <>
      <Link to={`/${user.username}/post/${post._id}`}>
        <Box
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          mb={5}
          boxShadow="md"
        >
          <Flex
            direction={["row", "row"]}
            align="center"
            justify="space-between"
            p={3}
            bg="teal.50"
            borderBottomWidth="1px"
          >
            <Flex align="center">
              <Box
                borderRadius="full"
                overflow="hidden"
                border="2px solid light-blue"
              >
                <Avatar
                  size="sm"
                  name={user.name}
                  src={user?.profilePic}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/user/${user.username}`);
                  }}
                  cursor="pointer"
                  mr={2}
                  border="2px solid"
                  borderColor="teal.200"
                />
              </Box>
              <Flex align="center">
                <Text
                  fontSize="md"
                  fontWeight="bold"
                  color="teal.700"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/user/${user.username}`);
                  }}
                  cursor="pointer"
                >
                  {user?.username}
                </Text>
                <Image src="/verified.png" w="4" h={4} ml={1} />
              </Flex>
            </Flex>
            <Text
              fontSize="xs"
              fontStyle="italic"
              fontWeight="medium"
              color="teal.600"
            >
              {formatDistanceToNow(new Date(post.createdAt), {
                addSuffix: true,
              })}
            </Text>
          </Flex>
          {post.img && <Image src={post.img} alt="Post image" w="full" />}
          <Box p={3} bg="orange.50" borderRadius="md">
            <Text fontSize="md" color="teal.800" fontFamily="Inter, sans-serif">
              {post.text}
            </Text>
          </Box>
          <Flex
            p={3}
            justify="space-between"
            borderTopWidth="1px"
            bg="green.50"
          >
            <Actions post={post} />
          </Flex>
        </Box>
      </Link>
    </>
  );
};

export default Post;