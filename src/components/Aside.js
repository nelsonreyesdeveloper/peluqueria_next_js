"use client"
import { Button } from 'flowbite-react';
import Link from 'next/link';
import { BsCalendarDate, BsSliders2Vertical } from 'react-icons/bs'
import { CiLogout } from 'react-icons/ci'
import { usePathname } from 'next/navigation';
export default function DefaultSidebar({logout}) {

    const pathname = usePathname()
    return (

        <div className='flex flex-col relative sm:basis-1/4'>
            <div aria-label="bg-fondo" className='absolute sm:block top-0 left-0 bg-[url("/img/portada/portada.jpg")] bg-cover  opacity-90 w-full z-10 h-[260px] sm:h-screen'></div>
            <button onClick={
                (e) => {
                    const fondo = document.querySelector('[aria-label="bg-fondo"]');
                    const sidebar = document.querySelector('[aria-label="sidebar"]');
                    if (sidebar.classList.contains('ocultar')) {
                      
                        setTimeout(() => {
                            e.target.classList.remove('font-bold','uppercase','text-3xl','hover:text-red-700','text-white')
                            e.target.innerHTML  = 'MENU'
                            e.target.classList.add('font-bold','uppercase','text-3xl','hover:text-black','text-sky-700')
                            fondo.classList.add('hidden')
                            sidebar.classList.remove('ocultar')
                            sidebar.classList.add('w-0', 'h-0')
                            sidebar.classList.add('-translate-x-96')
                        }, 180)
                    } else {
                        e.target.classList.remove('font-bold','uppercase','text-3xl','hover:text-black','text-sky-700')
                        e.target.innerHTML  = 'X'
                        e.target.classList.add('font-bold','uppercase','text-3xl','hover:text-red-700','text-white')
                        fondo.classList.remove('hidden')
                        sidebar.classList.add('ocultar')
                        sidebar.classList.remove('w-0', 'h-0')
                        sidebar.classList.remove('-translate-x-96')
                    }
                }
            } className='sm:hidden text-white z-20  sm:w-full w-max my-2  ml-2 p-2 font-bold uppercase text-3xl hover:text-red-700'>X</button>

            <div className='transition-transform z-20  ocultar duration-300 sm:w-full sm:h-full sm:translate-x-0 ' aria-label='sidebar'>
                <div className=''>
                    <div className='p-2 '>
                        <Link className={` z-20 my-2 text-center sm:text-left flex items-center gap-x-2 hover:bg-slate-100 p-3 rounded-md ${pathname === '/dashboard/citas' ? 'bg-slate-300' : 'bg-white'} `}
                            href="/dashboard/citas"
                        >
                            <BsCalendarDate />
                            <p>
                                Citas
                            </p>
                        </Link>
                        <Link className={`z-20 my-2 text-center sm:text-left flex items-center gap-x-2 hover:bg-slate-100 p-3 rounded-md ${pathname === '/dashboard/servicios' ? 'bg-slate-300' : 'bg-white'}`}
                            href="/dashboard/servicios"
                        >
                            <BsSliders2Vertical />
                            <p>
                                Servicios
                            </p>
                        </Link>

                        <button className={`z-20 my-2 w-full text-center sm:text-left flex items-center gap-x-2 hover:bg-slate-100 p-3 rounded-md bg-white`}
                           onClick={() => {
                               logout()
                           }}
                        >
                            <CiLogout />
                            <p>
                                Cerrar Sesion
                            </p>
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}


