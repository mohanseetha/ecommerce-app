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
import bcrypt from "bcryptjs";

export const Login = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:8080/api/users/${data.username}`
      );

      if (res.data) {
        const isMatch = await bcrypt.compare(data.password, res.data.password);

        if (isMatch) {
          toast({
            title: "Login Successful!",
            description: "Welcome back!",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          navigate("/dashboard"); // Redirect on success
        } else {
          throw new Error("Invalid credentials");
        }
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid username or password.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <Box
      maxW={{ base: "sm", md: "2xl" }}
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
        Login
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
        <Stack spacing={4} width="100%">
          <FormControl isInvalid={errors.username}>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              placeholder="Enter Username"
              {...register("username", { required: "Username is required" })}
              width="100%" // Input takes full width of the box
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
              {...register("password", { required: "Password is required" })}
              width="100%" // Input takes full width of the box
            />
            {errors.password && (
              <Text color="red.500">{errors.password.message}</Text>
            )}
          </FormControl>

          <Button
            type="submit"
            colorScheme="teal"
            isLoading={loading}
            width="100%"
          >
            Login
          </Button>

          <Text textAlign="center">
            Don't have an account?{" "}
            <Link color="teal.500" onClick={() => navigate("/signup")}>
              Sign Up
            </Link>
          </Text>
        </Stack>
      </form>
    </Box>
  );
};
