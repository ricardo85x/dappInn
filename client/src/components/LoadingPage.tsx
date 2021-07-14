import { Box, Text } from "@chakra-ui/react"
import { Header } from "./Header"

export const LoadingPage = () => {


    return (
        <Box
            width="100%"
            justify="center"
            align="center"
        >
            <Box
                width="100%"
                maxWidth={1150}
                justify="center"
                align="center"
                backgroundColor="brand.900"
                border="1px"
            >
                <Header />
                
                <Box align="center" justify="center" p="5">
                    <Text fontSize="22">Loading...</Text>
                </Box>

            </Box>
        </Box>
    )
}