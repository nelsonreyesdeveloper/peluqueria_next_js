import Link from "next/link";
import Image from "next/image";
import React from "react";
import Container from "./container";

export default function Footer() {
  const navigation = [
    "Inicio",

  ];
  const legal = ["Terms", "Privacy", "Legal"];
  return (
    <div className="relative">
      <Container>
        <div className="grid max-w-screen-xl grid-cols-1 gap-10 pt-10 mx-auto mt-5 border-t border-gray-100 dark:border-trueGray-700 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div>
              {" "}
              <Link href="/" className="flex items-center space-x-2 text-2xl font-medium text-indigo-500 dark:text-gray-100">
                <Image
                   src="/img/logo.png"
                   alt="N"
                   width="100"
                   height="100"
                   className="w-28 h-28"
                />
                <span className="font-bold text-black uppercase">Silver Back</span>
              </Link>
            </div>

            <div className="max-w-md mt-4 text-gray-500 dark:text-gray-400">
              En Silver Back, nos especializamos en brindar cortes de pelo impecables y personalizados. Somos tu destino de confianza para lucir y sentirte increíble. Nuestro equipo de talentosos barberos comprende que el corte de pelo perfecto es esencial para tu estilo y autoconfianza.
            </div>


          </div>

          <div>
            <div className="flex flex-wrap w-full -mt-2 -ml-3 lg:ml-0">
              {navigation.map((item, index) => (
                <Link key={index} href="/" className="w-full px-4 py-2 text-gray-500 rounded-md dark:text-gray-300 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:focus:bg-trueGray-700">
                  {item}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <div className="flex flex-wrap w-full -mt-2 -ml-3 lg:ml-0">
              {legal.map((item, index) => (
                <Link key={index} href="/" className="w-full px-4 py-2 text-gray-500 rounded-md dark:text-gray-300 hover:text-indigo-500 focus:text-indigo-500  hover:cursor-not-allowed focus:bg-indigo-100 focus:outline-none dark:focus:bg-trueGray-700">
                  {item}
                </Link>
              ))}
            </div>
          </div>
          <div className="">
            <div>Siguenos</div>
            <div className="flex mt-5 space-x-5 text-gray-400 dark:text-gray-500  hover:cursor-not-allowed">

              {/* <a
                href="https://facebook.com/web3templates"
                target="_blank"
                rel="noopener">
              </a> */}
              <span className="sr-only">Facebook</span>
              <Facebook />

            </div>
          </div>
        </div>

        <div className="my-10 text-sm text-center text-gray-600 dark:text-gray-400">
          Copyright © {new Date().getFullYear()} Silver Back.


        </div>
      </Container>
      {/* Do not remove this */}
    </div>
  );
}



const Facebook = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor">
    <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07" />
  </svg>
);




