import { Box, Flex, Text, Button, IconButton } from "@chakra-ui/react"
import { Header } from "../../components/Header"
import { MyTab } from "../../components/MyTab"
import { ServiceList } from "../../components/ServiceList"
import { FiChevronLeft } from "react-icons/fi";
import { useRouter } from "next/router"
import { useDappContext } from "../../contexts/DappContext";
import Router from 'next/router'
import { toast } from "react-toastify";
import { ethers } from "ethers";
import moment from "moment"



export default function Room() {

    const { accounts, dappInnContract,roomServices, rooms, currentTimeStamp } = useDappContext();

    const Router = useRouter()

    const { roomNumber  } = Router.query

    const room_id = Number(roomNumber) - 1;

    if(rooms.length < room_id){

        // toast.error("Invalid Room")
        // Router.push("/")

        return <Text>Loading</Text>

    
    }

    const currentRoom = rooms[room_id];

    if(!currentRoom?.guest){
        return <Text>Loading</Text>
    }

    if(accounts[0].toLowerCase() !== currentRoom.guest.toLowerCase()){
        toast.error("Ops wrong room")
        Router.push("/")
        return <Text>Loading</Text>
    }


    

    if(currentTimeStamp > currentRoom.checkoutDate){
        toast.error("Your stay period is over, pack your stuffs and leave")
        Router.push("/")
        return <Text>Loading</Text>
    }

    const room = {
        id: currentRoom.id,
        name: `Room ${String(roomNumber).padStart(3, '0')}`,
        price: ethers.utils.formatEther(ethers.BigNumber.from(currentRoom.price)),
        vacant: 'Guest',
        checkOutOn: moment(currentRoom.checkoutDate).from(currentTimeStamp)
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
                maxWidth={1150}
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

                        <Text textAlign="left" fontSize={["20", "25", "3xl"]} color="brand.600">You have to checkout {room.checkOutOn}</Text>

                        <Text textAlign="left" fontSize={["20", "25", "3xl"]}>Enjoy your stay and order some room service!</Text>

                        <MyTab roomNumber={room.id} />

                        <ServiceList roomNumber={room.id} />

                    </Flex>

                </Box>






            </Box>

        </Box>
    )
}
