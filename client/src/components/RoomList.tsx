import { Flex, Text, Button, Select, Image } from "@chakra-ui/react"

import { useRouter } from "next/router"
import { useDappContext } from "../contexts/DappContext"
import { ethers } from "ethers"

import moment from "moment"
import { useState } from "react"
import { useEffect } from "react"
import { notify } from "../services/notify"

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

    useEffect(() => {
        setItems(rooms.map(item => {

            // verify if selected Price already exists
            const _selectedPeriod = items.length > item.id ?
                items[item.id].selectedPeriod ? items[item.id].selectedPeriod :
                    60 * 60 * 24 : 60 * 60 * 24; // otherwise use default One Day

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

    }, [rooms])

    const handleSetPeriod = (room_id: number, _period: number) => {

        setItems(items.map(item => {
            if (item.id === room_id) {
                return {
                    ...item,
                    selectedPeriod: _period,
                    pricePerPeriod: customEtherFormatFromWei(
                        ethers.BigNumber.from(item.price).mul(_period).toString()
                    )
                }
            }
            return item
        }))
    }


    const handleCheckIn = async (room_number: number) => {

        const roomPrice = rooms[room_number].price;
        const time_to_stay = ethers.BigNumber.from(items[room_number].selectedPeriod);

        dappInnContract.checkIn(room_number, time_to_stay, {
            value: ethers.BigNumber.from(roomPrice).mul(time_to_stay)
        })
            .then(() => notify("Waiting confirmation to delivery the key","info"))
            .catch(() => notify("There was an error while check in, Try again later","error"))
    }

    // update this values to change header color
    const colorVar = {
        // Occupied: "yellow.300",
        // Vacant: "green.300",
        // Guest: "blue.300"

        Occupied: "brand.800",
        Vacant: "brand.800",
        Guest: "brand.800"
    }

    const SelectOptions = [
        { name: "5 Minutes", value: 60 * 5 },
        { name: "30 Minutes", value: 60 * 30 },
        { name: "One Hour", value: 60 * 60 },
        { name: "6 Hours", value: 60 * 60 * 6 },
        { name: "12 Hours", value: 60 * 60 * 12 },
        { name: "One Day", value: 60 * 60 * 24 },
        { name: "Two Days", value: 60 * 60 * 24 * 2 },
        { name: "5 Days", value: 60 * 60 * 24 * 5 },
        { name: "One Week", value: 60 * 60 * 24 * 7 },
        { name: "Two Weeks", value: 60 * 60 * 24 * 7 * 2 },
        { name: "One Mount", value: 60 * 60 * 24 * 30 },
    ]

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
                    borderRadius="5"

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

                        <Image width="100%" src={`/images/room_${item.id}.jpg`} />

                    </Flex>

                    <Flex width="100%" minH="50px"
                        bg="brand.800"
                        borderTop="1px"
                        direction="row"
                        justify="space-between"
                        align="center"
                        flexWrap="wrap"
                        borderBottomRadius="5"
                    >

                        {item.vacant === "Vacant" &&
                            <Button onClick={() => handleCheckIn(item.id)} ml="2" size="sm" fontWeight="medium" colorScheme="green" borderColor="gray.100"    >Rent for</Button>
                        }
                        {item.vacant === "Guest" &&
                            <Button onClick={() => handleEnterRoom(item.id)} ml="2" size="sm" fontWeight="medium" borderColor="gray.100" colorScheme="blue" >Enter</Button>
                        }

                        {
                            item.vacant !== "Vacant" ?
                                <Text fontWeight="medium" px="5">{item.vacant}</Text>
                                :
                                <Select mr="2" defaultValue={item.selectedPeriod} onChange={(el) => handleSetPeriod(Number(`${item.id}`), Number(el.target.value))} name="period" size="sm" maxWidth="120px">

                                    {SelectOptions.map(option => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.name}
                                        </option>
                                    ))}

                                </Select>
                        }

                    </Flex>
                </Flex>
            ))}

        </Flex>
    )

}