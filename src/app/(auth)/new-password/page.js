import React from 'react'
import Link from 'next/link'
import NewPassword from '@/components/forms/new-password'

export const metadata = {
    title: "Establecer Nueva Contraseña | Peluqueria",
    description: "Establecer Nueva Contraseña.",
}

const NewPasswordLayout = () => {

    return (
        <div className='w-[95%] mx-auto'>
            <NewPassword/>
            <div className="flex flex-col gap-y-3 lg:gap-0 lg:flex-row lg:justify-between text-gray-500  mt-5">
                <Link className="underline underline-offset-4 hover:text-primary" href={"/login"}>Iniciar Sesion</Link>
            </div>
        </div>
    )
}
export default NewPasswordLayout