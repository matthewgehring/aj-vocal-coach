'use client';

import Link from "next/link";
import { useState, useEffect, FormEvent } from "react";
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

export default function Contact() {
  const [isMounted, setIsMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showMobileNav, setShowMobileNav] = useState(false);
  const router = useRouter();

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

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
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm py-4 safe-top z-40">
        <div className="container mx-auto px-4 max-w-7xl">
          <h1 className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold text-center mb-4 text-black">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Left Column - Contact Info */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">CONTACT ASHLEIGH</h2>
            <p className="text-base md:text-lg">
              Want singing lessons in Manchester? Or looking for online singing lessons? 
              Contact Ashleigh by email or call/text with the details below or use the in-site contact form.
            </p>
            <div className="space-y-2">
              <a 
                href="mailto:ashleigh.dowler@hotmail.co.uk"
                className="text-base md:text-lg block hover:text-gray-600 transition-colors text-black"
              >
                ashleigh.dowler@hotmail.co.uk
              </a>
              <a 
                href="tel:07841049513"
                className="text-base md:text-lg block hover:text-gray-600 transition-colors text-black"
              >
                07841049513
              </a>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="group">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Name"
                required
                className="w-full bg-transparent border-b border-black px-3 py-2 focus:outline-none group-hover:border group-hover:border-black transition-all text-base md:text-lg text-black placeholder-gray-600"
              />
            </div>

            <div className="group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                required
                className="w-full bg-transparent border-b border-black px-3 py-2 focus:outline-none group-hover:border group-hover:border-black transition-all text-base md:text-lg text-black placeholder-gray-600"
              />
            </div>

            <div className="group">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone"
                className="w-full bg-transparent border-b border-black px-3 py-2 focus:outline-none group-hover:border group-hover:border-black transition-all text-base md:text-lg text-black placeholder-gray-600"
              />
            </div>

            <div className="group">
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="Subject"
                required
                className="w-full bg-transparent border-b border-black px-3 py-2 focus:outline-none group-hover:border group-hover:border-black transition-all text-base md:text-lg text-black placeholder-gray-600"
              />
            </div>

            <div className="group">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Type your message here..."
                rows={4}
                required
                className="w-full bg-transparent border-b border-black px-3 py-2 focus:outline-none group-hover:border group-hover:border-black transition-all resize-none text-base md:text-lg text-black placeholder-gray-600"
              ></textarea>
            </div>

            {submitStatus === 'success' && (
              <div className="text-green-600 text-center text-base md:text-lg">
                Message sent successfully! We&apos;ll get back to you soon.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="text-red-600 text-center text-base md:text-lg">
                Failed to send message. Please try again or contact us directly.
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-black text-white py-3 text-center transition-colors text-base md:text-lg ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'
              }`}
            >
              {isSubmitting ? 'Sending...' : 'Submit'}
            </button>
          </form>
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