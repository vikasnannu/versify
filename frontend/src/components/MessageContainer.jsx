import {
  Avatar,
  Divider,
  Flex,
  Image,
  Text,
  Box,
} from "@chakra-ui/react";
import Message from "./Message";
import MessageInput from "./MessageInput";
import { useEffect, useRef, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import {
  conversationsAtom,
  selectedConversationAtom,
} from "../atoms/messagesAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import { useSocket } from "../context/SocketContext.jsx";

const MessageContainer = () => {
  const showToast = useShowToast();
  const selectedConversation = useRecoilValue(selectedConversationAtom);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [messages, setMessages] = useState([]);
  const currentUser = useRecoilValue(userAtom);
  const { socket } = useSocket();
  const setConversations = useSetRecoilState(conversationsAtom);
  const messageEndRef = useRef(null);

  useEffect(() => {
    socket.on("newMessage", (message) => {
      if (selectedConversation._id === message.conversationId) {
        setMessages((prev) => [...prev, message]);
      }

      setConversations((prev) => {
        const updatedConversations = prev.map((conversation) => {
          if (conversation._id === message.conversationId) {
            return {
              ...conversation,
              lastMessage: {
                text: message.text,
                sender: message.sender,
              },
            };
          }
          return conversation;
        });
        return updatedConversations;
      });
    });

    return () => socket.off("newMessage");
  }, [socket, selectedConversation, setConversations]);

  useEffect(() => {
    const lastMessageIsFromOtherUser =
      messages.length &&
      messages[messages.length - 1].sender !== currentUser._id;
    if (lastMessageIsFromOtherUser) {
      socket.emit("markMessagesAsSeen", {
        conversationId: selectedConversation._id,
        userId: selectedConversation.userId,
      });
    }

    socket.on("messagesSeen", ({ conversationId }) => {
      if (selectedConversation._id === conversationId) {
        setMessages((prev) => {
          const updatedMessages = prev.map((message) => {
            if (!message.seen) {
              return {
                ...message,
                seen: true,
              };
            }
            return message;
          });
          return updatedMessages;
        });
      }
    });
  }, [socket, currentUser._id, messages, selectedConversation]);

  useEffect(() => {
    const getMessages = async () => {
      setLoadingMessages(true);
      setMessages([]);
      try {
        if (selectedConversation.mock) return;
        const res = await fetch(`/api/messages/${selectedConversation.userId}`);
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setMessages(data);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setLoadingMessages(false);
      }
    };

    getMessages();
  }, [showToast, selectedConversation.userId, selectedConversation.mock]);

  return (
    <Flex
      flex="100"
      bg={"beige.100"}
      p={2}
      height={{ base: "auto", md: "625px" }}
      width={{ base: "400px", md: "auto" }}
      maxW={{ sm: "250px", md: "full" }}
      borderRadius="md"
      flexDirection="column"
      border="2px"
      borderColor="cyan.400"
    >
      <Flex
        w="full"
        h={12}
        alignItems="center"
        gap={2}
        mb={{ base: 1, md: 0.5 }}
      >
        <Box borderRadius="full" border="2px" borderColor="blue.400">
          <Avatar src={selectedConversation.userProfilePic} size="md" />
        </Box>
        <Text display="flex" alignItems="center">
          {selectedConversation.username}{" "}
          <Image src="/verified.png" w={4} h={4} ml={1} />
        </Text>
      </Flex>

      <Divider
        borderColor="teal.500"
        borderWidth="2px"
        my={{ base: 0.5, md: 1 }}
      />

      <Flex
        flexDir="column"
        gap={{ base: 2, md: 4 }}
        my={"2px"}
        mx={"auto"}
        p={{ base: 1, md: 2 }}
        height={{ base: "auto", md: "600px" }}
        overflowY="auto"
        borderRadius="md"
        borderColor="teal.500"
        minW={"100%"}
        minH={"300px"}
        position="relative"
        bg="teal.50"
      >
        {loadingMessages && (
          <Flex
            alignItems="center"
            justifyContent="center"
            flexDir={{ base: "column", md: "row" }}
            mt={8}
          >
            <Text
              fontWeight="bold"
              color="teal.500"
              fontSize={{ base: "lg", md: "xl" }}
              mr={{ base: 0, md: 2 }}
            >
              Loading Conversation...
            </Text>
          </Flex>
        )}

        {!loadingMessages &&
          messages.map((message) => (
            <Flex
              key={message._id}
              direction="column"
              ref={
                messages.length - 1 === messages.indexOf(message)
                  ? messageEndRef
                  : null
              }
            >
              <Message
                message={message}
                ownMessage={currentUser._id === message.sender}
              />
            </Flex>
          ))}
      </Flex>

      <MessageInput setMessages={setMessages} />
    </Flex>
  );
};

export default MessageContainer;