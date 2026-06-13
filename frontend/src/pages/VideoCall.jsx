import React, { useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import {
  StreamVideoClient,
  StreamVideo,
  StreamCall,
  CallingState,
  ParticipantView,
  useCallStateHooks,
  useCall,
} from '@stream-io/video-react-sdk'
import '@stream-io/video-react-sdk/dist/css/styles.css'
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  PhoneOff,
  Clock,
  Activity,
  Heart,
  Thermometer,
  MessageSquare,
  Sparkles,
} from 'lucide-react'

/* ─────────────── Inner Call UI (rendered inside StreamCall) ─────────────── */
const CallUI = ({ isDoctor, callDetails, parseDocData, onEndCall }) => {
  const {
    useParticipants,
    useLocalParticipant,
    useRemoteParticipants,
    useCallCallingState,
    useCameraState,
    useMicrophoneState,
  } = useCallStateHooks()

  const callingState       = useCallCallingState()
  const participants       = useParticipants()
  const localParticipant   = useLocalParticipant()
  const remoteParticipants = useRemoteParticipants()
  const { camera, isMute: isCameraOff }    = useCameraState()
  const { microphone, isMute: isMicMuted } = useMicrophoneState()

  const [callDuration, setCallDuration] = useState(0)

  const isJoined = callingState === CallingState.JOINED
  const docInfo  = parseDocData(callDetails?.docData)

  /* ── Timer ── */
  useEffect(() => {
    if (!isJoined) return
    const timer = setInterval(() => setCallDuration((p) => p + 1), 1000)
    return () => clearInterval(timer)
  }, [isJoined])

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0')
    const s = (secs % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  /* ── Camera / Mic toggles ── */
  const toggleMic = useCallback(async () => {
    try { await microphone.toggle() } catch (e) { console.warn('Mic toggle failed', e) }
  }, [microphone])

  const toggleVideo = useCallback(async () => {
    try { await camera.toggle() } catch (e) { console.warn('Camera toggle failed', e) }
  }, [camera])

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col overflow-hidden font-sans">
      {/* ── Header ── */}
      <header className="bg-gray-900/60 backdrop-blur-md border-b border-gray-800 px-6 py-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-sm tracking-tight">SwasthyaSewa Consultation</h1>
            <p className="text-[10px] text-gray-400">Secure P2P Encrypted Session</p>
          </div>
        </div>

        {isJoined && (
          <div className="flex items-center gap-2 px-3.5 py-1.5 bg-gray-800 rounded-full border border-gray-700 text-xs font-semibold">
            <Clock className="w-4 h-4 text-emerald-500 animate-pulse" />
            <span className="font-mono text-emerald-400">{formatTime(callDuration)}</span>
          </div>
        )}

        <div className="flex items-center gap-2">
          <span className={`h-2.5 w-2.5 rounded-full ${isJoined ? 'bg-emerald-500 animate-ping' : 'bg-amber-500'}`} />
          <span className="text-xs font-semibold text-gray-300">
            {isJoined
              ? `Active Call · ${participants.length} participant${participants.length !== 1 ? 's' : ''}`
              : callingState === CallingState.JOINING
                ? 'Connecting…'
                : 'Waiting'}
          </span>
        </div>
      </header>

      {/* ── Main Content ── */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-4 p-6 gap-6 min-h-0 overflow-y-auto">
        {/* Video Grid (3 cols) */}
        <section className="lg:col-span-3 flex flex-col gap-4 min-h-[480px]">
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-2xl overflow-hidden bg-gray-900 border border-gray-800 relative p-4">

            {/* ── Remote Participant ── */}
            <div className="bg-gray-950 rounded-xl overflow-hidden border border-gray-800 relative flex items-center justify-center min-h-[280px]">
              {remoteParticipants.length > 0 ? (
                <div className="absolute inset-0 [&_video]:w-full [&_video]:h-full [&_video]:object-cover">
                  <ParticipantView
                    participant={remoteParticipants[0]}
                    trackType="videoTrack"
                  />
                </div>
              ) : (
                <div className="text-center p-8 max-w-sm space-y-4">
                  <div className="w-20 h-20 bg-indigo-500/10 border border-indigo-500/20 rounded-full flex items-center justify-center mx-auto overflow-hidden">
                    <img
                      src={isDoctor ? callDetails?.userData?.image || 'https://via.placeholder.com/150' : docInfo.image}
                      alt="Waiting for peer"
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  </div>
                  <h3 className="text-base font-bold">
                    {isDoctor ? callDetails?.userData?.name : `Dr. ${docInfo.name}`}
                  </h3>
                  <p className="text-xs text-gray-400">Waiting for them to join the call…</p>
                  <div className="flex items-center justify-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0ms]" />
                    <span className="h-2 w-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:150ms]" />
                    <span className="h-2 w-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              )}
              <div className="absolute bottom-4 left-4 bg-gray-900/80 px-3 py-1.5 rounded-lg text-xs font-semibold border border-gray-800 z-10">
                {isDoctor ? `Patient: ${callDetails?.userData?.name || ''}` : `Dr. ${docInfo.name}`}
              </div>
            </div>

            {/* ── Local Participant (Self) ── */}
            <div className="bg-gray-950 rounded-xl overflow-hidden border border-gray-800 relative flex items-center justify-center min-h-[280px]">
              {localParticipant ? (
                <div className="absolute inset-0 [&_video]:w-full [&_video]:h-full [&_video]:object-cover">
                  <ParticipantView
                    participant={localParticipant}
                    trackType="videoTrack"
                  />
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto text-gray-500">
                    <VideoOff className="w-8 h-8" />
                  </div>
                  <p className="text-xs text-gray-400 mt-3 font-medium">Connecting camera…</p>
                </div>
              )}
              <div className="absolute bottom-4 left-4 bg-gray-900/80 px-3 py-1.5 rounded-lg text-xs font-semibold border border-gray-800 z-10">
                You (Self Preview)
              </div>
            </div>
          </div>

          {/* ── Controls Bar ── */}
          <div className="flex items-center justify-center gap-4 bg-gray-900 border border-gray-800 rounded-2xl p-4">
            <button
              onClick={toggleMic}
              className={`p-4 rounded-xl border transition-all ${
                isMicMuted ? 'bg-red-500/10 border-red-500/20 text-red-500' : 'bg-gray-800 border-gray-700 hover:bg-gray-700 text-gray-200'
              }`}
            >
              {isMicMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            </button>

            <button
              onClick={toggleVideo}
              className={`p-4 rounded-xl border transition-all ${
                isCameraOff ? 'bg-red-500/10 border-red-500/20 text-red-500' : 'bg-gray-800 border-gray-700 hover:bg-gray-700 text-gray-200'
              }`}
            >
              {isCameraOff ? <VideoOff className="w-6 h-6" /> : <Video className="w-6 h-6" />}
            </button>

            <button
              onClick={onEndCall}
              className="p-4 rounded-xl bg-red-600 border border-red-500 text-white hover:bg-red-700 transition shadow-lg flex items-center gap-2 font-bold text-sm"
            >
              <PhoneOff className="w-6 h-6" /> {isDoctor ? 'End Consultation' : 'Leave Call'}
            </button>
          </div>
        </section>

        {/* ── Sidebar ── */}
        <aside className="space-y-6 overflow-y-auto">
          {callDetails?.userData && (
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 shadow-lg space-y-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-indigo-400" /> Patient Medical File
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between border-b border-gray-800 pb-2 text-xs">
                  <span className="text-gray-400">Name</span>
                  <span className="font-semibold">{callDetails.userData.name}</span>
                </div>
                <div className="flex justify-between border-b border-gray-800 pb-2 text-xs">
                  <span className="text-gray-400">Blood Group</span>
                  <span className="font-semibold text-red-400">{callDetails.userData.bloodGroup || 'Not Selected'}</span>
                </div>
                <div className="flex justify-between border-b border-gray-800 pb-2 text-xs">
                  <span className="text-gray-400">Gender | Age</span>
                  <span className="font-semibold">
                    {callDetails.userData.gender} |{' '}
                    {callDetails.userData.dob ? new Date().getFullYear() - new Date(callDetails.userData.dob).getFullYear() : 'N/A'} yrs
                  </span>
                </div>
              </div>
              <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-3.5 space-y-1">
                <p className="text-[10px] text-red-400 font-bold uppercase tracking-wider">Known Allergies</p>
                <p className="text-xs font-semibold text-gray-300">{callDetails.userData.allergies || 'None reported'}</p>
              </div>
            </div>
          )}

          {callDetails?.userData && (
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 shadow-lg space-y-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-emerald-400" /> Connected Checkup Log
              </h3>
              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-3 gap-2 bg-gray-950 border border-gray-800 p-2.5 rounded-xl text-center">
                  <div>
                    <span className="text-[10px] text-gray-400 block">Temp</span>
                    <span className="font-bold text-emerald-400 mt-0.5 block flex items-center justify-center gap-0.5">
                      <Thermometer className="w-3 h-3" /> 98.6°F
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 block">Pulse</span>
                    <span className="font-bold text-emerald-400 mt-0.5 block flex items-center justify-center gap-0.5">
                      <Heart className="w-3 h-3" /> 72 bpm
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 block">BP</span>
                    <span className="font-bold text-emerald-400 mt-0.5 block">120/80</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Logged Symptoms</p>
                  <p className="text-xs text-gray-300 font-medium leading-relaxed">Fever, cough, mild headache over past 3 days.</p>
                </div>
              </div>
            </div>
          )}
        </aside>
      </main>
    </div>
  )
}

/* ─────────────── Outer Component (client setup & cleanup) ─────────────── */
const VideoCall = () => {
  const { appointmentId } = useParams()
  const navigate = useNavigate()

  /* ── Auth ── */
  const queryParams = new URLSearchParams(window.location.search)
  const urlDToken   = queryParams.get('dToken')
  const userToken   = localStorage.getItem('token')
  const isDoctor    = !!urlDToken
  const authHeaders = isDoctor ? { dtoken: urlDToken } : { token: userToken }

  const [client, setClient]           = useState(null)
  const [call, setCall]               = useState(null)
  const [callDetails, setCallDetails] = useState(null)
  const [loading, setLoading]         = useState(true)
  const [error, setError]             = useState(null)

  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'

  /* ── Parse docData helper ── */
  const parseDocData = useCallback((docDataStr) => {
    if (!docDataStr) return { name: 'Doctor', image: 'https://via.placeholder.com/150' }
    if (typeof docDataStr === 'object') return docDataStr
    try { return JSON.parse(docDataStr) } catch {
      const nameMatch  = docDataStr.match(/name:\s*'([^']+)'/) || docDataStr.match(/name:\s*"([^"]+)"/)
      const imageMatch = docDataStr.match(/image:\s*'([^']+)'/) || docDataStr.match(/image:\s*"([^"]+)"/)
      return {
        name:  nameMatch  ? nameMatch[1]  : 'Doctor',
        image: imageMatch ? imageMatch[1] : 'https://via.placeholder.com/150',
      }
    }
  }, [])

  /* ── Setup Stream Video Client + Join Call ── */
  useEffect(() => {
    let videoClient = null
    let videoCall   = null
    let cancelled   = false

    const setup = async () => {
      try {
        /* 1. Fetch call metadata */
        const detailsRes = await axios.get(
          `${backendUrl}/api/video/call-details/${appointmentId}`,
          { headers: authHeaders }
        )
        if (!detailsRes.data.success) {
          toast.error('Failed to load call details')
          navigate('/')
          return
        }
        if (cancelled) return
        setCallDetails(detailsRes.data)

        /* 2. Fetch Stream token + apiKey + userId */
        const tokenRes = await axios.get(`${backendUrl}/api/video/token`, { headers: authHeaders })
        if (!tokenRes.data.success) {
          toast.error('Failed to get video token')
          setError('Token generation failed')
          return
        }
        if (cancelled) return

        const { token: streamToken, apiKey, userId } = tokenRes.data

        /* 3. Create Stream Video Client */
        const user = { id: userId, type: 'authenticated' }
        videoClient = new StreamVideoClient({ apiKey, user, token: streamToken })
        setClient(videoClient)

        /* 4. Create / Join the call room */
        const callId = detailsRes.data.videoCallId
        videoCall = videoClient.call('default', callId)
        await videoCall.join({ create: true })
        if (cancelled) return
        setCall(videoCall)

        /* 5. Enable camera + mic after joining */
        try { await videoCall.camera.enable() } catch (e) {
          console.warn('Camera enable failed:', e.message)
        }
        try { await videoCall.microphone.enable() } catch (e) {
          console.warn('Microphone enable failed:', e.message)
        }

      } catch (err) {
        console.error('Video call setup error:', err)
        if (!cancelled) {
          setError(err.message || 'Failed to connect')
          toast.error('Error connecting to video service: ' + (err.message || ''))
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    setup()

    return () => {
      cancelled = true
      if (videoCall) videoCall.leave().catch(console.error)
      if (videoClient) videoClient.disconnectUser().catch(console.error)
    }
  }, [appointmentId])

  /* ── End / Leave Call ── */
  const endCall = useCallback(async () => {
    try {
      if (isDoctor) {
        await axios.post(
          `${backendUrl}/api/video/end-call`,
          { appointmentId },
          { headers: { dtoken: urlDToken } }
        )
        toast.success('Consultation ended & appointment marked as completed')
      } else {
        toast.info('You have left the call')
      }
      if (call) await call.leave()
      if (client) await client.disconnectUser()
      navigate(isDoctor ? '/doctor-appointments' : '/my-appointment')
    } catch (err) {
      console.error('End call error:', err)
      navigate('/')
    }
  }, [call, client, isDoctor, appointmentId, urlDToken, backendUrl, navigate])

  /* ── Loading ── */
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent" />
        <p className="text-sm font-semibold tracking-wider uppercase text-gray-400">Connecting to Secure Room…</p>
      </div>
    )
  }

  /* ── Error ── */
  if (error || !client || !call) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white space-y-4">
        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center border border-red-500/20">
          <VideoOff className="w-8 h-8 text-red-400" />
        </div>
        <p className="text-lg font-bold text-red-400">Failed to connect to video service</p>
        <p className="text-xs text-gray-400 max-w-md text-center">
          {error || 'Could not establish the video call. Check Stream.io keys and try again.'}
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 rounded-xl text-sm font-semibold transition"
        >
          Go Back
        </button>
      </div>
    )
  }

  /* ── Render with Stream Providers ── */
  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <CallUI
          isDoctor={isDoctor}
          callDetails={callDetails}
          parseDocData={parseDocData}
          onEndCall={endCall}
        />
      </StreamCall>
    </StreamVideo>
  )
}

export default VideoCall
