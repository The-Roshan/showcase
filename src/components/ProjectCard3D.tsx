import { useRef, useState, useEffect } from 'react';
import { Project } from '@/data/projects';
import EnhancedScrollReveal from './EnhancedScrollReveal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Code, ExternalLink, ImageIcon } from 'lucide-react';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import { useIsMobile } from '@/hooks/use-mobile';

interface ProjectCard3DProps {
  project: Project;
  index: number;
}

const ProjectCard3D = ({ project, index }: ProjectCard3DProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const isMobile = useIsMobile();

  const delay = (index % 10) * 100;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const rotateY = ((mouseX - centerX) / (rect.width / 2)) * 10;
    const rotateX = ((centerY - mouseY) / (rect.height / 2)) * 10;
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => {
    setIsHovering(false);
    setRotation({ x: 0, y: 0 });
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  const getFixedImagePath = (path: string) => {
    if (!path) return '';
    if (path.startsWith('public/')) return path.substring(7);
    if (path.includes('roshan-uploads') && !path.startsWith('/')) return `/${path}`;
    return path;
  };

  useEffect(() => {
    const img = new Image();
    const imagePath = getFixedImagePath(project.image);
    img.onload = handleImageLoad;
    img.onerror = handleImageError;
    img.src = imagePath;
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [project.id, project.image]);

  const imageSrc = getFixedImagePath(project.image);

  return (
    <EnhancedScrollReveal
      animation="fade-in"
      delay={delay}
      duration={800}
      className="h-full"
    >
      <div
        ref={cardRef}
        className="project-card h-full flex flex-col transform-gpu"
        style={{
          transform: isHovering && !isMobile
            ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1.02, 1.02, 1.02)`
            : 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)',
          transition: 'transform 0.2s ease-out',
        }}
        onMouseMove={!isMobile ? handleMouseMove : undefined}
        onMouseEnter={!isMobile ? handleMouseEnter : undefined}
        onMouseLeave={!isMobile ? handleMouseLeave : undefined}
      >
        <div className="overflow-hidden aspect-video relative">
          <div
            className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-primary/0 z-10 opacity-0 transition-opacity duration-300"
            style={{ opacity: isHovering && !isMobile ? 0.6 : 0 }}
          />

          {!imageLoaded && (
            <div className="absolute inset-0 bg-secondary/20 animate-pulse flex items-center justify-center">
              <span className="text-sm text-muted-foreground">Loading image...</span>
            </div>
          )}

          {imageError ? (
            <div className="absolute inset-0 bg-secondary/10 flex flex-col items-center justify-center">
              <ImageIcon size={32} className="text-muted-foreground mb-2" />
              <span className="text-sm text-muted-foreground">Image not available</span>
            </div>
          ) : (
            <img
              src={imageSrc}
              alt={project.title}
              className="project-image w-full h-full object-cover"
              style={{
                transform: isHovering && !isMobile ? 'scale(1.08)' : 'scale(1)',
                transition: 'transform 0.7s ease-out',
              }}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          )}

          <div
            className={`absolute bottom-2 right-2 p-3 flex gap-2 transition-all duration-300 z-20 ${isMobile ? 'opacity-100' : ''}`}
            style={{ opacity: isMobile ? 1 : isHovering ? 1 : 0 }}
          >
            {isMobile ? (
              <>
                <a href="https://www.google.com/" target="_blank" rel="noopener noreferrer">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="rounded-full w-10 h-10 p-0 shadow-lg bg-background/80 backdrop-blur-sm"
                    aria-label="View source code"
                  >
                    <Code size={16} />
                  </Button>
                </a>
                <a href="https://www.google.com/" target="_blank" rel="noopener noreferrer">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="rounded-full w-10 h-10 p-0 shadow-lg bg-background/80 backdrop-blur-sm"
                    aria-label="View live project"
                  >
                    <ExternalLink size={16} />
                  </Button>
                </a>
              </>
            ) : (
              <>
                <HoverCard open={false}>
                  <HoverCardTrigger asChild>
                    <a href="https://www.google.com/" target="_blank" rel="noopener noreferrer">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="rounded-full w-10 h-10 p-0"
                        aria-label="View source code"
                      >
                        <Code size={16} />
                      </Button>
                    </a>
                  </HoverCardTrigger>
                  <HoverCardContent side="top">
                    View source code
                  </HoverCardContent>
                </HoverCard>
                <HoverCard open={false}>
                  <HoverCardTrigger asChild>
                    <a href="https://www.google.com/" target="_blank" rel="noopener noreferrer">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="rounded-full w-10 h-10 p-0"
                        aria-label="View live project"
                      >
                        <ExternalLink size={16} />
                      </Button>
                    </a>
                  </HoverCardTrigger>
                  <HoverCardContent side="top">
                    View live project
                  </HoverCardContent>
                </HoverCard>
              </>
            )}
          </div>
        </div>

        <div className="p-5 flex-grow flex flex-col bg-gradient-to-b from-card to-card/95">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-medium line-clamp-1">{project.title}</h3>
            {project.featured && (
              <Badge variant="default" className="bg-primary text-xs animate-pulse">Featured</Badge>
            )}
          </div>
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2 flex-grow">
            {project.description}
          </p>
          <div className="mt-auto">
            <div className="flex flex-wrap items-center mb-2 gap-2">
              <Badge variant="outline" className="bg-secondary/30 text-foreground/80">{project.category}</Badge>
              <Badge variant="secondary">{project.purpose}</Badge>
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {project.tags.map((tag, i) => (
                <Badge key={i} variant="outline" className="text-xs bg-muted/30">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </EnhancedScrollReveal>
  );
};

export default ProjectCard3D;
