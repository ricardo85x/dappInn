import { Box, Flex, Text, Button, IconButton } from "@chakra-ui/react"
import { Header } from "../components/Header"
import { MyTab } from "../components/MyTab"
import { ServiceList } from "../components/ServiceList"
import { FiChevronLeft } from "react-icons/fi";
import { useRouter } from "next/router"


export default function Room() {

    const Router = useRouter()

    const room = {
        id: 5,
        name: `Room 005`,
        price: `0.0000005 ETH`,
        vacant: 'Guest'
    }


    const returnToHome = () => {

        Router.push("/")
    }


    return (
        <Box
            width="100%"
            justify="center"
            align="center"
        >
            <Box
                width="100%"
                maxWidth={1100}
                justify="center"
                align="center"
                backgroundColor="red.50"
                border="1px"
            >
                <Header />


                <Box align="center" width="100%">
                    <Flex
                        direction="column"
                        width="100%"
                        maxWidth={1100}

                        mt="10" gridGap="3"
                        px="5"

                        align="flex-start"
                        justify="center"

                        pb="80px"

                    >
                        <Flex width="100%" gridGap="2" justify={["space-between", "start"]} align="center" direction="row" flexWrap="wrap">
                            <IconButton size="sm" onClick={returnToHome} aria-label="Return to Home" icon={<FiChevronLeft />} />
                            <Text fontSize={["25", "2xl", "4xl"]}>{room.name} </Text>
                            <Button variant="brand">Check-Out Early</Button>
                        </Flex>

                        <Text textAlign="left" fontSize={["20", "25", "3xl"]} color="brand.600">You can stay in this room for another 2 days</Text>

                        <Text textAlign="left" fontSize={["20", "25", "3xl"]}>Enjoy your stay and order some room service!</Text>

                        <MyTab />

                        <ServiceList />

                    </Flex>

                </Box>






            </Box>

        </Box>
    )
}
