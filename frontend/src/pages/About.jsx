import React from 'react';
import { assets } from '../assets/assets_frontend/assets';

const About = () => {
  return (
    <div>
      {/* Heading */}
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p> ABOUT <span className='text-gray-700 font-medium'>US</span></p>
      </div>

      {/* About Section */}
      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img className="w-full md:max-w-[360px]" src={assets.about_image} alt="" />
        
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
          <p>
            Welcome to <b className="text-gray-800">SwasthyaSewa</b>, your trusted digital healthcare companion.
            We aim to simplify how you connect with doctors, book appointments, and manage your wellness—all in one place.
          </p>
          <p>
            At SwasthyaSewa, we believe healthcare should be simple, smart, and accessible. Whether you're consulting for the first time or tracking long-term care,
            our intuitive platform supports you with efficiency and ease.
          </p>
          <b className='text-gray-800'>Our Vision</b>
          <p>
            Our vision is to empower patients and providers through technology-driven care.
            We strive to build a connected ecosystem where your health is always within reach.
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div>
        <p className='text-center text-xl font-semibold text-gray-600 mb-10'>
          WHY <span className='text-gray-700 font-bold'>CHOOSE US</span>
        </p>
        <div className='flex flex-col md:flex-row mb-20'>
          
          <div className='border px-10 md:px-16 py-16 flex flex-col gap-5 text-[15px] hover:bg-primary text-gray-600 hover:text-white transition-all duration-150 cursor-pointer'>
            <b>Efficiency:</b>
            <p>Instant appointment scheduling tailored to your lifestyle.</p>
          </div>

          <div className='border px-10 md:px-16 py-16 flex flex-col gap-5 text-[15px] hover:bg-primary text-gray-600 hover:text-white transition-all duration-150 cursor-pointer'>
            <b>Convenience:</b>
            <p>Find verified doctors in your area and connect anytime, anywhere.</p>
          </div>

          <div className='border px-10 md:px-16 py-16 flex flex-col gap-5 text-[15px] hover:bg-primary text-gray-600 hover:text-white transition-all duration-150 cursor-pointer'>
            <b>Personalization:</b>
            <p>Smart suggestions and reminders based on your health needs.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;