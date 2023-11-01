"use client"
import SectionTitle from "@/components/landing/sectionTitle";
import { benefitOne, benefitTwo } from "@/components/landing/data";
import Video from "@/components/landing/video";
import Benefits from "@/components/landing/benefits";
import Footer from "@/components/landing/footer";
import Testimonials from "@/components/landing/testimonials";
import Cta from "@/components/landing/cta";
import Faq from "@/components/landing/faq";
import PopupWidget from "@/components/landing/popupWidget";
import Navbar from "@/components/landing/navbar";
import Hero from "@/components/landing/hero";
import { ThemeProvider } from "next-themes";
import Servicio from "@/components/Servicio";
import { usePeluqueriaContext } from "@/context/PeluqueriaProvider";
import { usePathname } from "next/navigation";
import Alerta from "@/components/Alerta";

const Home = () => {
  const { todosServicios } = usePeluqueriaContext()


  return (

    <div className="xl:w-[95%] xl:mx-auto">

      <ThemeProvider >

        <ThemeProvider>
          <Navbar />
          <Hero />
          <div id="servicios">
            <SectionTitle
              title="NUESTROS SERVICIOS">
            </SectionTitle>

            <div
              className={` ${todosServicios.length !== 0 ? 'grid w-[95%]  mx-auto sm:grid-cols-2 lg:grid-cols-3 gap-5 my-5' : ''}`}>
              {

                todosServicios.length !== 0 ? (
                  todosServicios.length !== 0 ? todosServicios.map(servicio => {
                    return (
                      <Servicio key={servicio.id} servicio={servicio}>

                      </Servicio>
                    )
                  })
                    : (
                      <Alerta><p className="bg-red-100 text-center border-l-4 border-red-500 text-red-700 p-4">No hay Servicios</p></Alerta>
                    )

                ): (
                  <Alerta><p className=" text-center ">Cargando....</p></Alerta>
                )
              }
            </div>

          </div>

          <Footer />
          {/* <PopupWidget /> */}

        </ThemeProvider>
      </ThemeProvider>
    </div>

  );
}

export default Home;