import React from 'react'
import { FaPlane } from "react-icons/fa6";
import { IoMdPricetag } from "react-icons/io";
import { FaEarthAmericas } from "react-icons/fa6";
import { IoAirplane } from "react-icons/io5";


const Navbar = () => {
    return (
        <div className='flex mx-auto justify-between my-5'>
            <div className='text-xl flex items-center gap-2 font-bold'>
                <span className='w-8 h-8 rounded-full bg-purple flex justify-center items-center'>
                    <IoAirplane color='white' className='text-2xl' />
                </span>
                PLANE SCAPE
            </div>

            <div className='flex'>
                <ul className='flex gap-4 items-center'>
                    <li className='flex items-center gap-0.5'>
                        <IoMdPricetag style={{ transform: 'rotate(270deg)' }}
                            className='text-purple' />
                        Deals
                    </li>
                    <li className='flex items-center gap-1.5'>
                        <FaEarthAmericas
                            className='text-purple' />
                        Discover</li>
                    <li className='flex items-center ml-2 gap-1 '>
                        <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-300">

                        </div>
                        Muhammed E
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar
