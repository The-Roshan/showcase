
import { ArrowDown, Github, Linkedin, Twitter, Instagram } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const HeroSection = () => {
  const [profileImageLoaded, setProfileImageLoaded] = useState(false);
  const [profileImageError, setProfileImageError] = useState(false);
  
  // Use one of the new anime character images as profile
  const profileImage = "/roshan-uploads/a68b43ed-2d14-421c-afa3-37f2a86a6910.png";
  
  useEffect(() => {
    // Preload the profile image
    const img = new Image();
    img.src = profileImage;
    
    img.onload = () => {
      console.log("Profile image loaded successfully");
      setProfileImageLoaded(true);
    };
    
    img.onerror = (e) => {
      console.error("Failed to load profile image:", e);
      setProfileImageError(true);
      setProfileImageLoaded(true); // Consider it "loaded" even though it's an error
    };
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, []);
  
  return (
    <section id="hero" className="min-h-screen flex items-center relative overflow-hidden pt-20 pb-12">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background -z-10"></div>
      
      {/* Animated dots pattern */}
      <div className="absolute inset-0 -z-10 opacity-20">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-primary/30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              animation: `float ${Math.random() * 10 + 10}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <ScrollReveal animation="fade-in-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Creative <span className="text-primary">Developer</span> & Designer
              </h1>
            </ScrollReveal>
            
            <ScrollReveal animation="fade-in-left" delay={200}>
              <p className="text-lg md:text-xl text-muted-foreground mt-6">
                I craft beautiful digital experiences and innovative solutions. My portfolio showcases over 100 projects spanning web development, mobile apps, UI/UX design, branding and more.
              </p>
            </ScrollReveal>
            
            <ScrollReveal animation="fade-in-left" delay={400}>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button size="lg" className="px-8 py-6">
                  View Projects
                </Button>
                <Button size="lg" variant="outline" className="px-8 py-6">
                  Contact Me
                </Button>
              </div>
            </ScrollReveal>
            
            <ScrollReveal animation="fade-in" delay={600}>
              <div className="mt-8 flex space-x-4">
                <a href="#" className="social-icon">
                  <Github size={20} />
                </a>
                <a href="#" className="social-icon">
                  <Linkedin size={20} />
                </a>
                <a href="#" className="social-icon">
                  <Twitter size={20} />
                </a>
                <a href="#" className="social-icon">
                  <Instagram size={20} />
                </a>
              </div>
            </ScrollReveal>
          </div>
          
          <ScrollReveal animation="fade-in-right" delay={300} className="hidden lg:block">
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full overflow-hidden flex items-center justify-center">
                {!profileImageLoaded && (
                  <div className="absolute inset-0 bg-secondary/20 animate-pulse flex items-center justify-center">
                    <span className="text-sm text-muted-foreground">Loading profile image...</span>
                  </div>
                )}
                {profileImageError ? (
                  <div className="absolute inset-0 bg-secondary/10 flex items-center justify-center">
                    <span className="text-muted-foreground">Image not available</span>
                  </div>
                ) : (
                  <img
                    src={profileImage}
                    alt="Developer Portrait"
                    className="w-full h-full object-cover rounded-full"
                    onLoad={() => setProfileImageLoaded(true)}
                    onError={(e) => {
                      console.error("Failed to load profile image", e);
                      setProfileImageError(true);
                      setProfileImageLoaded(true);
                    }}
                  />
                )}
              </div>
              
              {/* Floating badges */}
              <div className="absolute top-10 -left-10 p-4 bg-card rounded-lg shadow-lg border border-border animate-float">
                <div className="text-sm font-medium">Web Developer</div>
              </div>
              
              <div className="absolute bottom-10 -right-10 p-4 bg-card rounded-lg shadow-lg border border-border animate-float" style={{ animationDelay: '1s' }}>
                <div className="text-sm font-medium">UI/UX Designer</div>
              </div>
              
              <div className="absolute -bottom-5 left-1/3 p-4 bg-card rounded-lg shadow-lg border border-border animate-float" style={{ animationDelay: '2s' }}>
                <div className="text-sm font-medium">Creative Thinker</div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
      
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors"
      >
        <div className="flex flex-col items-center">
          <span className="text-sm mb-2">Scroll Down</span>
          <ArrowDown size={20} className="animate-bounce" />
        </div>
      </a>
    </section>
  );
};

export default HeroSection;
