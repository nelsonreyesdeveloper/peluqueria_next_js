"use client"
import { usePeluqueriaContext } from "@/context/PeluqueriaProvider"
import { useState } from "react"
import { toast } from 'react-toastify'

const ModalServicioAdmin = () => {

    const { handleEditarServicio, servicioModal } = usePeluqueriaContext();

    const [nombre, setNombre] = useState(servicioModal?.nombre)
    const [precio, setPrecio] = useState(servicioModal?.precio)
    const [descripcion, setDescripcion] = useState(servicioModal?.descripcion)

    const handleValidateServicio = (e) => {
        e.preventDefault()

        if (!nombre || !precio || !descripcion || isNaN(precio)) {
            toast.error('Todos los campos son obligatorios y el precio debe ser un numero')
        }
        const servicioPut = {
            id: servicioModal?.id,
            nombre,
            precio,
            descripcion
        }

        handleEditarServicio(servicioPut)

    }

    return (
        <div className='md:w-[500px]'>
            <h2 className='text-center font-bold my-5 text-xl uppercase '>Edita el servicio</h2>

            <form className='w-[95%] mx-auto flex flex-col '>
                <div className='mb-5 w-full'>
                    <label className='block font-bold  '>Nombre: </label>
                    <input defaultValue={servicioModal?.nombre} onChange={(e) => setNombre(e.target.value)} className='w-full border border-gray-900 focus:outline-none rounded-md p-2' type="text" placeholder='Nombre del servicio' />
                </div>
                <div className='mb-5 w-full'>
                    <label className='block font-bold '>Descripcion: </label>
                    <textarea defaultValue={servicioModal?.descripcion} onChange={(e) => setDescripcion(e.target.value)} className='w-full border border-gray-900 focus:outline-none rounded-md p-2' placeholder='Descripcion del servicio' />
                </div>

                <div className='mb-5 w-full'>
                    <label className='block font-bold '>Precio: </label>
                    <input defaultValue={servicioModal?.precio} min={1} onChange={(e) => { setPrecio(Number(e.target.value)) }} className='w-full border border-gray-900 focus:outline-none rounded-md p-2' type='number' placeholder='Precio' />
                </div>
                <div className='mb-5 w-full flex justify-end'>

                    <input type='submit' onClick={(e) => handleValidateServicio(e)} className='w-full bg-indigo-700 p-2 rounded-md font-bold uppercase text-white md:w-auto hover:cursor-pointer hover:bg-indigo-800' value={'Guardar Cambios'} />
                </div>
            </form>



        </div>
    )
}

export default ModalServicioAdmin