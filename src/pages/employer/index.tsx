import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Link,
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
} from "@chakra-ui/react";
import NexLink from "next/link";
import { setCookie } from "nookies";
import { useContext, useEffect, useState } from "react";
import { RiEditLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/SideBar";
import { queryClient, url } from "../../config/config";
import { AuthContext } from "../../contexts/AuthContext";
import { employer, getGetEmployer, useListEmployer } from "../../hooks/useEmployer";

export default function EmploerList() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { SetEmployer, search } = useContext(AuthContext);

  const isLargeScreen = useBreakpointValue({
    base: false,
    lg: true,
  });

  const [page, setPage] = useState(1);

  const { data, isLoading, error, refetch, isFetching } = useListEmployer(
    page,
    search["search"]
  );

  useEffect(() => {
    setPage(1);
    refetch();
  }, [search["search"]]);

  function handleEmployer(e) {
    setCookie(undefined, "ID_EMPLOYER", e.currentTarget.dataset.id, {
      maxAge: 60 * 60 * 24 * 30, // 30 dias
      path: "/",
    });
    SetEmployer({
      id: e.currentTarget.dataset.id,
    });
  }
  async function handlePrefetchUser(id: number) {
    await queryClient.prefetchQuery(["employer", id], () => getGetEmployer(id));
  }

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
            <Heading size="md" fontWeight="bold">
              Lista Employers
              {!isLoading && isFetching && (
                <Spinner size="sm" color="grar.500" ml="4" />
              )}
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
              <Table colorScheme="whiteAlpha" variant="unstyled">
                <Thead>
                  <Tr>
                    {isLargeScreen && (
                      <Th px={["3", "3", "6"]} color="gray.300" w="8">
                        <Checkbox colorScheme="green" isChecked={true} />
                      </Th>
                    )}
                    <Th> Foto </Th>
                    <Th> Nome </Th>
                    {isLargeScreen && <Th> Tipo </Th>}
                    {isLargeScreen && <Th> Cidade </Th>}
                    {isLargeScreen && <Th> registo </Th>}
                    <Th> </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.empregadores.map((employer: employer) => {
                    return (
                      <Tr key={employer.id}>
                        {isLargeScreen && (
                          <Td px={["3", "3", "6"]}>
                            <Checkbox colorScheme="green" />
                          </Td>
                        )}
                        <Td>
                          <Avatar
                            name={employer.nome + " " + employer.apelido}
                            alt={employer.nome + " " + employer.apelido}
                            size="sm"
                            src={url + employer.img}
                          />
                        </Td>
                        <Td>
                          <Box>
                            <Link
                              onMouseEnter={()=>{}/* handlePrefetchUser(Number(employer.id)) */}
                            >
                              <Text fontWeight="bold">{employer.nome}</Text>
                            </Link>
                            <Text fontSize="sm" color="gray.300">
                              {employer.email}
                            </Text>
                          </Box>
                        </Td>

                        {isLargeScreen && <Td>{employer.tipo}</Td>}
                        {isLargeScreen && (
                          <Td>
                            {employer.Cidade != null
                              ? employer.Cidade.nome
                              : null}
                          </Td>
                        )}
                        {isLargeScreen && <Td>{employer.createdAt}</Td>}
                        <Td>
                          <NexLink href="/employer/employer-profile" passHref>
                            <Button
                              as="a"
                              size="sm"
                              onClick={handleEmployer}
                              fontSize="small"
                              onMouseEnter={() => {
                                /* handlePrefetchUser(Number(employer.id)); */
                              }}
                              data-id={employer.id}
                              color={colorMode === "light" ? "white" : "white"}
                              colorScheme="green.900"
                              bgColor="green.900"
                              leftIcon={<Icon as={RiEditLine} />}
                            >
                              Ver
                            </Button>
                          </NexLink>
                        </Td>
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
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
