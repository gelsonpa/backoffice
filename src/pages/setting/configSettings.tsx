import {
  Checkbox,
  Table,
  Tbody,
  Th,
  Td,
  Thead,
  Tr,
  Avatar,
  Button,
  Icon,
  Flex,
  Spinner,
  Text,
  useDisclosure,
  useBreakpointValue,
  useColorMode,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { RiAddLine, RiEditLine } from "react-icons/ri";
import { AuthContext } from "../../contexts/AuthContext";
import { url } from "../../config/config";

import { useSetting } from "../../hooks/useSetting";
import { ModalUpdateSetting } from "../../components/Modals/modalUpdateSetting";

export function ConfigSettings({ isSubmitting }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const { search } = useContext(AuthContext);
  const [page, setPage] = useState(1);
  const [showModal, setShow] = useState(false);
  const closeModal = () => setShow(false);

  const isLargeScreen = useBreakpointValue({
    base: false,
    lg: true,
  });

  const [showModalEdit, setShowModalEdit] = useState(false);
  const closeModalEdit = () => setShowModalEdit(false);

  const handleOpenModaEdit = (e) => {
    setDadosmodal({
      ...dadosmodal,
      title: e.currentTarget.dataset.title,
      taxa: e.currentTarget.dataset.taxa,
      preview: url + e.currentTarget.dataset.src,
      scr: "",
      id: e.currentTarget.dataset.id,
      old: e.currentTarget.dataset.old,
    });
    setShowModalEdit(true);
  };

  const handleFileChange = (e) => {
    setDadosmodal({
      ...dadosmodal,
      scr: e.target.files[0],
      preview: URL.createObjectURL(e.target.files[0]),
    });
  };

  const [dadosmodal, setDadosmodal] = useState({
    title: "",
    taxa: "",
    scr: "",
    id: "",
    old: "",
    preview: "",
  });

  const { data, isLoading, error, refetch, isFetching } = useSetting();

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
        <Table colorScheme="whiteAlpha" variant="simple">
          <Thead>
            <Tr>
              {isLargeScreen && (
                <Th px="6" color="gray.300" w="8">
                  <Checkbox colorScheme="green" isChecked={true} />
                </Th>
              )}
              <Th> Logotipo </Th>
              <Th>Taxa Duleo</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((setting) => {
              return (
                <Tr key={setting.id}>
                  <Td px="6">
                    <Checkbox colorScheme="green" />
                  </Td>
                  <Td>
                    <Avatar
                      name={"logotipo"}
                      size="md"
                      src={url + setting.logotipo}
                    />
                  </Td>
                  <Td>{setting.taxa} %</Td>
                  <Td>
                    <Button
                      onClick={handleOpenModaEdit}
                      data-id={setting.id}
                      data-title={"Atualizar configuração"}
                      data-src={setting.logotipo}
                      data-old={setting.logotipo}
                      data-taxa={setting.taxa}
                      fontSize="small"
                      size="sm"
                      color={colorMode === "light" ? "white" : "white"}
                      colorScheme="green.900"
                      bgColor="green.900"
                      _hover={{ bg: "green.600", cursor: "pointer" }}
                      title="Editar Configuração"
                    >
                      <Icon as={RiEditLine} />
                    </Button>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      )}

<ModalUpdateSetting
        showModal={showModalEdit}
        closeModal={closeModalEdit}
        dadosmodal={dadosmodal}
        refetch={refetch}
        handleFileChange={handleFileChange}
        setDadosmodal={setDadosmodal}
      />
    </>
  );
}
