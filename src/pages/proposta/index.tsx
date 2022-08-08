import {
  Box,
  Flex,
  Icon,
  Tag,
  Text,
  Button,
  Divider,
  Heading,
  List,
  ListIcon,
  ListItem,
  Stack,
  useColorModeValue,
  useColorMode,
  Tooltip,
  Spinner,
} from "@chakra-ui/react";
import { Input } from "../../components/Form/input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/SideBar";
import { FaCheckCircle } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { Pagination } from "../../components/Pagination";
import { AuthContext } from "../../contexts/AuthContext";
import { useBiscaite } from "../../hooks/useBiscaite";
import { getSetting, useSetting } from "../../hooks/useSetting";
import Link from "next/link";
import { setCookie } from "nookies";
import { MdTaxiAlert } from "react-icons/md";

export default function Proposta() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { search, SetProposta } = useContext(AuthContext);

  const options = [
    {
      id: 1,
      dia: "1 lorem ipsum",
      duracao: "02-23-25",
      /* pagamento: "1 lorem ipsum", */
      negociavel: "02-23-25",
      /* empregador: "1 lorem ipsum", */
      cidade: "02-23-25",
      /* sucategoria: "1 lorem ipsum", */
      estado: "02-23-25",
      pago: "02-23-25",
      createdAt: "02-23-25",
    },
    /*     { id: 2, desc:  "1 lorem ipsum", start: "02-23-25" },
    { id: 3, desc: "1 lorem ipsum", start: "02-23-25" },
    { id: 4, desc: "1 lorem ipsum", start: "02-23-25"  }, */
  ];

  type des = { data: string };

  interface PackageTierProps {
    title: string;
    id: number;
    employer: string;
    negociavel: string;
    pago: string;
    options: Array<{
      id: number;
      dia: string;
      duracao: string;
      vagas: number;
      /* pagamento: string; */
      negociavel: string;
      /* empregador: string; */
      cidade: string;
      /* sucategoria: string; */
      estado: string;
      /* pago: string; */
      createdAt: string;
    }>;
    typePlan: number;
    taxa: number;
    checked?: boolean;
  }

  const PackageTier = ({
    title,
    employer,
    id,
    negociavel,
    pago,
    options,
    typePlan,
    checked = false,
  }: PackageTierProps) => {
    const colorTextLight = checked ? "green.600" : "green.600";
    const bgColorLight = checked ? "gray.300" : "gray.300";

    const colorTextDark = checked ? "green.600" : "green.600";
    const bgColorDark = checked ? "gray.300" : "gray.400";

    return (
      <Stack
        p={3}
        py={3}
        justifyContent={{
          base: "flex-start",
          md: "space-around",
        }}
        direction={{
          base: "column",
          md: "row",
        }}
        alignItems={{ md: "center" }}
      >
        <Box align="center">
          <Heading size={"md"} maxWidth="250px" isTruncated>
            {title}
          </Heading>

          <Text
            fontSize="sm"
            maxWidth="150px"
            color={colorMode === "light" ? "gray.900" : "gray.300"}
            isTruncated
          >
            {employer}
          </Text>
          <Text
            as="i"
            color={colorMode === "light" ? "gray.900" : "gray.300"}
            fontSize="sm"
            maxWidth="150px"
            isTruncated
          >
            {!!negociavel ? "Negociável" : "Não Negociável"}
          </Text>
          {!!pago ? (
            <Tooltip
              hasArrow
              label="o serviço já foi pago"
              aria-label="A tooltip"
            >
              <Text
                fontSize="sm"
                maxWidth="150px"
                color={colorMode === "light" ? "green.500" : "green.300"}
                fontWeight="bold"
                isTruncated
              >
                <Icon w={3} h={3} as={FaCheckCircle} mt={2} /> Pago
              </Text>
            </Tooltip>
          ) : (
            <Tooltip
              hasArrow
              label="O serviço não foi pago"
              aria-label="A tooltip"
            >
              <Text
                fontSize="sm"
                maxWidth="150px"
                color={colorMode === "light" ? "red.500" : "red.300"}
                fontWeight="bold"
                isTruncated
              >
                <Icon w={3} h={3} as={FaCheckCircle} mt={2} /> Não Pago
              </Text>
            </Tooltip>
          )}
        </Box>

        <List spacing={3} textAlign="start">
          {options.map((values, i) => (
            <>
              {/* {desc[1].map((value) =>( */}
              <ListItem key={i}>
                <ListIcon as={FaCheckCircle} color="green.500" />
                Dia: {values.dia}
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                Nº Vagas: {values.vagas}
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                Duracao: {values.duracao}
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                Cidade: {values.cidade}
              </ListItem>
              {/* <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                Negociavel: {values.negociavel}
              </ListItem> */}
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                Em: {values.createdAt}
              </ListItem>
              {/* ))} */}
            </>
          ))}
        </List>
        <Box>
          <Heading size={"lg"}>{typePlan} ECV</Heading>

          <Text fontSize="sm" align="center" color="gray.300">
            {!setting.isLoading
              ? "Taxa Duleo: " + typePlan * parseFloat(taxa) + "  ECV"
              : null}
          </Text>
        </Box>

        <Stack>
          <Tooltip hasArrow label="Vizualizar" aria-label="A tooltip">
            <Link href="/proposta/negotiation" passHref>
              <Button
                size="sm"
                color={useColorModeValue(colorTextLight, colorTextDark)}
                bgColor={useColorModeValue(bgColorLight, bgColorDark)}
                onClick={handleProposta}
                data-id={id}
                data-subcategoria={title}
                data-employer={employer}
                leftIcon={
                  <Icon
                    as={FaCheckCircle}
                    color={checked ? "green.500" : "red.500"}
                  />
                }
              >
                {checked ? "Biscaite disponivel" : "Biscaite acertada"}
              </Button>
            </Link>
          </Tooltip>
        </Stack>
      </Stack>
    );
  };

  const [date, setdate] = useState("");
  const [page, setPage] = useState(1);
  const { data, isLoading, error, refetch, isFetching } = useBiscaite(
    page,
    search["search"]
  );
  const setting = useSetting();

  /*   if(isFetching) {
    setting.refetch();
  } */

  var logotipo = "";
  let taxa = "";

  if (!setting.isLoading)
    setting.data.map((result) => {
      logotipo = result.logotipo;
      taxa = (parseInt(result.taxa) / 100).toString();
    });

  useEffect(() => {
    setPage(1);
    refetch();
    setting.refetch();
  }, [search["search"]]);

  function handleProposta(e) {
    setCookie(undefined, "ID_PROPOSTA", e.currentTarget.dataset.id, {
      maxAge: 60 * 60 * 24 * 30, // 30 dias
      path: "/",
    });
    setCookie(
      undefined,
      "NAME_SUBCATEGORIE",
      e.currentTarget.dataset.subcategoria,
      {
        maxAge: 60 * 60 * 24 * 30, // 30 dias
        path: "/",
      }
    );
    SetProposta({
      id: e.currentTarget.dataset.id,
      subcategoria: e.currentTarget.dataset.subcategoria,
      employer: e.currentTarget.dataset.employer,
    });
  }

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
          <Box py={6} px={5} min={"100vh"}>
            <Stack spacing={4} width={"100%"} direction={"column"}>
              <Heading size={"lg"}>
                Lista Biscaites
                {!isLoading && isFetching && (
                  <Spinner size="sm" color="grar.500" ml="4" />
                )}
                {/* <Text color="purple.400">Your Business</Text> */}
              </Heading>
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
                  {data.biscaites.map((biscaite) => {
                    return (
                      <>
                        <Divider />
                        <PackageTier
                          key={biscaite.id}
                          id={biscaite.id}
                          title={biscaite.subcategoria.nome}
                          pago={biscaite.pago}

                          taxa={parseFloat(taxa)}
                          employer={
                            biscaite.empregador.nome +
                            " " +
                            biscaite.empregador.apelido
                          }
                          negociavel={biscaite.negociavel}
                          typePlan={biscaite.pagamento}
                          checked={!!biscaite.estado}
                          options={[
                            {
                              id: 1,
                              dia: biscaite.dia,
                              duracao: biscaite.duracao,
                              vagas: biscaite.vagas,
                              /* pagamento: "1 lorem ipsum", */
                              negociavel: biscaite.negociavel,
                              /* empregador: "1 lorem ipsum", */
                              cidade: biscaite.cidade.nome,
                              /* sucategoria: "1 lorem ipsum", */
                              estado: biscaite.estado,
                              /* pago: biscaite.pago, */
                              createdAt: biscaite.createdAt,
                            },
                          ]}
                        />
                      </>
                    );
                  })}

                  <Pagination
                    totalCountOfRegister={data.totalCount}
                    currentePage={page}
                    onPageChange={setPage}
                  />
                </>
              )}
            </Stack>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
