import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/theme-utils";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { SocketContextProvider } from "./context/SocketContext.jsx";

const styles = {
  global: () => ({
    body: {
      color: "grey.800",
      bg: "yellow.50",
    },
  }),
};

const theme = extendTheme({ styles });

function LoadingIndicator() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <p>Loading...</p>
    </div>
  );
}

function Root() {
  console.log("Context Setting....");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return loading ? (
    <LoadingIndicator />
  ) : (
    <RecoilRoot>
      <BrowserRouter>
        <ChakraProvider theme={theme}>
          <SocketContextProvider>
            <App />
          </SocketContextProvider>
        </ChakraProvider>
      </BrowserRouter>
    </RecoilRoot>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);