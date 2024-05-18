import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from "@chakra-ui/react";

import axios from "axios";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const signup = () => {
  const [show, setShow] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false);
  const [picLoading, setPicLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const clickHandler = () => setShow(!show);

  const submitHandler = async () => {
    setPicLoading(true);
    if (!name || !email || !password || !phone) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const data = await fetch("http://localhost:8080/api/register", {
        method: "POST",
        headers: config.headers,
        body: JSON.stringify({
          name,
          email,
          phone,
          password,
          pic,
        }),
      });

      const response = await data.json();
      if (response.message == "User already exists") {
        toast({
          title: "User Already Exists",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
      if (response.message == "User created successfully") {
        toast({
          title: "User Created Successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });

        localStorage.setItem("userInfo", JSON.stringify(response.DB_DATA));
        navigate("/chat");
      }

      setPicLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
    }
  };

  const postDetails = (picture) => {
    console.log(picture);
    setPicLoading(true);
    if (picture === undefined) {
      toast({
        title: "Please Select an Image",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }

    if (picture.type === "image/jpeg" || picture.type === "image/png") {
      const formdata = new FormData();
      formdata.append("file", picture);
      axios
        .post("http://localhost:8080/api/upload", formdata)
        .then((response) => {
          setPic(response.data.data);
          setPicLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });

      setPicLoading(false);

      return;
    }
  };

  return (
    <VStack spacing={"5px"}>
      <FormControl id="name" isRequired={true}>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Name"
          name="name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="email" isRequired={true}>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Email"
          name="email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="phone" isRequired={true}>
        <FormLabel>Phone#</FormLabel>
        <Input
          placeholder="Phone"
          name="name"
          type="number"
          onChange={(e) => setPhone(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired={true}>
        <FormLabel>Password</FormLabel>
        <InputGroup saturate={"md"}>
          <Input
            placeholder="Password"
            name="name"
            type={show ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width={"4.5rem"}>
            <Button h={"1.75rem"} size={"sm"} onClick={clickHandler}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl>
        <FormLabel>Verify Password</FormLabel>
        <InputGroup size={"md"}>
          <Input
            placeholder="Verify Password"
            name="name"
            type={show ? "text" : "password"}
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          <InputRightElement width={"4.5rem"}>
            <Button h={"1.75rem"} size={"sm"} onClick={clickHandler}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl>
        <FormLabel>Upload Profile Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          id="fileInput"
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={picLoading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default signup;
