
import { useState, useEffect } from 'react';
import { projects, Project } from '@/data/projects';
import EnhancedScrollReveal from './EnhancedScrollReveal';
import ProjectFilter from './ProjectFilter';
import { ScrollArea } from './ui/scroll-area';
import ProjectGrid from './ProjectGrid';
import { Card, CardContent } from './ui/card';
import { useIsMobile } from '@/hooks/use-mobile';

const ProjectsSection = () => {
  const isMobile = useIsMobile();
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const [activeCategory, setActiveCategory] = useState('all');
  const [activePurpose, setActivePurpose] = useState('all');
  const [loading, setLoading] = useState(true);
  
  // Simulate loading to ensure all project components render properly
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    let result = [...projects];
    
    if (activeCategory !== 'all') {
      result = result.filter(project => project.category === activeCategory);
    }
    
    if (activePurpose !== 'all') {
      result = result.filter(project => project.purpose === activePurpose);
    }
    
    setFilteredProjects(result);
  }, [activeCategory, activePurpose]);
  
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };
  
  const handlePurposeChange = (purpose: string) => {
    setActivePurpose(purpose);
  };
  
  return (
    <section id="projects" className="section py-16 md:py-24">
      <div className="container mx-auto px-4 relative">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -z-10 w-64 h-64 bg-primary/5 rounded-full filter blur-[50px]"></div>
        <div className="absolute bottom-0 left-0 -z-10 w-96 h-96 bg-primary/5 rounded-full filter blur-[80px]"></div>
        <div className="absolute top-1/3 left-1/2 -z-10 w-72 h-72 bg-secondary/5 rounded-full filter blur-[60px]"></div>
        
        <EnhancedScrollReveal animation="fade-in-up">
          <div className="flex flex-col items-center mb-8 md:mb-16">
            <EnhancedScrollReveal animation="split-text" staggerChildren={true} staggerDelay={30}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">My Projects</h2>
            </EnhancedScrollReveal>
            <div className="mt-3 h-1 w-20 bg-primary rounded-full"></div>
            <EnhancedScrollReveal animation="fade-in-up" delay={300}>
              <p className="text-muted-foreground text-center max-w-2xl mt-4 px-4">
                Browse through my collection of {projects.length}+ projects across various categories.
                Use the filters to find specific types of work.
              </p>
            </EnhancedScrollReveal>
          </div>
        </EnhancedScrollReveal>
        
        <EnhancedScrollReveal animation="fade-in-up" delay={200}>
          <ProjectFilter
            onCategoryChange={handleCategoryChange}
            onPurposeChange={handlePurposeChange}
            activeCategory={activeCategory}
            activePurpose={activePurpose}
          />
        </EnhancedScrollReveal>
        
        <EnhancedScrollReveal animation="fade-in" delay={300}>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mt-8 md:mt-10">
              {Array.from({ length: isMobile ? 4 : 8 }).map((_, index) => (
                <Card key={index} className="h-[320px] animate-pulse">
                  <div className="bg-muted/30 h-40 rounded-t-lg"></div>
                  <CardContent className="p-5">
                    <div className="h-4 bg-muted/30 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-muted/20 rounded w-full mb-1"></div>
                    <div className="h-3 bg-muted/20 rounded w-5/6"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <ScrollArea className="w-full overflow-visible perspective-container">
              <ProjectGrid projects={filteredProjects} />
              
              {filteredProjects.length === 0 && (
                <div className="text-center py-16 md:py-20">
                  <h3 className="text-xl font-medium">No projects found</h3>
                  <p className="text-muted-foreground mt-2">Try changing your filters to see more projects.</p>
                </div>
              )}
            </ScrollArea>
          )}
        </EnhancedScrollReveal>
      </div>
    </section>
  );
};

export default ProjectsSection;
