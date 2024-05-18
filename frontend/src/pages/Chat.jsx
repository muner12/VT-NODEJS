import React, { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import SideDrawer from "../components/mesc/SideDrawer";
import { chatState } from "../context/chatProvider";
import { Box } from "@chakra-ui/react";
import MyChats from "../components/mesc/MyChats";
import ChatBox from "../components/mesc/ChatBox";
const Chat = () => {
  const { user } = chatState();
  const socket = useMemo(() => io("http://localhost:8080"));
  const [data, setData] = useState([]);

  useEffect(() => {
    socket.on("connection", (socket) => {
      console.log("a user connected--->", socket.id);
    });
  }, []);
  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="91.5vh"
        p="10px"
      >
        {user && <MyChats />}
        {user && <ChatBox />}
      </Box>
    </div>
  );
};

export default Chat;
