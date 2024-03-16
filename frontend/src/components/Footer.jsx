import { Flex, IconButton } from "@chakra-ui/react";
import { FiHome, FiMessageSquare, FiUser, FiSearch } from "react-icons/fi";
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
        position="fixed"
        left="0"
        bottom="0"
        width="100%"
        bg="yellow.50"
        p={[2, 4]}
        justifyContent="center"
        boxShadow="0 -1px 2px teal"
        zIndex="100"
      >
        <Link to="/home">
          <IconButton
            aria-label="Home"
            icon={<FiHome />}
            color={location.pathname === "/home" ? "blue.600" : "blue.500"}
            bg={location.pathname === "/home" ? "blue.100" : "transparent"}
            fontSize={["20px", "24px"]}
            mr={[2, 4]}
          />
        </Link>

        <Link to="/search">
          <IconButton
            aria-label="Search"
            icon={<FiSearch />}
            color={location.pathname === "/search" ? "teal.600" : "teal.500"}
            bg={location.pathname === "/search" ? "teal.100" : "transparent"}
            fontSize={["20px", "24px"]}
            mr={[2, 4]}
          />
        </Link>

        <Link>
          <CreatePost />
        </Link>

        <Link to="/chat">
          <IconButton
            aria-label="Messages"
            icon={<FiMessageSquare />}
            color={location.pathname === "/chat" ? "purple.600" : "purple.500"}
            bg={location.pathname === "/chat" ? "purple.100" : "transparent"}
            fontSize={["20px", "24px"]}
            mr={[2, 4]}
          />
        </Link>

        <Link to={`/user/${user.username}`}>
          <IconButton
            aria-label="User"
            icon={<FiUser />}
            color={
              location.pathname === `/user/${user.username}`
                ? "orange.600"
                : "orange.500"
            }
            bg={
              location.pathname === `/user/${user.username}`
                ? "orange.100"
                : "transparent"
            }
            fontSize={["20px", "24px"]}
            mr={[2, 4]}
          />
        </Link>
      </Flex>
    </>
  );
};

export default Footer;