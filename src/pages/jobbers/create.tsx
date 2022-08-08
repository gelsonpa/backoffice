import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Icon,
  InputGroup,
  InputLeftAddon,
  Select,
  SimpleGrid,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { RiSaveLine } from "react-icons/ri";
import { Input } from "../../components/Form/input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/SideBar";

export default function CreateJober() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box>
      <Header />

      <Flex width="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box
          as="form"
          autoComplete="off"
          flex="1"
          borderRadius="8"
          bgColor={colorMode === "light" ? "gray.100" : "gray.900"}
          p={["6", "8"]}
        >
          <Heading size="md" fontWeight="bold">
            Novo Registo
          </Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing="4" width="100%">
              <Input
                name="nome"
                label="Nome Completo"
                type="text"
                placeholder="Nome Completo"
              />
              <Input
                name="nome"
                label="Endereço"
                type="text"
                placeholder="Entre o Endereço"
              />
              <Input
                name="nome"
                label="Email"
                type="email"
                placeholder="Entre o email"
              />
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing="4" width="100%">
              <Input
                name="nif"
                label="Nº NIF"
                type="number"
                placeholder="Número NIF"
              />
              <FormControl>
                <FormLabel htmlFor={"tipo"}>{"TIPO"}</FormLabel>
                <Select
                  placeholder="Escolha a opção"
                  color={colorMode === "light" ? "gray.900" : "gray.300"}
                  bgColor={colorMode === "light" ? "gray.300" : "gray.800"}
                  _hover={{
                    bg: colorMode === "light" ? "gray.300" : "gray.700",
                  }}
                >
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </Select>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <Input
                    name="email"
                    label="Telefone"
                    type="number"
                    placeholder="Telefone"
                  />
                </InputGroup>
              </FormControl>
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing="4" width="100%">
              <FormControl>
                <FormLabel htmlFor={"banco"}>{"Banco"}</FormLabel>
                <Select
                  placeholder="Escolha a opção"
                  color={colorMode === "light" ? "gray.900" : "gray.300"}
                  bgColor={colorMode === "light" ? "gray.300" : "gray.800"}
                  _hover={{
                    bg: colorMode === "light" ? "gray.300" : "gray.700",
                  }}
                >
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </Select>
              </FormControl>
              <Input
                name="nome"
                label="Nº Conta"
                type="number"
                placeholder="Nº Conta"
              />
              <Input
                name="nome"
                label="Nº NIB"
                type="number"
                placeholder="Nº NIB"
              />
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/jobers" passHref>
              <Button
                _hover={{ bg: "gray.600" }}
                size="sm"
                color={"white"}
                bg={colorMode === "light" ? "gray.800" : "gray"}
              >
                Voltar
              </Button>
              </Link>
              <Button
                _hover={{ bg: "green.800" }}
                size="sm"
                type="submit"
                bgColor="green.900"
                color={"white"}
                leftIcon={<Icon as={RiSaveLine} />}
              >
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
