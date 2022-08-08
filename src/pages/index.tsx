import {
  Flex,
  Image,
  Box,
  Button,
  Stack,
  useColorMode,
  useToast,
  Spinner,
} from "@chakra-ui/react";

import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../contexts/AuthContext";

import { Input } from "../components/Form/input";
import { InputPass } from "../components/Form/inputpass";
import Router from "next/router";
import { api } from "../config/config";

import { parseCookies } from "nookies";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export default function SinIng() {
  const { colorMode, toggleColorMode } = useColorMode();

  const { signIn } = useContext(AuthContext);

  const { alert } = useContext(AuthContext);

  const [checkLoading, setCheckLoading] = useState(true);

  const cookies = parseCookies();

  useEffect(() => {
    const checkAuthenticate = async () => {
      const token = cookies.AUTH_TOKEN;
      if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        Router.push("/dashboard");
      } else {
        setCheckLoading(false);
      }
    };
    checkAuthenticate();

    console.log("txeka " + JSON.stringify(alert));
    console.log("txeka " + alert["type"]);
    if (alert["messege"] === "" || alert["messege"] === null) {
      //handleAddToast("Alert", alert["messege"], alert["type"]);
    } else {
      toast({
        title: "Atenção",
        status: alert["type"],
        description: alert["messege"],
        isClosable: true,
        position: "top-right",
      });
    }
  }, [alert]);

  type SignInFormData = {
    email: string;
    password: string;
  };

  const signInFormSchema = yup.object().shape({
    email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
    password: yup.string().required("Senha obrigatória"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(signInFormSchema),
  });

  const toast = useToast();

  const SubmitForm: SubmitHandler<SignInFormData> = async (values, event) => {
    event.preventDefault();
    await signIn(values);
    //await new Promise((resolve) => {setTimeout(resolve, 2000)})
    //console.log(values);
  };

  return (
    <Flex
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
      bgImage={checkLoading ? null : "url('/background.jpg')"}
      bgPosition="center"
      bgRepeat="no-repeat"
    >
      {checkLoading ? (
        <Flex justify="center">
          <Spinner />
        </Flex>
      ) : (
        <Flex
          as="form"
          onSubmit={handleSubmit(SubmitForm)}
          w="100%"
          maxWidth="360"
          bg={colorMode === "light" ? "gray.100" : "gray.900"}
          p={8}
          borderRadius="8"
          flexDir="column"
          autoComplete="off"
        >
          <Box boxSize="20" w="100%" mb="8" align="center">
            <Image
              borderRadius="10"
              alt=""
              height="100%"
              src="/small_logo.png"
            />
          </Box>

          <Stack spacing="4">
            <Input
              name="email"
              label="Email"
              type="email"
              error={errors.email}
              {...register("email")}
              isDisabled={isSubmitting}
              placeholder="Escreva o email"
            />

            <InputPass
              name="password"
              label="Senha"
              error={errors.password}
              isDisabled={isSubmitting}
              placeholder="Escreva a Senha"
              {...register("password")}
            />

            {/* <Progress size="xs" isIndeterminate hidden={Submit ? false : true} /> */}
          </Stack>

          <Button
            type="submit"
            loadingText="Entrando..."
            isLoading={isSubmitting}
            mt="6"
            colorScheme="green"
            size="lg"
          >
            Entar
          </Button>
        </Flex>
      )}
    </Flex>
  );
}
