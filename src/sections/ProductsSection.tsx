import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, MessageCircle, BookOpen, Clock, Key, Phone, Video, Sparkles } from 'lucide-react';
import { useLanguage, translations } from '@/hooks/useLanguage';

gsap.registerPlugin(ScrollTrigger);

export default function ProductsSection() {
  const { t, lang } = useLanguage();
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

      // Three ways sub-section
      gsap.from('.ways-subtitle', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.ways-subtitle',
          start: 'top 85%',
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
      nameKey: 'companion' as const,
      cnKey: 'companionCN' as const,
      pricingKey: 'companionPricing' as const,
      descKey: 'companionDesc' as const,
    },
    {
      icon: MessageCircle,
      nameKey: 'legacy' as const,
      cnKey: 'legacyCN' as const,
      pricingKey: 'legacyPricing' as const,
      descKey: 'legacyDesc' as const,
    },
    {
      icon: BookOpen,
      nameKey: 'royalties' as const,
      cnKey: 'royaltiesCN' as const,
      pricingKey: 'royaltiesPricing' as const,
      descKey: 'royaltiesDesc' as const,
    },
    {
      icon: Clock,
      nameKey: 'onDemand' as const,
      cnKey: 'onDemandCN' as const,
      pricingKey: 'onDemandPricing' as const,
      descKey: 'onDemandDesc' as const,
    },
  ];

  const isChinese = lang === 'zh-CN' || lang === 'zh-HK';

  const ways = [
    {
      icon: Phone,
      headlineKey: 'voiceHeadline' as const,
      descKey: 'voiceDesc' as const,
    },
    {
      icon: Video,
      headlineKey: 'videoHeadline' as const,
      descKey: 'videoDesc' as const,
    },
    {
      icon: Sparkles,
      headlineKey: 'holoHeadline' as const,
      descKey: 'holoDesc' as const,
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

                {/* Product Name (EN) — always shown */}
                <h3
                  className="font-display text-[22px] md:text-[26px] font-light mb-1"
                  style={{ color: 'var(--bone)' }}
                >
                  {t(translations.products[product.nameKey])}
                </h3>

                {/* Product Name (CN) — only for Chinese languages */}
                {isChinese && (
                  <p
                    className="text-[14px] font-light mb-4"
                    style={{ color: 'var(--amber-muted)' }}
                  >
                    {t(translations.products[product.cnKey])}
                  </p>
                )}
                {!isChinese && <div className="mb-4" />}

                {/* Pricing */}
                <p
                  className="text-[18px] md:text-[20px] font-medium mb-4"
                  style={{ color: 'var(--amber-core)' }}
                >
                  {t(translations.products[product.pricingKey])}
                </p>

                {/* Description */}
                <p
                  className="text-[14px] md:text-[15px] font-light leading-[1.7] flex-grow"
                  style={{ color: 'rgba(227,213,202,0.65)' }}
                >
                  {t(translations.products[product.descKey])}
                </p>
              </div>
            );
          })}
        </div>

        {/* ===== Merged: Three Ways to Stay Present ===== */}
        <div className="mt-24 md:mt-32">
          {/* Subtitle */}
          <p
            className="ways-subtitle text-center text-[14px] md:text-[16px] font-light mb-12 uppercase tracking-[0.1em]"
            style={{ color: 'var(--amber-muted)' }}
          >
            {t(translations.ways.title)}
          </p>

          {/* 3 Delivery Method Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {ways.map((way, i) => {
              const Icon = way.icon;
              return (
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

                  {/* Headline */}
                  <h3
                    className="font-display text-[22px] md:text-[26px] font-light mb-4"
                    style={{ color: 'var(--bone)' }}
                  >
                    {t(translations.ways[way.headlineKey])}
                  </h3>

                  {/* Description */}
                  <p
                    className="text-[14px] md:text-[15px] font-light leading-[1.7] flex-grow"
                    style={{ color: 'rgba(227,213,202,0.65)' }}
                  >
                    {t(translations.ways[way.descKey])}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Storage & Access Info */}
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
