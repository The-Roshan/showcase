
import React, { useEffect, useState } from 'react';
import { Project } from '@/data/projects';
import ProjectCard3D from '../ProjectCard3D';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from 'sonner';

interface ProjectsGridProps {
  projects: Project[];
}

const ProjectsGrid = ({ projects }: ProjectsGridProps) => {
  const isMobile = useIsMobile();
  const [imagesPreloaded, setImagesPreloaded] = useState(false);
  
  useEffect(() => {
    // Log all image paths for debugging
    console.log("All project image paths:", projects.map(p => p.image));
    
    // Improved preloading with better error handling
    const preloadImages = async () => {
      console.log("Starting to preload images...");
      
      const imagePromises = projects.map((project, index) => {
        return new Promise((resolve) => {
          const img = new Image();
          
          img.onload = () => {
            console.log(`Successfully loaded image ${index + 1}: ${project.image}`);
            resolve(project.image);
          };
          
          img.onerror = (e) => {
            console.error(`Failed to load image ${index + 1}: ${project.image}`, e);
            // We resolve anyway to continue with other images
            resolve(`Error loading ${project.image}`);
          };
          
          // Make sure image path is correct
          let imgSrc = project.image;
          if (!imgSrc.startsWith('/')) {
            imgSrc = '/' + imgSrc;
          }
          
          // Set the src after setting up handlers
          img.src = imgSrc;
        });
      });
      
      try {
        await Promise.all(imagePromises);
        console.log("All images preloaded (or attempts made)");
        setImagesPreloaded(true);
        toast.success("All project images loaded successfully!");
      } catch (error) {
        console.error("Error during image preloading:", error);
        setImagesPreloaded(true); // Continue anyway
        toast.error("Some project images failed to load");
      }
    };
    
    preloadImages();
  }, [projects]);
  
  return (
    <div 
      id="projects-grid" 
      className={`grid gap-4 md:gap-6 ${isMobile 
        ? 'grid-cols-1' 
        : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
      }`}
    >
      {projects.map((project, index) => {
        return (
          <ProjectCard3D 
            key={project.id} 
            project={project} 
            index={index} 
          />
        );
      })}
    </div>
  );
};

export default ProjectsGrid;
