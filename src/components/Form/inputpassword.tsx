import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  FormControl,
  FormLabel,
  InputProps,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";

interface PasswordInputProps extends InputProps{
  name: string;
}

export default function PasswordInput({name, ...rest}: PasswordInputProps) {
  const { colorMode, toggleColorMode } = useColorMode();

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <FormControl>
      <FormLabel htmlFor="">Password</FormLabel>
      <InputGroup size="md">
        <Input
          pr="4.5rem"
          type={show ? "text" : "password"}
          name={name}
          id={name}
          placeholder="Enter password"
          colorScheme="green"
          isRequired={true}
          focusBorderColor="green"
          color={colorMode === "light" ? "gray.900" : "gray.300"}
          bgColor={colorMode === "light" ? "gray.300" : "gray.800"}
          _hover={{ bg: colorMode === 'light' ? 'gray.300' : 'gray.700' }}
          {...rest}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
}
