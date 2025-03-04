import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  Text,
  Link,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await axios.post("http://localhost:8080/api/register", data);
      toast({
        title: "Account Created!",
        description: "You can now log in.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/login"); // Redirect to login page
    } catch (e) {
      toast({
        title: "Signup Failed",
        description: "Something went wrong. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <Box
      maxW={{ base: "sm", md: "3xl" }} // Responsive width
      width="100%"
      mx="auto"
      mt={10}
      p={6}
      borderWidth={1}
      borderRadius="md"
      boxShadow="lg"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Heading as="h2" size="lg" textAlign="center" mb={4}>
        Sign Up
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
        <Stack spacing={4} width="100%">
          <FormControl isInvalid={errors.id}>
            <FormLabel>ID</FormLabel>
            <Input
              type="number"
              placeholder="Enter ID"
              {...register("id", { required: "ID is required" })}
              width="100%" // Input takes full width
            />
            {errors.id && <Text color="red.500">{errors.id.message}</Text>}
          </FormControl>

          <FormControl isInvalid={errors.name}>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              placeholder="Enter Name"
              {...register("name", { required: "Name is required" })}
              width="100%"
            />
            {errors.name && <Text color="red.500">{errors.name.message}</Text>}
          </FormControl>

          <FormControl isInvalid={errors.email}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Enter Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Invalid email format",
                },
              })}
              width="100%"
            />
            {errors.email && (
              <Text color="red.500">{errors.email.message}</Text>
            )}
          </FormControl>

          <FormControl isInvalid={errors.username}>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              placeholder="Enter Username"
              {...register("username", { required: "Username is required" })}
              width="100%"
            />
            {errors.username && (
              <Text color="red.500">{errors.username.message}</Text>
            )}
          </FormControl>

          <FormControl isInvalid={errors.password}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter Password"
              {...register("password", {
                required: "Password is required",
                minLength: 6,
              })}
              width="100%"
            />
            {errors.password && (
              <Text color="red.500">{errors.password.message}</Text>
            )}
          </FormControl>

          <FormControl isInvalid={errors.phone}>
            <FormLabel>Phone</FormLabel>
            <Input
              type="tel"
              placeholder="Enter Phone Number"
              {...register("phone", {
                required: "Phone is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Invalid phone number",
                },
              })}
              width="100%"
            />
            {errors.phone && (
              <Text color="red.500">{errors.phone.message}</Text>
            )}
          </FormControl>

          <Button
            type="submit"
            colorScheme="teal"
            isLoading={loading}
            width="100%"
          >
            Sign Up
          </Button>

          <Text textAlign="center">
            Already signed in?{" "}
            <Link color="teal.500" onClick={() => navigate("/login")}>
              Login
            </Link>
          </Text>
        </Stack>
      </form>
    </Box>
  );
};
