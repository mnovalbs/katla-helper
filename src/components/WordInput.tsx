import {
  AspectRatio,
  Box,
  Button,
  Heading,
  Input,
  SimpleGrid,
} from "@chakra-ui/react";
import { FC } from "react";
import Title from "./Title";

type Props = {
  value: string[];
  addCount?: number;
  canAdd?: boolean;
  columns?: number;
  onChange: (value: string[]) => void;
};

const WordInput: FC<Props> = (props) => {
  const { value, canAdd, addCount, columns, onChange } = props;

  const onInputChange = (input: string, index: number) => {
    const newValue = [...value];
    newValue[index] = input;
    onChange(newValue);
  };

  const onAdd = () => {
    const totalNewArr = addCount || 1;
    const newArr = [...new Array(totalNewArr)].map(() => "");
    onChange([...value, ...newArr]);
  };

  return (
    <Box>
      <SimpleGrid columns={columns || value.length} spacing={4}>
        {value.map((val, idx) => (
          <AspectRatio key={idx} ratio={1}>
            <Box>
              <Input
                value={val}
                maxLength={1}
                textTransform="uppercase"
                textAlign="center"
                height="full"
                fontSize={{
                  base: "xl",
                  sm: "4xl",
                  md: "5xl",
                  lg: "5xl",
                }}
                fontWeight="bold"
                paddingX={2}
                backgroundColor="white"
                onChange={(e) => onInputChange(e.target.value, idx)}
              />
            </Box>
          </AspectRatio>
        ))}

        {canAdd && (
          <AspectRatio ratio={1}>
            <Button
              width="full"
              padding={1}
              fontSize={{
                base: "xl",
                sm: "4xl",
                md: "5xl",
                lg: "5xl",
              }}
              onClick={onAdd}
            >
              +
            </Button>
          </AspectRatio>
        )}
      </SimpleGrid>
    </Box>
  );
};

export default WordInput;
