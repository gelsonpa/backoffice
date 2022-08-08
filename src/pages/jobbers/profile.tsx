import {
  Avatar,
  Box,
  Heading,
  Text,
  useColorModeValue,
  Link as ChakraLink,
  Stack,
  Badge,
  Button,
  Icon,
  Flex,
  Spinner,
  useColorMode,
  Tag,
  TagLabel,
  Tooltip,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { RiChatVoiceLine, RiKey2Line, RiSendPlaneLine } from "react-icons/ri";
import { url } from "../../config/config";
import { jobber } from "../../hooks/useJobber";
import { MdMarkEmailUnread } from "react-icons/md";
import { StarIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { ModalDesableJobberAcount } from "../../components/Modals/modalDesableJobberAcount";

export function Profile({ dados, isLoading, error, refetch, isFetching }) {
  const { colorMode, toggleColorMode } = useColorMode();

  var nome = "",
    apelido = "",
    createAt = "",
    img = "",
    tipo = "",
    email = "",
    id = "",
    acount = "",
    subcategoria = [];
  if (!isLoading) {
    dados.map((dado) => {
      id = dado.id;
      nome = dado.nome;
      apelido = dado.apelido;
      img = dado.img;
      acount = dado.statusAcount;
      tipo = dado.tipo;
      email = dado.email;
      subcategoria = dado.subcategoria;
      createAt = dado.createAt;
    });
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

  //console.log(subcategoria);
  return (
    <Box
      w={"full"}
      maxH="440px"
      bg={useColorModeValue("white", "gray.900")}
      boxShadow={"1xl"}
      rounded={"lg"}
      p={6}
      textAlign={"center"}
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
          <Avatar
            size={"2xl"}
            src={url + img}
            alt={nome + " " + apelido}
            name={nome + " " + apelido}
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
          <Heading fontSize={"2xl"} fontFamily={"body"}>
            {nome + " " + apelido}
          </Heading>

          <Text fontWeight={600} color={"gray.500"} mb={0}>
            <Text as="span" fontWeight="bold">
              Data registo
            </Text>
            :<Text as="span"> {createAt}</Text>
          </Text>
          <Text fontWeight={600} color={"gray.500"} mb={2}>
            <Text as="span" fontWeight="bold">
              Tipo
            </Text>
            : <Text as="span">{tipo}</Text> {/* createAt */}
          </Text>
{/*           <Box mt="2" mb="2" textAlign={"center"} alignItems="center">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <StarIcon key={i} color={i < 4 ? "green.500" : "green.200"} />
              ))}
            <Box
              as="span"
              ml="2"
              color={colorMode === "light" ? "gray.700" : "gray.400"}
              fontSize="sm"
            >
              {4} avaliações
            </Box>
          </Box> */}
          <Text
            textAlign={"center"}
            color={colorMode === "light" ? "gray.700" : "gray.400"}
            px={3}
            as="u"
            fontWeight={"bold"}
          >
            Categorias de interesse:
            {/* <ChakraLink href={"#"} color={"blue.400"}>
                  #tag
                </ChakraLink>
                me in your posts */}
          </Text>

          <Stack align={"center"} justify={"center"} direction={"row"} mt={6}>
            {subcategoria === undefined || subcategoria.length == 0 ? (
              <Alert
                height={10}
                rounded="full"
                variant="subtle"
                status="warning"
              >
                <AlertIcon />
                Nenhuma categoria encontrada!
              </Alert>
            ) : (
              subcategoria?.map((dado) => {
                return (
                  <Tooltip
                    key={dado.id}
                    label={dado.nome}
                    hasArrow
                    aria-label="A tooltip"
                  >
                    <Tag
                      size="lg"
                      _hover={{ cursor: "pointer" }}
                      color="green"
                      colorScheme="teal"
                      borderRadius="full"
                    >
                      <Avatar
                        src={url + dado.nome}
                        size="xs"
                        name={dado.nome}
                        ml={-1}
                        mr={2}
                      />

                      <TagLabel>{dado.nome}</TagLabel>
                    </Tag>
                  </Tooltip>
                );
              })
            )}

            {/* <Badge
                  px={2}
                  py={1}
                  bg={colorMode === "light" ? "gray.50" : "gray.800"}
                  fontWeight={"400"}
                >
                  #art
                </Badge>
                <Badge
                  px={2}
                  py={1}
                  bg={colorMode === "light" ? "gray.50" : "gray.800"}
                  fontWeight={"400"}
                >
                  #photography
                </Badge>
                <Badge
                  px={2}
                  py={1}
                  bg={colorMode === "light" ? "gray.50" : "gray.800"}
                  fontWeight={"400"}
                >
                  #music
                </Badge> */}
          </Stack>

          <Stack mt={4} direction={"row"} spacing={4}>
            <Button
              flex={1}
              fontSize={"sm"}
              onClick={(e) => {
                window.location.href = "mailto:" + email;
                e.preventDefault();
              }}
              rounded={"full"}
              _focus={{
                bg: colorMode === "light" ? "gray.300" : "gray.600",
              }}
              leftIcon={<Icon as={MdMarkEmailUnread} />}
            >
              Email
            </Button>
            {/*                 <Button
                  flex={1}
                  fontSize={"sm"}
                  rounded={"full"}
                  bg={"blue.400"}
                  color={"white"}
                  leftIcon={<Icon as={RiChatVoiceLine} />}
                  boxShadow={
                    "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                  }
                  _hover={{
                    bg: "blue.500",
                  }}
                  _focus={{
                    bg: "blue.500",
                  }}
                >
                  ligar
                </Button> */}
            <Button
              flex={1}
              fontSize={"sm"}
              color ="white"
              onClick={handleOpen}
              data-id={id}
              data-title={
                acount
                  ? "Desejas ativar a conta desse jobber?"
                  : "Desejas desativar a conta desse jobber?"
              }
              data-status={acount}
              bg = {acount ? "green.500" : "red.500"}
              rounded={"full"}
              _focus={{
                bg: colorMode === "light" ? "gray.300" : "gray.600",
              }}
              leftIcon={<Icon as={RiKey2Line} />}
            >
              {acount ? "Ativar conta" : "Desativar conta"}
            </Button>
          </Stack>
        </>
      )}
      <ModalDesableJobberAcount
        showModal={showModal}
        closeModal={closeModal}
        dados={dadosmodal}
        refetch={refetch}
      />
    </Box>
  );
}
