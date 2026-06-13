import React from 'react'

const TermsAndConditions = () => {
  return (
    <div className="min-h-[70vh] py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6 tracking-tight">Terms and Conditions</h1>
      <p className="text-sm text-gray-500 mb-8">Last Updated: June 13, 2026</p>
      
      <div className="space-y-6 text-gray-600 text-sm leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-gray-800">1. Services Provided</h2>
          <p>
            SwasthyaSewa acts as a platform linking patient users to clinical doctors for consultations. The AI Symptom Checker is an informational triage aid and does not constitute a diagnostic replacement for in-person medical emergencies.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-gray-800">2. Account Registration</h2>
          <p>
            Users are required to register accounts with valid identifiers (phone, email) to book slot bookings. You are solely responsible for ensuring account credential confidentiality.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-gray-800">3. Fee Structures and Online Payments</h2>
          <p>
            Consultation charges are decided by clinical listings. Online payments are cleared instantly using integrated channels. Booking confirmation is subject to authorization from payment processors.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-gray-800">4. User Guidelines</h2>
          <p>
            Patients must provide authentic logs, vitals, and names during booking. Misrepresentation or false records may result in termination of service availability.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-gray-800">5. Limitation of Liability</h2>
          <p>
            SwasthyaSewa does not bear liability for treatment schedules, diagnosis disputes, or doctor availability changes. Platform disputes are settled in accordance with merchant jurisdiction regulations.
          </p>
        </section>
      </div>
    </div>
  )
}

export default TermsAndConditions
