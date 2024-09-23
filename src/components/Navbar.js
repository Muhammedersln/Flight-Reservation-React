import React from 'react';
import { IoMdPricetag } from "react-icons/io";
import { FaEarthAmericas } from "react-icons/fa6";
import { IoAirplane } from "react-icons/io5";
import profileImage from "../images/profile.jpg"; 

const Navbar = () => {
    return (
        <div className='flex flex-wrap items-center justify-between py-7  mx-auto'>
            <div className='text-lg md:text-xl flex items-center gap-2 font-bold'>
                <span className='w-8 h-8 rounded-full bg-purple flex justify-center items-center'>
                    <IoAirplane color='white' className='text-2xl' />
                </span>
                PLANE SCAPE
            </div>

            <div className='flex flex-wrap items-center gap-4 mt-2 md:mt-0'>
                <ul className='flex flex-wrap items-center gap-4'>
                    <li className='flex items-center gap-0.5'>
                        <IoMdPricetag style={{ transform: 'rotate(270deg)' }}
                            className='text-purple-600' />
                        Deals
                    </li>
                    <li className='flex items-center gap-1.5'>
                        <FaEarthAmericas
                            className='text-purple-600' />
                        Discover
                    </li>
                    <li className='flex items-center gap-1'>
                        <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-300">
                            <img
                                src={profileImage} 
                                alt="profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <span className='hidden md:inline'>Muhammed Eraslan</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar;
