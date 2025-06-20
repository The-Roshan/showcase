
import { useState, useEffect } from 'react';
import { Project } from '@/data/projects';
import ScrollReveal from './ScrollReveal';
import { Badge } from '@/components/ui/badge';
import { ImageIcon } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  // Calculate the delay for the staggered animation
  const delay = (index % 10) * 100;
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Log for debugging
  useEffect(() => {
    // Preload the image
    const img = new Image();
    let imgSrc = project.image;
    
    // Ensure image path is correct
    if (imgSrc.startsWith('public/')) {
      imgSrc = imgSrc.substring(7); // Remove 'public/' prefix
    }
    
    img.onload = () => {
      console.log(`Image loaded successfully: ${imgSrc}`);
      setImageLoaded(true);
      setImageError(false);
    };
    
    img.onerror = (e) => {
      console.error(`Failed to load image: ${imgSrc}`, e);
      setImageError(true);
      setImageLoaded(true);
    };
    
    img.src = imgSrc;
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [project.id, project.image]);
  
  return (
    <ScrollReveal
      animation="scale-in"
      delay={delay}
      className="project-card h-full flex flex-col"
    >
      <div className="overflow-hidden aspect-video relative">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-secondary/20 animate-pulse flex items-center justify-center">
            <span className="text-sm text-muted-foreground">Loading image...</span>
          </div>
        )}
        
        {imageError ? (
          <div className="absolute inset-0 bg-secondary/10 flex items-center justify-center">
            <ImageIcon size={32} className="text-muted-foreground mb-2" />
            <span className="text-sm text-muted-foreground">Image not available</span>
          </div>
        ) : (
          <img
            src={project.image}
            alt={project.title}
            className="project-image w-full h-full object-cover"
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              console.error(`Failed to load image: ${project.image}`, e);
              setImageError(true);
              setImageLoaded(true);
            }}
          />
        )}
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-medium line-clamp-1">{project.title}</h3>
          {project.featured && (
            <Badge variant="default" className="bg-primary text-xs">Featured</Badge>
          )}
        </div>
        
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2 flex-grow">
          {project.description}
        </p>
        
        <div className="mt-auto">
          <div className="flex items-center mb-2">
            <Badge variant="outline" className="mr-2">{project.category}</Badge>
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
    </ScrollReveal>
  );
};

export default ProjectCard;
