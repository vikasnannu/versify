import {
	Button,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Stack,
	Avatar,
	Center,
	Box,
  } from "@chakra-ui/react";
  import { useRef, useState } from "react";
  import { useRecoilState } from "recoil";
  import userAtom from "../atoms/userAtom";
  import usePreviewImg from "../hooks/usePreviewImg";
  import useShowToast from "../hooks/useShowToast";
  
  import Header from "../components/Header";
  import Footer from "../components/Footer";
  
  export default function UpdateProfilePage() {
	const [user, setUser] = useRecoilState(userAtom);
	const [inputs, setInputs] = useState({
	  name: user.name,
	  username: user.username,
	  email: user.email,
	  bio: user.bio,
	  password: "",
	});
	const fileRef = useRef(null);
	const [updating, setUpdating] = useState(false);
  
	const showToast = useShowToast();
  
	const { handleImageChange, imgUrl } = usePreviewImg();
  
	const handleSubmit = async (e) => {
	  e.preventDefault();
	  if (updating) return;
	  setUpdating(true);
	  try {
		const res = await fetch(`/api/users/update/${user._id}`, {
		  method: "PUT",
		  headers: {
			"Content-Type": "application/json",
		  },
		  body: JSON.stringify({ ...inputs, profilePic: imgUrl }),
		});
		const data = await res.json(); // updated user object
		if (data.error) {
		  showToast("Error", data.error, "error");
		  return;
		}
		showToast("Success", "Profile updated successfully", "success");
		setUser(data);
		localStorage.setItem("user-threads", JSON.stringify(data));
	  } catch (error) {
		showToast("Error", error, "error");
	  } finally {
		setUpdating(false);
	  }
	};
  
	return (
	  <>
		<Header />
		<form onSubmit={handleSubmit}>
		  <Flex align="center" justify="center" my={6}>
			<Stack
			  spacing={4}
			  w="full"
			  maxW="md"
			  bg={"teal.50"}
			  rounded="xl"
			  boxShadow="lg"
			  p={6}
			>
			  <Heading
				lineHeight={1.1}
				fontSize={{ base: "2xl", sm: "3xl" }}
				color="teal.600"
			  >
				User Profile Edit
			  </Heading>
			  <FormControl id="userName">
				<Stack direction={["column", "row"]} spacing={6}>
				  <Center>
					<Box border="4px" borderColor="black" borderRadius="full">
					  <Avatar
						size="xl"
						boxShadow="md"
						src={
						  imgUrl || user.profilePic || "/default-profile-pic.jpg"
						}
					  />
					</Box>
				  </Center>
				  <Center w="full">
					<Button
					  w="full"
					  colorScheme="teal"
					  onClick={() => fileRef.current.click()}
					>
					  Change Avatar
					</Button>
					<Input
					  type="file"
					  hidden
					  ref={fileRef}
					  onChange={handleImageChange}
					/>
				  </Center>
				</Stack>
			  </FormControl>
			  <FormControl>
				<FormLabel>Full name</FormLabel>
				<Input
				  placeholder="John Doe"
				  value={inputs.name}
				  onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
				  _placeholder={{ color: "gray.500" }}
				  type="text"
				  focusBorderColor="teal.800"
				  borderColor="teal.400"
				/>
			  </FormControl>
			  <FormControl>
				<FormLabel>User name</FormLabel>
				<Input
				  placeholder="johndoe"
				  value={inputs.username}
				  onChange={(e) =>
					setInputs({ ...inputs, username: e.target.value })
				  }
				  _placeholder={{ color: "gray.500" }}
				  type="text"
				  isReadOnly
				  focusBorderColor="blue.400"
				  bg="teal"
				  color="white"
				  cursor="default"
				/>
			  </FormControl>
			  <FormControl>
				<FormLabel>Email address</FormLabel>
				<Input
				  placeholder="your-email@example.com"
				  value={inputs.email}
				  onChange={(e) =>
					setInputs({ ...inputs, email: e.target.value })
				  }
				  _placeholder={{ color: "gray.500" }}
				  type="email"
				  isReadOnly
				  focusBorderColor="blue.400"
				  bg="teal"
				  color="white"
				  cursor="default"
				/>
			  </FormControl>
			  <FormControl>
				<FormLabel>Bio</FormLabel>
				<Input
				  placeholder="Your bio. (Max 200 Words)"
				  value={inputs.bio}
				  onChange={(e) => setInputs({ ...inputs, bio: e.target.value })}
				  _placeholder={{ color: "gray.500" }}
				  type="text"
				  focusBorderColor="teal.400"
				  maxLength={200}
				/>
			  </FormControl>
			  <FormControl>
				<FormLabel>Password</FormLabel>
				<Input
				  placeholder="Password"
				  value={inputs.password}
				  onChange={(e) =>
					setInputs({ ...inputs, password: e.target.value })
				  }
				  _placeholder={{ color: "gray.500" }}
				  type="password"
				  focusBorderColor="teal.400"
				  maxLength={20}
				/>
			  </FormControl>
			  <Stack spacing={6} direction={["column", "row"]}>
				<Button
				  bg={"red.400"}
				  color={"white"}
				  _hover={{
					bg: "red.500",
				  }}
				  w="full"
				>
				  Cancel
				</Button>
				<Button
				  bg={"teal.400"}
				  color={"white"}
				  _hover={{
					bg: "teal.500",
				  }}
				  w="full"
				  type="submit"
				  isLoading={updating}
				>
				  Submit
				</Button>
			  </Stack>
			</Stack>
		  </Flex>
		</form>
		<Footer />
	  </>
	);
  }  