"use client"
import clienteAxios from "@/config/axios"
import useSWR from 'swr' // ✅ Available in server components
const getCitasAxios = async (fecha) => {
    const res = await clienteAxios.get(`/api/citas?fecha=${fecha[1]}`,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
    });
    const data = await res.data;
    return data.data
}

const getCitas = (fecha) => {
    const { data, error, isLoading, mutate, key } = useSWR(['/api/citas', fecha],(fecha) => getCitasAxios(fecha), {
        refreshInterval: 1000
    });
    return { data, error, isLoading, key };
}

export {
    getCitas,
}

