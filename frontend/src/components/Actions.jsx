import {
	Box,
	Button,
	Flex,
	FormControl,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	useDisclosure,
	useBreakpointValue,
  } from "@chakra-ui/react";
  import { useState } from "react";
  import { FiHeart, FiMessageCircle } from "react-icons/fi";
  import { useRecoilState, useRecoilValue } from "recoil";
  import userAtom from "../atoms/userAtom";
  import useShowToast from "../hooks/useShowToast";
  import postsAtom from "../atoms/postsAtom";
  
  const Actions = ({ post }) => {
	const user = useRecoilValue(userAtom);
	const [liked, setLiked] = useState(post.likes.includes(user?._id));
	const [posts, setPosts] = useRecoilState(postsAtom);
	const [isLiking, setIsLiking] = useState(false);
	const [isReplying, setIsReplying] = useState(false);
	const [reply, setReply] = useState("");
  
	const showToast = useShowToast();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const buttonSize = useBreakpointValue({ base: "sm", md: "md" });
	const iconSize = useBreakpointValue({ base: "24px", md: "30px" });
	const flexDirection = useBreakpointValue({ base: "column", md: "column" });
	const gap = useBreakpointValue({ base: 2, md: 3 });
  
	const handleLikeAndUnlike = async () => {
	  if (!user)
		return showToast(
		  "Error",
		  "You must be logged in to like a post",
		  "error",
		);
	  if (isLiking) return;
	  setIsLiking(true);
	  try {
		const res = await fetch("/api/posts/like/" + post._id, {
		  method: "PUT",
		  headers: {
			"Content-Type": "application/json",
		  },
		});
		const data = await res.json();
		if (data.error) return showToast("Error", data.error, "error");
  
		if (!liked) {
		  const updatedPosts = posts.map((p) => {
			if (p._id === post._id) {
			  return { ...p, likes: [...p.likes, user._id] };
			}
			return p;
		  });
		  setPosts(updatedPosts);
		} else {
		  const updatedPosts = posts.map((p) => {
			if (p._id === post._id) {
			  return { ...p, likes: p.likes.filter((id) => id !== user._id) };
			}
			return p;
		  });
		  setPosts(updatedPosts);
		}
  
		setLiked(!liked);
	  } catch (error) {
		showToast("Error", error.message, "error");
	  } finally {
		setIsLiking(false);
	  }
	};
  
	const handleReply = async () => {
	  if (!user)
		return showToast(
		  "Error",
		  "You must be logged in to reply to a post",
		  "error",
		);
	  if (isReplying) return;
	  setIsReplying(true);
	  try {
		const res = await fetch("/api/posts/reply/" + post._id, {
		  method: "PUT",
		  headers: {
			"Content-Type": "application/json",
		  },
		  body: JSON.stringify({ text: reply }),
		});
		const data = await res.json();
		if (data.error) return showToast("Error", data.error, "error");
  
		const updatedPosts = posts.map((p) => {
		  if (p._id === post._id) {
			return { ...p, replies: [...p.replies, data] };
		  }
		  return p;
		});
		setPosts(updatedPosts);
		showToast("Success", "Reply posted successfully", "success");
		onClose();
		setReply("");
	  } catch (error) {
		showToast("Error", error.message, "error");
	  } finally {
		setIsReplying(false);
	  }
	};
  
	return (
	  <Flex flexDirection={flexDirection}>
		<Flex gap={gap} my={2} onClick={(e) => e.preventDefault()}>
		  <Box as="button" onClick={handleLikeAndUnlike}>
			<FiHeart
			  color={liked ? "#8C261F" : "#FFD5D0"}
			  fill={liked ? "red" : "#F9EFEB"}
			  size={iconSize}
			/>
		  </Box>
  
		  <Box as="button" onClick={onOpen}>
			<FiMessageCircle
			  color={post.replies.length > 0 ? "#136773" : "#9EC2C8"}
			  fill={post.replies.length > 0 ? "#40B0C0" : "#E4F9FB"}
			  size={iconSize}
			/>
		  </Box>
		</Flex>
  
		<Flex gap={2} alignItems={"center"}>
		<Text color={"gray.500"} fontSize={{ base: "xs", md: "sm" }}>
			{post.likes.length} likes
		  </Text>
		  <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.500"}></Box>
		  <Text color={"gray.500"} fontSize={{ base: "xs", md: "sm" }}>
			{post.replies.length} replies
		  </Text>
		</Flex>
  
		<Modal
		  isOpen={isOpen}
		  onClose={onClose}
		  isCentered
		  size={{ base: "full", sm: "md", lg: "xl" }}
		>
		  <ModalOverlay />
		  <ModalContent bgColor="grey.100" color="black">
			<ModalHeader>Reply to Post</ModalHeader>
			<ModalCloseButton />
			<ModalBody pb={6}>
			  <FormControl>
				<Input
				  placeholder="Your reply..."
				  value={reply}
				  onChange={(e) => setReply(e.target.value)}
				  variant="filled"
				  focusBorderColor="teal.300"
				/>
			  </FormControl>
			</ModalBody>
  
			<ModalFooter>
			  <Button
				colorScheme="teal"
				size={buttonSize}
				mr={3}
				isLoading={isReplying}
				onClick={handleReply}
			  >
				Reply
			  </Button>
			</ModalFooter>
		  </ModalContent>
		</Modal>
	  </Flex>
	);
  };
  
  export default Actions;  