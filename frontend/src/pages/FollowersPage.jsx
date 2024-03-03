
import { Box, Flex, Input, Text, IconButton } from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchedUsers from "../components/SearchedUsers";
import SuggestedUsers from "../components/SuggestedUsers";
import useShowToast from "../hooks/useShowToast";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { FiMessageSquare } from "react-icons/fi";
import UserHeader from "../components/UserHeader";
import Post from "../components/Post";
import useGetUserProfile from "../hooks/useGetUserProfile";
import { useRecoilState } from "recoil";

const SearchPage = () => {

const { username } = useParams();
console.log("MY USER", username)

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
  }, [username]);

  return (
    <>
      <Header />
      <Footer />
    </>
  );
};

export default SearchPage;