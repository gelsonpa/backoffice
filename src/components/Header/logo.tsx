import { Flex, Image } from "@chakra-ui/react";
import Link from "next/link";
import { url } from "../../config/config";
import { useSetting } from "../../hooks/useSetting";

interface LogoProps {
  showLogoData?: boolean;
}

export function Logo({ showLogoData = true }: LogoProps) {
  const { data, isLoading, error, refetch, isFetching } = useSetting();

  var logotipo = "";

  if (!isLoading)
    data.map((result) => {
      logotipo = result.logotipo;
    });

  return (
    <Flex
      fontWeight="bold"
      align="center"
      justify="center"
      color="green.100"
      letterSpacing="tight"
      w="64"
    >
      {!isLoading && showLogoData && (
        <Link href="/dashboard" passHref>
          <Image
            boxSize="80px"
            borderRadius="10"
            alt=""
            height="100%"
            _hover={{ cursor: "pointer" }}
            //src="/small_logo.png"
            src={url + logotipo}
          />
        </Link>
      )}
    </Flex>
  );
}
