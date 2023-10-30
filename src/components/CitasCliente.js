import { formatearDinero } from '@/helpers/formatearDinero'
import { formatearFecha } from '@/helpers/formatearFecha'
import React from 'react'

const CitasCliente = ({ cita }) => {
    const { id, fecha_cita, hora_cita, servicios, factura } = cita
    return (
        <div className='bg-slate-100 p-3 rounded-lg flex flex-col justify-between'>
            <div>
                <div className='flex gap-x-4 border-b-2 border-black flex-col' >
                    <p className="text-base sm:text-lg font-bold uppercase text-center ">Fecha: <span className='font-medium '>{formatearFecha(fecha_cita)}</span> </p>
                    <p className="text-base sm:text-lg font-bold uppercase mb-1 text-center" >Hora: <span className='font-normal'>{hora_cita}</span> </p>
                </div>
             

                <div>
                    {
                        servicios.map((servicio, index) => (
                            <div key={servicio.id}>
                                {index === 0 && <p className='font-bold uppercase mt-3'>Servicios: </p>}
                                <div className='flex flex-col lg:flex-row gap-2 mb-2 lg:justify-between  items-start lg:items-center border-b-2 border-gray-300 py-2' key={servicio.id} >

                                    <div className='flex gap-x-2 items-center'>
                                        <p className='font-bold uppercase'><span className='font-normal '>{servicio.nombre}</span> </p>
                                        <p className='font-bold uppercase'> X{servicio.pivot.cantidad}</p>
                                    </div>
                                    <p className='font-bold uppercase whitespace-nowrap'>Subtotal: <span className='font-normal capitalize '> {formatearDinero(servicio.pivot.subtotal)} </span> </p>

                                </div>
                                {
                                    index == servicios.length -1 && (
                                        <div className='flex justify-end font-bold my-2 uppercase '>Total: <span className='ml-1 font-normal'>{formatearDinero(factura.total)}</span> </div>
                                    )
                                }
                            </div>

                        ))
                    }

                </div>
            </div>
            <div className='flex flex-col mt-5 md:flex-row md:justify-between'>
                {/* <button onClick={() => { handleDeleteCita(cita.id) }} className='font-bold mb-2 bg-red-700 p-2 rounded text-white uppercase' >Eliminar</button>
                <button onClick={() => { handleChangeStatusCita(cita.id) }} className='uppercase mb-2 bg-indigo-700 p-2 rounded text-white font-bold' >Despachar</button> */}
            </div>
        </div>
    )
}

export default CitasCliente