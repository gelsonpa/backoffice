import { Box, Stack } from "@chakra-ui/react";
import { RiContactsLine, RiDashboardLine, RiFloodLine, RiInputMethodLine, RiSettingsFill, RiUserSettingsLine } from "react-icons/ri";
import { NavLink } from "./navLink";
import { NavSection } from "./navSection";

export function SideBarNav(){
    return(
        <Box as="aside" w="64" mr="8">
        <Stack spacing="12" align="flex-start">
          <NavSection title="Geral">
            <NavLink title="Dashboard" icon={RiDashboardLine} href="/dashboard" />
            <NavLink title=" Lista Employers" icon={RiContactsLine} href="/employer"/>
            <NavLink title="Lista Jobbers" icon={RiContactsLine} href="/jobbers"/>
            <NavLink title="Lista Biscaites" icon={RiFloodLine} href="/proposta"/>
          </NavSection>

          <NavSection title="DEFINIÇÕES">
            <NavLink title="Catálogo" icon={RiInputMethodLine} href="/catalogo"/>
            <NavLink title="Meu Perfil" icon={RiUserSettingsLine} href="/user"/>
            <NavLink title="Setting" icon={RiSettingsFill} href="/setting"/>
          </NavSection>
        </Stack>
      </Box>
    );
}