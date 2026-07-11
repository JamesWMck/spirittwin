import { useState, useEffect, useCallback } from 'react';
import { useLanguage, translations } from '@/hooks/useLanguage';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { key: 'howItWorks', href: '#journey' },
  { key: 'demo', href: '#demo' },
  { key: 'pricing', href: '#products' },
  { key: 'trust', href: '#privacy' },
  { key: 'faq', href: '#faq' },
] as const;

const languages = [
  { code: 'en' as const, label: 'EN' },
  { code: 'zh-CN' as const, label: '\u7B80' },
  { code: 'zh-HK' as const, label: '\u7E41' },
];

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = useCallback((href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const scrollToWaitlist = useCallback(() => {
    setMobileOpen(false);
    const el = document.querySelector('#waitlist');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
          backgroundColor: scrolled ? 'rgba(10,9,8,0.7)' : 'transparent',
        }}
      >
        <nav className="mx-auto flex items-center justify-between px-[5vw] py-4 max-w-[1400px]">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span
              className="font-display text-[20px] font-light tracking-tight"
              style={{ color: 'var(--bone)' }}
            >
              {t(translations.brand.name)}
            </span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.key}
                onClick={() => scrollTo(link.href)}
                className="text-[14px] font-medium uppercase tracking-[0.05em] transition-colors duration-300 hover:text-[var(--amber-core)] bg-transparent border-none cursor-pointer"
                style={{ color: 'rgba(227,213,202,0.7)' }}
              >
                {t(translations.nav[link.key])}
              </button>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Language toggle - desktop */}
            <div
              className="hidden md:flex items-center rounded-sm overflow-hidden"
              style={{ background: 'var(--glass)', border: '1px solid var(--glass-border)' }}
            >
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className="px-3 py-1 text-[12px] font-medium transition-all duration-300 cursor-pointer border-none"
                  style={{
                    backgroundColor: lang === l.code ? 'var(--amber-core)' : 'transparent',
                    color: lang === l.code ? 'var(--void)' : 'var(--bone)',
                  }}
                >
                  {l.label}
                </button>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={scrollToWaitlist}
              className="hidden sm:block text-[14px] font-bold uppercase tracking-[0.08em] px-6 py-2.5 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer border-none"
              style={{
                backgroundColor: 'var(--amber-core)',
                color: 'var(--void)',
                borderRadius: '2px',
              }}
            >
              {t(translations.nav.cta)}
            </button>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden bg-transparent border-none cursor-pointer p-1"
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{ color: 'var(--bone)' }}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            className="lg:hidden absolute top-full left-0 right-0 py-8 px-[6vw]"
            style={{
              backgroundColor: 'rgba(10,9,8,0.95)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <div className="flex flex-col gap-6 items-center">
              {navLinks.map((link) => (
                <button
                  key={link.key}
                  onClick={() => scrollTo(link.href)}
                  className="text-[16px] font-medium uppercase tracking-[0.05em] bg-transparent border-none cursor-pointer"
                  style={{ color: 'var(--bone)' }}
                >
                  {t(translations.nav[link.key])}
                </button>
              ))}
              {/* Mobile language toggle */}
              <div className="flex items-center gap-2 mt-4">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setLang(l.code)}
                    className="px-4 py-2 text-[14px] font-medium rounded-sm transition-all cursor-pointer border-none"
                    style={{
                      backgroundColor: lang === l.code ? 'var(--amber-core)' : 'rgba(227,213,202,0.1)',
                      color: lang === l.code ? 'var(--void)' : 'var(--bone)',
                    }}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
              <button
                onClick={scrollToWaitlist}
                className="mt-4 text-[14px] font-bold uppercase tracking-[0.08em] px-10 py-3 cursor-pointer border-none"
                style={{
                  backgroundColor: 'var(--amber-core)',
                  color: 'var(--void)',
                  borderRadius: '2px',
                }}
              >
                {t(translations.nav.cta)}
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
