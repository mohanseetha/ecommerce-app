import {
  FormControl,
  FormLabel,
  Input,
  Box,
  NumberInput,
  NumberInputStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  Image,
} from "@chakra-ui/react";
import { useState } from "react";

export const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    brand: "",
    price: 0,
    date: "",
    category: "",
    quantity: 1,
    available: true,
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleNumberChange = (key, value) => {
    setProduct((prev) => ({
      ...prev,
      [key]: parseFloat(value) || 0,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const postData = async () => {
    const { name, description, brand, price, date, category, quantity } =
      product;
    if (!name || !description || !brand || !date || !category || price <= 0) {
      alert("Please fill in all fields and ensure price is greater than 0.");
      return;
    }

    const formData = new FormData();
    formData.append(
      "product",
      new Blob(
        [
          JSON.stringify({
            name,
            description,
            brand,
            price,
            date,
            category,
            quantity,
            available: product.available,
          }),
        ],
        { type: "application/json" }
      )
    );

    if (image) {
      formData.append("imageFile", image);
    }

    try {
      const response = await fetch("http://localhost:8080/api/product", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding product. Please try again.");
    }
  };

  return (
    <Box
      maxW="xl"
      mx="auto"
      marginTop={10}
      p={4}
      borderWidth="1px"
      borderRadius="lg"
    >
      <FormControl>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input
          id="name"
          type="text"
          value={product.name}
          onChange={handleInputChange}
        />
      </FormControl>

      <FormControl mt={3}>
        <FormLabel htmlFor="description">Description</FormLabel>
        <Input
          id="description"
          type="text"
          value={product.description}
          onChange={handleInputChange}
        />
      </FormControl>

      <FormControl mt={3}>
        <FormLabel htmlFor="brand">Brand</FormLabel>
        <Input
          id="brand"
          type="text"
          value={product.brand}
          onChange={handleInputChange}
        />
      </FormControl>

      <FormControl mt={3}>
        <FormLabel htmlFor="price">Price</FormLabel>
        <NumberInput
          min={0}
          value={product.price}
          onChange={(valueString) => handleNumberChange("price", valueString)}
        >
          <NumberInputField id="price" />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>

      <FormControl mt={3}>
        <FormLabel htmlFor="date">Date</FormLabel>
        <Input
          id="date"
          type="date"
          value={product.date}
          onChange={handleInputChange}
        />
      </FormControl>

      <FormControl mt={3}>
        <FormLabel htmlFor="category">Category</FormLabel>
        <Input
          id="category"
          type="text"
          value={product.category}
          onChange={handleInputChange}
        />
      </FormControl>

      <FormControl mt={3}>
        <FormLabel htmlFor="quantity">Quantity</FormLabel>
        <NumberInput
          min={1}
          value={product.quantity}
          onChange={(valueString) =>
            handleNumberChange("quantity", valueString)
          }
        >
          <NumberInputField id="quantity" />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>

      <FormControl mt={3}>
        <FormLabel htmlFor="image">Image</FormLabel>
        <Input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
      </FormControl>

      {preview && (
        <Image
          src={preview}
          alt="Preview"
          mt={3}
          borderRadius="md"
          boxSize="150px"
          objectFit="cover"
        />
      )}

      <Button mt={4} colorScheme="blue" width="full" onClick={postData}>
        Submit
      </Button>
    </Box>
  );
};
