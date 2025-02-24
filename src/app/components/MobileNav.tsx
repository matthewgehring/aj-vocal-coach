'use client';

import Link from "next/link";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
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
} 