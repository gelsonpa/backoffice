import {
  Box,
  Heading,
  Text,
  Button,
  Flex,
  useColorMode,
} from "@chakra-ui/react";
import { Header } from "../components/Header";
import { Sidebar } from "../components/SideBar";
import { WarningTwoIcon } from "@chakra-ui/icons";
import Link from "next/link";

export default function NotFound() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box>
      <Header />

      <Flex width="100%" my="6" maxWidth={1480} mx="auto" px="6">
        {/* <Sidebar /> */}

        <Box
          flex="1"
          borderRadius="8"
          bgColor={colorMode === "light" ? "gray.100" : "gray.900"}
          p="8"
        >
          <Box textAlign="center" py={10} px={6}>
            <Heading
              display="inline-block"
              as="h2"
              size="2xl"
              bgGradient="linear(to-r, green.400, green.600)"
              backgroundClip="text"
            >
              <WarningTwoIcon boxSize={"60px"} color={"green.300"} />
              <Text mt="4"> 404</Text>
            </Heading>
            <Text fontSize="18px" mt={3} mb={2}>
              Página não encontrada
            </Text>
            <Text color={"gray.500"} mb={6}>
              A página que você está procurando parece não existir.
            </Text>
            <Link href="/dashboard" passHref>
            <Button
              bgColor="green.600"
              bgGradient="linear(to-r, green.400, green.500, green.600)"
              color="white"
              variant="solid"
            >
              voltar ao início
            </Button>
            </Link>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
