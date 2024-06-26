"use client"

import Link from "next/link";
import ThemeChanger from "./DarkSwitch";
import Image from "next/image"
import { Disclosure } from "@headlessui/react";
import { useAuth } from "@/hooks/authHook";
import { useEffect, useState } from "react";
import { object } from "zod";
const Navbar = () => {
  const [userIndex, setUserIndex] = useState(undefined)
  const { user } = useAuth({})

  useEffect(() => {
    setUserIndex(user)
  }, [user])


  const decision = typeof userIndex === "object" ? ["Gestionar Citas", "/mis-citas", "active"] : ["Haz tu Cita YA!", "/login", "active"];
  const array = [
    decision,
  ]
  const navigation = [
    ["Inicio", "/"],
    ["Servicios", "/#servicios"],

  ];


  return (
    <div className="w-full">
      <nav className="container relative flex flex-wrap items-center justify-between p-8 mx-auto lg:justify-between xl:px-0">
        {/* Logo  */}
        <Disclosure>
          {({ open }) => (
            <>
              <div className="flex flex-wrap items-center justify-between w-full lg:w-auto">
                <Link href="/">
                  <span className="flex items-center space-x-2 text-2xl font-medium text-indigo-500 dark:text-gray-100">
                    <span>
                      <Image
                        src="/img/logo.png"
                        alt="N"
                        width="100"
                        height="100"
                        className="w-full h-28"
                      />
                    </span>
                  </span>
                </Link>

                <Disclosure.Button
                  aria-label="Toggle Menu"
                  className="px-2 py-1 ml-auto text-gray-500 rounded-md lg:hidden hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:text-gray-300 dark:focus:bg-trueGray-700">
                  <svg
                    className="w-6 h-6 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24">
                    {open && (
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                      />
                    )}
                    {!open && (
                      <path
                        fillRule="evenodd"
                        d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                      />
                    )}
                  </svg>
                </Disclosure.Button>

                <Disclosure.Panel className="flex flex-wrap w-full my-5 lg:hidden">
                  <>
                    {navigation.map((item, index) => (
                      <Link key={index} href={item[1]} className={` ${item[2] === "active" ? "underline decoration-2 underline-offset-4 font-bold text-indigo-600" : ""} w-full px-4 py-2 -ml-4 text-gray-500 rounded-md dark:text-gray-300 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 dark:focus:bg-gray-800 focus:outline-none`}>
                        {item[0]}
                      </Link>
                    ))}


                    {
                      array.map((item, index) => (
                        <Link href={item[1]} className="w-full px-6 py-2 mt-3 text-center text-white font-bold uppercase bg-fuchsia-600 rounded-md lg:ml-5">
                          {item[0]}
                        </Link>
                      ))
                    }


                  </>
                </Disclosure.Panel>
              </div>
            </>
          )}
        </Disclosure>

        {/* menu  */}


        <div className="hidden mr-3 space-x-4 lg:flex nav__item">
          <div className="hidden text-center lg:flex lg:items-center">
            <ul className="items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex">
              {navigation.map((menu, index) => (
                <li className="mr-3 nav__item" key={index}>
                  <Link href={menu[1]} className={` ${menu[2] === "active" ? "underline bg-fuchsia-700 decoration-2 underline-offset-4 font-bold text-white h-full hover:bg-fuchsia-800 hover:text-white" : ""} w-full px-6 py-2 -ml-4  rounded-md  hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 dark:focus:bg-gray-800 focus:outline-none`}>
                    {menu[0]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {
            array.map((item, index) => (
              <Link href={item[1]} className="px-6 py-2 text-white font-bold uppercase bg-fuchsia-700 rounded-md md:ml-5">
                {item[0]}
              </Link>
            ))
          }


        </div>
      </nav>
    </div>
  );
}

export default Navbar;
