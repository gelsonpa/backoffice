import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Text,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Spinner,
  useBreakpointValue,
  useColorMode,
  Avatar,
  Breadcrumb,
  SimpleGrid,
  Badge,
} from "@chakra-ui/react";
import Link from "next/link";
import { RiAddLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/SideBar";
import NumberFormat from "react-number-format";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useProposta } from "../../hooks/useProposta";
import { url } from "../../config/config";
import { Pagination } from "../../components/Pagination";

export default function Negotiation() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { proposta } = useContext(AuthContext);
  const isLargeScreen = useBreakpointValue({
    base: false,
    lg: true,
  });

  const [page, setPage] = useState(1);
  const { data, isLoading, error, refetch, isFetching } = useProposta(
    page,
    proposta["id"]
  );

  //console.log(data);

  return (
    <Box>
      <Header />

      <Flex width="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box
          flex="1"
          borderRadius="8"
          bgColor={colorMode === "light" ? "gray.100" : "gray.900"}
          p="8"
        >
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="md" fontWeight="bold" maxW={"100%"}>
              {proposta["employer"]} -
              <Text as="i" ml="1">{ proposta["subcategoria"]}</Text>
            </Heading>
          </Flex>

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
              <Table colorScheme="whiteAlpha" variant="simple">
                <Thead>
                  <Tr>
                    {/* <Th> Empregador </Th> */}
                    {isLargeScreen && <Th> Foto </Th>}
                    <Th> Jobber </Th>
                    {isLargeScreen && <Th> Duração </Th>}
                    {isLargeScreen && <Th isNumeric> Pagamento </Th>}
                    <Th> Estado </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.propostas.map((proposta) => {
                    return (
                      <Tr key={proposta.id}>
                        {isLargeScreen && (
                          <Td>
                            <Avatar
                              name={
                                proposta.jobber.nome +
                                " " +
                                proposta.jobber.apelido
                              }
                              alt={
                                proposta.jobber.nome +
                                " " +
                                proposta.jobber.apelido
                              }
                              size="sm"
                              src={url + proposta.jobber.img}
                            />
                          </Td>
                        )}
                        <Td>
                          {proposta.jobber.nome + " " + proposta.jobber.apelido}{" "}
                        </Td>
                        {isLargeScreen && <Td>{proposta.duracao}</Td>}
                        {isLargeScreen && (
                          <Td isNumeric>
                            <NumberFormat
                              value={proposta.pagamento}
                              displayType={"text"}
                              thousandSeparator={true}
                              suffix={" ECV"}
                            />
                          </Td>
                        )}
                        {proposta.aceite_jobber ? (
                          proposta.aceite_empre ? (
                            <Td color={"green.500"}>Proposta aceito</Td>
                          ) : (
                            <Td color={"red.500"}> Proposta NAPE</Td>
                          )
                        ) : proposta.aceite_empre ? (
                          proposta.aceite_jobber ? (
                            <Td color={"green.500"}>Proposta aceito</Td>
                          ) : (
                            <Td color={"red.500"}> Proposta NAPJ</Td>
                          )
                        ) : (
                          <Td color={"red.500"}> Proposta regeitada</Td>
                        )}
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
              <Pagination
                totalCountOfRegister={data.totalCount}
                currentePage={page}
                onPageChange={setPage}
              />
              {data.propostas.length > 0 ? (
                <SimpleGrid mt="4" spacing="2" fontWeight="thin" fontSize={12}>
                  <Text color="teal.500" fontWeight="bold">
                   <Badge colorScheme="teal">NAPE</Badge>   -  Não Aceito pelo Empregador
                  </Text>
                  {/* <Text color="red.500">APE- Aceito Pelo Empregador </Text> */}
                  <Text color="teal.500" fontWeight="bold">
                  <Badge colorScheme="teal">NAPJ</Badge>  -  Não Aceito pelo Jobber
                  </Text>
                </SimpleGrid>
              ) : null}
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
