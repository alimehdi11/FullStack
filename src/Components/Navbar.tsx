import { Flex, Box, Button, Circle } from "@chakra-ui/react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { AiFillFire } from "react-icons/ai";
import { HiUserGroup } from "react-icons/hi";
import { IoIosContact } from "react-icons/io";
import { HiOutlineBars3BottomRight } from "react-icons/hi2";
import { FaCartShopping } from "react-icons/fa6";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { logOutUser } from "../features/AuthSlice";
const Navbar = () => {
  const { cart } = useSelector((state: RootState) => state.CartSlice);
  const [active, setActive] = useState(false);
  const { isLogin, user } = useSelector((state: RootState) => state.AuthSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleUser = () => {
    if (isLogin) {
      dispatch(logOutUser());
    } else {
      navigate("/login");
    }
  };

  const NavItems = [
    {
      name: "Home",
      icon: <IoMdHome />,
      path: "/",
    },
    {
      name: "About",
      icon: <AiFillFire />,
      path: "/about",
    },

    {
      name: "Products",
      icon: <IoIosContact />,
      path: "/products",
    },
    {
      name: "Admin",
      icon: <HiUserGroup />,
      path: "/admin",
    },
  ];

  return (
    <Flex
      as="nav"
      alignItems="baseline"
      justify="space-between"
      padding="1rem"
      bg="blue.500"
      color={{ base: "black", md: "white" }}
      gap={5}
    >
      <Box fontSize={25} color={"white"}>
        <NavLink to="/">Bitspro</NavLink>
      </Box>

      <Button
        colorScheme="blue"
        display={{ md: "none" }}
        fontSize={22}
        onClick={() => setActive(!active)}
      >
        <HiOutlineBars3BottomRight />
      </Button>
      <Flex
        bg={{ base: "white", md: "transparent" }}
        zIndex={10}
        padding={{ base: "1rem", md: 0 }}
        pos={{ base: "absolute", md: "static" }}
        flexDir={{ base: "column", md: "row" }}
        flexGrow={1}
        gap={3}
        justify={"space-between"}
        left={0}
        display={{ base: active ? "flex" : "none", md: "flex" }}
        transition="all .7s"
        top={"70px"}
        w={{ base: "100%", md: "auto" }}
      >
        <Flex
          as="ul"
          flexDir={{ base: "column", md: "row" }}
          listStyleType={"none"}
          gap={5}
        >
          {NavItems.map((item) => (
            <Flex
              as="li"
              key={item.name}
              align={"center"}
              gap={3}
              onClick={() => setActive(false)}
            >
              {item.icon}
              <NavLink
                to={item.path}
                style={({ isActive }) =>
                  isActive
                    ? { borderBlock: "2px solid", paddingBlock: "3px" }
                    : {}
                }
              >
                {item.name}
              </NavLink>
            </Flex>
          ))}
        </Flex>
        <Flex gap={2}>
          {!isLogin && (
            <Button
              w={"fit-content"}
              colorScheme="blackAlpha"
              leftIcon={<IoIosContact />}
              onClick={() => navigate("/contact")}
            >
              Register
            </Button>
          )}
          <Button
            w={"fit-content"}
            colorScheme="blackAlpha"
            onClick={handleUser}
          >
            {isLogin ? "Logout" : "Login"}
          </Button>
          {user?.role != "admin" && (
            <Button
              onClick={() => {
                setActive(false);
                navigate("/cart");
              }}
            >
              Cart
              <FaCartShopping fontSize={20} />
              <Circle
                size={5}
                position={"absolute"}
                top={"-8px"}
                right={"-5px"}
                color={"white"}
                fontSize={14}
                bg={"red"}
              >
                {cart.length}
              </Circle>
            </Button>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Navbar;
