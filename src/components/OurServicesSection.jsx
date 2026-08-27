import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function OurServicesSection() {
  const [activeTabId, setActiveTabId] = useState('repairs');

  const services = [
    {
      id: 'shipping',
      tabLabel: 'Shipping',
      title: 'INSURED GLOBAL DOORSTEP DELIVERY',
      description: 'Every Diamora piece is shipped in discreet, tamper-evident luxury packaging with full door-to-door transit insurance. Enjoy complementary express delivery with real-time GPS tracking.',
      image: '/images/necklace_hero.jpg'
    },
    {
      id: 'certificate',
      tabLabel: 'Certificate',
      title: 'GIA & IGI GEMOLOGICAL CERTIFICATION',
      description: '100% natural, conflict-free certified diamonds graded by international laboratories including GIA, IGI, and SGL. Every diamond features micro laser-inscribed girdle numbers.',
      image: '/images/ring_hero.jpg'
    },
    {
      id: 'customisation',
      tabLabel: 'Customisation',
      title: 'BESPOKE ATELIER CUSTOMISATION',
      description: 'Transform your dream vision into a handcrafted masterpiece. Work directly with our master goldsmiths from initial 3D CAD blueprints to final diamond claw setting.',
      image: '/images/winged_victory.jpg'
    },
    {
      id: 'buyback',
      tabLabel: 'BuyBack',
      title: 'LIFETIME BUYBACK & EXCHANGE GUARANTEE',
      description: 'Enjoy lifelong trust and investment security with our 100% transparent exchange and buyback policy at prevailing market rates across all certified diamond jewelry.',
      image: '/images/psyche_cupid.jpg'
    },
    {
      id: 'repairs',
      tabLabel: 'Repairs',
      title: 'REPAIRS, POLISH AND RESIZING',
      description: "Got a Ring that doesn't fit you?! At Diamora, We are happy to resize Rings purchased from us at no extra cost. We also offer Lifetime Repair and Polish Free of Cost on all our Diamond Jewellery products*.",
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80'
    }
  ];

  const activeService = services.find((s) => s.id === activeTabId) || services[4];

  return (
    <section id="services" className="relative pt-6 sm:pt-10 pb-20 sm:pb-28 px-4 sm:px-8 lg:px-12 bg-[#0C0D10] text-[#F5F5F0] select-none z-20 overflow-hidden">
      
      {/* Background Hairline Gridlines */}
      <div className="absolute inset-0 hairline-grid pointer-events-none opacity-25 z-0" />
      <div className="absolute left-0 bottom-0 w-[500px] h-[400px] bg-radial from-[#D4AF37]/6 via-transparent to-transparent blur-3xl pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* CENTERED SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          {/* Eyebrow with Side Hairlines */}
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="w-10 sm:w-16 h-[1px] bg-gradient-to-r from-transparent to-[#E0B094]/60" />
            <span className="font-poppins text-xs sm:text-[13px] font-medium tracking-[0.28em] text-[#E0B094] uppercase">
              EXCELLENCE & CARE
            </span>
            <span className="w-10 sm:w-16 h-[1px] bg-gradient-to-l from-transparent to-[#E0B094]/60" />
          </div>

          {/* Main Title */}
          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-medium tracking-[0.04em] text-[#F5F5F0] leading-tight drop-shadow-[0_2px_15px_rgba(224,176,148,0.2)]">
            Our Services
          </h2>
        </div>

        {/* MAIN SPLIT 2-COLUMN STAGE (LEFT: IMAGE, RIGHT: TEXT CONTENT) */}
        <div className="bg-[#12131A] border border-white/10 rounded-3xl overflow-hidden shadow-[0_15px_45px_rgba(0,0,0,0.85)] mb-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeService.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 min-h-[380px] sm:min-h-[440px]"
            >
              {/* Left Image Column */}
              <div className="lg:col-span-6 relative aspect-video lg:aspect-auto overflow-hidden bg-black">
                <img
                  src={activeService.image}
                  alt={activeService.title}
                  className="w-full h-full object-cover filter brightness-105 contrast-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
              </div>

              {/* Right Content Column */}
              <div className="lg:col-span-6 p-8 sm:p-12 lg:p-14 flex flex-col justify-center bg-[#12131A]">
                {/* Eyebrow */}
                <span className="font-poppins text-xs font-semibold tracking-[0.28em] text-[#E0B094] uppercase block mb-3">
                  OUR SERVICES
                </span>

                {/* Service Title */}
                <h3 className="font-cinzel text-2xl sm:text-3xl lg:text-3xl font-semibold tracking-[0.06em] text-white leading-snug mb-5">
                  {activeService.title}
                </h3>

                {/* Description Text */}
                <p className="font-open-sans text-xs sm:text-sm text-[#B0B3BC] font-normal leading-relaxed">
                  {activeService.description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* BOTTOM HORIZONTAL TAB NAVIGATION BAR (MATCHING REFERENCE IMAGE) */}
        <div className="flex items-center justify-center border-t border-white/10 pt-6">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12">
            {services.map((service) => {
              const isActive = service.id === activeTabId;
              return (
                <button
                  key={service.id}
                  onClick={() => setActiveTabId(service.id)}
                  className={`relative font-poppins text-xs sm:text-sm tracking-wider font-medium transition-all duration-300 pb-2 ${
                    isActive 
                      ? 'text-[#E0B094]' 
                      : 'text-[#808490] hover:text-white'
                  }`}
                >
                  <span>{service.tabLabel}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeServiceTabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#E0B094] shadow-[0_0_10px_rgba(224,176,148,0.5)]"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

      </div>

    </section>
  );
}
