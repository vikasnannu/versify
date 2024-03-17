import {
	Flex,
	Box,
	Button,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	InputRightElement,
	Stack,
	Heading,
	Text,
  } from "@chakra-ui/react";
  import { useState } from "react";
  import { Link as RouterLink } from "react-router-dom";
  import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
  import { useSetRecoilState } from "recoil";
  import userAtom from "../atoms/userAtom";
  
  const LoginCard = () => {
	const [showPassword, setShowPassword] = useState(false);
	const setUser = useSetRecoilState(userAtom);
	const [loading, setLoading] = useState(false);
	const [inputs, setInputs] = useState({
	  username: "",
	  password: "",
	});
  
	const handleLogin = async () => {
	  setLoading(true);
	  try {
		const res = await fetch("/api/users/login", {
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
	  } catch (error) {
		showToast("Error", error.toString(), "error");
	  } finally {
		setLoading(false);
	  }
	};
  
	return (
	  <>
		<Flex
		  align="center"
		  justify="center"
		  minHeight={{ base: "80vh", md: "60vh" }}
		>
		  <Stack
			spacing={8}
			mx="auto"
			w={{ base: "90%", sm: "480px" }}
			py={12}
			px={6}
		  >
			<Stack align="center">
			  <Heading
				fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
				color= "gray.700"
				textAlign="center"
			  >
				Sign In Your Account
			  </Heading>
			  <Text
				fontSize={{ base: "sm", md: "md", lg: "lg" }}
				color="teal.600"
				textAlign="center"
				fontWeight="medium"
				mt={{ base: 2, md: 4 }}
			  >
				Enter your details below
			  </Text>
			</Stack>
			<Box
			  rounded="lg"
			  bg="white"
			  boxShadow="xl"
			  p={8}
			  border="2px solid"
			  borderColor="teal.500"
			  borderRadius="md"
			>
			  <Stack spacing={4}>
				<FormControl id="username" isRequired>
				  <FormLabel>Username</FormLabel>
				  <Input
					type="text"
					value={inputs.username}
					onChange={(e) =>
					  setInputs({ ...inputs, username: e.target.value })
					}
					maxLength={20}
				  />
				</FormControl>
				<FormControl id="password" isRequired>
				  <FormLabel>Password</FormLabel>
				  <InputGroup>
					<Input
					  type={showPassword ? "text" : "password"}
					  value={inputs.password}
					  onChange={(e) =>
						setInputs({ ...inputs, password: e.target.value })
					  }
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
					size="lg"
					bg="teal.400"
					color="white"
					_hover={{ bg: "teal.500" }}
					onClick={handleLogin}
					isLoading={loading}
					loadingText="Logging in"
					w="full"
				  >
					Log In
				  </Button>
				</Stack>
  
				<Stack pt={4}>
				  <Text align="center">
					Dont have an Account?{" "}
					<Button
					  as={RouterLink}
					  to="/signup"
					  size="md"
					  bg="teal.600"
					  color="white"
					  _hover={{ bg: "teal.700" }}
					  _active={{ bg: "teal.800" }}
					  borderRadius="full"
					  transition="all 0.3s ease"
					>
					  Signup
					</Button>
				  </Text>
				</Stack>
			  </Stack>
			</Box>
		  </Stack>
		</Flex>
	  </>
	);
  };
  
  export default LoginCard;  