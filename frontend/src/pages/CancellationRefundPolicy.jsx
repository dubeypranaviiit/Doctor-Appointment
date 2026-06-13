import React from 'react'

const CancellationRefundPolicy = () => {
  return (
    <div className="min-h-[70vh] py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6 tracking-tight">Cancellation and Refund Policy</h1>
      <p className="text-sm text-gray-500 mb-8">Last Updated: June 13, 2026</p>
      
      <div className="space-y-6 text-gray-600 text-sm leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-gray-800">1. Booking Cancellations</h2>
          <p>
            Patients can cancel registered doctor appointments directly from their dashboard. Cancellations are permitted up to 2 hours before the scheduled appointment start time without penalty.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-gray-800">2. Automatic Refund Triggers</h2>
          <p>
            When a paid appointment is cancelled by the patient (within the valid window), doctor, or clinic administrator, our systems automatically trigger a refund of the complete consultation fee via Razorpay.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-gray-800">3. Settlement Timelines</h2>
          <p>
            Refund orders processed via Razorpay are settled back to the original source payment instrument (credit card, debit card, UPI, net banking) within <strong>5 to 7 working days</strong>, depending on bank clearance speeds.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-gray-800">4. Consultation No-shows</h2>
          <p>
            If a patient fails to show up for a scheduled slot without cancelling, the booking will be flagged as a "no-show". In such cases, refunds are subject to clinical review and clinic discretion.
          </p>
        </section>
      </div>
    </div>
  )
}

export default CancellationRefundPolicy
