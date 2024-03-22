import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	InputRightElement,
	Stack,
	Button,
	Heading,
	Text,
  } from "@chakra-ui/react";
  import { useState } from "react";
  import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
  import { Link as RouterLink, Navigate } from "react-router-dom";
  import { useSetRecoilState } from "recoil";
  import useShowToast from "../hooks/useShowToast";
  import userAtom from "../atoms/userAtom";
  
  const SignupCard = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [inputs, setInputs] = useState({
	  name: "",
	  username: "",
	  email: "",
	  password: "",
	});
  
	const showToast = useShowToast();
	const setUser = useSetRecoilState(userAtom);
  
	const handleSignup = async () => {
	  try {
		const res = await fetch("/api/users/signup", {
		  method: "POST",
		  headers: {
			"Content-Type": "application/json",
		  },
		  body: JSON.stringify(inputs),
		});
		const data = await res.json();
  
		if (data.error) {
		  showToast("Error", data.error, "error");
		  return;
		}
  
		localStorage.setItem("user-threads", JSON.stringify(data));
		setUser(data);
		showToast("Success", "Signed Up Succesfully", "success");
		<Navigate to="/home" />;
	  } catch (error) {
		showToast("Error", error, "error");
	  }
	};
  
	return (
	  <Flex
		align="center"
		justify="center"
		minHeight={{ base: "auto", md: "60vh" }}
	  >
		<Stack
		  spacing={5}
		  mx="auto"
		  w={{ base: "90%", sm: "80%", md: "60%", lg: "480px" }}
		  py={{ base: 6, md: 12 }}
		  px={6}
		>
		  <Stack align="center">
			<Heading
			  fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
			  color={"gray.700"}
			  textAlign="center"
			>
			  Create Your Account
			</Heading>
			<Text
			  fontSize={{ base: "sm", md: "md", lg: "lg" }}
			  color={"teal.600"}
			  textAlign="center"
			  fontWeight="medium"
			  mt={{ base: 2, md: 4 }}
			>
			  Join us and start your journey
			</Text>
		  </Stack>
		  <Box
			rounded="lg"
			bg={"white"}
			boxShadow="xl"
			border="2px solid"
			borderColor="teal.500"
			borderRadius="md"
			p={{ base: 4, md: 8 }}
		  >
			<Stack spacing={4}>
			  <Stack
				direction={{ base: "column", sm: "row" }}
				spacing={{ base: 4, sm: 2 }}
			  >
				<FormControl isRequired>
				  <FormLabel>Full name</FormLabel>
				  <Input
					type="text"
					onChange={(e) =>
					  setInputs({ ...inputs, name: e.target.value })
					}
					value={inputs.name}
					maxLength={10}
				  />
				</FormControl>
				<FormControl isRequired>
				  <FormLabel>Username</FormLabel>
				  <Input
					type="text"
					onChange={(e) =>
					  setInputs({ ...inputs, username: e.target.value })
					}
					value={inputs.username}
					maxLength={20}
				  />
				</FormControl>
			  </Stack>
			  <FormControl isRequired>
				<FormLabel>Email address</FormLabel>
				<Input
				  type="email"
				  onChange={(e) =>
					setInputs({ ...inputs, email: e.target.value })
				  }
				  value={inputs.email}
				  maxLength={30}
				/>
			  </FormControl>
			  <FormControl isRequired>
				<FormLabel>Password</FormLabel>
				<InputGroup>
				  <Input
					type={showPassword ? "text" : "password"}
					onChange={(e) =>
					  setInputs({ ...inputs, password: e.target.value })
					}
					value={inputs.password}
					maxLength={20}
				  />
				  <InputRightElement h="full">
					<Button
					  variant="ghost"
					  onClick={() => setShowPassword(!showPassword)}
					>
					  {showPassword ? <ViewOffIcon /> : <ViewIcon />}
					</Button>
				  </InputRightElement>
				</InputGroup>
			  </FormControl>
			  <Stack spacing={6} pt={2}>
				<Button
				  loadingText="Submitting"
				  size="lg"
				  bg="teal.400"
				  color="white"
				  _hover={{ bg: "teal.500" }}
				  onClick={handleSignup}
				  w="full"
				>
				  Sign Up
				</Button>
			  </Stack>
			  <Stack pt={4}>
				<Text align="center">
				  Already have an account?{" "}
				  <Button
					as={RouterLink}
					to="/login"
					size="md"
					bg="teal.600"
					color="white"
					_hover={{ bg: "teal.700" }}
					_active={{ bg: "teal.800" }}
					borderRadius="full"
					transition="all 0.3s ease"
				  >
					Login
				  </Button>
				</Text>
			  </Stack>
			</Stack>
		  </Box>
		</Stack>
	  </Flex>
	);
  };
  
  export default SignupCard;  