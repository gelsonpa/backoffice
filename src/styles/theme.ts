import { extendTheme, ThemeConfig  } from '@chakra-ui/react';
import { useState } from 'react';

const config: ThemeConfig = {
    initialColorMode: 'light',
    useSystemColorMode: false,
}

function  custonColor  ()  {

  if(theme.config.initialColorMode === 'light') {
       return 'red';
  }else{
       return 'light';
  }
}


function aut (){

    const [authenticated, setAuthenticated] = useState(false);

    return alert(authenticated) ;
}


const theme = extendTheme({
    color: {
        gray: {
            //nd nka poi inda
        }
    },
    fonts: {
        headings: 'Roboto',
        body: 'Roboto',
    },
    styles: {
        global: {
            body: {
                bg: 'gray.900',
                color: 'gray.50'
            }
        }
    },
    config, custonColor, aut
})

export default theme