import {
  Box,
  Flex,
  List,
  ListItem,
  Skeleton,
  Spinner,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { jobber } from "../../hooks/useJobber";

export function PersonalInfo({ dados, isLoading, error, refetch, isFetching }) {
  const { colorMode, toggleColorMode } = useColorMode();

  var nome = "",
    apelido = "",
    email = "",
    telemovel = "",
    telefone = "",
    nif = "",
    nib = "",
    cidade = "",
    id = "";
  if (!isLoading) {
    dados.map((dado) => {
      id = dado.id;
      nome = dado.nome;
      apelido = dado.apelido;
      email = dado.email;
      telemovel = dado.telemovel;
      telefone = dado.telefone;
      nif = dado.nif;
      nib = dado.nib;
      cidade = dado.cidade != null ? dado.cidade.nome : null;
    });
  }
  //console.log(dados);
  return (
    <>
      {isLoading ? (
        <Flex justify="center">
          <Spinner />
        </Flex>
      ) : error ? (
        <Flex justify="center">
          <Text>Falha ao obter os dados</Text>
        </Flex>
      ) : (
        <Box>
          <Text
            fontSize={{ base: "16px", lg: "18px" }}
            color={colorMode === "light" ? "green.500" : "green.300"}
            fontWeight={"bold"}
            textTransform={"uppercase"}
            mb={"4"}
          >
            Informação Pessoal
          </Text>
          <List spacing={2}>
            <ListItem>
              <Text as={"span"} mr={1} fontWeight={"bold"}>
                Nome:
              </Text>
              {nome}
            </ListItem>
            <ListItem>
              <Text as={"span"} mr={1} fontWeight={"bold"}>
                Apelido:
              </Text>
              {apelido}
            </ListItem>
            <ListItem>
              <Text as={"span"} mr={1} fontWeight={"bold"}>
                Email:
              </Text>
              {email}
            </ListItem>
            <ListItem>
              <Text as={"span"} mr={1} fontWeight={"bold"}>
                Telemóvel:
              </Text>
              {telemovel}
            </ListItem>
            <ListItem>
              <Text as={"span"} mr={1} fontWeight={"bold"}>
                Telefone:
              </Text>
              {telefone}
            </ListItem>
            <ListItem>
              <Text as={"span"} mr={1} fontWeight={"bold"}>
                NIF:
              </Text>
              {nif}
            </ListItem>
            <ListItem>
              <Text as={"span"} mr={1} fontWeight={"bold"}>
                NIB:
              </Text>
              {nib}
            </ListItem>
            <ListItem>
              <Text as={"span"} mr={1} fontWeight={"bold"}>
                Cidade:
              </Text>
              {cidade}
            </ListItem>
          </List>
        </Box>
      )}
    </>
  );
}
