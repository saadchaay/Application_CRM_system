import React from 'react';

import { CheckIcon } from '@heroicons/react/solid';

const Pricing = () => {
  return (
    <div name='pricing' className='w-full text-white'>
      <div className='w-full h-[800px] bg-slate-900 absolute mix-blend-overlay'></div>

      <div className='max-w-[1240px] mx-auto py-12'>

        <div className='text-center py-8 text-slate-300'>
          <h2 className='text-3xl uppercase'>Pricing</h2>
          <h3 className='text-5xl font-bold text-white py-8'>The right price for your research.</h3>
          <p className='text-3xl'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia
            laudantium odio ullam inventore aliquid ipsum quasi tenetur velit
            voluptatum iste.
          </p>
        </div>

        <div className='grid md:grid-cols-2'>

          <div className='bg-white text-slate-900 m-4 p-8 rounded-xl shadow-2xl relative'>
            <span className='uppercase px-3 py-1 bg-indigo-200 text-indigo-900 rounded-2xl text-sm'>Standard</span>
            <div>
              <p className='text-6xl font-bold py-4 flex'>$49<span className='text-xl text-slate-500 flex flex-col justify-end'>/mo</span></p>
            </div>
            <div className='text-2xl'>
                <p className='flex py-4'><CheckIcon className='w-8 mr-5 text-green-600'  />Pay as you go.</p>
                <p className='flex py-4'><CheckIcon className='w-8 mr-5 text-green-600'  />Unlimited Users.</p>
                <p className='flex py-4'><CheckIcon className='w-8 mr-5 text-green-600'  />No Setup Fee.</p>
                <p className='flex py-4'><CheckIcon className='w-8 mr-5 text-green-600'  />Unlimited Agents.</p>
                <p className='flex py-4'><CheckIcon className='w-8 mr-5 text-green-600'  />Unlimited Products.</p>
                <button className='px-8 py-5 mt-6 text-lg font-medium leading-5 text-center text-white bg-blue-700 hover:bg-blue-800 focus:outline-none md:mx-0 md:w-auto rounded'>Get Started</button>
            </div>
          </div>
          <div className='bg-white text-slate-900 m-4 p-8 rounded-xl shadow-2xl relative'>
            <span className='uppercase px-3 py-1 bg-indigo-200 text-indigo-900 rounded-2xl text-sm'>Premium</span>
            <div>
              <p className='text-6xl font-bold py-4 flex'>$99<span className='text-xl text-slate-500 flex flex-col justify-end'>/mo</span></p>
            </div>
            <div className='text-2xl'>
                <p className='flex py-4'><CheckIcon className='w-8 mr-5 text-green-600'  />All of Standard.</p>
                <p className='flex py-4'><CheckIcon className='w-8 mr-5 text-green-600'  />Private Support 24/7.</p>
                <p className='flex py-4'><CheckIcon className='w-8 mr-5 text-green-600'  />Private Training.</p>
                <p className='flex py-4'><CheckIcon className='w-8 mr-5 text-green-600'  />Custom Reports.</p>
                <p className='flex py-4'><CheckIcon className='w-8 mr-5 text-green-600'  />Business Consulting.</p>
                <button className='px-8 py-5 mt-6 text-lg font-medium leading-5 text-center text-white bg-blue-700 hover:bg-blue-800 focus:outline-none md:mx-0 md:w-auto rounded'>Get Started</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;