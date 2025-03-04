"use client";

import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  useDisclosure,
  Stack,
  Input,
  List,
  ListItem,
  Text,
  Image,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { debounce } from "lodash";

export const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [keyword, setKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [imageUrls, setImageUrls] = useState({});
  const navigate = useNavigate();

  const fetchProducts = debounce(async (query) => {
    if (!query) {
      setSearchResults([]);
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:8080/api/products/search?keyword=${query}`
      );
      setSearchResults(response.data);

      response.data.forEach((product) => {
        fetchImage(product.id);
      });
    } catch (error) {
      console.error("Error fetching products:", error);
      setSearchResults([]);
    }
  }, 500);

  const fetchImage = async (productId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/product/${productId}/image`,
        { responseType: "blob" }
      );
      const objectURL = URL.createObjectURL(response.data);
      setImageUrls((prev) => ({ ...prev, [productId]: objectURL }));
    } catch (error) {
      console.error(`Error fetching image for product ${productId}:`, error);
      setImageUrls((prev) => ({ ...prev, [productId]: "/placeholder.jpg" })); // Use default image on error
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const query = e.target.value;
    setKeyword(query);
    fetchProducts(query);
  };

  // Handle search selection
  const handleSelect = (productId) => {
    navigate(`/product-details/${productId}`);
    setKeyword(""); // Clear search input
    setSearchResults([]); // Hide dropdown
  };

  return (
    <Box px={4} width={"100%"} bg={"gray.200"} position="relative">
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
        <Flex alignItems={"center"} position="relative">
          <Input
            placeholder="Search"
            size="sm"
            maxW="sm"
            margin={4}
            variant="subtle"
            value={keyword}
            onChange={handleChange}
            onBlur={() => setTimeout(() => setSearchResults([]), 200)} // Close dropdown on blur
          />
          {searchResults.length > 0 && (
            <Box
              position="absolute"
              top="100%"
              left={4}
              bg="white"
              boxShadow="md"
              width="300px"
              borderRadius="md"
              zIndex="10"
              maxH="250px"
              overflowY="auto"
            >
              <List spacing={1}>
                {searchResults.map((product) => (
                  <ListItem
                    key={product.id}
                    display="flex"
                    alignItems="center"
                    gap={3}
                    p={2}
                    maxW={"sm"}
                    _hover={{ bg: "gray.100", cursor: "pointer" }}
                    onMouseDown={() => handleSelect(product.id)}
                  >
                    <Image
                      src={imageUrls[product.id] || "/placeholder.jpg"}
                      alt={product.name}
                      boxSize="50px"
                      objectFit="cover"
                    />
                    <Box>
                      <Text fontWeight="bold">{product.name}</Text>
                      <Text fontSize="sm" color="gray.500">
                        {product.category}
                      </Text>
                    </Box>
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
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
};
