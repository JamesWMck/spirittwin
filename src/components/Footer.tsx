import { useLanguage, translations } from '@/hooks/useLanguage';

const languages = [
  { code: 'en' as const, label: 'EN' },
  { code: 'zh-CN' as const, label: '\u7B80' },
  { code: 'zh-HK' as const, label: '\u7E41' },
];

const footerLinks = [
  { key: 'privacy', href: '#' },
  { key: 'terms', href: '#' },
  { key: 'contact', href: '#' },
];

export default function Footer() {
  const { lang, setLang, t } = useLanguage();

  return (
    <footer
      className="w-full px-[5vw] py-12 md:py-16"
      style={{
        backgroundColor: 'var(--void)',
        borderTop: '1px solid var(--glass-border)',
      }}
    >
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
        {/* Left: Logo */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-2">
            <span className="font-display text-[24px] font-light" style={{ color: 'var(--bone)' }}>
              {t(translations.brand.name)}
            </span>
          </div>
          <span className="text-[14px] font-light" style={{ color: 'var(--amber-muted)' }}>
            {t(translations.footer.tagline)}
          </span>
          <span className="text-[12px] font-light mt-2" style={{ color: 'rgba(227,213,202,0.4)' }}>
            {t(translations.footer.copyright)}
          </span>
        </div>

        {/* Center: Links */}
        <div className="flex items-center gap-6">
          {footerLinks.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className="text-[14px] font-light transition-colors duration-300 hover:text-[var(--amber-core)]"
              style={{ color: 'rgba(227,213,202,0.6)' }}
            >
              {t(translations.footer[link.key as 'privacy' | 'terms' | 'contact'])}
            </a>
          ))}
        </div>

        {/* Right: Language toggle + Email */}
        <div className="flex flex-col items-center md:items-end gap-3">
          <div
            className="flex items-center rounded-sm overflow-hidden"
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
          <a
            href="mailto:hello@myspirittwin.ai"
            className="text-[14px] font-light transition-colors duration-300 hover:text-[var(--amber-core)]"
            style={{ color: 'var(--amber-muted)' }}
          >
            {t(translations.footer.email)}
          </a>
        </div>
      </div>
    </footer>
  );
}
