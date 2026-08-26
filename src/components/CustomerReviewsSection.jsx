import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';

export default function CustomerReviewsSection() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const reviewsPages = [
    [
      {
        id: 'rev-1',
        name: 'Ananya S.',
        location: 'Kolkata',
        rating: 5,
        quote: 'The solitaire ring from Diamora is beyond beautiful. The sparkle, the quality, the packaging - absolutely perfect!'
      },
      {
        id: 'rev-2',
        name: 'Riddhima M.',
        location: 'Mumbai',
        rating: 5,
        quote: 'Exceptional craftsmanship and such elegant designs. Diamora is now my go-to for every special occasion.'
      },
      {
        id: 'rev-3',
        name: 'Pooja T.',
        location: 'Bangalore',
        rating: 5,
        quote: 'From selection to delivery, everything was seamless. The diamond quality is absolutely certified and genuine.'
      }
    ],
    [
      {
        id: 'rev-4',
        name: 'Jamuna B.',
        location: 'Chennai',
        rating: 5,
        quote: 'The service rendered by the team is excellent. They answered all my doubts with patience and helped us pick the ideal ring.'
      },
      {
        id: 'rev-5',
        name: 'Vidhya S.',
        location: 'Hyderabad',
        rating: 5,
        quote: 'Loved their collections! Bought a lovely diamond nosepin, their response and service is top notch.'
      },
      {
        id: 'rev-6',
        name: 'Lalitha K.',
        location: 'Delhi',
        rating: 5,
        quote: 'Nice, patient and pleasant service. We acquired great knowledge about certified GIA diamonds and look forward to buying again.'
      }
    ],
    [
      {
        id: 'rev-7',
        name: 'Devika R.',
        location: 'Ahmedabad',
        rating: 5,
        quote: 'The rose gold finish with micro-pavé diamonds is stunning. Delivered on time with complete certification documents.'
      },
      {
        id: 'rev-8',
        name: 'Shreya P.',
        location: 'Pune',
        rating: 5,
        quote: 'Bought our anniversary solitaire earrings here. The brilliance under sunlight is unreal, truly pure haute joaillerie.'
      },
      {
        id: 'rev-9',
        name: 'Meera N.',
        location: 'Jaipur',
        rating: 5,
        quote: 'Unmatched elegance and customer care. The custom sizing was done flawlessly within 48 hours.'
      }
    ],
    [
      {
        id: 'rev-10',
        name: 'Ishita V.',
        location: 'Chandigarh',
        rating: 5,
        quote: 'Extremely polite staff and transparent pricing. The diamond clarity and cut exceeded all my expectations.'
      },
      {
        id: 'rev-11',
        name: 'Kirti G.',
        location: 'Kochi',
        rating: 5,
        quote: 'Pure luxury experience from unboxing to wearing. Every piece reflects master artisan expertise.'
      },
      {
        id: 'rev-12',
        name: 'Sneha B.',
        location: 'Surat',
        rating: 5,
        quote: 'Beautiful Ceylon sapphire band! The color tone is deep royal blue, framed by crisp white diamonds.'
      }
    ]
  ];

  // Auto-shift Right to Left every 3 seconds (3000ms)
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % reviewsPages.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [isPaused, reviewsPages.length]);

  return (
    <section className="relative py-20 sm:py-28 px-4 sm:px-8 lg:px-12 bg-[#08090C] text-[#F5F5F0] select-none z-20 overflow-hidden">
      
      {/* Background Hairline Gridlines */}
      <div className="absolute inset-0 hairline-grid pointer-events-none opacity-25 z-0" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-radial from-[#D4AF37]/6 via-transparent to-transparent blur-3xl pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* SECTION HEADER (MATCHING REFERENCE IMAGE) */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          {/* Eyebrow with Side Lines */}
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="w-10 sm:w-16 h-[1px] bg-gradient-to-r from-transparent to-[#E0B094]/60" />
            <span className="font-poppins text-xs sm:text-[13px] font-medium tracking-[0.28em] text-[#E0B094] uppercase">
              TRUSTED BY THOUSANDS
            </span>
            <span className="w-10 sm:w-16 h-[1px] bg-gradient-to-l from-transparent to-[#E0B094]/60" />
          </div>

          {/* Main Title */}
          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-medium tracking-[0.04em] text-[#F5F5F0] leading-tight drop-shadow-[0_2px_15px_rgba(224,176,148,0.2)]">
            What Our Customers Say
          </h2>
        </div>

        {/* 3 REVIEW CARDS GRID (RIGHT TO LEFT SLIDE IN 3 SECONDS) */}
        <div 
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative min-h-[320px]"
        >
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentPage}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
            >
              {reviewsPages[currentPage].map((item) => (
                <div
                  key={item.id}
                  className="bg-[#0D0E13] border border-[#E0B094]/20 hover:border-[#E0B094]/50 p-8 rounded-2xl flex flex-col items-center text-center justify-between shadow-[0_10px_35px_rgba(0,0,0,0.85)] transition-all duration-300 group hover:-translate-y-1"
                >
                  {/* Top Golden Double Quote Mark (66 Icon) */}
                  <div className="mb-4">
                    <svg className="w-7 h-7 text-[#E0B094] opacity-85 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>

                  {/* Review Text */}
                  <p className="font-open-sans text-xs sm:text-[13.5px] text-[#C5C8D4] font-normal leading-relaxed mb-6 max-w-xs mx-auto">
                    {item.quote}
                  </p>

                  {/* Author Name, Location & 5 Stars */}
                  <div className="flex flex-col items-center">
                    {/* Name */}
                    <h4 className="font-poppins font-medium text-xs sm:text-[13px] text-[#E0B094] tracking-wide mb-0.5">
                      — {item.name}
                    </h4>
                    
                    {/* Location */}
                    <span className="font-open-sans text-[11px] text-[#7A7E8B] font-normal mb-3">
                      {item.location}
                    </span>

                    {/* 5 Gold Stars */}
                    <div className="flex items-center justify-center gap-1">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#F7E09A] text-[#F7E09A]" />
                      ))}
                    </div>
                  </div>

                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* BOTTOM PAGINATION DOTS */}
        <div className="flex items-center justify-center gap-2.5 mt-10">
          {reviewsPages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentPage === idx 
                  ? 'w-6 bg-[#E0B094]' 
                  : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>

      </div>

    </section>
  );
}
