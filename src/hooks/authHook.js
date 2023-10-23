"use client"

import useSWR from "swr";
import clienteAxios from "@/config/axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const useAuth = ({ middleware, url }) => {
    const navigate = useRouter();

    const token = typeof window !== 'undefined' ? localStorage.getItem('token') ?? "" : ""

    const { data: user, error, mutate } = useSWR("/api/user", () =>
        clienteAxios.get("/api/user", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.data)
            .catch(err => {
                if (err.response.status !== 403) throw new Error(err?.response?.data?.errors);
                navigate.push("/verify-email");
            }
            )
    )
    useEffect(() => {

        if (middleware === "auth" && user && user.admin === 0) {
            navigate.push("/citas");
        }
        if (middleware === "guest" && user && url && user.admin === 0) {
            navigate.push(url);
        }
        if (middleware && user && user.admin === 1) {
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

        clienteAxios
            .post('/api/login', data)
            .then((res) => localStorage.setItem("token", res.data.token), mutate())
            .catch(error => {
                const errores = Object.values(error.response.data.data);
                setErrors(errores);
            })
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

            mutate('/api/user', null)

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