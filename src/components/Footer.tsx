import {
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { FaInstagram , FaTwitter , FaFacebook, FaLinkedin } from "react-icons/fa";


export default function Footer() {
  return (
    <footer className="bg-[#1F2937] text-gray-300">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-4">Serenity Spa</h2>

          <p className="text-sm leading-7 text-gray-400">
            Relax, refresh, and rejuvenate with premium wellness treatments,
            expert therapists, and luxurious spa experiences.
          </p>

          <div className="flex gap-4 mt-6">
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-gray-700 hover:bg-emerald-500 flex items-center justify-center transition"
            >
              <FaFacebook size={18} />
            </a>

            <a
              href="#"
              className="w-10 h-10 rounded-full bg-gray-700 hover:bg-emerald-500 flex items-center justify-center transition"
            >
              <FaInstagram size={18} />
            </a>

            <a
              href="#"
              className="w-10 h-10 rounded-full bg-gray-700 hover:bg-emerald-500 flex items-center justify-center transition"
            >
              <FaTwitter  size={18} />
            </a>

            <a
              href="#"
              className="w-10 h-10 rounded-full bg-gray-700 hover:bg-emerald-500 flex items-center justify-center transition"
            >
              <FaLinkedin size={18} />
            </a>
          </div>
        </div>

        {/* Treatments */}
        <div className="hidden">
          <h3 className="text-lg font-semibold text-white mb-5 ">Treatments</h3>

          <ul className="space-y-3 text-sm">
            <li>
              <a href="#" className="hover:text-emerald-400">
                Massage Therapy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-emerald-400">
                Facials
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-emerald-400">
                Body Treatments
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-emerald-400">
                Skin Care
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-emerald-400">
                Wellness Packages
              </a>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className="hidden">
          <h3 className="text-lg font-semibold text-white mb-5">Quick Links</h3>

          <ul className="space-y-3 text-sm">
            <li>
              <a href="#" className="hover:text-emerald-400">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-emerald-400">
                Book Appointment
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-emerald-400">
                Locations
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-emerald-400">
                Gift Cards
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-emerald-400">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-5">Contact</h3>

          <div className="space-y-4 text-sm">
            <div className="flex items-start gap-3">
              <MapPin size={18} className="mt-1 text-emerald-400" />
              <span>123 Wellness Street, Melbourne, Australia</span>
            </div>

            <div className="flex items-center gap-3">
              <Phone size={18} className="text-emerald-400" />
              <span>+61 123 456 789</span>
            </div>

            <div className="flex items-center gap-3">
              <Mail size={18} className="text-emerald-400" />
              <span>support@serenityspa.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col lg:flex-row justify-between items-center gap-6">
          <div>
            <h3 className="text-white text-xl font-semibold">
              Subscribe to our newsletter
            </h3>

            <p className="text-gray-400 text-sm mt-1">
              Get wellness tips, exclusive offers, and new treatment updates.
            </p>
          </div>

          <div className="flex w-full lg:w-auto gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-gray-800 border border-gray-700 rounded-xl px-5 py-3 w-full lg:w-80 outline-none focus:border-emerald-500"
            />

            <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 rounded-xl transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Serenity Spa. All rights reserved.</p>

          <div className="flex gap-6">
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>

            <a href="#" className="hover:text-white">
              Terms & Conditions
            </a>

            <a href="#" className="hover:text-white">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}