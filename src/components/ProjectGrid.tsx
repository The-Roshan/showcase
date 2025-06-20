
import React from 'react';
import { Project } from '@/data/projects';
import ProjectsGrid from './projects/ProjectsGrid';
import ProjectPagination from './pagination/ProjectPagination';
import PaginationIndicator from './pagination/PaginationIndicator';
import { usePagination } from '@/hooks/use-pagination';

interface ProjectGridProps {
  projects: Project[];
}

const ProjectGrid = ({ projects }: ProjectGridProps) => {
  const { 
    currentItems: currentProjects,
    currentPage,
    totalPages,
    handlePageChange
  } = usePagination<Project>(projects, "projects-grid");
  
  return (
    <div>
      <ProjectsGrid projects={currentProjects} />
      
      <ProjectPagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      
      <PaginationIndicator
        currentCount={currentProjects.length}
        totalCount={projects.length}
      />
    </div>
  );
};

export default ProjectGrid;
