import {
  Box,
  Divider,
  Flex,
  List,
  ListItem,
  SimpleGrid,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";

export function ProfissionalInfo({
  dados,
  isLoading,
  error,
  refetch,
  isFetching,
}) {
  const { colorMode, toggleColorMode } = useColorMode();
  const isLargeScreen = useBreakpointValue({
    base: false,
    lg: true,
  });

  //const [experiencia, setExp] = useState([{ id: 1, name: "aaaa" }]);
  var experiencia = [];
  //console.log(dados);
  if (!isLoading) {
    experiencia = dados.map((dado) => {
      return {
        experiencia: dado.experiencia,
      };
    });
    //console.log(experiencia[0].experiencia);
  }

  return (
    <Box mt={0}>
      <Divider mb={8} />
      <Text
        fontSize={{ base: "16px", lg: "18px" }}
        color={colorMode === "light" ? "green.500" : "green.300"}
        fontWeight={"bold"}
        textTransform={"uppercase"}
        mb={"4"}
      >
        Experiência Profissional
      </Text>

      {isLoading ? (
        <Flex justify="center">
          <Spinner />
        </Flex>
      ) : error ? (
        <Flex justify="center">
          <Text>Falha ao obter os dados</Text>
        </Flex>
      ) : (
        <>
          <Table size="md" colorScheme="whiteAlpha" variant="simple">
            <Thead>
              <Tr>
                <Th justify="center"> empresa </Th>
                <Th justify="center"> cargo </Th>
                {isLargeScreen && <Th justify="center"> Descrição </Th>}
                {isLargeScreen && <Th justify="center"> inicio </Th>}
                <Th justify="center"> Término </Th>
              </Tr>
            </Thead>
            <Tbody>
              {experiencia[0].experiencia?.map((dado) => {
                return (
                  <Tr key={dado.id}>
                    <Td fontWeight="bold">{dado.empresa}</Td>
                    <Td>{dado.cargo}</Td>
                    {isLargeScreen && <Td>{dado.descricao}</Td>}
                    {isLargeScreen && (
                      <Td>
                        {new Date(dado.dataInicio).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                      </Td>
                    )}
                    <Td>
                      {new Date(dado.dataFim).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </>
      )}
    </Box>
  );
}
