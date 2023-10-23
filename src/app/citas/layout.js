export const metadata = {
  title: "Citas | Peluqueria",
  description: "Realiza tus citas",
}


const ServiciosLayout = ({ children }) => {

  return (
    <div className='flex flex-col sm:flex-row'>
      <div className='basis-3/12 h-screen' >
        <img className='h-48 w-full object-cover sm:object-fill   sm:h-screen' alt='Portada' src={'/img/portada/portada.jpg'}></img>
      </div>
      <div className='basis-9/12 sm:h-screen sm:overflow-scroll'>
        {children}
      </div>

    </div>
  )
}

export default ServiciosLayout