"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { useAuth } from "@/hooks/authHook"
import { Blocks } from "react-loader-spinner"

export function UserAuthForm({ className, ...props }) {

    const { login, loading } = useAuth({ middleware: 'guest', url: '/citas' })

    // const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])

    useEffect(() => {
        if (errors.length > 0) {
            errors.forEach((error, index) => {
                toast.error(error[index])
            })
        }
    }, [errors])


    async function onSubmit(event) {
        event.preventDefault()
        if (loading === true) {
            return
        }

        if ([email, password].includes("")) {
            setErrors([["Todos los campos son obligatorios"]])

            // setIsLoading(false)
            return
        }
        setErrors([])

        const data = {
            email,
            password
        }

        login(data, setErrors);
    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>

            <form onSubmit={onSubmit}>
                <div className="grid gap-2">
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="email">
                            Email
                        </Label>
                        <Input
                            id="email"
                            placeholder="name@example.com"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="password">
                            Password
                        </Label>
                        <Input
                           className="placeholder:text-[10px]"
                            id="password"
                            type="password"
                            placeholder="●●●●●●●●●●"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-center">
                        {
                            loading && (
                                <Blocks
                                    visible={true}
                                    height="35"
                                    width="35"
                                    ariaLabel="blocks-loading"
                                    wrapperStyle={{}}
                                    wrapperClass="blocks-wrapper"
                                />
                            )
                        }

                    </div>
                    <Button  >
                        {/* {isLoading && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )} */}
                        Iniciar Sesion
                    </Button>
                </div>
            </form>
            {/* <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>
            </div> */}

        </div>
    )
}