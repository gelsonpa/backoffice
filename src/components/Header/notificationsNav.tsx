import {
  HStack,
  Icon,
  Stack,
  Switch,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { RiNotificationLine, RiUserStarLine } from "react-icons/ri";

export function NotificationsNav() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack
      spacing={["6", "8"]}
      mx={["6", "8"]}
      pr={["6", "8"]}
      py="1"
      color="gray.300"
      borderRadius={1}
      borderColor="gray.700"
    >
      <Icon
        as={RiNotificationLine}
        color={colorMode === "light" ? "Dark" : "gray.300"}
      />
      <Icon
        as={RiUserStarLine}
        color={colorMode === "light" ? "Dark" : "gray.300"}
      />

      <Stack align="center" direction="row">
        <Text size="lg">Light</Text>
        <Switch size="md" colorScheme="gray.900" onChange={toggleColorMode} />
        <Text size="lg">Dark</Text>
      </Stack>
    </HStack>
  );
}
