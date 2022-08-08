import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorMode,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useBreakpointValue,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useContext, useState } from "react";
import { RiAddLine, RiEditLine } from "react-icons/ri";
import { Pagination } from "../../components/Pagination";
import { AuthContext } from "../../contexts/AuthContext";
import { usePropostaByIdJobber } from "../../hooks/useProposta";

export function Busness() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { jobber } = useContext(AuthContext);

  const isLargeScreen = useBreakpointValue({
    base: false,
    lg: true,
  });

  const [page, setPage] = useState(1);
  const { data, isLoading, error, refetch, isFetching } = usePropostaByIdJobber(
    page,
    jobber["id"]
  );


  //console.log(data)

  return (
    <Box>
      {/* <Flex mb="8" justify="space-between" align="center">
        <Heading size="md" fontWeight="bold">
          Negociações
        </Heading>

        <Link href="/jobers/create" passHref>
          <Button
            as="a"
            href="#"
            size="sm"
            fontSize="small"
            color={colorMode === "light" ? "white" : "white"}
            colorScheme="green"
            _hover={{ bg: "gray.500" }}
            bgColor="green.900"
            leftIcon={<Icon as={RiAddLine} />}
          >
            Registar
          </Button>
        </Link>
      </Flex> */}

      <Table colorScheme="whiteAlpha" mt="8" variant="unstyled">
        <Thead>
          <Tr>
            <Th px={["3", "3", "6"]} color="gray.300" w="8">
              <Checkbox colorScheme="green" isChecked={true} />
            </Th>
            <Th> Empregador </Th>

            {isLargeScreen && <Th> 3232 </Th>}
            {isLargeScreen && <Th> Type </Th>}
            {isLargeScreen && <Th> Ilha </Th>}
            {isLargeScreen && <Th> DateTime </Th>}

            <Th> </Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td px={["3", "3", "6"]}>
              <Checkbox colorScheme="green" />
            </Td>
            <Td>
              <Box>
                <Text fontWeight="bold">Gelson Veiga</Text>
                <Text fontSize="sm" color="gray.300">
                  gelsonpa.veiga@gmail.com
                </Text>
              </Box>
            </Td>

            {isLargeScreen && <Td>gelsonp</Td>}
            {isLargeScreen && <Td>Particular</Td>}
            {isLargeScreen && <Td>Santiago</Td>}
            {isLargeScreen && <Td>01/02/2022</Td>}
            <Td>
              <Link href="/jobers/jober-profile" passHref>
                <Button
                  as="a"
                  size="sm"
                  fontSize="small"
                  color={colorMode === "light" ? "white" : "white"}
                  colorScheme="green.900"
                  bgColor="green.900"
                  leftIcon={<Icon as={RiEditLine} />}
                >
                  Ver
                </Button>
              </Link>
            </Td>
          </Tr>

        </Tbody>
      </Table>
      {/* <Pagination /> */}
    </Box>
  );
}
