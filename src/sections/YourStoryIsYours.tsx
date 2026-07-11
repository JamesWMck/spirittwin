import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Lock, Home, Key, Hand } from 'lucide-react';
import { useLanguage, translations } from '@/hooks/useLanguage';

gsap.registerPlugin(ScrollTrigger);

export default function YourStoryIsYours() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from('.privacy-title', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.privacy-title',
          start: 'top 80%',
        },
      });

      gsap.utils.toArray<HTMLElement>('.privacy-promise').forEach((card, i) => {
        gsap.from(card, {
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
          delay: i * 0.1,
        });
      });

      gsap.from('.privacy-closing', {
        y: 20,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.privacy-closing',
          start: 'top 90%',
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const promises = [
    {
      titleKey: 'p1Title',
      descKey: 'p1Desc',
      Icon: Lock,
    },
    {
      titleKey: 'p2Title',
      descKey: 'p2Desc',
      Icon: Home,
    },
    {
      titleKey: 'p3Title',
      descKey: 'p3Desc',
      Icon: Key,
    },
    {
      titleKey: 'p4Title',
      descKey: 'p4Desc',
      Icon: Hand,
    },
  ];

  return (
    <section
      id="privacy"
      ref={sectionRef}
      className="relative py-[15vh] md:py-[20vh] px-[5vw]"
      style={{ backgroundColor: 'var(--void)' }}
    >
      <div className="max-w-[1100px] mx-auto">
        {/* Title */}
        <div className="privacy-title text-center mb-16">
          <h2
            className="font-display font-light"
            style={{
              fontSize: 'clamp(36px, 5vw, 64px)',
              color: 'var(--bone)',
              lineHeight: 1.0,
            }}
          >
            {t(translations.privacy.title)}
          </h2>
        </div>

        {/* Promises */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {promises.map((promise, i) => (
            <div
              key={i}
              className="privacy-promise flex flex-col items-center text-center"
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mb-5"
                style={{
                  background: 'rgba(240,162,2,0.08)',
                  border: '1px solid rgba(240,162,2,0.2)',
                }}
              >
                <promise.Icon size={24} style={{ color: 'var(--amber-core)' }} />
              </div>
              <p
                className="text-[15px] font-medium leading-[1.6] mb-2"
                style={{ color: 'var(--bone)' }}
              >
                {t(translations.privacy[promise.titleKey as keyof typeof translations.privacy])}
              </p>
              <p
                className="text-[14px] font-light leading-[1.6]"
                style={{ color: 'rgba(227,213,202,0.65)' }}
              >
                {t(translations.privacy[promise.descKey as keyof typeof translations.privacy])}
              </p>
            </div>
          ))}
        </div>

        {/* Closing */}
        <p
          className="privacy-closing text-center text-[17px] font-light leading-[1.8] max-w-[700px] mx-auto"
          style={{ color: 'rgba(227,213,202,0.55)' }}
        >
          {t(translations.privacy.closing)}
        </p>
      </div>
    </section>
  );
}
