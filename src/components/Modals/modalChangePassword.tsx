import {
  Alert,
  AlertIcon,
  Box,
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
  VStack,
} from "@chakra-ui/react";
import { RiSaveLine } from "react-icons/ri";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../Form/input";
import { changePassword } from "../../hooks/useUser";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

type formData = {
  old: string;
  new: string;
  confirm: string;
};

export function ModalChangePassword({ isOpen, onClose }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const { user } = useContext(AuthContext);
  const toast = useToast();

  const signInFormSchema = yup.object().shape({
    old: yup.string().required("campo obrigatório"),
    new: yup
      .string()
      .required("campo obrigatório")
      .min(6, "No minimo 6 caracteres"),
    confirm: yup
      .string()
      .required("campo obrigatório")
      .oneOf([null, yup.ref("new")], "As senhas precisam ser iguais"),
  });

  const {
    register,
    handleSubmit, reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(signInFormSchema),
  });

  const handleShowToast = (msg, tipo) => {
    toast({
      title: "Atenção",
      status: tipo,
      description: msg,
      isClosable: true,
      position: "top-right",
    });
  };

  const SubmitForm: SubmitHandler<formData> = async (values, event) => {
    event.preventDefault();
    //console.log(values);
    const { data } = await changePassword({
      email: user.email,
      password: values.old,
      novo: values.new,
      confirm: values.confirm,
    });

    if (data.error == true) {
      handleShowToast(data.mensagem, "error");
    } else {
      onClose();
      reset();
      handleShowToast(data.mensagem, "success");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      isCentered
    >
      <ModalOverlay />
      <ModalContent
        as="form"
        autoComplete="off"
        onSubmit={handleSubmit(SubmitForm)}
      >
        <ModalHeader>Alterar senha</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box
            bg={colorMode === "light" ? "white" : "gray.700"}
            borderRadius="lg"
            color={colorMode === "light" ? "gray.700" : "whiteAlpha.900"}
          >
            <VStack spacing={5}>
              <Input
                name="old"
                label="Senha Antiga"
                type="text"
                {...register("old")}
                error={errors.old}
                isDisabled={isSubmitting}
                placeholder="Escreva a senha antiga"
              />

              <Input
                name="new"
                label="Nova Senha"
                type="text"
                {...register("new")}
                error={errors.new}
                isDisabled={isSubmitting}
                placeholder="Escreva a nova senha"
              />

              <Input
                name="confirm"
                label="Confirmação"
                type="text"
                {...register("confirm")}
                error={errors.confirm}
                isDisabled={isSubmitting}
                placeholder="Confirma a nova senha"
              />
            </VStack>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button
            as="a"
            _hover={{ bg: "gray.600", cursor: "pointer" }}
            size="md"
            mr="2"
            color={"white"}
            bg={colorMode === "light" ? "gray.800" : "gray"}
            isDisabled={isSubmitting}
            onClick={onClose}
          >
            cancelar
          </Button>
          <Button
            _hover={{ bg: "green.800" }}
            size="md"
            type="submit"
            bgColor="green.900"
            loadingText="Eliminando..."
            color={"white"}
            leftIcon={<Icon as={RiSaveLine} />}
            isLoading={isSubmitting}
          >
            salvar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
