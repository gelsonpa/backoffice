import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  Spinner,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
  useColorMode,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { RiAddLine, RiEditLine, RiLockUnlockLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/SideBar";
import { url } from "../../config/config";
import { AuthContext } from "../../contexts/AuthContext";
import { deleteUser, useListUser } from "../../hooks/useUser";

import { Pagination } from "../../components/Pagination";
import { ModalDeleteUser } from "../../components/Modals/modalDeleteUser";
import { ModalChangePassword } from "../../components/Modals/modalChangePassword";

export default function User() {
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();
  const isLargeScreen = useBreakpointValue({
    base: false,
    lg: true,
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showModal, setShow] = useState(false);

  const { loading, SetLoading, user, search } = useContext(AuthContext);

  const [page, setPage] = useState(1);
  const { data, isLoading, error, refetch, isFetching } = useListUser(
    page,
    Number(user.id),
    search["search"]
  );
  //console.log(data)

  useEffect(() => {
    refetch();
  }, [search["search"]]);

  const [dadosmodal, setDadosmodal] = useState({
    title: "",
    nome: "",
    scr: "",
    id: "",
    old: "",
    preview: "",
  });

  const handleOpen = (e) => {
    setDadosmodal({
      ...dadosmodal,
      nome: e.currentTarget.dataset.nome,
      id: e.currentTarget.dataset.id,
      old: e.currentTarget.dataset.old,
    });
    setShow(true);
  };
  const closeModal = () => setShow(false);

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
          <Flex align="center" justify="center">
            {loading ? (
              <Spinner />
            ) : (
              <>
                <Box
                  w={"full"}
                  maxH="full"
                  bg={colorMode === "light" ? "white" : "gray.900"}
                  boxShadow={"1xl"}
                  rounded={"lg"}
                  p={6}
                  textAlign={"center"}
                >
                  <Avatar
                    size={"2xl"}
                    src={url + user.img}
                    alt={user.firstName + " " + user.lastName}
                    mb={4}
                    name={user.firstName + " " + user.lastName}
                    pos={"relative"}
                    _after={{
                      content: '""',
                      w: 4,
                      h: 4,
                      bg: "green.300",
                      border: "2px solid white",
                      rounded: "full",
                      pos: "absolute",
                      bottom: 0,
                      right: 3,
                    }}
                  />
                  <Heading fontSize={"2xl"} fontFamily={"body"}>
                    {user.firstName + " " + user.lastName}
                  </Heading>
                  <Text fontWeight={600} color={"gray.500"} mb={4}>
                    {user.email}
                  </Text>

                  <Stack
                    mt={4}
                    direction={"row"}
                    align="center"
                    justify="center"
                    spacing={4}
                  >
                    <Link href="/user/update" passHref>
                      <Button
                        fontSize={"sm"}
                        rounded={"full"}
                        _focus={{
                          bg: colorMode === "light" ? "gray.300" : "gray.600",
                        }}
                        leftIcon={<Icon as={RiEditLine} />}
                      >
                        Editar
                      </Button>
                    </Link>
                    <Button
                      fontSize={"sm"}
                      rounded={"full"}
                      _focus={{
                        bg: colorMode === "light" ? "gray.300" : "gray.600",
                      }}
                      leftIcon={<Icon as={RiLockUnlockLine} />}
                      onClick={onOpen}
                    >
                      Senha
                    </Button>
                  </Stack>
                  <Divider mt={8} />

                  <Flex mb="8" mt="4" justify="space-between" align="center">
                    <Heading size="md" fontWeight="bold">
                      Lista utilizadores
                      {!isLoading && isFetching && (
                        <Spinner size="sm" color="grar.500" ml="4" />
                      )}
                    </Heading>

                    <Link href="/user/create" passHref>
                      <Button
                        as="a"
                        size="sm"
                        href=""
                        fontSize="small"
                        color={colorMode === "light" ? "white" : "white"}
                        colorScheme="green"
                        _hover={{ bg: "green.600" }}
                        bgColor="green.900"
                        leftIcon={<Icon as={RiAddLine} />}
                      >
                        Novo utilizador
                      </Button>
                    </Link>
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
                      <Flex>
                        <Table colorScheme="whiteAlpha" variant="simple">
                          <Thead>
                            <Tr>
                              <Th px="6" color="gray.300" w="8">
                                <Checkbox
                                  colorScheme="green"
                                  isChecked={true}
                                />
                              </Th>
                              {isLargeScreen && <Th> ID </Th>}
                              {isLargeScreen && <Th> Foto </Th>}
                              <Th> Nome Utilizador </Th>
                              {isLargeScreen && <Th> DATATIME </Th>}
                              <Th> acção</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {data.users.map((user) => {
                              return (
                                <Tr key={user.id}>
                                  <Td px="6">
                                    <Checkbox colorScheme="green" />
                                  </Td>
                                  {isLargeScreen && <Td>{user.id}</Td>}
                                  {isLargeScreen && (
                                    <Td>
                                      <Avatar
                                        name={
                                          user.firstName + " " + user.lastName
                                        }
                                        size="sm"
                                        src={url + user.img}
                                      />
                                    </Td>
                                  )}
                                  <Td>
                                    <Box>
                                      <Text fontWeight="bold">
                                        {user.firstName + " " + user.lastName}
                                      </Text>
                                      <Text fontSize="sm" color="gray.300">
                                        {user.email}
                                      </Text>
                                    </Box>
                                  </Td>
                                  {isLargeScreen && <Td>{user.createdAt}</Td>}
                                  <Td>
                                    <HStack spacing="2">
                                      <Button
                                        onClick={handleOpen}
                                        data-id={user.id}
                                        data-nome={user.firstName}
                                        data-old={user.img}
                                        fontSize="small"
                                        size="sm"
                                        color={
                                          colorMode === "light"
                                            ? "white"
                                            : "white"
                                        }
                                        colorScheme="red.900"
                                        bgColor="red.700"
                                        _hover={{
                                          bg: "red.600",
                                          cursor: "pointer",
                                        }}
                                        title="Eliminar Categoria"
                                      >
                                        <Icon as={FaTrashAlt} />
                                      </Button>
                                    </HStack>
                                  </Td>
                                </Tr>
                              );
                            })}
                          </Tbody>
                        </Table>
                      </Flex>
                      <Pagination
                        totalCountOfRegister={data.totalCount}
                        currentePage={page}
                        onPageChange={setPage}
                      />
                    </>
                  )}
                </Box>

                <ModalDeleteUser
                  showModal={showModal}
                  closeModal={closeModal}
                  dados={dadosmodal}
                  refetch={refetch}
                />

                <ModalChangePassword isOpen={isOpen} onClose={onClose} />
              </>
            )}
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
