import { Box, Text, Table, Thead, Tbody, Th, Tr, Td } from "@chakra-ui/react"
import React from "react"

export const MyTab = () => {

    const tab = [
        { name: "Coke", amount: 5, value: "0.0005 ETH" },
        { name: "Cleaning Service", amount: 1, value: "0.0015 ETH" },
        { name: "Bootle of Vine", amount: 2, value: "0.003 ETH" },
        { name: "Soap", amount: 5, value: "0.000055 ETH" },
        { name: "Internet", amount: 1, value: "0.0001 ETH" },
        { name: "TOTAL", amount: 14, value: "0.005155 ETH" },
    ]

    return (
        <Box border="1px" p={["2","10"]} backgroundColor="orange.50" align="start" maxWidth={1100} width="100%">
            <Text fontWeight="semibold" textColor="gray.600" fontSize={["25","4xl"]}>My Tab</Text>
            <Table colorScheme="orange" textColor="gray.600" >
                <Thead >
                    <Tr >
                        <Th p={["2","4"]} textColor="orange.200" fontSize={["18","2xl"]}>Service</Th>
                        <Th p={["2","4"]} textColor="orange.200" fontSize={["18","2xl"]}>Value</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {tab.map((item, index: number) => (
                        <Tr key={index}>
                            <Td p={["2","4"]}> {(index < tab.length -1) && `${item.amount}x` } {item.name}</Td>
                            <Td p={["2","4"]}>{item.value}</Td>
                        </Tr>
                    ))}

                </Tbody>

            </Table>
        </Box>

    )

}