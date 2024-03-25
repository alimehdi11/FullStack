import {
  Box,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
} from "@chakra-ui/react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { useDeleteUserMutation, useGetUsersQuery } from "../features/UserSlice";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const navigate = useNavigate();
  const { data: users, isError, isLoading } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  if (isLoading) return <h1>Please wait</h1>;
  if (isError) return <h1>Your internet Connection is Week</h1>;
  return (
    <Flex minH={"100vh"} justify={"center"} alignItems={"center"}>
      <Box overflowX="auto" w={"900px"}>
        <Table variant="striped" colorScheme="teal" size={"md"}>
          <Thead>
            <Tr>
              <Th>FName</Th>
              <Th>LName</Th>
              <Th>Email</Th>
              <Th>Gender</Th>
              <Th>Country</Th>
              <Th>Role</Th>
              <Th>Edit</Th>
              <Th>Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users?.map((item) => (
              <Tr key={item.id}>
                <Td textTransform={"capitalize"}>{item.fname}</Td>
                <Td textTransform={"capitalize"} textAlign={"center"}>
                  {item.lname}
                </Td>
                <Td>{item.email}</Td>
                <Td>{item.gender}</Td>
                <Td>{item.country}</Td>
                <Td>{item.role}</Td>

                <Td>
                  <Button
                    size={"xs"}
                    colorScheme="green"
                    onClick={() => navigate(`/contact/${item.id}`)}
                  >
                    <AiFillEdit />
                  </Button>
                </Td>
                <Td>
                  <Button
                    size={"xs"}
                    colorScheme="red"
                    onClick={() => deleteUser(item.id || "")}
                  >
                    <AiFillDelete />
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Flex>
  );
};

export default UserList;
