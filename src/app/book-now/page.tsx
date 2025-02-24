'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function BookNow() {
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
        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 max-w-5xl mx-auto">
          {/* Card 1 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-48">
              <Image
                src="/Singer.avif"
                alt="Single Session"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="p-4 text-center">
              <h3 className="text-xl font-bold mb-2">1 HOUR SESSION</h3>
              <p className="text-2xl font-bold mb-4">£45</p>
              <div className="flex gap-2">
                <button className="flex-1 bg-black text-white py-2 rounded hover:bg-gray-800 transition-colors text-sm">
                  Pay with Card
                </button>
                <a 
                  href="https://www.paypal.com/paypalme/AshleighDowler/45GBP"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors text-center text-sm"
                >
                  Pay via PayPal
                </a>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-48">
              <Image
                src="/Retro Singer.avif"
                alt="Block of 5 Sessions"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="p-4 text-center">
              <h3 className="text-xl font-bold mb-2">BLOCK OF 5 LESSONS</h3>
              <p className="text-2xl font-bold mb-4">£205</p>
              <div className="flex gap-2">
                <button className="flex-1 bg-black text-white py-2 rounded hover:bg-gray-800 transition-colors text-sm">
                  Pay with Card
                </button>
                <a 
                  href="https://www.paypal.com/paypalme/AshleighDowler/205GBP"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors text-center text-sm"
                >
                  Pay via PayPal
                </a>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-48">
              <Image
                src="/Vintage Mic.avif"
                alt="Block of 10 Sessions"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="p-4 text-center">
              <h3 className="text-xl font-bold mb-2">BLOCK OF 10 LESSONS</h3>
              <p className="text-2xl font-bold mb-4">£385</p>
              <div className="flex gap-2">
                <button className="flex-1 bg-black text-white py-2 rounded hover:bg-gray-800 transition-colors text-sm">
                  Pay with Card
                </button>
                <a 
                  href="https://www.paypal.com/paypalme/AshleighDowler/385GBP"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors text-center text-sm"
                >
                  Pay via PayPal
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Information */}
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <p className="text-lg">
            <a 
              href="https://calendly.com/vocalcoachashleigh?lid=4li639g9476c&utm_medium=email&utm_source=braze&utm_campaign=default_onboarding_21&utm_content=welcome_booking_page_text"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Click Here
            </a>
            {' '}to check Ashleigh's calendar and send a book your session.
          </p>
          <p className="text-lg">
            Alternatively{' '}
            <Link href="/contact" className="text-blue-600 hover:text-blue-800 underline">
              contact Ashleigh Here
            </Link>
            {' '}to arrange your session after paying by one of the above buttons.
          </p>
          <p className="text-lg">
            Terms and Conditions apply.{' '}
            <a 
              href="/Terms & Conditions for vocal lessons 2022.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Click Here
            </a>
            {' '}for more information.
          </p>
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