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
  Text,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import { RiSaveLine } from "react-icons/ri";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { deleteCategoria } from "../../hooks/useCategoria";
import { useState } from "react";

type FormData = {
  nome: string;
  id: string;
  old: string;
};

export function ModalDeleteCategoria({ showModal, closeModal, dados, refetch }) {
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
    //setIsLoding(true);
     const { data } = await deleteCategoria({
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
        <ModalHeader>Eliminar Categoria</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Alert status="warning">
            <AlertIcon />
            Desejas eliminar a categoria
            <Text fontWeight="bold" ml="1">
              {dados.nome}
            </Text>
            ?
          </Alert>
        </ModalBody>

        <ModalFooter>
          <Button
            as="a"
            _hover={{ bg: "gray.600" }}
            size="md"
            mr="2"
            color={"white"}
            bg={colorMode === "light" ? "gray.800" : "gray"}
            isDisabled={isSubmitting}
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
            isLoading={isSubmitting}
          >
            Eliminar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
