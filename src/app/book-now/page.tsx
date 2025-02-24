'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// Payment Status component to handle success/error messages
const PaymentStatus = () => {
  const searchParams = useSearchParams();
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (searchParams.get('success')) {
      setMessage('Payment successful! Please check your email for confirmation.');
    }
    if (searchParams.get('canceled')) {
      setMessage('Payment canceled. If you need assistance, please contact us.');
    }
  }, [searchParams]);

  if (!message) return null;

  return (
    <div className="fixed top-24 left-0 right-0 z-50 flex justify-center">
      <div className={`p-4 rounded-lg shadow-lg ${
        searchParams.get('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}>
        {message}
      </div>
    </div>
  );
};

const PRICE_IDS = {
  // Get these IDs from your Stripe Dashboard after creating the products
  // Products → Select Product → Copy Price ID
  single: 'price_1Qw6XUISUHrXggznAv5c4VRn',    // Single Session (£45)
  fiveBlock: 'price_1Qw6YeISUHrXggznaDbKI6Ak', // Block of 5 Lessons (£205)
  tenBlock: 'price_1Qw6a2ISUHrXggznscIqhsHI',  // Block of 10 Lessons (£385)
};

// Add CheckoutPreview component
const CheckoutPreview = ({ 
  isOpen, 
  onClose, 
  selectedProduct,
  onProceed
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  selectedProduct: { name: string; price: string; priceId: string; } | null;
  onProceed: (priceId: string) => void;
}) => {
  if (!isOpen || !selectedProduct) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-4 md:p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg md:text-xl font-bold">Checkout Preview</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 p-2">
            ✕
          </button>
        </div>
        <div className="space-y-4">
          <div className="border-b pb-4">
            <p className="text-base md:text-lg font-semibold">{selectedProduct.name}</p>
            <p className="text-xl md:text-2xl font-bold">{selectedProduct.price}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm md:text-base text-gray-600">
              You will be redirected to Stripe&apos;s secure checkout page to complete your purchase.
            </p>
            <p className="text-sm md:text-base text-gray-600">
              After payment, you&apos;ll receive a confirmation email with next steps.
            </p>
          </div>
          <div className="flex flex-col-reverse md:flex-row justify-end gap-2 mt-6">
            <button
              onClick={onClose}
              className="w-full md:w-auto px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onClose();
                onProceed(selectedProduct.priceId);
              }}
              className="w-full md:w-auto px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add MobileNav component
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
          <Link href="/#home" className="hover:text-gray-600 py-2">Home</Link>
          <Link href="/#about" className="hover:text-gray-600 py-2">About</Link>
          <Link href="/#lessons" className="hover:text-gray-600 py-2">Lessons</Link>
          <Link href="/#testimonials" className="hover:text-gray-600 py-2">Testimonials</Link>
          <Link href="/book-now" className="hover:text-gray-600 py-2">Book Now</Link>
          <Link href="/contact" className="hover:text-gray-600 py-2">Contact</Link>
          <Link href="/news" className="hover:text-gray-600 py-2">News</Link>
        </nav>
      </div>
    </div>
  );
};

export default function BookNow() {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{ name: string; price: string; priceId: string; } | null>(null);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
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

  const handlePayment = async (priceId: string) => {
    try {
      setIsLoading(priceId);
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      if (!data.url) {
        throw new Error('No checkout URL received from Stripe');
      }

      console.log('Redirecting to:', data.url); // Debug log
      window.location.href = data.url;
    } catch (error) {
      console.error('Payment Error:', error);
      alert('Something went wrong. Please try again or contact support.');
    } finally {
      setIsLoading(null);
    }
  };

  const handlePaymentClick = (productName: string, price: string, priceId: string) => {
    setSelectedProduct({ name: productName, price, priceId });
    setShowCheckout(true);
  };

  return (
    <div className={`min-h-screen flex flex-col ${isMounted ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
      <Suspense fallback={null}>
        <PaymentStatus />
      </Suspense>

      {/* Header */}
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
            <h1 className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold text-center">
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

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-16 mt-20 sm:mt-24 md:mt-32 max-w-7xl">
        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 md:mb-16">
          {/* Card 1 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-40 sm:h-48">
              <Image
                src="/Singer.avif"
                alt="Single Session"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="p-4 text-center">
              <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2">1 HOUR SESSION</h3>
              <p className="text-lg sm:text-xl md:text-2xl font-bold mb-4">£45</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => handlePaymentClick("Single Session", "£45", PRICE_IDS.single)}
                  disabled={!!isLoading}
                  className={`w-full bg-black text-white py-2.5 px-4 rounded-lg text-sm sm:text-base transition-colors ${
                    isLoading === PRICE_IDS.single
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:bg-gray-800 active:bg-gray-900'
                  }`}
                >
                  {isLoading === PRICE_IDS.single ? 'Processing...' : 'Pay with Card'}
                </button>
                <a 
                  href="https://www.paypal.com/paypalme/AshleighDowler/45GBP"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg text-sm sm:text-base hover:bg-blue-700 active:bg-blue-800 transition-colors text-center"
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
              <h3 className="text-lg md:text-xl font-bold mb-2">BLOCK OF 5 LESSONS</h3>
              <p className="text-xl md:text-2xl font-bold mb-4">£205</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handlePaymentClick("Block of 5 Lessons", "£205", PRICE_IDS.fiveBlock)}
                  disabled={!!isLoading}
                  className={`flex-1 bg-black text-white py-2 px-3 rounded transition-colors text-xs md:text-sm ${
                    isLoading === PRICE_IDS.fiveBlock
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:bg-gray-800'
                  }`}
                >
                  {isLoading === PRICE_IDS.fiveBlock ? 'Processing...' : 'Pay with Card'}
                </button>
                <a 
                  href="https://www.paypal.com/paypalme/AshleighDowler/205GBP"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-blue-600 text-white py-2 px-3 rounded hover:bg-blue-700 transition-colors text-center text-xs md:text-sm"
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
              <h3 className="text-lg md:text-xl font-bold mb-2">BLOCK OF 10 LESSONS</h3>
              <p className="text-xl md:text-2xl font-bold mb-4">£385</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handlePaymentClick("Block of 10 Lessons", "£385", PRICE_IDS.tenBlock)}
                  disabled={!!isLoading}
                  className={`flex-1 bg-black text-white py-2 px-3 rounded transition-colors text-xs md:text-sm ${
                    isLoading === PRICE_IDS.tenBlock
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:bg-gray-800'
                  }`}
                >
                  {isLoading === PRICE_IDS.tenBlock ? 'Processing...' : 'Pay with Card'}
                </button>
                <a 
                  href="https://www.paypal.com/paypalme/AshleighDowler/385GBP"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-blue-600 text-white py-2 px-3 rounded hover:bg-blue-700 transition-colors text-center text-xs md:text-sm"
                >
                  Pay via PayPal
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Information */}
        <div className="max-w-2xl mx-auto text-center space-y-4 px-4">
          <p className="text-sm sm:text-base md:text-lg">
            <a 
              href="https://calendly.com/vocalcoachashleigh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 active:text-blue-900 underline"
            >
              Click Here
            </a>
            {' '}to check Ashleigh&apos;s calendar and book your session.
          </p>
          <p className="text-base md:text-lg">
            Alternatively{' '}
            <Link href="/contact" className="text-blue-600 hover:text-blue-800 underline">
              contact Ashleigh Here
            </Link>
            {' '}to arrange your session after paying by one of the above buttons.
          </p>
          <p className="text-base md:text-lg">
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

      {/* Checkout Preview Modal - Update for better mobile display */}
      <CheckoutPreview
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
        selectedProduct={selectedProduct}
        onProceed={handlePayment}
      />

      {/* Footer */}
      <footer className="bg-black text-white py-4 md:py-6 text-center">
        <div className="container mx-auto px-4">
          <p className="text-xs md:text-sm">©2025 by Ashleigh D Voice Coaching.</p>
        </div>
      </footer>
    </div>
  );
} 