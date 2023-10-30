"use client"
import clienteAxios from "@/config/axios";
import { useRouter } from "next/navigation";
import { createContext, useState, useContext, useEffect } from "react"
import { toast } from "react-toastify"
import Cookies from "js-cookie";
import { getServicios } from "@/utils/getServicios";

const peluqueriaContext = createContext()

export const usePeluqueriaContext = () => useContext(peluqueriaContext);

export const PeluqueriaProvider = ({ children }) => {
    const [servicios, setServicios] = useState([])
    const [mostrarTabs, setMostrarTabs] = useState(1)
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [servicioModal, setServicioModal] = useState({})
    const [todosServicios, setTodosServicios] = useState([])
    const [nuevoPedido, setNuevoPedido] = useState(false);
    const [total, setTotal] = useState(0)

    useEffect(() => {
        setTotal(servicios.reduce((total, servicio) => total + servicio.precio * servicio.cantidad, 0))
    }, [servicios])

    /* Obtener fecha actual de ahora */
    const date = new Date(); // Obtiene la fecha y hora actual en la zona horaria local
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDatePleca = date.toLocaleDateString('es-SV', options);
    const obtenervalores = formattedDatePleca.split('/')
    const formattedDate = `${obtenervalores[2]}-${obtenervalores[1]}-${obtenervalores[0]}`
    const [fecha, setFecha] = useState(formattedDate)
    const [hora, setHora] = useState('')

    const router = useRouter();

    const getServiciosLoader = async () => {
        const serviciosTodo = await getServicios()
        const agregrandoMarcado = serviciosTodo.map(todo => {
            return {
                ...todo,
                marcado: 0
            }
        })

        setTodosServicios(agregrandoMarcado)
    }

    useEffect(() => {
        getServiciosLoader()
    }, [nuevoPedido])

    /* Modal */
    const handleModal = () => {
        setModalIsOpen(!modalIsOpen)
    }

    useEffect(() => {
        if (!modalIsOpen) {
            setServicioModal({})
        }
    }, [modalIsOpen])

    /* Marcando estado  a  0 */

    /* Individual */
    const marcarEstadoAcero = (id) => {
        const updateMarcadoServicios = todosServicios.map(todoService => {
            if (todoService.id == id) {
                return {
                    ...todoService,
                    marcado: 0
                }
            }
            return todoService
        })
        setTodosServicios(updateMarcadoServicios)
    }

    const marcarEstadoAceroTodos = () => {
        const updatedTodos = todosServicios.map(todo => ({ ...todo, marcado: 0 }));
        setTodosServicios(updatedTodos)
    }

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

    const handleDeleteCitaResumenCita = (id) => {
        const updateServicioCliente = servicios.filter(servicio => servicio.id !== id);
        setServicios(updateServicioCliente)

        marcarEstadoAcero(id)

    }

    const handleAgregarServicio = (servicio) => {
        /* Si el servicio no existe en el state, lo agrego */
        /* Agregar la cantidad al servicio */
        if (!servicios.some(s => s.id === servicio.id)) {
            /* Marcando en setTodoServicicio Como agregado */
            const updateSetTodosServicios = todosServicios.map(setTodo => {
                if (setTodo.id == servicio.id) {
                    return {
                        ...servicio,
                        marcado: 1
                    }
                }
                return setTodo
            })

            setTodosServicios(updateSetTodosServicios)
            servicio.cantidad = 1;
            setServicios([...servicios, servicio])
        } else {
            /* Si existe lo elimino  */
            setServicios(servicios.filter(s => s.id !== servicio.id))
            marcarEstadoAcero(servicio.id)


        }
    }

    const limpiarForm = () => {
        router.push("/mis-citas");
        setMostrarTabs(1)
        setServicios([])
        setFecha(formattedDate)
        setHora('')
        marcarEstadoAceroTodos();
        toast.success("Cita Realizada con exito");
    }

    const handleConfirmarCita = async (metodo) => {

        const citaPost = {
            fecha_cita: detallesCita.fecha,
            hora_cita: detallesCita.hora,
            total: detallesCita.servicios.reduce((a, c) => a + c.precio * c.cantidad, 0),
        }

        const servicios_with_subtotal = servicios.map(servicio => ({ ...servicio, subtotal: servicio.precio * servicio.cantidad }));
        try {
            const res = await clienteAxios.post('/api/citas', {
                metodo,
                citaPost,
                servicios: servicios_with_subtotal
            },
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('token')}`
                    },
                }
            );

            if (metodo == 1) {
                limpiarForm()
            }
            return 200
            // document.querySelector('#fecha').value = '';
            // document.querySelector('#react-select-hora-input').value = '';

        } catch (error) {
            if (error.response.status !== 400) throw new Error(error);
            toast.error(error.response.data.data)
            return error.response.status

        }

    }

    /* Admin citas */
    const handleDeleteCita = async (id) => {

        try {
            const res = await clienteAxios.delete(`/api/citas/${id}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`
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
            const res = await clienteAxios.put(`/api/citas/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`
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
                        Authorization: `Bearer ${Cookies.get('token')}`
                    },
                });

            const serviciosUptated = todosServicios.map(serviciost => {
                if (serviciost.id == servicio.id) {
                    return {
                        id: servicio.id,
                        nombre: servicio.nombre,
                        precio: servicio.precio,
                        descripcion: servicio.descripcion,
                        estado: estado == 1 ? estado : (estado == 0 ? estado : serviciost.estado),
                        text_imagen: serviciost.text_imagen
                    }
                }
                return serviciost
            })

            setTodosServicios(serviciosUptated);

            const data = await res.data;
            toast.success(data.data);
            setModalIsOpen(false);
        } catch (error) {
            toast.error(error?.response?.data?.data)
        }
    }

    const handleDeleteServicioAdmin = async (id) => {

        try {
            const res = await clienteAxios.delete(`/api/servicios/${id}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`
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
        todosServicios,
        setServicios,
        handleDeleteCitaResumenCita,
        marcarEstadoAceroTodos,
        getServiciosLoader,
        hora,
        total,
        limpiarForm
    }
    return <peluqueriaContext.Provider value={values}>{children}</peluqueriaContext.Provider>

}