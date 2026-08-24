import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage, translations } from '@/hooks/useLanguage';
gsap.registerPlugin(ScrollTrigger);
export default function WaitlistSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);

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

  const autoReplyMessage = `Thank you for joining the SpiritTwin Waitlist.

Our products and services are highly exclusive and memberships are by invitation only.

We will contact you within 14 days to discuss SpiritTwin's membership requirements, onboarding process and product launch timeline.

If you have any specific questions or requests, please contact us at contact@myspirittwin.ai.`;

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
          <form
            action="https://formsubmit.co/contact@myspirittwin.ai"
            method="POST"
            className="flex flex-col gap-6"
          >
            {/* FormSubmit configuration */}
            <input type="hidden" name="_subject" value="New SpiritTwin Waitlist Signup" />
            <input type="hidden" name="_next" value="https://myspirittwin.ai/thanks" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_autoresponse" value={autoReplyMessage} />
            {/* Honeypot spam protection */}
            <input type="text" name="_honey" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

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
            <button
              type="submit"
              className="waitlist-field w-full mt-4 text-[14px] font-bold uppercase tracking-[0.08em] py-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-glow active:scale-[0.98] cursor-pointer border-none"
              style={{
                backgroundColor: 'var(--amber-core)',
                color: 'var(--void)',
                borderRadius: '2px',
              }}
            >
              {t(translations.waitlist.submitBtn)}
            </button>
            <p
              className="text-center text-[13px] font-light"
              style={{ color: 'rgba(227,213,202,0.5)' }}
            >
              {t(translations.waitlist.note)}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
