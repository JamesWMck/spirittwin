import type { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-[100dvh]" style={{ backgroundColor: 'var(--void)' }}>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
