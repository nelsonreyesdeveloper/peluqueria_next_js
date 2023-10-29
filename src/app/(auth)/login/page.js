import Link from "next/link"

import { UserAuthForm } from "@/components/forms/user-auth.form"

export const metadata = {
    title: "Login | Peluqueria",
    description: "Inicia sesion en tu cuenta.",
}

export default function AuthenticationPage() {
    return (
        <>

            <div className="lg:p-8">
                <div className="mx-auto w-[95%] mt-10  flex  flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Login
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Introduce tu Email y Password
                        </p>
                    </div>
                    <UserAuthForm />
                    <div className="flex flex-col gap-y-3 lg:gap-0 lg:flex-row lg:justify-between text-gray-500 ">

                        <Link
                            href="/register"
                            className="underline underline-offset-4 hover:text-primary"
                        >
                            Registrarme
                        </Link>{" "}

                        <Link className="underline  underline-offset-4 hover:text-primary" href={"/recuperar-cuenta"}>Olvide mi contraseña</Link>
                    </div>

                </div>
            </div>
        </>
    )
}