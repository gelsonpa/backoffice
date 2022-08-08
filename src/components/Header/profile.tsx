import {
  Avatar,
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

import { parseCookies, setCookie, destroyCookie } from "nookies";
import Link from "next/link";
import { url } from "../../config/config";

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  const { colorMode, toggleColorMode } = useColorMode();

  const { signOut, user } = useContext(AuthContext);

  return (
    <Flex align="center" mr="8">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text color={colorMode === "light" ? "Dark" : "gray.300"}>
            {user.firstName + " " + user.lastName}
          </Text>
          <Text color="gray.300" fontSize="small">
            {user.email}
          </Text>
        </Box>
      )}

      <Menu>
        <MenuButton
          as={Button}
          borderRadius={100}
          size="small"
          colorScheme="pink"
        >
          <Avatar
            size="md"
            name={user.firstName + " " + user.lastName}
            src={url + user.img}
          />
        </MenuButton>
        <MenuList>
          <MenuGroup title="Profile">
            <Link href="/user" passHref>
              <MenuItem color={colorMode === "light" ? "Dark" : "gray.300"}>
                Minha Conta
              </MenuItem>
            </Link>
            <Link href="/setting" passHref>
              <MenuItem color={colorMode === "light" ? "Dark" : "gray.300"}>
                Configuração
              </MenuItem>
            </Link>
          </MenuGroup>
          <MenuDivider color="gray.900" />
          <MenuGroup
            color={colorMode === "light" ? "Dark" : "gray.300"}
            title="Help"
          >
            <MenuItem
              onClick={signOut}
              color={colorMode === "light" ? "Dark" : "gray.300"}
            >
              Logout
            </MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
    </Flex>
  );
}
