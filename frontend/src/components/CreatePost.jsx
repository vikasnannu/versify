import { IconButton, useBreakpointValue } from "@chakra-ui/react";
import { FiPlus, FiImage } from "react-icons/fi";
import {
  Button,
  Box,
  CloseButton,
  Flex,
  FormControl,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import usePreviewImg from "../hooks/usePreviewImg";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import useShowToast from "../hooks/useShowToast";
import postsAtom from "../atoms/postsAtom";
import { useParams } from "react-router-dom";

const MAX_CHAR = 500;

const CreatePost = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [postText, setPostText] = useState("");
  const { handleImageChange, imgUrl, setImgUrl } = usePreviewImg();
  const imageRef = useRef(null);
  const [remainingChar, setRemainingChar] = useState(MAX_CHAR);
  const user = useRecoilValue(userAtom);
  const showToast = useShowToast();
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useRecoilState(postsAtom);
  const { username } = useParams();

  const modalSize = useBreakpointValue({ base: "md", sm: "lg", lg: "xl" });
  const modalMargin = useBreakpointValue({ base: "4", md: "0" });
  const buttonSize = useBreakpointValue({ base: "sm", md: "md" });

  const handleTextChange = (e) => {
    const inputText = e.target.value;
    if (inputText.length > MAX_CHAR) {
      const truncatedText = inputText.slice(0, MAX_CHAR);
      setPostText(truncatedText);
      setRemainingChar(0);
    } else {
      setPostText(inputText);
      setRemainingChar(MAX_CHAR - inputText.length);
    }
  };

  const handleCreatePost = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/posts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postedBy: user._id,
          text: postText,
          img: imgUrl,
        }),
      });

      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      showToast("Success", "Post created successfully", "success");
      if (username === user.username) {
        setPosts([data, ...posts]);
      }
      onClose();
      setPostText("");
      setImgUrl("");
    } catch (error) {
      showToast("Error", error, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <IconButton
        aria-label="Add post"
        icon={<FiPlus />}
        color="red.500"
        fontSize={{ base: "20px", md: "24px" }}
        mr={{ base: 2, md: 4 }}
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose} size={modalSize} isCentered>
        <ModalOverlay />
        <ModalContent m={modalMargin}>
          <ModalHeader
            fontSize={{ base: "xl", md: "2xl" }}
            color="teal.600"
            p={2}
            borderRadius="md"
            textAlign="center"
          >
            Create Verse
          </ModalHeader>

          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Textarea
                placeholder="Verse content goes here.."
                onChange={handleTextChange}
                value={postText}
                size="md"
                fontSize="md"
                color="teal.700"
                borderColor="teal.300"
                _hover={{ borderColor: "teal.500" }}
                _focus={{
                  borderColor: "teal.600",
                  boxShadow: "0 0 0 1px teal.600",
                }}
                p={3}
                borderRadius="md"
                boxShadow="sm"
              ></Textarea>

              <Text
                fontSize={{ base: "xs", md: "sm" }}
                fontWeight="bold"
                textAlign="right"
                m="1"
                color="gray.800"
              >
                {remainingChar}/{MAX_CHAR}
              </Text>
              <Input
                type="file"
                hidden
                ref={imageRef}
                onChange={handleImageChange}
              />
            </FormControl>

            {!imgUrl && (
              <Box cursor="pointer" color="teal.500" mt={4}>
                <FiImage size={24} onClick={() => imageRef.current.click()} />
                <Input
                  type="file"
                  hidden
                  ref={imageRef}
                  onChange={handleImageChange}
                />
              </Box>
            )}

            {imgUrl && (
              <Flex
                mt={{ base: 3, md: 5 }}
                w="full"
                position="relative"
                align="center"
                justify="center"
              >
                <Image
                  src={imgUrl}
                  alt="Selected img"
                  maxW="full"
                  maxH={{ base: "300px", md: "400px" }}
                  objectFit="contain"
                />
                <CloseButton
                  onClick={() => setImgUrl("")}
                  bg="red.600"
                  color="white"
                  position="absolute"
                  top={2}
                  right={2}
                  size="lg"
                />
              </Flex>
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="teal"
              mr={3}
              onClick={handleCreatePost}
              isLoading={loading}
              size={buttonSize}
              _hover={{ bg: "teal.600", boxShadow: "md" }}
              shadow="sm"
              fontWeight="bold"
            >
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePost;