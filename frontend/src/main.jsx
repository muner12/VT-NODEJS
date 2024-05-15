import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as BrowserRoute } from "react-router-dom";
import ChatProvider from "./context/chatProvider.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <>
  <BrowserRoute>
    <ChatProvider>
        <ChakraProvider>
          <App />
        </ChakraProvider>
        </ChatProvider>
      </BrowserRoute>
   
  </>
);
