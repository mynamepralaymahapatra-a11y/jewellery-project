import React, { useState, useEffect } from 'react';
import { LayoutGrid, Calendar, Volume2, VolumeX, Menu, X, Sun, Sparkles } from 'lucide-react';

export default function Navbar({ 
  activeSection, 
  setActiveSection, 
  onOpenTickets, 
  audioPlaying, 
  toggleAudio,
  haloMood,
  setHaloMood
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'HOME' },
    { id: 'collection', label: 'COLLECTION' },
    { id: 'designers', label: 'DESIGNERS' },
    { id: 'events', label: 'EVENTS' },
    { id: 'appointment', label: 'APPOINTMENT' },
  ];

  const haloMoods = [
    { id: 'white', label: 'WHITE' },
    { id: 'warm', label: 'WARM' },
    { id: 'cool', label: 'COOL' },
    { id: 'electric', label: 'ELECTRIC' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    if (id === 'appointment') {
      onOpenTickets();
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'glass-nav py-4 shadow-2xl' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Left: Brand Wordmark */}
        <a 
          href="#home" 
          onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}
          className="group flex items-center gap-3"
        >
          <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#3B6EF5] transition-colors duration-300">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3B6EF5] group-hover:scale-125 transition-transform duration-300 shadow-[0_0_8px_#3B6EF5]" />
          </div>
          <span className="font-serif text-xl md:text-2xl font-semibold tracking-[0.4em] text-[#F5F5F0] group-hover:text-white transition-colors uppercase">
            L U X E
          </span>
        </a>

        {/* Center Nav Links (Desktop) */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-10">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative py-1 text-[11px] font-semibold tracking-[0.25em] transition-colors duration-300 uppercase ${
                  isActive ? 'text-[#F5F5F0]' : 'text-[#9B9B9B] hover:text-[#F5F5F0]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#3B6EF5] shadow-[0_0_8px_#3B6EF5]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Actions & Controls */}
        <div className="flex items-center space-x-3 md:space-x-5">
          
          {/* HALO MOOD Switcher Group */}
          <div className="hidden lg:flex items-center gap-1 p-1 rounded-full border border-white/10 bg-black/50 backdrop-blur-md">
            <span className="text-[9px] font-mono tracking-widest text-[#9B9B9B] pl-2 pr-1 uppercase">HALO:</span>
            {haloMoods.map((m) => (
              <button
                key={m.id}
                onClick={() => setHaloMood(m.id)}
                className={`px-2.5 py-1 rounded-full text-[9px] font-bold tracking-wider transition-all duration-300 uppercase ${
                  haloMood === m.id
                    ? 'bg-white text-black shadow-[0_0_12px_rgba(255,255,255,0.5)]'
                    : 'text-[#9B9B9B] hover:text-white'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          {/* Sound Toggle Pill Button */}
          <button
            onClick={toggleAudio}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-medium text-[#9B9B9B] hover:text-[#F5F5F0] transition-all duration-300"
            title={audioPlaying ? "Mute Atelier Acoustics" : "Play Atelier Acoustics"}
          >
            {audioPlaying ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#3B6EF5] animate-pulse" />
                <span className="hidden xl:inline text-[10px] tracking-wider text-[#3B6EF5] font-mono">SOUND ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-[#9B9B9B]" />
                <span className="hidden xl:inline text-[10px] tracking-wider font-mono">SOUND OFF</span>
              </>
            )}
          </button>

          {/* Solid Blue BOOK APPOINTMENT Pill Button */}
          <button
            onClick={onOpenTickets}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-[#3B6EF5] hover:bg-[#2A57D8] text-white text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-[0_0_20px_rgba(59,110,245,0.4)] hover:shadow-[0_0_30px_rgba(59,110,245,0.6)]"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>BOOK APPOINTMENT</span>
          </button>

          {/* Grid Icon Button */}
          <button
            onClick={() => handleNavClick('collection')}
            className="p-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-[#F5F5F0] hover:text-[#3B6EF5] transition-all duration-300"
            title="Browse High-Jewelry Grid"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>

          {/* Mobile Drawer Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl border border-white/10 bg-white/5 text-[#F5F5F0]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-t border-white/10 px-6 py-8 mt-4 animate-fadeIn space-y-6">
          {/* Halo Mood Switcher Mobile */}
          <div className="flex items-center justify-between py-2 border-b border-white/10">
            <span className="text-xs font-mono text-[#9B9B9B]">SPOTLIGHT HALO MOOD:</span>
            <div className="flex gap-1">
              {haloMoods.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setHaloMood(m.id)}
                  className={`px-2 py-1 rounded-full text-[9px] font-bold ${
                    haloMood === m.id ? 'bg-white text-black' : 'bg-white/10 text-[#9B9B9B]'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left text-sm font-semibold tracking-[0.25em] py-2 border-b border-white/5 ${
                  activeSection === item.id ? 'text-[#3B6EF5]' : 'text-[#9B9B9B]'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenTickets(); }}
              className="w-full py-3 rounded-full bg-[#3B6EF5] text-white font-semibold text-xs tracking-widest text-center mt-4"
            >
              BOOK PRIVATE APPOINTMENT
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
