import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage, translations } from '@/hooks/useLanguage';
gsap.registerPlugin(ScrollTrigger);
export default function WaitlistSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      gsap.from('.waitlist-title', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.waitlist-title',
          start: 'top 80%',
        },
      });
      gsap.from('.waitlist-panel', {
        y: 40,
        opacity: 0,
        scale: 0.97,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.waitlist-panel',
          start: 'top 80%',
        },
      });
      gsap.utils.toArray<HTMLElement>('.waitlist-field').forEach((field, i) => {
        gsap.from(field, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.waitlist-panel',
            start: 'top 70%',
          },
          delay: i * 0.06,
        });
      });
    }, section);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = (formData.get('name') as string) || '';
    const email = (formData.get('email') as string) || '';
    const phone = (formData.get('phone') as string) || '';
    const tier = (formData.get('tier') as string) || '';

    setLoading(true);
    setError(false);

    try {
      const response = await fetch('https://formsubmit.co/ajax/contact@myspirittwin.ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          tier,
          _subject: `New Waitlist Signup: ${name || email}`,
          _template: 'table',
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        const data = await response.json().catch(() => ({}));
        console.error('Form submission failed:', data);
        setError(true);
      }
    } catch (err) {
      console.error('Form submission error:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    background: 'transparent',
    color: 'var(--bone)',
    padding: '12px 0',
    width: '100%',
    fontSize: '15px',
    fontWeight: 300,
    outline: 'none',
    border: 'none',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'rgba(227,213,202,0.3)',
    borderRadius: 0,
  };
  return (
    <section
      id="waitlist"
      ref={sectionRef}
      className="relative py-[15vh] md:py-[15vh] px-[5vw]"
      style={{
        background: 'linear-gradient(180deg, #0A0908 0%, #0f0d0a 50%, #0A0908 100%)',
      }}
    >
      <div className="max-w-[700px] mx-auto">
        {/* Title */}
        <div className="waitlist-title text-center mb-10">
          <h2
            className="font-display font-light mb-4"
            style={{
              fontSize: 'clamp(32px, 4vw, 56px)',
              color: 'var(--bone)',
              lineHeight: 1.0,
            }}
          >
            {t(translations.waitlist.titleAlt)}
          </h2>
          <p
            className="text-[17px] font-light"
            style={{ color: 'rgba(227,213,202,0.6)' }}
          >
            {t(translations.waitlist.subtitle)}
          </p>
        </div>
        {/* Form Panel */}
        <div
          className="waitlist-panel"
          style={{
            background: 'var(--glass)',
            border: '1px solid var(--glass-border)',
            backdropFilter: 'blur(10px)',
            borderRadius: '8px',
            padding: 'clamp(32px, 5vw, 56px)',
          }}
        >
          {submitted ? (
            <div className="text-center py-12">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{
                  background: 'rgba(240,162,2,0.1)',
                  border: '1px solid rgba(240,162,2,0.3)',
                }}
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--amber-core)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3
                className="font-display text-[24px] font-light mb-2"
                style={{ color: 'var(--bone)' }}
              >
                {t(translations.waitlist.successTitle)}
              </h3>
              <p
                className="text-[16px] font-light"
                style={{ color: 'rgba(227,213,202,0.7)' }}
              >
                {t(translations.waitlist.successBody)}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="waitlist-field">
                <label
                  className="block text-[12px] font-medium uppercase tracking-[0.1em] mb-2"
                  style={{ color: 'var(--amber-muted)' }}
                >
                  {t(translations.waitlist.nameLabel)}
                </label>
                <input
                  name="name"
                  type="text"
                  placeholder={t(translations.waitlist.nameLabel)}
                  required
                  style={inputStyle}
                />
              </div>
              <div className="waitlist-field">
                <label
                  className="block text-[12px] font-medium uppercase tracking-[0.1em] mb-2"
                  style={{ color: 'var(--amber-muted)' }}
                >
                  {t(translations.waitlist.emailLabel)}
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                  style={inputStyle}
                />
              </div>
              <div className="waitlist-field">
                <label
                  className="block text-[12px] font-medium uppercase tracking-[0.1em] mb-2"
                  style={{ color: 'var(--amber-muted)' }}
                >
                  {t(translations.waitlist.phoneLabel)} ({t(translations.waitlist.phoneOptional)})
                </label>
                <input
                  name="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  style={inputStyle}
                />
              </div>
              <div className="waitlist-field">
                <label
                  className="block text-[12px] font-medium uppercase tracking-[0.1em] mb-2"
                  style={{ color: 'var(--amber-muted)' }}
                >
                  {t(translations.waitlist.tierLabel)}
                </label>
                <select
                  name="tier"
                  style={{
                    ...inputStyle,
                    background: 'var(--void)',
                    color: 'var(--bone)',
                    padding: '12px',
                    border: '1px solid rgba(227,213,202,0.3)',
                    borderRadius: '4px',
                  }}
                >
                  <option value="">{t(translations.waitlist.tierUndecided)}</option>
                  <option value="voice">{t(translations.waitlist.tierVoice)}</option>
                  <option value="video">{t(translations.waitlist.tierVideo)}</option>
                  <option value="holo">{t(translations.waitlist.tierHolo)}</option>
                </select>
              </div>

              {error && (
                <p className="text-center text-[13px]" style={{ color: '#ef4444' }}>
                  Something went wrong. Please try again or email contact@myspirittwin.ai directly.
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="waitlist-field w-full mt-4 text-[14px] font-bold uppercase tracking-[0.08em] py-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-glow active:scale-[0.98] cursor-pointer border-none"
                style={{
                  backgroundColor: 'var(--amber-core)',
                  color: 'var(--void)',
                  borderRadius: '2px',
                  opacity: loading ? 0.6 : 1,
                }}
              >
                {loading ? 'Submitting...' : t(translations.waitlist.submitBtn)}
              </button>
              <p
                className="text-center text-[13px] font-light"
                style={{ color: 'rgba(227,213,202,0.5)' }}
              >
                {t(translations.waitlist.note)}
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
