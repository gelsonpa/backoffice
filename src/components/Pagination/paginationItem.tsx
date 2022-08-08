import { Button, useColorMode } from "@chakra-ui/react";
import { resourceUsage } from "process";

interface PaginationItemProps {
  isCurrentPage?: boolean;
  numero: number;
  onPageChange: (page: number) => void;
}

export function PaginationItem({
  numero,
  isCurrentPage = false,
  onPageChange,
}: PaginationItemProps) {
  const { colorMode, toggleColorMode } = useColorMode();
  if (isCurrentPage) {
    return (
      <Button
        size="sm"
        fontSize="xs"
        w="4"
        color={colorMode === "light" ? "white" : "white"}
        colorScheme="green.900"
        disabled
        _disabled={{ bg: "green.900", cursor: "default" }}
      >
        {numero}
      </Button>
    );
  }

  return(
    <Button
    size="sm"
    fontSize="xs"
    w="4"
    color = {colorMode === 'light' ? 'white' : 'white'}
    colorScheme="green.900"
    bg="gray.700"
    _hover={{ bg: "gray.500" }}
    onClick={()=>onPageChange(numero)}
  >
    {numero}
  </Button>
  )
}
