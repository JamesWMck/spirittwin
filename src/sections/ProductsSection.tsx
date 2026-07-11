import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, MessageCircle, BookOpen, Clock } from 'lucide-react';
import { useLanguage, translations } from '@/hooks/useLanguage';

gsap.registerPlugin(ScrollTrigger);

export default function ProductsSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from('.products-title', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.products-title',
          start: 'top 80%',
        },
      });

      gsap.from('.products-subtitle', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.products-subtitle',
          start: 'top 85%',
        },
        delay: 0.2,
      });

      gsap.utils.toArray<HTMLElement>('.product-card').forEach((card, i) => {
        gsap.from(card, {
          y: 50,
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

      gsap.from('.products-footer', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.products-footer',
          start: 'top 90%',
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const products = [
    {
      icon: Heart,
      nameKey: 'companion',
      cnKey: 'companionCN',
      pricingKey: 'companionPricing',
      descKey: 'companionDesc',
    },
    {
      icon: MessageCircle,
      nameKey: 'legacy',
      cnKey: 'legacyCN',
      pricingKey: 'legacyPricing',
      descKey: 'legacyDesc',
    },
    {
      icon: BookOpen,
      nameKey: 'royalties',
      cnKey: 'royaltiesCN',
      pricingKey: 'royaltiesPricing',
      descKey: 'royaltiesDesc',
    },
    {
      icon: Clock,
      nameKey: 'onDemand',
      cnKey: 'onDemandCN',
      pricingKey: 'onDemandPricing',
      descKey: 'onDemandDesc',
    },
  ];

  return (
    <section
      id="products"
      ref={sectionRef}
      className="relative py-[15vh] md:py-[20vh] px-[5vw]"
      style={{ backgroundColor: 'var(--void)' }}
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Title */}
        <div className="products-title text-center mb-4">
          <h2
            className="font-display font-light"
            style={{
              fontSize: 'clamp(36px, 5vw, 64px)',
              color: 'var(--bone)',
              lineHeight: 1.0,
            }}
          >
            {t(translations.products.title)}
          </h2>
        </div>

        {/* Subtitle */}
        <p
          className="products-subtitle text-center text-[16px] md:text-[18px] font-light mb-16 max-w-[600px] mx-auto"
          style={{ color: 'rgba(227,213,202,0.55)' }}
        >
          {t(translations.products.subtitle)}
        </p>

        {/* Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {products.map((product, i) => {
            const Icon = product.icon;
            return (
              <div
                key={i}
                className="product-card flex flex-col p-8 md:p-10 transition-all duration-400 hover:-translate-y-1"
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
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-6"
                  style={{
                    background: 'rgba(240,162,2,0.08)',
                    border: '1px solid rgba(240,162,2,0.2)',
                  }}
                >
                  <Icon size={22} style={{ color: 'var(--amber-core)' }} />
                </div>

                {/* Product Name (EN) */}
                <h3
                  className="font-display text-[22px] md:text-[26px] font-light mb-1"
                  style={{ color: 'var(--bone)' }}
                >
                  {t(translations.products[product.nameKey as keyof typeof translations.products])}
                </h3>

                {/* Product Name (CN) */}
                <p
                  className="text-[14px] font-light mb-4"
                  style={{ color: 'var(--amber-muted)' }}
                >
                  {t(translations.products[product.cnKey as keyof typeof translations.products])}
                </p>

                {/* Pricing */}
                <p
                  className="text-[18px] md:text-[20px] font-medium mb-4"
                  style={{ color: 'var(--amber-core)' }}
                >
                  {t(translations.products[product.pricingKey as keyof typeof translations.products])}
                </p>

                {/* Description */}
                <p
                  className="text-[14px] md:text-[15px] font-light leading-[1.7] flex-grow"
                  style={{ color: 'rgba(227,213,202,0.65)' }}
                >
                  {t(translations.products[product.descKey as keyof typeof translations.products])}
                </p>
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <p
          className="products-footer text-center text-[14px] font-light mt-12"
          style={{ color: 'rgba(227,213,202,0.45)' }}
        >
          {t(translations.products.footer)}
        </p>
      </div>
    </section>
  );
}
