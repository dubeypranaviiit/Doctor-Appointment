import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'

const DoctorProfile = () => {
  const { dToken, profileData, getProfile, updateProfile } = useContext(DoctorContext)
  const { currency } = useContext(AppContext)
  
  const [isEdit, setIsEdit] = useState(false)
  
  // Form fields
  const [fees, setFees] = useState('')
  const [about, setAbout] = useState('')
  const [available, setAvailable] = useState(false)
  const [address, setAddress] = useState({ line1: '', line2: '' })

  useEffect(() => {
    if (dToken) {
      getProfile()
    }
  }, [dToken])

  useEffect(() => {
    if (profileData) {
      setFees(profileData.fees)
      setAbout(profileData.about)
      setAvailable(profileData.available)
      
      // Handle address (could be object or string representation)
      if (profileData.address) {
        if (typeof profileData.address === 'object') {
          setAddress({
            line1: profileData.address.line1 || '',
            line2: profileData.address.line2 || ''
          })
        } else {
          try {
            const parsed = JSON.parse(profileData.address)
            setAddress({
              line1: parsed.line1 || '',
              line2: parsed.line2 || ''
            })
          } catch (e) {
            setAddress({ line1: profileData.address, line2: '' })
          }
        }
      }
    }
  }, [profileData])

  const handleSave = async () => {
    await updateProfile({
      fees,
      about,
      available,
      address
    })
    setIsEdit(false)
  }

  return profileData && (
    <div className='m-5 w-full max-w-4xl'>
      <div className='bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col md:flex-row gap-8 p-8'>
        
        {/* Left Side: Avatar */}
        <div className='flex flex-col items-center md:items-start gap-4'>
          <img 
            className='w-48 h-48 rounded-2xl object-cover border-4 border-indigo-50 shadow-md bg-indigo-50/50' 
            src={profileData.image} 
            alt={profileData.name} 
          />
          
          <div className='flex items-center gap-2 mt-2'>
            <input 
              type="checkbox" 
              id="available" 
              checked={available}
              disabled={!isEdit}
              onChange={(e) => setAvailable(e.target.checked)}
              className='w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer disabled:opacity-75'
            />
            <label htmlFor="available" className='text-sm font-semibold text-gray-700 cursor-pointer'>
              Available for Booking
            </label>
          </div>
        </div>

        {/* Right Side: Profile Info */}
        <div className='flex-1 flex flex-col gap-5'>
          {/* Header Info */}
          <div>
            <h1 className='text-2xl font-bold text-gray-800 flex items-center gap-2'>
              Dr. {profileData.name}
            </h1>
            <p className='text-sm text-gray-500 font-medium mt-1'>
              {profileData.degree} - {profileData.speciality}
            </p>
            <div className='inline-block bg-indigo-50/70 border border-indigo-100 text-indigo-600 text-[11px] font-bold px-2.5 py-0.5 rounded-full mt-2 uppercase tracking-wide'>
              {profileData.experience} Experience
            </div>
          </div>

          <hr className='border-gray-100' />

          {/* About Section */}
          <div>
            <h2 className='text-sm font-bold text-gray-700 uppercase tracking-wider mb-2'>About</h2>
            {isEdit ? (
              <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                rows={4}
                className='w-full border border-gray-200 rounded-lg p-3 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500'
              />
            ) : (
              <p className='text-sm text-gray-600 leading-relaxed'>{about}</p>
            )}
          </div>

          {/* Consultation Fees */}
          <div>
            <h2 className='text-sm font-bold text-gray-700 uppercase tracking-wider mb-2'>Consultation Fees</h2>
            {isEdit ? (
              <div className='flex items-center gap-2 max-w-[160px]'>
                <span className='text-gray-500 font-semibold'>{currency}</span>
                <input
                  type="number"
                  value={fees}
                  onChange={(e) => setFees(e.target.value)}
                  className='w-full border border-gray-200 rounded-lg p-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500'
                />
              </div>
            ) : (
              <p className='text-base font-semibold text-gray-800'>
                {currency} {fees}
              </p>
            )}
          </div>

          {/* Clinic Address */}
          <div>
            <h2 className='text-sm font-bold text-gray-700 uppercase tracking-wider mb-2'>Clinic Address</h2>
            {isEdit ? (
              <div className='flex flex-col gap-2 max-w-md'>
                <input
                  type="text"
                  placeholder="Address Line 1"
                  value={address.line1}
                  onChange={(e) => setAddress({ ...address, line1: e.target.value })}
                  className='border border-gray-200 rounded-lg p-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500'
                />
                <input
                  type="text"
                  placeholder="Address Line 2"
                  value={address.line2}
                  onChange={(e) => setAddress({ ...address, line2: e.target.value })}
                  className='border border-gray-200 rounded-lg p-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500'
                />
              </div>
            ) : (
              <div className='text-sm text-gray-600'>
                <p>{address.line1}</p>
                <p className='mt-0.5'>{address.line2}</p>
              </div>
            )}
          </div>

          <hr className='border-gray-100 mt-2' />

          {/* Action Buttons */}
          <div className='flex gap-3 justify-end mt-2'>
            {isEdit ? (
              <>
                <button
                  onClick={() => setIsEdit(false)}
                  className='px-6 py-2 rounded-xl text-sm font-semibold border border-gray-200 text-gray-500 hover:bg-gray-50 transition-all'
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className='px-6 py-2 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all'
                >
                  Save Changes
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEdit(true)}
                className='px-6 py-2 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all'
              >
                Edit Profile
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  )
}

export default DoctorProfile