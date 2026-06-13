import React, { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Bot, Sparkles, User, HelpCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      sender: 'bot', 
      text: 'Namaste! Welcome to SwasthyaSewa. How can I assist you with your health or bookings today?' 
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const chatEndRef = useRef(null)
  const navigate = useNavigate()

  const quickActions = [
    { label: 'Book Appointment', action: 'book' },
    { label: 'Symptom Checker', action: 'symptoms' },
    { label: 'Refund Policies', action: 'refunds' },
    { label: 'Contact Support', action: 'contact' }
  ]

  const handleQuickAction = (action) => {
    let userMsg = ''
    let botResponse = ''
    
    if (action === 'book') {
      userMsg = 'How do I book a doctor appointment?'
      botResponse = 'Booking is simple! Head to the "ALL DOCTORS" page, choose a specialist, select an available date and time slot, and click "Book an appointment". You can pay online using UPI/Cards via Razorpay.'
    } else if (action === 'symptoms') {
      userMsg = 'Tell me about the Symptom Checker.'
      botResponse = 'Our AI Symptom Checker helps analyze your symptoms, logs vital signs like temperature and BP, estimates severity risk, and recommends which medical specialty to consult. You can access it via the "ONLINE CHECKUP" nav menu.'
    } else if (action === 'refunds') {
      userMsg = 'What is your refund policy?'
      botResponse = 'Refunds are automatically initiated if you cancel your appointment at least 2 hours prior to the slot. The refunded amount will be credited back to your original payment method via Razorpay within 5-7 working days.'
    } else if (action === 'contact') {
      userMsg = 'How do I reach clinic support?'
      botResponse = 'You can reach us at support@swasthyasewa.com or call +91 8092599674. Our office is located at Booty More, Ranchi, Jharkhand, India.'
    }

    setMessages(prev => [
      ...prev,
      { id: Date.now(), sender: 'user', text: userMsg }
    ])

    setIsTyping(true)
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { id: Date.now() + 1, sender: 'bot', text: botResponse }
      ])
      setIsTyping(false)
    }, 800)
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!inputText.trim()) return

    const userText = inputText.trim()
    setMessages(prev => [
      ...prev,
      { id: Date.now(), sender: 'user', text: userText }
    ])
    setInputText('')
    setIsTyping(true)

    // Keywords rule-based bot reply
    setTimeout(() => {
      let botResponse = "I'm here to help, but I couldn't quite understand that. You can ask me about scheduling appointments, checking symptoms, payments/refunds, or contact support."
      const lowerText = userText.toLowerCase()

      if (lowerText.includes('book') || lowerText.includes('doctor') || lowerText.includes('appoint')) {
        botResponse = 'To schedule an appointment, click on "ALL DOCTORS" in the navbar. Select a doctor based on specialty, choose your slot date/time, and complete the booking. You can also link your checkup reports during booking!'
      } else if (lowerText.includes('checkup') || lowerText.includes('symptom') || lowerText.includes('diagnos') || lowerText.includes('feel')) {
        botResponse = 'If you are feeling unwell, you can use our Online Symptom Checker. Go to the "ONLINE CHECKUP" page to log your vitals and obtain automated medical specialties guidance.'
      } else if (lowerText.includes('cancel') || lowerText.includes('refund') || lowerText.includes('money') || lowerText.includes('return')) {
        botResponse = 'We support automatic refunds for online payment cancellations initiated up to 2 hours before the slot. Refunds are completed via Razorpay in 5-7 business days.'
      } else if (lowerText.includes('contact') || lowerText.includes('support') || lowerText.includes('help') || lowerText.includes('phone') || lowerText.includes('email')) {
        botResponse = 'You can contact clinical support at support@swasthyasewa.com or call +91 8092599674. We are located at Booty More, Ranchi, Jharkhand.'
      } else if (lowerText.includes('hello') || lowerText.includes('hi') || lowerText.includes('hey')) {
        botResponse = 'Hello! Hope you are doing well. How can I help you today with bookings or symptom checks at SwasthyaSewa?'
      } else if (lowerText.includes('fever') || lowerText.includes('cough') || lowerText.includes('headache') || lowerText.includes('pain')) {
        botResponse = 'It looks like you are describing symptoms. I highly recommend running through our diagnostic checkup at the "ONLINE CHECKUP" tab to check severity levels and get recommended doctor departments.'
      }

      setMessages(prev => [
        ...prev,
        { id: Date.now() + 1, sender: 'bot', text: botResponse }
      ])
      setIsTyping(false)
    }, 1000)
  }

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-tr from-violet-600 to-indigo-600 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group"
      >
        {isOpen ? (
          <X className="w-6 h-6 transition-transform duration-300" />
        ) : (
          <div className="relative">
            <MessageCircle className="w-6 h-6 transition-transform duration-300 group-hover:rotate-12" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </div>
        )}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[360px] sm:w-[380px] h-[480px] bg-white border border-gray-150 rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300 animate-in slide-in-from-bottom-5 z-50">
          {/* Header */}
          <div className="bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-sm tracking-tight flex items-center gap-1">
                  SewaBot <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                </h4>
                <p className="text-[10px] text-white/70">Online Help Assistant</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-5 bg-gray-50/50 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} items-end gap-2`}>
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-full bg-indigo-50 border flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4.5 h-4.5 text-primary" />
                  </div>
                )}
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-primary text-white rounded-br-none'
                      : 'bg-white border text-gray-700 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start items-end gap-2">
                <div className="w-7 h-7 rounded-full bg-indigo-50 border flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4.5 h-4.5 text-primary" />
                </div>
                <div className="bg-white border rounded-2xl rounded-bl-none px-4 py-3 text-xs text-gray-400 shadow-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
            
            <div ref={chatEndRef} />
          </div>

          {/* Quick Actions (when appropriate) */}
          {messages.length === 1 && !isTyping && (
            <div className="px-5 py-2.5 bg-gray-50 border-t flex flex-wrap gap-1.5 max-h-[80px] overflow-y-auto">
              {quickActions.map((action) => (
                <button
                  key={action.action}
                  onClick={() => handleQuickAction(action.action)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-200 text-gray-600 hover:border-primary hover:text-primary rounded-full text-[10px] font-semibold transition shadow-sm"
                >
                  <HelpCircle className="w-3 h-3" />
                  {action.label}
                </button>
              ))}
            </div>
          )}

          {/* Input Footer */}
          <form onSubmit={handleSendMessage} className="p-4 bg-white border-t flex gap-2">
            <input
              type="text"
              placeholder="Ask me something..."
              className="flex-1 px-4 py-2 border rounded-xl text-xs outline-none focus:border-primary bg-gray-50 focus:bg-white transition"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button
              type="submit"
              className="w-9 h-9 bg-primary text-white rounded-xl flex items-center justify-center hover:bg-opacity-95 transition-all shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default Chatbot
