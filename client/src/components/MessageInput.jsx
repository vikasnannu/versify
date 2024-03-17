import {
	Flex,
	Box,
	Image,
	Text,
	Input,
	InputGroup,
	InputRightElement,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
  } from "@chakra-ui/react";
  import { useRef, useState } from "react";
  import { FiImage, FiSend } from "react-icons/fi";
  import useShowToast from "../hooks/useShowToast";
  import {
	conversationsAtom,
	selectedConversationAtom,
  } from "../atoms/messagesAtom";
  import { useRecoilValue, useSetRecoilState } from "recoil";
  import usePreviewImg from "../hooks/usePreviewImg";
  
  const MessageInput = ({ setMessages }) => {
	const [messageText, setMessageText] = useState("");
	const showToast = useShowToast();
	const selectedConversation = useRecoilValue(selectedConversationAtom);
	const setConversations = useSetRecoilState(conversationsAtom);
	const imageRef = useRef(null);
	const { onClose } = useDisclosure();
	const { handleImageChange, imgUrl, setImgUrl } = usePreviewImg();
	const [isSending, setIsSending] = useState(false);
  
	const handleSendMessage = async (e) => {
	  e.preventDefault();
	  if (!messageText && !imgUrl) return;
	  if (isSending) return;
  
	  setIsSending(true);
  
	  try {
		const res = await fetch("/api/messages", {
		  method: "POST",
		  headers: {
			"Content-Type": "application/json",
		  },
		  body: JSON.stringify({
			message: messageText,
			recipientId: selectedConversation.userId,
			img: imgUrl,
		  }),
		});
		const data = await res.json();
		if (data.error) {
		  showToast("Error", data.error, "error");
		  return;
		}
		console.log(data);
		setMessages((messages) => [...messages, data]);
  
		setConversations((prevConvs) => {
		  const updatedConversations = prevConvs.map((conversation) => {
			if (conversation._id === selectedConversation._id) {
			  return {
				...conversation,
				lastMessage: {
				  text: messageText,
				  sender: data.sender,
				},
			  };
			}
			return conversation;
		  });
		  return updatedConversations;
		});
		setMessageText("");
		setImgUrl("");
	  } catch (error) {
		showToast("Error", error.message, "error");
	  } finally {
		setIsSending(false);
	  }
	};
	return (
	  <Flex gap={2} alignItems={"center"} my={{ base: 0.5, md: 1 }}>
		<form onSubmit={handleSendMessage} style={{ flex: 95 }}>
		  <InputGroup>
			<Input
			  w={"full"}
			  placeholder="Type a message"
			  onChange={(e) => setMessageText(e.target.value)}
			  value={messageText}
			  focusBorderColor="teal.500"
			/>
			<InputRightElement onClick={handleSendMessage} cursor="pointer">
			  <Box color="teal.500" cursor="pointer">
				<FiSend size={24} />
			  </Box>
			</InputRightElement>
		  </InputGroup>
		</form>
		<Flex flex={5} cursor={"pointer"}>
		  <Box color="teal.500" cursor="pointer">
			<FiImage size={24} onClick={() => imageRef.current.click()} />
		  </Box>
		  <Input
			type={"file"}
			hidden
			ref={imageRef}
			onChange={handleImageChange}
		  />
		</Flex>
		<Modal
		  isOpen={imgUrl}
		  onClose={() => {
			onClose();
			setImgUrl("");
		  }}
		>
		  <ModalOverlay />
		  <ModalContent>
			<ModalHeader></ModalHeader>
			<ModalCloseButton color={"red.700"} fontWeight="bold" />
			<ModalBody>
			  <Flex mt={5} w={"full"}>
				<Image src={imgUrl} />
			  </Flex>
			  <Flex justifyContent={"flex-end"} my={2}>
				{!isSending ? (
				  <Flex alignItems="center" color="teal.500" cursor="pointer">
					<Text fontWeight="bold" fontStyle="italic" mr={2}>
					  Share Image
					</Text>
					<FiSend size={24} onClick={handleSendMessage} />
				  </Flex>
				) : (
					<Text fontWeight="bold" color="teal.500" textAlign="center">
					  Loading...
					</Text>
				)}
			  </Flex>
			</ModalBody>
		  </ModalContent>
		</Modal>
	  </Flex>
	);
  };
  
  export default MessageInput;  