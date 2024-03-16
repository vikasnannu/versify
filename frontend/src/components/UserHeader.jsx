import {
	Avatar,
	Box,
	Flex,
	Link,
	Text,
	VStack,
	IconButton,
	Button,
	useToast,
	useBreakpointValue,
	Image,
  } from "@chakra-ui/react";
  import {
	FiClipboard,
	FiEdit,
	FiUserPlus,
	FiLogOut,
	FiUserCheck,
  } from "react-icons/fi";
  import { useRecoilValue } from "recoil";
  import userAtom from "../atoms/userAtom";
  import { Link as RouterLink } from "react-router-dom";
  import useFollowUnfollow from "../hooks/useFollowUnfollow";
  import useLogout from "../hooks/useLogout";
  
  const UserHeader = ({ user }) => {
	const logout = useLogout();
	const toast = useToast();
	const currentUser = useRecoilValue(userAtom);
	const { handleFollowUnfollow, following, updating } = useFollowUnfollow(user);
	const avatarSize = useBreakpointValue({ base: "xl", md: "2xl" });
	const buttonSize = useBreakpointValue({ base: "sm", md: "md" });
	const flexDirection = useBreakpointValue({ base: "row", md: "row" });
  
	const copyURL = () => {
	  const currentURL = window.location.href;
	  navigator.clipboard.writeText(currentURL).then(() => {
		toast({
		  title: "Success.",
		  status: "success",
		  description: "Profile link copied.",
		  duration: 3000,
		  isClosable: true,
		});
	  });
	};
  
	return (
	  <>
		<VStack gap={4} alignItems={"start"} width="100%">
		  <Flex
			direction={{ base: "row", md: "row" }}
			justifyContent={"space-between"}
			alignItems="center"
			p={4}
			bg={"teal.50"}
			borderRadius="lg"
			boxShadow="md"
			width="100%"
		  >
			<Box>
			  <Flex alignItems="center">
				<Text
				  fontSize={{ base: "2xl", md: "3xl" }}
				  fontWeight={"extrabold"}
				  color={"teal.800"}
				  mb={{ base: 2, md: 1 }}
				>
				  {user.name}
				</Text>
				<Image src="/verified.png" w="4" h={4} ml={1} />
			  </Flex>
			  <Text fontSize={"md"} color={"gray.500"} fontStyle="italic">
				@{user.username}
			  </Text>
			</Box>
			<Avatar
			  name={user.name}
			  src={user.profilePic || "https://bit.ly/broken-link"}
			  size={avatarSize}
			  border="4px solid"
			  borderColor="gray.200"
			  boxShadow="xl"
			  mt={2}
			/>
		  </Flex>
  
		  <Box
			p={4}
			w={{ base: "100%", md: "95%" }}
			mx="auto"
			bg={"transparent"}
			borderRadius="lg"
			boxShadow="sm"
		  >
			<Flex
			  alignItems="center"
			  justifyContent="space-between"
			  flexDirection={{ base: "column", md: "column" }}
			>
			  <Box
				p={3}
				bg="white"
				borderRadius="md"
				boxShadow="base"
				w={{ base: "100%", md: "70%" }}
				mb={{ base: 4, md: 4 }}
			  >
				<Text
				  textAlign={{ base: "center", md: "left" }}
				  fontSize={{ base: "xs", md: "sm", lg: "md" }}
				  color={"gray.500"}
				>
				  {user.bio || "No biography available."}
				</Text>
			  </Box>
  
			  {currentUser?._id === user._id && (
				<Link as={RouterLink} to={`/${user.username}/update`}>
				  <Button
					leftIcon={<FiEdit />}
					size={buttonSize}
					colorScheme="purple"
					variant="solid"
				  >
					Update Profile
				  </Button>
				</Link>
			  )}
  
			  {currentUser?._id !== user._id && (
				<Button
				  leftIcon={following ? <FiUserCheck /> : <FiUserPlus />}
				  size={buttonSize}
				  colorScheme={following ? "red" : "green"}
				  onClick={handleFollowUnfollow}
				  isLoading={updating}
				>
				  {following ? "Un Tune" : "Tune In"}
				</Button>
			  )}
			</Flex>
		  </Box>
  
		  <Flex
			direction={flexDirection}
			width="100%"
			justifyContent={"space-between"}
		  >
			<Flex gap={2}>
			  <RouterLink to={`/tunning/${user.username}`}>
				<Button size={buttonSize} colorScheme="teal">
				  <Text>
					<span
					  style={{
						fontWeight: "bold",
						fontSize: "larger",
						color: "yellow",
					  }}
					>
					  {user.followers.length}
					</span>
					&nbsp;Tuning In
				  </Text>
				</Button>
			  </RouterLink>
			  <RouterLink to={`/listening/${user.username}`}>
				<Button size={buttonSize} colorScheme="teal">
				  <Text>
					<span
					  style={{
						fontWeight: "bold",
						fontSize: "larger",
						color: "yellow",
					  }}
					>
					  {user.following.length}
					</span>
					&nbsp;Listening To
				  </Text>
				</Button>
			  </RouterLink>
			</Flex>
  
			<Flex gap={2} align="center">
			  <IconButton
				aria-label="Copy settings"
				icon={<FiClipboard />}
				size={buttonSize}
				colorScheme="yellow"
				fontSize="24px"
				onClick={copyURL}
			  />
  
			  {currentUser?._id === user._id && (
				<RouterLink onClick={logout}>
				  <IconButton
					aria-label="Logout"
					icon={<FiLogOut />}
					color="red.500"
					fontSize={["20px", "24px"]}
					variant="outline"
					boxShadow="base"
				  />
				</RouterLink>
			  )}
			</Flex>
		  </Flex>
  
		  <Flex
			flex={1}
			borderBottom={"2px"}
			borderColor="teal.500"
			justifyContent={"center"}
			pb="3"
			cursor={"pointer"}
			width="100%"
		  >
			<Text
			  fontWeight={"bold"}
			  color={"teal.500"}
			  textAlign="center"
			  fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
			>
			  Verses
			</Text>
		  </Flex>
		</VStack>
	  </>
	);
  };
  
  export default UserHeader;  