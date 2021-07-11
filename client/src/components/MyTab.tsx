import { Box, Text, Table, Thead, Tbody, Th, Tr, Td } from "@chakra-ui/react"
import { ethers } from "ethers";
import React from "react"
import { useDappContext } from "../contexts/DappContext";

interface MyTabProps {
    roomNumber: number;
}

type TabProps = {
    name: string;
    amount: number;
    value: string;
    rawValue: string; // wei
}

const customEtherFormatFromWei = (value: string) => {

    const ether_format = ethers.utils.formatEther(value);

    return  `${ether_format.split(".")[0]}.${ether_format.split(".")[1].padEnd(18,"0")}`
}

export const MyTab = ({ roomNumber }: MyTabProps) => {


    const { rooms } = useDappContext();

    const room = rooms[roomNumber];


    let tab: TabProps[] = [];

    room.tab.forEach(t => {

        const tabIndex = tab.findIndex(f => f.name === t.name)

        if (tabIndex > -1) {

            tab[tabIndex] = {
                ...tab[tabIndex],
                amount: tab[tabIndex].amount + 1,
                value: customEtherFormatFromWei(ethers.BigNumber.from(t.value).mul(tab[tabIndex].amount + 1).toString()),
                rawValue: ethers.BigNumber.from(t.value).mul(tab[tabIndex].amount + 1).toString()
            }
        } else {

            tab.push({
                name: t.name,
                amount: 1,
                value: customEtherFormatFromWei(t.value),
                rawValue: t.value
            })
        }




    })

    /// @dev sorry again \o/
    if (tab.length) {
        tab = [...tab, {
            name: "TOTAL",
            amount: 1,
            rawValue: tab.reduce((_total, _current) => {
                const _value = ethers.BigNumber.from(_current.rawValue).mul(_current.amount)
                _total = ethers.BigNumber.from(_total).add(_value).toString()
                return _total
            }, "0"),
            value: ""

        }]

        if (tab.length > 1) {
            tab[tab.length - 1].value = customEtherFormatFromWei(tab[tab.length - 1].rawValue)
        }
    }




    return (
        <Box border="1px" p={["2", "10"]} backgroundColor="orange.50" align="start" maxWidth={1100} width="100%">
            <Text fontWeight="semibold" textColor="gray.600" fontSize={["25", "4xl"]}>My Tab</Text>
            <Table colorScheme="orange" textColor="gray.600" >
                <Thead >
                    <Tr >
                        <Th p={["2", "4"]} textColor="orange.200" fontSize={["18", "2xl"]}>Service</Th>
                        <Th p={["2", "4"]} textColor="orange.200" fontSize={["18", "2xl"]}>Value</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {tab.map((item, index: number) => (
                        <Tr key={index}>
                            <Td p={["2", "4"]}> {(index < tab.length - 1) && `${item.amount}x`} {item.name}</Td>
                            <Td p={["2", "4"]}>{item.value} ETH</Td>
                        </Tr>
                    ))}

                </Tbody>

            </Table>
        </Box>

    )

}