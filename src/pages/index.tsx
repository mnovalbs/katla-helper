import {
  Box,
  Button,
  Container,
  Heading,
  Link,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useState } from "react";
import WordInput from "components/WordInput";
import Title from "components/Title";
import ResultModal from "components/ResultModal";
import Head from "next/head";

const Home: NextPage = () => {
  const [matchedLetters, setMatchedLetters] = useState(["", "", "m", "", "a"]);
  const [wrongOrderLetters, setWrongOrderLetters] = useState([
    "",
    "",
    "",
    "",
    "",
  ]);
  const [wrongLetters, setWrongLetters] = useState(["", "", "", "", "", ""]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const lowerCasedMatchedLetters = matchedLetters.map((word) =>
    word.toLowerCase()
  );
  const lowerCasedWrongOrderLetters = wrongOrderLetters.map((word) =>
    word.toLowerCase()
  );
  const lowerCasedWrongLetters = wrongLetters
    .map((word) => word.toLowerCase())
    .filter((word) => !!word);

  return (
    <>
      <Head>
        <title>Katla Helper - by @mnovalbs</title>
        <meta
          name="description"
          content="Apakah kamu termasuk kaum yang lemot buat nyari kata-kata yang pas di Katla? Sini kita bantu cariin yang mungkin jadi jawaban nya!"
        />
      </Head>
      <Box>
        <Container maxW="container.sm" paddingY={8}>
          <Heading color="teal.400" textAlign="center">
            Katla Helper
          </Heading>

          <Stack spacing={12} mt={8}>
            <Box>
              <Title>
                Sesuai urutan, isi huruf yang berwarna hijau di sini.
              </Title>
              <WordInput value={matchedLetters} onChange={setMatchedLetters} />
            </Box>

            <Box>
              <Title>Isi huruf-huruf yang salah (berwarna abu-abu)</Title>
              <WordInput
                value={wrongLetters}
                columns={6}
                canAdd
                onChange={setWrongLetters}
              />
            </Box>

            <Box>
              <Title>
                Sesuai urutan, isi huruf-huruf yang bukan pada urutan nya
              </Title>
              <WordInput
                value={wrongOrderLetters}
                columns={5}
                addCount={5}
                canAdd
                onChange={setWrongOrderLetters}
              />
            </Box>
          </Stack>
        </Container>
        <Text color="whiteAlpha.800" textAlign="center" fontSize="sm" my={4}>
          made by{" "}
          <Link
            href="https://twitter.com/mnovalbs"
            target="_blank"
            color="white"
            fontWeight="semibold"
          >
            @mnovalbs
          </Link>
        </Text>
        <Box position="sticky" bottom="0" padding={2}>
          <Button width="full" colorScheme="teal" onClick={onOpen}>
            Help Me!
          </Button>
        </Box>

        <ResultModal
          isOpen={isOpen}
          matchedLetters={lowerCasedMatchedLetters}
          wrongOrderLetters={lowerCasedWrongOrderLetters}
          wrongLetters={lowerCasedWrongLetters}
          onClose={onClose}
        />
      </Box>
    </>
  );
};

export default Home;
