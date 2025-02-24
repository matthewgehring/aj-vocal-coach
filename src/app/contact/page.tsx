'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Contact() {
  const [isMounted, setIsMounted] = useState(false);
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
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm py-6 z-50">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-6">
            ASHLEIGH D VOICE COACHING
          </h1>
          <nav className="flex justify-center space-x-6 text-lg">
            <Link href="/#home" onClick={(e) => handleNavigation(e, '/#home')} className="hover:text-gray-600 cursor-pointer">
              Home
            </Link>
            <Link href="/#about" onClick={(e) => handleNavigation(e, '/#about')} className="hover:text-gray-600 cursor-pointer">
              About
            </Link>
            <Link href="/#lessons" onClick={(e) => handleNavigation(e, '/#lessons')} className="hover:text-gray-600 cursor-pointer">
              Lessons
            </Link>
            <Link href="/#testimonials" onClick={(e) => handleNavigation(e, '/#testimonials')} className="hover:text-gray-600 cursor-pointer">
              Testimonials
            </Link>
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Contact Info */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold">CONTACT ASHLEIGH</h2>
            <p className="text-lg">
              Want singing lessons in Manchester? Or looking for online singing lessons? 
              Contact Ashleigh by email or call/text with the details below or use the in-site contact form.
            </p>
            <div className="space-y-2">
              <a 
                href="mailto:ashleigh.dowler@hotmail.co.uk"
                className="text-lg block hover:text-gray-600 transition-colors"
              >
                ashleigh.dowler@hotmail.co.uk
              </a>
              <a 
                href="tel:07841049513"
                className="text-lg block hover:text-gray-600 transition-colors"
              >
                07841049513
              </a>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <form className="space-y-6">
            <div className="group">
              <input
                type="text"
                placeholder="Name"
                className="w-full bg-transparent border-b border-black px-3 py-2 focus:outline-none group-hover:border group-hover:border-black transition-all"
              />
            </div>

            <div className="group">
              <input
                type="email"
                placeholder="Email"
                className="w-full bg-transparent border-b border-black px-3 py-2 focus:outline-none group-hover:border group-hover:border-black transition-all"
              />
            </div>

            <div className="group">
              <input
                type="tel"
                placeholder="Phone"
                className="w-full bg-transparent border-b border-black px-3 py-2 focus:outline-none group-hover:border group-hover:border-black transition-all"
              />
            </div>

            <div className="group">
              <input
                type="text"
                placeholder="Subject"
                className="w-full bg-transparent border-b border-black px-3 py-2 focus:outline-none group-hover:border group-hover:border-black transition-all"
              />
            </div>

            <div className="group">
              <textarea
                placeholder="Type your message here..."
                rows={4}
                className="w-full bg-transparent border-b border-black px-3 py-2 focus:outline-none group-hover:border group-hover:border-black transition-all resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 text-center hover:bg-gray-800 transition-colors"
            >
              Submit
            </button>
          </form>
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