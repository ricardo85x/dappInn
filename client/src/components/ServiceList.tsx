import { Box, Text, Flex, Button, Image } from "@chakra-ui/react"
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { useDappContext } from "../contexts/DappContext";

interface ServiceListProps {
    roomNumber: number;
}

const customEtherFormatFromWei = (value: string) => {
    const ether_format = ethers.utils.formatEther(value);
    return `${ether_format.split(".")[0]}.${ether_format.split(".")[1].padEnd(18, "0")}`
}

export const ServiceList = ({ roomNumber }: ServiceListProps) => {
    const { roomServices, dappInnContract } = useDappContext();
    const services = roomServices.filter(f => f.enabled).map(s => {
        return {
            id: s.id,
            name: s.name,
            value: customEtherFormatFromWei(s.value)
        }
    })

    const handleBuyService = async (service_id: number) => {
        const wantedService = await dappInnContract.roomService(service_id)

        if (wantedService && wantedService.enabled) {
            dappInnContract.buyRoomService(roomNumber, service_id, {
                value: wantedService.price
            })
                .then(() => {
                    toast.info('Waiting confirmation to delivery the service')
                }).catch(() => {
                    toast.error('Sorry, something nasty happened')
                })
        } else {
            toast.error('Sorry, this service is unavailable')
        }
    }

    return (
        <Box border="1px" borderRadius="10" p={["2", "10"]} backgroundColor="brand.800" align="start" maxWidth={1100} width="100%">
           
            <Text pb="5" fontWeight="semibold" textColor="brand.400" fontSize={["25", "4xl"]}>Available services to buy</Text>
            <Flex width="100%" direction="row" flexWrap="wrap" justify="space-between" align="center" gridGap="5" >
                {services.map((item, index: number) => (

                    <Flex bg="brand.900"  borderRadius="5" key={index} border="1px" p="4" minW="200px" maxWidth="300px" direction="column" align="center" justify="space-between">
                        <Image height="200px" src={`/images/services/${item.name}.jpg`} />
                        <Flex  gridGap="2" width="100%" align="center" direction="column" justify="space-between">
                            <Text pt="2" fontWeight="medium">{item.name}</Text>
                            <Text>{item.value} ETH</Text>
                            <Button onClick={() => handleBuyService(item.id)}  colorScheme="green"  borderColor="gray.100" width="100%">Buy</Button>
                        </Flex>
                    </Flex>

                ))}
            </Flex>
        </Box>
    )
}
