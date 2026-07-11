import { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage, translations } from '@/hooks/useLanguage';

gsap.registerPlugin(ScrollTrigger);

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

type Phase = 'idle' | 'user' | 'assistant' | 'done';

export default function ItFeelsLikeThis() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>('idle');
  const [displayText, setDisplayText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showPortrait, setShowPortrait] = useState(false);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const messageIndexRef = useRef(0);

  const getConversation = useCallback((): Message[] => [
    { role: 'user', content: t(translations.demo.msg1_user) },
    { role: 'assistant', content: t(translations.demo.msg1_assistant) },
    { role: 'user', content: t(translations.demo.msg2_user) },
    { role: 'assistant', content: t(translations.demo.msg2_assistant) },
    { role: 'user', content: t(translations.demo.msg3_user) },
    { role: 'assistant', content: t(translations.demo.msg3_assistant) },
  ], [t]);

  const clearAllTimeouts = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }, []);

  const typeText = useCallback((text: string, onComplete: () => void) => {
    setIsSpeaking(true);
    let charIndex = 0;
    const speed = 45; // ms per character — human-like

    const typeNext = () => {
      if (charIndex <= text.length) {
        setDisplayText(text.slice(0, charIndex));
        charIndex++;
        const id = setTimeout(typeNext, speed + Math.random() * 20);
        timeoutsRef.current.push(id);
      } else {
        setIsSpeaking(false);
        onComplete();
      }
    };
    typeNext();
  }, []);

  const playConversation = useCallback(() => {
    clearAllTimeouts();
    setPhase('idle');
    setDisplayText('');
    setIsSpeaking(false);
    setShowPortrait(true);
    messageIndexRef.current = 0;

    const conversation = getConversation();

    const processNext = () => {
      if (messageIndexRef.current >= conversation.length) {
        setPhase('done');
        return;
      }

      const msg = conversation[messageIndexRef.current];

      if (msg.role === 'user') {
        // Show user message briefly in italic, then fade to assistant
        setPhase('user');
        setDisplayText(msg.content);
        messageIndexRef.current++;

        const id = setTimeout(() => {
          setDisplayText('');
          setPhase('assistant');

          // Small pause before typing starts
          const id2 = setTimeout(() => {
            const nextMsg = conversation[messageIndexRef.current];
            if (nextMsg && nextMsg.role === 'assistant') {
              typeText(nextMsg.content, () => {
                messageIndexRef.current++;
                // Pause between exchanges
                const id3 = setTimeout(processNext, 2000);
                timeoutsRef.current.push(id3);
              });
            }
          }, 300);
          timeoutsRef.current.push(id2);
        }, 1800);
        timeoutsRef.current.push(id);
      }
    };

    // Start after a brief moment
    const id = setTimeout(processNext, 800);
    timeoutsRef.current.push(id);
  }, [clearAllTimeouts, getConversation, typeText]);

  const handleStart = useCallback(() => {
    playConversation();
  }, [playConversation]);

  const handleReplay = useCallback(() => {
    clearAllTimeouts();
    setDisplayText('');
    setPhase('idle');
    setIsSpeaking(false);
    messageIndexRef.current = 0;

    const id = setTimeout(() => {
      playConversation();
    }, 400);
    timeoutsRef.current.push(id);
  }, [clearAllTimeouts, playConversation]);

  // Cleanup on unmount
  useEffect(() => {
    return () => clearAllTimeouts();
  }, [clearAllTimeouts]);

  // GSAP scroll animations
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from('.demo-title-area', {
        y: 40, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.demo-title-area', start: 'top 80%' },
      });
      gsap.from('.demo-stage', {
        y: 40, opacity: 0, scale: 0.97, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.demo-stage', start: 'top 80%' },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // Generate particle positions (stable across renders)
  const particles = useRef(
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: `${5 + (i * 5.2) % 90}%`,
      size: 2 + (i % 3),
      duration: 7 + (i % 5) * 1.2,
      delay: i * 0.6,
    }))
  ).current;

  return (
    <section
      id="demo"
      ref={sectionRef}
      className="relative py-[15vh] px-[5vw] overflow-hidden"
      style={{ backgroundColor: 'var(--void)' }}
    >
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {particles.map((p) => (
          <span
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: p.left,
              bottom: '-10px',
              width: p.size,
              height: p.size,
              backgroundColor: 'var(--amber-core)',
              opacity: 0,
              animation: `particleFloat ${p.duration}s linear ${p.delay}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="max-w-[700px] mx-auto relative z-10">
        {/* Title area */}
        <div className="demo-title-area text-center mb-12">
          <p
            className="text-[11px] font-medium uppercase tracking-[0.25em] mb-4"
            style={{ color: 'var(--amber-muted)' }}
          >
            {t(translations.demo.label)}
          </p>
          <h2
            className="font-display font-light mb-4"
            style={{
              fontSize: 'clamp(36px, 5vw, 64px)',
              color: 'var(--bone)',
              lineHeight: 1.0,
            }}
          >
            {t(translations.demo.title)}
          </h2>
          <p
            className="text-[17px] font-light"
            style={{ color: 'rgba(227,213,202,0.6)' }}
          >
            {t(translations.demo.subtitle)}
          </p>
        </div>

        {/* Holographic stage */}
        <div
          className="demo-stage relative flex flex-col items-center"
          style={{
            minHeight: '480px',
          }}
        >
          {/* Idle state: CTA button */}
          {phase === 'idle' && !showPortrait && (
            <div className="flex flex-col items-center justify-center py-16 gap-6">
              <p
                className="text-center text-[15px] font-light"
                style={{ color: 'rgba(227,213,202,0.5)' }}
              >
                {t(translations.demo.watchPrompt)}
              </p>
              <button
                onClick={handleStart}
                className="text-[13px] font-bold uppercase tracking-[0.08em] px-8 py-3 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer border-none"
                style={{
                  backgroundColor: 'var(--amber-core)',
                  color: 'var(--void)',
                  borderRadius: '2px',
                }}
              >
                {t(translations.demo.startBtn)}
              </button>
            </div>
          )}

          {/* Holographic portrait */}
          {showPortrait && (
            <div
              className="relative mb-8"
              style={{
                animation: 'portraitEnter 1s ease-out forwards',
              }}
            >
              {/* Glow aura behind portrait */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(240,162,2,0.25) 0%, rgba(240,162,2,0.08) 40%, transparent 70%)',
                  filter: 'blur(20px)',
                  transform: 'scale(1.4)',
                  animation: 'glowPulse 3s ease-in-out infinite',
                }}
              />
              {/* Portrait image */}
              <img
                src="/hologram-portrait.png"
                alt="Holographic presence"
                className="relative w-[240px] h-[320px] md:w-[280px] md:h-[360px] object-cover"
                style={{
                  borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                  border: '1px solid rgba(240,162,2,0.2)',
                  boxShadow: '0 0 40px rgba(240,162,2,0.15), 0 0 80px rgba(240,162,2,0.08), inset 0 0 40px rgba(240,162,2,0.05)',
                  animation: 'holoFloat 4s ease-in-out infinite',
                }}
              />
              {/* Scan line effect */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                  background: 'linear-gradient(transparent 48%, rgba(240,162,2,0.03) 49%, rgba(240,162,2,0.03) 51%, transparent 52%)',
                  backgroundSize: '100% 6px',
                  animation: 'scanLine 8s linear infinite',
                }}
              />
            </div>
          )}

          {/* Spoken text area */}
          {showPortrait && (
            <div
              className="w-full text-center mb-6"
              style={{ minHeight: '80px' }}
            >
              {phase === 'user' && displayText && (
                <p
                  className="font-display text-[clamp(18px,2.5vw,24px)] font-light italic leading-[1.6]"
                  style={{
                    color: 'var(--amber-muted)',
                    opacity: 0.8,
                    animation: 'textFadeIn 0.6s ease-out',
                  }}
                >
                  "{displayText}"
                </p>
              )}
              {phase === 'assistant' && (
                <div className="relative inline-block max-w-[90%]">
                  <p
                    className="font-display text-[clamp(18px,2.5vw,26px)] font-light leading-[1.6]"
                    style={{ color: 'var(--bone)' }}
                  >
                    {displayText}
                    {isSpeaking && (
                      <span
                        className="inline-block ml-1 w-[2px] h-[1em] align-text-bottom"
                        style={{
                          backgroundColor: 'var(--amber-core)',
                          animation: 'cursorBlink 0.7s step-end infinite',
                        }}
                      />
                    )}
                  </p>
                </div>
              )}
              {phase === 'done' && displayText && (
                <p
                  className="font-display text-[clamp(18px,2.5vw,26px)] font-light leading-[1.6]"
                  style={{
                    color: 'var(--bone)',
                    animation: 'textFadeIn 0.8s ease-out',
                  }}
                >
                  {displayText}
                </p>
              )}
            </div>
          )}

          {/* Voice waveform */}
          {showPortrait && (
            <div className="flex items-center justify-center gap-[3px] h-[32px] mb-6">
              {Array.from({ length: 48 }).map((_, i) => (
                <span
                  key={i}
                  className="inline-block w-[2px] rounded-full transition-all duration-150"
                  style={{
                    backgroundColor: 'var(--amber-core)',
                    opacity: isSpeaking ? 0.3 + Math.sin(i * 0.5) * 0.4 : 0.15,
                    height: isSpeaking
                      ? `${20 + Math.sin(i * 0.8 + Date.now() * 0.008) * 60}%`
                      : `${30 + Math.sin(i * 0.4) * 20}%`,
                    animation: isSpeaking
                      ? `waveActive 0.8s ease-in-out ${i * 0.02}s infinite alternate`
                      : `waveIdle 2s ease-in-out ${i * 0.08}s infinite alternate`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Replay button */}
          {phase === 'done' && (
            <div
              className="text-center"
              style={{ animation: 'textFadeIn 0.6s ease-out' }}
            >
              <button
                onClick={handleReplay}
                className="text-[12px] font-medium uppercase tracking-[0.1em] px-6 py-2 transition-all duration-300 cursor-pointer"
                style={{
                  background: 'transparent',
                  color: 'var(--amber-muted)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: '2px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--amber-core)';
                  e.currentTarget.style.color = 'var(--amber-core)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--glass-border)';
                  e.currentTarget.style.color = 'var(--amber-muted)';
                }}
              >
                {t(translations.demo.replayBtn)}
              </button>
            </div>
          )}
        </div>

        {/* Note */}
        <p
          className="text-center text-[15px] font-light mt-8 italic"
          style={{ color: 'rgba(227,213,202,0.5)' }}
        >
          {t(translations.demo.note)}
        </p>
      </div>

      {/* CSS Keyframes */}
      <style>{`
        @keyframes particleFloat {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-100vh) translateX(${Math.random() > 0.5 ? '' : '-'}20px);
            opacity: 0;
          }
        }

        @keyframes portraitEnter {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes holoFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes glowPulse {
          0%, 100% {
            opacity: 0.6;
            transform: scale(1.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
          }
        }

        @keyframes scanLine {
          0% {
            backgroundPosition: '0 0';
          }
          100% {
            backgroundPosition: '0 100%';
          }
        }

        @keyframes textFadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes cursorBlink {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }

        @keyframes waveActive {
          from {
            transform: scaleY(0.3);
          }
          to {
            transform: scaleY(1);
          }
        }

        @keyframes waveIdle {
          from {
            transform: scaleY(0.5);
          }
          to {
            transform: scaleY(0.8);
          }
        }
      `}</style>
    </section>
  );
}
