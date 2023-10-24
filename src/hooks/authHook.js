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
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');

    const { data: user, error, mutate } = useSWR("/api/user", () => clienteAxios.get("/api/user", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(res => res.data)
        .catch(err => {
            if (err.response.status !== 403) throw new Error(err?.response?.data?.errors);
            navigate.push("/verify-email");
            setEmail(err.response.data[0].email)
            mutate('/api/user', null);
        }),
        {
            revalidateOnFocus: false
        });

    const login = async (data, setErrors) => {
        setLoading(true);
        try {
            const res = await clienteAxios.post("/api/login", data)
            setToken(res.data.token)
            Cookies.set('token', res.data.token, { expires: 1 });
            setErrors([])

            setTimeout(async () => {
                await mutate('/api/user');
            }, 200);
        } catch (error) {
            setLoading(false);
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
        setLoading(true);
        try {
            const res = await clienteAxios.post("/api/register", data)
            setToken(res.data.token)
            Cookies.set('token', res.data.token, { expires: 1 });
            setErrors([])
            setTimeout(async () => {
                await mutate('/api/user');
            }, 200);
        } catch (error) {
            console.log(error);
            setLoading(false);
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
            window.location.reload()

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (middleware === "auth" && user && user.admin === 0) {
            navigate.push("/citas");
            setLoading(false);
        }
        if (middleware === "guest" && user && url && user.admin === 0) {
            navigate.push(url);
            setLoading(false);
        }
        if (middleware && user && user.admin === 1) {
            navigate.push("/dashboard/citas");
            setLoading(false);
        }
        if (error && middleware === "auth") {
            navigate.push("/login");
            setLoading(false);
        }
    }, [error, user]);


    return {
        login,
        register,
        logout,
        user,
        resendEmailVerification,
        token,
        loading,
        email

    }
}