// import React from 'react'
// import {assets} from "../assets/assets_frontend/assets"
// function Header() {
//   return (
//     <div className=' flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20 '>
// {/* left side */}
//  <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>
// <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight'>Book Appoinmtment <br/> With Trusted Doctors</p>
//  <div className='flex flex-col md:flex-row items-center gap-3 text-sm font-light'>
//   <img className ="w-28 " src={assets.group_profiles} alt="Group Profile" />
  
//   <h3 color='w-28'></h3>
//   <p>Simply browse through our extensive list of trusted doctors, <br className='hidden sm:block'/>
//   schedule your appointment hassle-free</p>
//  </div>
//  <a className="flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover-scale-105 transition-all duration-300" href="#speciality"> 
//  Book Appoinmtment <img className='w-3' src={assets.arrow_icon} alt="arrow icon" />
//  </a>
//  </div>

//  {/* right side */}
//  <div className='md:w-1/2 relative'>
//  <img  className="w-full md:absolute bottom-0 h-auto rounded-lg " src={assets.header_img} alt="" />
//  </div>

//     </div>
//   )
// }

// export default Header
'use client';

import React from "react";
import { ArrowRight, Calendar, Heart, Stethoscope, Activity, Baby, Zap, Users } from "lucide-react";
import { assets } from "../assets/assets_frontend/assets";

import { useNavigate } from 'react-router-dom';

export default function HeroBanner() {
  const navigate = useNavigate();
  return (
    <section className="bg-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <div className="space-y-6">

          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
            <Calendar className="w-4 h-4 text-primary mr-2" />
            <span className="text-sm font-medium text-primary">
              Book appointment instantly
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
            Book Appointment <br />
            <span className="text-primary">
              With Trusted Doctors
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg text-gray-600">
            Simply browse through our extensive list of trusted doctors,
            check availability in real-time and schedule your appointment hassle-free.
          </p>

          {/* Group image */}
          <img className="w-40" src={assets.group_profiles} alt="Doctors" />

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button 
              onClick={() => { navigate('/doctors'); scrollTo(0,0); }}
              className="px-8 py-3.5 bg-primary text-white font-bold rounded-full hover:bg-opacity-95 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
            >
              Book Appointment
              <ArrowRight className="w-4 h-4" />
            </button>

            <button 
              onClick={() => { navigate('/doctors'); scrollTo(0,0); }}
              className="px-8 py-3.5 border border-gray-300 text-gray-700 font-bold rounded-full hover:bg-gray-50 active:scale-95 transition-all duration-300 flex items-center justify-center shadow-sm"
            >
              Explore Doctors
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
            <div className="flex gap-3">
              <Users className="w-5 h-5 text-primary mt-1" />
              <div>
                <p className="font-semibold">Multiple doctors</p>
                <p className="text-sm text-gray-500">Choose from specialists</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Calendar className="w-5 h-5 text-primary mt-1" />
              <div>
                <p className="font-semibold">Real-time slots</p>
                <p className="text-sm text-gray-500">See open timings instantly</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="relative">
          <img
            className="w-full rounded-xl shadow-lg"
            src={assets.header_img}
            alt="Doctor consultation"
          />

          {/* Services Card */}
          <div className="hidden lg:block absolute -bottom-10 left-10 bg-white border rounded-2xl shadow-xl p-6 w-[80%]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Our Services</h3>
              <Stethoscope className="w-5 h-5 text-primary" />
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex gap-2 items-center">
                <Heart className="w-4 h-4 text-primary" /> Cardiology
              </div>
              <div className="flex gap-2 items-center">
                <Activity className="w-4 h-4 text-primary" /> General
              </div>
              <div className="flex gap-2 items-center">
                <Baby className="w-4 h-4 text-primary" /> Pediatrics
              </div>
              <div className="flex gap-2 items-center">
                <Zap className="w-4 h-4 text-primary" /> Orthopedics
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="max-w-7xl mx-auto mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div>
          <p className="text-3xl font-bold text-primary">25+</p>
          <p className="text-gray-500">Expert doctors</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-primary">4.9★</p>
          <p className="text-gray-500">Average rating</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-primary">15K+</p>
          <p className="text-gray-500">Happy patients</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-primary">Same day</p>
          <p className="text-gray-500">Appointments</p>
        </div>
      </div>
    </section>
  );
}