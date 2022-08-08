import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { SideBarDrawerProvider } from "../contexts/sideBarDrawerContext";
import { AuthProvider } from "../contexts/AuthContext";
import Router from 'next/router';

import { QueryClient, QueryClientProvider } from "react-query";

// import { AuthProvider } from "../contexts/AuthContext";
/* import { theme } from '../styles/theme' */

import nProgress from 'nprogress';
import React from "react";

import { queryClient } from "../config/config";
// import '../styles/nprogress.css';

Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);



function MyApp({ Component, pageProps }: AppProps) {
  /*   React.useEffect(() => {
    const handleRouteStart = () => NProgress.start();
    const handleRouteDone = () => NProgress.done();

    Router.events.on("routeChangeStart", handleRouteStart);
    Router.events.on("routeChangeComplete", handleRouteDone);
    Router.events.on("routeChangeError", handleRouteDone);

    return () => {
      // Make sure to remove the event handler on unmount!
      Router.events.off("routeChangeStart", handleRouteStart);
      Router.events.off("routeChangeComplete", handleRouteDone);
      Router.events.off("routeChangeError", handleRouteDone);
    };
  }, []); */


  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ChakraProvider /* theme={ theme} */>
          <SideBarDrawerProvider>
            <Component {...pageProps} />
          </SideBarDrawerProvider>
        </ChakraProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
