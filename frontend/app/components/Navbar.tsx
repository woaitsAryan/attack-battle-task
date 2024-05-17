'use client'

import Link from 'next/link';
import Cookie from 'js-cookie'
import { useState, useEffect } from 'react';
import Image from 'next/image';

const Navbar = () => {
    const [username, setUsername] = useState('')

    useEffect(() => {
        const name = Cookie.get('name')
        if (name) {
            setUsername(name)
        } else {
            setUsername('')
        }
    }, [])
    const [menubtn, setmenubtn] = useState(0);
    return (
        <nav className="flex justify-between items-center p-2 bg-[#3D6DB3]  text-white px-6">
            <Image src="/logo.png" alt="logo" height={32} width={204} />
            <div className="flex gap-4 relative">
                <div className={`w-32 h-[2px] bg-white absolute bottom-0 left-0 ${menubtn === 0 ? "" : "translate-x-[110%]"} transition-all duration-200 ease-linear`}></div>
                <Link href="/" className="py-2 px-4 rounded-md w-32 text-center" onClick={() => setmenubtn(0)}>Home</Link>
                <Link href="/dashboard" className="py-2 px-4 rounded-md  w-32 text-center" onClick={() => setmenubtn(1)}>Dashboard</Link>
            </div>
            <div className="flex gap-4">
                {username ? (
                    <span>Welcome, <span className='font-bold'>{username}</span></span>
                ) : (
                    <>
                        <Link href="/login" className="py-2 px-4 rounded-md bg-[#345C98] hover:bg-[#2D5185] active:bg-[#395887]">Login</Link>
                        <Link href="/signup" className="py-2 px-4 rounded-md bg-[#345C98] hover:bg-[#2D5185] active:bg-[#395887]">Sign Up</Link>
                    </>
                )}
            </div>

        </nav>
    );
};

export default Navbar;