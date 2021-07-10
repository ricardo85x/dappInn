import { Box, Text, Table, Thead, Tbody, Th, Tr, Td, IconButton } from "@chakra-ui/react"
import { GiTakeMyMoney } from "react-icons/gi";


export const ServiceList = () => {

    const services = [
        { name: "Coke", value: "0.0001 ETH" },
        { name: "Cleaning Service", value: "0.0015 ETH" },
        { name: "Bootle of Vine", value: "0.003 ETH" },
        { name: "Soap", value: "0.000055 ETH" },
        { name: "Internet", value: "0.0001 ETH" },
        { name: "Cable TV", value: "0.0003 ETH" },
    ]

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
                            <Td p={["2","4"]}><IconButton  size="sm" colorScheme="green" variant="outline" color="green.500" aria-label="Take My Money!" icon={<GiTakeMyMoney />} /> {item.name}</Td>
                            <Td p={["2","4"]}>{item.value}</Td>
                        </Tr>
                    ))}

                </Tbody>

            </Table>
        </Box>

    )

}