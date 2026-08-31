import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

const linksData = [
  {
    id: 1,
    title: 'Athlete Classification',
    desc: 'Understand the physical and visual categories for competitive para lawn bowls. Discover where you fit on the green.',
    img: 'https://media.gettyimages.com/id/1338159248/photo/wide-shot-of-senior-men-bowling-during-lawn-bowling-match-on-summer-evening.jpg?s=612x612&w=0&k=20&c=mI7kyZcGeI5Ezi1-gXE4oJ8ARxa9VSAAOJKGkmUQljw=',
    href: '#',
  },
  {
    id: 2,
    title: 'Tournament Calendar',
    desc: 'View the official schedule for upcoming National and State championships. Plan your path to the podium.',
    img: 'https://media.gettyimages.com/id/1413262735/photo/leamington-spa-england-silver-medalists-sunil-bahadur-navneet-singh-chandan-kumar-singh-and.jpg?s=612x612&w=0&k=20&c=BPdiwT-UmX_LNOG-CbK0IrbhU_tKmkoxPVZQtVUCnk0=',
    href: '#',
  },
  {
    id: 3,
    title: 'Adaptive Equipment',
    desc: 'Learn about delivery aids, wheelchairs, and assistive devices for para athletes to ensure barrier-free play.',
    img: 'https://media.gettyimages.com/id/2275489018/photo/group-of-active-seniors-lawn-bowling-playing-bowls-in-the-uk.jpg?s=612x612&w=0&k=20&c=nnmqoDVCZ-IjP49m-dXMy2VX2N9V6cxnIcDEOf5Ok-I=',
    href: '#',
  },
  {
    id: 4,
    title: 'Coaches & Officials',
    desc: 'Access the directory of certified coaches, classifiers, and match officials guiding our federation.',
    img: 'https://media.gettyimages.com/id/200472149-001/photo/two-men-standing-on-bowling-green-rear-view-low-section.jpg?s=612x612&w=0&k=20&c=C1KZM4XPWo0GVVDhOx9sUJ1lelO71TjgFze3jP9V5xo=',
    href: '#',
  }
];

export default function QuickLinks() {
  return (
    <section className="w-full bg-off-white pt-32 lg:pt-40 pb-24 relative z-10">

      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(#1E2265 1px, transparent 1px), linear-gradient(90deg, #1E2265 1px, transparent 1px)', backgroundSize: '64px 64px' }}
      ></div>

      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">

        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center space-x-3 mb-4">
            <span className="h-px w-8 bg-navy/30"></span>
            <span className="text-navy font-bold tracking-[0.25em] uppercase text-xs">
              Discover
            </span>
            <span className="h-px w-8 bg-navy/30"></span>
          </div>
          <h2 className="font-[family-name:var(--font-display)] font-extrabold text-navy mb-6 tracking-tight text-4xl md:text-5xl lg:text-6xl">
            Explore PLBFI Resources
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10">

          {linksData.map((link, index) => (
            <Link
              href={link.href}
              key={link.id}
              className="group relative w-full h-[400px] md:h-[480px] rounded-[2rem] overflow-hidden isolate shadow-lg hover:shadow-[0_20px_50px_rgba(30,34,101,0.3)] transition-shadow duration-500"
            >

              <img
                src={link.img}
                alt={link.title}
                className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110"
              />

              {/* Stronger, always-on darkening — no longer fades away on hover,
                  since the reveal content needs the same contrast the whole time */}
              <div className="absolute inset-0 bg-navy/40 z-10"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/85 to-navy/25 z-10"></div>
              {/* Extra tight dark band right behind the text block specifically */}
              <div className="absolute bottom-0 left-0 w-full h-[65%] bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10"></div>

              <div className="absolute top-4 left-6 md:top-2 md:left-8 z-10 text-[90px] md:text-[110px] font-black text-white/[0.15] leading-none pointer-events-none select-none group-hover:text-white/[0.22] transition-colors duration-500">
                {index + 1}
              </div>

              <div className="absolute bottom-0 left-0 w-full p-8 md:p-10 pb-9 md:pb-11 z-20 flex flex-col justify-end">

                <div className="w-10 h-1.5 bg-accent rounded-full mb-3 transition-all duration-500 ease-out group-hover:w-24 group-hover:bg-white"></div>

                <h3 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                  {link.title}
                </h3>

                <div className="overflow-hidden max-h-0 group-hover:max-h-[180px] transition-[max-height] duration-500 ease-in-out">
                  <p className="text-white/95 text-sm md:text-base mt-3 mb-5 leading-relaxed font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
                    {link.desc}
                  </p>

                  <div className="inline-flex items-center text-white font-bold text-sm uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 pb-10">
                    Explore Now
                    <span className="ml-4 w-10 h-10 rounded-full bg-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <FiArrowRight size={18} />
                    </span>
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