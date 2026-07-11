import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';
import { useLanguage, translations } from '@/hooks/useLanguage';

gsap.registerPlugin(ScrollTrigger);

export default function FAQSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from('.faq-title', {
        y: 40, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.faq-title', start: 'top 80%' },
      });

      gsap.utils.toArray<HTMLElement>('.faq-item').forEach((item, i) => {
        gsap.from(item, {
          y: 30, opacity: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: item, start: 'top 88%' },
          delay: i * 0.06,
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqItems = translations.faq.items;

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="relative py-[15vh] px-[5vw]"
      style={{ backgroundColor: 'var(--void)' }}
    >
      <div className="max-w-[800px] mx-auto">
        {/* Title */}
        <div className="faq-title text-center mb-16">
          <p
            className="text-[11px] font-medium uppercase tracking-[0.25em] mb-4"
            style={{ color: 'var(--amber-muted)' }}
          >
            {t(translations.faq.label)}
          </p>
          <h2
            className="font-display font-light"
            style={{
              fontSize: 'clamp(36px, 5vw, 64px)',
              color: 'var(--bone)',
              lineHeight: 1.0,
            }}
          >
            {t(translations.faq.title)}
          </h2>
        </div>

        {/* FAQ Items */}
        <div className="flex flex-col gap-3">
          {faqItems.map((item, index) => {
            if (!item) return null;
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="faq-item"
                style={{
                  background: isOpen ? 'rgba(240,162,2,0.04)' : 'var(--glass)',
                  border: '1px solid',
                  borderColor: isOpen ? 'rgba(240,162,2,0.2)' : 'var(--glass-border)',
                  borderRadius: '6px',
                  transition: 'all 0.3s ease',
                }}
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer"
                  style={{ background: 'transparent', border: 'none' }}
                >
                  <span
                    className="text-[15px] md:text-[16px] font-medium pr-4"
                    style={{ color: 'var(--bone)' }}
                  >
                    {t(item.q)}
                  </span>
                  <ChevronDown
                    size={18}
                    style={{
                      color: 'var(--amber-muted)',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease',
                      flexShrink: 0,
                    }}
                  />
                </button>
                <div
                  style={{
                    maxHeight: isOpen ? '500px' : '0',
                    overflow: 'hidden',
                    transition: 'max-height 0.4s ease, opacity 0.3s ease',
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <p
                    className="px-6 pb-5 text-[14px] md:text-[15px] font-light leading-[1.8]"
                    style={{ color: 'rgba(227,213,202,0.65)' }}
                  >
                    {t(item.a)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
