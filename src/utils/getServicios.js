import clienteAxios from "@/config/axios"

export const getServicios = async () => {
    try {
        const res = await clienteAxios.get(`/api/servicios`)
        return (res.data.data)
    } catch (error) {
        console.log(error)
    }

}