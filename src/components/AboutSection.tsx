
import { CheckCircle } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

const AboutSection = () => {
  const [aboutImageLoaded, setAboutImageLoaded] = useState(false);
  const [aboutImageError, setAboutImageError] = useState(false);
  
  // New about image path - using one of the new anime-style character images
  const aboutImagePath = "/roshan-uploads/158e22be-0a56-48ea-97f4-675bff34433f.png";
  
  // Function to fix image paths if needed
  const getFixedImagePath = (path: string) => {
    if (!path) return '';
    
    // If path starts with "public/" we need to remove that part
    if (path.startsWith('public/')) {
      return path.substring(7);
    }
    
    // Handle roshan-uploads paths
    if (path.includes('roshan-uploads') && !path.startsWith('/')) {
      return `/${path}`;
    }
    
    return path;
  };

  const fixedAboutImagePath = getFixedImagePath(aboutImagePath);
  
  useEffect(() => {
    // Preload the about image
    console.log("Attempting to load about image:", fixedAboutImagePath);
    const img = new Image();
    img.src = fixedAboutImagePath;
    
    img.onload = () => {
      console.log("About image loaded successfully");
      setAboutImageLoaded(true);
    };
    
    img.onerror = (e) => {
      console.error("Failed to load about image:", e);
      setAboutImageError(true);
      setAboutImageLoaded(true); // Consider it "loaded" even though it's an error
    };
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [fixedAboutImagePath]);
  
  const skills = [
    "Web Development", "Mobile Applications", "UI/UX Design",
    "Branding Identity", "Graphic Design", "3D Modeling",
    "Game Development", "Illustration", "Motion Graphics"
  ];
  
  return (
    <section id="about" className="section bg-card">
      <div className="container mx-auto px-4">
        <ScrollReveal animation="fade-in">
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">About Me</h2>
            <div className="mt-3 h-1 w-20 bg-primary rounded-full"></div>
          </div>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal animation="fade-in-left">
            <div className="relative">
              <div className="aspect-[4/5] bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-lg overflow-hidden">
                {!aboutImageLoaded && (
                  <div className="absolute inset-0 bg-secondary/20 animate-pulse flex items-center justify-center">
                    <span className="text-sm text-muted-foreground">Loading about image...</span>
                  </div>
                )}
                {aboutImageError ? (
                  <div className="absolute inset-0 bg-secondary/10 flex items-center justify-center">
                    <span className="text-muted-foreground">Image not available</span>
                  </div>
                ) : (
                  <img
                    src={fixedAboutImagePath}
                    alt="About Me"
                    className="w-full h-full object-cover"
                    onLoad={() => setAboutImageLoaded(true)}
                    onError={(e) => {
                      console.error("Failed to load about image", e);
                      setAboutImageError(true);
                      setAboutImageLoaded(true);
                    }}
                  />
                )}
              </div>
              
              {/* Experience badge */}
              <div className="absolute -bottom-6 -right-6 p-6 bg-primary text-primary-foreground rounded-lg shadow-lg">
                <div className="text-lg font-bold">8+</div>
                <div className="text-sm">Years Experience</div>
              </div>
            </div>
          </ScrollReveal>
          
          <div className="space-y-8">
            <ScrollReveal animation="fade-in-right">
              <h3 className="text-2xl font-semibold">A creative developer with a passion for design</h3>
              <p className="text-muted-foreground mt-4">
                I am a versatile creative professional with over 8 years of experience in digital design and development. 
                My work spans across multiple disciplines including web development, mobile applications, UI/UX design, 
                branding, and digital illustrations.
              </p>
              <p className="text-muted-foreground mt-4">
                With a keen eye for detail and a passion for creating intuitive, engaging user experiences, 
                I've collaborated with startups, established businesses, and creative agencies worldwide. 
                My approach combines technical expertise with creative problem-solving to deliver 
                solutions that not only look beautiful but also perform exceptionally.
              </p>
            </ScrollReveal>
            
            <ScrollReveal animation="fade-in-right" delay={200}>
              <h4 className="text-xl font-medium">My Skills</h4>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {skills.map((skill, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle size={16} className="text-primary mr-2" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
            
            <ScrollReveal animation="fade-in-right" delay={300}>
              <div className="pt-4">
                <h4 className="text-xl font-medium mb-4">Software & Tools</h4>
                <div className="flex flex-wrap gap-3">
                  {["Figma", "Adobe CC", "VS Code", "React", "TypeScript", "Tailwind CSS", "Unity", "Blender"].map((tool, i) => (
                    <div 
                      key={i} 
                      className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm"
                    >
                      {tool}
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
