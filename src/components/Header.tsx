"use client";

import Link from "next/link";
import { Phone, Menu, X } from "lucide-react";
import { useState } from "react";
import LoginModal from "./auth/LoginModal";

const navigation = [
  {
    label: "Home",
    href: "/landing",
  },
  {
    label: "Explore",
    href: "/landing/explore",
  },
  {
    label: "Booking",
    href: "/landing/booking",
  },
   {
    label: "Assistant",
    href: "/assistant",
  },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 h-24 border-b border-gray-100 bg-white">
      <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-6 lg:px-10">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Logo />

          <span className="ml-2 text-[27px] font-light tracking-tight text-[#666]">
            medanta
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden h-full items-center gap-16 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex h-full items-center text-[18px] transition-colors ${
                item.href === "/"
                  ? "font-semibold text-black"
                  : "font-medium text-[#333] hover:text-[#f45135]"
              }`}
            >
              {item.label}

              {item.href === "/" && (
                <span className="absolute bottom-0 left-1/2 h-1 w-24 -translate-x-1/2 bg-[#f45135]" />
              )}
            </Link>
          ))}
          <button
            onClick={() => setLoginOpen(true)}
            className="font-medium text-[#333] transition hover:text-[#f45135]"
          >
            Login
          </button>
        </nav>

        <LoginModal open={loginOpen} onOpenChange={setLoginOpen} />

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="rounded-lg p-2 md:hidden"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="border-t border-gray-100 bg-white px-6 py-4 shadow-md md:hidden">
          <nav className="flex flex-col">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="border-b border-gray-100 py-4 text-[17px] font-medium text-[#333]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

/**
 * Simple Medanta-style logo mark.
 * Replace this with your actual SVG/logo when available.
 */
function Logo() {
  return (
    <div className="relative h-12 w-12">
      <div className="absolute left-1 top-1 h-6 w-7 rounded-tl-full border-l-[3px] border-t-[3px] border-[#f45135]" />

      <div className="absolute left-1 top-4 h-6 w-7 rounded-bl-full border-b-[3px] border-l-[3px] border-[#f45135]" />

      <div className="absolute left-4 top-2 h-7 w-6 border-l-[3px] border-[#666]" />

      <div className="absolute left-7 top-5 h-6 w-[3px] bg-[#666]" />
    </div>
  );
}
