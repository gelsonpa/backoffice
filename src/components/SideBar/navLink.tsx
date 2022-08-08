import {
  Icon,
  Link as ChakraLink,
  Text,
  useColorMode,
  LinkProps as ChakraLinkProps,
} from "@chakra-ui/react";
import Link from "next/link";
import { ElementType } from "react";
import { ActiveLink } from "../activeLink";

interface NavLinkProps extends ChakraLinkProps {
  title: string;
  icon: ElementType;
  href: string;
}

export function NavLink({ icon, href, title, ...rest }: NavLinkProps) {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Link href={href} passHref>
      <ActiveLink href={href} passHref>
      <ChakraLink
        display="flex"
        align="center"
        to="/"
        color={colorMode === "light" ? "Dark" : "gray.100"}
        _hover={{color: "green.500", marginLeft: 2}}
        {...rest}
      >
        <Icon as={icon} fontSize="20" />
        <Text ml={4} fontWeight="medium">
          {title}
        </Text>
      </ChakraLink>
      </ActiveLink>
    </Link>
  );
}
