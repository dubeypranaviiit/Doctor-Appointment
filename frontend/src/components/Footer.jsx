import React from 'react';
import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  MessageCircle,
  PhoneCall,
} from 'lucide-react';

const defaultConfig = {
  logo: {
    text: 'SwasthyaSewa',
    subtitle: 'Advanced Smart Clinic Management System',
  },
  quickLinks: [
    { label: 'About Us', href: '/about' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms & Conditions', href: '/terms-conditions' },
    { label: 'Cancellation & Refund Policy', href: '/cancellation-refund-policy' },
    { label: 'Return & Refund Policy', href: '/return-refund-policy' },
  ],
  services: [
    { label: 'Online Appointment Booking', href: '/doctors' },
    { label: 'Patient & Doctor Records', href: '/MyProfile' },
  ],
  contact: {
    address:
      '1st Floor,NH-21, Booty More, Ranchi, Jharkhand 835217',
    phones: ['+91 8092599674'],
    email: 'support@swasthyasewa.com',
  },
  socials: [
    { icon: <Facebook size={20} />, href: '#', label: 'Facebook' },
    { icon: <Twitter size={20} />, href: '#', label: 'Twitter' },
    { icon: <Instagram size={20} />, href: '#', label: 'Instagram' },
  ],
  copyright: '© 2026 SwasthyaSewa. All rights reserved.',
};

export function Footer({ config = {}, showFloatingButtons = true }) {
  const finalConfig = { ...defaultConfig, ...config };

  return (
<footer className="bg-white text-slate-900">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
      <div className="space-y-6">
        <div>
          <h3 className="text-3xl font-extrabold tracking-wide bg-white bg-clip-text text-black">
            Swasthya<span className="text-primary">Sewa</span>
          </h3>
          <p className="text-sm text-slate-700 mt-2">
            {finalConfig.logo.subtitle}
          </p>
        </div>

        <div className="flex gap-4">
          {finalConfig.socials.map((social, idx) => (
            <a
              key={idx}
              href={social.href}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-slate-800 hover:bg-emerald-500 hover:text-white transition-all duration-300"
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-white">Quick Links</h4>
        <ul className="space-y-3">
          {finalConfig.quickLinks.map((link, idx) => (
            <li key={idx}>
              <Link
                to={link.href}
                className="text-sm text-slate-700 hover:text-emerald-400 transition-colors duration-200 flex items-center group"
              >
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-3 group-hover:w-3 transition-all duration-200"></span>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-white">Our Services</h4>
        <ul className="space-y-3">
          {finalConfig.services.map((service, idx) => (
            <li key={idx}>
              <Link
                to={service.href}
                className="text-sm text-slate-700 hover:text-emerald-400 transition-colors duration-200 flex items-center group"
              >
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-3 group-hover:w-3 transition-all duration-200"></span>
                {service.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-white">Contact Info</h4>
        <div className="flex gap-3 text-sm">
          <MapPin size={18} className="text-emerald-500 mt-0.5" />
          <p className="text-slate-700">
            {finalConfig.contact.address}
          </p>
        </div>
        {finalConfig.contact.phones.map((phone, idx) => (
          <div key={idx} className="flex gap-3 text-sm items-center">
            <Phone size={18} className="text-emerald-500" />
            <a
              href={`tel:${phone}`}
              className="text-slate-700 hover:text-emerald-400 transition"
            >
              {phone}
            </a>
          </div>
        ))}

        <div className="flex gap-3 text-sm items-center">
          <Mail size={18} className="text-emerald-500" />
          <a
            href={`mailto:${finalConfig.contact.email}`}
            className="text-slate-700 hover:text-emerald-400 transition"
          >
            {finalConfig.contact.email}
          </a>
        </div>
      </div>
    </div>
    <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent my-8"></div>

    <div className="flex flex-col sm:flex-row justify-between text-sm text-slate-500">
      <p>{finalConfig.copyright}</p>
      <p className="mt-4 sm:mt-0">Made with ❤️ for modern clinics</p>
    </div>
  </div>
</footer>
  );
}

export default Footer;