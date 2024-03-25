import {
  Box,
  Button,
  Flex,
  Input,
  Select,
  Radio,
  RadioGroup,
  Checkbox,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Text,
} from "@chakra-ui/react";
import { inputs } from "../types/interfaces";
import { User } from "./../models/User";
import {
  useAddUserMutation,
  useGetUserQuery,
  useUpdateUserMutation,
} from "../features/UserSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";

const initialValues: User = {
  id: null,
  fname: "",
  lname: "",
  email: "",
  password: "",
  country: "",
  gender: "",
  hobbies: [],
  role:"user"
};

const validationSchema = Yup.object({
  fname: Yup.string()
    .required("Please enter first name")
    .min(3, "First name must be at least 3 characters"),
  lname: Yup.string()
    .required("Please enter last name")
    .min(3, "Last name must be at least 3 characters"),
  email: Yup.string().required("Please enter email").email("Invalid email"),
  password: Yup.string()
    .required("Please enter password")
    .min(8, "Password must be at least 6 characters"),
  country: Yup.string().required("Please select country"),
  gender: Yup.string().required("Please select gender"),
  hobbies: Yup.array().min(1, "Please select at least one hobby"), // Corrected field name
});

const Form = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useGetUserQuery(id!);
  const [editTask, setEditTask] = useState<boolean>(false);
  const [addUser] = useAddUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const {
    values,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    setValues,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, action) => {
      if (editTask) {
        await updateUser(values);
        setEditTask(false);
      } else {
        await addUser({
          ...values,
          id: String(Math.ceil(Math.random() * 1000)),
        });
      }
      action.resetForm();
      navigate("/users");
    },
  });

  useEffect(() => {
    if (id && data) {
      setEditTask(true);
      setValues(data);
    }
  }, [id, data]);

  return (
    <Flex
      minH={"100vh"}
      justify={"center"}
      alignItems={"center"}
      bg={"skyblue"}
    >
      <Box
        bg={"white"}
        maxW={"800px"}
        minH={"400px"}
        width={"100%"}
        p={{ base: 5, md: "8" }}
      >
        <Box as="h1" fontSize={{ base: "xl", md: "2xl" }} mb={3}>
          Registration Form
        </Box>
        <form
          onSubmit={handleSubmit}
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {inputs.map((item) => (
            <FormControl
              isInvalid={
                errors[item.name as keyof User] &&
                touched[item.name as keyof User]
                  ? true
                  : false
              }
              key={item.name}
              w={"100%"}
            >
              <FormLabel>{item.label}</FormLabel>
              <Input
                _placeholder={{ color: "black" }}
                size={"sm"}
                _hover={{ border: "1px solid green" }}
                border={"1px solid gray"}
                _focus={{ border: "1px green solid" }}
                name={item.name}
                placeholder={item.label}
                onChange={handleChange}
                onBlur={handleBlur}
                type={item.type}
                value={values[item.name as keyof User]!}
              />
              {errors[item.name as keyof User] &&
                touched[item.name as keyof User] && (
                  <FormErrorMessage mt={1}>
                    {errors[item.name as keyof User]}
                  </FormErrorMessage>
                )}
            </FormControl>
          ))}

          <Select
            isInvalid={errors.country && touched.country ? true : false}
            placeholder="Select Country"
            variant={"filled"}
            onChange={handleChange}
            name="country"
            value={values.country}
          >
            <option value="Pakistan">Pakistan</option>
            <option value="India">India</option>
            <option value="Afghanistan">Afghanistan</option>
          </Select>
          {errors.country && touched.country && (
            <Text color="red" mt={1}>
              {errors.country}
            </Text>
          )}

          <Flex gap={2} flexDirection={["column", "row"]}>
            <h1>Hobbies</h1>
            <Checkbox
              colorScheme="red"
              name="hobbies"
              value="coding"
              isChecked={values?.hobbies.includes("coding")}
              onChange={handleChange}
            >
              Coding
            </Checkbox>
            <Checkbox
              colorScheme="green"
              name="hobbies"
              value="hacking"
              isChecked={values?.hobbies.includes("hacking")}
              onChange={handleChange}
            >
              Hacking
            </Checkbox>
            <Checkbox
              colorScheme="orange"
              name="hobbies"
              value="gym"
              isChecked={values?.hobbies.includes("gym")}
              onChange={handleChange}
            >
              Gym
            </Checkbox>
          </Flex>
          {errors.hobbies && touched.hobbies && (
            <Text color="red" mt={1}>
              {errors.hobbies}
            </Text>
          )}
          <Flex gap="2">
            <label htmlFor="">Gender</label>
            <RadioGroup
              value={values.gender}
              name="gender"
              onChange={handleChange}
            >
              <Radio colorScheme="blue" value="male" onChange={handleChange}>
                Male
              </Radio>
              <Radio
                colorScheme="pink"
                value="female"
                ml={2}
                onChange={handleChange}
              >
                Female
              </Radio>
            </RadioGroup>
          </Flex>
          {errors.gender && touched.gender && (
            <Text color="red" mt={1}>
              {errors.gender}
            </Text>
          )}
          <Button type="submit" colorScheme="whatsapp" mt={2}>
            Submit
          </Button>
        </form>
      </Box>
    </Flex>
  );
};
export default Form;
