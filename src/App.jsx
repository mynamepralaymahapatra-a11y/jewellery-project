import React, { useState } from 'react';
import HeroSectionUI from './components/HeroSectionUI';
import CollectionShowcase from './components/CollectionShowcase';
import ExhibitionEvents from './components/ExhibitionEvents';
import TicketModal from './components/TicketModal';
import AmbientAudioPlayer from './components/AmbientAudioPlayer';
import Footer from './components/Footer';

export default function App() {
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);

  const toggleAudio = () => {
    setAudioPlaying(!audioPlaying);
  };

  return (
    <div className="relative min-h-screen bg-[#0C0D10] text-[#F5F5F0] overflow-x-hidden">
      
      {/* Ambient Audio Engine */}
      <AmbientAudioPlayer isPlaying={audioPlaying} />

      {/* Main Reference Screenshot Hero UI Layout */}
      <HeroSectionUI
        onOpenShop={() => setIsTicketModalOpen(true)}
        onOpenSignup={() => setIsTicketModalOpen(true)}
      />

      {/* Permanent Masterpiece Collection Showcase */}
      <CollectionShowcase />

      {/* Private Salons & Atelier Symposia */}
      <ExhibitionEvents onOpenTickets={() => setIsTicketModalOpen(true)} />

      {/* Footer */}
      <Footer onOpenTickets={() => setIsTicketModalOpen(true)} />

      {/* Appointment & Order Modal */}
      <TicketModal
        isOpen={isTicketModalOpen}
        onClose={() => setIsTicketModalOpen(false)}
      />

    </div>
  );
}
