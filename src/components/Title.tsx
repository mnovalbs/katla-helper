import { Heading } from "@chakra-ui/react";
import { FC } from "react";

const Title: FC = ({ children }) => {
  return (
    <Heading color="white" size="lg" textAlign="center" mb={4}>
      {children}
    </Heading>
  );
};

export default Title;
