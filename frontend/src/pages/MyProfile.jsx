import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Activity, 
  Heart, 
  Thermometer, 
  CheckCircle, 
  Edit3, 
  Save, 
  FileText, 
  ShieldAlert,
  HeartPulse,
  Scale,
  Ruler,
  AlertOctagon,
  Sparkles
} from 'lucide-react'

const MyProfile = () => {
  const { userData, setUserData, token, backendurl, loadUserProfileData } = useContext(AppContext)
  
  const [isEdit, setIsEdit] = useState(false)
  const [image, setImage] = useState(false)
  const [checkups, setCheckups] = useState([])
  const [appointments, setAppointments] = useState([])
  const [activeTab, setActiveTab] = useState('profile') // 'profile', 'checkups', 'vitals'

  // Edit states for new fields
  const [editName, setEditName] = useState('')
  const [editPhone, setEditPhone] = useState('')
  const [editGender, setEditGender] = useState('')
  const [editDob, setEditDob] = useState('')
  const [editAddress, setEditAddress] = useState({ line1: '', line2: '' })
  const [editBloodGroup, setEditBloodGroup] = useState('')
  const [editAbhaNumber, setEditAbhaNumber] = useState('')
  const [editHeight, setEditHeight] = useState('')
  const [editWeight, setEditWeight] = useState('')
  const [editAllergies, setEditAllergies] = useState('')

  const fetchProfileLogs = async () => {
    try {
      const [checkupRes, appointmentRes] = await Promise.all([
        axios.get(backendurl + '/api/user/checkups', { headers: { token } }),
        axios.get(backendurl + '/api/user/list-appointment', { headers: { token } })
      ])

      if (checkupRes.data.success) {
        setCheckups(checkupRes.data.checkups)
      }
      if (appointmentRes.data.success) {
        setAppointments(appointmentRes.data.appointments)
      }
    } catch (error) {
      console.log('Error fetching user data logs:', error)
    }
  }

  useEffect(() => {
    if (token) {
      fetchProfileLogs()
    }
  }, [token])

  // Initialize edit fields when user edits or loads
  useEffect(() => {
    if (userData) {
      setEditName(userData.name || '')
      setEditPhone(userData.phone || '')
      setEditGender(userData.gender || 'Not Selected')
      setEditDob(userData.dob || '')
      setEditAddress(userData.address || { line1: '', line2: '' })
      setEditBloodGroup(userData.bloodGroup || 'Not Selected')
      setEditAbhaNumber(userData.abhaNumber || 'Not Selected')
      setEditHeight(userData.height || 'Not Selected')
      setEditWeight(userData.weight || 'Not Selected')
      setEditAllergies(userData.allergies || 'None')
    }
  }, [userData, isEdit])

  const updateUserprofileData = async () => {
    try {
      const formData = new FormData()
      formData.append('name', editName)
      formData.append('phone', editPhone)
      formData.append('address', JSON.stringify(editAddress))
      formData.append('gender', editGender)
      formData.append('dob', editDob)
      formData.append('bloodGroup', editBloodGroup)
      formData.append('abhaNumber', editAbhaNumber)
      formData.append('height', editHeight)
      formData.append('weight', editWeight)
      formData.append('allergies', editAllergies)
      
      if (image) {
        formData.append('image', image)
      }

      const { data } = await axios.post(backendurl + '/api/user/update-profile', formData, { headers: { token } })

      if (data.success) {
        toast.success(data.message)
        await loadUserProfileData()
        setIsEdit(false)
        setImage(false)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return userData && (
    <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6">
      
      {/* 3D-effect Digital Health Card & Header Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8 items-start">
        
        {/* Left Side: SwasthyaSewa Digital Health Card */}
        <div className="lg:col-span-1">
          <div className="relative bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-700 rounded-3xl p-6 text-white shadow-2xl overflow-hidden aspect-[1.58/1] flex flex-col justify-between group hover:scale-[1.02] hover:-rotate-1 transition-all duration-300">
            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-white/5 opacity-20 pointer-events-none"></div>
            
            {/* Card Header */}
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] uppercase font-bold tracking-widest text-indigo-200">National Health Registry</p>
                <h3 className="text-base font-extrabold flex items-center gap-1 mt-0.5">
                  SwasthyaSewa <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                </h3>
              </div>
              <div className="bg-white/10 px-2 py-0.5 rounded border border-white/20 text-[9px] font-bold uppercase tracking-wider">
                ID Card
              </div>
            </div>

            {/* Card Middle: Profile Details */}
            <div className="flex gap-4 items-center my-3">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/40 shadow-inner bg-white flex-shrink-0">
                <img className="w-full h-full object-cover" src={userData.image} alt="avatar" />
              </div>
              <div className="space-y-1 min-w-0">
                <p className="text-sm font-bold truncate tracking-wide">{userData.name}</p>
                <p className="text-[10px] text-indigo-100 font-mono">ABHA: {userData.abhaNumber || '99-8877-6655-44'}</p>
                <p className="text-[9px] bg-white/15 px-2 py-0.5 rounded-full inline-block font-semibold text-emerald-300 border border-white/10">
                  Verified Member
                </p>
              </div>
            </div>

            {/* Card Footer: Metadata and QR Code */}
            <div className="flex justify-between items-end border-t border-white/10 pt-3">
              <div className="grid grid-cols-3 gap-3 text-[9px] font-mono">
                <div>
                  <p className="text-indigo-200 uppercase text-[8px]">Blood</p>
                  <p className="font-bold text-white text-xs mt-0.5">{userData.bloodGroup || 'O+'}</p>
                </div>
                <div>
                  <p className="text-indigo-200 uppercase text-[8px]">Gender</p>
                  <p className="font-bold text-white text-xs mt-0.5">{userData.gender === 'Not Selected' ? 'M/F' : userData.gender[0]}</p>
                </div>
                <div>
                  <p className="text-indigo-200 uppercase text-[8px]">DOB</p>
                  <p className="font-bold text-white text-xs mt-0.5">{userData.dob || '01-01-2000'}</p>
                </div>
              </div>
              
              {/* Custom SVG QR Code for premium aesthetic */}
              <div className="bg-white p-1.5 rounded-lg shadow-md flex-shrink-0">
                <svg className="w-8 h-8 text-gray-900" viewBox="0 0 100 100" fill="currentColor">
                  <rect x="10" y="10" width="20" height="20" />
                  <rect x="70" y="10" width="20" height="20" />
                  <rect x="10" y="70" width="20" height="20" />
                  <rect x="35" y="35" width="30" height="30" />
                  <rect x="15" y="45" width="10" height="10" />
                  <rect x="45" y="15" width="10" height="10" />
                  <rect x="75" y="45" width="10" height="10" />
                  <rect x="45" y="75" width="10" height="10" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Quick Health Metrics & Profile Summary */}
        <div className="lg:col-span-2 bg-white border rounded-3xl p-6 shadow-md flex flex-col justify-between h-full min-h-[220px]">
          <div className="flex justify-between items-center border-b pb-4 mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{userData.name}</h2>
              <p className="text-sm text-gray-500">{userData.email}</p>
            </div>
            <div>
              {isEdit ? (
                <button 
                  onClick={updateUserprofileData}
                  className="bg-primary hover:bg-opacity-90 text-white font-bold px-5 py-2 rounded-xl transition flex items-center gap-1.5 shadow-md text-xs"
                >
                  <Save className="w-3.5 h-3.5" /> Save Changes
                </button>
              ) : (
                <button 
                  onClick={() => setIsEdit(true)}
                  className="border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold px-5 py-2 rounded-xl transition flex items-center gap-1.5 shadow-sm text-xs"
                >
                  <Edit3 className="w-3.5 h-3.5" /> Edit Profile
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-gray-50/50 border rounded-2xl p-3.5 text-center">
              <Activity className="w-5 h-5 text-indigo-500 mx-auto mb-1.5" />
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Blood Group</p>
              <p className="text-base font-extrabold text-gray-800 mt-1">{userData.bloodGroup || 'Not Selected'}</p>
            </div>
            
            <div className="bg-gray-50/50 border rounded-2xl p-3.5 text-center">
              <Ruler className="w-5 h-5 text-violet-500 mx-auto mb-1.5" />
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Height</p>
              <p className="text-base font-extrabold text-gray-800 mt-1">{userData.height || 'Not Selected'}</p>
            </div>

            <div className="bg-gray-50/50 border rounded-2xl p-3.5 text-center">
              <Scale className="w-5 h-5 text-blue-500 mx-auto mb-1.5" />
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Weight</p>
              <p className="text-base font-extrabold text-gray-800 mt-1">{userData.weight || 'Not Selected'}</p>
            </div>

            <div className="bg-gray-50/50 border rounded-2xl p-3.5 text-center">
              <AlertOctagon className="w-5 h-5 text-red-500 mx-auto mb-1.5" />
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Allergies</p>
              <p className="text-xs font-bold text-gray-800 mt-2 truncate px-1">{userData.allergies || 'None'}</p>
            </div>
          </div>
        </div>

      </div>

      {/* Tabs Menu */}
      <div className="flex border-b mb-6 gap-2">
        <button
          onClick={() => setActiveTab('profile')}
          className={`pb-4 px-4 font-bold text-sm transition-all border-b-2 ${
            activeTab === 'profile' 
              ? 'border-primary text-primary' 
              : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}
        >
          General & Health Profile
        </button>
        <button
          onClick={() => setActiveTab('checkups')}
          className={`pb-4 px-4 font-bold text-sm transition-all border-b-2 ${
            activeTab === 'checkups' 
              ? 'border-primary text-primary' 
              : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}
        >
          Symptom Checkups ({checkups.length})
        </button>
      </div>

      {/* Tab Contents Card */}
      <div className="bg-white border rounded-3xl p-6 sm:p-8 shadow-md">
        
        {/* Tab 1: Info Form */}
        {activeTab === 'profile' && (
          <div className="space-y-8">
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 border-b pb-2">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Name */}
                <div className="space-y-1.5">
                  <span className="text-xs text-gray-400 font-semibold flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> Full Name</span>
                  {isEdit ? (
                    <input 
                      type="text" 
                      value={editName} 
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full px-3.5 py-2.5 border rounded-xl outline-none focus:border-primary text-sm bg-gray-50 text-gray-800 focus:bg-white"
                    />
                  ) : (
                    <p className="text-sm font-bold text-gray-800 p-2 bg-gray-50 rounded-xl">{userData.name}</p>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <span className="text-xs text-gray-400 font-semibold flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> Contact Number</span>
                  {isEdit ? (
                    <input 
                      type="text" 
                      value={editPhone} 
                      onChange={(e) => setEditPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 border rounded-xl outline-none focus:border-primary text-sm bg-gray-50 text-gray-800 focus:bg-white"
                    />
                  ) : (
                    <p className="text-sm font-bold text-gray-800 p-2 bg-gray-50 rounded-xl">{userData.phone}</p>
                  )}
                </div>

                {/* Gender */}
                <div className="space-y-1.5">
                  <span className="text-xs text-gray-400 font-semibold flex items-center gap-1.5">Gender</span>
                  {isEdit ? (
                    <select 
                      value={editGender} 
                      onChange={(e) => setEditGender(e.target.value)}
                      className="w-full px-3.5 py-2.5 border rounded-xl outline-none focus:border-primary text-sm bg-gray-50 text-gray-800 focus:bg-white"
                    >
                      <option value="Not Selected">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  ) : (
                    <p className="text-sm font-bold text-gray-800 p-2 bg-gray-50 rounded-xl">{userData.gender}</p>
                  )}
                </div>

                {/* Date of birth */}
                <div className="space-y-1.5">
                  <span className="text-xs text-gray-400 font-semibold flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Date of Birth</span>
                  {isEdit ? (
                    <input 
                      type="date" 
                      value={editDob} 
                      onChange={(e) => setEditDob(e.target.value)}
                      className="w-full px-3.5 py-2.5 border rounded-xl outline-none focus:border-primary text-sm bg-gray-50 text-gray-800 focus:bg-white"
                    />
                  ) : (
                    <p className="text-sm font-bold text-gray-800 p-2 bg-gray-50 rounded-xl">{userData.dob}</p>
                  )}
                </div>

              </div>
            </div>

            {/* Health parameters */}
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 border-b pb-2">Medical Profile</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* ABHA Number */}
                <div className="space-y-1.5">
                  <span className="text-xs text-gray-400 font-semibold flex items-center gap-1.5"><HeartPulse className="w-3.5 h-3.5 text-primary" /> ABHA / Health ID Number</span>
                  {isEdit ? (
                    <input 
                      type="text" 
                      value={editAbhaNumber} 
                      onChange={(e) => setEditAbhaNumber(e.target.value)}
                      placeholder="e.g. 99-8877-6655-44"
                      className="w-full px-3.5 py-2.5 border rounded-xl outline-none focus:border-primary text-sm bg-gray-50 text-gray-800 focus:bg-white"
                    />
                  ) : (
                    <p className="text-sm font-bold text-gray-800 p-2 bg-gray-50 rounded-xl font-mono">{userData.abhaNumber || 'Not Selected'}</p>
                  )}
                </div>

                {/* Blood Group */}
                <div className="space-y-1.5">
                  <span className="text-xs text-gray-400 font-semibold flex items-center gap-1.5">Blood Type</span>
                  {isEdit ? (
                    <select 
                      value={editBloodGroup} 
                      onChange={(e) => setEditBloodGroup(e.target.value)}
                      className="w-full px-3.5 py-2.5 border rounded-xl outline-none focus:border-primary text-sm bg-gray-50 text-gray-800 focus:bg-white"
                    >
                      <option value="Not Selected">Select Blood Group</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  ) : (
                    <p className="text-sm font-bold text-gray-800 p-2 bg-gray-50 rounded-xl">{userData.bloodGroup || 'Not Selected'}</p>
                  )}
                </div>

                {/* Height */}
                <div className="space-y-1.5">
                  <span className="text-xs text-gray-400 font-semibold flex items-center gap-1.5"><Ruler className="w-3.5 h-3.5" /> Height</span>
                  {isEdit ? (
                    <input 
                      type="text" 
                      value={editHeight} 
                      onChange={(e) => setEditHeight(e.target.value)}
                      placeholder="e.g. 175 cm or 5ft 9in"
                      className="w-full px-3.5 py-2.5 border rounded-xl outline-none focus:border-primary text-sm bg-gray-50 text-gray-800 focus:bg-white"
                    />
                  ) : (
                    <p className="text-sm font-bold text-gray-800 p-2 bg-gray-50 rounded-xl">{userData.height || 'Not Selected'}</p>
                  )}
                </div>

                {/* Weight */}
                <div className="space-y-1.5">
                  <span className="text-xs text-gray-400 font-semibold flex items-center gap-1.5"><Scale className="w-3.5 h-3.5" /> Weight</span>
                  {isEdit ? (
                    <input 
                      type="text" 
                      value={editWeight} 
                      onChange={(e) => setEditWeight(e.target.value)}
                      placeholder="e.g. 70 kg"
                      className="w-full px-3.5 py-2.5 border rounded-xl outline-none focus:border-primary text-sm bg-gray-50 text-gray-800 focus:bg-white"
                    />
                  ) : (
                    <p className="text-sm font-bold text-gray-800 p-2 bg-gray-50 rounded-xl">{userData.weight || 'Not Selected'}</p>
                  )}
                </div>

                {/* Allergies */}
                <div className="space-y-1.5 md:col-span-2">
                  <span className="text-xs text-gray-400 font-semibold flex items-center gap-1.5"><AlertOctagon className="w-3.5 h-3.5" /> Known Allergies / Conditions</span>
                  {isEdit ? (
                    <textarea 
                      value={editAllergies} 
                      onChange={(e) => setEditAllergies(e.target.value)}
                      placeholder="e.g. Penicillin, Peanuts, Pollen"
                      className="w-full px-3.5 py-2.5 border rounded-xl outline-none focus:border-primary text-sm bg-gray-50 text-gray-800 focus:bg-white h-20"
                    />
                  ) : (
                    <p className="text-sm font-bold text-gray-800 p-2.5 bg-gray-50 rounded-xl min-h-[44px]">{userData.allergies || 'None'}</p>
                  )}
                </div>

              </div>
            </div>

            {/* Address */}
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 border-b pb-2">Address Details</h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-1.5">
                  <span className="text-xs text-gray-400 font-semibold flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Address Line 1</span>
                  {isEdit ? (
                    <input 
                      type="text" 
                      value={editAddress.line1} 
                      onChange={(e) => setEditAddress(prev => ({ ...prev, line1: e.target.value }))}
                      className="w-full px-3.5 py-2.5 border rounded-xl outline-none focus:border-primary text-sm bg-gray-50 text-gray-800 focus:bg-white"
                    />
                  ) : (
                    <p className="text-sm font-bold text-gray-800 p-2 bg-gray-50 rounded-xl">{userData.address?.line1 || ' '}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <span className="text-xs text-gray-400 font-semibold flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Address Line 2</span>
                  {isEdit ? (
                    <input 
                      type="text" 
                      value={editAddress.line2} 
                      onChange={(e) => setEditAddress(prev => ({ ...prev, line2: e.target.value }))}
                      className="w-full px-3.5 py-2.5 border rounded-xl outline-none focus:border-primary text-sm bg-gray-50 text-gray-800 focus:bg-white"
                    />
                  ) : (
                    <p className="text-sm font-bold text-gray-800 p-2 bg-gray-50 rounded-xl">{userData.address?.line2 || ' '}</p>
                  )}
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Checkup Logs */}
        {activeTab === 'checkups' && (
          <div className="space-y-4">
            {checkups.length === 0 ? (
              <div className="text-center py-10 text-gray-400">
                <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p className="font-semibold text-sm">No health assessment logs found.</p>
                <p className="text-xs text-gray-500 mt-1">Complete an Online Checkup from the homepage to log your symptoms.</p>
              </div>
            ) : (
              checkups.map((checkup) => (
                <div key={checkup._id} className="border border-gray-150 rounded-2xl p-5 hover:border-primary/20 transition-all">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Report Assessment</p>
                      <p className="text-sm font-bold text-gray-800 mt-0.5">{new Date(checkup.date || checkup.createdAt).toLocaleDateString()} at {new Date(checkup.date || checkup.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border uppercase ${
                      checkup.severity === 'High' ? 'bg-red-50 text-red-600 border-red-200' :
                      checkup.severity === 'Medium' ? 'bg-yellow-50 text-yellow-600 border-yellow-200' :
                      'bg-green-50 text-green-600 border-green-200'
                    }`}>
                      {checkup.severity} Risk
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mt-4 border-t pt-4">
                    <div>
                      <p className="text-gray-400 font-semibold">Reported Symptoms</p>
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {checkup.symptoms?.map((s, i) => (
                          <span key={i} className="px-2.5 py-1 bg-indigo-50 border border-indigo-100 text-primary font-semibold rounded-full text-[10px]">{s}</span>
                        )) || 'None'}
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-gray-400 font-semibold mb-1.5">Recorded Vitals</p>
                      <div className="grid grid-cols-3 gap-2 bg-gray-50 p-2.5 rounded-xl border text-center font-mono">
                        <div>
                          <span className="text-[10px] text-gray-400 block">Temp</span>
                          <span className="font-bold text-gray-700 mt-0.5 block">{checkup.temperature || 'N/A'}°F</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-gray-400 block">Pulse</span>
                          <span className="font-bold text-gray-700 mt-0.5 block">{checkup.heartRate || 'N/A'} bpm</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-gray-400 block">BP</span>
                          <span className="font-bold text-gray-700 mt-0.5 block">{checkup.bloodPressure || 'N/A'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 bg-gray-50 p-3.5 rounded-xl border text-xs leading-relaxed text-gray-600">
                    <p className="font-bold text-gray-700 mb-1">AI Recommendation:</p>
                    <p className="mb-2"><strong>Recommended Specialization:</strong> {checkup.recommendedSpecialty}</p>
                    <p>{checkup.advice}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  )
}

export default MyProfile