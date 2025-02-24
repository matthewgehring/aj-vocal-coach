'use client';

import Link from "next/link";
import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";

export default function Contact() {
  const [isMounted, setIsMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
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

  const handleNavigation = (path: string) => {
    if (!isMounted) return;
    
    router.push(path);
    
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
      <Navbar onNavigate={handleNavigation} />

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