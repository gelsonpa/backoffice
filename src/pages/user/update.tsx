import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  SimpleGrid,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import { useContext, useState } from "react";
import { RiSaveLine } from "react-icons/ri";
import { Input } from "../../components/Form/input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/SideBar";
import { url } from "../../config/config";
import { AuthContext } from "../../contexts/AuthContext";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateUser } from "../../hooks/useUser";
import Router from "next/router";

type formData = {
  firstName: string;
  lastName: string;
  email: string;
  img: string;
};

export default function UpdateUser() {
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();

  const { user, refetch } = useContext(AuthContext);

  const [dadosform, setDadosForm] = useState({ preview: "", img: "" });

  const handleFileChange = (e) => {
    setDadosForm({
      ...dadosform,
      img: e.target.files[0],
      preview: URL.createObjectURL(e.target.files[0]),
    });
  };

  const handleShowToast = (msg, tipo) => {
    toast({
      title: "Atenção",
      status: tipo,
      description: msg,
      isClosable: true,
      position: "top-right",
    });
  };

  const formSchema = yup.object().shape({
    firstName: yup.string().required("Nome obrigatório"),
    lastName: yup.string().required("Apelido obrigatório"),
    email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const SubmitForm: SubmitHandler<formData> = async (values, event) => {
    event.preventDefault();

    const { data } = await updateUser({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      old: user.img,
      userEmail: user.email,
      img: !!values.img[0] ? values.img[0] : "",
    });
    if (data.error == true) {
      handleShowToast(data.mensagem.original.sqlMessage, "error");
    } else {
      handleShowToast(data.mensagem, "success");
      refetch();
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
          autoComplete="OFF"
          onSubmit={handleSubmit(SubmitForm)}
          borderRadius="8"
          bgColor={colorMode === "light" ? "gray.100" : "gray.900"}
          p="8"
        >
          <SimpleGrid minChildWidth="240px" spacing="4" width="100%">
            <Box
              w={"full"}
              maxH="full"
              bg={colorMode === "light" ? "gray.100" : "gray.900"}
              boxShadow={"1xl"}
              rounded={"lg"}
              p={6}
              textAlign={"center"}
            >
              <Avatar
                size={"2xl"}
                src={!!dadosform.preview ? dadosform.preview : url + user.img}
                name={user.firstName + " " + user.lastName}
                alt={user.firstName + " " + user.lastName}
                mb={4}
                pos={"relative"}
                _after={{
                  content: '""',
                  w: 4,
                  h: 4,
                  bg: "green.300",
                  border: "2px solid white",
                  rounded: "full",
                  pos: "absolute",
                  bottom: 0,
                  right: 3,
                }}
              />
              <Input
                name="img"
                label="Foto Perfil"
                type="file"
                error={errors.img}
                {...register("img")}
                isDisabled={isSubmitting}
                onChange={handleFileChange}
                placeholder="Foto..."
              />
            </Box>
            <SimpleGrid minChildWidth="240px">
              <Input
                name="firstName"
                label="Primeiro Nome"
                type="text"
                defaultValue={user.firstName}
                /* onChange={handleValue} */
                error={errors.firstName}
                {...register("firstName")}
                isDisabled={isSubmitting}
                placeholder="Primeiro nome..."
              />
              <Input
                name="lastName"
                label="Apelido"
                type="text"
                defaultValue={user.lastName}
                /* onChange={handleValue} */
                error={errors.lastName}
                {...register("lastName")}
                isDisabled={isSubmitting}
                placeholder="Apelido..."
              />
              <Input
                name="email"
                label="Email"
                type="email"
                defaultValue={user.email}
                /* onChange={handleValue} */
                error={errors.email}
                {...register("email")}
                isDisabled={isSubmitting}
                placeholder="Email..."
              />
            </SimpleGrid>
          </SimpleGrid>
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
                isDisabled={!isDirty}
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
