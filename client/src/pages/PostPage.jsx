import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Divider,
  Flex,
  Image,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { useRecoilState, useRecoilValue } from "recoil";
import { DeleteIcon } from "@chakra-ui/icons";
import Actions from "../components/Actions";
import Comment from "../components/Comment";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useGetUserProfile from "../hooks/useGetUserProfile";
import useShowToast from "../hooks/useShowToast";
import userAtom from "../atoms/userAtom";
import postsAtom from "../atoms/postsAtom";
import DeleteConfirmationModal from "../components/DeleteModal";
import { AiOutlineMeh } from "react-icons/ai";

const PostPage = () => {
  const { user, loading } = useGetUserProfile();
  const [posts, setPosts] = useRecoilState(postsAtom);
  const showToast = useShowToast();
  const { pid } = useParams();
  const currentUser = useRecoilValue(userAtom);
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);

  useEffect(() => {
    const getPost = async () => {
      setPosts([]);
      try {
        const res = await fetch(`/api/posts/${pid}`);
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setCurrentPost(data);
        setPosts([data]);
      } catch (error) {
        showToast("Error", error.message, "error");
      }
    };
    getPost();
  }, [showToast, pid, setPosts, currentPost]);

  const handleDeletePost = async () => {
    setIsDeleteModalOpen(true);
  };

  const confirmDeletePost = async () => {
    setIsDeleteModalOpen(false);
    try {
      const res = await fetch(`/api/posts/${currentPost._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      showToast("Success", "Post deleted", "success");
      setPosts(posts.filter((p) => p._id !== currentPost._id));
      navigate(`/user/${user.username}`);
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  if (!user && loading) {
    return (
      <Box display="flex" justifyContent="center">
        <Text fontWeight="bold" color="teal.500" textAlign="center">
          Loading Post...
        </Text>
      </Box>
    );
  }

  if (!currentPost) return null;

  return (
    <>
      <Header />
      <Flex
        p={4}
        bg="teal.100"
        alignItems="center"
        justifyContent="space-between"
        flexDirection={{ base: "row", md: "row" }}
      >
        <Flex alignItems="center" mb={{ base: 2, md: 0 }}>
          <Link to={`/user/${user.username}`}>
            <Box borderRadius="full" overflow="hidden" border="2px solid light-blue">
              <Avatar
                src={user?.profilePic}
                size={"md"}
                name={user?.name}
                mr={0}
                mb={0}
              />
            </Box>
          </Link>
          <Flex alignItems="center">
            <Link to={`/user/${user.username}`}>
              <Text
                fontSize={"md"}
                fontWeight={"bold"}
                color="teal.500"
                ml={{ base: 2, md: 4 }}
              >
                {user.username}
              </Text>
            </Link>
            <Image src="/verified.png" w="4" h={4} ml={1} />
          </Flex>
        </Flex>

        <Flex alignItems="center" mt={0}>
          <Text
            fontSize={{ base: "sm", md: "xs" }}
            textAlign={"center"}
            color={"gray.light"}
            mr={{ base: 2, md: 4 }}
          >
            {formatDistanceToNow(new Date(currentPost.createdAt))} ago
          </Text>
          {currentUser?._id === user._id && (
            <>
              <IconButton
                icon={<DeleteIcon />}
                aria-label="Delete post"
                size={{ base: "sm", md: "md" }}
                colorScheme="red"
                onClick={handleDeletePost}
              />
              <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDeletePost}
                colorScheme="red"
                size={{ base: "md", md: "lg" }}
              />
            </>
          )}
        </Flex>
      </Flex>

      <Box p={4} bg="teal.50" borderRadius={6} mt={3}>
        <Text>{currentPost.text}</Text>
        {currentPost.img && (
          <Box
            borderRadius={6}
            overflow={"hidden"}
            border={"1px solid"}
            borderColor={"gray.light"}
            mt={3}
          >
            <Image src={currentPost.img} w={"full"} />
          </Box>
        )}
        <Flex gap={3} my={3}>
          <Actions post={currentPost} />
        </Flex>
      </Box>

      <Divider my={4} />

      <Box marginBottom="100px">
        <Text fontSize="lg" fontWeight="bold" color="teal.700" mb={3}>
          Replies
        </Text>
        {currentPost.replies.length > 0 ? (
          currentPost.replies.map((reply, index) => (
            <Comment
              key={index}
              reply={reply}
              lastReply={index === currentPost.replies.length - 1}
            />
          ))
        ) : (
          <Flex alignItems="center" justifyContent="center">
            <AiOutlineMeh size={24} color="teal.400" />
            <Text ml={2} color="teal.400" fontWeight="bold">
              No replies yet.
            </Text>
          </Flex>
        )}
      </Box>
      <Footer />
    </>
  );
};

export default PostPage;