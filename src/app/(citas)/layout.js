"use client"
import { usePeluqueriaContext } from "@/context/PeluqueriaProvider";
import { useAuth } from "@/hooks/authHook";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ServiciosLayout = ({ children }) => {
  const { user, logout } = useAuth({});
  const { marcarEstadoAceroTodos, setServicios500300 } = usePeluqueriaContext();

  const path = usePathname()
  return (
    <div className='flex flex-col sm:flex-row'>
      <div className='basis-3/12 h-screen relative' >
        <img className='h-32 w-full  object-cover  sm:object-fill   sm:h-screen' alt='Portada' src={'/img/portada/portada.jpg'}></img>
        <div className="absolute w-full h-full bg-black opacity-80 top-0">

        </div>
        <button onClick={() => { marcarEstadoAceroTodos(); setServicios([]); logout(); }} className='z-50 tex-center underline underline-offset-4 decoration-2 absolute top-0 right-2 lg:hidden text-white font-black uppercase  hover:text-red-100 '>Cerrar Sesion</button>

      </div>
      <div className='basis-9/12 sm:h-screen sm:overflow-scroll'>

        <div className='bg-black pt-2'>
          <div className='w-[95%] flex flex-col md:flex-row  mx-auto justify-between'>
            <p className='text-center font-bold  md:mb-0 text-white'>Bienvenido: <span className='font-light capitalize'> {user?.name}</span></p>
            <button onClick={() => { marcarEstadoAceroTodos(); setServicios([]); logout(); }} className='tex-center hidden lg:block text-white font-bold uppercase hover:text-sky-600 '>Cerrar Sesion</button>
          </div>

          <div className="flex  xs:flex-col xs:items-center  w-[95%] pb-5 justify-between lg:justify-start mx-auto mt-2 gap-x-10 py-2">
            <Link className={`${path == "/mis-citas" ? 'font-bold text-sky-500 underline underline-offset-8 decoration-4 decoration-skype-300  ' : 'font-medium text-white'} uppercase xs:mb-3`} href={"/mis-citas"}>Mis citas</Link>
            <Link className={`${path == "/nueva-cita" ? 'font-bold text-sky-500 underline underline-offset-8 decoration-4 decoration-skype-300  ' : 'font-medium text-white'} uppercase `} href={"/nueva-cita"}>Nueva Cita</Link>
          </div>
        </div>

        {children}
      </div>

    </div>
  )
}

export default ServiciosLayout