import { Button, Card, CardBody, HStack, Image, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import { Product } from "../types/interfaces";
import Stars from "./Stars";
import AddCartBtn from "./Buttons/AddCartBtn";

const ProductCard = (product: Product) => {
  const { image, price, rating, title, id } = product;
  const handleScroll = () => {
    window.scrollTo(0, 0); // Scrolls to the top left corner of the window
  };

  return (
    <Card
      flexBasis={{ base: "400px", sm: "350px", md: "300px" }}
      flexGrow={{ base: 1, sm: 0, md: 1 }}
      border={"1px solid gray"}
    >
      <NavLink to={`/products/product/${id}`}>
        <Image
          src={image}
          h={200}
          w={"full"}
          objectFit={"contain"}
          p={4}
          onClick={handleScroll}
        />
      </NavLink>
      <CardBody>
        <HStack justify={"space-between"}>
          <Text>Rs : {price}$ </Text>
          <CiHeart fontSize={22} />
        </HStack>
        <Text noOfLines={1}>{title}</Text>
        <Text>Rate by : {rating.count} users</Text>
        <Text>Rating : {rating.rate}</Text>
        <Stars rating={rating?.rate}></Stars>
        <HStack justify={"center"} mt={3}>
          <AddCartBtn product={product!} />
          <Button colorScheme="green">Price: {price} $</Button>
        </HStack>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
