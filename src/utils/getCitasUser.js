import clienteAxios from "@/config/axios"
import Cookies from "js-cookie"

export const getCitasUser = async () => {
    if (!Cookies.get("token")) return []

    try {
        const res = await clienteAxios.get("/api/citas/user", {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")} `
            }
        })

        return res.data

    } catch (error) {
        console.log(error)
    }


}