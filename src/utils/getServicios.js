"use client"
import clienteAxios from "@/config/axios"
import Cookies from 'js-cookie'
export const getServicios = async () => {
    try {
        const res = await clienteAxios.get(`/api/servicios`)
        return (res.data.data)
    } catch (error) {
        console.log(error)
    }

}