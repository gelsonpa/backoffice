import {useDisclosure, UseDisclosureReturn} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface SideBarDrawerProviderProps {
  children: ReactNode;
}


type SideBarDrawerContextData = UseDisclosureReturn

const SideBarDrawerContext = createContext({} as SideBarDrawerContextData );

export function SideBarDrawerProvider({
  children,
}: SideBarDrawerProviderProps) {

  const [authenticated, setAuthenticated] = useState(false);

    const disclosure = useDisclosure();

    const router = useRouter();

    const teste = () =>{
      return alert('test');
    }

    useEffect(()=>{
        disclosure.onClose();
    }, [router.asPath]);

  return (
    <SideBarDrawerContext.Provider value={disclosure}>
      {children}
    </SideBarDrawerContext.Provider>
  );
}

export const useSideBarDrawer = () => useContext(SideBarDrawerContext)
