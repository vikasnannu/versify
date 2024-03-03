import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom"; 

import Header from "./../components/Header";

const NotFoundPage = () => {
    return (

        <>
        <Header/>
        <Flex
            direction="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            p={4} 
            textAlign="center"
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            color="white"
        >
            <Box maxWidth="xl" px={4}> // Limit the maximum width and add padding
                <Text fontSize={{ base: '4xl', md: '6xl' }} fontWeight="bold" mb={3}>
                    404
                </Text>
                <Text fontSize={{ base: 'xl', md: '2xl' }} mb={5}>
                    Page Not Found
                </Text>
                <Text fontSize={{ base: 'md', md: 'xl' }} mb={8}>
                    The page you're looking for does not seem to exist
                </Text>
                <Button colorScheme="pink" variant="solid" as={Link} to="/">
                    Go Home
                </Button>
            </Box>
        </Flex>
        </>
    );
};

export default NotFoundPage;