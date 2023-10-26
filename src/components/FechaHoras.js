"use client"
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { usePeluqueriaContext } from '@/context/PeluqueriaProvider'
import Alerta from './Alerta';
import { getHoras } from '@/utils/getHoras';
const FechaHoras = () => {

    const { setFecha, setHora, fecha, formattedDate } = usePeluqueriaContext();
    const [errors, setErrors] = useState(false)
    const [horas, setHoras] = useState([]);

    let horasAm = [];

    for (let i = 7; i <= 11; i++) {

        for (let j = 1; j <= 3; j++) {
            const horasgenerate = {
                value: `${i}:${j == 1 ? '00' : (j == 2 ? '20' : (j == 3 ? '40' : ''))} AM`,
                label: `${i}:${j == 1 ? '00' : (j == 2 ? '20' : (j == 3 ? '40' : ''))} AM`
            }
            horasAm.push(horasgenerate)
        }

    }
    /* Iterar con For de 1:00 pm a 6:30 pm en cada iteracion agregar 20 minutos */
    let horasPm = [];
    for (let i = 1; i <= 6; i++) {

        for (let j = 1; j <= 3; j++) {
            const horasgenerate = {
                value: `${i}:${j == 1 ? '00' : (j == 2 ? '20' : (j == 3 ? '40' : ''))} PM`,
                label: `${i}:${j == 1 ? '00' : (j == 2 ? '20' : (j == 3 ? '40' : ''))} PM`
            }
            horasPm.push(horasgenerate)
        }
    }

    const horasFormato = horasAm.concat(horasPm)

    /* Iterar con for de 7:00 am a 11:30 am en cada iteracion agregar 20 minutos */
    const handleFecha = async (e) => {
        /* Consultando las horas disponibles */
        if (e.target.value >= formattedDate) {

            setFecha(e.target.value)
            setErrors(false)
        }
        else {
            setFecha('')
            setErrors(true)
        }
    }

    useEffect(() => {
        let horasAgotadas = [];
        const consultarFecha = async () => {
            /* Obtener fecha actual */
            const fechaactual = fecha
            const horasdb = await getHoras(fechaactual)

            if (horasdb.length > 0) {
                horasAgotadas = horasdb.map((hora) => {
                    return {
                        value: hora.hora_cita,
                        label: hora.hora_cita,
                    }
                })
            }

            /* Comparando las horas con las horas agotadas para comprobar si esta disponible o no */
            if (horasAgotadas.length > 0) {
                const horasdisponibles = horasFormato.map((horatotal) => {
                    horasAgotadas.map((horaagotada) => {
                        if (horatotal.value === horaagotada.value) {
                            horatotal.isDisabled = true
                        }
                    })
                    return horatotal
                })
                setHoras(horasdisponibles)
            } else {
                setHoras(horasFormato)
            }
        }

        consultarFecha()
    }, [fecha])

    const isOptionDisabled = (option) => option.isDisabled;

    const customStyles = {
        option: (styles, { isDisabled }) => ({

            ...styles,
            backgroundColor: isDisabled ? '#dc2626' : '#075985',
            color: isDisabled ? '#fff' : '#fff',
            cursor: isDisabled ? 'not-allowed' : 'pointer',
            opacity: isDisabled ? 0.3 : 1,
        }),

    };


    return (
        <div className='w-[95%] mx-auto my-5 '>
            <h2 className='text-xl font-bold uppercase mt-5 text-center'>Selecciona la fecha y hora de tu cita</h2>


            <div className='mb-4 sm:w-1/2'>
                {
                    errors && (
                        <Alerta><p className='text-red-500 w-full border-l-[25px] text-center border-red-800 my-5 bg-red-100 uppercase font-medium '>Fecha Muy Antigua o Campo vacio, Selecciona una fecha del dia actual o posterior</p></Alerta>

                    )
                }
                <label className='block uppercase mb-2 font-bold' htmlFor='fecha'>Fecha</label>
                <div className="relative ">

                    <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                        </svg>
                    </div>

                    <input id='fecha' onChange={(e) => (
                        /* validar que la pecha introducida no sea anterior a la fecha actual */
                        handleFecha(e)
                    )} type="date" min={formattedDate} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date" />
                </div>

            </div>
            {
                fecha && (
                    <div className='mb-4 sm:w-1/2'>
                        <label className='block uppercase mb-2 font-bold' htmlFor='hora'>Hora</label>
                        <div className="relative">

                            <Select placeholder="Seleccione una hora"
                                instanceId={'hora'}
                                onChange={(e) => setHora(e.value)}
                                isOptionDisabled={isOptionDisabled}
                                styles={customStyles}
                                options={horas}
                                id='hora_id'
                            />
                        </div>
                    </div>
                )
            }

        </div>
    )
}

export default FechaHoras