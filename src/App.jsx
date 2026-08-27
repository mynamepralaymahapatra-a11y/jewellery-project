import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSectionUI from './components/HeroSectionUI';
import BrandFeaturesBar from './components/BrandFeaturesBar';
import RotatingArcShowcase from './components/RotatingArcShowcase';
import CollectionShowcase from './components/CollectionShowcase';
import CustomerReviewsSection from './components/CustomerReviewsSection';
import OurServicesSection from './components/OurServicesSection';
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

      {/* Sticky Glassmorphic Navbar */}
      <Navbar 
        onOpenShop={() => setIsTicketModalOpen(true)}
        onOpenSignup={() => setIsTicketModalOpen(true)}
      />

      {/* Main Reference Screenshot Hero UI Layout */}
      <HeroSectionUI
        onOpenShop={() => setIsTicketModalOpen(true)}
        onOpenSignup={() => setIsTicketModalOpen(true)}
      />

      {/* Brand Trust & Luxury Features Bar */}
      <BrandFeaturesBar />

      {/* Mejuri-Style Clockwise Rotating Product Arc Showcase */}
      <RotatingArcShowcase 
        onOpenShop={() => setIsTicketModalOpen(true)}
      />

      {/* Permanent Masterpiece Collection Showcase */}
      <CollectionShowcase onOpenShop={() => setIsTicketModalOpen(true)} />

      {/* What Our Customers Say - Review Section */}
      <CustomerReviewsSection />

      {/* Our Services Section */}
      <OurServicesSection />

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
