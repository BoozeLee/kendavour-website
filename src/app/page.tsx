'use client';

import dynamic from 'next/dynamic';
import { Suspense, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import NeuralLinkLoading from '@/components/NeuralLinkLoading';
import AudioEngine from '@/components/AudioEngine';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Theatre.js project (ready for integration)

// Dynamically import MainScene to avoid SSR issues
const MainScene = dynamic(() => import('@/components/MainScene'), {
  ssr: false,
});

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const { scrollYProgress } = useScroll();

  const fontWeight = useTransform(scrollYProgress, [0, 0.5], [400, 900]);
  const letterSpacing = useTransform(scrollYProgress, [0, 0.5], ['0px', '10px']);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (loaded) {
      // GSAP ScrollTrigger animations
      gsap.from("#about", {
        scrollTrigger: {
          trigger: "#about",
          start: "top 80%",
          end: "bottom 20%",
          scrub: true,
        },
        y: 100,
        opacity: 0,
        duration: 1,
      });

      gsap.from("#mixes", {
        scrollTrigger: {
          trigger: "#mixes",
          start: "top 80%",
          end: "bottom 20%",
          scrub: true,
        },
        y: 100,
        opacity: 0,
        duration: 1,
      });

      gsap.from("#live", {
        scrollTrigger: {
          trigger: "#live",
          start: "top 80%",
          end: "bottom 20%",
          scrub: true,
        },
        x: -100,
        opacity: 0,
        duration: 1,
      });

      gsap.from("#gallery", {
        scrollTrigger: {
          trigger: "#gallery",
          start: "top 80%",
          end: "bottom 20%",
          scrub: true,
        },
        scale: 0.8,
        opacity: 0,
        duration: 1,
      });

      gsap.from("#contact", {
        scrollTrigger: {
          trigger: "#contact",
          start: "top 80%",
          end: "bottom 20%",
          scrub: true,
        },
        y: -100,
        opacity: 0,
        duration: 1,
      });
    }
  }, [loaded]);

  if (!loaded) {
    return <NeuralLinkLoading onComplete={() => setLoaded(true)} />;
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <AudioEngine />
      <Suspense fallback={<div className="w-full h-screen bg-black flex items-center justify-center text-acid-green">Initializing Jazz Mafia Protocol...</div>}>
        <MainScene />
      </Suspense>

      {/* UI Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-y-auto">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-20 bg-black bg-opacity-80 border-b border-acid-green">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div className="text-acid-green text-2xl font-bold">KEN DEAVOR</div>
              <div className="grid grid-cols-5 gap-4 text-sm">
                <a href="#about" className="border border-acid-green px-3 py-1 text-acid-green hover:bg-acid-green hover:text-black transition-all pointer-events-auto">About</a>
                <a href="#mixes" className="border border-acid-green px-3 py-1 text-acid-green hover:bg-acid-green hover:text-black transition-all pointer-events-auto">Mixes</a>
                <a href="#live" className="border border-acid-green px-3 py-1 text-acid-green hover:bg-acid-green hover:text-black transition-all pointer-events-auto">Live</a>
                <a href="#gallery" className="border border-acid-green px-3 py-1 text-acid-green hover:bg-acid-green hover:text-black transition-all pointer-events-auto">Gallery</a>
                <a href="#contact" className="border border-acid-green px-3 py-1 text-acid-green hover:bg-acid-green hover:text-black transition-all pointer-events-auto">Contact</a>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <motion.section
          className="min-h-screen flex flex-col items-center justify-center px-4 pt-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, stiffness: 400, damping: 10 }}
        >
          <motion.h1
            className="text-6xl md:text-8xl text-acid-green mb-8 text-center"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            style={{ fontWeight, letterSpacing }}
          >
            KEN DEAVOR
          </motion.h1>
          <motion.p
            className="text-xl text-acid-green mb-12 text-center max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            BASE ØF RAVES
          </motion.p>
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <div className="bg-black bg-opacity-50 backdrop-blur-sm border border-acid-green p-4 text-center rounded">
              <div className="text-2xl text-acid-green font-bold">1.2K</div>
              <div className="text-sm text-acid-green">Subscribers</div>
            </div>
            <div className="bg-black bg-opacity-50 backdrop-blur-sm border border-acid-green p-4 text-center rounded">
              <div className="text-2xl text-acid-green font-bold">45K</div>
              <div className="text-sm text-acid-green">Total Views</div>
            </div>
            <div className="bg-black bg-opacity-50 backdrop-blur-sm border border-acid-green p-4 text-center rounded">
              <div className="text-2xl text-acid-green font-bold">25+</div>
              <div className="text-sm text-acid-green">Mixes</div>
            </div>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <motion.a
              href="https://www.youtube.com/@KENDAV%C3%98UR?sub_confirmation=1"
              className="px-6 py-3 border border-acid-green text-acid-green bg-transparent hover:bg-acid-green hover:text-black transition-all duration-300 pointer-events-auto text-center"
              whileHover={{ scale: 1.05, backgroundColor: '#DFFF00', color: '#000000' }}
              whileTap={{ scale: 0.95 }}
              aria-label="Subscribe to BASE ØF RAVES YouTube Channel"
            >
              Subscribe to BASE ØF RAVES
            </motion.a>
            <motion.a
              href="#mixes"
              className="px-6 py-3 border border-acid-green text-acid-green bg-transparent hover:bg-acid-green hover:text-black transition-all duration-300 pointer-events-auto text-center"
              whileHover={{ scale: 1.05, backgroundColor: '#DFFF00', color: '#000000' }}
              whileTap={{ scale: 0.95 }}
            >
              Latest Mix
            </motion.a>
            <motion.a
              href="#contact"
              className="px-6 py-3 border border-acid-green text-acid-green bg-transparent hover:bg-acid-green hover:text-black transition-all duration-300 pointer-events-auto text-center"
              whileHover={{ scale: 1.05, backgroundColor: '#DFFF00', color: '#000000' }}
              whileTap={{ scale: 0.95 }}
            >
              Join the Trance
            </motion.a>
          </motion.div>
        </motion.section>

        {/* About */}
        <section id="about" className="min-h-screen flex items-center justify-center px-4 py-20">
          <div className="max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-acid-green mb-6">Enter KENDAVØUR's World</h2>
              <p className="text-acid-green mb-4">// SYSTEM STATUS: HYPNOTIC</p>
              <p className="text-white mb-4">Ken Kuyks, the dark techno maestro from Belgium, crafts hypnotic soundscapes that plunge listeners into the abyss of hard techno. His mixes distort reality, blending industrial beats with poison-green frequencies and blood-red basslines.</p>
              <p className="text-white">This is the <strong className="text-acid-green">Dark Rave Domain</strong>. Enter and surrender to the trance. Loyalty is rewarded in decibels. Contact: <a href="mailto:kenkuyks@hotmail.com" className="text-acid-green hover:underline">kenkuyks@hotmail.com</a></p>
            </div>
            <div className="border-2 border-acid-green p-4 transform rotate-2">
              <img src="/hero.jpg" alt="Dark Techno DJ" className="w-full grayscale contrast-125" />
            </div>
          </div>
        </section>

        {/* Mixes */}
        <section id="mixes" className="min-h-screen flex items-center justify-center px-4 py-20 bg-black bg-opacity-50">
          <div className="max-w-6xl">
            <h2 className="text-4xl font-bold text-acid-green mb-12 text-center">Popular Mixes</h2>
            <p className="text-acid-green mb-8 text-center">Dive deeper into the dark techno abyss</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="border border-acid-green p-6 hover:bg-acid-green hover:text-black transition-all duration-300">
                <h3 className="text-xl font-bold mb-2">Techno Abyss Vol.1</h3>
                <p className="mb-4">Industrial beats and hypnotic rhythms</p>
                <a href="https://www.youtube.com/@KENDAV%C3%98UR" className="text-acid-green hover:underline pointer-events-auto">Watch on YouTube</a>
              </div>
              <div className="border border-acid-green p-6 hover:bg-acid-green hover:text-black transition-all duration-300">
                <h3 className="text-xl font-bold mb-2">Hypnotic Trance Set</h3>
                <p className="mb-4">Poison frequencies and blood-red bass</p>
                <a href="https://www.youtube.com/@KENDAV%C3%98UR" className="text-acid-green hover:underline pointer-events-auto">Watch on YouTube</a>
              </div>
              <div className="border border-acid-green p-6 hover:bg-acid-green hover:text-black transition-all duration-300">
                <h3 className="text-xl font-bold mb-2">Dark Rave Protocol</h3>
                <p className="mb-4">Underground energy unleashed</p>
                <a href="https://www.youtube.com/@KENDAV%C3%98UR" className="text-acid-green hover:underline pointer-events-auto">Watch on YouTube</a>
              </div>
              <div className="border border-acid-green p-6 hover:bg-acid-green hover:text-black transition-all duration-300">
                <h3 className="text-xl font-bold mb-2">Void Collapse Mix</h3>
                <p className="mb-4">Distorted realities and cyber echoes</p>
                <a href="https://www.youtube.com/@KENDAV%C3%98UR" className="text-acid-green hover:underline pointer-events-auto">Watch on YouTube</a>
              </div>
            </div>
          </div>
        </section>

        {/* Live */}
        <section id="live" className="min-h-screen flex items-center justify-center px-4 py-20">
          <div className="max-w-6xl">
            <h2 className="text-4xl font-bold text-acid-green mb-12 text-center">Live & Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border border-acid-green p-6">
                <div className="text-blood-red mb-2">[ CLASSIFIED ]</div>
                <h3 className="text-xl font-bold mb-2">DARK ABYSS RAVE</h3>
                <p className="mb-2">SECRET LOCATION, BERLIN</p>
                <p className="text-acid-green mb-4">*Hypnotic Trance Required</p>
                <button className="w-full border border-acid-green text-acid-green px-4 py-2 hover:bg-acid-green hover:text-black transition-all pointer-events-auto">Enter the Void</button>
              </div>
              <div className="border border-acid-green p-6">
                <div className="text-blood-red mb-2">[ CLASSIFIED ]</div>
                <h3 className="text-xl font-bold mb-2">TECHNOKILL FESTIVAL</h3>
                <p className="mb-2">SECRET LOCATION, AMSTERDAM</p>
                <p className="text-acid-green mb-4">*Hypnotic Trance Required</p>
                <button className="w-full border border-acid-green text-acid-green px-4 py-2 hover:bg-acid-green hover:text-black transition-all pointer-events-auto">Enter the Void</button>
              </div>
              <div className="border border-acid-green p-6">
                <div className="text-blood-red mb-2">[ CLASSIFIED ]</div>
                <h3 className="text-xl font-bold mb-2">BLOOD MOON RAVE</h3>
                <p className="mb-2">SECRET LOCATION, PARIS</p>
                <p className="text-acid-green mb-4">*Hypnotic Trance Required</p>
                <button className="w-full border border-acid-green text-acid-green px-4 py-2 hover:bg-acid-green hover:text-black transition-all pointer-events-auto">Enter the Void</button>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section id="gallery" className="min-h-screen flex items-center justify-center px-4 py-20 bg-black bg-opacity-50">
          <div className="max-w-6xl">
            <h2 className="text-4xl font-bold text-acid-green mb-12 text-center">Visual Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="relative group">
                <img src="/press_shot.jpg" alt="Press Shot" className="w-full h-64 object-cover border border-acid-green" />
                <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-acid-green">Live at Warehouse Rave 2025</p>
                </div>
              </div>
              <div className="relative group">
                <img src="/studio_session.jpg" alt="Studio Session" className="w-full h-64 object-cover border border-acid-green" />
                <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-acid-green">Studio Session</p>
                </div>
              </div>
              <div className="relative group">
                <img src="/festival_appearance.jpg" alt="Festival Appearance" className="w-full h-64 object-cover border border-acid-green" />
                <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-acid-green">Festival Setup</p>
                </div>
              </div>
              <div className="relative group">
                <img src="/equipment_closeup.jpg" alt="Equipment Close-up" className="w-full h-64 object-cover border border-acid-green" />
                <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-acid-green">Equipment Close-up</p>
                </div>
              </div>
              <div className="relative group">
                <img src="/crowd_energy.jpg" alt="Crowd Energy" className="w-full h-64 object-cover border border-acid-green" />
                <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-acid-green">Crowd Energy</p>
                </div>
              </div>
              <div className="relative group">
                <img src="/afterparty_vibes.jpg" alt="Afterparty Vibes" className="w-full h-64 object-cover border border-acid-green" />
                <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-acid-green">Afterparty Vibes</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="min-h-screen flex items-center justify-center px-4 py-20">
          <div className="max-w-2xl text-center">
            <h2 className="text-4xl font-bold text-acid-green mb-8">Dark Techno Collective</h2>
            <p className="text-acid-green mb-8">Surrender to the Hypnosis</p>
            <form className="space-y-4">
              <input type="email" placeholder="Enter your neural link" className="w-full p-3 bg-transparent border border-acid-green text-acid-green placeholder-acid-green" aria-label="Email address for newsletter" required />
              <select className="w-full p-3 bg-transparent border border-acid-green text-acid-green" aria-label="Select your region" required>
                <option value="">Select your dimension</option>
                <option value="eu">Europe</option>
                <option value="us">United States</option>
                <option value="asia">Asia</option>
                <option value="other">Other</option>
              </select>
              <button type="submit" className="w-full border border-acid-green text-acid-green px-6 py-3 hover:bg-acid-green hover:text-black transition-all pointer-events-auto" aria-label="Subscribe to newsletter">Enter the Trance</button>
            </form>
            <p className="mt-4 text-sm text-acid-green opacity-70">We hijack your inbox ethically. No mercy.</p>
            <div className="flex justify-center space-x-4 mt-8">
              <a href="#" className="border border-acid-green text-acid-green px-4 py-2 hover:bg-acid-green hover:text-black transition-all pointer-events-auto">Discord</a>
              <a href="#" className="border border-acid-green text-acid-green px-4 py-2 hover:bg-acid-green hover:text-black transition-all pointer-events-auto">Telegram</a>
              <a href="https://www.youtube.com/@KENDAV%C3%98UR" className="border border-acid-green text-acid-green px-4 py-2 hover:bg-acid-green hover:text-black transition-all pointer-events-auto">YouTube</a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black bg-opacity-80 border-t border-acid-green py-8 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-acid-green">&copy; 2026 KENDAVØUR. All rights reserved. | BASE ØF RAVES</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
