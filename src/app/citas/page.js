"use client"
import Tabs from '@/components/Tabs';
import { getServicios } from '@/utils/getServicios';
import Servicios from '@/components/Servicios';
import { Pagination } from '@/components/Pagination';
import { useEffect, useState } from 'react';

import { useAuth } from '@/hooks/authHook';

const Page = () => {
  const { user, logout } = useAuth({ middleware: 'auth' });
  const [servicios, setServicios] = useState([]);

  useEffect(() => {

    const ejecutarServicio = async () => {
      const servicios = await getServicios();
      setServicios(servicios);
    }
   
    if(user === undefined) return
    if(servicios.length > 0) return
    ejecutarServicio();
  }, [user])

  console.log(servicios)
  if(servicios.length === 0)  return <p>cargando...</p>
   
  return (
    <div>

      <div className='bg-black py-5'>
        <div className='w-[95%] flex flex-col md:flex-row  mx-auto justify-between'>
          <p className='text-center font-bold mb-5 md:mb-0 text-white'>Bienvenido: <span className='font-light'> {user?.name}</span></p>
          <button onClick={() => logout()} className='tex-center text-white font-bold uppercase hover:text-red-600'>Cerrar Sesion</button>
        </div>
      </div>

      <Tabs></Tabs>
      {
        servicios.length > 0 && (
          <Servicios servicios={servicios}></Servicios>
        )
      }
      <Pagination></Pagination>

    </div >
  )
}

export default Page