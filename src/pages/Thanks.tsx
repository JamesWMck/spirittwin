import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import gsap from 'gsap';

export default function Thanks() {
  const navigate = useNavigate();

  useEffect(() => {
    // Force scroll to top
    window.scrollTo(0, 0);
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Animate elements in
    gsap.from('.thanks-content', {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      delay: 0.2,
    });
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center px-[5vw]"
      style={{
        background: 'linear-gradient(180deg, #0A0908 0%, #0f0d0a 50%, #0A0908 100%)',
      }}
    >
      <div className="thanks-content text-center max-w-[600px]">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8"
          style={{
            background: 'rgba(240,162,2,0.1)',
            border: '1px solid rgba(240,162,2,0.3)',
          }}
        >
          <svg
            width="36"
            height="36"
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

        <h1
          className="font-display font-light mb-4"
          style={{
            fontSize: 'clamp(32px, 5vw, 52px)',
            color: 'var(--bone)',
            lineHeight: 1.1,
          }}
        >
          Thank You
        </h1>

        <p
          className="text-[17px] font-light mb-10"
          style={{ color: 'rgba(227,213,202,0.6)', lineHeight: 1.7 }}
        >
          Your request to join the SpiritTwin waitlist has been received.
          <br />
          We will be in touch within 14 days.
        </p>

        <button
          onClick={() => navigate('/')}
          className="text-[14px] font-bold uppercase tracking-[0.08em] px-10 py-4 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer border-none"
          style={{
            backgroundColor: 'var(--amber-core)',
            color: 'var(--void)',
            borderRadius: '2px',
          }}
        >
          Return to Website
        </button>
      </div>
    </div>
  );
}
