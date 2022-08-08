import {
  Input as ChakraInput,
  FormLabel,
  FormControl,
  InputProps as ChakraInputProps,
  useColorMode,
  InputGroup,
  InputRightElement,
  Button,
  FormErrorMessage,
} from "@chakra-ui/react";
import React, { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form";

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: FieldError;
}

const InputPassBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, error = null, ...rest },
  ref
) => {
  const { colorMode, toggleColorMode } = useColorMode();

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <InputGroup size="md">
        <ChakraInput
          size="md"
          name={name}
          type={show ? "text" : "password"}
          pr="4.5rem"
          id={name}
          colorScheme="green"
          focusBorderColor="green"
          color={colorMode === "light" ? "gray.900" : "gray.300"}
          bgColor={colorMode === "light" ? "gray.300" : "gray.800"}
          _hover={{ bg: colorMode === "light" ? "gray.300" : "gray.700" }}
          ref={ref}
          {...rest}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const InputPass = forwardRef(InputPassBase);
