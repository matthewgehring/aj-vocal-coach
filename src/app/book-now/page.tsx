'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { loadStripe } from '@stripe/stripe-js';

// Make sure to add your publishable key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const PRICE_IDS = {
  single: 'price_XXXXXXXXXXXXX', // Replace with actual price ID for single session
  fiveBlock: 'price_XXXXXXXXXXXXX', // Replace with actual price ID for 5 sessions
  tenBlock: 'price_XXXXXXXXXXXXX', // Replace with actual price ID for 10 sessions
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Checkout Preview</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        <div className="space-y-4">
          <div className="border-b pb-4">
            <p className="text-lg font-semibold">{selectedProduct.name}</p>
            <p className="text-2xl font-bold">{selectedProduct.price}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              You will be redirected to Stripe&apos;s secure checkout page to complete your purchase.
            </p>
            <p className="text-sm text-gray-600">
              After payment, you&apos;ll receive a confirmation email with next steps.
            </p>
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onClose();
                onProceed(selectedProduct.priceId);
              }}
              className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function BookNow() {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{ name: string; price: string; priceId: string; } | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsMounted(true);
    
    // Check for success/canceled status
    if (searchParams.get('success')) {
      alert('Payment successful! Please check your email for confirmation.');
    }
    if (searchParams.get('canceled')) {
      alert('Payment canceled. If you need assistance, please contact us.');
    }
  }, [searchParams]);

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

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Error:', error);
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
                <button
                  onClick={() => handlePaymentClick("Single Session", "£45", PRICE_IDS.single)}
                  disabled={!!isLoading}
                  className={`flex-1 bg-black text-white py-2 rounded transition-colors text-sm ${
                    isLoading === PRICE_IDS.single
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:bg-gray-800'
                  }`}
                >
                  {isLoading === PRICE_IDS.single ? 'Processing...' : 'Pay with Card'}
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
                <button
                  onClick={() => handlePaymentClick("Block of 5 Lessons", "£205", PRICE_IDS.fiveBlock)}
                  disabled={!!isLoading}
                  className={`flex-1 bg-black text-white py-2 rounded transition-colors text-sm ${
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
                <button
                  onClick={() => handlePaymentClick("Block of 10 Lessons", "£385", PRICE_IDS.tenBlock)}
                  disabled={!!isLoading}
                  className={`flex-1 bg-black text-white py-2 rounded transition-colors text-sm ${
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
            {' '}to check Ashleigh&apos;s calendar and book your session.
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

      {/* Checkout Preview Modal */}
      <CheckoutPreview
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
        selectedProduct={selectedProduct}
        onProceed={handlePayment}
      />

      {/* Footer */}
      <footer className="bg-black text-white py-6 text-center">
        <div className="container mx-auto px-4">
          <p className="text-sm">©2025 by Ashleigh D Voice Coaching.</p>
        </div>
      </footer>
    </div>
  );
} 