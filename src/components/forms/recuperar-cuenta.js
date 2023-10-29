"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useAuth } from '@/hooks/authHook'

const RecuperarCuentaJS = () => {
    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    const { forgotPassword } = useAuth({ middleware: 'guest', url: '/mis-citas' })

    const submitForm = event => {
        event.preventDefault()
        forgotPassword({ email, setErrors, setStatus })
    }

    useEffect(() => {
        if (errors.length > 0) {
            errors.forEach((error, index) => {

                if (error[index] === 'passwords.throttled') {
                    toast.error('Demasiados intentos espera para volver a intentarlo')
                    return
                }
                if (error[index] === 'passwords.user') {
                    toast.error('El usuario no existe')
                    return
                }
                toast.error(error[index])
            })
        }
    }, [errors])

    return (
        <div className='mt-10 lg:mt-0'>
            <div className="mb-4 text-sm text-gray-600">
                ¿Ha olvidado su contraseña? No se preocupe. Díganos su
                email y le enviaremos un enlace para restablecer la contraseña
                que le permitirá elegir una nueva.
            </div>


            <form onSubmit={submitForm}>
                {/* Email Address */}
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Escribe tu correo electronico"
                        className="mt-1 block w-full focus:outline-none"
                        onChange={event => setEmail(event.target.value)}
                        required
                    />

                </div>

                <div className='my-2'>
                    <p className='text-green-600 font-medium italic'>{
                        status && (
                            status
                        )
                    }</p>
                </div>

                <div className="flex items-center justify-end mt-4">
                    <button className='bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded' type="submit">Enlace de restablecimiento de contraseña por correo electrónico</button>
                </div>

            </form>
        </div>
    )
}

export default RecuperarCuentaJS