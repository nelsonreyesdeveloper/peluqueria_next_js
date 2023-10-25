"use client"
import { usePeluqueriaContext } from "@/context/PeluqueriaProvider"
import { formatearDinero } from "@/helpers/formatearDinero"
import { formatearFecha } from "@/helpers/formatearFecha"
import { useState } from "react"


export const ResumenCita = () => {
    const { detallesCita, handleCantidad, handleConfirmarCita, fecha, handleDeleteCitaResumenCita } = usePeluqueriaContext()
    const detalles = (Object.values(detallesCita));
    const servicios = detalles[0]
    const [disabledButton, setDisabledButton] = useState(false)
    return (
        <div>
            <div className='w-[95%] mx-auto my-5 '>
                <h2 className='text-xl font-bold uppercase my-5 text-center'>RESUMEN DE LA CITA</h2>

                <div className="flex gap-x-5 flex-col md:flex-row">

                    <div className={detalles.includes('') || detalles[0].length === 0 ? "w-full" : "md:basis-2/3"}>
                        {
                            detalles.includes('') || detalles[0].length === 0 ? (<p className="bg-red-100 text-center border-l-4 border-red-500 text-red-700 p-4">
                                Debes seleccionar servicios, fecha y hora
                            </p>) : (
                                servicios.map((servicio, index) => (
                                    <div key={servicio.id}>
                                        <div>
                                            {index === 0 && <div className="flex flex-col  xl:flex-row   justify-between border-b-2 mb-5 border-gray-800 pb-1">
                                                <p className="uppercase text-lg   font-black">Fecha Cita: <span className="font-medium text-sm">{formatearFecha(fecha)}</span>  </p>
                                                <p className="uppercase text-lg   font-black">HORA:  <span className="font-medium text-sm">{detalles[2]}</span> </p>
                                            </div>}
                                            {index === 0 && <p className="uppercase text-lg  mb-1 font-black">Servicios: </p>}
                                            <div className="mb-5 border-b-2 pb-4 border-gray-200 ">
                                                <div className="flex items-center justify-between   ">
                                                    <p className="uppercase  font-bold underline underline-offset-4 " key={servicio.id}>{servicio.nombre}</p>
                                                    <div className="flex items-center justify-center">
                                                        <label className="uppercase font-bold ml-2">Cantidad: </label>
                                                        <select onChange={(e) => { handleCantidad(Number(e.target.value), servicio.id) }} className=" ml-2 font-mono bg-gray-200 rounded-md p-2 ">
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                            <option value="3">3</option>
                                                        </select>
                                                    </div>

                                                </div>
                                                <div className="flex items-center justify-between mt-3">
                                                    <p className="mt-2">Precio: {formatearDinero(servicio.precio)}</p>
                                                    <p className="mt-2">Subtotal: {formatearDinero(servicio.precio * servicio.cantidad)}</p>
                                                </div>
                                                <div>
                                                    <button onClick={() => handleDeleteCitaResumenCita(servicio.id)} className="bg-red-600 w-full my-3 text-white px-3 py-2 rounded-md uppercase font-bold hover:bg-red-800">Eliminar Servicio</button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                ))
                            )
                        }
                    </div>
                    <div className={detalles.includes('') || detalles[0].length === 0 ? "hidden" : "md:basis-1/3"}>
                        {
                            detalles.includes('') || detalles[0].length !== 0 && (
                                <div className="flex flex-col  ">
                                    <p className="uppercase text-lg   font-black text-center">Total a pagar: {formatearDinero(servicios.reduce((a, c) => a + c.precio * c.cantidad, 0))}</p>

                                    <div className="mt-5 flex flex-col w-full">
                                        <button disabled={disabledButton} onClick={() => { setDisabledButton(true); setTimeout(() => { setDisabledButton(false) }, 5000); handleConfirmarCita(); }} className={`w-full bg-orange-500 ${disabledButton ? 'cursor-not-allowed opacity-10' : ''} hover:bg-orange-700 uppercase text-white font-bold py-2 px-4 rounded`}>
                                            Confirmar Cita
                                        </button>

                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResumenCita