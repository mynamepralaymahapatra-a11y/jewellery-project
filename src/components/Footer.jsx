import React, { useState } from 'react';
import { Mail, MapPin, Clock, Shield, ArrowRight, Heart } from 'lucide-react';

export default function Footer({ onOpenTickets }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="relative border-t border-white/10 bg-[#060607] text-[#9B9B9B] py-20 px-6 md:px-12 overflow-hidden">
      
      {/* Decorative Hairline Grid */}
      <div className="absolute inset-0 hairline-grid pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
        
        {/* Brand Column (Span 4) */}
        <div className="md:col-span-4 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-[#3B6EF5]" />
            </div>
            <span className="font-serif text-2xl font-semibold tracking-[0.35em] text-[#F5F5F0]">
              L O U V R E
            </span>
          </div>

          <p className="text-xs text-[#9B9B9B] leading-relaxed max-w-sm">
            The Musée du Louvre in Paris is the world’s largest art museum and a historic monument. Preserving human creative heritage across nine millennia.
          </p>

          <div className="flex items-center gap-4 text-xs font-mono text-[#F5F5F0]">
            <MapPin className="w-4 h-4 text-[#3B6EF5]" />
            <span>Rue de Rivoli, 75001 Paris, France</span>
          </div>
        </div>

        {/* Operating Hours Column (Span 4) */}
        <div className="md:col-span-4 space-y-4">
          <h4 className="font-mono text-xs tracking-[0.3em] text-[#F5F5F0] uppercase">
            VISITOR HOURS & ADMISSION
          </h4>

          <div className="space-y-2 text-xs font-mono">
            <div className="flex justify-between py-1 border-b border-white/5">
              <span>MONDAY, THURSDAY, SATURDAY, SUNDAY</span>
              <span className="text-[#F5F5F0]">09:00 — 18:00</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span>WEDNESDAY & FRIDAY (NOCTURNES)</span>
              <span className="text-[#3B6EF5] font-bold">09:00 — 21:45</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5 text-amber-400/80">
              <span>TUESDAY</span>
              <span>CLOSED FOR RESTORATION</span>
            </div>
          </div>

          <button
            onClick={onOpenTickets}
            className="mt-4 px-6 py-2.5 rounded-full bg-[#3B6EF5] text-white text-xs font-semibold tracking-wider hover:bg-[#2A57D8] transition-colors"
          >
            BUY TICKETS ONLINE
          </button>
        </div>

        {/* Newsletter Column (Span 4) */}
        <div className="md:col-span-4 space-y-4">
          <h4 className="font-mono text-xs tracking-[0.3em] text-[#F5F5F0] uppercase">
            THE LOUVRE JOURNAL
          </h4>

          <p className="text-xs text-[#9B9B9B]">
            Receive private curator notes, upcoming exhibition schedules, and art restoration stories.
          </p>

          {!subscribed ? (
            <form onSubmit={handleSubscribe} className="flex items-center gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email..."
                className="w-full px-4 py-2.5 rounded-full border border-white/15 bg-white/5 text-white text-xs placeholder:text-[#9B9B9B] focus:outline-none focus:border-[#3B6EF5]"
              />
              <button
                type="submit"
                className="p-2.5 rounded-full bg-[#3B6EF5] text-white hover:bg-[#2A57D8] transition-colors shrink-0"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <div className="p-3 rounded-xl border border-[#3B6EF5]/40 bg-[#3B6EF5]/10 text-xs text-[#3B6EF5] font-mono">
              ✓ THANK YOU FOR SUBSCRIBING TO THE LOUVRE JOURNAL
            </div>
          )}
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto relative z-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[#9B9B9B] gap-4">
        <span>© 2026 MUSÉE DU LOUVRE. ALL RIGHTS RESERVED.</span>
        <div className="flex items-center space-x-6">
          <a href="#" className="hover:text-white transition-colors">TERMS</a>
          <a href="#" className="hover:text-white transition-colors">PRIVACY POLICY</a>
          <a href="#" className="hover:text-white transition-colors">PRESS ROOM</a>
          <a href="#" className="hover:text-white transition-colors">ACCESSIBILITY</a>
        </div>
      </div>
    </footer>
  );
}
