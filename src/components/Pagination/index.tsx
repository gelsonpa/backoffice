import { Box, Button, Stack, Text, useColorMode } from "@chakra-ui/react";
import { PaginationItem } from "./paginationItem";

interface PaginationProps {
  totalCountOfRegister: number;
  registerPerPage?: number;
  currentePage?: number;
  onPageChange: (page: number) => void;
}

const siblingsCount = 1;

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1;
    })
    .filter((page) => page > 0);
}

export function Pagination({
  totalCountOfRegister,
  registerPerPage = 4,
  currentePage = 1,
  onPageChange,
}: PaginationProps) {
  const { colorMode, toggleColorMode } = useColorMode();

  const lastPage = Math.ceil(totalCountOfRegister / registerPerPage);

  const previousPage =
    currentePage > 1
      ? generatePagesArray(currentePage - 1 - siblingsCount, currentePage - 1)
      : [];
  const nextPage =
    currentePage < lastPage
      ? generatePagesArray(
          currentePage,
          Math.min(currentePage + siblingsCount, lastPage)
        )
      : [];

  return (
    <Stack
      direction={["column", "row"]}
      mt="8"
      justify="space-between"
      align="center"
      spacing={6}
    >
      <Box>
        Página <strong>{currentePage}</strong> {(lastPage > 0) && (<>de <strong>{lastPage}</strong></>) }
      </Box>
      <Stack direction="row" spacing={2}>
        {currentePage > 1 + siblingsCount && (
          <>
            <PaginationItem onPageChange={onPageChange} numero={1} />
            {currentePage > 2 + siblingsCount && <Text color="gray.300" width="4" textAlign="center">...</Text>}
          </>
        )}

        {previousPage.length > 0 &&
          previousPage.map((page) => {
            return <PaginationItem onPageChange={onPageChange} key={page} numero={page} />;
          })}

        <PaginationItem onPageChange={onPageChange} numero={currentePage} isCurrentPage />

        {nextPage.length > 0 &&
          nextPage.map((page) => {
            return <PaginationItem onPageChange={onPageChange} key={page} numero={page} />;
          })}

        {currentePage + siblingsCount < lastPage && (
          <>
            {currentePage + 1 + siblingsCount < lastPage && <Text  color="gray.300" width="4" textAlign="center">...</Text>}
            <PaginationItem onPageChange={onPageChange} numero={lastPage} />
          </>
        )}

        {/* <PaginationItem numero={1} isCurrentPage />
        <PaginationItem numero={2} />
        <PaginationItem numero={3} />
        <PaginationItem numero={4} />
        <PaginationItem numero={5} /> */}
      </Stack>
    </Stack>
  );
}
