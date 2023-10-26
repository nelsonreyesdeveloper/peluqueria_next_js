"use client"
import { useAuth } from '@/hooks/authHook'
import { getCitasUser } from '@/utils/getCitasUser'
import React, { useEffect, useState } from 'react'
import Alerta from '@/components/Alerta'
import CitasCliente from '@/components/CitasCliente'

const MisCitas = () => {
  useAuth({ middleware: "auth", url: "/mis-citas" })

  const [citas, setCitas] = useState([]);

  useEffect(() => {
    const totalCitas = async () => {
      const totalcitasArray = await getCitasUser()
      setCitas(totalcitasArray)
    }
    totalCitas()
  }, [])

  return (
    <div className='w-[95%] mx-auto pt-4'>
      {
        citas.length !== 0 && (
          <p className='uppercase text-center font-bold text-xl'>Tus Citas pendientes</p>
        )
      }
      <div className={`${citas.length !== 0 ? 'grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5' : ''}`}>

        {
          citas.length !== 0 ? (
            citas.map(cita => {
              return (
                <CitasCliente key={cita.id} cita={cita} className='text-black'></CitasCliente>
              )
            })

          ) : (
            <Alerta><p className='bg-red-100 p-2 text-red-800 border-l-8 border-6 border-red-800'>No hay citas, crea una...</p></Alerta>
          )
        }
      </div>


    </div>
  )
}

export default MisCitas