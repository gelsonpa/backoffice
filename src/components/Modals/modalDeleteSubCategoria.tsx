import {
  Alert,
  AlertIcon,
  Button,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import { RiSaveLine } from "react-icons/ri";
import { SubmitHandler, useForm } from "react-hook-form";
import { deleteSubCategoria } from "../../hooks/useSubCategoria";
type FormData = {
  nome: string;
  id: string;
  old: string;
};

export function ModalDeleteSubCategoria({
  showModal,
  closeModal,
  dados,
  refetch,
}) {
  const { colorMode, toggleColorMode } = useColorMode();

  const toast = useToast();

  const handleShowToast = (msg, tipo) => {
    toast({
      title: "Atenção",
      status: tipo,
      description: msg,
      isClosable: true,
      position: "top-right",
    });
  };

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const SubmitForm: SubmitHandler<FormData> = async (values, event) => {
    event.preventDefault();
    const { data } = await deleteSubCategoria({
      old: dados.old,
      id: dados.id,
    });
    if (data.error == true) {
      handleShowToast(data.mensagem.original.sqlMessage, "error");
    } else {
      closeModal();
      refetch();
      handleShowToast(data.mensagem, "success");
    }
  };
  return (
    <Modal
      isOpen={showModal}
      closeOnOverlayClick={false}
      onClose={closeModal}
      isCentered
    >
      <ModalOverlay />
      <ModalContent
        as="form"
        autoComplete="off"
        onSubmit={handleSubmit(SubmitForm)}
      >
        <ModalHeader>Eliminar Sub-Categoria</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Alert status="warning">
            <AlertIcon />
            Desejas eliminar essa sub-categoria ?
          </Alert>
        </ModalBody>

        <ModalFooter>
          <Button
            as="a"
            _hover={{ bg: "gray.600", cursor: "pointer" }}
            size="md"
            mr="2"
            color={"white"}
            bg={colorMode === "light" ? "gray.800" : "gray"}
            isDisabled={isSubmitting == true ? true : false}
            onClick={closeModal}
          >
            cancelar
          </Button>
          <Button
            _hover={{ bg: "red.800" }}
            size="md"
            type="submit"
            bgColor="red.900"
            loadingText="Eliminando..."
            color={"white"}
            leftIcon={<Icon as={RiSaveLine} />}
            isLoading={isSubmitting == true ? true : false}
          >
            Eliminar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
