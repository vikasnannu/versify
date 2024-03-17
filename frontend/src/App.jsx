import React, { Suspense } from "react";
import { Box, Text, Container } from "@chakra-ui/react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";

// Public Pages
const LandingPage = React.lazy(() => import("./pages/LandingPage"));
const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const SignupPage = React.lazy(() => import("./pages/SignupPage"));
const AboutusPage = React.lazy(() => import("./pages/AboutusPage")); // Corrected import
const NotFoundPage = React.lazy(() => import("./pages/NotFoundPage"));

// Private Pages
const HomePage = React.lazy(() => import("./pages/HomePage"));
const SearchPage = React.lazy(() => import("./pages/SearchPage"));
const ChatPage = React.lazy(() => import("./pages/ChatPage"));
const UserPage = React.lazy(() => import("./pages/UserPage"));
const UpdateProfilePage = React.lazy(() => import("./pages/UpdateProfilePage"));
const FollowersPage = React.lazy(() => import("./pages/FollowersPage"));
const FollowingPage = React.lazy(() => import("./pages/FollowingPage"));
const PostPage = React.lazy(() => import("./pages/PostPage"));

// Data Centre
import { useRecoilValue } from "recoil";
import userAtom from "./atoms/userAtom";

function App() {
  const user = useRecoilValue(userAtom);
  const { pathname } = useLocation();

  console.log("CAME IN APP")

  return (
    <>
    <Suspense
      fallback={
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
          flexDirection="column"
        >
          <Box>
            <Text fontWeight="bold" color="teal.500" textAlign="center">
              Loading Page...
            </Text>
          </Box>
          <Box>
            <Text
              fontWeight="bold"
              fontStyle="italic"
              color="teal.600"
              textAlign="center"
            >
              Please Wait!
            </Text>
          </Box>
        </Box>
      }
    >
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
              element={!user ? <AboutusPage /> : <Navigate to="/home" />}
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
    </Suspense>
    </>
  );
}

export default App;