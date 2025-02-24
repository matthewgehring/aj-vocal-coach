'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function News() {
  const [isMounted, setIsMounted] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    setIsFading(true);

    // Start fade out
    setTimeout(() => {
      router.push(path);
      
      // After navigation, scroll to the section (if it's a hash link)
      if (path.includes('#')) {
        const sectionId = path.split('#')[1];
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            const headerOffset = 140; // Height of header (approx 128px) + some padding
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth"
            });
          }
        }, 100);
      }
    }, 500); // Wait for fade out animation
  };

  return (
    <div className={`min-h-screen flex flex-col ${isMounted ? 'transition-opacity duration-500' : ''} ${isFading ? 'opacity-0' : 'opacity-100'}`}>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm py-6 z-50">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-6">
            ASHLEIGH D VOICE COACHING
          </h1>
          <nav className="flex justify-center space-x-6 text-lg">
            <a href="/#home" onClick={(e) => handleNavigation(e, '/#home')} className="hover:text-gray-600 cursor-pointer">
              Home
            </a>
            <a href="/#about" onClick={(e) => handleNavigation(e, '/#about')} className="hover:text-gray-600 cursor-pointer">
              About
            </a>
            <a href="/#lessons" onClick={(e) => handleNavigation(e, '/#lessons')} className="hover:text-gray-600 cursor-pointer">
              Lessons
            </a>
            <a href="/#testimonials" onClick={(e) => handleNavigation(e, '/#testimonials')} className="hover:text-gray-600 cursor-pointer">
              Testimonials
            </a>
            <Link href="/book-now" className="hover:text-gray-600">
              Book Now
            </Link>
            <Link href="/contact" className="hover:text-gray-600">
              Contact
            </Link>
            <Link href="/news" className="hover:text-gray-600">
              News
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-20 mt-32">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">News</h1>
          
          <div className="space-y-6 text-lg">
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
      <footer className="bg-black text-white py-6 text-center">
        <div className="container mx-auto px-4">
          <p className="text-sm">©2025 by Ashleigh D Voice Coaching.</p>
        </div>
      </footer>
    </div>
  );
} 