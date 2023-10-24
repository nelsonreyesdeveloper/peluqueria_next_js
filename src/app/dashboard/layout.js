"use client"
import Aside from '@/components/Aside'
import React from 'react'

import { useAuth } from '@/hooks/authHook'
const DashboardLayout = ({ children }) => {

    const { logout,user } = useAuth({ middleware: 'auth' })
    return (
        <div className='flex flex-col sm:flex-row sm:h-screen '>

            <Aside logout={logout}></Aside>

            <div className="p-4  sm:basis-3/4   sm:overflow-scroll">
                <p className='font-bold mb-2'>Bienvenido:  <span className='font-light capitalize'>{user?.name}</span>   </p>
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">

                    {
                        children
                    }

                </div>
            </div>
        </div>
    )
}

export default DashboardLayout