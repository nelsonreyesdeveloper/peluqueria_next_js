"use client"
import React from 'react'
import Servicio from '@/components/Servicio'
import Alerta from '@/components/Alerta'
import { useEffect, useState } from 'react'
import { usePeluqueriaContext } from '@/context/PeluqueriaProvider'

const ServiciosAdmin = () => {
  const { todosServicios } = usePeluqueriaContext()
  if (todosServicios.length === 0) {
    return (
      <>
        <p>Cargando....</p>
      </>
    )
  }
  return (
    <div className={` ${todosServicios.length !== 0 ? 'grid w-[95%]  mx-auto sm:grid-cols-2 lg:grid-cols-3 gap-5 my-5' : ''}`}>
      {
        todosServicios.length !== 0 ? todosServicios.map(servicio => {
          return (
            <Servicio key={servicio.id} admin={true} servicio={servicio}>

            </Servicio>
          )
        })
          : (
            <Alerta><p className="bg-red-100 text-center border-l-4 border-red-500 text-red-700 p-4">No hay Servicios</p></Alerta>
          )
      }
    </div>
  )
}

export default ServiciosAdmin