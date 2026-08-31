import Link from 'next/link';

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
];

export default function GovernmentLetters() {
  return (
    <section className="relative w-full bg-off-white py-20 md:py-28 border-y border-gray-200">

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* ================= SECTION HEADER ================= */}
        <div className="flex flex-col items-center text-center mb-16">
          <p className="text-xs font-bold text-accent tracking-[0.25em] uppercase mb-3">
            Trust & Transparency
          </p>
          <h2 className="font-[family-name:var(--font-display)] font-extrabold text-navy tracking-tight mb-4 text-3xl md:text-4xl lg:text-5xl">
            Official recognitions & letters
          </h2>
          <div className="w-24 h-1.5 bg-accent rounded-full"></div>
        </div>

        {/* ================= ADAPTIVE FLEX GRID ================= */}
        <div className="flex flex-wrap justify-center gap-6 lg:gap-8 group/list">

          {lettersData.map((letter) => (
            <Link
              href={letter.href}
              key={letter.id}
              title={letter.title}
              className="
                relative block
                w-[calc(50%-12px)] sm:w-[180px] md:w-[200px] lg:w-[220px] xl:w-[240px] shrink-0
                aspect-[1/1.4] bg-white rounded-sm border border-gray-200
                transition-all duration-400 ease-in-out
                group-hover/list:opacity-50
                hover:!opacity-100 hover:-translate-y-2 hover:shadow-[0_20px_40px_-10px_rgba(30,34,101,0.2)]
                z-10 hover:z-20
              "
            >
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