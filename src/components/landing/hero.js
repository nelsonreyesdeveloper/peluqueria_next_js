import Image from "next/image";
import Container from "./container";
import heroImg from "../../../public/img/hero.svg";

const Hero = () => {

  return (
    <>
      <Container className="flex flex-wrap ">
        <div className="flex items-center w-full lg:w-1/2">
          <div className="max-w-2xl mb-8">
            <h1 className="text-4xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight dark:text-white">
              Peluqueria | Silver Back
            </h1>
            <p className="py-5 text-xl leading-normal text-gray-500 lg:text-xl xl:text-2xl dark:text-gray-300">
              En Silver Back, nos especializamos en brindar cortes de pelo impecables y personalizados. Somos tu destino de confianza para lucir y sentirte increíble. Nuestro equipo de talentosos barberos comprende que el corte de pelo perfecto es esencial para tu estilo y autoconfianza.
            </p>


          </div>
        </div>
        <div className="flex items-center justify-center w-full lg:w-1/2">
          <div className="">


            {<Image
              src={heroImg.src}
              width="616"
              height="617"
              className={"object-cover"}
              alt="Hero Illustration"
              loading="eager"
            />}
          </div>
        </div>
      </Container>
      <Container>
        <div className="flex flex-col justify-center">
          <div className="text-xl text-center text-gray-700 dark:text-white">
            Mas de <span className="text-indigo-600">2000</span>{" "}
            Clientes.
          </div>


        </div>
      </Container>
    </>
  );
}



export default Hero;