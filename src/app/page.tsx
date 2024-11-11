'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, MapPin, Calendar, Clock, Moon, Sun, Menu, X, Gift } from 'lucide-react'
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
  const menuRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)

  

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

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
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

  const handleMouseEnter = (color: string) => {
    setCursorColor(theme === 'dark' ? 'white' : 'black')
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setCursorColor('white')
    setIsHovering(false)
  }

  const eventAnimations = [
    {
      initial: { opacity: 0, x: -50 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.5 }
    },
    {
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5 }
    },
    {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.5 }
    },
    {
      initial: { opacity: 0, rotate: -10 },
      animate: { opacity: 1, rotate: 0 },
      transition: { duration: 0.5 }
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-blue-100 dark:from-purple-900 dark:to-blue-900 text-gray-900 dark:text-gray-100 font-cormorant">
<div
  ref={cursorRef}
  className="fixed w-6 h-6 rounded-full pointer-events-none z-50 transition-all duration-100 ease-out custom-cursor"
  style={{
    left: `${cursorPosition.x}px`,
    top: `${cursorPosition.y}px`,
    backgroundColor: cursorColor,
    transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`,
    opacity: 1,
  }}
/>



      <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <button className="md:hidden text-2xl" onClick={() => setIsMenuOpen(true)}>
            <Menu />
          </button>
          <ul className="hidden md:flex space-x-6 text-sm uppercase tracking-wider">
            <li><a href="#home" onClick={() => scrollToSection('home')} className="hover:text-gold-600 transition-colors" onMouseEnter={() => handleMouseEnter('white')} onMouseLeave={handleMouseLeave}>Home</a></li>
            <li><a href="#couple" onClick={() => scrollToSection('couple')} className="hover:text-gold-600 transition-colors" onMouseEnter={() => handleMouseEnter('white')} onMouseLeave={handleMouseLeave}>Couple</a></li>
            <li><a href="#story" onClick={() => scrollToSection('story')} className="hover:text-gold-600 transition-colors" onMouseEnter={() => handleMouseEnter('white')} onMouseLeave={handleMouseLeave}>Our Story</a></li>
            <li><a href="#events" onClick={() => scrollToSection('events')} className="hover:text-gold-600 transition-colors" onMouseEnter={() => handleMouseEnter('white')} onMouseLeave={handleMouseLeave}>Events</a></li>
            <li><a href="#gallery" onClick={() => scrollToSection('gallery')} className="hover:text-gold-600 transition-colors" onMouseEnter={() => handleMouseEnter('white')} onMouseLeave={handleMouseLeave}>Gallery</a></li>
            <li><a href="#rsvp" onClick={() => scrollToSection('rsvp')} className="hover:text-gold-600 transition-colors" onMouseEnter={() => handleMouseEnter('white')} onMouseLeave={handleMouseLeave}>RSVP</a></li>
            <li><a href="#gifts" onClick={() => scrollToSection('gifts')} className="hover:text-gold-600 transition-colors" onMouseEnter={() => handleMouseEnter('white')} onMouseLeave={handleMouseLeave}>Gifts</a></li>
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
            className="fixed inset-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md"
          >
            <div className="flex flex-col h-full justify-center items-center space-y-8 text-2xl">
              <button className="absolute top-4 right-4 text-3xl" onClick={() => setIsMenuOpen(false)}>
                <X />
              </button>
              <a href="#home" onClick={() => scrollToSection('home')} className="hover:text-gold-600 transition-colors" onMouseEnter={() => handleMouseEnter('white')} onMouseLeave={handleMouseLeave}>Home</a>
              <a href="#couple" onClick={() => scrollToSection('couple')} className="hover:text-gold-600 transition-colors" onMouseEnter={() => handleMouseEnter('white')} onMouseLeave={handleMouseLeave}>Couple</a>
              <a href="#story" onClick={() => scrollToSection('story')} className="hover:text-gold-600 transition-colors" onMouseEnter={() => handleMouseEnter('white')} onMouseLeave={handleMouseLeave}>Our Story</a>
              <a href="#events" onClick={() => scrollToSection('events')} className="hover:text-gold-600 transition-colors" onMouseEnter={() => handleMouseEnter('white')} onMouseLeave={handleMouseLeave}>Events</a>
              <a href="#gallery" onClick={() => scrollToSection('gallery')} className="hover:text-gold-600 transition-colors" onMouseEnter={() => handleMouseEnter('white')} onMouseLeave={handleMouseLeave}>Gallery</a>
              <a href="#rsvp" onClick={() => scrollToSection('rsvp')} className="hover:text-gold-600 transition-colors" onMouseEnter={() => handleMouseEnter('white')} onMouseLeave={handleMouseLeave}>RSVP</a>
              <a href="#gifts" onClick={() => scrollToSection('gifts')} className="hover:text-gold-600 transition-colors" onMouseEnter={() => handleMouseEnter('white')} onMouseLeave={handleMouseLeave}>Gifts</a>
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
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/50 to-blue-500/50" />
          <div className="relative z-10 text-center text-white">
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-8xl font-cormorant mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Aisha & Rahul
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl lg:text-2xl font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              August 15, 2024 • Mumbai
            </motion.p>
          </div>
          <button onClick={prevSlide} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white" onMouseEnter={() => handleMouseEnter('black')} onMouseLeave={handleMouseLeave}>
            <ChevronLeft size={24} />
          </button>
          <button onClick={nextSlide} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white" onMouseEnter={() => handleMouseEnter('black')} onMouseLeave={handleMouseLeave}>
            <ChevronRight size={24} />
          </button>
        </section>

        <section id="couple" className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-cormorant mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500 dark:from-pink-300 dark:to-blue-300">Meet the Couple</h2>
            <div className="flex flex-col md:flex-row gap-8 justify-center">
              <div className="flex-1">
                <img src="/path-to-bride-image.jpg" alt="Bride" className="w-48 h-48 md:w-64 md:h-64 mx-auto rounded-full object-cover mb-4" onMouseEnter={() => handleMouseEnter('black')} onMouseLeave={handleMouseLeave} />
                <h3 className="text-xl md:text-2xl font-cormorant mb-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 dark:from-pink-300 dark:to-purple-300">Aisha</h3>
                <p>A talented artist with a heart of gold</p>
              </div>
              <div className="flex-1">
                <img src="/path-to-groom-image.jpg" alt="Groom" className="w-48 h-48 md:w-64 md:h-64 mx-auto rounded-full object-cover mb-4" onMouseEnter={() => handleMouseEnter('black')} onMouseLeave={handleMouseLeave} />
                <h3 className="text-xl md:text-2xl font-cormorant mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-300 dark:to-purple-300">Rahul</h3>
                <p>A passionate entrepreneur with a vision for the future</p>
              </div>
            </div>
          </div>
        </section>

        <section id="story" className="py-16 px-4 bg-gradient-to-br from-pink-100 to-blue-100 dark:from-purple-900 dark:to-blue-900">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-cormorant mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500 dark:from-pink-300 dark:to-blue-300">Our Love Story</h2>
            <p className="text-base md:text-lg mb-8">
              Two souls intertwined by destiny, Aisha and Rahul's love story began in the bustling streets of Mumbai. 
              Their journey from chance encounters to soulmates is a testament to the magic of true love.
            </p>
            <div className="space-y-8">
              <div className="flex items-center">
                <div className="flex-1 text-right pr-4">
                  <h3 className="text-xl font-semibold">First Meet</h3>
                  <p>At a local art gallery</p>
                </div>
                <div className="w-4 h-4 bg-pink-500 rounded-full"></div>
                <div className="flex-1 text-left pl-4">
                  <p>September 2020</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-1 text-right pr-4">
                  <p>December 2020</p>
                </div>
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <div className="flex-1 text-left pl-4">
                  <h3 className="text-xl font-semibold">First Date</h3>
                  <p>Romantic dinner by the sea</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-1 text-right pr-4">
                  <h3 className="text-xl font-semibold">Proposal</h3>
                  <p>Under the stars at Taj Mahal</p>
                </div>
                <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                <div className="flex-1 text-left pl-4">
                  <p>February 2023</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="events" className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-cormorant text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-500 dark:from-blue-300 dark:to-pink-300">Wedding Events</h2>
            <div className="space-y-12">
              {[
                {
                  name: 'Mehndi Night',
                  date: 'August 13, 2024',
                  time: '7:00 PM - 11:00 PM',
                  venue: 'Lotus Garden',
                  address: '123 Floral Avenue, Juhu, Mumbai 400049',
                  mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.0126353064897!2d72.82766931490721!3d19.10768478706484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9b888ae67dd%3A0xe0b9538d623ac5d2!2sJuhu%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1605907675585!5m2!1sen!2sin'
                },
                {
                  name: 'Sangeet Ceremony',
                  date: 'August 14, 2024',
                  time: '6:00 PM - 12:00 AM',
                  venue: 'Golden Ballroom, Taj Palace',
                  address: '456 Luxury Lane, Colaba, Mumbai 400005',
                  mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3774.2136888285895!2d72.83071331490398!3d18.92169198717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7d1c73a0d5cad%3A0xc70a25a7209c733c!2sColaba%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1605907731486!5m2!1sen!2sin'
                },
                {
                  name: 'Wedding Ceremony',
                  date: 'August 15, 2024',
                  time: '10:00 AM - 2:00 PM',
                  venue: 'The Regal Gardens',
                  address: '789 Royal Road, Worli, Mumbai 400018',
                  mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.6693379677587!2d72.81520731490528!3d18.99900618714738!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cee0dd394491%3A0x9f52e71b05151653!2sWorli%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1605907781058!5m2!1sen!2sin'
                },
                {
                  name: 'Reception Gala',
                  date: 'August 15, 2024',
                  time: '7:00 PM - 1:00 AM',
                  venue: 'The Grand Ballroom, The Regal Palace',
                  address: '789 Royal Road, Worli, Mumbai 400018',
                  mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.6693379677587!2d72.81520731490528!3d18.99900618714738!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cee0dd394491%3A0x9f52e71b05151653!2sWorli%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1605907781058!5m2!1sen!2sin'
                }
              ].map((event, index) => (
                <motion.div
                  key={event.name}
                  {...eventAnimations[index % eventAnimations.length]}
                >
                  <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-pink-200 to-blue-200 dark:from-purple-800 dark:to-blue-800" onMouseEnter={() => handleMouseEnter('black')} onMouseLeave={handleMouseLeave}>
                    <CardContent className="p-6">
                      <div className="md:flex md:space-x-6">
                        <div className="md:w-1/2">
                          <h3 className="text-xl md:text-2xl font-cormorant mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500 dark:from-pink-300 dark:to-blue-300">{event.name}</h3>
                          <div className="flex items-center mb-2">
                            <Calendar className="mr-2 text-pink-500 dark:text-pink-300" size={20} />
                            <p>{event.date}</p>
                          </div>
                          <div className="flex items-center mb-2">
                            <Clock className="mr-2 text-blue-500 dark:text-blue-300" size={20} />
                            <p>{event.time}</p>
                          </div>
                          <div className="flex items-start mb-2">
                            <MapPin className="mr-2 mt-1 text-purple-500 dark:text-purple-300" size={20} />
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
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="gallery" className="py-16 px-4 bg-gradient-to-br from-pink-100 to-blue-100 dark:from-purple-900 dark:to-blue-900">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-cormorant text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500 dark:from-pink-300 dark:to-blue-300">Our Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((index) => (
                <div key={index} className="relative overflow-hidden rounded-lg">
                  <img
                    src={`/path-to-gallery-image-${index}.jpg`}
                    alt={`Gallery Image ${index}`}
                    className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110"
                    onMouseEnter={() => handleMouseEnter('black')}
                    onMouseLeave={handleMouseLeave}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="rsvp" className="py-16 px-4">
          <div className="max-w-md mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-cormorant text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500 dark:from-pink-300 dark:to-blue-300">RSVP</h2>
            <Card className="border-0 shadow-lg bg-gradient-to-br from-pink-200 to-blue-200 dark:from-purple-800 dark:to-blue-800">
              <CardContent className="p-6">
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                    <Input type="text" id="name" name="name" required className="w-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm" placeholder="Your Name" onMouseEnter={() => handleMouseEnter('black')} onMouseLeave={handleMouseLeave} />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                    <Input type="email" id="email" name="email" required className="w-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm" placeholder="your@email.com" onMouseEnter={() => handleMouseEnter('black')} onMouseLeave={handleMouseLeave} />
                  </div>
                  <div>
                    <label htmlFor="guests" className="block text-sm font-medium mb-2">Number of Guests</label>
                    <Input type="number" id="guests" name="guests" required className="w-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm" placeholder="0" min="0" onMouseEnter={() => handleMouseEnter('black')} onMouseLeave={handleMouseLeave} />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">Message (Optional)</label>
                    <Textarea id="message" name="message" className="w-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm" placeholder="Your message to the couple" onMouseEnter={() => handleMouseEnter('black')} onMouseLeave={handleMouseLeave} />
                  </div>
                  <Button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white" onMouseEnter={() => handleMouseEnter('black')} onMouseLeave={handleMouseLeave}>
                    Send RSVP
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="gifts" className="py-16 px-4 bg-gradient-to-br from-pink-100 to-blue-100 dark:from-purple-900 dark:to-blue-900">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-cormorant mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500 dark:from-pink-300 dark:to-blue-300">Gift Registry</h2>
            <p className="text-lg mb-8">Your presence at our wedding is the greatest gift of all. However, if you wish to honor us with a gift, we have created a registry for your convenience.</p>
            <Button className="bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white" onMouseEnter={() => handleMouseEnter('black')} onMouseLeave={handleMouseLeave}>
              <Gift className="mr-2 h-4 w-4" /> View Registry
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-gradient-to-br from-pink-200 to-blue-200 dark:from-purple-800 dark:to-blue-800 text-gray-900 dark:text-gray-100 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xl md:text-2xl font-cormorant mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500 dark:from-pink-300 dark:to-blue-300">Join us in celebrating our love</p>
          <p className="mb-6">The Sharma & Patel Families</p>
          <div className="flex justify-center space-x-4 mb-6">
            <a href="#" className="text-pink-500 hover:text-pink-600 dark:text-pink-300 dark:hover:text-pink-200 transition-colors" onMouseEnter={() => handleMouseEnter('black')} onMouseLeave={handleMouseLeave}>
              <span className="sr-only">Instagram</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
          </div>
          <p className="text-sm">
            With love, {' '}
            <a href="https://hxrshrathore.me" target="_blank" rel="noopener noreferrer" className="text-gold-600 hover:text-gold-500 dark:text-gold-400 dark:hover:text-gold-300 transition-colors" onMouseEnter={() => handleMouseEnter('black')} onMouseLeave={handleMouseLeave}>
              Harsh
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}