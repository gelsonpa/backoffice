import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  useColorMode,
  useToast,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import Router from "next/router";
import { useContext, useState } from "react";
import { RiSaveLine } from "react-icons/ri";
import { Input } from "../../components/Form/input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/SideBar";
import { AuthContext } from "../../contexts/AuthContext";
import { createUser } from "../../hooks/useUser";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export default function CreateUser() {
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();

  const { loading, SetLoading, user } = useContext(AuthContext);

  type formData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    img: string;
  };

  const formSchema = yup.object().shape({
    firstName: yup.string().required("Nome obrigatório"),
    lastName: yup.string().required("Apelido obrigatório"),
    email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
    password: yup.string().required("Senha obrigatória"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(formSchema),
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
    //!!values.img[0] ? console.log("sta") : console.log("ka sta");
    const { data } = await createUser({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      img: !!values.img[0] ? values.img[0] : "",
    });
    console.log(data)
    if (data.error == true) {
      handleShowToast(data.mensagem.original.sqlMessage, "error");
    } else {
      handleShowToast(data.mensagem, "success");
      Router.push("/user");
    }
  };

  return (
    <Box>
      <Header />

      <Flex width="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box
          flex="1"
          as="form"
          autoComplete="off"
          onSubmit={handleSubmit(SubmitForm)}
          borderRadius="8"
          bgColor={colorMode === "light" ? "gray.100" : "gray.900"}
          p="8"
        >
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="md" fontWeight="bold">
              Registar utilizador
            </Heading>
          </Flex>

          <VStack spacing="8" mt={4}>
            <SimpleGrid minChildWidth="240px" spacing="4" width="100%">
              <Input
                name="firstName"
                label="Primeiro Nome"
                type="text"
                {...register("firstName")}
                error={errors.firstName}
                isDisabled={isSubmitting}
                placeholder="Primeiro Nome..."
              />
              <Input
                name="lastName"
                label="Apelido"
                type="text"
                {...register("lastName")}
                error={errors.lastName}
                isDisabled={isSubmitting}
                placeholder="Apelido..."
              />
              <Input
                name="email"
                label="Email"
                type="email"
                {...register("email")}
                error={errors.email}
                isDisabled={isSubmitting}
                placeholder="Email..."
              />
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing="4" width="100%">
              <Input
                name="password"
                label="Senha"
                type="text"
                {...register("password")}
                error={errors.password}
                isDisabled={isSubmitting}
                placeholder="Password..."
              />
              <Input
                name="img"
                label="Foto Perfil"
                type="file"
                {...register("img")}
                error={errors.img}
                isDisabled={isSubmitting}
                placeholder="Foto..."
              />
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/user" passHref>
                <Button
                  _hover={{ bg: "gray.600" }}
                  size="sm"
                  color={"white"}
                  isDisabled={isSubmitting}
                  bg={colorMode === "light" ? "gray.800" : "gray"}
                >
                  Voltar
                </Button>
              </Link>
              <Button
                _hover={{ bg: "green.800" }}
                size="sm"
                type="submit"
                loadingText="Salvando..."
                bgColor="green.900"
                color={"white"}
                isLoading={isSubmitting}
                leftIcon={<Icon as={RiSaveLine} />}
              >
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
