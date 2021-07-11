import { Flex, Box, Grid, Text, Button, Select, Image } from "@chakra-ui/react"

import { useRouter } from "next/router"
import { useDappContext } from "../contexts/DappContext"
import { ethers } from "ethers"

import moment from "moment"
import { useState } from "react"
import { useEffect } from "react"
import { toast } from "react-toastify"



interface RoomProps {
    id: number
    name: string;
    price: string;
    pricePerPeriod: string;
    vacant: string;
    checkoutDateOn: string;
    selectedPeriod: number;
}

const customEtherFormatFromWei = (value: string) => {

    const ether_format = ethers.utils.formatEther(value);

    return `${ether_format.split(".")[0]}.${ether_format.split(".")[1].padEnd(18, "0")}`
}

export const RoomList = () => {




    const Router = useRouter()


    const handleEnterRoom = (roomNumber: number) => {
        Router.push(`/room/${Number(roomNumber) + 1}`)
    }




    const { accounts, rooms, dappInnContract, currentTimeStamp } = useDappContext()

    const [items, setItems] = useState<RoomProps[]>([])

    const [selectedPeriod, setSelectedPeriod] = useState<number[]>([])

    useEffect(() => {

        setItems(rooms.map(item => {

            if (item.status > 0) {
                console.log("cc", item.id)
                console.log("cc", item.checkoutDate)
                console.log("nn", currentTimeStamp)
            }

            const _selectedPeriod = selectedPeriod.length > item.id ?
                selectedPeriod[item.id] :
                5 * 60;


            return {
                id: item.id,
                name: `Room 00${item.id + 1}`,
                price: item.price,
                pricePerPeriod: customEtherFormatFromWei(ethers.BigNumber.from(item.price).mul(_selectedPeriod).toString()),
                vacant: item.status == 0 ? 'Vacant' :
                    item.checkoutDate < currentTimeStamp ? 'Vacant' :
                        item.guest.toLocaleLowerCase() === accounts[0] ?
                            "Guest" :
                            'Occupied',
                checkoutDateOn: moment(item.checkoutDate).from(currentTimeStamp),
                selectedPeriod: _selectedPeriod
            }
        }))

    }, [rooms, selectedPeriod])

    const handleSetPeriod = (room_id: number, _period: number) => {
        setSelectedPeriod(rooms.map(r => r.id === room_id ? _period : items[room_id].selectedPeriod))
    }


    const handleRentRoom = async (room_number: number) => {

        const roomValue = rooms[room_number].price;

        console.log("r", rooms[room_number].checkoutDate)
        console.log("c", currentTimeStamp)
        console.log("s", items[room_number].selectedPeriod)
        const time_to_stay = ethers.BigNumber.from(items[room_number].selectedPeriod); // 5 minutes
        dappInnContract.checkIn(room_number, time_to_stay, {
            value: ethers.BigNumber.from(roomValue).mul(time_to_stay)
        })
            .then(() => toast.info("Waiting confirmation to delivery the key"))
            .catch(() => toast.error("There was an error while check in, Try again later"))
    }


    console.log("items", items)

    const colorVar = {
        // Occupied: "yellow.300",
        // Vacant: "green.300",
        // Guest: "blue.300"

        Occupied: "yellow.100",
        Vacant: "green.100",
        Guest: "blue.100"
    }

    return (
        <Flex mb="70px" flexWrap="wrap" gridGap="5" direction="row" width="100%" align="flex-start" justify={["center", "center", "flex-start"]} >

            {items.map(item => (
                <Flex
                    key={item.id}
                    w="250px"
                    bg={colorVar[item.vacant]}
                    // bg="brand.500"
                    border="1px"
                    direction="column"
                    justify="space-between"

                >
                    <Flex
                        direction="column" width="100%" align="center" justify="space-between"
                    >
                        <Flex
                            direction="column" width="100%" h="100%" align="flex-start" justify="center"
                        >
                            <Text px="2" fontSize="2xl" fontWeight="medium">{item.name}</Text>
                            <Text px="2" wordBreak="break-all" fontSize="15" >
                                {
                                    item.vacant == "Vacant" ?
                                        `${item.pricePerPeriod} ETH` :
                                        item.vacant == "Guest" ?
                                            "Your are the guest" :
                                            `Vacate ${item.checkoutDateOn}`
                                }
                            </Text>
                        </Flex>

                        <Image width="100%" src={`/static/images/room_${item.id}.jpg`}/>
                        
                    </Flex>

                    <Flex width="100%" minH="50px"
                        bg="white"
                        borderTop="1px"
                        direction="row"
                        justify="space-between"
                        align="center"
                        flexWrap="wrap"
                    >

                        {
                            item.vacant === "Vacant" ?
                                <Select ml="2" onChange={(el) => handleSetPeriod(Number(`${item.id}`), Number(el.currentTarget.value))} name="period" size="sm" maxWidth="120px">
                                    <option value={`${5 * 60}`}>5 Minutes</option>
                                    <option value={`${60 * 60}`}>One Hour</option>
                                    <option value={`${60 * 60 * 6}`}>6 Hours</option>
                                    <option value={`${60 * 60 * 24}`}>One Day</option>
                                    <option value={`${60 * 60 * 24 * 2}`}>2 Days</option>
                                    <option value={`${60 * 60 * 24 * 3}`}>3 Days</option>
                                    <option value={`${60 * 60 * 24 * 5}`}>5 Days</option>
                                    <option value={`${60 * 60 * 24 * 7}`}>One Week</option>
                                    <option value={`${60 * 60 * 24 * 7 * 2}`}>Two Week</option>
                                    <option value={`${60 * 60 * 24 * 30}`}>One Month</option>
                                </Select> :
                                <Text pl="5">{item.vacant}</Text>
                        }


                        {item.vacant === "Vacant" &&
                            <Button onClick={() => handleRentRoom(item.id)} mr="2" size="sm" fontWeight="medium" variant="brandGreen">Rent</Button>
                        }
                        {item.vacant === "Guest" &&
                            <Button onClick={() => handleEnterRoom(item.id)} mr="2" size="sm" fontWeight="medium" variant="brandBlue">Enter</Button>
                        }
                    </Flex>
                </Flex>
            ))}

        </Flex>
    )

}