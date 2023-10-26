"use client"
import Tabs from '@/components/Tabs';
import NuevaCita from '@/components/NuevaCita';
import { Pagination } from '@/components/Pagination';
import { usePeluqueriaContext } from '@/context/PeluqueriaProvider';
import { useAuth } from '@/hooks/authHook';

const Page = () => {
  useAuth({ middleware: "auth", url: "/nueva-cita" })
  const {todosServicios} = usePeluqueriaContext();

  return (
    <div>
      <Tabs></Tabs>
      {
        todosServicios.length > 0 && (
          <NuevaCita servicios={todosServicios}></NuevaCita>
        )
      }
      <Pagination></Pagination>

    </div >
  )
}

export default Page