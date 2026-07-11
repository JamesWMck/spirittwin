import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useLanguage, translations } from '@/hooks/useLanguage';

const questions = [
  'What if you can choose?',
  'When is the end?',
  'What if wisdom never has to die?',
  'What if their character could live on?',
  'What if they could meet their unborn grandchildren?',
  'What if both consciousness and subconscious could be preserved?',
  'What if they could still guide and challenge you?',
];

export default function HeroSection() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [currentQuestion, setCurrentQuestion] = useState(0);

  // Question carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuestion((prev) => (prev + 1) % questions.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Text entrance animations
  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({ delay: 0.3 });

    tl.from('.hero-question', {
      y: 20,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    })
      .from(
        '.hero-title',
        {
          y: 60,
          opacity: 0,
          duration: 1.4,
          ease: 'power3.out',
        },
        '-=0.4'
      )
      .from(
        '.hero-cta',
        {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.5'
      );

    return () => { tl.kill(); };
  }, []);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToStory = () => {
    const el = document.querySelector('#story');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100dvh] flex flex-col justify-center items-center overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <div
        className="absolute inset-0 z-0"
        style={{
          transform: `translate(${mousePos.x}px, ${mousePos.y}px) scale(1.05)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        <img
          src="/hero-bg.png"
          alt=""
          className="w-full h-full object-cover"
          style={{ opacity: 0.5 }}
        />
      </div>

      {/* Dark overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: 'linear-gradient(to bottom, rgba(10,9,8,0.6) 0%, rgba(10,9,8,0.4) 50%, rgba(10,9,8,0.85) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-[5vw] pt-24 pb-12 min-h-[100dvh]">
        {/* Rotating Questions */}
        <div className="hero-question mb-4 md:mb-6 min-h-[36px] md:min-h-[44px] flex items-center justify-center px-4">
          <p
            className="font-display italic transition-all duration-1000 text-center leading-tight"
            style={{
              fontSize: 'clamp(18px, 3.2vw, 28px)',
              color: 'var(--amber-core)',
              opacity: 0.9,
            }}
            key={currentQuestion}
          >
            {questions[currentQuestion]}
          </p>
        </div>

        <h1
          className="hero-title font-display font-light leading-[1.0] tracking-[-0.02em] max-w-[900px]"
          style={{
            fontSize: 'clamp(40px, 10vw, 120px)',
            color: 'var(--bone)',
          }}
        >
          What if the end is optional?
        </h1>

        <div className="hero-cta mt-10">
          <button
            onClick={scrollToStory}
            className="text-[14px] font-bold uppercase tracking-[0.08em] px-10 py-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-glow active:scale-[0.98] cursor-pointer border-none"
            style={{
              backgroundColor: 'var(--amber-core)',
              color: 'var(--void)',
              borderRadius: '2px',
            }}
          >
            {t(translations.hero.cta)}
          </button>
        </div>
      </div>
    </section>
  );
}
