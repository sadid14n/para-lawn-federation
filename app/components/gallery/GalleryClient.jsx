"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { FiX, FiChevronLeft, FiChevronRight, FiZoomIn } from "react-icons/fi";

// ============================================================================
// DATA — 4th Asian Championship only
// ============================================================================
const CHAMPIONSHIP = {
  id: "4th-asian",
  title: "4th Asian Para Lawn Bowls Championship",
  subtitle: "Continuing the legacy, one green at a time",
  images: [
    { src: "/gallery/4th-asian/4th-2.jpg", alt: "4th Asian Para Lawn Bowls Championship - moment 1" },
    { src: "/gallery/4th-asian/4th-2.jpg", alt: "4th Asian Para Lawn Bowls Championship - moment 2" },
    { src: "/gallery/4th-asian/4th-3.jpg", alt: "4th Asian Para Lawn Bowls Championship - moment 3" },
    { src: "/gallery/4th-asian/4th-4.jpg", alt: "4th Asian Para Lawn Bowls Championship - moment 4" },
    { src: "/gallery/4th-asian/4th-5.jpg", alt: "4th Asian Para Lawn Bowls Championship - moment 5" },
    { src: "/gallery/4th-asian/4th-6.jpg", alt: "4th Asian Para Lawn Bowls Championship - moment 6" },
  ],
};

// ============================================================================
// LIGHTBOX
// ============================================================================
function Lightbox({ images, index, onClose, onPrev, onNext }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, onPrev, onNext]);

  const current = images[index];

  return (
    <div
      className="fixed inset-0 z-[100] bg-navy-dark/95 backdrop-blur-sm flex items-center justify-center animate-[fadeIn_0.25s_ease-out]"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-accent border border-white/20 hover:border-accent flex items-center justify-center text-white transition-colors duration-300"
      >
        <FiX size={20} />
      </button>

      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 text-white/70 text-xs sm:text-sm font-bold tracking-wider">
        {index + 1} / {images.length}
      </div>

      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Previous image"
        className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-accent border border-white/20 hover:border-accent flex items-center justify-center text-white transition-colors duration-300"
      >
        <FiChevronLeft size={22} />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Next image"
        className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-accent border border-white/20 hover:border-accent flex items-center justify-center text-white transition-colors duration-300"
      >
        <FiChevronRight size={22} />
      </button>

      <div
        className="relative w-full h-full flex items-center justify-center px-4 sm:px-16 py-16 sm:py-20"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          key={current.src}
          src={current.src}
          alt={current.alt}
          className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-[scaleIn_0.3s_ease-out]"
        />
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  );
}

// ============================================================================
// REVEAL WRAPPER
// ============================================================================
function RevealOnScroll({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-[0.97]"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ============================================================================
// PHOTO GRID — repeating row pattern: [1 full-width, 3-across, 2-across].
// Images are grouped into chunks following that cycle, and each chunk
// renders as its own grid row with the matching column count. Since the
// cycle is driven by array position (not a hardcoded count), it keeps
// working correctly no matter how many photos you add or remove — the
// only visible effect is where the final, possibly-partial row lands.
// ============================================================================
function chunkByPattern(images, pattern) {
  const chunks = [];
  let i = 0;
  let p = 0;
  while (i < images.length) {
    const size = pattern[p % pattern.length];
    chunks.push(images.slice(i, i + size));
    i += size;
    p++;
  }
  return chunks;
}

// Literal class lookups — required so Tailwind's build reliably includes
// them (dynamic template strings like `grid-cols-${n}` are not detected).
const ROW_COLS = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-3",
};

const ROW_ASPECT = {
  1: "aspect-[21/9] md:aspect-[21/8]", // full-width banner row
  2: "aspect-[4/3]",                    // 2-across row
  3: "aspect-square",                   // 3-across row
};

function PhotoGrid({ images, onImageClick }) {
  const rows = chunkByPattern(images, [1, 3, 2]);
  let runningIndex = 0;

  return (
    <div className="flex flex-col gap-3 md:gap-5">
      {rows.map((row, rowIdx) => {
        const rowSize = row.length;
        const colsClass = ROW_COLS[rowSize] || ROW_COLS[3];
        const aspectClass = ROW_ASPECT[rowSize] || ROW_ASPECT[3];

        return (
          <div key={rowIdx} className={`grid ${colsClass} gap-3 md:gap-5`}>
            {row.map((img) => {
              const i = runningIndex++;
              return (
                <RevealOnScroll key={img.src} delay={Math.min(i * 70, 420)}>
                  <button
                    onClick={() => onImageClick(i)}
                    className={`relative w-full block text-left ${aspectClass}`}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading={i === 0 ? "eager" : "lazy"}
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                  </button>
                </RevealOnScroll>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

// ============================================================================
// MAIN PAGE — single championship section
// ============================================================================
export default function GalleryClient() {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const images = CHAMPIONSHIP.images;

  const openLightbox = useCallback((i) => setLightboxIndex(i), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevImage = useCallback(
    () => setLightboxIndex((i) => (i - 1 + images.length) % images.length),
    [images.length]
  );
  const nextImage = useCallback(
    () => setLightboxIndex((i) => (i + 1) % images.length),
    [images.length]
  );

  return (
    <div className="w-full bg-white pt-16 md:pt-24 pb-16 md:pb-24">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
        <RevealOnScroll>
          <div className="mb-10 md:mb-12">
            <h2 className="font-[family-name:var(--font-display)] font-extrabold text-navy tracking-tight leading-[1.05] text-3xl md:text-5xl mb-3">
              {CHAMPIONSHIP.title}
            </h2>
            <p className="text-gray-500 text-base md:text-lg font-medium">
              {CHAMPIONSHIP.subtitle}
            </p>
          </div>
        </RevealOnScroll>

        <PhotoGrid images={images} onImageClick={openLightbox} />
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </div>
  );
}