import { Flex, Box, Text, Button } from "@chakra-ui/react"
import { useDappContext } from "../contexts/DappContext"

export const Header = () => {

    const { accounts, handleConnect} = useDappContext()


    return (
        <Flex
            w="100%"
            backgroundColor="brand.550"
            align="center"
            justify="space-between"
        >
         
           <Text 
                py="2.5"
                px="5"
                backgroundColor="brand.500"
                border="1px" 
                borderLeft="none"
                borderTop="none"
                borderBottomRightRadius="30"
                borderColor="black"
                fontSize="30"
                fontWeight="medium"
                textColor="black"
                color="black"
                _hover={{ bg: "brand.600"}}
                cursor="pointer"
                title="Home"
                
                > 
                    dApp Inn
            </Text>
            
            

            <Button m="2" mr="5" colorScheme="brand"

                onClick={handleConnect}
            
                variant="brand"
            > 
                 { accounts.length ? `0x...${accounts[0].substr(-4)}` : "Connect" }
            </Button>

        </Flex>
    )
}