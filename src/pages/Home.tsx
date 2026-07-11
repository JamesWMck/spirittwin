import { useEffect, lazy, Suspense } from 'react';
import Layout from '@/components/Layout';
import HeroSection from '@/sections/HeroSection';
import AStoryWorthKeeping from '@/sections/AStoryWorthKeeping';
import LifeJourney from '@/sections/LifeJourney';
import ItFeelsLikeThis from '@/sections/ItFeelsLikeThis';
import YourStoryIsYours from '@/sections/YourStoryIsYours';
import LoveContinues from '@/sections/LoveContinues';
import ProductsSection from '@/sections/ProductsSection';
import FAQSection from '@/sections/FAQSection';
import WaitlistSection from '@/sections/WaitlistSection';

const VeilEffect = lazy(() => import('@/sections/VeilEffect'));

export default function Home() {
  // Force scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  // Smooth scroll with Lenis
  useEffect(() => {
    let lenis: any;
    const initLenis = async () => {
      const Lenis = (await import('@studio-freight/lenis')).default;
      lenis = new Lenis({
        lerp: 0.08,
        smoothWheel: true,
      });
      const raf = (time: number) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
    };
    initLenis();
    return () => {
      if (lenis) lenis.destroy();
    };
  }, []);

  return (
    <Layout>
      {/* Three.js particle background */}
      <Suspense fallback={null}>
        <VeilEffect />
      </Suspense>

      {/* All sections — warm narrative flow */}
      <div className="relative z-[2]">
        <HeroSection />
        <AStoryWorthKeeping />
        <LifeJourney />
        <ItFeelsLikeThis />
        <YourStoryIsYours />
        <LoveContinues />
        <ProductsSection />
        <FAQSection />
        <WaitlistSection />
      </div>
    </Layout>
  );
}
