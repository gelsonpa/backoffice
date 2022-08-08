import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Icon,
  Select,
  SimpleGrid,
  Spinner,
  Text,
  useColorMode,
  useToast,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import Router from "next/router";
import { useContext } from "react";
import { RiSaveLine } from "react-icons/ri";
import { Input } from "../../components/Form/input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/SideBar";
import { AuthContext } from "../../contexts/AuthContext";
import { useListCategoria } from "../../hooks/useCategoria";
import { createSubCategoria } from "../../hooks/useSubCategoria";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export default function CreateSubCategorie() {
  const { colorMode } = useColorMode();

  const { categoria } = useContext(AuthContext);

  const { data, isLoading, error, refetch } = useListCategoria();

  const toast = useToast();

  type FormData = {
    nome: string;
    img: string;
  };

  const formSchema = yup.object().shape({
    nome: yup.string().required("Nome obrigatório"),
    img: yup
      .mixed()
      .test("required", "Imagem obrigatória", (value) => value.length > 0)
      .test("fileSize", "Imagem muito grande", (value) => {
        return value.length && value[0].size <= 1024 * 2024 * 5;
      })
      .test("fileType", "Formato imagem inválido", (value) => {
        return (
          value.length &&
          ["image/png", "image/jpeg", "image/jpg"].includes(value[0].type)
        );
      }),
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

  const SubmitForm: SubmitHandler<FormData> = async (values, event) => {
    event.preventDefault();
    const { data } = await createSubCategoria({
      idcategoria: categoria["id"],
      nome: values.nome,
      img: values.img[0],
    });
    if (data.error == true) {
      handleShowToast(data.mensagem.original.sqlMessage, "error");
    } else {
      refetch();
      handleShowToast(data.mensagem, "success");
      Router.push("/catalogo/sub-categoria");
    }
  };

  return (
    <Box>
      <Header />

      <Flex width="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box
          as="form"
          autoComplete="off"
          flex="1"
          id="form-add-categoria"
          onSubmit={handleSubmit(SubmitForm)}
          borderRadius="8"
          bgColor={colorMode === "light" ? "gray.100" : "gray.900"}
          p="8"
        >
          <Heading size="md" fontWeight="bold">
            Nova Sub-categoria
          </Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing="8" width="100%">
              {isLoading ? (
                <Flex justify="center">
                  <Spinner />
                </Flex>
              ) : error ? (
                <Flex justify="center">
                  <Text>Falha ao obter os dados</Text>
                </Flex>
              ) : (
                <FormControl>
                  <FormLabel htmlFor={"categoria"}>{"Categoria"}</FormLabel>
                  <Select defaultValue={categoria["id"]}>
                    {data.map((categoria) => {
                      return (
                        <option
                          key={categoria.id}
                          disabled={
                            categoria["id"] === categoria.id ? true : false
                          }
                          value={categoria.id}
                        >
                          {categoria.nome}
                        </option>
                      );
                    })}
                  </Select>
                </FormControl>
              )}

              <Input
                name="nome"
                label="Nome Sub-categoria"
                type="text"
                placeholder="sub-categoria"
                error={errors.nome}
                {...register("nome")}
                isDisabled={isSubmitting}
              />

              <Input
                name="img"
                label="Imagem"
                type="file"
                placeholder="Imagem categoria"
                error={errors.img}
                {...register("img")}
                isDisabled={isSubmitting}
              />
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/catalogo/sub-categoria" passHref>
                <Button
                  as="a"
                  _hover={{ bg: "gray.600" }}
                  size="sm"
                  color={"white"}
                  bg={colorMode === "light" ? "gray.800" : "gray"}
                  isDisabled={isSubmitting}
                >
                  Voltar
                </Button>
              </Link>
              <Button
                _hover={{ bg: "green.800" }}
                size="sm"
                type="submit"
                bgColor="green.900"
                loadingText="Salvando..."
                color={"white"}
                leftIcon={<Icon as={RiSaveLine} />}
                isLoading={isSubmitting}
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
