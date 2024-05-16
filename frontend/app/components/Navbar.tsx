'use client'

import Link from 'next/link';
import Cookie from 'js-cookie'
import { useState, useEffect } from 'react';

const Navbar = () => {

    const [username, setUsername] = useState('')

    useEffect(() => {
        const name = Cookie.get('name')
        if (name) {
            setUsername(name)
        }
    },[])
    return (
        <nav className="flex justify-between items-center p-2 bg-[#3D6DB3] text-white">
            <div className="flex gap-4">
                <Link  href = "/dashboard" className="py-2 px-4 rounded-md bg-[#345C98] hover:bg-[#2D5185] active:bg-[#395887]">Dashboard</Link>
                <Link href = "/" className="py-2 px-4 rounded-md bg-[#345C98] hover:bg-[#2D5185] active:bg-[#395887]">All</Link>
            </div>
            <div className="flex gap-4">
                {username ? (
                    <span>Welcome, {username}</span>
                ) : (
                    <>
                        <Link href="/login" className="py-2 px-4 rounded-md bg-[#345C98] hover:bg-[#2D5185] active:bg-[#395887]">Login</Link>
                        <Link href = "/signup" className="py-2 px-4 rounded-md bg-[#345C98] hover:bg-[#2D5185] active:bg-[#395887]">Sign Up</Link>
                    </>
                )}
            </div>
            
        </nav>
    );
};

export default Navbar;