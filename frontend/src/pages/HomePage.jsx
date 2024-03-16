import React, { useEffect, useState } from "react";
import { Box, Heading, Icon, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { StarIcon } from "@chakra-ui/icons";
import Post from "../components/Post";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useShowToast from "../hooks/useShowToast";
import { useRecoilState } from "recoil";
import postsAtom from "../atoms/postsAtom";

const HomePage = () => {
  const [posts, setPosts] = useRecoilState(postsAtom);
  const [loading, setLoading] = useState(true);
  const showToast = useShowToast();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/posts/feed");
        const data = await response.json();
        if (data.error) {
          showToast("Error", data.error, "error");
        } else {
          setPosts(data);
        }
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [showToast, setPosts]);

  return (
    <>
      <Header />
      <Box
        width="full"
        maxW="1200px"
        mx="auto"
        mb="100px"
        px={{ base: 4, md: 8 }}
      >
        {!loading && posts.length === 0 && (
          <Box textAlign="center" mt={10} mb={6}>
            <Heading as="h1" size="xl" fontWeight="bold" color="teal.500" p={5}>
              <Icon as={StarIcon} w={6} h={6} color="yellow.400" mr={2} />
              Tune Some Folks In :)
            </Heading>
          </Box>
        )}

        {loading && (
          <Box display="flex" justifyContent="center">
            <Text fontWeight="bold" color="teal.500" textAlign="center">
              Loading...
            </Text>
          </Box>
        )}

        {posts.map((post) => (
          <Post key={post._id} post={post} postedBy={post.postedBy} />
        ))}

        {!loading && posts.length !== 0 && (
          <Box textAlign="center" mt={8} mb={4} fontSize="lg">
            Want more?{" "}
            <RouterLink
              to="/search"
              style={{ color: "teal", fontWeight: "bold" }}
            >
              Search for new users
            </RouterLink>{" "}
            and follow them to see more posts.
          </Box>
        )}
      </Box>

      <Footer />
    </>
  );
};

export default HomePage;