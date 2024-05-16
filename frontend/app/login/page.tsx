'use client'

import React, { useEffect } from 'react';
import { EyeClosed, Eye, ArrowRight, Building } from '@phosphor-icons/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import backend from '@/lib/axios';
import Cookie from 'js-cookie'
import Toaster from '@/lib/toast';

const Login = () => {
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('')
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = {
            email,
            password,
        };
        const toaster = Toaster.startLoad('Logging In');

        try {

            const response = await backend.post('/auth/login', formData)
            Toaster.stopLoad(toaster, 'Logged In!', 1);
            const token = response.data.token
            Cookie.set('token', token)

        } catch (err: any) {
            console.log(err)
            Toaster.stopLoad(toaster, err, 0);
        }
    }

    return (
        <main className="h-full flex justify-center items-center w-full">
            <div className="w-[50%] max-lg:w-full h-full min-h-screen font-primary py-8 px-8 flex flex-col justify-center items-center">
                <form onSubmit={handleSubmit} className="w-3/5 max-md:w-full flex flex-col items-center gap-6">
                    <div className="flex flex-col gap-2 text-center">
                        <div className="text-2xl font-semibold">Let&apos;s Get Back In</div>
                        <div className="text-gray-400">Time to pick up where you left ✌️</div>
                    </div>
                    <div className="w-full flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <div className="font-medium">Email</div>
                            <input
                                name="name"
                                value={email}
                                onChange={el => setEmail(el.target.value)}
                                type="text"
                                className="w-full bg-white focus:outline-none border-2 p-2 rounded-xl text-gray-400"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="font-medium">Password</div>
                            <div className="w-full relative">
                                <input
                                    name="password"
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={el => setPassword(el.target.value)}
                                    type={showPassword ? 'text' : 'password'}
                                    className="w-full bg-white p-2 rounded-xl focus:outline-none focus:bg-white border-2 text-gray-400 pr-10"
                                />
                                {showPassword ? (
                                    <Eye
                                        onClick={() => setShowPassword(false)}
                                        className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                                        size={20}
                                        weight="regular"
                                    />
                                ) : (
                                    <EyeClosed
                                        onClick={() => setShowPassword(true)}
                                        className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                                        size={20}
                                        weight="regular"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="w-full p-1 flex flex-col gap-2 items-center">
                        <button
                            type="submit"
                            className="w-full relative p-2 border-2 after:absolute after:-top-[3px] after:-left-[3px] after:-right-[3px] after:-bottom-[3.5px] after:-z-10 after:bg-[#395887] after:rounded-xl flex items-center cursor-pointer justify-center gap-2 bg-[#3D6DB3] hover:bg-[#345C98] active:bg-[#2D5185] border-[#d1d1d1a7] text-white py-2 rounded-xl font-semibold"
                        >
                            <div> Continue</div>
                            <ArrowRight size={20} weight="regular" />
                        </button>
                        <div onClick={() => router.push('/signup')} className="text-gray-400 text-sm cursor-pointer">
                            Don&apos;t have an Account? <span className="font-medium underline underline-offset-2">Sign Up</span>
                        </div>
                    </div>
                </form>
            </div>
        </main >

    );
};


export default Login;