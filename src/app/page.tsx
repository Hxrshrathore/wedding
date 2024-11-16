'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, MapPin, Calendar, Clock, Moon, Sun, Menu, X, Volume2, VolumeX } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Toggle } from "@/components/ui/toggle"

const slideImages = [
  '/path-to-couple-image-1.jpg',
  '/path-to-couple-image-2.jpg',
  '/path-to-couple-image-3.jpg',
]

export default function LuxuryWeddingInvitation() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [theme, setTheme] = useState('light')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [cursorPosition, setCursorPosition] = useState({ x: -100, y: -100 })
  const [cursorColor, setCursorColor] = useState('white')
  const [isHovering, setIsHovering] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const menuRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slideImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }

    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const nextSlide = () => setCurrentSlide((prevSlide) => (prevSlide + 1) % slideImages.length)
  const prevSlide = () => setCurrentSlide((prevSlide) => (prevSlide - 1 + slideImages.length) % slideImages.length)

  const toggleTheme = () => setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  const handleMouseEnter = () => setCursorColor(theme === 'dark' ? 'white' : 'black')
  const handleMouseLeave = () => setCursorColor('white')

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  useEffect(() => {
    const playAudio = async () => {
      try {
        await audioRef.current?.play()
        setIsPlaying(true)
      } catch (error) {
        console.log("Autoplay failed:", error)
        setIsPlaying(false)
      }
    }

    playAudio()
  }, [])

  const [daysUntilWedding, setDaysUntilWedding] = useState(0)

  useEffect(() => {
    const weddingDate = new Date('2024-11-23T00:00:00')
    const calculateDaysLeft = () => {
      const today = new Date()
      const timeDiff = weddingDate.getTime() - today.getTime()
      const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24))
      setDaysUntilWedding(daysLeft)
    }
    calculateDaysLeft()
    const timer = setInterval(calculateDaysLeft, 1000 * 60 * 60)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 font-sans">
      <div
        ref={cursorRef}
        className="fixed w-6 h-6 rounded-full pointer-events-none z-50 transition-all duration-100 ease-out mix-blend-difference"
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
          backgroundColor: cursorColor,
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`,
          opacity: 1,
        }}
      />

      <header className="fixed top-0 left-0 right-0 z-40 bg-white/10 dark:bg-gray-900/10 backdrop-blur-md">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <button className="md:hidden text-2xl" onClick={() => setIsMenuOpen(true)}>
            <Menu />
          </button>
          <ul className="hidden md:flex space-x-6 text-sm uppercase tracking-widest">
            <li><a href="#home" onClick={() => scrollToSection('home')} className="hover:text-pink-500 transition-colors" onMouseEnter={() => handleMouseEnter('white')} onMouseLeave={handleMouseLeave}>Home</a></li>
            <li><a href="#couple" onClick={() => scrollToSection('couple')} className="hover:text-pink-500 transition-colors" onMouseEnter={() => handleMouseEnter('white')} onMouseLeave={handleMouseLeave}>Couple</a></li>
            <li><a href="#story" onClick={() => scrollToSection('story')} className="hover:text-pink-500 transition-colors" onMouseEnter={() => handleMouseEnter('white')} onMouseLeave={handleMouseLeave}>Our Story</a></li>
            <li><a href="#events" onClick={() => scrollToSection('events')} className="hover:text-pink-500 transition-colors" onMouseEnter={() => handleMouseEnter('white')} onMouseLeave={handleMouseLeave}>Events</a></li>
            <li><a href="#gallery" onClick={() => scrollToSection('gallery')} className="hover:text-pink-500 transition-colors" onMouseEnter={() => handleMouseEnter('white')} onMouseLeave={handleMouseLeave}>Gallery</a></li>
            <li><a href="#rsvp" onClick={() => scrollToSection('rsvp')} className="hover:text-pink-500 transition-colors" onMouseEnter={() => handleMouseEnter('white')} onMouseLeave={handleMouseLeave}>RSVP</a></li>
          </ul>
          <Toggle pressed={theme === 'dark'} onPressedChange={toggleTheme} aria-label="Toggle theme">
            {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </Toggle>
        </nav>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-50 bg-gradient-to-br from-pink-100 to-blue-100 dark:from-gray-800 dark:to-gray-700 backdrop-blur-md"
          >
            <div className="flex flex-col h-full justify-center items-center space-y-8 text-2xl">
              <button className="absolute top-4 right-4 text-3xl" onClick={() => setIsMenuOpen(false)}>
                <X />
              </button>
              <a href="#home" onClick={() => scrollToSection('home')} className="hover:text-pink-500 transition-colors" onMouseEnter={() => handleMouseEnter('white')} onMouseLeave={handleMouseLeave}>Home</a>
              <a href="#couple" onClick={() => scrollToSection('couple')} className="hover:text-pink-500 transition-colors" onMouseEnter={() => handleMouseEnter('white')} onMouseLeave={handleMouseLeave}>Couple</a>
              <a href="#story" onClick={() => scrollToSection('story')} className="hover:text-pink-500 transition-colors" onMouseEnter={() => handleMouseEnter('white')} onMouseLeave={handleMouseLeave}>Our Story</a>
              <a href="#events" onClick={() => scrollToSection('events')} className="hover:text-pink-500 transition-colors" onMouseEnter={() => handleMouseEnter('white')} onMouseLeave={handleMouseLeave}>Events</a>
              <a href="#gallery" onClick={() => scrollToSection('gallery')} className="hover:text-pink-500 transition-colors" onMouseEnter={() => handleMouseEnter('white')} onMouseLeave={handleMouseLeave}>Gallery</a>
              <a href="#rsvp" onClick={() => scrollToSection('rsvp')} className="hover:text-pink-500 transition-colors" onMouseEnter={() => handleMouseEnter('white')} onMouseLeave={handleMouseLeave}>RSVP</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
          <AnimatePresence initial={false}>
            <motion.img
              key={currentSlide}
              src={slideImages[currentSlide]}
              alt={`Couple Image ${currentSlide + 1}`}
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/30 to-blue-500/30" />
          <div className="relative z-10 text-center text-white">
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-8xl font-serif mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Shrishty & Vikash
            </motion.h1>
            <motion.div
              className="mt-8 p-4 bg-white/20 backdrop-blur-md rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <p className="text-2xl md:text-3xl font-light">
                <span className="font-bold text-3xl md:text-4xl">{daysUntilWedding}</span> days until we say "I do"
              </p>
            </motion.div>
            <motion.p 
              className="text-lg md:text-xl lg:text-2xl font-light mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              November 23, 2024 • Varansi
            </motion.p>
          </div>
          <button onClick={prevSlide} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white" onMouseEnter={() => handleMouseEnter('black')} onMouseLeave={handleMouseLeave}>
            <ChevronLeft size={24} />
          </button>
          <button onClick={nextSlide} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white" onMouseEnter={() => handleMouseEnter('black')} onMouseLeave={handleMouseLeave}>
            <ChevronRight size={24} />
          </button>
        </section>

        <section id="couple" className="py-24 px-4 bg-gradient-to-br from-pink-100 to-blue-100 dark:from-gray-800 dark:to-gray-700">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-12">The Couple</h2>
            <div className="flex flex-col md:flex-row gap-12 justify-center">
              <div className="flex-1">
                <motion.img
                  src="/path-to-bride-image.jpg"
                  alt="Bride"
                  className="w-48 h-48 md:w-64 md:h-64 mx-auto rounded-full object-cover mb-6 border-4 border-pink-200 dark:border-pink-400"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  onMouseEnter={() => handleMouseEnter('black')}
                  onMouseLeave={handleMouseLeave}
                />
                <h3 className="text-xl md:text-2xl font-serif mb-2">Shrishty</h3>
                <p className="text-gray-600 dark:text-gray-300">A talented artist with a heart of gold</p>
              </div>
              <div className="flex-1">
                <motion.img
                  src="/path-to-groom-image.jpg"
                  alt="Groom"
                  className="w-48 h-48 md:w-64 md:h-64 mx-auto rounded-full object-cover mb-6 border-4 border-blue-200 dark:border-blue-400"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  onMouseEnter={() => handleMouseEnter('black')}
                  onMouseLeave={handleMouseLeave}
                />
                <h3 className="text-xl md:text-2xl font-serif mb-2">Vikash</h3>
                <p className="text-gray-600 dark:text-gray-300">A passionate entrepreneur with a vision for the future</p>
              </div>
            </div>
          </div>
        </section>

        <section id="story" className="py-24 px-4 bg-gradient-to-br from-blue-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-12">Our Love Story</h2>
            <p className="text-base md:text-lg mb-12 text-gray-600 dark:text-gray-300">
              Two souls intertwined by destiny, Shrishty and Vikash's love story began in the bustling streets of Mumbai. 
              Their journey from chance encounters to soulmates is a testament to the magic of true love.
            </p>
            <div className="space-y-12">
              <div className="flex items-center">
                <div className="flex-1 text-right pr-4">
                  <h3 className="text-xl font-semibold">First Meet</h3>
                  <p className="text-gray-600 dark:text-gray-300">At a local art gallery</p>
                </div>
                <div className="w-4 h-4 bg-pink-400 rounded-full"></div>
                <div className="flex-1 text-left pl-4">
                  <p className="text-gray-600 dark:text-gray-300">September 2020</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-1 text-right pr-4">
                  <p className="text-gray-600 dark:text-gray-300">December 2020</p>
                </div>
                <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
                <div className="flex-1 text-left pl-4">
                  <h3 className="text-xl font-semibold">First Date</h3>
                  <p className="text-gray-600 dark:text-gray-300">Romantic dinner by the sea</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-1 text-right pr-4">
                  <h3 className="text-xl font-semibold">Proposal</h3>
                  <p className="text-gray-600 dark:text-gray-300">Under the stars at Taj Mahal</p>
                </div>
                <div className="w-4 h-4 bg-purple-400 rounded-full"></div>
                <div className="flex-1 text-left pl-4">
                  <p className="text-gray-600 dark:text-gray-300">February 2023</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="events" className="py-24 px-4 bg-gradient-to-br from-pink-100 to-blue-100 dark:from-gray-800 dark:to-gray-700">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-center mb-12">Wedding Events</h2>
            <div className="space-y-12">
              {[
                {
                  name: 'Mehndi Night',
                  date: 'November 21, 2024',
                  time: '7:00 PM - 11:00 PM',
                  venue: 'Lotus Garden',
                  address: '123 Floral Avenue, Juhu, Mumbai 400049',
                  mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.0126353064897!2d72.82766931490721!3d19.10768478706484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9b888ae67dd%3A0xe0b9538d623ac5d2!2sJuhu%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1605907675585!5m2!1sen!2sin'
                },
                {
                  name: 'Sangeet Ceremony',
                  date: 'November 22, 2024',
                  time: '6:00 PM - 12:00 AM',
                  venue: 'Golden Ballroom, Taj Palace',
                  address: '456 Luxury Lane, Colaba, Mumbai 400005',
                  mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3774.2136888285895!2d72.83071331490398!3d18.92169198717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7d1c73a0d5cad%3A0xc70a25a7209c733c!2sColaba%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1605907731486!5m2!1sen!2sin'
                },
                {
                  name: 'Wedding Ceremony',
                  date: 'November 23, 2024',
                  time: '10:00 AM - 2:00 PM',
                  venue: 'The Regal Gardens',
                  address: '789 Royal Road, Worli, Mumbai 400018',
                  mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.6693379677587!2d72.81520731490528!3d18.99900618714738!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cee0dd394491%3A0x9f52e71b05151653!2sWorli%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1605907781058!5m2!1sen!2sin'
                },
                {
                  name: 'Reception Gala',
                  date: 'November 23, 2024',
                  time: '7:00 PM - 1:00 AM',
                  venue: 'The Grand Ballroom, The Regal Palace',
                  address: '789 Royal Road, Worli, Mumbai 400018',
                  mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.6693379677587!2d72.81520731490528!3d18.99900618714738!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cee0dd394491%3A0x9f52e71b05151653!2sWorli%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1605907781058!5m2!1sen!2sin'
                }
              ].map((event, index) => (
                <Card key={event.name} className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-pink-50 to-blue-50 dark:from-gray-800 dark:to-gray-700" onMouseEnter={() => handleMouseEnter('black')} onMouseLeave={handleMouseLeave}>
                  <CardContent className="p-6">
                    <div className="md:flex md:space-x-6">
                      <div className="md:w-1/2">
                        <h3 className="text-xl md:text-2xl font-serif mb-4">{event.name}</h3>
                        <div className="flex items-center mb-2">
                          <Calendar className="mr-2 text-pink-500" size={20} />
                          <p>{event.date}</p>
                        </div>
                        <div className="flex items-center mb-2">
                          <Clock className="mr-2 text-blue-500" size={20} />
                          <p>{event.time}</p>
                        </div>
                        <div className="flex items-start mb-2">
                          <MapPin className="mr-2 mt-1 text-purple-500" size={20} />
                          <div>
                            <p className="font-semibold">{event.venue}</p>
                            <p>{event.address}</p>
                          </div>
                        </div>
                      </div>
                      <div className="md:w-1/2 mt-4 md:mt-0">
                        <iframe
                          src={event.mapUrl}
                          width="100%"
                          height="200"
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          className="rounded-lg"
                        ></iframe>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>



        
      </main>

      <footer className="bg-gradient-to-br from-pink-100 to-blue-100 dark:from-gray-800 dark:to-gray-700 text-gray-600 dark:text-gray-300 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xl md:text-2xl font-serif mb-4">Join us in celebrating our love</p>
          <p className="mb-6">Singh Family</p>
          <p className="text-sm">
            Website created with love by {' '}
            <a href="https://hxrshrathore.me" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-600 transition-colors" onMouseEnter={() => handleMouseEnter('black')} onMouseLeave={handleMouseLeave}>
              Harsh :)
            </a>
          </p>
        </div>
      </footer>

      <div className="fixed bottom-4 right-4 z-50">
        <audio ref={audioRef} loop>
          <source src="/path-to-your-background-music.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
        <button
          className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-md p-2 rounded-full shadow-lg"
          onClick={toggleAudio}
        >
          {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </button>
      </div>
    </div>
  )
}