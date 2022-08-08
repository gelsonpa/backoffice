import {
  Box,
  Flex,
  Heading,
  Icon,
  useColorMode,
  useBreakpointValue,
  Stack,
  Text,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  Image,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  List,
  ListItem,
  Spinner,
  Button,
} from "@chakra-ui/react";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/SideBar";

import {
  IoAnalyticsSharp,
  IoLogoBitcoin,
  IoSearchSharp,
} from "react-icons/io5";
import { ReactElement, useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useEmployer } from "../../hooks/useEmployer";
import { url } from "../../config/config";
import { RiChatVoiceLine, RiKey2Line } from "react-icons/ri";
import { ModalDesableEmployerAcount } from "../../components/Modals/modalDesableEmployerAcount";

interface FeatureProps {
  text: string;
  iconBg: string;
  icon?: ReactElement;
}

const Feature = ({ text, icon, iconBg }: FeatureProps) => {
  return (
    <Stack direction={"row"} align={"center"}>
      <Flex
        w={8}
        h={8}
        align={"center"}
        justify={"center"}
        rounded={"full"}
        bg={iconBg}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  );
};

export default function EmployerProfile() {
  const { colorMode, toggleColorMode } = useColorMode();

  const isLargeScreen = useBreakpointValue({
    base: false,
    lg: true,
  });

  const { employer } = useContext(AuthContext);
  console.log("employee == ", employer["id"]);

  const { data, isLoading, error, refetch, isFetching } = useEmployer(
    employer["id"]
  );
  const dados = data;
  var id,
    nome,
    apelido,
    endereco,
    tipo,
    email,
    telefone,
    telemovel,
    nif,
    nConta,
    nib,
    swift,
    createdAt,
    cidade,
    img,
    acount;
  if (!isLoading) {
    dados.map((dado) => {
      id = dado.id;
      nome = dado.nome;
      apelido = dado.apelido;
      endereco = dado.endereco;
      tipo = dado.tipo;
      email = dado.email;
      telefone = dado.telefone;
      telemovel = dado.telemovel;
      nif = dado.nif;
      nConta = dado.nConta;
      nib = dado.nib;
      swift = dado.swift;
      cidade = dado.Cidade != null ? dado.Cidade.nome : null;
      createdAt = dado.createdAt;
      img = !!dado.img ? dado.img : "uploads/profile/profile.png";
      acount = dado.statusAcount;
    });
    //console.log("nome == " + nome)
  }

  const [showModal, setShow] = useState(false);
  const closeModal = () => setShow(false);
  const [dadosmodal, setDadosmodal] = useState({
    id: "",
    title: "",
    status: "",
  });
  const handleOpen = (e) => {
    setDadosmodal({
      ...dadosmodal,
      id: e.currentTarget.dataset.id,
      title: e.currentTarget.dataset.title,
      status: e.currentTarget.dataset.status,
    });
    setShow(true);
  };

  return (
    <Box>
      <Header />

      <Flex width="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Flex
          flex="1"
          borderRadius="8"
          bgColor={colorMode === "light" ? "gray.100" : "gray.900"}
          p="4"
        >
          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Falha ao obter os dados</Text>
            </Flex>
          ) : (
            <>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                <Stack spacing={4}>
                  <Heading>{nome + " " + apelido}</Heading>
                  {/* <Text color={"gray.500"} fontSize={"lg"}>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt ut labore
                  </Text> */}
                  <Stack
                    spacing={4}
                    divider={
                      <StackDivider
                        borderColor={useColorModeValue("gray.100", "gray.700")}
                      />
                    }
                  >
                    <Accordion defaultIndex={[0]} allowToggle>
                      <AccordionItem>
                        <AccordionButton>
                          <Box flex="1" textAlign="left">
                            <Feature
                              icon={
                                <Icon
                                  as={IoAnalyticsSharp}
                                  color={"yellow.500"}
                                  w={5}
                                  h={5}
                                />
                              }
                              iconBg={useColorModeValue(
                                "yellow.100",
                                "yellow.900"
                              )}
                              text={"Dados do Empregador"}
                            />
                          </Box>
                        </AccordionButton>
                        <AccordionPanel pb={4}>
                          <List spacing={2}>
                            <ListItem>
                              <Text as={"span"} mr={1} fontWeight={"bold"}>
                                Cidade:
                              </Text>
                              {cidade}
                            </ListItem>
                            <ListItem>
                              <Text as={"span"} mr={1} fontWeight={"bold"}>
                                Endereço:
                              </Text>
                              {endereco}
                            </ListItem>
                            <ListItem>
                              <Text as={"span"} mr={1} fontWeight={"bold"}>
                                Tipo:
                              </Text>
                              {tipo}
                            </ListItem>
                            <ListItem>
                              <Text as={"span"} mr={1} fontWeight={"bold"}>
                                Email:
                              </Text>
                              {email}
                            </ListItem>
                            <ListItem>
                              <Text as={"span"} mr={1} fontWeight={"bold"}>
                                Data Registo:
                              </Text>
                              {createdAt}
                            </ListItem>
                          </List>
                        </AccordionPanel>
                      </AccordionItem>

                      <AccordionItem>
                        <AccordionButton>
                          <Box flex="1" textAlign="left">
                            <Feature
                              icon={
                                <Icon
                                  as={IoLogoBitcoin}
                                  color={"green.500"}
                                  w={5}
                                  h={5}
                                />
                              }
                              iconBg={useColorModeValue(
                                "green.100",
                                "green.900"
                              )}
                              text={"Dados Administrativos"}
                            />
                          </Box>
                        </AccordionButton>
                        <AccordionPanel pb={4}>
                          <List spacing={2}>
                            <ListItem>
                              <Text as={"span"} mr={1} fontWeight={"bold"}>
                                NIF:
                              </Text>
                              {nif}
                            </ListItem>
                            <ListItem>
                              <Text as={"span"} mr={1} fontWeight={"bold"}>
                                SWIFT:
                              </Text>
                              {swift}
                            </ListItem>
                            <ListItem>
                              <Text as={"span"} mr={1} fontWeight={"bold"}>
                                Nº Conta:
                              </Text>
                              {nConta}
                            </ListItem>
                            <ListItem>
                              <Text as={"span"} mr={1} fontWeight={"bold"}>
                               Nº NIB:
                              </Text>
                              {nib}
                            </ListItem>
                          </List>
                        </AccordionPanel>
                      </AccordionItem>

                      <AccordionItem>
                        <AccordionButton>
                          <Box flex="1" textAlign="left">
                            <Feature
                              icon={
                                <Icon
                                  as={IoSearchSharp}
                                  color={"purple.500"}
                                  w={5}
                                  h={5}
                                />
                              }
                              iconBg={useColorModeValue(
                                "purple.100",
                                "purple.900"
                              )}
                              text={"Dados de Contato"}
                            />
                          </Box>
                        </AccordionButton>
                        <AccordionPanel pb={4}>
                          <List spacing={2}>
                            <ListItem>
                              <Text as={"span"} mr={1} fontWeight={"bold"}>
                                Telefone:
                              </Text>
                              {telefone}
                            </ListItem>
                            <ListItem>
                              <Text as={"span"} mr={1} fontWeight={"bold"}>
                                Telemóvel:
                              </Text>
                              {telemovel}
                            </ListItem>
                          </List>
                        </AccordionPanel>
                      </AccordionItem>
                    </Accordion>
                  </Stack>
                </Stack>
                <Flex>
                  <Image
                    maxW={"sm"}
                    rounded={"md"}
                    alt={nome + " " + apelido}
                    src={url + img}
                    objectFit={"cover"}
                  />
                </Flex>
                <Button
                  flex={1}
                  fontSize={"sm"}
                  onClick={handleOpen}
                  data-id={id}
                  data-title={
                    acount
                      ? "Desejas ativar a conta desse empregador?"
                      : "Desejas desativar a conta desse empregador?"
                  }
                  data-status={acount}
                  bg={acount ? "green.500" : "red.500"}
                  rounded={"full"}
                  color="white"
                  _focus={{
                    bg: colorMode === "light" ? "gray.300" : "gray.600",
                  }}
                  leftIcon={<Icon as={RiKey2Line} />}
                >
                  {acount ? "Ativar conta" : "Desativar conta"}
                </Button>
              </SimpleGrid>
            </>
          )}
          <ModalDesableEmployerAcount
            showModal={showModal}
            closeModal={closeModal}
            dados={dadosmodal}
            refetch={refetch}
          />
        </Flex>
      </Flex>
    </Box>
  );
}
