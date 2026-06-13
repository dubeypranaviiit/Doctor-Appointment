import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

function Contact() {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p> CONTACT <span className='text-gray-700 font-medium'>US</span></p>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-10 mb-28 text-sm'>
        
        <img className="w-full md:max-w-[360px]" src={assets.contact_image} alt="Contact SwasthyaSewa" />

        <div className='flex flex-col justify-center items-start gap-6 md:w-2/4 text-gray-600'>
          
          <p className='font-semibold text-lg text-gray-600'>Our Office</p>
          <p className='text-gray-500'>
            Booty More, Ranchi <br />
            Jharkhand, India
          </p>

          <p className='text-gray-500'>
            Tel: +91 80925996** <br />
            Email: support@swasthyasewa.com
          </p>

          <p className='font-semibold text-lg text-gray-600'>Careers at SwasthyaSewa</p>
          <p className='text-gray-500'>
            Join our growing healthcare technology team and help shape the future of digital healthcare.
          </p>

          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-300'>
            Explore Careers
          </button>

        </div>
      </div>
    </div>
  )
}

export default Contact