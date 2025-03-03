import {
  Box,
  Image,
  Text,
  Button,
  VStack,
  Badge,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const ProductPageCard = ({ product }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let objectURL;

    if (product?.id) {
      axios
        .get(`http://localhost:8080/api/product/${product.id}/image`, {
          responseType: "blob",
        })
        .then((response) => {
          objectURL = URL.createObjectURL(response.data);
          setImageUrl(objectURL);
        })
        .catch((error) => {
          console.error("Error fetching image:", error);
          setImageUrl("/placeholder.jpg");
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }

    return () => {
      if (objectURL) URL.revokeObjectURL(objectURL);
    };
  }, [product?.id]);

  return (
    <Box
      display="flex"
      flexDirection={{ base: "column", md: "row" }}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      shadow="md"
      bg="white"
      w="100%"
      maxW="6xl"
      mx="auto"
    >
      <Box
        position="relative"
        boxSize={{ base: "100%", md: "200px" }}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {loading && <Spinner size="lg" color="blue.500" position="absolute" />}
        <Image
          src={imageUrl || "/placeholder.jpg"}
          alt={product.title}
          boxSize={{ base: "100%", md: "200px" }}
          objectFit="contain"
          fallbackSrc="/placeholder.jpg"
          onClick={() => navigate(`/product-details/${product.id}`)}
          cursor="pointer"
        />
      </Box>
      <VStack align="start" flex="1" p={4} spacing={2}>
        <Text fontSize="xl" fontWeight="bold">
          {product.title}
        </Text>
        <Text fontSize="md" fontWeight="bold" color="gray.900">
          {product.name}
        </Text>
        <Badge colorScheme="purple">{product.category}</Badge>
        <Text fontSize="2xl" fontWeight="bold" color="blue.500">
          ₹{product.price}
        </Text>
        <Text fontSize="sm" color="gray.600" noOfLines={2}>
          {product.description}
        </Text>
      </VStack>
      <VStack spacing={3} flex="1" p={4} align="center">
        <Button colorScheme="yellow" w="60%">
          Add to Cart
        </Button>
        <Button colorScheme="blue" w="60%">
          Buy Now
        </Button>
      </VStack>
    </Box>
  );
};
