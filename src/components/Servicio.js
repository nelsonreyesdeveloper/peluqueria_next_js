"use client"
import { formatearDinero } from '@/helpers/formatearDinero'
import { useEffect, useState } from 'react'
import { usePeluqueriaContext } from '@/context/PeluqueriaProvider'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Swal from 'sweetalert2'
import Modal from 'react-modal';
import withReactContent from 'sweetalert2-react-content'
import modalStyles from '@/partials/modalStyles'
import ModalServicioAdmin from './ModalServicioAdmin'


Modal.setAppElement('body');

const Servicio = ({ servicio, admin = false }) => {

    const MySwal = withReactContent(Swal)
    /*extrayendo setServicio  */

    const { handleAgregarServicio, handleDeleteServicioAdmin,
        handleModal, modalIsOpen, setServicioModal, handleEditarServicio, resetBlue,setResetBlue } = usePeluqueriaContext()

    const { id, nombre, precio, descripcion, text_imagen, estado } = servicio

    const [selected, setSelected] = useState(false);

    useEffect(() => {
        if (resetBlue === true) {
            setSelected(false);
        }
    }, [resetBlue])

    // const handleEliminar = () => {

    //     MySwal.fire({
    //         title: 'Estas seguro?',
    //         text: "Esta accion no se puede deshacer!",
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Borrar ya!',
    //         cancelButtonText: 'Cancelar'
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             handleDeleteServicioAdmin(id)
    //             Swal.fire(
    //                 'Borrado!',
    //                 'El servicio ha sido eliminado.',
    //                 'success'
    //             )
    //         }
    //     })

    // }

    return (
        <>
            {
                (admin || estado === 1) && (
                    <div aria-label='servicios' onClick={() => {
                        if (admin) return
                        setResetBlue(false), setSelected(!selected), handleAgregarServicio(servicio)
                    }} className={` z-50 w-full  ${selected ? 'bg-sky-900' : 'hover:bg-sky-100'}   hover:scale-105 transition-all group   border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700`}>

                        <div className='flex h-full justify-between flex-col'>
                            <div>
                                <div className='bg-blend-darken' >
                                    <Image style={{ width: '100%', height: 'auto' }} width={1000} height={500} className="p-8 rounded-t-lg " src={`/img/servicios/${text_imagen}.jpg`} alt={nombre} />
                                </div>
                                <div className="px-5 pb-5">
                                    <h5 className={`text-2xl uppercase font-semibold ${selected ? 'text-white' : ''}  tracking-tight text-gray-900 dark:text-white `}>{nombre}</h5>
                                    <p className={`line-clamp-2 ${selected ? 'text-white' : ''}`}>{descripcion}</p>
                                    <div className="flex items-center mt-2.5 mb-5">
                                        <svg className="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                        </svg>
                                        <svg className="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                        </svg>
                                        <svg className="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                        </svg>
                                        <svg className="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                        </svg>
                                        <svg className="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                        </svg>
                                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">5.0</span>
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <span className={`text-3xl font-bold ${selected ? 'text-white' : ''} text-center text-gray-900 dark:text-white`}>{formatearDinero(precio)}</span>
                                    </div>

                                </div>
                            </div>
                            {
                                admin && (
                                    <div className='grid md:grid-cols-2 w-[90%] mx-auto gap-x-2  md:justify-between'>
                                        <button onClick={() => { setServicioModal(servicio); handleModal(servicio) }} className=' bg-indigo-700 hover:bg-indigo-800 text-white mb-2 p-2 rounded-md font-semibold' >EDITAR</button>
                                        {/* <button onClick={() => handleEliminar()} className='bg-red-700 hover:bg-red-800  text-white mb-2 p-2 rounded-md font-semibold' >ELIMINAR</button> */}
                                        <button onClick={() => { handleEditarServicio(servicio, estado === 0 ? 1 : 0) }} className={`${estado ? 'bg-red-700 hover:bg-red-800 ' : ' bg-green-500 hover:bg-green-600'}uppercase  text-white mb-2 p-2 rounded-md font-semibold`}>{estado ? 'DESACTIVAR' : 'ACTIVAR'}</button>
                                    </div>
                                )

                            }
                        </div>
                    </div>
                )
            }
            {
                admin && (
                    <Modal
                        isOpen={modalIsOpen}
                        style={modalStyles}
                        onRequestClose={handleModal}
                    >
                        <ModalServicioAdmin ></ModalServicioAdmin>
                    </Modal>
                )
            }

        </>
    )
}

export default Servicio