import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage, translations } from '@/hooks/useLanguage';

gsap.registerPlugin(ScrollTrigger);

export default function LifeJourney() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from('.journey-image', {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.journey-image',
          start: 'top 75%',
        },
      });

      gsap.utils.toArray<HTMLElement>('.journey-step').forEach((step, i) => {
        gsap.from(step, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: step,
            start: 'top 80%',
          },
          delay: i * 0.15,
        });
      });

      gsap.from('.journey-line', {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.journey-steps',
          start: 'top 75%',
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative py-[15vh] md:py-[20vh] px-[5vw]"
      style={{ backgroundColor: 'var(--void)' }}
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Full-width image */}
        <div className="journey-image mb-20">
          <div className="overflow-hidden" style={{ borderRadius: '4px' }}>
            <img
              src="/life-journey.jpg"
              alt="A life journey \u2014 from youth to wisdom"
              className="w-full h-auto object-cover"
              style={{ maxHeight: '500px', objectPosition: 'center 30%' }}
            />
          </div>
        </div>

        {/* Steps */}
        <div className="journey-steps relative">
          {/* Connecting line (desktop only) */}
          <div
            className="journey-line hidden md:block absolute top-[60px] left-[8%] right-[8%] h-[1px]"
            style={{ background: 'linear-gradient(90deg, var(--amber-muted), var(--amber-core), var(--amber-muted))', opacity: 0.3 }}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 relative">
            {/* Step 1 */}
            <div className="journey-step flex flex-col items-center text-center">
              <span
                className="font-display text-[72px] md:text-[96px] font-light leading-none mb-6"
                style={{ color: 'rgba(227,213,202,0.12)' }}
              >
                01
              </span>
              <h3
                className="font-display text-[24px] md:text-[28px] font-light mb-4"
                style={{ color: 'var(--bone)' }}
              >
                {t(translations.journey.step1Title)}
              </h3>
              <p
                className="text-[15px] font-light leading-[1.8] max-w-[360px]"
                style={{ color: 'rgba(227,213,202,0.65)' }}
              >
                {t(translations.journey.step1Body)}
              </p>
            </div>

            {/* Step 2 */}
            <div className="journey-step flex flex-col items-center text-center">
              <span
                className="font-display text-[72px] md:text-[96px] font-light leading-none mb-6"
                style={{ color: 'var(--amber-core)' }}
              >
                02
              </span>
              <h3
                className="font-display text-[24px] md:text-[28px] font-light mb-4"
                style={{ color: 'var(--bone)' }}
              >
                {t(translations.journey.step2Title)}
              </h3>
              <p
                className="text-[15px] font-light leading-[1.8] max-w-[360px]"
                style={{ color: 'rgba(227,213,202,0.65)' }}
              >
                {t(translations.journey.step2Body)}
              </p>
            </div>

            {/* Step 3 */}
            <div className="journey-step flex flex-col items-center text-center">
              <span
                className="font-display text-[72px] md:text-[96px] font-light leading-none mb-6"
                style={{ color: 'rgba(227,213,202,0.12)' }}
              >
                03
              </span>
              <h3
                className="font-display text-[24px] md:text-[28px] font-light mb-4"
                style={{ color: 'var(--bone)' }}
              >
                {t(translations.journey.step3Title)}
              </h3>
              <p
                className="text-[15px] font-light leading-[1.8] max-w-[360px]"
                style={{ color: 'rgba(227,213,202,0.65)' }}
              >
                {t(translations.journey.step3Body)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
