'use client';

import Link from "next/link";
import { useState } from "react";
import MobileNav from "./MobileNav";

interface NavbarProps {
  onNavigate?: (path: string) => void;
}

export default function Navbar({ onNavigate }: NavbarProps) {
  const [showMobileNav, setShowMobileNav] = useState(false);

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(path);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm py-4 safe-top z-40">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between md:justify-center relative">
            <button 
              onClick={() => setShowMobileNav(true)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold text-center text-black">
              ASHLEIGH D VOICE COACHING
            </h1>
            {/* Empty div to balance the layout on mobile */}
            <div className="w-10 md:hidden"></div>
          </div>
          {/* Desktop navigation */}
          <nav className="hidden md:flex justify-center space-x-6 text-lg mt-4">
            <Link href="/#home" onClick={(e) => handleNavigation(e, '/#home')} className="hover:text-gray-600 text-black">Home</Link>
            <Link href="/#about" onClick={(e) => handleNavigation(e, '/#about')} className="hover:text-gray-600 text-black">About</Link>
            <Link href="/#lessons" onClick={(e) => handleNavigation(e, '/#lessons')} className="hover:text-gray-600 text-black">Lessons</Link>
            <Link href="/#testimonials" onClick={(e) => handleNavigation(e, '/#testimonials')} className="hover:text-gray-600 text-black">Testimonials</Link>
            <Link href="/book-now" className="hover:text-gray-600 text-black">Book Now</Link>
            <Link href="/contact" className="hover:text-gray-600 text-black">Contact</Link>
            <Link href="/news" className="hover:text-gray-600 text-black">News</Link>
          </nav>
        </div>
      </header>

      {/* Mobile Navigation */}
      <MobileNav isOpen={showMobileNav} onClose={() => setShowMobileNav(false)} />
    </>
  );
} 