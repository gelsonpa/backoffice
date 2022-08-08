import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import { RiSaveLine } from "react-icons/ri";
import { Input } from "../Form/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { updateCategoria } from "../../hooks/useCategoria";

type FormData = {
  id: string;
  nomecategorie: string;
  scr: string;
  old: string;
};

export function ModalUpdateCategoria({
  showModal,
  closeModal,
  dadosmodal,
  refetch,
  handleFileChange,
  setDadosmodal
}) {
  const { colorMode, toggleColorMode } = useColorMode();

  const handleNameChange = (e) => {
    setDadosmodal({ ...dadosmodal, nome: e.target.value });
  };


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
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm();

  const SubmitForm: SubmitHandler<FormData> = async (values, event) => {
    event.preventDefault();
    const { data } = await updateCategoria({
      nome: dadosmodal.nome,
      scr: dadosmodal.scr,
      old: dadosmodal.old,
      id: dadosmodal.id,
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
      onClose={closeModal}
      closeOnOverlayClick={false}
      isOpen={showModal}
      isCentered
    >
      <ModalOverlay />
      <ModalContent
        as="form"
        autoComplete="off"
        onSubmit={handleSubmit(SubmitForm)}
      >
        <ModalHeader>{dadosmodal.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box align="center" justify="center">
            <Image
              src={dadosmodal.preview}
              maxWidth="200px"
              maxHeight="200px"
              alt="Dan Abramov"
            />
            <Flex mt="4">
              <SimpleGrid columns={1} spacing={4}>
                <Input
                  name="nomecategorie"
                  label="Alterar Nome"
                  type="text"
                  placeholder="Nome categoria"
                  value={dadosmodal.nome}
                  isRequired
                  onChange={handleNameChange}
                  autoFocus
                  error={errors.nomecategorie}
                  isDisabled={isSubmitting}
                  size="md"
                />
                <Input
                  name="imagem"
                  label="Alterar Imagem"
                  type="file"
                  onChange={handleFileChange}
                  error={errors.img}
                  placeholder="Escolher Imagem"
                  isDisabled={isSubmitting}
                  size="md"
                />
              </SimpleGrid>
            </Flex>
          </Box>
        </ModalBody>
        <ModalFooter mt="">
          <HStack spacing="2">
            <Button
              as="a"
              _hover={{ bg: "gray.600", cursor: "pointer" }}
              size="md"
              color={"white"}
              bg={colorMode === "light" ? "gray.800" : "gray"}
              isDisabled={isSubmitting}
              onClick={closeModal}
            >
              cancelar
            </Button>
            <Button
              _hover={{ bg: "green.800" }}
              size="md"
              type="submit"
              bgColor="green.900"
              loadingText="Salvando..."
              color={"white"}
              leftIcon={<Icon as={RiSaveLine} />}
              isLoading={isSubmitting}
            >
              salvar
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
