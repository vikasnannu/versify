import { Box, Container } from "@chakra-ui/react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import CreatePost from "./components/CreatePost";


import LandingPage from "./pages/LandingPage";
// import AboutUsPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignupPage";

import UserPage from "./pages/UserPage";
import SearchPage from "./pages/SearchPage";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";
import FollowersPage from "./pages/FollowersPage";

import UpdateProfilePage from "./pages/UpdateProfilePage";
import ChatPage from "./pages/ChatPage";
import SettingsPage from "./pages/SettingsPage";
import NotFoundPage from "./pages/NotFoundPage";

import { useRecoilValue } from "recoil";
import userAtom from "./atoms/userAtom";

import PrivateRoute from "./middleware/PrivateRoute";
import { CgLogIn } from "react-icons/cg";

function App() {
	const user = useRecoilValue(userAtom);
	console.log("USER", user);
	const { pathname } = useLocation();
	return (
		<Box position={"relative"} w='full'>
			<Container maxW={ pathname === "/" ? { base: "95%", sm: "720px", md: "900px", lg: "1080px", xl: "1380px" } : "720px" }>
				
				<Routes>
					{/* Public Routes */}
					<Route path='/' element={!user ? <LandingPage /> : <Navigate to='/home' />} />
					<Route path='/signup' element={!user ? <SignUpPage /> : <Navigate to='/home' />} />
					<Route path='/login' element={!user ? <LoginPage /> : <Navigate to='/home' />} />

					{/* Private Routes */}
					<Route path='/home' element={user ? <HomePage /> : <Navigate to='/login' />} />
					<Route path='/search' element={user ? <SearchPage />: <Navigate to='/login' />} />
					<Route path='/user/:username' element={user ? <UserPage />: <Navigate to='/login' />} />
					<Route path='/abc' element={user ? <CreatePost />: <Navigate to='/login' />} />
					<Route path='/:username/post/:pid' element = {user ? <PostPage />: <Navigate to='/login' />} />
					<Route path='/tunning/:username' element = {user ? <FollowersPage />: <Navigate to='/login' />} />
					{/* <Route
						path='/:username'
						element={
							user ? (
								<>
									<UserPage />
									<CreatePost />
								</>
							) : (
								<UserPage />
							)
						}
					/>
					<Route path='/:username/post/:pid' element={<PostPage />} />
					<Route path='/chat' element={user ? <ChatPage /> : <Navigate to={"/auth"} />} />
					<Route path='/settings' element={user ? <SettingsPage /> : <Navigate to={"/auth"} />} /> */}
				</Routes>
			</Container>
		</Box>
	);
}

export default App;