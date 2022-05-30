import React from 'react'
import { Link } from 'react-router-dom' 
import Navbar from './Navbar'

const Hero = () => {
  return (
    <section className="overflow-hidden bg-gray-300 from-black via-gray-900 to-blue-900">
        <Navbar />
        <div className="flex flex-col px-10 mx-auto md:py-16 lg:px-6">
            <div className="flex flex-col items-center justify-around md:flex-row">
                <h1 className="max-w-sm text-4xl font-extrabold md:leading-tight md:text-5xl lg:text-7xl md:pr-24 lg:pr-0">Growth<br className="hidden md:block" />Your <br className="hidden md:block" />Business.</h1>

                <div className="mt-4 md:mt-0">
                    <p className="text-xl md:max-w-md lg:text-2xl">Fully automate your E-commerce processes, and find all service providers you need to focus on scaling your business.</p>
                    <button className="px-8 py-5 mt-6 text-lg font-medium leading-5 text-center text-white bg-blue-700 hover:bg-blue-800 focus:outline-none md:mx-0 md:w-auto rounded">
                        <Link to="/register" >
                            Get Started
                        </Link>
                    </button>
                </div>
            </div>

            <div className="relative w-full h-64 max-w-3xl mx-auto mt-12 bg-blue-800 rounded-md sm:mt-16 md:mt-20 xl:max-w-4xl sm:h-88 md:h-96">

                <div className="absolute top-0 left-0 hidden w-40 h-40 mt-40 -ml-16 xl:-ml-32 xl:w-56 xl:h-56 lg:block">
                    <div class="relative flex items-center justify-center w-full h-full -ml-8 overflow-hidden bg-blue-600 shadow-2xl rounded">
                        <img src="https://cdn.devdojo.com/images/january2021/pie-chart.png" class="w-32 h-32 border-8 border-blue-500 rounded-full" alt='' />
                    </div>
                </div>
                <img src="https://cdn.devdojo.com/images/january2021/dashboard-screen.png" class="w-full h-auto rounded-b-none sm:rounded-b-none md:rounded-b-none rounded" alt='' />
                <img src="https://cdn.devdojo.com/images/january2021/right-activity.png" class="absolute top-0 right-0 z-20 hidden w-48 h-auto mt-16 -mr-24 overflow-hidden lg:block xl:-mr-40 xl:mt-24 xl:w-80 rounded" alt='' />
            </div>
        </div>
    </section>
  );
}

export default Hero