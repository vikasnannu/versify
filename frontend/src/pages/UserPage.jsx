import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Flex,
  Box,
  Spinner,
  Button,
  Text,
} from "@chakra-ui/react";
import { FiMessageSquare } from "react-icons/fi";
import UserHeader from "../components/UserHeader";
import Post from "../components/Post";
import useGetUserProfile from "../hooks/useGetUserProfile";
import useShowToast from "../hooks/useShowToast";
import { useRecoilState } from "recoil";
import postsAtom from "../atoms/postsAtom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const UserPage = () => {
  const { user, loading } = useGetUserProfile();
  const { username } = useParams();
  const showToast = useShowToast();
  const [posts, setPosts] = useRecoilState(postsAtom);
  const [fetchingPosts, setFetchingPosts] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      if (!user) return;
      setFetchingPosts(true);
      try {
        const res = await fetch(`/api/posts/user/${username}`);
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        showToast("Error", error.message, "error");
        setPosts([]);
      } finally {
        setFetchingPosts(false);
      }
    };

    getPosts();
  }, [username, showToast, setPosts, user]);

  const handleChat = () => {};

  if (!user && loading) {
    return (
      <Flex justifyContent={"center"}>
        <Spinner size={"xl"} />
      </Flex>
    );
  }

  if (!user && !loading) return <h1>User not found</h1>;

  return (
    <>
      <Header />

      <UserHeader user={user} />

      <Box mb="100px">
        {!fetchingPosts && posts.length === 0 && (
          <Flex overflow="hidden" direction="column" align="center" p={4}>
            <Text
              textAlign="center"
              color="red.600"
              fontSize="xl"
              fontWeight="bold"
              mb={4}
            >
              Oops! It seems like this user hasn't shared any verse yet.
            </Text>
            <Button
              leftIcon={<FiMessageSquare />}
              colorScheme="red"
              size="lg"
              onClick={handleChat}
              _hover={{ bg: "red.500" }}
              w="100%"
              maxW="300px"
            >
              Chat to help them add a verse
            </Button>
          </Flex>
        )}

        {fetchingPosts && (
          <Flex justifyContent={"center"} my={12}>
            <Spinner size={"xl"} />
          </Flex>
        )}

        {posts.map((post) => (
          <Post key={post._id} post={post} postedBy={post.postedBy} />
        ))}
      </Box>

      <Footer />
    </>
  );
};

export default UserPage;
