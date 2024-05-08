import React, { useState } from 'react'
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    VStack,
  } from "@chakra-ui/react";
const login = () => {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleClick = () => setShow(!show);
  return (
    <VStack spacing={"5px"}>

  
    <FormControl isRequired={true}>
      <FormLabel>Email</FormLabel>
      <Input placeholder="Email" name="email" type="email" onChange={(e)=>setEmail(e.target.value)} />
    </FormControl>
   
    <FormControl isRequired={true}>
      <FormLabel>Password</FormLabel>
      <InputGroup saturate={"md"}>
        <Input
          placeholder="Password"
          
          type={show ? "text" : "password"}
          onChange={(e)=>setPassword(e.target.value)}
        />
        <InputRightElement width={"4.5rem"}>
          <Button h={"1.75rem"} size={"sm"} onClick={handleClick}>
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
    </FormControl>
  
    <Button
      colorScheme="blue"
      width="100%"
      style={{ marginTop: 15 }}
     
    >
      Login
    </Button>
  </VStack>
  )
}

export default login