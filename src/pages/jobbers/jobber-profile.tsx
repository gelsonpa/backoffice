import {
  Box,
  Flex,
  useColorMode,
  useBreakpointValue,
  Stack,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/SideBar";
import { AuthContext } from "../../contexts/AuthContext";
import { useListJobber } from "../../hooks/useJobber";
import { Enexo } from "./anexo";
import {Avaliation} from "./avaliation";
import { Busness } from "./busness";
import { PersonalInfo } from "./personal-info";
import { Profile } from "./profile";
import { ProfissionalInfo } from "./profissional-info";

export default function JoberProfile() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { jobber } = useContext(AuthContext);

  const isLargeScreen = useBreakpointValue({
    base: false,
    lg: true,
  });

  const [dadosJobber, setDadosJobber] = useState({});

  const { data, isLoading, error, refetch, isFetching } = useListJobber(
    jobber["id"]
  );
  console.log("jobber == " + jobber["id"]);

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
          <Tabs>
            <TabList>
              <Tab _selected={{ fontWeight: "bold" }}>Informações do Jobber</Tab>
              <Tab _selected={{ fontWeight: "bold" }}>Avalhãção do Jobber</Tab>
              {/* <Tab _selected={{ fontWeight: "bold" }}>Negociação</Tab> */}
            </TabList>
            <TabPanels>
              <TabPanel>
                <SimpleGrid
                  columns={{ base: 1, lg: 2 }}
                  spacing={{ base: 8, md: 10 }}
                  py={{ base: 18, md: 4 }}
                >
                  <Stack spacing={{ base: 6, md: 10 }}>
                    <Stack
                      spacing={{ base: 4, sm: 6 }}
                      direction={"column"}
                      divider={
                        <StackDivider
                          borderColor={useColorModeValue(
                            "gray.200",
                            "gray.600"
                          )}
                        />
                      }
                    >
                      {!isLargeScreen && (
                        <Flex>
                          <Profile
                            dados={data}
                            isLoading={isLoading}
                            error={error}
                            refetch={refetch}
                            isFetching={isFetching}
                          />{" "}
                        </Flex>
                      )}
                      <PersonalInfo
                        dados={data}
                        isLoading={isLoading}
                        error={error}
                        refetch={refetch}
                        isFetching={isFetching}
                      />
                      {/* <ProfissionalInfo
                        dados={data}
                        isLoading={isLoading}
                        error={error}
                        refetch={refetch}
                        isFetching={isFetching}
                      /> */}
                      <Enexo
                        dados={data}
                        isLoading={isLoading}
                        error={error}
                        refetch={refetch}
                        isFetching={isFetching}
                      />
                    </Stack>
                  </Stack>
                  <Flex>
                    {isLargeScreen && (
                      <Profile
                        dados={data}
                        isLoading={isLoading}
                        error={error}
                        refetch={refetch}
                        isFetching={isFetching}
                      />
                    )}
                  </Flex>
                </SimpleGrid>
                <>
                  {/* <Table variant="simple">
                    <TableCaption>
                      Imperial to metric conversion factors
                    </TableCaption>
                    <Thead>
                      <Tr>
                        <Th>To convert</Th>
                        <Th>into</Th>
                        <Th isNumeric>multiply by</Th>
                      </Tr>
                    </Thead>
                    <Tbody></Tbody>{" "}
                  </Table> */}
                  <ProfissionalInfo
                    dados={data}
                    isLoading={isLoading}
                    error={error}
                    refetch={refetch}
                    isFetching={isFetching}
                  />
                </>
              </TabPanel>
              <TabPanel>
                <Avaliation />
              </TabPanel>
              {/* <TabPanel>
                <Busness />
              </TabPanel> */}
            </TabPanels>
          </Tabs>
        </Flex>
      </Flex>
    </Box>
  );
}
