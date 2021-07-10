import { Flex, Box, Grid, Text, Button } from "@chakra-ui/react"

import { useRouter } from "next/router"


export const RoomList = () => {

    const Router = useRouter()


    const handleEnterRoom = () => {
        Router.push("/room")
    }

    const handleRentRoom = () => {
        console.log("renting Room")
    }



    const items = [...Array(5)].map((_, index) => {
        return {
            id: index,
            name: `Room 00${index + 1}`,
            price: `0.0000000${index + Math.floor(Math.random() * 10)} ETH`,
            vacant: Math.floor(Math.random() * 10) % 2 == 0 ?
                'Occupied' :
                Math.floor(Math.random() * 10) % 2 == 0 ?
                    'Vacant' :
                    'Guest'
        }
    })

    console.log("items", items)

    const colorVar = {
        Occupied: "yellow.300",
        Vacant: "green.300",
        Guest: "blue.300"
    }

    return (
        <Flex mb="70px" flexWrap="wrap" gridGap="5" direction="row" width="100%" align="flex-start" justify={["center", "center", "flex-start"]} >

            {items.map(item => (
                <Flex
                    key={item.id}
                    w="250px" 
                    bg={colorVar[item.vacant]}
                    border="1px"
                    direction="column"
                    justify="space-between"

                >
                    <Flex direction="column" minH="200px" width="100%" h="100%" align="center" justify="center">
                        <Text fontSize="2xl" fontWeight="medium">{item.name}</Text>
                        <Text wordBreak="break-all" fontSize="2xl" >
                        {
                            item.vacant == "Vacant" ? 
                                item.price :
                                item.vacant == "Guest" ? 
                                    "Your are the guest" : 
                                    `${item.id + 3} days left to vacate`
                        }    
                        </Text>
                    </Flex>
                    <Flex width="100%" minH="50px"
                        bg="gray.300"
                        borderTop="1px"
                        direction="row"
                        justify="space-between"
                        align="center"
                        flexWrap="wrap"
                    >
                        <Text pl="5">{item.vacant}</Text>
                        {item.vacant === "Vacant" &&
                            <Button onClick={handleRentRoom} mr="2" size="sm" variant="brandGreen">Rent</Button>
                        }
                        {item.vacant === "Guest" &&
                            <Button onClick={handleEnterRoom} mr="2" size="sm" fontWeight="normal" variant="brandBlue">Enter</Button>
                        }
                    </Flex>
                </Flex>
            ))}

        </Flex>
    )

}