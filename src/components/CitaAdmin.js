"use client"
import { formatearDinero } from '@/helpers/formatearDinero'
import React from 'react'
import { usePeluqueriaContext } from '@/context/PeluqueriaProvider'
const CitaAdmin = ({ cita }) => {

  const { handleDeleteCita, handleChangeStatusCita } = usePeluqueriaContext();
  return (
    <>
      <div className='bg-slate-100 p-3 rounded-lg flex flex-col justify-between'>
        <div>
          <div className='flex gap-x-4 border-b-2 border-black justify-between' >
            <p className="text-base sm:text-xl font-bold uppercase mb-1 text-center" >Hora: <span className='font-normal'>{cita.hora_cita}</span> </p>
            <p className="text-base sm:text-xl font-bold uppercase text-center">Total: <span className='font-medium '>{formatearDinero(cita.total)}</span> </p>
          </div>
          <div>
            <p className='font-bold uppercase my-3'>Cliente: <span className='font-normal capitalize'>{cita.user.name}</span> </p>
          </div>

          <div>
            {
              cita.servicios.map((servicio, index) => (
                <div key={servicio.id}>
                  {index === 0 && <p className='font-bold uppercase mt-3'>Servicios: </p>}
                  <div className='flex gap-5 justify-between items-center border-b-2 border-gray-300 py-2' key={servicio.id} >

                    <div className='flex gap-x-2 items-center'>
                      <p className='font-bold uppercase'><span className='font-normal '>{servicio.nombre}</span> </p>
                      <p className='font-bold uppercase'> X{servicio.pivot.cantidad}</p>
                    </div>
                    <p className='font-bold uppercase'><span className='font-normal capitalize'>{formatearDinero(servicio.precio)} </span> </p>

                  </div>

                </div>

              ))
            }

          </div>
        </div>
        <div className='flex flex-col mt-5 md:flex-row md:justify-between'>
          <button onClick={() => { handleDeleteCita(cita.id) }} className='font-bold mb-2 bg-red-700 p-2 rounded text-white uppercase' >Eliminar</button>
          <button onClick={() => { handleChangeStatusCita(cita.id) }} className='uppercase mb-2 bg-indigo-700 p-2 rounded text-white font-bold' >Despachar</button>
        </div>
      </div>
    </>
  )
}

export default CitaAdmin