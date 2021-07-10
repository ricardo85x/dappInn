import { extendTheme } from "@chakra-ui/react"

const customButtonVariant = {
    color: "black",
    bg: "brand.500",
    borderRadius: 0,
    border:"1px",
    borderColor:"black",
    _hover: {
        bg: "brand.600"
    }
}

export const theme = extendTheme({

    colors: {
        brand: {
            500: "#FFA1A1",
            550: "#FF7C7C",
            600: "#E04040"
        },
        green: {
            300: "#64EC72"
        },
        blue: {
            300: "#64B3EC"
        },
        yellow: {
            300: "#FEDF3D"
        }
    },

    components: {

        Button: {
            variants: {
                brand: (props) => customButtonVariant,
                brandGreen: (props) => ({
                    ...customButtonVariant,
                    bg: "green.300",
                    _hover: {
                        bg: "green.400"
                    }
                }),
                brandBlue: (props) => ({
                    ...customButtonVariant,
                    bg: "blue.300",
                    _hover: {
                        bg: "blue.400"
                    }
                })
            }
        }
    },

    fonts: {
        body: "Roboto",
        heading: "Roboto"
    },
    styles: {
        global: {
            body: {
                color: 'gray.900',
                bg: 'gray.50'
            }
        }
    }
})