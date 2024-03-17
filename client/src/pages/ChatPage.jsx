import React, { useEffect, useState } from "react";
import { useSocket } from "../context/SocketContext";
import {
  Box,
  Flex,
  Input,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { IoMdHappy } from "react-icons/io";

import Conversation from "../components/Conversation";
import MessageContainer from "../components/MessageContainer";

import Header from "../components/Header";
import Footer from "../components/Footer";
import useShowToast from "../hooks/useShowToast";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  conversationsAtom,
  selectedConversationAtom,
} from "../atoms/messagesAtom";
import userAtom from "../atoms/userAtom";

import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";

const ChatPage = () => {
  const [searchingUser, setSearchingUser] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [loadingConversations, setLoadingConversations] = useState(true);

  const [selectedConversation, setSelectedConversation] = useRecoilState(
    selectedConversationAtom,
  );

  const [conversations, setConversations] = useRecoilState(conversationsAtom);
  const currentUser = useRecoilValue(userAtom);
  const showToast = useShowToast();
  const { socket, onlineUsers } = useSocket();

  const handleConversationSearch = async (e) => {
    e.preventDefault();
    setSearchingUser(true);
    try {
      const res = await fetch(`/api/users/profile/${searchText}`);
      const searchedUser = await res.json();
      if (searchedUser.error) {
        showToast(
          "Error",
          "User Not Found! Please Enter Correct Username",
          "error",
        );
        return;
      }

      const messagingYourself = searchedUser._id === currentUser._id;
      if (messagingYourself) {
        showToast("Error", "You cannot message yourself", "error");
        return;
      }

      const conversationAlreadyExists = conversations.find(
        (conversation) => conversation.participants[0]._id === searchedUser._id,
      );

      if (conversationAlreadyExists) {
        setSelectedConversation({
          _id: conversationAlreadyExists._id,
          userId: searchedUser._id,
          username: searchedUser.username,
          userProfilePic: searchedUser.profilePic,
        });
        return;
      }

      const mockConversation = {
        mock: true,
        lastMessage: {
          text: "",
          sender: "",
        },
        _id: Date.now(),
        participants: [
          {
            _id: searchedUser._id,
            username: searchedUser.username,
            profilePic: searchedUser.profilePic,
          },
        ],
      };
      setConversations([mockConversation, ...conversations]);
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setSearchingUser(false);
    }
  };

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await fetch("/api/messages/conversations");
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setConversations(data);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setLoadingConversations(false);
      }
    };
    getConversations();
  }, [showToast, setConversations]);

  useEffect(() => {
    socket?.on("messagesSeen", ({ conversationId }) => {
      setConversations((prev) => {
        const updatedConversations = prev.map((conversation) => {
          if (conversation._id === conversationId) {
            return {
              ...conversation,
              lastMessage: {
                ...conversation.lastMessage,
                seen: true,
              },
            };
          }
          return conversation;
        });
        return updatedConversations;
      });
    });
  }, [socket, setConversations]);

  return (
    <>
      <Header />

      <Flex
        flexDirection={{ base: "column", md: "row" }}
        maxW={{
          sm: "400px",
          md: "full",
        }}
        minH={{
          sm: "400px",
          md: "400px",
        }}
        mx={"auto"}
        mb="75px"
        bg="white"
        p={4}
        borderRadius="md"
        boxShadow="lg"
        border="2px"
        borderColor="teal.100"
      >
        <Flex
          flex={{ base: "40", md: "30" }}
          gap={2}
          flexDirection={"column"}
          maxW={{ sm: "250px", md: "full" }}
          mx={"auto"}
          my={"6px"}
          ml={{ base: 2, md: 0 }}
          borderRadius="md"
          boxShadow="0 0 0 2px teal"
          padding={{ base: 4, md: 3, lg: 4, xl: 5, "2xl": 6 }}
          mr={{ base: 2, md: 2 }}
        >
          <Text
            fontWeight={700}
            color="gray.600"
          >
            Your Conversations
          </Text>

          <Box
            height="auto"
            display="flex"
            alignItems="center"
            style={{
              height: "auto",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Input
              placeholder="Search for users"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              variant="outline"
              borderColor="teal.200"
              _placeholder={{ color: "black", opacity: 0.7, fontSize: "sm" }}
              _hover={{ borderColor: "teal.300" }}
              _focus={{ borderColor: "teal.300" }}
              color="black"
              bg="white"
            />
            <Link to="/search">
              <IconButton
                aria-label="Search"
                icon={<FiSearch />}
                color="white"
                bg="teal.300"
                _hover={{ bg: "teal.400" }}
                _active={{ bg: "teal.500" }}
                onClick={handleConversationSearch}
                isLoading={searchingUser}
                ml={4}
              />
            </Link>
          </Box>

          {loadingConversations && (
            <Text fontWeight="bold" color="teal.500" textAlign="center">
              Loading...
            </Text>
          )}

          <Box
            flex="1"
            overflowY="auto"
            mt="2"
            maxHeight={{ base: "300px", md: "500px" }}
            width={{ base: "100%", md: "240px" }}
          >
            {!loadingConversations &&
              conversations.map((conversation) => (
                <Conversation
                  key={conversation._id}
                  isOnline={onlineUsers.includes(
                    conversation.participants[0]._id,
                  )}
                  conversation={conversation}
                />
              ))}

            {!loadingConversations && conversations.length === 0 && (
              <Box textAlign="center" mt={8}>
                <Text fontSize="xl" fontWeight="bold" color="teal.600">
                  No conversations found.
                </Text>
                <Text fontSize="md" mt={2} color="teal.600">
                  Please search and start a conversation with a user.
                </Text>
              </Box>
            )}
          </Box>
        </Flex>

        {!selectedConversation._id && (
          <Flex
            flex={{ base: "60", md: "70" }}
            borderRadius={"md"}
            p={{ base: 4, md: 6 }}
            flexDir={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            minHeight="100px"
            bg="teal.500"
            color="white"
            boxShadow={{ base: "md", md: "lg" }}
            mx={"auto"}
            my={"3px"}
            border="2px"
            borderColor="yellow.500"
          >
            <IoMdHappy size={64} />
            <Text fontSize="2xl" mt={4} textAlign="center">
              Select a conversation to start messaging
            </Text>
          </Flex>
        )}

        {selectedConversation._id && (
          <Flex
            flex={{ base: "40", md: "70" }}
            maxHeight={{ base: "700px", md: "700px" }}
            maxWidth={{ base: "100%", md: "100%" }}
            alignItems={"center"}
            justifyContent={"center"}
            m={"auto"}
          >
            <MessageContainer />
          </Flex>
        )}
      </Flex>

      <Footer />
    </>
  );
};

export default ChatPage;
