'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Mobile Navigation Component
const MobileNav = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50">
      <div className="bg-white h-full w-4/5 max-w-sm p-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold">Menu</h2>
          <button onClick={onClose} className="text-2xl">✕</button>
        </div>
        <nav className="flex flex-col space-y-4">
          <Link href="/#home" className="hover:text-gray-600 text-black py-2">Home</Link>
          <Link href="/#about" className="hover:text-gray-600 text-black py-2">About</Link>
          <Link href="/#lessons" className="hover:text-gray-600 text-black py-2">Lessons</Link>
          <Link href="/#testimonials" className="hover:text-gray-600 text-black py-2">Testimonials</Link>
          <Link href="/book-now" className="hover:text-gray-600 text-black py-2">Book Now</Link>
          <Link href="/contact" className="hover:text-gray-600 text-black py-2">Contact</Link>
          <Link href="/news" className="hover:text-gray-600 text-black py-2">News</Link>
        </nav>
      </div>
    </div>
  );
};

export default function News() {
  const [isMounted, setIsMounted] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    if (!isMounted) return;
    
    router.push(path);
    
    // After navigation, scroll to the section (if it's a hash link)
    if (path.includes('#')) {
      const sectionId = path.split('#')[1];
      const element = document.getElementById(sectionId);
      if (element) {
        const headerOffset = 140;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${isMounted ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm py-4 md:py-6 z-40">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-4xl font-bold text-center mb-4 md:mb-6 text-black">
            ASHLEIGH D VOICE COACHING
          </h1>
          {/* Mobile menu button */}
          <button 
            onClick={() => setShowMobileNav(true)}
            className="md:hidden fixed top-6 left-4 z-50 p-2 text-black"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          {/* Desktop navigation */}
          <nav className="hidden md:flex justify-center space-x-6 text-lg">
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

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-16 mt-24 md:py-20 md:mt-32 text-black">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8">News</h1>
          
          <div className="space-y-6 text-base md:text-lg">
            <p>
              On 28th March Ashleigh will be hosting and performing a show in Manchester City Centre 
              under his musical act name AJ LeRoy. The show will be an intimate exploration of the 
              music of some of his favourite vocalists and artists who created magic on stage.
            </p>

            <p>
              Tickets are limited for this show and can be found at the below link.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-4 md:py-6 text-center">
        <div className="container mx-auto px-4">
          <p className="text-xs md:text-sm">©2025 by Ashleigh D Voice Coaching.</p>
        </div>
      </footer>
    </div>
  );
} 