"use client";

import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  useDisclosure,
  Stack,
  Input,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { debounce } from "lodash";

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const fetchProducts = debounce(async (query) => {
    if (!query) return;
    try {
      const response = await axios.get(
        `http://localhost:8080/api/products/search?keyword=${query}`
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, 500);

  const handleChange = (e) => {
    const query = e.target.value;
    setKeyword(query);
    fetchProducts(query);
  };

  return (
    <Box px={4} width={"100%"} bg={"gray.200"}>
      <Flex
        h={16}
        bgColor={"gray.200"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <IconButton
          size={"md"}
          icon={isOpen ? "close" : "menu"}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={"center"}>
          <Box>Logo</Box>
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            <Link to={"/"}>Home</Link>
            <Link to={"/products"}>Products</Link>
            <Link to={"/about"}>About</Link>
          </HStack>
        </HStack>
        <Flex alignItems={"center"}>
          <Input
            placeholder="Search"
            size="sm"
            maxW="sm"
            margin={4}
            variant="subtle"
            value={keyword}
            onChange={handleChange}
          />
          <Button
            variant={"solid"}
            colorScheme={"teal"}
            size={"sm"}
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={4}>
            <Link to={"/"}>Home</Link>
            <Link to={"/products"}>Products</Link>
            <Link to={"/about"}>About</Link>
          </Stack>
        </Box>
      ) : null}
      <Outlet />
    </Box>
  );
}
