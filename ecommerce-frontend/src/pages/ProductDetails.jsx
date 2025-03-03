import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Image,
  Text,
  Button,
  VStack,
  HStack,
  Skeleton,
  Flex,
} from "@chakra-ui/react";

export const ProductDetails = () => {
  const { prodId } = useParams();
  const [product, setProduct] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/products/${prodId}`)
      .then((response) => setProduct(response.data))
      .catch((error) => console.error("Error fetching product details:", error))
      .finally(() => setLoading(false));
  }, [prodId]);

  useEffect(() => {
    if (prodId) {
      fetch(`http://localhost:8080/api/product/${prodId}/image`)
        .then((response) => response.blob())
        .then((blob) => {
          const objectURL = URL.createObjectURL(blob);
          setImageUrl(objectURL);
        })
        .catch((error) => console.error("Error fetching image:", error))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [prodId]);

  return (
    <Box maxW={{ base: "90%", md: "70%", lg: "60%" }} mx="auto" mt={8}>
      {loading ? (
        <Skeleton height="400px" width="100%" />
      ) : (
        <Flex direction={{ base: "column", md: "row" }} gap={6}>
          <Image
            src={imageUrl || "https://via.placeholder.com/400"}
            alt={product?.name}
            boxSize={{ base: "100%", md: "400px" }}
            objectFit="cover"
            borderRadius="md"
            borderColor="black"
          />
          <VStack align="start" spacing={4}>
            <Text fontSize="2xl" fontWeight="bold">
              {product?.name}
            </Text>
            <Text fontSize="lg" color="gray.600">
              Brand: {product?.brand}
            </Text>
            <Text fontSize="xl" fontWeight="bold" color="blue.500">
              ₹ {product?.price}
            </Text>
            <Text>{product?.description}</Text>
            <HStack>
              <Button colorScheme="blue">Buy Now</Button>
              <Button variant="outline" colorScheme="blue">
                Add to Cart
              </Button>
            </HStack>
          </VStack>
        </Flex>
      )}
    </Box>
  );
};
