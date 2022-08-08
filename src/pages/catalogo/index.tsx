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
  useBreakpointValue,
  useColorMode,
  Spinner,
  Text,
  Avatar,
  HStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { RiAddLine, RiEditLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/SideBar";
import { url } from "../../config/config";

import { useCategoria } from "../../hooks/useCategoria";
import { AuthContext } from "../../contexts/AuthContext";
import Router from "next/router";
import { setCookie } from "nookies";
import { ModalDeleteCategoria } from "../../components/Modals/modalDeleteCategoria";
import { ModalUpdateCategoria } from "../../components/Modals/modalUpdateCategoria";

export default function CatalogoList() {
  const { colorMode, toggleColorMode } = useColorMode();

  const { SetCategoria, search } = useContext(AuthContext);

  const [showModal, setShow] = useState(false);

  const [showModalEdit, setShowModalEdit] = useState(false);

  const handleOpen = (e) => {
    setDadosmodal({
      ...dadosmodal,
      nome: e.currentTarget.dataset.title,
      id: e.currentTarget.dataset.id,
      old: e.currentTarget.dataset.old,
    });
    setShow(true);
  };

  const handleOpenModaEdit = (e) => {
    setDadosmodal({
      ...dadosmodal,
      title: e.currentTarget.dataset.title,
      nome: e.currentTarget.dataset.title,
      preview: url + e.currentTarget.dataset.src,
      scr: "",
      id: e.currentTarget.dataset.id,
      old: e.currentTarget.dataset.old,
    });
    setShowModalEdit(true);
  };

  const closeModal = () => setShow(false);

  const closeModalEdit = () => setShowModalEdit(false);

  const isLargeScreen = useBreakpointValue({
    base: false,
    lg: true,
  });

  const [page, setPage] = useState(1);

  const { data, isLoading, error, refetch, isFetching } = useCategoria(
    page,
    search["search"]
  );

  useEffect(() => {
    setPage(1);
    refetch();
  }, [search]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [dadosmodal, setDadosmodal] = useState({
    title: "",
    nome: "",
    scr: "",
    id: "",
    old: "",
    preview: "",
  });

  const handleFileChange = (e) => {
    setDadosmodal({
      ...dadosmodal,
      scr: e.target.files[0],
      preview: URL.createObjectURL(e.target.files[0]),
    });
  };

  function handleSubCategoria(e) {
    setCookie(undefined, "NAME_CATEGORIE", e.currentTarget.dataset.title, {
      maxAge: 60 * 60 * 24 * 30, // 30 dias
      path: "/",
    });
    setCookie(undefined, "ID_CATEGORIE", e.currentTarget.dataset.id, {
      maxAge: 60 * 60 * 24 * 30, // 30 dias
      path: "/",
    });
    SetCategoria({
      nome: e.currentTarget.dataset.title,
      id: e.currentTarget.dataset.id,
    });
    Router.push("/catalogo/sub-categoria");
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
              Catálogo
              {!isLoading && isFetching && (
                <Spinner size="sm" color="grar.500" ml="4" />
              )}
            </Heading>

            <Link href="/catalogo/create" passHref>
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
                Nova categoria
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
              <Table colorScheme="whiteAlpha" variant="simple">
                <Thead>
                  <Tr>
                    <Th px="6" color="gray.300" w="8">
                      <Checkbox colorScheme="green" isChecked={true} />
                    </Th>
                    {isLargeScreen && <Th> ID </Th>}
                    {isLargeScreen && <Th> Foto </Th>}
                    <Th> Nome Categoria </Th>
                    {isLargeScreen && <Th> DATATIME </Th>}
                    <Th> </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.categorias.map((categoria) => {
                    return (
                      <Tr key={categoria.id}>
                        <Td px="6">
                          <Checkbox colorScheme="green" />
                        </Td>
                        {isLargeScreen && <Td>{categoria.id}</Td>}
                        {isLargeScreen && (
                          <Td>
                            <Avatar
                              name={categoria.nome}
                              size="sm"
                              src={url + categoria.img}
                            />
                          </Td>
                        )}
                        <Td>{categoria.nome}</Td>
                        {isLargeScreen && <Td>{categoria.createAt}</Td>}
                        <Td>
                          <HStack spacing="2">
                            <Button
                              as="a"
                              onClick={handleSubCategoria}
                              size="sm"
                              data-id={categoria.id}
                              data-title={categoria.nome}
                              fontSize="small"
                              color={colorMode === "light" ? "white" : "white"}
                              colorScheme="green.900"
                              bgColor="green.900"
                              _hover={{ bg: "green.600", cursor: "pointer" }}
                              title="Ver Sub-Categorias"
                            >
                              Sub
                            </Button>

                            <Button
                              onClick={handleOpenModaEdit}
                              data-id={categoria.id}
                              data-title={categoria.nome}
                              data-src={categoria.img}
                              data-old={categoria.img}
                              fontSize="small"
                              size="sm"
                              color={colorMode === "light" ? "white" : "white"}
                              colorScheme="green.900"
                              bgColor="green.900"
                              _hover={{ bg: "green.600", cursor: "pointer" }}
                              title="Editar Categoria"
                            >
                              <Icon as={RiEditLine} />
                            </Button>
                            <Button
                              onClick={handleOpen}
                              data-id={categoria.id}
                              data-title={categoria.nome}
                              data-src={categoria.img}
                              data-old={categoria.img}
                              fontSize="small"
                              size="sm"
                              color={colorMode === "light" ? "white" : "white"}
                              colorScheme="red.900"
                              bgColor="red.700"
                              _hover={{ bg: "red.600", cursor: "pointer" }}
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
              <Pagination
                totalCountOfRegister={data.totalCount}
                currentePage={page}
                onPageChange={setPage}
              />
            </>
          )}
        </Box>
      </Flex>

      <ModalDeleteCategoria
        showModal={showModal}
        closeModal={closeModal}
        dados={dadosmodal}
        refetch={refetch}
      />

      <ModalUpdateCategoria
        showModal={showModalEdit}
        closeModal={closeModalEdit}
        dadosmodal={dadosmodal}
        refetch={refetch}
        handleFileChange={handleFileChange}
        setDadosmodal={setDadosmodal}
      />
    </Box>
  );
}
