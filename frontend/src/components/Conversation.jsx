import {
	Avatar,
	AvatarBadge,
	Box,
	Flex,
	Image,
	Stack,
	Text,
	WrapItem,
  } from "@chakra-ui/react";
  import { useRecoilState, useRecoilValue } from "recoil";
  import userAtom from "../atoms/userAtom";
  import { BsCheck2All } from "react-icons/bs";
  import { selectedConversationAtom } from "../atoms/messagesAtom";
  
  const Conversation = ({ conversation, isOnline }) => {
	const user = conversation.participants[0];
	const currentUser = useRecoilValue(userAtom);
	const lastMessage = conversation.lastMessage;
	const [selectedConversation, setSelectedConversation] = useRecoilState(
	  selectedConversationAtom,
	);
  
	const handleClick = () => {
	  setSelectedConversation({
		_id: conversation._id,
		userId: user._id,
		userProfilePic: user.profilePic,
		username: user.username,
		mock: conversation.mock,
	  });
	};
  
	return (
	  <Flex
		gap={4}
		alignItems={"center"}
		p={"1"}
		_hover={{
		  cursor: "pointer",
		  bg: "teal.400",
		  color: "white",
		}}
		onClick={handleClick}
		bg={
		  selectedConversation?._id === conversation._id
			? "teal.200"
			: conversation.mock
			  ? "pink.100"
			  : ""
		}
		borderRadius={"md"}
	  >
		<WrapItem>
		  <Box borderRadius="full" border="2px" borderColor="blue.400">
			<Avatar
			  size={{
				base: "md",
				md: "md",
			  }}
			  src={user.profilePic}
			>
			  {isOnline ? (
				<AvatarBadge boxSize="1em" bg="green.400" />
			  ) : (
				<AvatarBadge boxSize="1em" bg="red.400" />
			  )}
			</Avatar>
		  </Box>
		</WrapItem>
  
		<Stack direction={"column"} fontSize={"sm"}>
		  <Text fontWeight="700" display={"flex"} alignItems={"center"}>
			{user.username} <Image src="/verified.png" w={4} h={4} ml={1} />{" "}
		  </Text>
		  <Text fontSize={"xs"} display={"flex"} alignItems={"center"} gap={1}>
			{currentUser._id === lastMessage.sender ? (
			  <Box color={lastMessage.seen ? "teal.400" : ""}>
				<BsCheck2All size={16} />
			  </Box>
			) : (
			  ""
			)}
			{lastMessage.text.length > 18
			  ? lastMessage.text.substring(0, 18) + "..."
			  : lastMessage.text || ""}
		  </Text>
		</Stack>
	  </Flex>
	);
  };
  
  export default Conversation;  