"use client"
import clienteAxios from "@/config/axios";
import { useRouter } from "next/navigation";
import { createContext, useState, useContext, useEffect } from "react"
import { toast } from "react-toastify"

const peluqueriaContext = createContext()

export const usePeluqueriaContext = () => useContext(peluqueriaContext);

export const PeluqueriaProvider = ({ children }) => {
    const [servicios, setServicios] = useState([])
    const [mostrarTabs, setMostrarTabs] = useState(1)
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [servicioModal, setServicioModal] = useState({})
    const [resetBlue, setResetBlue] = useState(false);

    /* Modal */
    const handleModal = () => {
        setModalIsOpen(!modalIsOpen)
    }
    useEffect(() => {
        if (!modalIsOpen) {
            setServicioModal({})
        }
    }, [modalIsOpen])

    const router = useRouter();

    /* Obtener fecha actual de ahora */

    const date = new Date(); // Obtiene la fecha y hora actual en la zona horaria local
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDatePleca = date.toLocaleDateString('es-SV', options);
    const obtenervalores = formattedDatePleca.split('/')
    const formattedDate = `${obtenervalores[2]}-${obtenervalores[1]}-${obtenervalores[0]}`

    const [fecha, setFecha] = useState(formattedDate)
    const [hora, setHora] = useState('')


    /* Cliente citas */
    const handleCantidad = (nuevaCantidad, id) => {
        const nuevaCantidadServicios = servicios.map(servicio => {
            if (servicio.id === id) {
                servicio.cantidad = nuevaCantidad
            }

            return servicio
        })

        setServicios(nuevaCantidadServicios)
    }

    const detallesCita = {
        servicios,
        fecha,
        hora,
    }

    const handleAgregarServicio = (servicio) => {
        /* Si el servicio no existe en el state, lo agrego */
        /* Agregar la cantidad al servicio */
        if (!servicios.some(s => s.id === servicio.id)) {
            servicio.cantidad = 1;
            setServicios([...servicios, servicio])
        } else {
            /* Si existe lo elimino  */
            setServicios(servicios.filter(s => s.id !== servicio.id))
        }
    }

    const handleConfirmarCita = async () => {

        const citaPost = {
            fecha_cita: detallesCita.fecha,
            hora_cita: detallesCita.hora,
            total: detallesCita.servicios.reduce((a, c) => a + c.precio * c.cantidad, 0),
        }

        const servicios_with_subtotal = servicios.map(servicio => ({ ...servicio, subtotal: servicio.precio * servicio.cantidad }));
        try {
            const res = await clienteAxios.post('/api/citas', {
                citaPost,
                servicios: servicios_with_subtotal
            },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    },
                }
            );

            toast.success("Cita Realizada con exito");
            setServicios([])
            setFecha('')
            setHora('')
            setMostrarTabs(1)

            router.push("/citas");

            setResetBlue(true)
            document.querySelector('#fecha').value = '';
            const data = await res.data;

        } catch (error) {

            if (error.response.status !== 400) throw new Error(error);

            toast.error(error.response.data.data)

        }

    }

    /* Admin citas */
    const handleDeleteCita = async (id) => {

        try {
            const res = await clienteAxios.delete(`/api/citas/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
            });
            const data = await res.data;
            toast.success(data.data);

        } catch (error) {
            toast.error(error?.response?.data?.data)
        }
    }
    const handleChangeStatusCita = async (id) => {
        try {
            const res = await clienteAxios.put(`/api/citas/${id}`,null, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
            });
            const data = await res.data;
            toast.success(data.data);
        } catch (error) {
            toast.error(error?.response?.data?.data)
        }
    }

    /* Admin servicios */

    const handleEditarServicio = async (servicio, estado = null) => {
        try {
            const res = await clienteAxios.put(`/api/servicios/${servicio.id}`, {
                nombre: servicio.nombre,
                precio: servicio.precio,
                descripcion: servicio.descripcion,
                estado: estado
            },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    },
                });
            const data = await res.data;

            toast.success(data.data);
            window.location.reload();


            setModalIsOpen(false);
        } catch (error) {
            toast.error(error?.response?.data?.data)
        }
    }

    const handleDeleteServicioAdmin = async (id) => {

        try {
            const res = await clienteAxios.delete(`/api/servicios/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
            });
            const data = await res.data;
            toast.success(data.data);

            router.refresh();

        } catch (error) {
            toast.error(error?.response?.data?.data)
        }
    }

    const values = {
        handleAgregarServicio,
        setMostrarTabs,
        mostrarTabs,
        setFecha,
        setHora,
        detallesCita,
        handleCantidad,
        handleConfirmarCita,
        fecha,
        formattedDate,
        handleDeleteCita,
        handleChangeStatusCita,
        handleDeleteServicioAdmin,
        handleModal,
        modalIsOpen,
        handleEditarServicio,
        servicioModal,
        setServicioModal,
        resetBlue,
        setResetBlue

    }
    return <peluqueriaContext.Provider value={values}>{children}</peluqueriaContext.Provider>

}