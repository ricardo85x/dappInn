import { Box, Flex, Text } from "@chakra-ui/react"
import { Header } from "../components/Header"
import { RoomList } from "../components/RoomList"
import { useDappContext } from "../contexts/DappContext";

export default function Home() {


  const { dappError } = useDappContext();
  
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

          >
            <Text fontWeight="medium" fontSize="4xl">Welcome to dDapp Inn</Text>

            { dappError.hasError ? (
              <Text fontSize="3xl" color="brand.600"> `{dappError.message} </Text>
            ) : (
              <Text fontSize="3xl" color="green.500">Choose an <b>empty</b> room to rent </Text>

            ) } 


            <RoomList />

          </Flex>

        </Box>

      </Box>

    </Box>
  )
}
