"use client"
import Link from 'next/link'
import { useAuth } from '@/hooks/authHook'
import { useState } from 'react'
import { usePeluqueriaContext } from '@/context/PeluqueriaProvider'

const VerifyEmail = () => {

    const { logout, resendEmailVerification,email } = useAuth({
        middleware: 'auth',
        url: '/citas',
    })
    const [status, setStatus] = useState(null)

    return (
        <div >
            <div className='w-[95%] mx-auto mt-10 lg:mt-0'
            >
                <div className="mb-4 text-base text-black">
                    Gracias por registrarte. Antes de empezar, ¿podrías
                    verificar su dirección de correo electrónico <span className=' text-sky-800 font-bold'>{email}</span>  haciendo clic en el enlace que acabamos de
                    de enviar. Si no lo ha recibido, le enviaremos otro.
                </div>

                {status === 'verification-link-sent' && (
                    <div className="mb-4 font-medium text-sm text-green-600">
                        Se ha enviado un nuevo enlace de verificación a la dirección de correo electrónico
                        que proporcionó durante el registro.
                    </div>
                )}

                <div className="mt-4 flex items-center justify-between">
                    <button
                        className='bg-sky-700 font-medium rounded-lg  px-4 py-2  hover:bg-sky-800 text-white'
                        onClick={() => resendEmailVerification({ setStatus })}>
                        Reenviar correo de verificación
                    </button>

                    <button
                        type="button"
                        className="underline text-sm text-gray-600 hover:text-gray-900"
                        onClick={() =>{logout()}}>
                        Cerrar Sesion
                    </button>
                </div>
            </div>
        </div>
    )
}

export default VerifyEmail