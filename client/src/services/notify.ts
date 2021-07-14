import { toast } from "react-toastify"


export const notify = (message: string, type: "alert" | "error" | "success"| "info") => {

    toast[type](message, {
        toastId: message
    })
} 