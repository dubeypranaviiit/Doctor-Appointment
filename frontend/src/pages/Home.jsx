import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
import { Stethoscope, ArrowRight, ShieldCheck } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate();

  return (
    <div className="space-y-12">
      <Header/>
      <SpecialityMenu/>
      
      {/* Online Checkup Promo Card */}
      <div className="bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300">
        <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-10 pointer-events-none hidden md:block">
          <Stethoscope className="w-full h-full scale-110" />
        </div>
        <div className="max-w-xl space-y-5 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-white/10 rounded-full backdrop-blur-sm border border-white/20 text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> New: AI Symptom Assessment
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Complete a Quick Online Checkup Before You Book
          </h2>
          <p className="text-white/80 leading-relaxed text-sm sm:text-base">
            Not sure which specialist to consult? Our smart symptom checker evaluates your health logs and vitals to instantly recommend the right clinical department.
          </p>
          <div className="pt-2">
            <button 
              onClick={() => { navigate('/online-checkup'); scrollTo(0,0); }}
              className="bg-white text-indigo-600 font-bold px-8 py-3.5 rounded-full hover:bg-opacity-95 hover:scale-105 active:scale-95 transition flex items-center gap-2 shadow-lg"
            >
              Start Checkup <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <TopDoctors />
      <Banner/>
    </div>
  )
}

export default Home