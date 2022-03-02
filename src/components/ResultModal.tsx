import {
  Alert,
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { FC } from "react";
import words from "constant/words.json";

type Props = {
  isOpen: boolean;
  matchedLetters: string[];
  wrongOrderLetters: string[];
  wrongLetters: string[];
  onClose: () => void;
};

const generatePossibleWords = (
  matchedLetters: string[],
  wrongOrderLetters: string[],
  wrongLetters: string[]
): string[] => {
  const filteredIncludedLetters = [...wrongOrderLetters, ...matchedLetters].filter(word => !!word);
  const filteredWords = words.filter(word => filteredIncludedLetters.every(includedLetter => word.includes(includedLetter)));

  const totalWrongOrderLetterArray = wrongOrderLetters.length / 5;
  const splittedWrongOrderLetters = [
    ...new Array(totalWrongOrderLetterArray),
  ].map((_, idx) => wrongOrderLetters.slice(idx * 5, idx * 5 + 5));

  const possibleWords = filteredWords.filter((word) => {
    let isExcluded = false;

    if (wrongLetters.length > 0) {
      isExcluded = wrongLetters.some((wrongLetter) =>
        word.includes(wrongLetter)
      );
    }

    let isIncluded = true;
    if (splittedWrongOrderLetters.length > 0) {
      isIncluded = splittedWrongOrderLetters.every((wrongOrder) => {
        if (wrongOrder.every((wo) => !wo)) {
          return true;
        }

        return wrongOrder.every((wo, index) => {
          if (!wo) {
            return true;
          }
          return word[index] !== wo;
        });
      });
    }

    let isSamePosition = true;
    if (matchedLetters.some((matchedLetter) => !!matchedLetter)) {
      isSamePosition = matchedLetters.every((matchedLetter, index) => {
        if (!matchedLetter) {
          return true;
        }
        return word[index] === matchedLetter;
      });
    }

    return !isExcluded && isIncluded && isSamePosition;
  });
  return possibleWords;
};

const ResultModal: FC<Props> = (props) => {
  const { isOpen, matchedLetters, wrongOrderLetters, wrongLetters, onClose } =
    props;

  let possibleWords: string[] = [];
  if (isOpen) {
    possibleWords = generatePossibleWords(
      matchedLetters,
      wrongOrderLetters,
      wrongLetters
    );
  }
  const possibleWordTotal = possibleWords.length;
  const showWarning = possibleWordTotal > 200;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Hasilnya</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {showWarning && (
            <Alert>
              Waduuhhh, masih ada {possibleWordTotal} kata yang harus kamu
              tebak. Isi kotak-kotak dulu yang sudah terbuka yaa!
            </Alert>
          )}

          <Box maxHeight="300px" overflowY="auto" marginTop={4}>
            {possibleWords.map((word) => (
              <Box
                key={word}
                display="inline-block"
                border="1px"
                borderColor="gray.200"
                paddingY={1}
                paddingX={2}
                fontSize="sm"
                mt={1.5}
                mr={1.5}
                borderRadius="md"
              >
                {word}
              </Box>
            ))}
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button variant="outline" onClick={onClose}>
            Tutup
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ResultModal;
