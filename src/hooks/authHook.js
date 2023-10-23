"use client"

import useSWR from "swr";
import clienteAxios from "@/config/axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const useAuth = ({ middleware, url }) => {
    const navigate = useRouter();

    const token =  localStorage.getItem('token');

    const { data: user, error, mutate } = useSWR("/api/user", () => clienteAxios.get("/api/user", {
        headers: {
            Authorization: `Bearer ${token}`
        },
    }).then(res => res.data)
        .catch(err => {
            if (err.response.status !== 403) throw Error(err?.response?.data?.errors);

            navigate.push("/verify-email");
            /* MANEJO DE ERRORES */
        }), {

    });

    useEffect(() => {
        if (middleware === "auth" && user && user.admin === 0) {
            navigate.push("/citas");
        }
        if (middleware === "guest" && user && url && user.admin === 0) {
            navigate.push(url);
        }
        if (middleware === "guest" && user && url && user.admin === 1) {
            navigate.push("/dashboard/citas");
        }
        if (error && middleware === "auth") {
            navigate.push("/login");
        }
    }, [user, error]);

    const resendEmailVerification = async ({ setStatus }) => {
        try {
            const res = await clienteAxios.get("/api/email/resend", {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            setStatus("verification-link-sent");

            setTimeout(() => {
                setStatus(null);
            }, 20000);
        } catch (error) {
            console.log(error);
        }
    }

    const login = async (data, setErrors) => {

        try {
            const res = await clienteAxios.post("/api/login", data)
            localStorage.setItem("token", res.data.token)
            setErrors([])
            await mutate()

        } catch (error) {

            const errores = Object.values(error.response.data.data);
            setErrors(errores);
            setTimeout(() => {
                setErrors([])
            }, 10000);
        }
    }

    const register = async (data, setErrors) => {
        try {
            const res = await clienteAxios.post("/api/register", data)
            localStorage.setItem("token", res.data.token)
            setErrors([])
            await mutate()
        } catch (error) {
            const errores = Object.values(error.response.data.errors);
            setErrors(errores);
            setTimeout(() => {
                setErrors([])
            }, 10000);
        }

    }
    const logout = async () => {
        try {
            await clienteAxios.post("/api/logout", null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            localStorage.removeItem("token")

            await mutate(undefined)

        } catch (error) {
            console.log(error)
        }
    }



    return {
        login,
        register,
        logout,
        user,
        resendEmailVerification
    }
}