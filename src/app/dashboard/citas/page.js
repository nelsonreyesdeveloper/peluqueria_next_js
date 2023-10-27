"use client"
import Alerta from "@/components/Alerta"
import CitaAdmin from "@/components/CitaAdmin"
import { usePeluqueriaContext } from "@/context/PeluqueriaProvider"
import { getCitas } from "@/utils/getCitas"
import { useState } from "react"



const Citas = () => {
  const [fecha, setFecha] = useState('')
  const {formattedDate} = usePeluqueriaContext();
  const { data: citas, error, isLoading, key } = getCitas(fecha)

  return (
    <div>
      <h2 className="text-2xl font-bold uppercase mb-5 text-center">Administra las citas </h2>
      <div className=" mb-5 flex flex-col ">
        <label className="text-sm mb-2 sm:text-base font-bold uppercase">Seleccione la fecha a filtrar</label>
        <input defaultValue={formattedDate} onChange={(e) => setFecha(e.target.value)} className="sm:w-max border border-black focus:outline-none rounded-md p-2 " type="date" placeholder="Seleccione la fecha a filtrar"></input>
      </div>

      {
        isLoading ? <Alerta><p className="bg-blue-50 text-center p-4">Cargando...</p></Alerta>
          : (
            <div className={`${citas.length !== 0 ? 'grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : ''} `}>
              {
                citas.length !== 0 ?
                  citas.map(cita => (
                    <CitaAdmin key={cita.id} cita={cita} />
                  ))
                  : (
                    <Alerta><p className="bg-red-100 text-center border-l-4 border-red-500 text-red-700 p-4">No hay citas</p></Alerta>
                  )
              }
            </div>
          )
      }


    </div>
  )
}

export default Citas