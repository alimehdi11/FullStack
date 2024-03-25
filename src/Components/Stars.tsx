import { MdOutlineStar } from "react-icons/md";
import { IoMdStarHalf } from "react-icons/io";
import { CiStar } from "react-icons/ci";
import { HStack } from "@chakra-ui/react";

const Stars = ({ rating }: { rating: number }) => {
  return (
    <HStack fontSize={22} mt={2} color={"yellow.500"}>
         
      {Array.from({ length: 5 }, (_, i) => {
        let number = i + 0.5;
        return (
          <div key={i}>
          {rating >= i + 1 ? <MdOutlineStar  /> :
          rating >= number ? <IoMdStarHalf  /> :
          <CiStar key={i} />}
           </div>
        );
      })}
    </HStack>
  );
};

export default Stars;
