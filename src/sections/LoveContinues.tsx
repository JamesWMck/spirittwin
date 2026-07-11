import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage, translations } from '@/hooks/useLanguage';

gsap.registerPlugin(ScrollTrigger);

export default function LoveContinues() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from('.love-image', {
        scale: 1.05,
        opacity: 0,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
        },
      });

      gsap.from('.love-text-line', {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.love-text-overlay',
          start: 'top 70%',
        },
      });

      gsap.from('.love-subtitle', {
        y: 20,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.love-subtitle',
          start: 'top 90%',
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[80vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="love-image absolute inset-0 z-0">
        <img
          src="/continuing-love.jpg"
          alt="Love continues through time"
          className="w-full h-full object-cover"
          style={{ opacity: 0.7 }}
        />
      </div>

      {/* Overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: 'linear-gradient(to bottom, rgba(10,9,8,0.5) 0%, rgba(10,9,8,0.4) 50%, rgba(10,9,8,0.7) 100%)',
        }}
      />

      {/* Text overlay */}
      <div className="love-text-overlay relative z-10 text-center px-[5vw]">
        <h2
          className="love-text-line font-display font-light leading-[1.1] mb-4"
          style={{
            fontSize: 'clamp(40px, 8vw, 100px)',
            color: 'var(--bone)',
          }}
        >
          {t(translations.love.line1)}
        </h2>
        <h2
          className="love-text-line font-display font-light italic leading-[1.1] mb-10"
          style={{
            fontSize: 'clamp(36px, 7vw, 88px)',
            color: 'var(--amber-core)',
          }}
        >
          {t(translations.love.line2)}
        </h2>
        <p
          className="love-subtitle text-[14px] font-light uppercase tracking-[0.15em]"
          style={{ color: 'rgba(227,213,202,0.6)' }}
        >
          {t(translations.brand.name)} &mdash; {t(translations.brand.tagline)}
        </p>
      </div>
    </section>
  );
}
