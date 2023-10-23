import clienteAxios from "@/config/axios"

export const getHoras = async (fecha) => {
    const res = await clienteAxios.post(`/api/horas`,
        {
            fecha_cita: fecha
        },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })

    return (res.data.data)
}