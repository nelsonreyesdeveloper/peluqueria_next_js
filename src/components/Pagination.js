"use client"
import { usePeluqueriaContext } from "@/context/PeluqueriaProvider"

export const Pagination = () => {
    const { mostrarTabs, setMostrarTabs } = usePeluqueriaContext()
    return (
        <div className=" w-[95%] mx-auto flex flex-col sm:flex-row sm:justify-between gap-2 my-5">
            <button className={`bg-sky-900  uppercase flex items-center justify-center gap-x-3 text-white font-bold px-3 rounded-md py-1 ${mostrarTabs === 1 ? 'opacity-0' : ''}`} disabled={mostrarTabs === 1} onClick={() => setMostrarTabs(mostrarTabs - 1)}>
            <svg viewBox="0 0 1024 1024" className="icon w-5 h-5 text-white font-bold" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M659.2 917.333333l66.133333-66.133333L386.133333 512 725.333333 172.8 659.2 106.666667 256 512z" fill="#ffffff"></path></g></svg>
                Anterior</button>
            <button className={`bg-sky-900 uppercase flex  items-center justify-center gap-x-3 text-white font-bold rounded-md px-3 py-1 ${mostrarTabs === 3 ? 'opacity-0' : ''}`} disabled={mostrarTabs === 3} onClick={() => setMostrarTabs(mostrarTabs + 1)}>
                Siguiente
                <svg viewBox="0 0 1024 1024" className="icon w-5 h-5 text-white font-bold" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M364.8 106.666667L298.666667 172.8 637.866667 512 298.666667 851.2l66.133333 66.133333L768 512z" fill="#ffffff"></path></g></svg>
            </button>
        </div>
    )
}