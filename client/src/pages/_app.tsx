import { ChakraProvider } from "@chakra-ui/react"

import {DappContextProvider } from "../contexts/DappContext"

import { ToastContainer } from 'react-toastify';


import { theme } from "../styles/theme"

import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
       <DappContextProvider>
         <Component {...pageProps} />
         <ToastContainer />
       </DappContextProvider>
    </ChakraProvider>
 )
}

export default MyApp
