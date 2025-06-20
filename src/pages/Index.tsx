
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import Cursor3D from '@/components/Cursor3D';
import { useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const isMobile = useIsMobile();
  
  // Force cursor to be initialized properly
  useEffect(() => {
    // Skip on mobile devices
    if (isMobile) return;
    
    // A small delay to ensure the cursor is initialized after the DOM is fully loaded
    const timeout = setTimeout(() => {
      const event = new MouseEvent('mousemove', {
        view: window,
        bubbles: true,
        cancelable: true,
        clientX: window.innerWidth / 2,
        clientY: window.innerHeight / 2
      });
      window.dispatchEvent(event);
    }, 100);

    // Hide any roshan badges that might be present
    const hideroshanBadge = () => {
      const badges = document.querySelectorAll('[class*="roshan-badge"], [id*="roshan-badge"]');
      badges.forEach(badge => {
        if (badge instanceof HTMLElement) {
          badge.style.display = 'none';
          badge.style.opacity = '0';
          badge.style.visibility = 'hidden';
        }
      });
    };

    // Run once at start
    hideroshanBadge();
    
    // Also run after a slight delay to catch any dynamically added badges
    setTimeout(hideroshanBadge, 500);
    // Run periodically to catch any new badges
    const badgeInterval = setInterval(hideroshanBadge, 2000);
    
    return () => {
      clearTimeout(timeout);
      clearInterval(badgeInterval);
    };
  }, [isMobile]);
  
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* Background gradient and patterns */}
      <div className="fixed inset-0 z-[-2] bg-grid opacity-30"></div>
      <div className="fixed inset-0 z-[-1]">
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-primary/5 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-[300px] bg-gradient-to-t from-primary/5 to-transparent"></div>
        
        {/* Animated orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full filter blur-[100px] animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full filter blur-[80px] animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-3/4 left-2/3 w-48 h-48 bg-secondary/10 rounded-full filter blur-[60px] animate-float" style={{ animationDelay: '4s' }}></div>
      </div>
      
      {/* Custom cursor (only for desktop) */}
      {!isMobile && <Cursor3D />}
      
      <Header />
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
      
      {/* Mobile-specific bottom navigation (only visible on mobile) */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-background/90 backdrop-blur-md border-t border-border p-2 z-50">
          <div className="container mx-auto flex justify-around">
            <a href="#hero" className="flex flex-col items-center p-2 text-xs">
              <span className="text-primary mb-1">🏠</span>
              <span>Home</span>
            </a>
            <a href="#about" className="flex flex-col items-center p-2 text-xs">
              <span className="text-primary mb-1">👤</span>
              <span>About</span>
            </a>
            <a href="#projects" className="flex flex-col items-center p-2 text-xs">
              <span className="text-primary mb-1">🚀</span>
              <span>Projects</span>
            </a>
            <a href="#contact" className="flex flex-col items-center p-2 text-xs">
              <span className="text-primary mb-1">📧</span>
              <span>Contact</span>
            </a>
          </div>
        </div>
      )}

      {/* Fix the style tag - removed jsx and global attributes which were causing the TypeScript error */}
      <style>
        {`
          [class*="roshan-badge"],
          [id*="roshan-badge"],
          [class*="roshan"],
          [class*="roshan-"] {
            display: none !important;
            opacity: 0 !important;
            visibility: hidden !important;
            pointer-events: none !important;
          }
        `}
      </style>
    </div>
  );
};

export default Index;
