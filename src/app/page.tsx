'use client';

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, FormEvent } from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";

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
          <button onClick={() => {
            onClose();
            document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
          }} className="text-left hover:text-gray-600 text-black py-2">Home</button>
          <button onClick={() => {
            onClose();
            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
          }} className="text-left hover:text-gray-600 text-black py-2">About</button>
          <button onClick={() => {
            onClose();
            document.getElementById('lessons')?.scrollIntoView({ behavior: 'smooth' });
          }} className="text-left hover:text-gray-600 text-black py-2">Lessons</button>
          <button onClick={() => {
            onClose();
            document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' });
          }} className="text-left hover:text-gray-600 text-black py-2">Testimonials</button>
          <Link href="/book-now" className="hover:text-gray-600 text-black py-2">Book Now</Link>
          <Link href="/contact" className="hover:text-gray-600 text-black py-2">Contact</Link>
          <Link href="/news" className="hover:text-gray-600 text-black py-2">News</Link>
        </nav>
      </div>
    </div>
  );
};

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showMobileNav, setShowMobileNav] = useState(false);
  
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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 140;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className={`min-h-screen ${isMounted ? 'transition-opacity duration-500 opacity-100' : 'opacity-0'}`}>
      {/* Header and Navigation */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-40">
        <div className="container mx-auto px-4 py-4 md:py-6">
          <div className="flex items-center justify-between md:justify-center relative">
            <button 
              onClick={() => setShowMobileNav(true)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold text-center text-black">
              ASHLEIGH D VOICE COACHING
            </h1>
            {/* Empty div to balance the layout on mobile */}
            <div className="w-10 md:hidden"></div>
          </div>
          {/* Desktop navigation */}
          <nav className="hidden md:flex justify-center space-x-6 text-lg mt-4">
            <button onClick={() => scrollToSection("home")} className="hover:text-gray-600 text-black">Home</button>
            <button onClick={() => scrollToSection("about")} className="hover:text-gray-600 text-black">About</button>
            <button onClick={() => scrollToSection("lessons")} className="hover:text-gray-600 text-black">Lessons</button>
            <button onClick={() => scrollToSection("testimonials")} className="hover:text-gray-600 text-black">Testimonials</button>
            <Link href="/book-now" className="hover:text-gray-600 text-black">Book Now</Link>
            <Link href="/contact" className="hover:text-gray-600 text-black">Contact</Link>
            <Link href="/news" className="hover:text-gray-600 text-black">News</Link>
          </nav>
        </div>
      </header>

      {/* Mobile Navigation */}
      <MobileNav isOpen={showMobileNav} onClose={() => setShowMobileNav(false)} />

      {/* Main Content Sections */}
      <main className="pt-24 md:pt-40">
        {/* Home Section */}
        <section id="home" className="relative min-h-screen flex flex-col items-center justify-center">
          {/* Hero Image */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/Lone Microphone.avif"
              alt="Lone Microphone"
              fill
              priority
              style={{ objectFit: 'cover' }}
              className="brightness-[0.85]"
            />
          </div>
          
          {/* Overlay Content */}
          <div className="relative z-10 flex flex-col items-center gap-8 text-white px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-bold drop-shadow-lg">
              Welcome to Ashleigh D Voice Coaching
            </h2>
            <div className="flex gap-6">
              <a
                href="https://www.facebook.com/profile.php?id=100065274810710#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl md:text-4xl hover:text-blue-400 transition-colors drop-shadow-lg"
              >
                <FaFacebook />
              </a>
              <a
                href="https://www.instagram.com/vocalcoachashleigh"
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl md:text-4xl hover:text-pink-400 transition-colors drop-shadow-lg"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="min-h-screen bg-gray-50 py-12 md:py-20 text-black">
          <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* Left Column - Image */}
            <div className="relative h-[400px] md:h-full md:min-h-[800px]">
              <Image
                src="/aj.avif"
                alt="Ashleigh D"
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-lg shadow-xl"
              />
            </div>

            {/* Right Column - Content */}
            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-4 md:gap-6">
                <h2 className="text-3xl md:text-4xl font-bold">
                  ABOUT<br />ASHLEIGH
                </h2>
                <div className="relative w-[100px] md:w-[150px] h-[100px] md:h-[150px]">
                  <Image
                    src="/EMT estill master trainer badge.avif"
                    alt="Estill Master Trainer Badge"
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </div>

              <p className="text-base md:text-lg">
                I am a professional vocal coach providing voice lessons in Manchester City Centre in the north-west of England, 
                experienced across a variety of styles and genres. I have years of experience teaching a vast mix of students 
                from absolute beginners to professionals and pride myself on giving you the ability to take control and unlock 
                the potential of your voice. I am voice-science informed and EMT Certified by Estill Voice Technique as an 
                Estill Master Trainer.
              </p>

              <p className="text-base md:text-lg">
                You can learn more about Estill Voice Technique at{' '}
                <a 
                  href="https://estillvoice.com/about/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  Estill Voice International&apos;s website here
                </a>.
              </p>

              <p className="text-base md:text-lg">
                <a 
                  href="https://estillvoice.com/find-a-trainer/trainer-profile/?uid=1731"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  Click here to see Ashleigh&apos;s listing at EVI.
                </a>
              </p>

              <div className="mt-6">
                <h3 className="text-2xl font-bold mb-4">WORK WITH ME ON:</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Vocal Technique</h4>
                    <p className="text-base md:text-lg">
                      Learn to sing with more ease, more intent and develop true control of your voice. 
                      Learn about how the voice works and gain effective and repeatable strategies to produce 
                      the voice you want. We all want to stop reaching and pushing and start allowing the voice 
                      to soar and a understanding your voice is pivotal to this. Learn how to sing smart, not hard.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold mb-2">Performance Technique</h4>
                    <p className="text-base md:text-lg">
                      Look and feel more natural, commanding and engaging in your performances and really connect 
                      to your material. As singers, speakers and actors, the most important job we have is to 
                      communicate and connect with our listeners and audience.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold mb-2">Confidence</h4>
                    <p className="text-base md:text-lg">
                      Spend time and energy working on a new skill and see your confidence blossom! Many students 
                      comment that when the confidence in their voice grows so does their confidence in other areas of life.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold mb-2">Artistry</h4>
                    <p className="text-base md:text-lg">
                      Develop your own sound and style and release the potential of your own unique voice.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <p className="text-base md:text-lg">
                  If you&apos;re ready to take control of your voice, then contact Ashleigh to arrange a lesson 
                  in-person in Manchester or online.
                </p>

                <p className="text-base md:text-lg">
                  Be sure to check out our{' '}
                  <Link href="/news" className="text-blue-600 hover:text-blue-800 underline">
                    News Page
                  </Link>
                  {' '}to hear about any workshops and other things we are running.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Lessons Section */}
        <section id="lessons" className="relative min-h-screen flex items-center justify-center py-12 md:py-20">
          {/* Background Image */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/Lone Microphone.avif"
              alt="Microphone Background"
              fill
              style={{ objectFit: 'cover' }}
              className="brightness-[0.85]"
            />
          </div>

          {/* Content Box */}
          <div className="relative z-10 bg-gray-50/95 rounded-xl shadow-2xl max-w-3xl mx-4 p-6 md:p-12 text-center text-black">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8">LESSONS</h2>
            
            <div className="space-y-6 text-base md:text-lg text-black">
              <p className="font-semibold">
                IN-PERSON LESSONS IN MANCHESTER CITY CENTRE AVAILABLE FOR THOSE WANTING TO WORK IN PERSON.
              </p>

              <p className="font-semibold">
                ADDITIONALLY, THE FLEXIBILITY OF ONLINE LESSONS IS STILL AVAILABLE TO THOSE WANTING VOICE LESSONS ANYWHERE IN UK AND BEYOND.
              </p>

              <p>
                Singing lessons can be arranged to be taken online or in-person in Manchester City Centre (easily accessible from Manchester Piccadilly and Manchester Oxford Road stations nearby paid parking is also available).
              </p>

              <p>
                Voice lessons are 1 hour and prices are shown below.<br />
                Offers are available for block bookings of five or ten lessons.
              </p>

              <p>
                <Link href="/book-now" className="text-blue-600 hover:text-blue-800 underline">
                  Click Here
                </Link>
                {' '}to pay for your lesson now.<br />
                Remember to email or text Ashleigh after paying to arrange your lesson.
              </p>

              <div className="my-8">
                <h3 className="text-2xl font-bold mb-4">Lesson Prices</h3>
                <p>1 hour - £45</p>
                <p>Prices for block bookings can be viewed here</p>
              </div>

              <div className="bg-gray-100 p-6 rounded-lg text-black">
                <h3 className="text-2xl font-bold mb-4">DISCOUNT</h3>
                <p>
                  MU Members, Equity Members and current Students are eligible for a 10% discount on all block booking rates,{' '}
                  <Link href="/contact" className="text-blue-600 hover:text-blue-800 underline">
                    message Ashleigh
                  </Link>
                  {' '}with proof of membership to claim your discount.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="min-h-screen bg-gray-50 py-12 md:py-20 text-black">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">Testimonials</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {/* Testimonial 1 */}
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow text-black">
                <p className="text-gray-700 italic">
                  &quot;Ashleigh&apos;s lessons are structured and well executed. His lessons are split into Easy to follow sections 
                  and the teaching quality is great. I have enjoyed all of my lessons so far and will continue to have 
                  lessons with Ashleigh for the foreseeable future!&quot;
                </p>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow text-black">
                <p className="text-gray-700 italic">
                  &quot;Alongside Ashleigh&apos;s impressive knowledge and abilities both internal and external to his discipline, 
                  Ashleigh has the patience, empathetic understanding, and social intelligence necessary to ensure that 
                  the learner can engage with and comprehend complex theories and techniques.&quot;
                </p>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow text-black">
                <p className="text-gray-700 italic">
                  &quot;I started singing lessons with Ashleigh so that I could sing to my girlfriend on her birthday. 
                  I&apos;m so pleased with the progress that we made in just 3 weeks that I&apos;m now looking forward to 
                  my next goal so that we can continue working together!&quot;
                </p>
              </div>

              {/* Testimonial 4 */}
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow text-black">
                <p className="text-gray-700 italic">
                  &quot;Ashleigh is genuinely the best singing teacher I have ever had (and I have all my lessons online) - 
                  so that says it all! He is friendly, productive and uses the lesson time to its full potential. He is 
                  extremely knowledgeable and has taught me a wide range of techniques. I now understand in detail the 
                  anatomy of the neck, tongue and vocal cords which has helped me to understand where to safely place 
                  sound whilst achieving amazing vocal quality. He tailors each lesson to YOU on what YOU want to learn. 
                  I wouldn&apos;t go to anybody else as my progression is incredible.&quot;
                </p>
              </div>

              {/* Testimonial 5 */}
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow text-black">
                <p className="text-gray-700 italic">
                  &quot;I connected with Ashleigh after previous attempts to work on my voice were a bit of a slog and 
                  lessons I had with a previous teacher felt very formulaic. After a long break from singing, restarting 
                  lessons with Ashleigh was massively different. My first lesson immediately focused on practical advice 
                  to work on my speicific goals. Ashleigh seemed to listen and match my goals to my style of music and 
                  have a number of tools at hand to help me with that. It&apos;s no exageration to say that after my first 
                  lesson I was buzzing with the possibilities and had made progress. My bass voice now doesn&apos;t seem as 
                  restrictive as it had before and I have areas to work on. Since then I have made good progress and 
                  every lesson gives me things to think about and seems applicable to my singing immediately.&quot;
                </p>
              </div>

              {/* Testimonial 6 */}
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow text-black">
                <p className="text-gray-700 italic">
                  &quot;Less than a handful of lessons in and I am already benefiting from the level of insight and knowledge 
                  that Ashleigh has. He explains difficult concepts in a manner that is easy for me to understand, and 
                  tailors my vocal exercises so they are challenging but achievable. I consider myself between a beginner 
                  and intermediate vocalist, and I feel that with consistent lessons with Ashleigh I can take my ability 
                  to the next level. I find that certain misconceptions and doubts that I had have been dispelled, and am 
                  gaining in confidence from some of the benchmarks that Ashleigh has laid down.&quot;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-black text-white py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
              {/* Left Column - Contact Info */}
              <div className="space-y-6">
                <h2 className="text-4xl font-bold">CONTACT ASHLEIGH</h2>
                <p className="text-base md:text-lg">
                  Want singing lessons in Manchester? Or looking for online singing lessons? 
                  Contact Ashleigh by email or call/text with the details below or use the in-site contact form.
                </p>
                <div className="space-y-2">
                  <a 
                    href="mailto:ashleigh.dowler@hotmail.co.uk"
                    className="text-base md:text-lg block hover:text-gray-300 transition-colors text-white"
                  >
                    ashleigh.dowler@hotmail.co.uk
                  </a>
                  <a 
                    href="tel:07841049513"
                    className="text-base md:text-lg block hover:text-gray-300 transition-colors text-white"
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
                    className="w-full bg-transparent border-b border-white px-3 py-2 focus:outline-none group-hover:border group-hover:border-white transition-all text-white placeholder-gray-300"
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
                    className="w-full bg-transparent border-b border-white px-3 py-2 focus:outline-none group-hover:border group-hover:border-white transition-all text-white placeholder-gray-300"
                  />
                </div>

                <div className="group">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone"
                    className="w-full bg-transparent border-b border-white px-3 py-2 focus:outline-none group-hover:border group-hover:border-white transition-all text-white placeholder-gray-300"
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
                    className="w-full bg-transparent border-b border-white px-3 py-2 focus:outline-none group-hover:border group-hover:border-white transition-all text-white placeholder-gray-300"
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
                    className="w-full bg-transparent border-b border-white px-3 py-2 focus:outline-none group-hover:border group-hover:border-white transition-all resize-none text-white placeholder-gray-300"
                  ></textarea>
                </div>

                {submitStatus === 'success' && (
                  <div className="text-green-400 text-center">
                    Message sent successfully! We&apos;ll get back to you soon.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="text-red-400 text-center">
                    Failed to send message. Please try again or contact us directly.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-white text-black py-3 text-center transition-colors ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'
                  }`}
                >
                  {isSubmitting ? 'Sending...' : 'Submit'}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-4 md:py-6 text-center border-t border-white/10">
        <div className="container mx-auto px-4">
          <p className="text-xs md:text-sm">©2025 by Ashleigh D Voice Coaching.</p>
        </div>
      </footer>
    </div>
  );
}
