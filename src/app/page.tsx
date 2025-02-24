'use client';

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";

export default function Home() {
  const [isFading, setIsFading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fade in on initial load
    setIsLoading(false);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 140; // Height of header (approx 128px) + some padding
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className={`min-h-screen transition-opacity duration-500 ${isLoading || isFading ? 'opacity-0' : 'opacity-100'}`}>
      {/* Header and Navigation */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-50">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-center mb-6">
            ASHLEIGH D VOICE COACHING
          </h1>
          <nav className="flex justify-center space-x-6 text-lg">
            <button onClick={() => scrollToSection("home")} className="hover:text-gray-600">
              Home
            </button>
            <button onClick={() => scrollToSection("about")} className="hover:text-gray-600">
              About
            </button>
            <button onClick={() => scrollToSection("lessons")} className="hover:text-gray-600">
              Lessons
            </button>
            <button onClick={() => scrollToSection("testimonials")} className="hover:text-gray-600">
              Testimonials
            </button>
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

      {/* Main Content Sections */}
      <main className="pt-40">
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
          <div className="relative z-10 flex flex-col items-center gap-8 text-white">
            <h2 className="text-5xl font-bold text-center drop-shadow-lg">
              Welcome to Ashleigh D Voice Coaching
            </h2>
            <div className="flex gap-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-4xl hover:text-blue-400 transition-colors drop-shadow-lg"
              >
                <FaFacebook />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-4xl hover:text-pink-400 transition-colors drop-shadow-lg"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="min-h-screen bg-gray-50 py-20">
          <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Image */}
            <div className="relative h-full min-h-[800px]">
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
              <div className="flex items-start gap-6">
                <h2 className="text-4xl font-bold">
                  ABOUT<br />ASHLEIGH
                </h2>
                <div className="relative w-[150px] h-[150px]">
                  <Image
                    src="/EMT estill master trainer badge.avif"
                    alt="Estill Master Trainer Badge"
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </div>

              <p className="text-lg">
                I am a professional vocal coach providing voice lessons in Manchester City Centre in the north-west of England, 
                experienced across a variety of styles and genres. I have years of experience teaching a vast mix of students 
                from absolute beginners to professionals and pride myself on giving you the ability to take control and unlock 
                the potential of your voice. I am voice-science informed and EMT Certified by Estill Voice Technique as an 
                Estill Master Trainer.
              </p>

              <p className="text-lg">
                You can learn more about Estill Voice Technique at{' '}
                <a 
                  href="https://estillvoice.com/about/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  Estill Voice International's website here
                </a>.
              </p>

              <p className="text-lg">
                <a 
                  href="https://estillvoice.com/find-a-trainer/trainer-profile/?uid=1731"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  Click here to see Ashleigh's listing at EVI.
                </a>
              </p>

              <div className="mt-6">
                <h3 className="text-2xl font-bold mb-4">WORK WITH ME ON:</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Vocal Technique</h4>
                    <p className="text-lg">
                      Learn to sing with more ease, more intent and develop true control of your voice. 
                      Learn about how the voice works and gain effective and repeatable strategies to produce 
                      the voice you want. We all want to stop reaching and pushing and start allowing the voice 
                      to soar and a understanding your voice is pivotal to this. Learn how to sing smart, not hard.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold mb-2">Performance Technique</h4>
                    <p className="text-lg">
                      Look and feel more natural, commanding and engaging in your performances and really connect 
                      to your material. As singers, speakers and actors, the most important job we have is to 
                      communicate and connect with our listeners and audience.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold mb-2">Confidence</h4>
                    <p className="text-lg">
                      Spend time and energy working on a new skill and see your confidence blossom! Many students 
                      comment that when the confidence in their voice grows so does their confidence in other areas of life.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold mb-2">Artistry</h4>
                    <p className="text-lg">
                      Develop your own sound and style and release the potential of your own unique voice.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <p className="text-lg">
                  If you're ready to take control of your voice, then contact Ashleigh to arrange a lesson 
                  in-person in Manchester or online.
                </p>

                <p className="text-lg">
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
        <section id="lessons" className="relative min-h-screen flex items-center justify-center">
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
          <div className="relative z-10 bg-gray-50/95 rounded-xl shadow-2xl max-w-3xl mx-4 p-8 md:p-12 text-center">
            <h2 className="text-4xl font-bold mb-8">LESSONS</h2>
            
            <div className="space-y-6 text-lg">
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

              <div className="bg-gray-100 p-6 rounded-lg">
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
        <section id="testimonials" className="min-h-screen bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Testimonials</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <p className="text-gray-700 italic">
                  "Ashleigh's lessons are structured and well executed. His lessons are split into Easy to follow sections 
                  and the teaching quality is great. I have enjoyed all of my lessons so far and will continue to have 
                  lessons with Ashleigh for the foreseeable future!"
                </p>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <p className="text-gray-700 italic">
                  "Alongside Ashleigh's impressive knowledge and abilities both internal and external to his discipline, 
                  Ashleigh has the patience, empathetic understanding, and social intelligence necessary to ensure that 
                  the learner can engage with and comprehend complex theories and techniques."
                </p>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <p className="text-gray-700 italic">
                  "I started singing lessons with Ashleigh so that I could sing to my girlfriend on her birthday. 
                  I'm so pleased with the progress that we made in just 3 weeks that I'm now looking forward to 
                  my next goal so that we can continue working together!"
                </p>
              </div>

              {/* Testimonial 4 */}
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <p className="text-gray-700 italic">
                  "Ashleigh is genuinely the best singing teacher I have ever had (and I have all my lessons online) - 
                  so that says it all! He is friendly, productive and uses the lesson time to its full potential. He is 
                  extremely knowledgeable and has taught me a wide range of techniques. I now understand in detail the 
                  anatomy of the neck, tongue and vocal cords which has helped me to understand where to safely place 
                  sound whilst achieving amazing vocal quality. He tailors each lesson to YOU on what YOU want to learn. 
                  I wouldn't go to anybody else as my progression is incredible."
                </p>
              </div>

              {/* Testimonial 5 */}
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <p className="text-gray-700 italic">
                  "I connected with Ashleigh after previous attempts to work on my voice were a bit of a slog and 
                  lessons I had with a previous teacher felt very formulaic. After a long break from singing, restarting 
                  lessons with Ashleigh was massively different. My first lesson immediately focused on practical advice 
                  to work on my speicific goals. Ashleigh seemed to listen and match my goals to my style of music and 
                  have a number of tools at hand to help me with that. It's no exageration to say that after my first 
                  lesson I was buzzing with the possibilities and had made progress. My bass voice now doesn't seem as 
                  restrictive as it had before and I have areas to work on. Since then I have made good progress and 
                  every lesson gives me things to think about and seems applicable to my singing immediately."
                </p>
              </div>

              {/* Testimonial 6 */}
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <p className="text-gray-700 italic">
                  "Less than a handful of lessons in and I am already benefiting from the level of insight and knowledge 
                  that Ashleigh has. He explains difficult concepts in a manner that is easy for me to understand, and 
                  tailors my vocal exercises so they are challenging but achievable. I consider myself between a beginner 
                  and intermediate vocalist, and I feel that with consistent lessons with Ashleigh I can take my ability 
                  to the next level. I find that certain misconceptions and doubts that I had have been dispelled, and am 
                  gaining in confidence from some of the benchmarks that Ashleigh has laid down."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-black text-white py-20">
          <div className="container mx-auto px-4">
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
                    className="text-lg block hover:text-blue-400 transition-colors"
                  >
                    ashleigh.dowler@hotmail.co.uk
                  </a>
                  <a 
                    href="tel:07841049513"
                    className="text-lg block hover:text-blue-400 transition-colors"
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
                    className="w-full bg-transparent border-b border-white px-3 py-2 focus:outline-none group-hover:border group-hover:border-white transition-all"
                  />
                </div>

                <div className="group">
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full bg-transparent border-b border-white px-3 py-2 focus:outline-none group-hover:border group-hover:border-white transition-all"
                  />
                </div>

                <div className="group">
                  <input
                    type="tel"
                    placeholder="Phone"
                    className="w-full bg-transparent border-b border-white px-3 py-2 focus:outline-none group-hover:border group-hover:border-white transition-all"
                  />
                </div>

                <div className="group">
                  <input
                    type="text"
                    placeholder="Subject"
                    className="w-full bg-transparent border-b border-white px-3 py-2 focus:outline-none group-hover:border group-hover:border-white transition-all"
                  />
                </div>

                <div className="group">
                  <textarea
                    placeholder="Type your message here..."
                    rows={4}
                    className="w-full bg-transparent border-b border-white px-3 py-2 focus:outline-none group-hover:border group-hover:border-white transition-all resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-white text-black py-3 text-center hover:bg-gray-200 transition-colors"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-6 text-center border-t border-white/10">
        <div className="container mx-auto px-4">
          <p className="text-sm">©2025 by Ashleigh D Voice Coaching.</p>
        </div>
      </footer>
    </div>
  );
}
