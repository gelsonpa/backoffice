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
import { DeleteCidade } from "../../hooks/useCidade";
import { FaTrashAlt } from "react-icons/fa";
  type FormData = {
    id: string;
  };

  export function ModalDeleteCidade({
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
      const { data } = await DeleteCidade({
        id: dados.id,
      });
      if (data.error == true) {
        handleShowToast(data.mensagem, "error");
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
          <ModalHeader>Eliminar Cidade</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Alert status="warning">
              <AlertIcon />
              Desejas eliminar essa cidade ?
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
              leftIcon={<Icon as={FaTrashAlt} />}
              isLoading={isSubmitting == true ? true : false}
            >
              Eliminar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }
