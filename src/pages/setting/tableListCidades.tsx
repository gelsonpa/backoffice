import {
  Button,
  Checkbox,
  Flex,
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
  useDisclosure,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { Pagination } from "../../components/Pagination";
import { useCidades } from "../../hooks/useCidade";
import { ModalDeleteCidade } from "../../components/Modals/modalDeleteCidade";
import { AuthContext } from "../../contexts/AuthContext";

export function TableListCidades({ isSubmitting }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const { search } = useContext(AuthContext);
  const [page, setPage] = useState(1);
  const [showModal, setShow] = useState(false);
  const closeModal = () => setShow(false);

  const isLargeScreen = useBreakpointValue({
    base: false,
    lg: true,
  });

  const { data, isLoading, error, refetch } = useCidades(page, search["search"]);

  useEffect(() => {
    setPage(1);
    refetch();
  }, [isSubmitting, search["search"]]);

  const [dadosmodal, setDadosmodal] = useState({
    id: "",
  });

  const handleOpen = (e) => {
    setDadosmodal({
      ...dadosmodal,
      id: e.currentTarget.dataset.id,
    });
    setShow(true);
  };

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
        <>
          <Table colorScheme="whiteAlpha" variant="simple">
            <Thead>
              <Tr>
                {isLargeScreen && (
                  <Th px="6" color="gray.300" w="8">
                    <Checkbox colorScheme="green" isChecked={true} />
                  </Th>
                )}
                {isLargeScreen && <Th> ID </Th>}
                <Th> Ilha </Th>
                <Th>Cidade</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.cidades.map((cidade) => {
                return (
                  <Tr key={cidade.id}>
                    {isLargeScreen && (
                      <Td px="6">
                        <Checkbox colorScheme="green" />
                      </Td>
                    )}
                    {isLargeScreen && <Td>{cidade.id}</Td>}
                    <Td>{cidade.Ilha.nome}</Td>
                    <Td>{cidade.nome}</Td>
                    <Td>
                      <Button
                        onClick={handleOpen}
                        data-id={cidade.id}
                        fontSize="small"
                        size="sm"
                        color={colorMode === "light" ? "white" : "white"}
                        colorScheme="red.900"
                        bgColor="red.700"
                        _hover={{ bg: "red.600", cursor: "pointer" }}
                        title="Eliminar cidade"
                      >
                        <Icon as={FaTrashAlt} />
                      </Button>
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
      <ModalDeleteCidade
        showModal={showModal}
        closeModal={closeModal}
        dados={dadosmodal}
        refetch={refetch}
      />
    </>
  );
}
