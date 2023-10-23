"use client"

import useSWR from "swr";
import clienteAxios from "@/config/axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';

export const useAuth = ({ middleware, url }) => {
    const navigate = useRouter();
    // const [token, setToken] = useState(() => typeof window !== 'undefined' ? localStorage.getItem('token') ?? "" : "");
    const [token, setToken] = useState(Cookies.get('token'));

    const { data: user, error, mutate } = useSWR("/api/user", () => {
        console.log("Token antes de iniciar la solicitud:", token);

        return clienteAxios.get("/api/user", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.data)
            .catch(err => {
                console.log("Token después de iniciar sesión:", token);
                if (err.response.status !== 403) throw new Error(err?.response?.data?.errors);
                navigate.push("/verify-email");
            });
    },

        {
            revalidateOnFocus: false
        });

    const login = async (data, setErrors) => {

        try {
            const res = await clienteAxios.post("/api/login", data)
            setToken(res.data.token)
            Cookies.set('token', res.data.token, { expires: 1 });
            setErrors([])

            setTimeout(async () => {
                await mutate('/api/user');
            }, 200);
        } catch (error) {
            console.log(error.response.data.errors);

            const errores = error.response.data.errors;
            setErrors(errores);
        }
    }


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



    const register = async (data, setErrors) => {
        try {
            const res = await clienteAxios.post("/api/register", data)

            setToken(res.data.token)
            Cookies.set('token', res.data.token, { expires: 1 });
            setErrors([])
            setTimeout(async () => {
                await mutate('/api/user');
            }, 200);
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

            setToken('')
            Cookies.remove('token')
            mutate('/api/user', null)

        } catch (error) {
            console.log(error)
        }
    }

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
    }, [error, user]);


    return {
        login,
        register,
        logout,
        user,
        resendEmailVerification
    }
}