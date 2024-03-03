import {
	Avatar,
	Box,
	Flex,
	Text,
	Image,
	IconButton,
	useColorModeValue,
  } from "@chakra-ui/react";
  import { Link, useNavigate } from "react-router-dom";
  
  import { useEffect, useState } from "react";
  import useShowToast from "../hooks/useShowToast";
  import { formatDistanceToNow } from "date-fns";
  import { DeleteIcon } from "@chakra-ui/icons";
  
  import { useRecoilState, useRecoilValue } from "recoil";
  import userAtom from "../atoms/userAtom";
  import postsAtom from "../atoms/postsAtom";
  
  import Actions from "./Actions";
  
  const Post = ({ post, postedBy }) => {
	const [user, setUser] = useState(null);
	const currentUser = useRecoilValue(userAtom);
	const [posts, setPosts] = useRecoilState(postsAtom);
  
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
			  bg={useColorModeValue("gray.100", "gray.700")}
			  borderBottomWidth="1px"
			>
			  <Flex align="center">
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
				  borderColor={useColorModeValue("gray.200", "gray.600")}
				/>
				<Flex align="center">
				  <Text
					fontSize="md"
					fontWeight="bold"
					color={useColorModeValue("gray.700", "gray.300")}
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
				color={useColorModeValue("gray.600", "gray.400")}
			  >
				{formatDistanceToNow(new Date(post.createdAt), {
				  addSuffix: true,
				})}
			  </Text>
			</Flex>
			{post.img && <Image src={post.img} alt="Post image" w="full" />}
			<Box
			  p={3}
			  bg={useColorModeValue("white", "gray.800")}
			  borderRadius="md"
			>
			  <Text
				fontSize="md"
				color={useColorModeValue("gray.800", "gray.200")}
				fontFamily="Inter, sans-serif"
			  >
				{post.text}
			  </Text>
			</Box>
			<Flex
			  p={3}
			  justify="space-between"
			  borderTopWidth="1px"
			  bg={useColorModeValue("gray.100", "gray.700")}
			>
			  <Actions post={post} />
			</Flex>
		  </Box>
		</Link>
	  </>
	);
  };
  
  export default Post;
  