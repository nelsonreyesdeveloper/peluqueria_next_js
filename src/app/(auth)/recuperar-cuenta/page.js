import React from 'react'
import RecuperarCuentaJS from "@/components/forms/recuperar-cuenta"
import Link from 'next/link'

export const metadata = {
    title: "Recuperar Cuenta | Peluqueria",
    description: "Recuperar Cuenta.",
}

const RecuperarCuentaPage = () => {



    return (
        <div className='w-[95%] mx-auto'>
            <RecuperarCuentaJS></RecuperarCuentaJS>
            <div className="flex flex-col gap-y-3 lg:gap-0 lg:flex-row lg:justify-between text-gray-500  mt-5">
                <Link className="underline underline-offset-4 hover:text-primary" href={"/login"}>Iniciar Sesion</Link>
                <Link className="underline underline-offset-4 hover:text-primary" href={"/register"}>Registrarme</Link>
            </div>
        </div>
    )
}

export default RecuperarCuentaPage