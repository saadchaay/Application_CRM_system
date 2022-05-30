import React from 'react';
import { Link } from "react-router-dom";
import logo from '../../assets/images/logo_white_bg.png'

const Navbar = () => {
  return (
    <section className="box-border relative block w-full py-6 leading-10 text-center text-indigo-900 bg-sky-900 border-b border-gray-200 md:py-4 ">
        <div className="w-full px-6 mx-auto leading-10 text-center md:px-8 max-w-7xl">
            <div className="box-border flex flex-wrap items-center justify-between mx-3 text-indigo-900">
                <div className='flex justify-start'>
                    <div className="relative flex items-center w-auto px-4 leading-10 lg:flex-grow-0 lg:flex-shrink-0 lg:text-left">
                        <div className="box-border inline-block font-sans text-2xl font-bold text-left text-white no-underline bg-transparent cursor-pointer focus:no-underline">
                            <Link to='/'><img src={logo} alt="" width={150} height={100} /></Link>
                        </div>
                    </div>
                </div>
                <div className="relative flex items-center px-4 mt-2 font-medium leading-10 md:flex-grow-0 md:flex-shrink-0 md:mt-0 md:text-right lg:flex-grow-0 lg:flex-shrink-0">
                    <div className="box-border inline-block h-10 px-4 mr-3 text-right text-gray-100 no-underline bg-gray-800 rounded-lg cursor-pointer md:mr-0 md:bg-transparent hover:text-white focus:no-underline hover:font-bold">
                        <Link to="/login" >Login</Link>
                    </div>
                    <div className="box-border inline-flex items-center h-10 px-4 text-base text-center no-underline align-middle bg-gray-200 rounded-lg cursor-pointer select-none hover:bg-gray-50 hover:text-gray-900 focus:shadow-xs focus:no-underline">
                        <Link to="/register">Start Now</Link>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
};

export default Navbar;