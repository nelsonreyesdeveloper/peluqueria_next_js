import React from 'react'
import Link from "next/link"

const AuthLayout = ({ children }) => {
    return (
        <div className="lg:container    md:h-screen flex-col   lg:items-center lg:justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">

            <div className="relative justify-between   top-0 h-max   bg-[url(/img/portada/portada.jpg)] bg-cover bg-center lg:opacity-80 w-full z-10  md:h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
                <Link  href={"/"} className="relative hover:text-red-200 lg:hover:text-sky-900 z-20 flex mb-5 items-center text-lg font-medium">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-6 w-6"
                    >
                        <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                    </svg>
                    Peluqueria
                </Link>

            </div>

            <div className="absolute hidden lg:block lg:left-5 lg:bottom-10 opacity-100 z-20 ">
                <blockquote className="space-y-2  top-0">
                    <p className="text-xs md:text-lg opacity-100 text-black font-bold w-full lg:w-[60%]">
                        &ldquo;La amistad es un alma que habita en dos cuerpos; un corazón que habita en dos almas.&rdquo;
                    </p>
                    <footer className="text-sm">Aristoteles</footer>
                </blockquote>
            </div>

            {children}

        </div>
    )
}

export default AuthLayout