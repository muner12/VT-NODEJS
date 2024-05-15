import React,{useEffect} from 'react'
import Socket from '../components/Socket'
import { Box, Container ,Tab,TabList,TabPanel,TabPanels,Tabs,Text} from '@chakra-ui/react'
import Login from '../components/authenthication/login'
import Signup from '../components/authenthication/signup'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate=useNavigate();
 
  useEffect(() => {
    if(localStorage.getItem("userInfo")){
      navigate("/chats")
    }
  },[navigate])

  return (
    <Container maxW={"xl"} centerContent>
    <Box
      d="flex"
      justifyContent="center"
      p={3}
      bg="white"
      w="100%"
      m="40px 0 15px 0"
      borderRadius="lg"
      borderWidth="1px"
    >
    <Text  fontsize="4xl" fontfamily="Work sans">
      CHAT APP
    </Text>
    </Box>
    <Box w="100%" p={4} bg="white" borderRadius="lg" borderWidth={"1px"}>
      <Tabs isFitted variant={"soft-rounded"}>
        <TabList>
          <Tab>Login</Tab>
          <Tab>Sign Up</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Login/>
          </TabPanel>
          <TabPanel>
            <Signup/>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>

    </Container>
  )
}

export default Home