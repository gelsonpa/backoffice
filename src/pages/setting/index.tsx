import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Icon,
  Select,
  SimpleGrid,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorMode,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/SideBar";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { RiSaveLine } from "react-icons/ri";
import { Input } from "../../components/Form/input";
import {
  createCidade,
  getCidadeResponse,
  useCidades,
  useGetIlhas,
} from "../../hooks/useCidade";
import { useEffect, useState } from "react";
import { TableListCidades } from "./tableListCidades";
import { ConfigSettings } from "./configSettings";
import EditorText from "../../components/Form/Editor";

type FormData = {
  ilha: string;
  cidade: string;
};

export default function Setting() {
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();

  const { data, isLoading, error, refetch } = useGetIlhas();

  const formSchema = yup.object().shape({
    ilha: yup.string().ensure().required("Ilha obrigatório"),
    cidade: yup.string().required("Nome obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
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
    //console.log(values);
    const { data } = await createCidade({
      nome: values.cidade,
      idIlha: values.ilha,
    });
    if (data.error == true) {
      handleShowToast(data.mensagem, "error");
    } else {
      refetch();
      //event.target.reset();
      reset();
      handleShowToast(data.mensagem, "success");
      //Router.push("/catalogo/sub-categoria");
    }
  };

  return (
    <Box>
      <Header />

      <Flex width="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box
          flex="1"
          borderRadius="8"
          bgColor={colorMode === "light" ? "gray.100" : "gray.900"}
          p="8"
        >
          <Flex mb="6" justify="space-between" align="center">
            <Heading size="md" fontWeight="bold">
              Cidades
            </Heading>
          </Flex>

          <Divider my="6" borderColor="gray.700" />
          <Box as="form" autoComplete="off" onSubmit={handleSubmit(SubmitForm)}>
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
                  <FormControl isInvalid={!!errors.ilha}>
                    <FormLabel htmlFor={"Ilha"}>{"Escolher ilha"}</FormLabel>
                    <Select
                      name="ilha"
                      id="ilha"
                      placeholder="Escolha a opção"
                      color={colorMode === "light" ? "gray.900" : "gray.300"}
                      bgColor={colorMode === "light" ? "gray.300" : "gray.800"}
                      _hover={{
                        bg: colorMode === "light" ? "gray.300" : "gray.700",
                      }}
                      error={errors.ilha}
                      {...register("ilha")}
                      isDisabled={isSubmitting}
                    >
                      {data.map((ilha) => {
                        return (
                          <option key={ilha.id} value={ilha.id}>
                            {ilha.nome}
                          </option>
                        );
                      })}
                    </Select>
                    {!!errors.ilha && (
                      <FormErrorMessage>{errors.ilha.message}</FormErrorMessage>
                    )}
                  </FormControl>
                )}
                <Input
                  name="cidade"
                  label="Nome cidade"
                  type="text"
                  placeholder="Nome cidade"
                  error={errors.cidade}
                  {...register("cidade")}
                  isDisabled={isSubmitting}
                />
              </SimpleGrid>
            </VStack>
            <Flex mt="8" justify="flex-end">
              <HStack spacing="0">
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
                  Adicionar
                </Button>
              </HStack>
            </Flex>
          </Box>

          <Divider my="6" borderColor="gray.700" />
          <Flex mb="6" justify="space-between" align="center">
            <Heading size="md" fontWeight="bold">
              Lista cidades
            </Heading>
          </Flex>
          <TableListCidades isSubmitting={isSubmitting} />

          <Divider my="6" borderColor="gray.700" />

          <Flex mb="6" justify="space-between" align="center">
            <Heading size="md" fontWeight="bold">
              Configuração
            </Heading>
          </Flex>
          <ConfigSettings isSubmitting={isSubmitting} />

          <Divider my="6" borderColor="gray.700" />

          <Flex mb="6" justify="space-between" align="center">
            <Heading size="md" fontWeight="bold">
              Politica de Privacidade/Termo de Uso
            </Heading>
          </Flex>

          <EditorText/>
        </Box>
      </Flex>
    </Box>
  );
}
