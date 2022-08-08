import {
  Box,
  Button,
  Flex,
  Icon,
  List,
  ListIcon,
  ListItem,
  SimpleGrid,
  Spinner,
  Text,
  Tooltip,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { MdCheckCircle, MdFilePresent } from "react-icons/md";
import { url } from "../../config/config";
import { ArrowForwardIcon } from "@chakra-ui/icons";

export function Enexo({ dados, isLoading, error, refetch, isFetching }) {
  const { colorMode, toggleColorMode } = useColorMode();
  var curriculo = "";
  var RegCriminal = "";
  //console.log(dados);
  if (!isLoading) {
    dados.map((dado) => {
      curriculo = dado.curriculo;
      RegCriminal = dado.regCriminal;
    });
  }

  return isLoading ? (
    <Flex justify="center">
      <Spinner />
    </Flex>
  ) : error ? (
    <Flex justify="center">
      <Text>Falha ao obter os dados</Text>
    </Flex>
  ) : (
    <Box>
      <Text
        fontSize={{ base: "16px", lg: "18px" }}
        color={colorMode === "light" ? "green.500" : "green.300"}
        fontWeight={"500"}
        textTransform={"uppercase"}
        mb={"4"}
      >
        Anexo
      </Text>

      <SimpleGrid columns={{ base: 1, md: 1 }} spacing={10}>
        <List spacing={2}>
          {/* <ListItem>
            <ListIcon as={MdCheckCircle} color="green.500" />
            <Text as="span">Curriculun</Text> :
            {curriculo ? (
              <Tooltip label="Ver Curriculun" hasArrow  aria-label='A tooltip'>
              <Button
                ml="4"
                rightIcon={<Icon as={MdFilePresent} />}
                colorScheme="teal"
                size="sm"
                variant="outline"
                onClick={() =>
                  window.open(
                    `${url + curriculo}`,
                    "Popup",
                    "location,status,scrollbars,resizable,width=600, height=600"
                  )
                }
              >
                Ver
              </Button>
              </Tooltip>
            ) : (
              <Text as="span" ml="1" color="red" fontSize="12">
                campo vazio
              </Text>
            )}
          </ListItem> */}
          <ListItem key={1}>
            <ListIcon as={MdCheckCircle} color="green.500" />{" "}
            <Text as="span">Registo Criminal</Text> :
            {curriculo ? (
              <Tooltip
                label="Ver Registo Criminal"
                hasArrow
                aria-label="A tooltip"
              >
                <Button
                  ml="4"
                  rightIcon={<Icon as={MdFilePresent} />}
                  colorScheme="teal"
                  title="Ver Ficheiro"
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    window.open(
                      `${url + RegCriminal}`,
                      "Popup",
                      "location,status,scrollbars,resizable,width=600, height=600"
                    )
                  }
                >
                  Ver
                </Button>
              </Tooltip>
            ) : (
              <Text as="span" ml="1" color="red" fontSize="12">
                campo vazio
              </Text>
            )}
          </ListItem>
        </List>
      </SimpleGrid>
    </Box>
  );
}
