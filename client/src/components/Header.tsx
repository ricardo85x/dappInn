import { Flex, Text, Button } from "@chakra-ui/react"
import { useRouter } from "next/router";
import { useDappContext } from "../contexts/DappContext"

export const Header = () => {

    const { accounts, handleConnect } = useDappContext()

    const Router = useRouter();

    return (
        <Flex
            w="100%"
            bgGradient="linear(to-br, brand.550, brand.700)"
            align="center"
            justify="space-between"
        >

            <Text
                py="2.5"
                px="5"
                bgGradient="linear(to-b, brand.800, brand.900)"
                border="1px"
                borderLeft="none"
                borderTop="none"
                borderBottomRightRadius="30"
                borderColor="gray.100"
                fontSize="30"
                fontWeight="medium"
                textColor="gray.100"
                color="gray.100"
                _hover={{ bgGradient: "linear(to-br, brand.500, brand.700)" }}
                cursor="pointer"
                title="Home"

                onClick={() => Router.push("/")}

            >
                dApp Inn
            </Text>


            <Button m="2" mr="5"
                onClick={handleConnect}
                colorScheme="whiteAlpha"
            >
                {accounts.length ? `0x...${accounts[0].substr(-4)}` : "Connect"}
            </Button>

        </Flex>
    )
}