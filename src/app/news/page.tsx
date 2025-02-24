'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";

export default function News() {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

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