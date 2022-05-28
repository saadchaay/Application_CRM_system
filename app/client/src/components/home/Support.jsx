import React from 'react';

import imgLeft from '../../assets/images/img1.png'
import imgRight from '../../assets/images/img2.png'

// import supportImg from '../assets/support.jpg'

const Support = () => {
  return (
    <section className="w-full bg-gray-200 pt-7 pb-7 md:pt-20">
        <div className="box-border flex flex-col items-center content-center px-8 mx-auto leading-6 text-black border-0 border-gray-300 border-solid md:flex-row max-w-7xl lg:px-16">

            <div className="box-border relative w-full max-w-md px-4 mt-5 mb-4 -ml-5 text-center bg-no-repeat bg-contain border-solid md:ml-0 md:mt-0 md:max-w-none lg:mb-0 md:w-1/2 xl:pl-10">
                <img src={imgLeft} className="p-2 pl-6 pr-5 xl:pl-16 xl:pr-20 " alt='/' />
            </div>

            <div className="box-border order-first w-full text-black border-solid md:w-1/2 md:pl-10 md:order-none">
                <h2 className="m-0 text-xl font-semibold leading-tight border-0 border-gray-300 lg:text-3xl md:text-2xl mb-16">
                    Full Automation
                </h2>
                <ul className="p-0 m-0 leading-6 border-0 border-gray-300">
                    <li className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
                        <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-violet-800 rounded-full"><span className="text-sm font-bold">✓</span></span> Maximize productivity and growth
                    </li>
                    <li className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
                        <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-violet-800 rounded-full"><span className="text-sm font-bold">✓</span></span> Speed past your competition
                    </li>
                    <li className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
                        <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-violet-800 rounded-full"><span className="text-sm font-bold">✓</span></span> Learn the top techniques
                    </li>
                </ul>
            </div>
            
        </div>
        <div className="box-border flex flex-col items-center content-center px-8 mx-auto mt-2 leading-6 text-black border-0 border-gray-300 border-solid md:mt-20 xl:mt-0 md:flex-row max-w-7xl lg:px-16">
            <div className="box-border w-full text-black border-solid md:w-1/2 md:pl-6 xl:pl-32">
                <h2 className="m-0 text-xl font-semibold leading-tight border-0 border-gray-300 lg:text-3xl md:text-2xl mb-16">
                    Service Providers
                </h2>
                <ul className="p-0 m-0 leading-6 border-0 border-gray-300">
                    <li className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
                        <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-violet-800 rounded-full"><span className="text-sm font-bold">✓</span></span> Automated task management workflow
                    </li>
                    <li className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
                        <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-violet-800 rounded-full"><span className="text-sm font-bold">✓</span></span> Detailed analytics for your data
                    </li>
                    <li className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
                        <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-violet-800 rounded-full"><span className="text-sm font-bold">✓</span></span> Some awesome integrations
                    </li>
                </ul>
            </div>

            <div className="box-border relative w-full max-w-md px-4 mt-10 mb-4 text-center bg-no-repeat bg-contain border-solid md:mt-0 md:max-w-none lg:mb-0 md:w-1/2">
                <img src={imgRight} alt='/' />
            </div>
        </div>
    </section>
  );
};

export default Support;