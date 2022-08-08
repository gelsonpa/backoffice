import {
  Flex,
  Icon,
  IconButton,
  useBreakpointValue,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import  Router  from "next/router";
import { useContext, useEffect } from "react";
import { RiMenuLine } from "react-icons/ri";
import { AuthContext } from "../../contexts/AuthContext";
import { useSideBarDrawer } from "../../contexts/sideBarDrawerContext";
import { Logo } from "./logo";

import { NotificationsNav } from "./notificationsNav";
import { Profile } from "./profile";
import { SearchBox } from "./searchBox";

import { parseCookies, setCookie, destroyCookie } from "nookies";



export function Header() {
  const { colorMode, toggleColorMode } = useColorMode();

  const { isAuthenticated } = useContext(AuthContext);

  const { valUserValidation } = useContext(AuthContext);

  /* valUserValidation(); */


   const cookies = parseCookies();

   const toast = useToast();

   function addToast(title, msg, type) {
     toast.closeAll();

     return toast({
       title: title,
       position: "top-right",
       description: msg,
       status: type,
       duration: 5000,
       isClosable: true,
     });
   }


  useEffect(() => {
    const checkAuthenticate = async () => {
      const token = cookies.AUTH_TOKEN;
      if (!token) {
        //api.defaults.headers.Authorization = `Bearer ${token}`;
        Router.push("/");
      }
    };
    checkAuthenticate();
  }, []);


  const { onOpen } = useSideBarDrawer();

  const isLargeScreen = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Flex
      as="header"
      w="100%"
      maxWidth="1480"
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >
      {!isLargeScreen && (
        <IconButton
          aria-label="Open-navegation"
          mr="2"
          icon={<Icon as={RiMenuLine} />}
          fontSize="24"
          variant="unstyled"
          onClick={onOpen}
        ></IconButton>
      )}

      <Logo showLogoData={isLargeScreen} />

      {isLargeScreen && <SearchBox />}

      <Flex align="center" ml="auto">
        <NotificationsNav />

        <Profile showProfileData={isLargeScreen} />
      </Flex>
    </Flex>
  );
}
