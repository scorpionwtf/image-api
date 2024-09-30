"use client";

import Logo from "@/assets/logo.jpg";
import Image from "next/image";
import SocialX from '@/assets/social-x.svg';
import SocialInsta from '@/assets/social-insta.svg';
import SocialLinkedIn from '@/assets/social-linkedin.svg';
import SocialPin from '@/assets/social-pin.svg';
import SocialYoutube from '@/assets/social-youtube.svg';


export const Footer = () => {
    return (
        <footer className="bg-black text-[#BCBCBC] text-sm py-10 text-center">
            <div className="container">
                <div className="inline-flex relative before:content-[''] before:blur before:bottom-3 before:w-full before:h-full before:bg-gradient-to-r before:from-[#F87BFF] before:via-[#FB92CF] before:to-[#2FD9FE] before:absolute before:inset-0">
                    <Image src={Logo} alt="Logo" width={40} height={70} className="relative rounded-xl" />
                </div>
                <nav className="flex md:flex-row md:justify-center flex-col gap-6 mt-6">
                    <a href="#">About</a>
                    <a href="#">Features</a>
                    <a href="#Pricing">Pricing</a>
                    <a href="#Testimonials">Customers</a>
                    <a href="#">Help</a>
                </nav>
                    <div className="social-icons flex mt-6 justify-center gap-6">
                        <Image src={SocialX} alt="Social X" width={24} height={24} className="invert brightness-0" />
                        <Image src={SocialInsta} alt="Instagram" width={24} height={24} className="invert brightness-0" />
                        <Image src={SocialLinkedIn} alt="LinkedIn" width={24} height={24} className="invert brightness-0" />
                        <Image src={SocialPin} alt="Pinterest" width={24} height={24} className="invert brightness-0" />
                        <Image src={SocialYoutube} alt="YouTube" width={24} height={24} className="invert brightness-0" />
                    </div>
                    <p className="mt-6">&copy; 2024 WatermarkRemover, Inc. All rights reserved.</p>
                
            </div>
        </footer>
    );
};
