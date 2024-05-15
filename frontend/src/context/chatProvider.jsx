import { createContext, useEffect, useState ,useContext} from "react";
import { useNavigate } from "react-router-dom";



const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const [user,setUser]=useState();
    const navigate=useNavigate();
    
    useEffect(() => {
        const userinfo=JSON.parse(localStorage.getItem("userInfo"))
        setUser(userinfo)
        if(!userinfo){
            navigate("/")
        }

    },[navigate])
    return (
        <ChatContext.Provider value={{user,setUser}}>
        {
            children
        }
        </ChatContext.Provider>
    );
}

export const chatState = () => {
    return useContext(ChatContext)
}

export default ChatProvider