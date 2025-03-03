import { useEffect, useState } from "react";
import { Box, Text, VStack, HStack, Spinner, Select } from "@chakra-ui/react";
import axios from "axios";
import { ProductPageCard } from "../components/ProductPageCard";

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/api/products");
      const filteredProducts = selectedCategory
        ? response.data.filter(
            (product) => product.category === selectedCategory
          )
        : response.data;
      setProducts(filteredProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/products");
      const uniqueCategories = [
        ...new Set(response.data.map((product) => product.category)),
      ];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  return (
    <Box p={5}>
      <VStack spacing={4} align="stretch">
        <Text fontSize="2xl" fontWeight="bold" textAlign="center">
          Products
        </Text>

        <HStack justify="center" spacing={4}>
          <Select
            placeholder="All"
            maxW="sm"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.length > 0 ? (
              categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))
            ) : (
              <option disabled>No Categories Found</option>
            )}
          </Select>
        </HStack>

        {loading ? (
          <Box textAlign="center">
            <Spinner size="xl" color="blue.500" />
          </Box>
        ) : (
          <VStack spacing={6} p={5}>
            {products.length > 0 ? (
              products.map((product) => (
                <ProductPageCard key={product.id} product={product} />
              ))
            ) : (
              <Text textAlign="center" fontSize="lg" color="gray.600">
                No products available.
              </Text>
            )}
          </VStack>
        )}
      </VStack>
    </Box>
  );
};
