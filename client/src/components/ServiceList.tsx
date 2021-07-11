import { Box, Text, Table, Thead, Tbody, Th, Tr, Td, IconButton } from "@chakra-ui/react"
import { ethers } from "ethers";
import { GiTakeMyMoney } from "react-icons/gi";
import { toast } from "react-toastify";
import { useDappContext } from "../contexts/DappContext";



interface ServiceListProps {
    roomNumber: number;
}

const customEtherFormatFromWei = (value: string) => {

    const ether_format = ethers.utils.formatEther(value);

    return  `${ether_format.split(".")[0]}.${ether_format.split(".")[1].padEnd(18,"0")}`
}

export const ServiceList = ({ roomNumber} : ServiceListProps) => {


    const { roomServices, dappInnContract } = useDappContext();


 

    const services = roomServices.filter(f => f.enabled).map(s => {
        return {
            id: s.id,
            name: s.name,
            value: customEtherFormatFromWei(s.value)
            // value: ethers.utils.formatEther(s.value)
        }
    })


    const handleBuyService = async (service_id: number) => {

        const wantedService = await dappInnContract.roomService(service_id)



        if(wantedService && wantedService.enabled){
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
        <Box border="1px" p={["2","10"]}  backgroundColor="green.50" align="start" maxWidth={1100} width="100%">
            <Text fontWeight="semibold" textColor="gray.600" fontSize={["25","4xl"]}>Available services to buy</Text>
            <Table colorScheme="green" textColor="gray.600" >
                <Thead>
                    <Tr>
                        <Th p={["2","4"]} textColor="green.200" fontSize={["18","2xl"]}>Service</Th>
                        <Th p={["2","4"]} textColor="green.200" fontSize={["18","2xl"]}>Value</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {services.map((item, index: number) => (
                        <Tr  key={index}>
                            <Td p={["2","4"]}><IconButton onClick={() => handleBuyService(item.id)}  size="sm" colorScheme="green" variant="outline" color="green.500" aria-label="Take My Money!" icon={<GiTakeMyMoney />} /> {item.name}</Td>
                            <Td p={["2","4"]}>{item.value} ETH</Td>
                        </Tr>
                    ))}

                </Tbody>

            </Table>
        </Box>

    )

}