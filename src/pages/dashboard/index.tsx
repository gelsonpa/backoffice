import {
  Badge,
  Box,
  Flex,
  SimpleGrid,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorMode,
} from "@chakra-ui/react";
import { BsPerson } from "react-icons/bs";
import { FiServer } from "react-icons/fi";
import { Header } from "../../components/Header";

import { Sidebar } from "../../components/SideBar";
import { StatsCard } from "../../components/statsCard";
import { ChartsEmployer, ChartsJobber } from "../../components/chart";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useJobber } from "../../hooks/useJobber";
import { useListEmployer } from "../../hooks/useEmployer";
import { useGetBiscaite } from "../../hooks/useBiscaite";

export default function Dashboard() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { search } = useContext(AuthContext);
  const [page, setPage] = useState(1);

  const resultJobber = useJobber(1, search["search"]);
  const resultEmployer = useListEmployer(1, search["search"]);
  //console.log(resultJobber.data?.totalCount)

  const { data, isLoading, error, refetch, isFetching } = useGetBiscaite();

  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex width="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <SimpleGrid
          flex="1"
          columns={1}
          gap="2"
          spacingX="30px"
          spacingY="20px"
          minChildWidth={320}
          align="flex-start"
        >
          <Box
            p={["4", "8"]}
            bg={colorMode === "light" ? "gray.100" : "gray.900"}
            borderRadius={8}
            pb="4"
          >
            <Text fontSize="lg" mb="4" fontWeight="bold">
              Empregadores
            </Text>
            <ChartsEmployer />
          </Box>

          <Box
            p={["4", "8"]}
            bg={colorMode === "light" ? "gray.100" : "gray.900"}
            borderRadius={8}
            pb="4"
          >
            <Text fontSize="lg" mb="4" fontWeight="bold">
              Jobbers
            </Text>
            <ChartsJobber />
          </Box>

          <Box
            p={["4", "8"]}
            bg={colorMode === "light" ? "gray.100" : "gray.900"}
            borderRadius={8}
            pb="4"
          >
            <StatsCard
              title={"Total Jobers"}
              stat={resultJobber.data?.totalCount}
              icon={<BsPerson size={"2em"} />}
            />
            <StatsCard
              title={"Total Empregadores"}
              stat={resultEmployer.data?.totalCount}
              icon={<FiServer size={"2em"} />}
            />
          </Box>

          <Box
            p={["4", "8"]}
            bg={colorMode === "light" ? "gray.100" : "gray.900"}
            borderRadius={8}
            pb="4"
          >
            {isLoading ? (
              <Flex justify="center">
                <Spinner />
              </Flex>
            ) : error ? (
              <Flex justify="center">
                <Text>Falha ao obter os dados</Text>
              </Flex>
            ) : (
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Últimas Propostas</Th>
                    {/* <Th>Data</Th> */}
                    <Th isNumeric>Estado</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.map((biscaite) => {
                    return (
                      <Tr key={biscaite.id}>
                        <Td>{biscaite.subcategoria.nome}</Td>
                        {/* <Td>millimetres (mm)</Td> */}
                        <Td isNumeric>
                          {!!biscaite.estado ? (
                            <Badge ml="1" colorScheme="green">
                              Activo
                            </Badge>
                          ) : (
                            <Badge ml="1" colorScheme="red">
                              Acertado
                            </Badge>
                          )}
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            )}
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}
