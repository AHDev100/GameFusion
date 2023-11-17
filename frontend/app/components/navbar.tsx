"use client";

import { Logo } from "../assets/logo";
import Status from "../utils/login";

export const Navbar = () : any => {
    return (
        <div>
            <nav className="flex items-center justify-between flex-wrap bg-red-500 p-6">
                <div className="flex items-center flex-shrink-0 text-white mr-6">
                    <Logo />
                    <span className="font-semibold text-xl tracking-tight mx-2">GameFusion</span>
                </div>
                <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                    <div className="text-sm lg:flex-grow flex justify-center">
                        <a href="/" className="block mt-4 lg:inline-block lg:mt-0 text-neutral-200 hover:text-white hover:underline mr-4 text-base">
                            Home
                        </a>
                        <a href="/community" className="block mt-4 lg:inline-block lg:mt-0 text-neutral-200 hover:text-white hover:underline mr-4 text-base">
                            Community
                        </a>
                        <a href="/about" className="block mt-4 lg:inline-block lg:mt-0 text-neutral-200 hover:text-white hover:underline text-base">
                            About
                        </a>
                    </div>
                    <div>                    
                        <Status />
                    </div>
                </div>
            </nav>
        </div>
    )
}