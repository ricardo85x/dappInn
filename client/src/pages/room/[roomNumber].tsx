import { Box, Flex, Text, Button, IconButton } from "@chakra-ui/react"
import { Header } from "../../components/Header"
import { MyTab } from "../../components/MyTab"
import { LoadingPage } from "../../components/LoadingPage"
import { ServiceList } from "../../components/ServiceList"
import { FiChevronLeft } from "react-icons/fi";
import { useRouter } from "next/router"
import { useDappContext } from "../../contexts/DappContext";
import { ethers } from "ethers";
import moment from "moment"
import { notify } from "../../services/notify"





export default function Room() {



    const { accounts, dappInnContract, rooms, currentTimeStamp } = useDappContext();

    const Router = useRouter()

    const { roomNumber } = Router.query

    const room_id = Number(roomNumber) - 1;

    if (rooms.length < room_id) {
        notify("Invalid room", "error");
        Router.push("/")
        return (<LoadingPage />)
    }

    const currentRoom = rooms[room_id];

    if (!currentRoom?.guest) {
        return (<LoadingPage />)
    }

    if (accounts[0].toLowerCase() !== currentRoom.guest.toLowerCase()) {
        notify("Ops wrong room", "error");

        Router.push("/")
        return (<LoadingPage />)
    }

    if (currentTimeStamp > currentRoom.checkoutDate) {
        notify("Your stay period is over, pack your stuffs and leave", "error");

        Router.push("/")
        return (<LoadingPage />)
    }

    const room = {
        id: currentRoom.id,
        name: `Room ${String(roomNumber).padStart(3, '0')}`,
        price: ethers.utils.formatEther(ethers.BigNumber.from(currentRoom.price)),
        vacant: 'Guest',
        checkOutOn: moment(currentRoom.checkoutDate).from(currentTimeStamp) + ' ' +
            'on ' + moment(currentRoom.checkoutDate).format("MMM Do YYYY [at] H:mm")
    }


    const handleCheckOut = () => {
        dappInnContract.checkOut(currentRoom.id)
            .then(() => notify('Waiting confirmation, start packing your stufs',"info"))
            .catch(() => notify('Something went wrong. Please try again',"error"))
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
                bgGradient="linear(to-t, brand.700, brand.900)"


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
                            <IconButton colorScheme="whiteAlpha" size="sm" onClick={() => Router.push("/")} aria-label="Return to Home" icon={<FiChevronLeft />} />
                            <Text fontSize={["25", "2xl", "4xl"]}>{room.name} </Text>
                            <Button onClick={handleCheckOut} colorScheme="whiteAlpha" >Check-Out Early</Button>
                        </Flex>

                        <Text textAlign="left" fontSize={["20", "25", "3xl"]} color="brand.300">You have to checkout {room.checkOutOn}  </Text>

                        <Text textAlign="left" fontSize={["20", "25", "3xl"]}>Enjoy your stay and order some room service!</Text>

                        <MyTab roomNumber={room.id} />

                        <ServiceList roomNumber={room.id} />

                    </Flex>

                </Box>

            </Box>
        </Box>
    )
}
