import { Box, Text, Flex } from "@chakra-ui/react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchedUsers from "../components/SearchedUsers";
import useShowToast from "../hooks/useShowToast";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SearchPage = () => {
  const { username } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const showToast = useShowToast();

  useEffect(() => {
    const handleSearch = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/users/listening/${username}`);
        if (!response.ok) {
          const data = await response.json();
          showToast("Error", data.error, "error");
        } else {
          const data = await response.json();
          setSearchResults(data);
        }
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setLoading(false);
      }
    };

    handleSearch();
  }, []);

  return (
    <>
      <Header />
      <Box
        mb={{ base: "70px", md: "120px" }}
        overflow="auto"
        px={{ base: 2, md: 4 }}
      >
        <Box flex="1" p="4" overflowY="auto">
          {loading && (
            <Box display="flex" justifyContent="center">
            <Text fontWeight="bold" color="teal.500" textAlign="center">
              Loading...
            </Text>
          </Box>
          )}
          {!loading && searchResults.length === 0 && (
            <Box my="6" textAlign="center">
              <Text fontWeight="bold" color="red.500" fontSize="lg">
                No, Listeners Found :(
              </Text>
              <Text mt="2" color="gray.600">
                It seems there are currently no listeners for this profile.
              </Text>
            </Box>
          )}
          {!loading && searchResults.length > 0 && (
            <Box my="6">
              <Flex justify="center" align="center" mb="4">
                <Text fontWeight="bold" color="teal.500" mr="2">
                  Listeners
                </Text>
                <Box bg="teal" color="white" borderRadius="md" px="2">
                  {searchResults.length}
                </Box>
              </Flex>
              <Box mb="6">
                <SearchedUsers users={searchResults} />
              </Box>
            </Box>
          )}
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default SearchPage;
