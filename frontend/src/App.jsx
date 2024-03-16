import { Box, Container } from "@chakra-ui/react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";

// Public Pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Aboutus from "./pages/AboutusPage";
import NotFoundPage from "./pages/NotFoundPage";

// Private Pages
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import ChatPage from "./pages/ChatPage";
import UserPage from "./pages/UserPage";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import FollowersPage from "./pages/FollowersPage";
import FollowingPage from "./pages/FollowingPage";
import PostPage from "./pages/PostPage";

// Data Centre
import { useRecoilValue } from "recoil";
import userAtom from "./atoms/userAtom";

function App() {
  const user = useRecoilValue(userAtom);
  const { pathname } = useLocation();

  return (
    <Box position={"relative"} w="full">
      <Container
        maxW={
          pathname === "/"
            ? {
                base: "95%",
                sm: "720px",
                md: "900px",
                lg: "1080px",
                xl: "1380px",
              }
            : "720px"
        }
      >
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={!user ? <LandingPage /> : <Navigate to="/home" />}
          />
          <Route
            path="/login"
            element={!user ? <LoginPage /> : <Navigate to="/home" />}
          />
          <Route
            path="/signup"
            element={!user ? <SignupPage /> : <Navigate to="/home" />}
          />
		  <Route
            path="/about"
            element={!user ? <Aboutus /> : <Navigate to="/home" />}
          />

          {/* Private Routes */}
          <Route
            path="/home"
            element={user ? <HomePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/search"
            element={user ? <SearchPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/chat"
            element={user ? <ChatPage /> : <Navigate to="/login" />}
          />

          <Route
            path="/user/:username"
            element={user ? <UserPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/:username/update"
            element={user ? <UpdateProfilePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/tunning/:username"
            element={user ? <FollowersPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/listening/:username"
            element={user ? <FollowingPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/:username/post/:pid"
            element={user ? <PostPage /> : <Navigate to="/login" />}
          />

          <Route
            path="*"
            element={
              user ? (
                <>
                  {" "}
                  <NotFoundPage /> <Footer />{" "}
                </>
              ) : (
                <NotFoundPage />
              )
            }
          />
        </Routes>
      </Container>
    </Box>
  );
}

export default App;