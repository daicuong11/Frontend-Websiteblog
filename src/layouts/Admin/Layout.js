import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header';
import Sidebar from './Sidebar';


export default function Layout() {
    const [isCollapse, setIsCollapse] = useState(false)

    return (

        <div className="flex">
            <Sidebar
                toggle={isCollapse}
            >
                {
                    isCollapse ? <h2 className="text-2xl font-bold text-white px-2 py-6 mb-6">AD</h2> : <h2 className="text-2xl text-whitefont-bold px-2 py-6 mb-6">TRANG QUẢN TRỊ</h2>
                }
            </Sidebar>
            <main className="relative flex flex-col w-full">
                <Header onClick={() => setIsCollapse(!isCollapse)} isCollapse={isCollapse} />
                <div className="h-screen overflow-y-scroll scrollbar-w-2 px-8 pt-28 bg-[#f6f6f6]">
                    <Outlet />

                </div>
            </main>
        </div>
    )
}
