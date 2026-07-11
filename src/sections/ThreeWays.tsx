import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, Key } from 'lucide-react';
import { useLanguage, translations } from '@/hooks/useLanguage';

gsap.registerPlugin(ScrollTrigger);

export default function ThreeWays() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from('.ways-title', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.ways-title',
          start: 'top 80%',
        },
      });

      gsap.utils.toArray<HTMLElement>('.ways-card').forEach((card, i) => {
        gsap.from(card, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
          delay: i * 0.12,
        });
      });

      gsap.from('.ways-extras', {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.ways-extras',
          start: 'top 85%',
        },
      });

      gsap.from('.ways-footer', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.ways-footer',
          start: 'top 90%',
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const tiers = [
    {
      headlineKey: 'voiceHeadline',
      descKey: 'voiceDesc',
    },
    {
      headlineKey: 'videoHeadline',
      descKey: 'videoDesc',
    },
    {
      headlineKey: 'holoHeadline',
      descKey: 'holoDesc',
    },
  ];

  return (
    <section
      id="ways"
      ref={sectionRef}
      className="relative py-[15vh] md:py-[20vh] px-[5vw]"
      style={{ backgroundColor: 'var(--void)' }}
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Title */}
        <div className="ways-title text-center mb-16">
          <h2
            className="font-display font-light"
            style={{
              fontSize: 'clamp(36px, 5vw, 64px)',
              color: 'var(--bone)',
              lineHeight: 1.0,
            }}
          >
            {t(translations.ways.title)}
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {tiers.map((tier, i) => (
            <div
              key={i}
              className="ways-card flex flex-col p-8 md:p-10 transition-all duration-400 hover:-translate-y-1"
              style={{
                background: 'var(--glass)',
                border: '1px solid var(--glass-border)',
                backdropFilter: 'blur(10px)',
                borderRadius: '8px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--amber-muted)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--glass-border)';
              }}
            >
              {/* Headline */}
              <h3
                className="font-display text-[24px] md:text-[28px] font-light mb-4"
                style={{ color: 'var(--bone)' }}
              >
                {t(translations.ways[tier.headlineKey as keyof typeof translations.ways])}
              </h3>

              {/* Description */}
              <p
                className="text-[15px] font-light leading-[1.7] flex-grow"
                style={{ color: 'rgba(227,213,202,0.65)' }}
              >
                {t(translations.ways[tier.descKey as keyof typeof translations.ways])}
              </p>
            </div>
          ))}
        </div>

        {/* Storage & Access info */}
        <div className="ways-extras grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* Storage */}
          <div
            className="flex flex-col p-8 transition-all duration-400"
            style={{
              background: 'rgba(240,162,2,0.03)',
              border: '1px solid rgba(240,162,2,0.12)',
              borderRadius: '8px',
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background: 'rgba(240,162,2,0.1)',
                  border: '1px solid rgba(240,162,2,0.2)',
                }}
              >
                <Clock size={20} style={{ color: 'var(--amber-core)' }} />
              </div>
              <h4
                className="font-display text-[18px] font-light"
                style={{ color: 'var(--bone)' }}
              >
                {t(translations.ways.storageTitle)}
              </h4>
            </div>
            <p
              className="text-[14px] font-light leading-[1.7]"
              style={{ color: 'rgba(227,213,202,0.6)' }}
            >
              {t(translations.ways.storageDesc)}
            </p>
          </div>

          {/* Access */}
          <div
            className="flex flex-col p-8 transition-all duration-400"
            style={{
              background: 'rgba(240,162,2,0.03)',
              border: '1px solid rgba(240,162,2,0.12)',
              borderRadius: '8px',
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background: 'rgba(240,162,2,0.1)',
                  border: '1px solid rgba(240,162,2,0.2)',
                }}
              >
                <Key size={20} style={{ color: 'var(--amber-core)' }} />
              </div>
              <h4
                className="font-display text-[18px] font-light"
                style={{ color: 'var(--bone)' }}
              >
                {t(translations.ways.accessTitle)}
              </h4>
            </div>
            <p
              className="text-[14px] font-light leading-[1.7]"
              style={{ color: 'rgba(227,213,202,0.6)' }}
            >
              {t(translations.ways.accessDesc)}
            </p>
          </div>
        </div>

        {/* Footer note */}
        <p
          className="ways-footer text-center text-[16px] font-light mt-12"
          style={{ color: 'rgba(227,213,202,0.5)' }}
        >
          {t(translations.ways.footer)}
        </p>
      </div>
    </section>
  );
}
