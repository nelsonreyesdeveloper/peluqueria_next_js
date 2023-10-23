"use client"
import React from 'react'
import Servicio from '@/components/Servicio'
import { usePeluqueriaContext } from '@/context/PeluqueriaProvider'
import FechaHoras from './FechaHoras'
import ResumenCita from './ResumenCita'

const Servicios = ({ servicios }) => {

  const { mostrarTabs } = usePeluqueriaContext()
  return (
    <div>
      <div className={`${mostrarTabs === 1 ? 'block' : 'hidden'} `}>
        <h2 className='text-xl  font-bold uppercase mt-5 text-center'>Selecciona los servicios que deseas</h2>

        <div className='grid w-[95%]  mx-auto sm:grid-cols-2 lg:grid-cols-3 gap-5 my-5'>
          {
            servicios.map(servicio => {
              return (
                <Servicio key={servicio.id} servicio={servicio}></Servicio>
              )
            })
          }
        </div>

      </div>

      <div className={`${mostrarTabs === 2 ? 'block' : 'hidden'}`}>
        <FechaHoras></FechaHoras>
      </div>
      <div className={`${mostrarTabs === 3 ? 'block' : 'hidden'}`}>
        <ResumenCita></ResumenCita>
      </div>
    </div>
  )
}

export default Servicios