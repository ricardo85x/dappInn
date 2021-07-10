import { Box, Flex, Text } from "@chakra-ui/react"
import { Header } from "../components/Header"
import { RoomList } from "../components/RoomList"

export default function Home() {
  return (
    <Box
      width="100%"
      justify="center"
      align="center"
    >
      <Box
        width="100%"
        maxWidth={1100}
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

          >
            <Text fontSize="4xl">Welcome to dDapp Inn</Text>

            <Text fontSize="3xl" color="brand.600">Choose an empty room to rent</Text>

            <RoomList />

          </Flex>

        </Box>

      </Box>

    </Box>
  )
}
