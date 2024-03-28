import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { loginUser } from "../features/AuthSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const initialValues: { email: string; password: string } = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

const Login: React.FC = () => {
  const [error, setError] = useState<null | string>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmit = async (
    values: { email: string; password: string },
    action: any
  ) => {
    try {
      let response = await fetch(
        `https://65f77aaab4f842e80885a255.mockapi.io/users?email=${values.email}&password=${values.password}`
      );
      if (response.ok) {
        const responseData = await response.json();
        if (responseData.length === 1) {
          setError(null);
          dispatch(loginUser(responseData[0]));
          navigate("/bitspro/profile");
        } else {
          throw new Error("Invalid username or password.");
        }
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      setError((error as Error).message);
    }
    action.resetForm();
  };

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit,
    });
  return (
    <Flex
      justify={"center"}
      alignItems={"center"}
      height={"90vh"}
      bg={"blue.200"}
    >
      <VStack bg={"white"} w={"90%"} maxW={"45rem"} p={10}>
        <Heading>Login Form</Heading>
        <form style={{ width: "100%" }} onSubmit={handleSubmit}>
          <VStack w={"full"} gap={5}>
            <FormControl
              isInvalid={errors.email && touched.email ? true : false}
            >
              <FormLabel>Enter Email</FormLabel>
              <Input
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                name="email"
                border={"1px solid black"}
                shadow={"md"}
              />
              {errors.email && touched.email && (
                <FormErrorMessage mt={1}>{errors.email}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl
              isInvalid={errors.password && touched.password ? true : false}
            >
              <Input
                type="password"
                onChange={handleChange}
                onBlur={handleBlur}
                name="password"
                value={values.password}
                border={"1px solid black"}
                shadow={"md"}
              />
              {errors.password && touched.password && (
                <FormErrorMessage mt={1}>{errors.password}</FormErrorMessage>
              )}
            </FormControl>
            <Button
              type="submit"
              variant={"outline"}
              colorScheme="twitter"
              w={"full"}
            >
              Sign In
            </Button>
          </VStack>
        </form>
        {error && <Text color={"red"}>{error}</Text>}
      </VStack>
    </Flex>
  );
};

export default Login;
