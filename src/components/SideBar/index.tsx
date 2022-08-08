import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Image,
  useBreakpointValue,
  useColorMode,
} from "@chakra-ui/react";
import { useSideBarDrawer } from "../../contexts/sideBarDrawerContext";
import { SideBarNav } from "./sideBarNav";

export function Sidebar() {
  const { colorMode, toggleColorMode } = useColorMode();

  const { isOpen, onClose } = useSideBarDrawer();

  const isDrawerSideBar = useBreakpointValue({
    base: true,
    lg: false,
  });

  if (isDrawerSideBar) {
    return (
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent p="4">
            <DrawerCloseButton mt="6" />
            <DrawerHeader>
              <Flex
                align="center"
                justify="center"
                w="64"
              >
              <Image
                boxSize="80px"
                borderRadius="10"
                alt=""
                height="100%"
                src="/small_logo.png"
              />
              </Flex>
            </DrawerHeader>

            <DrawerBody>
              <SideBarNav />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    );
  }
  return <SideBarNav />;
}
