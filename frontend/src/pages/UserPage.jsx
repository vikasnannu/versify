import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Box, Text } from "@chakra-ui/react";
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

  if (!user && loading) {
    return (
      <>
        <Header />
        <Box display="flex" justifyContent="center" py={9}>
          {" "}
          <Text
            fontWeight="bold"
            color="teal.500"
            textAlign="center"
            fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
          >
            Loading User's Profile...
          </Text>
        </Box>
        <Footer />
      </>
    );
  }

  if (!user && !loading) {
    return (
      <>
        <Header />
        <Box display="flex" justifyContent="center" py={9}>
          {" "}
          <Text
            fontWeight="bold"
            color="teal.500"
            textAlign="center"
            fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
          >
            No User Found :(
          </Text>
        </Box>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <UserHeader user={user} />

      <Box mt="10px" mb="100px">
        {!fetchingPosts && posts.length === 0 && (
          <Text
            textAlign="center"
            color="red.600"
            fontSize="xl"
            fontWeight="bold"
            mb={4}
          >
            Oops! It seems like user hasn't shared any verse yet.
          </Text>
        )}

        {fetchingPosts && (
          <Box display="flex" justifyContent="center">
            <Text fontWeight="bold" color="teal.500" textAlign="center">
              Loading...
            </Text>
          </Box>
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