import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, ArrowUpRight, Sparkles, Filter, X, Award, Diamond, ShieldCheck } from 'lucide-react';

export default function CollectionShowcase() {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  const jewelryCollection = [
    {
      id: 'eternal-solitaire',
      title: 'The Eternal Solitaire',
      category: 'RINGS',
      carat: '4.20 Carats',
      metal: 'Platinum 950',
      image: '/images/ring_hero.jpg',
      clarity: 'D-Flawless Type IIa',
      atelier: 'Place Vendôme Atelier',
      description: 'An extraordinary 4.20 carat oval cut solitaire set in hand-engraved platinum 950 with micro-pavé accents along the split shank.'
    },
    {
      id: 'diamond-riviere',
      title: 'The Grand Riviere Choker',
      category: 'NECKLACES',
      carat: '38.50 Total Carats',
      metal: 'Solid Platinum 950',
      image: '/images/necklace_hero.jpg',
      clarity: 'Collection Quality F-VVS1',
      atelier: 'Geneva Salon',
      description: 'A seamless cascade of 52 graduated round brilliant diamonds, each individually claw-set to rest flat against the collarbone.'
    },
    {
      id: 'winged-victoria-ring',
      title: 'Victoria Marquise Solitaire',
      category: 'RINGS',
      carat: '3.15 Carats',
      metal: '18K Yellow Gold & Platinum',
      image: '/images/winged_victory.jpg',
      clarity: 'D-IF Flawless',
      atelier: 'Place Vendôme Atelier',
      description: 'Inspired by ancient wings, featuring a central elongated marquise diamond flanked by tapered baguette diamond shoulders.'
    },
    {
      id: 'psyche-emerald-cut',
      title: 'Psyche Emerald Cut Ring',
      category: 'RINGS',
      carat: '5.05 Carats',
      metal: 'Platinum 950',
      image: '/images/psyche_cupid.jpg',
      clarity: 'E-VVS1 Step Cut',
      atelier: 'Paris Haute Atelier',
      description: 'A breathtaking 5.05 carat architectural emerald-cut diamond exhibiting crisp hall-of-mirrors reflections and stepped facets.'
    },
    {
      id: 'sapphire-halo',
      title: 'Royal Ceylon Sapphire Ring',
      category: 'HIGH JEWELRY',
      carat: '6.40 Carat Sapphire',
      metal: '18K White Gold',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80',
      clarity: 'Unheated Natural Sapphire',
      atelier: 'Milan Private Vault',
      description: 'A velvety royal blue Sri Lankan sapphire framed by a double halo of pear-shaped brilliant white diamonds.'
    },
    {
      id: 'pave-cuff',
      title: 'Architectural Diamond Cuff',
      category: 'HIGH JEWELRY',
      carat: '18.20 Total Carats',
      metal: 'Platinum & 18K Rose Gold',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80',
      clarity: 'VS1 Collection Grade',
      atelier: 'Place Vendôme Atelier',
      description: 'A flexible lattice cuff bracelet handcrafted in platinum and rose gold with over 400 micro-paved brilliant cut diamonds.'
    }
  ];

  const categories = ['ALL', 'RINGS', 'NECKLACES', 'HIGH JEWELRY'];

  const filteredCollection = activeFilter === 'ALL'
    ? jewelryCollection
    : jewelryCollection.filter(item => item.category === activeFilter);

  return (
    <section id="collection" className="relative py-28 px-6 md:px-12 bg-[#0A0A0B] text-[#F5F5F0]">
      
      {/* Hairline Gridlines */}
      <div className="absolute inset-0 hairline-grid pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#3B6EF5] tracking-[0.3em] uppercase mb-3">
              <Diamond className="w-3.5 h-3.5" />
              <span>PERMANENT HIGH JEWELRY VAULT</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white">
              The Masterpiece <br />
              <span className="italic font-normal text-[#3B6EF5]">Solitaire Collection</span>
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-full border border-white/10 bg-[#121214]/80 backdrop-blur-md">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 ${
                  activeFilter === cat
                    ? 'bg-[#3B6EF5] text-white shadow-[0_0_15px_rgba(59,110,245,0.4)]'
                    : 'text-[#9B9B9B] hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Collection Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCollection.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onClick={() => setSelectedArtwork(item)}
              className="group cursor-pointer rounded-3xl border border-white/10 bg-[#121214] overflow-hidden hover:border-[#3B6EF5]/60 transition-all duration-500 hover:shadow-[0_10px_40px_rgba(0,0,0,0.8)]"
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden bg-black/70">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover filter contrast-110 group-hover:scale-105 group-hover:contrast-125 transition-all duration-700"
                />

                {/* Hover Spotlight Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Category Badge */}
                <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full border border-white/20 bg-black/60 backdrop-blur-md text-[10px] font-mono tracking-widest text-[#F5F5F0]">
                  {item.category}
                </div>

                {/* Quick View Icon */}
                <div className="absolute top-4 right-4 z-10 p-2.5 rounded-full border border-white/20 bg-black/60 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4 text-[#3B6EF5]" />
                </div>

                {/* Card Title & Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <span className="text-[10px] font-mono tracking-widest text-[#3B6EF5] uppercase block mb-1">
                    {item.carat} — {item.metal}
                  </span>
                  <h3 className="font-serif text-2xl font-normal text-white group-hover:text-[#3B6EF5] transition-colors leading-tight mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#9B9B9B] line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Lightbox Quick-View Modal */}
      <AnimatePresence>
        {selectedArtwork && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl rounded-3xl border border-white/15 bg-[#121214] overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedArtwork(null)}
                className="absolute top-4 right-4 z-30 p-2.5 rounded-full border border-white/20 bg-black/70 text-white hover:bg-[#3B6EF5] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="lg:col-span-6 relative aspect-[3/4] bg-black">
                <img
                  src={selectedArtwork.image}
                  alt={selectedArtwork.title}
                  className="w-full h-full object-cover filter contrast-125"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              </div>

              <div className="lg:col-span-6 p-8 lg:p-10 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#3B6EF5] uppercase tracking-widest mb-2">
                    <Award className="w-4 h-4" />
                    <span>HAUTE JOAILLERIE CATALOGUE</span>
                  </div>

                  <h3 className="font-serif text-3xl sm:text-4xl font-normal text-white mb-2">
                    {selectedArtwork.title}
                  </h3>

                  <p className="font-serif italic text-[#9B9B9B] text-lg mb-6">
                    {selectedArtwork.atelier} — {selectedArtwork.carat}
                  </p>

                  <p className="text-sm text-[#9B9B9B] leading-relaxed mb-6">
                    {selectedArtwork.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                    <div>
                      <span className="text-[10px] font-mono text-[#9B9B9B] uppercase block">GEM GRADE</span>
                      <span className="text-xs font-semibold text-white mt-0.5 block">{selectedArtwork.clarity}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-[#9B9B9B] uppercase block">PRECIOUS METAL</span>
                      <span className="text-xs font-semibold text-white mt-0.5 block">{selectedArtwork.metal}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-mono text-[#9B9B9B]">MAISON LUXE ARCHIVE FILE</span>
                  <button
                    onClick={() => setSelectedArtwork(null)}
                    className="px-6 py-2.5 rounded-full bg-[#3B6EF5] text-white text-xs font-semibold tracking-wider hover:bg-[#2A57D8] transition-colors"
                  >
                    CLOSE PREVIEW
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
