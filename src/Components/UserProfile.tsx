import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Text, VStack } from "@chakra-ui/react";

const UserProfile: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.AuthSlice);
  return (
    <VStack h={"90vh"} justify={"center"}>
      <Text>First Name: {user?.fname}</Text>
      <Text>Last Name: {user?.lname}</Text>
      <Text>Country:{user?.country}</Text>
      <Text>Email :{user?.email}</Text>
      <Text>Gender :{user?.gender}</Text>
      <Text>Hobbies : {user?.hobbies.join(" ")}</Text>
    </VStack>
  );
};

export default UserProfile;
