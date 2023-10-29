import Link from "next/link"

import { RegisterAuthForm } from "@/components/forms/register-auth.form"

export const metadata = {
    title: "Registro | Peluqueria",
    description: "Registrate.",
}

export default function RegisterPage() {
    return (
        <>

            <div className="lg:p-8">
                <div className="mx-auto w-[95%] mt-10  flex  flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Registro
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Registrate con tus datos personales
                        </p>
                    </div>
                    <RegisterAuthForm />
                    <p className="px-8 text-center text-sm text-muted-foreground">
                       Si ya tienes una cuenta iniciar sesion aqui {"-> "}
                        <Link
                            href="/login"
                            className="underline underline-offset-4 hover:text-primary"
                        >
                           Iniciar sesion
                        </Link>
                        
                    </p>
                </div>
            </div>
        </>
    )
}