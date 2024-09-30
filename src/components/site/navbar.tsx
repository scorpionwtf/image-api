"use client"
import { useState, useEffect } from 'react';
import Logo from "@/assets/logo.png";
import Image from "next/image";
import { FiMenu } from "react-icons/fi";
import { FaArrowRightLong } from "react-icons/fa6";
import { signIn } from 'next-auth/react';
import LoginBadge from "../auth/login-badge";
import { Session } from "next-auth";






const fetchSession = async () => {
    const response = await fetch('/api/auth/session');
    if (response.ok) {
        return response.json();
    }
    return null;
};


interface NavbarProps {

    session?: Session | null; // Optionally pass session if required
    isProUser: any
  }

export const Navbar:React.FC<NavbarProps> = ({ session, isProUser} ) => {
   
    const [error, setError] = useState<string | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Mobile menu state
    


    const handleSignIn = async () => {
        await signIn();
    };

    

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // const [isEditorRoute, setIsEditorRoute] = useState(false);
    // const router = useRouter();

    // useEffect(() => {
    //     // Only run this effect on the client side
    //     if (typeof window !== 'undefined' && router.isReady) {
    //     setIsEditorRoute(router.pathname.startsWith('/editor'));
    //     }
    // }, [router.isReady, router.pathname]);

    return (
        <>
        <header className="sticky top-0 z-20 overflow-x-clip shadow-md bg-white">
            <div className="py-[2px]">
                <div className="flex flex-row justify-center items-center"> {/* Updated to justify-center and items-center */}
                    <div className="flex items-center lg:gap-x-[400px] md:gap-x-[150px] gap-x-[200px]">
                        <div className='flex gap-x-1 items-center xl:mr-20'>
                            <a href='/'>   
                                <Image src={Logo} alt="SaaS Logo" height={60} width={60} className="" />
                            </a>
                            <a href='/'>
                                <p className='text-center font-bold text-xl'>Upscale-AI.com</p>
                            </a>
                        </div>
                        <FiMenu size={30} className="md:hidden" onClick={toggleMobileMenu} />
                        <nav className="hidden md:flex gap-6 text-black/60 items-center">
                            <a className='hover:text-black' href="/">Home</a>
                            <a className='hover:text-black' href="/#pricing">Pricing</a>
                            <a className='hover:text-black' href="/blog">Blog</a>
                            {session?.user && <a className='hover:text-black' href="/auth/settings">Plan</a>}
                            <a className='hover:text-black' href="/api">API</a>
                            
                            {!session?.user ? (
                                <>
                                    <a href='/auth/register'>
                                        <button className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                                            Sign up for Free
                                        </button>
                                    </a>
                                    <button onClick={handleSignIn} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">
                                        Sign in 
                                    </button>
                                </>
                            ) : (
                                <LoginBadge user={session?.user} />
                            )}
                            {!isProUser &&
                            <a href="/#pricing" className="box-border relative z-30 inline-flex items-center justify-center w-auto px-8 py-3 overflow-hidden font-bold text-white transition-all duration-300 bg-indigo-600 rounded-md cursor-pointer group ring-offset-2 ring-1 ring-indigo-300 ring-offset-indigo-200 hover:ring-offset-indigo-500 ease focus:outline-none">
                                <span className="absolute bottom-0 right-0 w-8 h-20 -mb-8 -mr-5 transition-all duration-300 ease-out transform rotate-45 translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
                                <span className="absolute top-0 left-0 w-20 h-8 -mt-1 -ml-12 transition-all duration-300 ease-out transform -rotate-45 -translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
                                <span className="relative z-20 flex items-center text-sm">
                                <svg className="relative w-5 h-5 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                Get Pro
                                </span>
                            </a>}
                        </nav>
                    </div>
                </div>
            </div>
        </header>


        {/* Mobile Menu */}
        {isMobileMenuOpen && (
                <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
                    <div className="bg-white w-3/4 max-w-sm h-full p-6 flex flex-col">
                        <button
                            className="text-black self-end mb-8"
                            onClick={toggleMobileMenu}
                        >
                            Close
                        </button>
                        <nav className="flex flex-col gap-6 text-black/60">
                            <a className='hover:text-black' href="/">Home</a>
                            <a className='hover:text-black' href="/#pricing">Pricing</a>
                            <a className='hover:text-black' href="/blog">Blog</a>
                            <a className='hover:text-black' href="/blog">Plan</a>
                            <a className='hover:text-black' href="/blog">API</a>
                            
                            {!session?.user ? (
								<>
									<button onClick={handleSignIn} className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
										Sign up for Free
									</button>
									<button onClick={handleSignIn} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">
										Sign in 
									</button>
								</>
                            ) : (
                                <LoginBadge user={session?.user} />
                            )}
                        </nav>
                    </div>
                </div>
            )}
        </>
    );
};