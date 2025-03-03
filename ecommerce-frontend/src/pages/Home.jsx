import { useEffect, useState } from "react";
import axios from "axios";
import { ProductCard } from "../components/ProductCard";
import {
  Box,
  Grid,
  Text,
  Spinner,
  Image,
  Flex,
  Button,
  Divider,
  VStack,
} from "@chakra-ui/react";

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <Box
      position="relative"
      width="100%"
      height={{ base: "250px", md: "400px" }}
      overflow="hidden"
    >
      <Image
        src={images[currentIndex]}
        alt="Banner"
        objectFit="cover"
        width="100%"
        height="100%"
        transition="opacity 0.5s ease-in-out"
      />
    </Box>
  );
};

export const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  return (
    <Box>
      <Text fontSize="2xl" textAlign="center" m={5} fontWeight="bold">
        Welcome to E-Commerce Store
      </Text>
      <Carousel
        images={[
          "https://t4.ftcdn.net/jpg/02/49/50/15/360_F_249501541_XmWdfAfUbWAvGxBwAM0ba2aYT36ntlpH.jpg",
          "https://static.vecteezy.com/system/resources/thumbnails/002/006/774/small/paper-art-shopping-online-on-smartphone-and-new-buy-sale-promotion-backgroud-for-banner-market-ecommerce-free-vector.jpg",
          "https://static.vecteezy.com/system/resources/thumbnails/004/299/835/small/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-free-vector.jpg",
        ]}
      />
      <Text fontSize="2xl" textAlign="center" mt={8} fontWeight="bold">
        Top Deals
      </Text>
      <Divider my={4} />

      {loading ? (
        <Flex justifyContent="center" mt={10}>
          <Spinner size="xl" color="blue.500" />
        </Flex>
      ) : error ? (
        <Text color="red.500" textAlign="center" mt={5}>
          {error}
        </Text>
      ) : (
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          }}
          gap={5}
          p={5}
        >
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Grid>
      )}
    </Box>
  );
};
