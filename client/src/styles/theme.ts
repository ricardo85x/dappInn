import { extendTheme } from "@chakra-ui/react"

const customButtonVariant = {
    color: "gray.100",
    bg: "brand.400",
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
            50: "#bdd6ff",
            100: "#75aaff",
            200: "#4a8cf7",
            300: "#4685eb",
            400: "#4079d6",
            500: "#396bbd",
            550: "#3462ad",
            600: "#2e5799",
            700: "#224070",
            800: "#162a4a",
            900: "#0e1a2e"
        },
        brand_secondary: {

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
                    bg: "green.600",
                    _hover: {
                        bg: "green.500"
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
                color: 'gray.100',
                bg: 'gray.50'
            }
        }
    }
})