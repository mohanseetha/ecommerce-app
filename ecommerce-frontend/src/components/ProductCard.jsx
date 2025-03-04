import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
  Text,
  Heading,
  Box,
  Skeleton,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ProductCard = ({ product }) => {
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
    <Card margin="3" overflow="hidden" boxShadow="lg" borderRadius="lg">
      <Box>
        {loading ? (
          <Skeleton height="100%" width="100%" />
        ) : (
          <Image
            src={imageUrl || "https://via.placeholder.com/300"}
            alt={product?.name}
            height="300px"
            width="100%"
            objectFit="cover"
          />
        )}
      </Box>
      <CardBody textAlign="center">
        <Heading size="md">{product?.name}</Heading>
        <Text fontStyle={"italic"} color="gray.600">
          {product?.brand}
        </Text>
        <Text fontSize="2xl" fontWeight="bold" letterSpacing="tight">
          ₹ {product?.price}
        </Text>
      </CardBody>
      <CardFooter display="flex" justifyContent="center" gap={2}>
        <Button
          variant="solid"
          colorScheme="teal"
          onClick={() => navigate(`/product-details/${product?.id}`)}
        >
          View Details
        </Button>
        <Button colorScheme="teal" variant="outline">
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
};
