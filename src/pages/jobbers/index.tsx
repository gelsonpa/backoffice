import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Input,
  useColorMode,
  useBreakpointValue,
  Text,
  Spinner,
  Avatar,
  Link,
} from "@chakra-ui/react";
import NexLink from "next/link";
import { setCookie } from "nookies";
import { useContext, useEffect, useState } from "react";
import { RiAddLine, RiEditLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/SideBar";
import { queryClient, url } from "../../config/config";
import { AuthContext } from "../../contexts/AuthContext";
import { getJobber, useJobber } from "../../hooks/useJobber";

export default function JoberList() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { SetJobber, search } = useContext(AuthContext);

  const isLargeScreen = useBreakpointValue({
    base: false,
    lg: true,
  });

  const [page, setPage] = useState(1);
  const { data, isLoading, error, refetch, isFetching } = useJobber(
    page,
    search["search"]
  );

  useEffect(() => {
    setPage(1);
    refetch();
  }, [search["search"]]);

  function handleJobber(e) {
    setCookie(undefined, "ID_JOBBER", e.currentTarget.dataset.id, {
      maxAge: 60 * 60 * 24 * 30, // 30 dias
      path: "/",
    });
    SetJobber({
      id: e.currentTarget.dataset.id,
    });
    //Router.push("/catalogo/sub-categoria");
  }

  async function handlePrefetchUser(id: number) {
    await queryClient.prefetchQuery(["jobber", id], () => getJobber(id));
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
              Lista Jobbers
              {!isLoading && isFetching && (
                <Spinner size="sm" color="grar.500" ml="4" />
              )}
            </Heading>

            {/* <NexLink href="/jobers/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="small"
                color={colorMode === "light" ? "white" : "white"}
                colorScheme="green"
                _hover={{ bg: "gray.500" }}
                bgColor="green.900"
                leftIcon={<Icon as={RiAddLine} />}
              >
                Registar
              </Button>
            </NexLink> */}
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
                  {data.jobbers.map((jobber) => {
                    return (
                      <Tr key={jobber.id}>
                        {isLargeScreen && (
                          <Td px={["3", "3", "6"]}>
                            <Checkbox colorScheme="green" />
                          </Td>
                        )}
                        <Td>
                          <Avatar
                            name={jobber.nome + " " + jobber.apelido}
                            alt={jobber.nome + " " + jobber.apelido}
                            size="sm"
                            src={url + jobber.img}
                          />
                        </Td>
                        <Td>
                          <Box>
                            <Link
                              onMouseEnter={() =>{ /* handlePrefetchUser(Number(jobber.id)) */ }

                              }
                            >
                              <Text fontWeight="bold">{jobber.nome + " " + jobber.apelido}</Text>
                            </Link>
                            <Text fontSize="sm" color="gray.300">
                              {jobber.email}
                            </Text>
                          </Box>
                        </Td>

                        {isLargeScreen && <Td>{jobber.tipo}</Td>}
                        {isLargeScreen && (
                          <Td>
                            {jobber.cidade != null ? jobber.cidade.nome : null}
                          </Td>
                        )}
                        {isLargeScreen && <Td>{jobber.createAt}</Td>}
                        <Td>
                          <NexLink href="/jobbers/jobber-profile" passHref>
                            <Button
                              as="a"
                              size="sm"
                              onClick={handleJobber}
                              fontSize="small"
                              onMouseEnter={() => {
                                /* handlePrefetchUser(Number(jobber.id)); */
                              }}
                              data-id={jobber.id}
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
