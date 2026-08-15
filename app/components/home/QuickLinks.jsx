import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

const linksData = [
  {
    id: 1,
    title: 'Athlete Classification',
    desc: 'Understand the physical and visual categories for competitive para lawn bowls. Discover where you fit on the green.',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM57_q7K1BVaPPojN-Lwr0CH9JBBpDXF7KPb7siKfwTQ&s=10',
    href: '#',
  },
  {
    id: 2,
    title: 'Tournament Calendar',
    desc: 'View the official schedule for upcoming National and State championships. Plan your path to the podium.',
    img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop',
    href: '#',
  },
  {
    id: 3,
    title: 'Adaptive Equipment',
    desc: 'Learn about delivery aids, wheelchairs, and assistive devices for para athletes to ensure barrier-free play.',
    img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop',
    href: '#',
  },
  {
    id: 4,
    title: 'Coaches & Officials',
    desc: 'Access the directory of certified coaches, classifiers, and match officials guiding our federation.',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3UpSabXYs27MQ3aZvLXf6yr29CvYMHbif1QECBXys5Q&s',
    href: '#',
  }
];

export default function QuickLinks() {
  return (
    <section className="w-full bg-[#F8F9FA] pt-32 lg:pt-40 pb-24 relative z-10">
      
      {/* Decorative background grid for the section */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: 'linear-gradient(#0B1242 1px, transparent 1px), linear-gradient(90deg, #0B1242 1px, transparent 1px)', backgroundSize: '64px 64px' }}
      ></div>

      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* ================= SECTION HEADER ================= */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center space-x-3 mb-4">
            <span className="h-px w-8 bg-[#E62227]"></span>
            <span className="text-[#E62227] font-bold tracking-[0.2em] uppercase text-sm">
              Discover
            </span>
            <span className="h-px w-8 bg-[#E62227]"></span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0B1242] mb-6 uppercase tracking-tight">
            Explore PLBFI Resources
          </h2>
        </div>

        {/* ================= IMMERSIVE GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
          
          {linksData.map((link, index) => (
            <Link 
              href={link.href} 
              key={link.id} 
              className="group relative w-full h-[380px] md:h-[450px] rounded-[2rem] overflow-hidden isolate shadow-lg hover:shadow-[0_20px_50px_rgba(11,18,66,0.3)] transition-shadow duration-500"
            >
              
              {/* 1. Background Image (Zooms on hover) */}
              <img 
                src={link.img} 
                alt={link.title} 
                className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110" 
              />

              {/* 2. Base Tint & Deep Gradient Overlay */}
              <div className="absolute inset-0 bg-[#0B1242]/20 z-10 transition-opacity duration-500 group-hover:opacity-0"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1242] via-[#0B1242]/70 to-transparent z-10 transition-opacity duration-500"></div>

              {/* 3. Top Left Badge */}
              <div className="absolute top-6 left-6 md:top-8 md:left-8 z-20">
                <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-widest py-2 px-5 rounded-full shadow-sm">
                  Resource 0{index + 1}
                </span>
              </div>

              {/* 4. Giant Watermark Number (Behind Text) */}
              <div className="absolute bottom-4 right-6 z-10 text-[100px] font-black text-white/[0.05] leading-none pointer-events-none group-hover:scale-110 group-hover:-translate-y-4 transition-all duration-700">
                0{index + 1}
              </div>

              {/* 5. Bottom Aligned Interactive Content */}
              <div className="absolute bottom-0 left-0 w-full p-8 md:p-10 z-20 flex flex-col justify-end">
                
                {/* Expanding Red Accent Line */}
                <div className="w-10 h-1.5 bg-[#E62227] rounded-full mb-4 transition-all duration-500 ease-out group-hover:w-24 group-hover:bg-white"></div>
                
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-white leading-tight">
                  {link.title}
                </h3>

                {/* Smooth Reveal Wrapper using CSS Grid */}
                <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-in-out">
                  <div className="overflow-hidden">
                    
                    {/* Fading in Description */}
                    <p className="text-blue-100/90 text-sm md:text-base mt-4 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {link.desc}
                    </p>
                    
                    {/* Aesthetic Action Button */}
                    <div className="inline-flex items-center text-white font-bold text-sm uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                      Explore Now
                      <span className="ml-4 w-10 h-10 rounded-full bg-[#E62227] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <FiArrowRight size={18} />
                      </span>
                    </div>

                  </div>
                </div>

              </div>

            </Link>
          ))}
          
        </div>
      </div>
    </section>
  );
}