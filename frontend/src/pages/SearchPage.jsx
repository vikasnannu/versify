import React, { useState } from "react";
import { Box, Flex, Input, Text, IconButton } from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchedUsers from "../components/SearchedUsers";
import SuggestedUsers from "../components/SuggestedUsers";
import useShowToast from "../hooks/useShowToast";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const showToast = useShowToast();

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === "") {
      setHasSearched(false);
      setSearchResults([]);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm) return;
    setLoading(true);
    setHasSearched(true);
    try {
      const response = await fetch(`/api/users/search/${searchTerm}`);
      if (!response.ok) {
        showToast("Error", data.error, "error");
      }
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      showToast("Error", data.error, "error");
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <Header />
      <Box
        mb={{ base: "70px", md: "120px" }}
        overflow="auto"
        px={{ base: 2, md: 4 }}
      >
        <Box my={4} p={{ base: 2, md: 4 }} bg="teal.500" borderRadius="md">
          <Flex alignItems="center" justifyContent="space-between">
            <Input
              placeholder="Search for users"
              value={searchTerm}
              onChange={handleSearchInputChange}
              onKeyDown={handleKeyDown}
              variant="outline"
              borderColor="teal.200"
              _placeholder={{ color: "black", opacity: 0.7 }}
              _hover={{ borderColor: "teal.300" }}
              _focus={{ borderColor: "teal.300" }}
              color="teal.200"
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
                onClick={handleSearch}
                ml={4}
              />
            </Link>
          </Flex>
        </Box>
        {loading && (
          <Text fontWeight="bold" color="teal.500" textAlign="center">
            Loading...
          </Text>
        )}
        {!loading && hasSearched && searchResults.length === 0 && (
          <Box mb={6}>
            <Text fontWeight="bold" color="red.500" textAlign="center">
              No users found
            </Text>
          </Box>
        )}
        {!loading && searchResults.length > 0 && (
          <Box mb={6}>
            <Text fontWeight="bold" color="teal.500" textAlign="center">
              Search Results
            </Text>
            <SearchedUsers users={searchResults} />
          </Box>
        )}
        {!hasSearched && (
          <Box mb={6}>
            <Text fontWeight="bold" color="teal.500" textAlign="center">
              Discover New Users
            </Text>
            <SuggestedUsers />
          </Box>
        )}
      </Box>
      <Footer />
    </>
  );
};

export default SearchPage;