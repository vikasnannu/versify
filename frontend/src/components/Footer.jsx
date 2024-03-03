import { Flex, IconButton, Center } from "@chakra-ui/react";
import { FiHome, FiMessageSquare, FiUser, FiSearch, FiPlus } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import CreatePost from "./CreatePost";

const Footer = () => {
  const user = useRecoilValue(userAtom);
  const location = useLocation();

  return (
    <>
        <Flex
          as="footer"
          position="fixed" // Add fixed positioning
          left="0"
          bottom="0"
          width="100%"
          bg="gray.200"
          p={[2, 4]}
          justifyContent="center"
          boxShadow="0 -2px 4px rgba(0,0,0,0.1)"
          zIndex="100" // Ensure it stays on top of other content if necessary
        >
          <Link to="/home">
            <IconButton
              aria-label="Home"
              icon={<FiHome />}
              color={location.pathname === '/home' ? "blue.600" : "blue.500"}
              bg={location.pathname === '/home' ? "blue.100" : "transparent"}
              fontSize={["20px", "24px"]}
              mr={[2, 4]}
            />
          </Link>

          <Link to="/search">
            <IconButton
              aria-label="Search"
              icon={<FiSearch />}
              color={location.pathname === '/search' ? "teal.600" : "teal.500"}
              bg={location.pathname === '/search' ? "teal.100" : "transparent"}
              fontSize={["20px", "24px"]}
              mr={[2, 4]}
            />
          </Link>

          <Link>
            <CreatePost />
          </Link>

          <Link to="/messages">
            <IconButton
              aria-label="Messages"
              icon={<FiMessageSquare />}
              color={location.pathname === '/messages' ? "purple.600" : "purple.500"}
              bg={location.pathname === '/messages' ? "purple.100" : "transparent"}
              fontSize={["20px", "24px"]}
              mr={[2, 4]}
            />
          </Link>
          
          <Link to={`/user/${user.username}`}>
            <IconButton
              aria-label="User"
              icon={<FiUser />}
              color={location.pathname === `/user/${user.username}` ? "orange.600" : "orange.500"}
              bg={location.pathname === `/user/${user.username}` ? "orange.100" : "transparent"}
              fontSize={["20px", "24px"]}
              mr={[2, 4]}
            />
          </Link>

        </Flex>
    </>
  );
};

export default Footer;
