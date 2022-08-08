import { useToast } from "@chakra-ui/react";



export const handleShowToast = ( msg, tipo) => {

  const toast = useToast();
  
  toast({
    title: "Atenção",
    status: tipo,
    description: msg,
    isClosable: true,
    position: "top-right",
  });
}
