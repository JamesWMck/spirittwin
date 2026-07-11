import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage, translations } from '@/hooks/useLanguage';

gsap.registerPlugin(ScrollTrigger);

export default function AStoryWorthKeeping() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from('.story-image', {
        x: -40,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
        },
      });

      gsap.from('.story-text', {
        x: 40,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
        },
      });

      gsap.from('.story-closing', {
        y: 20,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.story-closing',
          start: 'top 85%',
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="story"
      ref={sectionRef}
      className="relative py-[15vh] md:py-[20vh] px-[5vw]"
      style={{ backgroundColor: 'var(--void)' }}
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Image */}
          <div className="story-image">
            <div
              className="overflow-hidden"
              style={{ borderRadius: '4px' }}
            >
              <img
                src="/grandfather-wisdom.jpg"
                alt="Grandfather sharing wisdom with family"
                className="w-full h-auto object-cover transition-transform duration-700 hover:scale-[1.02]"
                style={{ maxHeight: '600px' }}
              />
            </div>
          </div>

          {/* Text */}
          <div className="story-text">
            <p
              className="text-[12px] font-medium uppercase tracking-[0.15em] mb-6"
              style={{ color: 'var(--amber-muted)' }}
            >
              {t(translations.story.label)}
            </p>

            <blockquote
              className="font-display italic text-[24px] md:text-[28px] leading-[1.5] mb-8"
              style={{ color: 'var(--amber-core)' }}
            >
              &ldquo;{t(translations.story.quote)}&rdquo;
            </blockquote>

            <p
              className="text-[17px] font-light leading-[1.8] mb-6"
              style={{ color: 'rgba(227,213,202,0.8)' }}
            >
              {t(translations.story.body)}
            </p>

            <p
              className="story-closing font-display text-[28px] md:text-[36px] font-light italic"
              style={{ color: 'var(--bone)' }}
            >
              {t(translations.story.closing)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
