import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  HStack,
  Icon,
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Image,
  SimpleGrid,
  useToast,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { RiAddLine, RiEditLine, RiSaveLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/SideBar";
import {
  deleteSubCategoria,
  updateSubCategoria,
  useSubCategoria,
} from "../../hooks/useSubCategoria";
import { useContext, useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { AuthContext } from "../../contexts/AuthContext";
import { url } from "../../config/config";
import { Input } from "../../components/Form/input";
import { ModalDeleteSubCategoria } from "../../components/Modals/modalDeleteSubCategoria";
import { ModalUpdateSubCategoria } from "../../components/Modals/modalUpdateSubCategoria";

export default function SubCategoria(props) {
  const { colorMode, toggleColorMode } = useColorMode();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { categoria, loading, SetLoading, search } = useContext(AuthContext);

  const isLargeScreen = useBreakpointValue({
    base: false,
    lg: true,
  });

  const router = useRouter();

  const { id } = router.query;

  const [page, setPage] = useState(1);

  const { data, isLoading, error, refetch, isFetching } = useSubCategoria(
    categoria["id"],
    page, search["search"]
  );

  useEffect(() => {
    setPage(1)
    refetch();
  }, [search])

  const [dadosmodal, setDadosmodal] = useState({
    title: "",
    nome: "",
    scr: "",
    id: "",
    old: "",
    preview: "",
  });

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

  const closeModal = () => setShow(false);

  const closeModalEdit = () => setShowModalEdit(false);

  function handleButtonPress(e) {
    setDadosmodal({
      ...dadosmodal,
      title: e.currentTarget.dataset.title,
      nome: e.currentTarget.dataset.title,
      preview: url + e.currentTarget.dataset.src,
      id: e.currentTarget.dataset.id,
      scr: "",
      old: e.currentTarget.dataset.old,
    });
    setShowModalEdit(true);
  }

  const handleFileChange = (e) => {
    setDadosmodal({
      ...dadosmodal,
      scr: e.target.files[0],
      preview: URL.createObjectURL(e.target.files[0]),
    });
  };

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
              {categoria["nome"]}
              {!isLoading && isFetching && (
                <Spinner size="sm" color="grar.500" ml="4" />
              )}
            </Heading>

            <Link href="/catalogo/create-sub" passHref>
              <Button
                as="a"
                size="sm"
                href=""
                fontSize="small"
                color={colorMode === "light" ? "white" : "white"}
                colorScheme="green"
                _hover={{ bg: "gray.500" }}
                bgColor="green.900"
                leftIcon={<Icon as={RiAddLine} />}
              >
                Sub-categoria
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
                    {isLargeScreen && <Th> ID </Th>}
                    <Th> IMG </Th>
                    <Th> Nome Sub-Categoria </Th>
                    {isLargeScreen && <Th> DateTime </Th>}
                    <Th> </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.subcategorias.map((subcategoria) => {
                    return (
                      <Tr key={subcategoria.id}>
                        {isLargeScreen && <Td>{subcategoria.id}</Td>}
                        <Td>
                          <Avatar
                            name={subcategoria.nome}
                            size="sm"
                            src={url + subcategoria.img}
                          />
                        </Td>
                        <Td>{subcategoria.nome}</Td>
                        {isLargeScreen && <Td>{subcategoria.createAt}</Td>}
                        <Td>
                          <HStack spacing="2">
                            <Button
                              onClick={handleButtonPress}
                              data-id={subcategoria.id}
                              data-title={subcategoria.nome}
                              data-src={subcategoria.img}
                              data-old={subcategoria.img}
                              fontSize="small"
                              size="sm"
                              color={colorMode === "light" ? "white" : "white"}
                              colorScheme="green.900"
                              bgColor="green.900"
                              _hover={{ bg: "green.600", cursor: "pointer" }}
                              title="Editar Sub-Categoria"
                            >
                              <Icon as={RiEditLine} />
                            </Button>
                            <Button
                              onClick={handleOpen}
                              data-id={subcategoria.id}
                              data-title={subcategoria.nome}
                              data-src={subcategoria.img}
                              data-old={subcategoria.img}
                              fontSize="small"
                              size="sm"
                              color={colorMode === "light" ? "white" : "white"}
                              colorScheme="red.900"
                              bgColor="red.700"
                              _hover={{ bg: "red.600", cursor: "pointer" }}
                              title="Eliminar Sub-Categoria"
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

      <ModalDeleteSubCategoria
        showModal={showModal}
        closeModal={closeModal}
        dados={dadosmodal}
        refetch={refetch}
      />

      <ModalUpdateSubCategoria
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
