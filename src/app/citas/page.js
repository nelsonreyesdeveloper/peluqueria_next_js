"use client"
import Tabs from '@/components/Tabs';
import Servicios from '@/components/Servicios';
import { Pagination } from '@/components/Pagination';
import { useAuth } from '@/hooks/authHook';
import { usePeluqueriaContext } from '@/context/PeluqueriaProvider';
const Page = () => {
  const { user, logout } = useAuth({ middleware: 'auth' });
  const { todosServicios, setServicios } = usePeluqueriaContext();

  return (
    <div>

      <div className='bg-black py-5'>
        <div className='w-[95%] flex flex-col md:flex-row  mx-auto justify-between'>
          <p className='text-center font-bold mb-5 md:mb-0 text-white'>Bienvenido: <span className='font-light capitalize'> {user?.name}</span></p>
          <button onClick={() => { setServicios([]); logout(); }} className='tex-center text-white font-bold uppercase hover:text-red-600'>Cerrar Sesion</button>
        </div>
      </div>

      <Tabs></Tabs>
      {
        todosServicios.length > 0 && (
          <Servicios servicios={todosServicios}></Servicios>
        )
      }
      <Pagination></Pagination>

    </div >
  )
}

export default Page