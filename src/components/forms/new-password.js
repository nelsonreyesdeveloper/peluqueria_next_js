"use client"
import React from 'react'
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { useAuth } from "@/hooks/authHook"
import { useRouter, useSearchParams } from 'next/navigation'
const NewPassword = ({ className, ...props }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)
    const searchParams = useSearchParams()
    const token = searchParams.get('token')
    const router = useRouter()

    const { NewPasswordPost } = useAuth({ middleware: 'guest', url: '/mis-citas' })
    useEffect(() => {
        if (errors.length > 0) {
            errors.forEach((error, index) => {
                toast.error(error[index])
            })
        }
    }, [errors])

    useEffect(() => {
        if (status !== null) {
            toast.success("Contraseña Actualizada")
            setTimeout(() => {
                router.push('/login')
            }, 3000);
        }
    }, [status])


    async function onSubmit(event) {

        event.preventDefault()


        if ([email, password, passwordConfirmation].includes("")) {
            setErrors([["Todos los campos son obligatorios"]])
            return
        }
        setErrors([])

        if (token === null || token === undefined || token === "") {
            setErrors([["Token no valido"]])
            return
        }

        const data = {
            token: token,
            email,
            password,
            password_confirmation: passwordConfirmation,
        }



        NewPasswordPost({ data, setErrors, setStatus });
    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>

            <form onSubmit={onSubmit}>
                <legend className='my-4 text-center font-bold text-xl uppercase'>Establecer Nueva Contraseña</legend>

                <div className="grid gap-2">

                    <div className="grid gap-1 mb-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            placeholder="name@example.com"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </div>

                    <div className="grid gap-1 mb-2">
                        <Label htmlFor="password">Password</Label>

                        <Input
                            className="placeholder:text-[10px]"
                            id="password"
                            type="password"
                            placeholder="●●●●●●●●●●"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="grid gap-1 mb-2">
                        <Label htmlFor="password_confirmation">Repetir Password</Label>

                        <Input
                            className="placeholder:text-[10px]"
                            id="password_confirmation"
                            type="password"
                            placeholder="●●●●●●●●●●"
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                        />
                    </div>

                    <div className='my-2'>
                        <p className='text-green-600 font-medium italic'>{
                            status && (
                                status
                            )
                        }</p>
                    </div>


                    <Button>
                        {/* {isLoading && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )} */}
                        Establecer Nueva Contraseña
                    </Button>
                </div>
            </form>

        </div>
    )
}

export default NewPassword