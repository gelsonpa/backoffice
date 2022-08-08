import { Flex, Icon, useColorMode, Input } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { AuthContext } from "../../contexts/AuthContext";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export function SearchBox() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [dados, seDados] = useState({ search: "" });
  const { SetSearch } = useContext(AuthContext);

  const handleChange = (e) => {
    seDados({ ...dados, search: e.target.value });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
        SetSearch(dados.search)
    }
    if(dados.search===""){
      SetSearch("")
    }
  };

  return (
    <Flex
      as="label"
      flex="1"
      py="4"
      px="8"
      /* autoComplete="off" */
      ml="6"
      /* onSubmit={(e)=>e.preventDefault()} */
      maxWidth="400"
      alignSelf="center"
      color="gray.300"
      position="relative"
      bgColor={colorMode === "light" ? "gray.100" : "gray.900"}
      borderRadius="full"
    >
      <Input
        name="search"
        type="text"
        isRequired
        placeholder="Pesquisar..."
        color={colorMode === "light" ? "gray.900" : "gray.50"}
        variant="unstyled"
        px="4"
        autoComplete="off"
        onKeyUp={handleKeyDown}
        onChange={handleChange}
        mr="4"
        _placeholder={{ color: "gray.400" }}
      />
      <Icon as={RiSearchLine} />
    </Flex>
  );
}
