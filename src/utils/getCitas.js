"use client"
import clienteAxios from "@/config/axios"
import useSWR from 'swr' // ✅ Available in server components
import Cookies from "js-cookie"
const getCitasAxios = async (fecha) => {
    const res = await clienteAxios.get(`/api/citas?fecha=${fecha[1]}`,{
        headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
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

