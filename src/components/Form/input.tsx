import {
  Input as ChakraInput,
  FormLabel,
  FormControl,
  InputProps as ChakraInputProps,
  useColorMode,
  FormErrorMessage,
} from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form";

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({ name, label, error = null, ...rest }, ref) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}

      <ChakraInput
        size="md"
        name={name}
        id={name}
        colorScheme="green"
        focusBorderColor="green"
        color={colorMode === "light" ? "gray.900" : "gray.300"}
        bgColor={colorMode === "light" ? "gray.300" : "gray.800"}
        _hover={{ bg: colorMode === "light" ? "gray.300" : "gray.700" }}
        ref={ref}
        {...rest}
      />
      {!!error && (<FormErrorMessage>{error.message}</FormErrorMessage>)}
    </FormControl>
  );
};

export const Input = forwardRef(InputBase);
