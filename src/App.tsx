import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Info, 
  Plus, 
  ChevronRight, 
  ChevronLeft,
  MessageCircle, 
  Instagram, 
  Phone, 
  Star, 
  Camera, 
  Film, 
  Users, 
  CheckCircle2, 
  Menu,
  X,
  Search,
  Bell,
  User,
  Calendar
} from 'lucide-react';

// --- Constants ---
const waLink = "https://wa.me/919511161164";

// --- Data ---
const SERVICES = [
  {
    youtubeLink: "https://youtu.be/-AQT1uXN504", // Vikram Bhaiya Director - Link 1
    image: "/film-1.jpg",
  },
  {
    youtubeLink: "https://youtu.be/DT-XInvp2xE", // Vikram Bhaiya Director - Link 2
    image: "/film-2.jpg",
  },
  {
    youtubeLink: "https://youtu.be/KbWC5BoVQZs", // Vikram Bhaiya Director - Link 3
    image: "/film-3.jpg",
  },
  {
    youtubeLink: "https://youtu.be/63ojfDqq7QY", // Vikram Bhaiya Director - Link 4
    image: "/film-4.jpg",
  },
  {
    youtubeLink: "https://youtu.be/_PbXisbjBxc", // Vikram Bhaiya Director - Link 5
    image: "/film-5.jpg",
  },
  {
    youtubeLink: "https://youtu.be/gktn9ZR9hn4", // Vikram Bhaiya Director - Link 6
    image: "/film-6.jpg",
  }
];

const SPECIAL_ADD_ONS = [
  "How We Met Short Film (scripted reenactment with actors or couple)",
  "Social Media Handling (real-time coverage and uploads)",
  "Post-Wedding Honeymoon Film (travel cinematic video)",
  "Celebrity / Influencer Cameo (live or recorded)",
  "Shaadi Lens Paparazzi (red carpet guest coverage)",
  "Photoshoot Backdrop (guest + couple cinematic setup)",
  "E-Invitation Cards",
  "Live Painting Artist (real-time artwork)",
  "Flash Mob Surprise (choreographed performance)",
  "Underwater Couple Shoot (pool/beach cinematic shoot)",
  "Day in the Life Bridal & Groom Diaries (behind-the-scenes storytelling)",
  "International Editorial Studio Session (global fashion shoot)",
  "Custom Shaadi Podcast (audio storytelling)",
  "Family & Friends Documentary (legacy storytelling film)"
];

const PORTFOLIO = [
  { image: "/special-1.jpg" },
  { image: "/special-2.jpg" },
  { image: "/special-3.jpg" },
  { image: "/special-4.jpg" },
  { image: "/special-5.jpg" },
  { image: "/special-6.jpg" },
];

// Automatically generates 33 items: /photo-1.jpg to /photo-33.jpg
// The 28th photo is flagged to display as landscape
const PHOTOGRAPHY = Array.from({ length: 33 }, (_, i) => ({
  image: `/photo-${i + 1}.jpg`,
  isLandscape: (i + 1) === 28
}));

const PACKAGES = [
  {
    id: "classic",
    title: "Classic Package",
    price: "PRICE (Depends on scale, venue, add-ons)",
    description: "Essential cinematic coverage for your special day.",
    features: [
      "Cinematic Wedding Film (15–30 min, 4K 10-bit, movie-style storytelling)",
      "Wedding Trailer (3–8 min, cinematic highlights)",
      "Wedding Photography (500+ photos, 100 edited)",
      "Editorial Photoshoot (magazine-style portraits)",
      "Albums (1 Premium Album 40+ sheets / 240 photos + 1 Wedding Magazine)",
      "Luxury Delivery (Online Gallery + Story Box with Custom Pen Drive)",
      "Generational Family Portrait (Complimentary)",
      "Social Media (4 Reels + 6 Instagram Photos)",
      "TEAM –\nMehendi/Haldi/Sangeet\n2 Photographers\n2 Cinematographers, Assistant\n\nWedding\n2 Photographers\n2 Cinematographers\n\nReception\n1 Photographer\n1 Cinematographer",
      "Managed by Director"
    ],
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80"
  },
  {
    id: "signature",
    title: "Signature Package",
    price: "PRICE (Depends on scale, venue, add-ons)",
    description: "Our most popular comprehensive storytelling package.",
    features: [
      "Cinematic Wedding Film (15–30 min, 4K 10-bit, movie-style storytelling)",
      "Every Ritual Film (Haldi, Mehendi, Sangeet, Wedding – mini cinematic edits, 2 angles + speeches)",
      "Wedding Trailer (3–8 min, high-energy cinematic social media film)",
      "Wedding Photography (500+ images, luxury editorial candids + portraits + family)",
      "Editorial Photoshoot (magazine-style couple & family portraits)",
      "Albums (1 Premium Album 50+ sheets + 1 Wedding Magazine + 1 Coffee Table Book)",
      "Luxury Delivery (Online Gallery + Story Box with Pen Drive & Family Letters)",
      "Guest Scanner App (live candid uploads by guests)",
      "Family & Friends Documentary (emotional stories, conversations, blessings film)",
      "E-Invitation Cards",
      "TEAM –\nMehendi / Haldi\n1 Portrait\n1 traditional videographer, 1 Candid\n1 Cinematographer\n\nSangeet\n1 Portrait\n1 traditional videographer, 2 Candid\n2 Cinematographers, Drone\n\nWedding\n1 Portrait\n1 Editorial\n1 traditional videographer, 2 Candid\n2 Cinematographers\nDrone",
      "Managed by Director, Creative Director, Project Manager, Stylist"
    ],
    isPopular: true,
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80"
  },
  {
    id: "legacy",
    title: "Legacy Package",
    price: "PRICE (Depends on scale, venue, add-ons)",
    description: "The ultimate international standard production.",
    features: [
      "Cinematic Wedding Film (20–50 min, 4K 10-bit, movie-style storytelling)",
      "Every Ritual Film (Haldi, Mehendi, Sangeet, Wedding – individual edits, 2 angles + speeches)",
      "Wedding Trailer (3–8 min, cinematic social media highlights)",
      "Wedding Photography (800+ images, luxury editorial candids + portraits + family)",
      "Editorial Photoshoot (magazine-style couple & family portraits)",
      "Albums & Prints (3 Premium Albums 50+ sheets + 2 Wedding Magazines + 1 Coffee Table Book)",
      "360° Wedding Experience Film",
      "Luxury Delivery (Online Gallery + Story Box with Pen Drive & Letters)",
      "E-Invitation Cards",
      "Guest Scanner App (live guest uploads to gallery)",
      "Generational Family Portrait (royal timeless portraits)",
      "Family & Friends Documentary (stories, conversations, blessings film)",
      "Photoshoot Backdrop (stylish setup with instant prints)",
      "Content Creator Team (2-person iPhone BTS + reels, stories, highlights + 20 days Instagram handling with 40–60 posts)",
      "TEAM –\nMehendi & Haldi\n1 Portrait\n1 Candid, 1 Editorial\n1 traditional videographer\n2 Cinematographers\n\nSangeet & Wedding\n2 Portrait, 1 Editorial\n2 Candid\n2 traditional videographer\n2 Cinematographers\n1 FPV Drone",
      "Managed by Director, Creative Director, Project Manager, Stylist"
    ],
    image: "https://images.unsplash.com/photo-1583939008719-7e909a3dc8f6?auto=format&fit=crop&q=80"
  }
];

const TESTIMONIALS = [
  {
    quote: "Shaadi Lens didn't just film our wedding; they captured the soul of our family. Watching the film feels like reliving the magic all over again.",
    initial: "A",
    name: "Ananya & Rahul",
    details: "Udaipur, 2024"
  },
  {
    quote: "The editorial shoot made us feel like royalty. They have an unparalleled eye for detail, blending raw candids with high-end magazine aesthetics seamlessly.",
    initial: "M",
    name: "Meera & Kabir",
    details: "Goa, 2023"
  },
  {
    quote: "Watching our cinematic feature film was an absolute emotional rollercoaster. It's not just a wedding video; it's a legacy piece we'll cherish for generations.",
    initial: "S",
    name: "Sanya & Vikram",
    details: "Jaipur, 2024"
  },
  {
    quote: "Their team blended into the background yet missed absolutely nothing. The final photos and reels are stunning, perfectly capturing the chaotic joy of our big day.",
    initial: "N",
    name: "Neha & Aryan",
    details: "Delhi, 2023"
  }
];

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Portfolio', href: '#photography' },
    { name: 'Packages', href: '#packages' },
    { name: 'Custom Plan', href: '#custom-plan' },
    { name: 'Services', href: '#services' },
    { name: 'Add-Ons', href: '#add-ons' },
    { name: 'Process', href: '#process' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 px-4 md:px-12 py-3 md:py-4 flex items-center justify-between ${isScrolled ? 'bg-[#141414] shadow-2xl' : 'bg-gradient-to-b from-black/80 to-transparent'}`}>
      <div className="flex items-center gap-6 md:gap-12">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
          <img 
            src="/Untitled design (1).png" 
            alt="SL Logo" 
            className="h-10 w-10 md:h-12 md:w-12 object-contain"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://ui-avatars.com/api/?name=SL&background=0a0a0a&color=d4af37&size=128&font-size=0.4";
            }}
          />
          <h1 className="font-display text-2xl md:text-3xl tracking-tighter text-[#d4af37] font-bold hover:drop-shadow-[0_0_10px_rgba(212,175,55,0.8)] transition-all duration-500 py-1 rounded">SHAADI LENS</h1>
        </div>
        
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-xs uppercase tracking-[0.2em] font-medium text-white/60 hover:text-[#d4af37] transition-all duration-300 relative after:content-[''] after:absolute after:w-full after:h-[1px] after:bg-[#d4af37] after:bottom-0 after:left-0 after:scale-x-0 hover:after:scale-x-100 after:origin-right hover:after:origin-left after:transition-transform after:duration-300 py-1"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-6 text-white/70">
          <Search size={20} className="cursor-pointer hover:text-white transition-colors" />
          <Bell size={20} className="cursor-pointer hover:text-white transition-colors" />
          <div className="w-8 h-8 rounded bg-[#d4af37]/20 flex items-center justify-center text-[#d4af37] cursor-pointer">
            <User size={18} />
          </div>
        </div>
        <button 
          className="lg:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-[#141414] z-[150] flex flex-col p-8 lg:hidden animate-in slide-in-from-right duration-300">
          <div className="flex justify-between items-center mb-12">
            <h1 className="font-display text-2xl tracking-tighter text-[#d4af37] font-bold">SHAADI LENS</h1>
            <button onClick={() => setIsMenuOpen(false)} className="text-white">
              <X size={32} />
            </button>
          </div>
          <div className="flex flex-col gap-6">
            {navLinks.map((link, i) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMenuOpen(false)}
                className="text-3xl font-display text-white/90 hover:text-[#d4af37] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="mt-auto pt-8 border-t border-white/10 flex gap-6">
            <a href="https://www.instagram.com/shaadilens.in/" target="_blank" rel="noopener noreferrer">
              <Instagram className="text-white/50 hover:text-[#d4af37] transition-colors" />
            </a>
            <a href={waLink} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="text-white/50 hover:text-[#d4af37] transition-colors" />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

const NetflixCard = ({ item, isPortrait }: { item: any, isPortrait?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Helper to extract YouTube video ID from various link formats
  const getYoutubeId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const ytId = getYoutubeId(item.youtubeLink);

  const handleClick = () => {
    if (item.youtubeLink) {
      window.open(item.youtubeLink, '_blank');
    } else {
      setIsOpen(true);
    }
  };

  // Ensure 28th photo renders as landscape even in portrait sections
  const layoutClasses = (isPortrait && !item.isLandscape)
    ? "w-[160px] sm:w-[220px] md:w-[280px] aspect-[9/16]"
    : "w-[240px] sm:w-[320px] md:w-[400px] aspect-video";

  return (
    <>
      {/* Thumbnail Card */}
      <div
        onClick={handleClick}
        className={`relative flex-shrink-0 ${layoutClasses} rounded-md overflow-hidden cursor-pointer group bg-black/20 hover:scale-105 hover:z-50 transition-all duration-400 ease-out`}
      >
        {/* If no youtube video, render image as base */}
        <img 
          src={item.image} 
          alt="" 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 text-transparent" 
        />

        {/* If youtubeLink is provided, overlay a muted, autoplaying iframe */}
        {ytId && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden bg-black/40">
            <iframe
              src={`https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&loop=1&playlist=${ytId}&controls=0&showinfo=0&rel=0&playsinline=1`}
              className="absolute top-1/2 left-1/2 w-[150%] h-[150%] md:w-[130%] md:h-[130%] -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-80"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute inset-0 border-2 border-[#d4af37]/0 group-hover:border-[#d4af37]/30 transition-all duration-500 rounded-md pointer-events-none" />
        
        {/* Play Icon Overlay specifically for YouTube Links */}
        {ytId && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
               <Play className="text-white w-6 h-6 ml-1" fill="currentColor" />
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen Image Modal (Lightbox) - Only if NOT a youtube link */}
      {isOpen && !ytId && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/95 flex flex-col items-center justify-center p-4 sm:p-8 backdrop-blur-lg cursor-zoom-out"
          onClick={() => setIsOpen(false)}
        >
          <button 
            className="absolute top-6 right-6 md:top-10 md:right-10 text-white hover:text-[#d4af37] transition-all z-[10000] bg-black/80 rounded-full p-3 border border-white/20 hover:border-[#d4af37]/50 flex items-center gap-2 shadow-2xl hover:scale-110"
            onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
          >
            <X size={24} />
            <span className="hidden md:block text-xs font-bold tracking-widest uppercase">Close</span>
          </button>
          
          <img 
            src={item.image} 
            alt="" 
            className="max-w-full max-h-[85vh] object-contain rounded-sm shadow-[0_0_50px_rgba(0,0,0,0.8)] cursor-zoom-out text-transparent"
            onClick={(e) => { e.stopPropagation(); setIsOpen(false); }} 
          />
        </div>
      )}
    </>
  );
};

const ContentRow = ({ title, items, isPortrait }: { title: string, items: any[], isPortrait?: boolean }) => {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="mb-12 md:mb-20 relative group">
      <h2 className="text-xl md:text-3xl font-display mb-4 md:mb-6 px-4 md:px-12 tracking-wide uppercase text-white/90">{title}</h2>
      
      <div className="relative">
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-0 bottom-0 z-40 w-12 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex items-center justify-center text-white"
        >
          <ChevronLeft size={32} />
        </button>
        
        <div 
          ref={rowRef}
          className="flex gap-2 md:gap-3 overflow-x-auto no-scrollbar px-4 md:px-12 pb-6 md:pb-8 pt-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth"
        >
          {items.map((item, idx) => (
            <NetflixCard key={idx} item={item} isPortrait={isPortrait} />
          ))}
        </div>

        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-0 bottom-0 z-40 w-12 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex items-center justify-center text-white"
        >
          <ChevronRight size={32} />
        </button>
      </div>
    </div>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative min-h-[70vh] md:h-screen w-full overflow-hidden flex items-center">
      <div className="absolute inset-0 bg-black">
        <img 
          src="/photo-28.jpg" 
          className="w-full h-full object-cover opacity-60 animate-slow-zoom"
          alt="Hero background"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-transparent to-transparent" />
      </div>

      <div className="relative z-10 w-full px-6 md:px-12 max-w-5xl pt-32 md:pt-0">
        <div className="animate-in fade-in slide-in-from-left-8 duration-1000 ease-out fill-mode-both">
          <h1 className="font-display text-5xl sm:text-6xl md:text-8xl lg:text-[7rem] leading-[1.1] mb-6 md:mb-10 tracking-tighter">
            <span className="block text-white animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 fill-mode-both">
              Turning weddings into
            </span>
            <span className="bg-gradient-to-r from-[#d4af37] to-[#f3e5ab] text-transparent bg-clip-text italic font-light block animate-in fade-in slide-in-from-bottom-8 duration-700 delay-400 fill-mode-both mt-2 md:mt-4">
              evergreen film
            </span>
          </h1>
          
          <p className="text-sm md:text-xl text-white/70 mb-8 md:mb-14 max-w-xl leading-relaxed font-light">
            We don't just film weddings. We craft timeless cinematic masterpieces that preserve your family's most precious emotions for generations to come.
          </p>
          
          <div className="flex flex-row items-center gap-3 md:gap-6">
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="flex-1 sm:flex-none flex items-center justify-center gap-2 md:gap-3 px-4 sm:px-8 md:px-12 py-3 md:py-4 bg-white text-black font-bold rounded hover:bg-[#d4af37] transition-all duration-500 group active:scale-95 shadow-2xl">
              <Calendar size={16} md:size={20} className="group-hover:scale-110 transition-transform" />
              <span className="uppercase tracking-widest text-[10px] md:text-sm whitespace-nowrap">Book Date</span>
            </a>
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="flex-1 sm:flex-none flex items-center justify-center gap-2 md:gap-3 px-4 sm:px-8 md:px-12 py-3 md:py-4 bg-white/10 backdrop-blur-md text-white font-bold rounded hover:bg-white/20 transition-all duration-500 group active:scale-95 border border-white/10">
              <Star size={16} md:size={20} className="text-[#d4af37] group-hover:rotate-45 transition-transform" />
              <span className="uppercase tracking-widest text-[10px] md:text-sm whitespace-nowrap">View Pricing</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const PackageCard = ({ pkg }: { pkg: any }) => {
  return (
    <div 
      className={`relative bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden flex flex-col h-full border border-white/10 group transition-all duration-700 hover:-translate-y-4 ${pkg.isPopular ? 'border-[#d4af37]/40 shadow-[0_0_50px_rgba(197,160,89,0.15)]' : ''}`}
    >
      {pkg.isPopular && (
        <div className="absolute top-6 right-6 bg-gradient-to-r from-[#d4af37] to-[#c5a059] text-black text-[10px] font-black uppercase px-4 py-1.5 rounded-full z-10 tracking-widest shadow-xl">
          Most Popular
        </div>
      )}
      
      <div className="h-64 overflow-hidden relative shrink-0">
        <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] to-transparent opacity-80" />
      </div>
      
      <div className="p-6 md:p-10 flex-1 flex flex-col">
        <h3 className="font-display text-3xl md:text-4xl mb-2 md:mb-3 tracking-tight text-white group-hover:text-[#d4af37] transition-colors duration-500">{pkg.title}</h3>
        <p className="text-[#d4af37] font-bold text-sm md:text-base uppercase tracking-tighter mb-4 md:mb-6">{pkg.price}</p>
        <p className="text-white/50 text-xs md:text-sm mb-6 md:mb-8 leading-relaxed font-light">{pkg.description}</p>
        
        <ul className="space-y-4 md:space-y-5 mb-8 md:mb-10 flex-1">
          {pkg.features.map((feature: string, i: number) => {
            let title = feature;
            let desc = "";

            if (feature.includes(" (")) {
              const splitIndex = feature.indexOf(" (");
              title = feature.substring(0, splitIndex);
              desc = feature.substring(splitIndex).trim();
            } else if (feature.startsWith("TEAM –")) {
              title = "TEAM";
              desc = feature.substring(6).trim();
            }

            return (
              <li key={i} className="flex items-start gap-3 md:gap-4 text-xs md:text-sm text-white/70 group-hover:text-white transition-colors duration-500">
                <CheckCircle2 size={16} className="text-[#d4af37] shrink-0 mt-0.5" />
                <div className="font-light whitespace-pre-line flex flex-col w-full">
                  {desc ? (
                    <>
                      <span className="font-bold text-white/95 text-[13px] md:text-sm tracking-wide">{title}</span>
                      <span className="text-white/50 mt-1 leading-relaxed">{desc}</span>
                    </>
                  ) : (
                    <span className="text-white/80 leading-relaxed">{title}</span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
        
        <a href={waLink} target="_blank" rel="noopener noreferrer" className={`block w-full py-4 md:py-5 text-center rounded-lg font-bold text-[10px] md:text-xs uppercase tracking-[0.3em] transition-all duration-500 active:scale-95 mt-auto ${pkg.isPopular ? 'bg-gradient-to-r from-[#d4af37] to-[#c5a059] text-black shadow-2xl hover:shadow-[#d4af37]/20' : 'bg-white/5 text-white hover:bg-[#d4af37] hover:text-black border border-white/10'}`}>
          KNOW MORE
        </a>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#141414] pt-16 md:pt-32 pb-12 px-4 md:px-12 border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-16 mb-16 md:mb-24">
        <div className="col-span-1 md:col-span-1">
          <h2 className="font-display text-4xl text-[#d4af37] mb-8 tracking-tighter">SHAADI LENS</h2>
          <p className="text-white/40 text-sm leading-relaxed font-light mb-8 max-w-xs">
            Preserving the soul of your family's most precious moments through high-end cinematic storytelling.
          </p>
          <div className="flex gap-6">
            <a 
              href="https://www.instagram.com/shaadilens.in/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/40 hover:text-[#d4af37] hover:-translate-y-1 transition-all duration-300 drop-shadow-none hover:drop-shadow-[0_0_8px_rgba(197,160,89,0.5)]"
            >
              <Instagram size={20} />
            </a>
            <a 
              href={waLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/40 hover:text-[#d4af37] hover:-translate-y-1 transition-all duration-300 drop-shadow-none hover:drop-shadow-[0_0_8px_rgba(197,160,89,0.5)]"
            >
              <MessageCircle size={20} />
            </a>
          </div>
        </div>
        
        <div>
          <h4 className="font-bold text-white mb-8 uppercase text-[10px] tracking-[0.4em] text-[#d4af37]/80">Navigation</h4>
          <ul className="space-y-4 text-white/40 text-sm font-light">
            {['Home', 'Portfolio', 'Services', 'Packages', 'Custom Plan'].map((item) => (
              <li key={item}><a href={`#${item.toLowerCase().replace(' ', '-')}`} className="hover:text-[#d4af37] transition-colors inline-block relative after:content-[''] after:absolute after:w-full after:h-[1px] after:bg-[#d4af37] after:bottom-0 after:left-0 after:scale-x-0 hover:after:scale-x-100 after:origin-right hover:after:origin-left after:transition-transform after:duration-300">{item}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white mb-8 uppercase text-[10px] tracking-[0.4em] text-[#d4af37]/80">Experience</h4>
          <ul className="space-y-4 text-white/40 text-sm font-light">
            {['Cinematic Films', 'Photography', 'Ritual Diaries', 'Legacy Films'].map((item) => (
              <li key={item} className="hover:text-white transition-colors cursor-pointer">{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white mb-8 uppercase text-[10px] tracking-[0.4em] text-[#d4af37]/80">Contact</h4>
          <div className="space-y-6">
            <p className="text-white/40 text-sm font-light leading-relaxed">
              Based in India.<br />
              Serving Globally.<br />
              <span className="text-[#d4af37]/60">shaadilens@gmail.com</span><br/>
              <span className="text-[#d4af37]/60">+91 95111 61164</span><br/>
              <span className="text-[#d4af37]/60">+91 82391 01698</span>
            </p>
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 border border-[#d4af37]/30 text-[#d4af37] text-[10px] font-bold uppercase tracking-widest rounded hover:bg-[#d4af37] hover:text-black transition-all duration-500">
              Get in Touch
            </a>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-white/20 text-[10px] uppercase tracking-[0.3em]">© {new Date().getFullYear()} SHAADI LENS. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-8 text-white/20 text-[10px] uppercase tracking-[0.3em]">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#050505] font-sans selection:bg-[#d4af37] selection:text-black">
      <Navbar />
      
      <main>
        <Hero />

        <div className="relative z-20 mt-12 sm:mt-20 md:mt-16 pb-20">
          <div id="photography">
            <ContentRow title="OUR PHOTOGRAPHY" items={PHOTOGRAPHY} isPortrait={true} />
            <ContentRow title="CINEMATIC WEDDING FILMS" items={SERVICES} />
            <ContentRow title="SHAADI LENS SPECIAL" items={PORTFOLIO} isPortrait={true} />
          </div>
          
          {/* Packages Section */}
          <section id="packages" className="py-16 md:py-32 px-4 md:px-12">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12 md:mb-24">
                <h2 className="font-display text-4xl sm:text-7xl md:text-9xl mb-4 md:mb-6 tracking-tight uppercase text-white">THE <span className="bg-gradient-to-r from-[#d4af37] to-[#f3e5ab] text-transparent bg-clip-text">COLLECTIONS</span></h2>
                <p className="text-white/50 max-w-2xl mx-auto text-sm md:text-xl font-light tracking-wide">Select the perfect production scale for your celebration. Every package is crafted with the same cinematic soul.</p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
                {PACKAGES.map((pkg, idx) => (
                  <div
                    key={pkg.id}
                    className="flex h-full"
                  >
                    <PackageCard pkg={pkg} />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Plan Your Own Package Section */}
          <section id="custom-plan" className="py-16 md:py-32 px-4 md:px-12 bg-gradient-to-b from-black/50 to-[#d4af37]/5">
            <div className="max-w-5xl mx-auto bg-white/5 backdrop-blur-md p-8 md:p-24 rounded-[2rem] md:rounded-[3rem] border border-[#d4af37]/20 text-center relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-30 group-hover:opacity-100 transition-opacity duration-1000" />
              
              <div>
                <h2 className="font-display text-4xl md:text-8xl mb-6 md:mb-8 tracking-tight text-white">PLAN YOUR OWN <span className="bg-gradient-to-r from-[#d4af37] to-[#f3e5ab] text-transparent bg-clip-text">WEDDING PACKAGE</span></h2>
                <p className="text-xl md:text-3xl font-display text-[#d4af37]/90 mb-8 md:mb-12 italic tracking-wide">“Your wedding, your budget — perfectly planned.”</p>
                
                <div className="space-y-4 md:space-y-6 text-white/60 text-sm md:text-xl max-w-3xl mx-auto mb-10 md:mb-16 font-light leading-relaxed">
                  <p>Tell us your budget and vision. We will create a custom package with the best possible services for you.</p>
                  <p>No confusion. No extra cost. Only what you truly need.</p>
                  <p>Get our expert suggestions — plus some paid services complimentary to enhance your experience.</p>
                  <p className="text-white font-medium tracking-widest uppercase text-[10px] md:text-sm">Simple, flexible, and designed just for you.</p>
                </div>

                <div className="flex flex-col items-center gap-6 md:gap-8">
                  <p className="text-[#d4af37] uppercase tracking-[0.5em] text-[8px] md:text-[10px] font-bold animate-pulse">Tell us your plan — we’ll design it for you</p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 w-full sm:w-auto">
                    <a href={waLink} target="_blank" rel="noopener noreferrer" className="block text-center w-full sm:w-auto px-10 py-4 md:py-5 bg-white text-black font-bold rounded-full hover:bg-[#d4af37] transition-all duration-500 active:scale-95 shadow-2xl hover:shadow-[#d4af37]/20">
                      Start Your Custom Plan
                    </a>
                    <a href={waLink} target="_blank" rel="noopener noreferrer" className="block text-center w-full sm:w-auto px-10 py-4 md:py-5 border border-[#d4af37]/50 text-[#d4af37] font-bold rounded-full hover:bg-[#d4af37]/10 transition-all duration-500 active:scale-95">
                      Create Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Services What We Provide Section */}
          <section id="services" className="py-16 md:py-32 px-4 md:px-12 bg-black/30 relative">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5" />
            <div className="max-w-7xl mx-auto relative z-10">
              <div className="text-center mb-12 md:mb-20">
                <h2 className="font-display text-4xl md:text-8xl mb-4 md:mb-6 tracking-tight uppercase text-white">SERVICES WE <span className="bg-gradient-to-r from-[#d4af37] to-[#f3e5ab] text-transparent bg-clip-text">PROVIDE</span></h2>
                <p className="text-white/50 max-w-2xl mx-auto text-sm md:text-lg font-light tracking-wide">From the first look to the final dance, we provide a full suite of cinematic services.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {[
                   {title: "Cinematic Wedding Films", description: "Your wedding transformed into a timeless cinematic film — blending documentary-style storytelling with deeply emotional moments. Every ritual, every glance, every feeling crafted into a story you relive forever.", icon: Film},
                   {title: "Wedding Film Trailer", description: "A high-energy, emotion-led trailer — just like a movie teaser. Fast-paced yet soulful, combining cinematic visuals with documentary realism.", icon: Play},
                   {title: "Wedding Photography", description: "A curated blend of candid storytelling and editorial elegance — capturing raw emotions with a refined luxury aesthetic.", icon: Camera},
                   {title: "Every Ritual as Individual Film", description: "Each function — Haldi, Mehendi, Sangeet, Wedding — becomes its own cinematic film with storytelling, multiple angles, and emotional detailing.", icon: Film},
                   {title: "Family & Friends Documentary film and potraits", description: "A heartfelt capturing, group photos, voices, conversations, and blessings — preserved as a legacy film for generations.", icon: Users},
                   {title: "Social Media & Reels", description: "Cinematic, Instagram-ready reels designed with storytelling and aesthetics — not just content, but mini films.", icon: Instagram},
                   {title: "Editorial Style Photoshoot", description: "A magazine-inspired session — planned, styled, and executed like a luxury editorial shoot for the couple and family.", icon: Camera},
                   {title: "Luxury Albums & Wedding Magazine", description: "Handcrafted premium albums and Vogue-style wedding magazines — designed as timeless keepsakes.", icon: Star}
                ].map((service, idx) => (
                  <div 
                    key={idx}
                    className="bg-white/5 backdrop-blur-md p-8 md:p-10 rounded-2xl flex flex-col items-center text-center group border border-white/10 transition-all duration-700 hover:-translate-y-2"
                  >
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#d4af37]/5 flex items-center justify-center text-[#d4af37] mb-6 md:mb-8 group-hover:scale-110 group-hover:bg-[#d4af37]/20 transition-all duration-500 shadow-2xl">
                      <service.icon size={36} />
                    </div>
                    <h3 className="font-display text-2xl mb-4 tracking-wide text-white group-hover:text-[#d4af37] transition-colors duration-500 uppercase">{service.title}</h3>
                    <p className="text-white/40 text-xs leading-relaxed font-light group-hover:text-white/60 transition-colors duration-500">{service.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Special Add-Ons Section */}
          <section id="add-ons" className="py-16 md:py-32 px-4 md:px-12">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12 md:mb-20">
                <h2 className="font-display text-4xl md:text-8xl mb-4 md:mb-6 tracking-tight uppercase text-white">SPECIAL <span className="bg-gradient-to-r from-[#d4af37] to-[#f3e5ab] text-transparent bg-clip-text">ADD-ONS</span></h2>
                <p className="text-white/50 max-w-2xl mx-auto text-sm md:text-lg font-light tracking-wide">Elevate your celebration with our exclusive cinematic enhancements.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {SPECIAL_ADD_ONS.map((addon, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center gap-6 p-6 bg-white/5 backdrop-blur-md rounded-xl hover:bg-white/10 transition-all duration-500 group border border-white/10"
                  >
                    <div className="w-3 h-3 rounded-full bg-[#d4af37] shrink-0 shadow-[0_0_15px_rgba(197,160,89,0.5)] group-hover:scale-150 transition-transform duration-500" />
                    <p className="text-white/60 text-sm font-light tracking-wide group-hover:text-white transition-colors duration-500">{addon}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Our Process Section */}
          <section id="process" className="py-16 md:py-32 px-4 md:px-12">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12 md:mb-20">
                <h2 className="font-display text-4xl md:text-8xl mb-4 md:mb-6 tracking-tight uppercase text-white">OUR <span className="bg-gradient-to-r from-[#d4af37] to-[#f3e5ab] text-transparent bg-clip-text">PROCESS</span></h2>
                <p className="text-white/50 max-w-2xl mx-auto text-sm md:text-lg font-light tracking-wide">A seamless journey from our first meeting to your cinematic premiere.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                {[
                  { step: "01", title: "The Script", description: "We meet to understand your story, your vibe, and your family's unique dynamics." },
                  { step: "02", title: "The Production", description: "Our elite team captures your wedding with high-end cinema gear and a discreet presence." },
                  { step: "03", title: "The Edit", description: "Meticulous color grading, sound design, and narrative editing to create your masterpiece." },
                  { step: "04", title: "The Premiere", description: "Your cinematic legacy is delivered in premium formats for you to relive forever." },
                ].map((item, i) => (
                  <div key={i} className="relative p-8 md:p-10 bg-white/5 backdrop-blur-md rounded-2xl group overflow-hidden border border-white/10 transition-all duration-700">
                    <div className="absolute -top-6 -right-6 text-[6rem] md:text-[10rem] font-display text-white/[0.02] group-hover:text-[#d4af37]/[0.04] transition-colors duration-1000">
                      {item.step}
                    </div>
                    <div className="relative z-10">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#d4af37] text-black flex items-center justify-center font-bold mb-6 md:mb-8 shadow-xl">
                        {item.step}
                      </div>
                      <h4 className="font-display text-xl md:text-2xl mb-3 md:mb-4 tracking-wide uppercase text-white group-hover:text-[#d4af37] transition-colors duration-500">{item.title}</h4>
                      <p className="text-white/40 text-xs md:text-sm leading-relaxed font-light group-hover:text-white/60 transition-colors duration-500">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonials Row */}
          <section className="py-16 md:py-32 bg-gradient-to-b from-transparent to-black/50">
             <h2 className="text-xl md:text-4xl font-display mb-8 md:mb-10 px-4 md:px-12 tracking-widest uppercase text-white/80">WHAT FAMILIES ARE SAYING</h2>
             <div className="flex gap-4 md:gap-10 overflow-x-auto no-scrollbar px-4 md:px-12 pb-12 md:pb-16 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {TESTIMONIALS.map((testimonial, i) => (
                  <div key={i} className="flex-shrink-0 w-[280px] sm:w-[350px] md:w-[500px] bg-white/5 backdrop-blur-md p-8 md:p-14 rounded-2xl md:rounded-3xl border border-white/10 group transition-all duration-700">
                    <div className="flex gap-1.5 md:gap-2 mb-6 md:mb-8">
                      {[...Array(5)].map((_, j) => <Star key={j} size={14} md:size={16} fill="#c5a059" className="text-[#d4af37]" />)}
                    </div>
                    <p className="text-white/70 text-base md:text-xl italic mb-8 md:mb-10 leading-relaxed font-light group-hover:text-white transition-colors duration-500">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center gap-4 md:gap-6">
                      <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37] font-display text-lg md:text-2xl border border-[#d4af37]/20">{testimonial.initial}</div>
                      <div>
                        <p className="text-xs md:text-lg font-bold tracking-widest uppercase text-white">{testimonial.name}</p>
                        <p className="text-[8px] md:text-xs text-white/30 uppercase tracking-[0.3em]">{testimonial.details}</p>
                      </div>
                    </div>
                  </div>
                ))}
             </div>
          </section>

          {/* Final CTA */}
          <section className="py-20 md:py-40 px-6 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-4xl sm:text-6xl md:text-8xl mb-4 md:mb-8 leading-tight md:leading-none text-white">READY TO START YOUR <br /><span className="bg-gradient-to-r from-[#d4af37] to-[#f3e5ab] text-transparent bg-clip-text">STORY?</span></h2>
              <p className="text-sm md:text-xl text-white/60 mb-8 md:mb-12 font-light">Limited dates available for 2026-27. Secure your cinematic legacy today.</p>
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="inline-block w-full sm:w-auto px-10 md:px-12 py-4 md:py-5 bg-gradient-to-r from-[#d4af37] to-[#c5a059] text-black font-black rounded text-sm md:text-lg uppercase tracking-[0.15em] md:tracking-[0.2em] hover:scale-105 transition-transform active:scale-95 shadow-2xl shadow-[#d4af37]/20">
                Book Your Dates
              </a>
            </div>
          </section>
        </div>
      </main>

      <Footer />

      {/* Floating Contact - WhatsApp Button */}
      <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-4">
        <a 
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-transform"
        >
          <MessageCircle size={28} />
        </a>
      </div>
    </div>
  );
}
