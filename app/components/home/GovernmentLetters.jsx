import Link from 'next/link';

// Updated data to reflect actual federation documents
const lettersData = [
  {
    id: 1,
    title: 'IBD (International Bowls for the Disabled) Affiliation Certificate',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4vmcNG4We2YevTnQV3lWlk8C9TrW5ZJAKobZv-7B3NA&s=10',
    href: '#',
  },
  {
    id: 2,
    title: 'Ministry of Youth Affairs & Sports (MYAS) Correspondence',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEn6gFz71hfngbrscXdimUtlJyZKEelHoeqQs38Tjuzw&s=10',
    href: '#',
  },
  {
    id: 3,
    title: 'Bowling Federation of India (BFI) Acknowledgment',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF536lXLbrlVllJphaGO0TmSuZf401S86z9ioNs8Q2Sg&s=10',
    href: '#',
  },
  {
    id: 4,
    title: 'Official Society Registration & Incorporation Certificate',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4vmcNG4We2YevTnQV3lWlk8C9TrW5ZJAKobZv-7B3NA&s=10',
    href: '#',
  },
//   {
//     id: 5,
//     title: 'State Championship Sanction Letter (Assam / Maharashtra)',
//     img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEn6gFz71hfngbrscXdimUtlJyZKEelHoeqQs38Tjuzw&s=10',
//     href: '#',
//   }
];

export default function GovernmentLetters() {
  return (
    <section className="relative w-full bg-[#F3F4F6] py-20 md:py-28 border-y border-gray-200">
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= SECTION HEADER ================= */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-[#0B1242] uppercase tracking-wide mb-4 text-center">
            Official Recognitions & Letters
          </h2>
          <div className="w-24 h-1.5 bg-[#E62227] rounded-full"></div>
        </div>

        {/* ================= ADAPTIVE FLEX GRID ================= */}
        {/* Changed from 'grid' to 'flex flex-wrap justify-center' */}
        <div className="flex flex-wrap justify-center gap-6 lg:gap-8 group/list">
          
          {lettersData.map((letter) => (
            <Link 
              href={letter.href} 
              key={letter.id}
              title={letter.title} 
              className="
                relative block 
                /* Fixed responsive widths ensure they stay uniform and wrap cleanly */
                w-[calc(50%-12px)] sm:w-[180px] md:w-[200px] lg:w-[220px] xl:w-[240px] shrink-0
                aspect-[1/1.4] bg-white rounded-sm border border-gray-200 
                transition-all duration-400 ease-in-out
                /* Hover effects */
                group-hover/list:opacity-50 
                hover:!opacity-100 hover:-translate-y-2 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] 
                z-10 hover:z-20
              "
            >
              {/* Image with a tiny padding to look like a physical print margin */}
              <div className="w-full h-full p-1.5">
                <img 
                  src={letter.img} 
                  alt={letter.title} 
                  className="w-full h-full object-cover border border-gray-100"
                />
              </div>
            </Link>
          ))}

        </div>
      </div>
    </section>
  );
}