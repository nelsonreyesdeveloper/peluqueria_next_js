import clienteAxios from "@/config/axios"
import Cookies from 'js-cookie'

export const getHoras = async (fecha) => {
    if (!Cookies.get("token")) return []

    const res = await clienteAxios.post(`/api/horas`,
        {
            fecha_cita: fecha
        },
        {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        })

    return (res.data.data)
}