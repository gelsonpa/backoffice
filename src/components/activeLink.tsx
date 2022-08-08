import { useColorMode } from "@chakra-ui/react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { cloneElement, forwardRef, ForwardRefRenderFunction, ReactElement, ReactNode } from "react";

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  shoudMatchExactHref?: boolean;
}

const ActiveLinkk: ForwardRefRenderFunction<HTMLElement, ActiveLinkProps> = ({
  children,
  shoudMatchExactHref = false,
  ...rest
}, ref) => {

    const { colorMode, toggleColorMode } = useColorMode();

  let isActive = false;

  const { asPath } = useRouter();

  if (shoudMatchExactHref && (asPath == rest.href || asPath == rest.as)) {
    isActive = true;
  }

  if (
    !shoudMatchExactHref &&
    (asPath.startsWith(String(rest.href)) || asPath.startsWith(String(rest.as)))
  ) {
    isActive = true;
  }

  return (
    <Link scroll={false} {...rest}>
      {cloneElement(children, {
        color: isActive ? "green.500" : (colorMode === "light" ? "Dark" : "gray.100"),
        marginLeft: isActive ? "2" : "0",
      })}
    </Link>
  );
}

export const ActiveLink = forwardRef(ActiveLinkk)
