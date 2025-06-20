
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationPrevious, 
  PaginationNext 
} from '@/components/ui/pagination';

interface ProjectPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const ProjectPagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange 
}: ProjectPaginationProps) => {
  const isMobile = useIsMobile();
  
  const getMobilePageNumbers = () => {
    const pages = [];
    
    pages.push(currentPage);
    
    if (currentPage > 1) {
      pages.unshift(currentPage - 1);
    }
    
    if (currentPage < totalPages) {
      pages.push(currentPage + 1);
    }
    
    return pages;
  };
  
  const getDesktopPageNumbers = () => {
    let pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(currentPage + 1, totalPages - 1);
      
      if (startPage === 2) {
        endPage = Math.min(4, totalPages - 1);
      }
      if (endPage === totalPages - 1) {
        startPage = Math.max(2, totalPages - 3);
      }
      
      if (startPage > 2) {
        pages.push(-1);
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      if (endPage < totalPages - 1) {
        pages.push(-2);
      }
      
      pages.push(totalPages);
    }
    
    return pages;
  };
  
  const getPageNumbers = () => {
    return isMobile ? getMobilePageNumbers() : getDesktopPageNumbers();
  };

  if (totalPages <= 1) {
    return null;
  }
  
  return (
    <Pagination className="mt-6 md:mt-10">
      <PaginationContent className="flex flex-wrap justify-center gap-1">
        <PaginationItem>
          <PaginationLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) onPageChange(currentPage - 1);
            }}
            className={`${currentPage === 1 ? 'opacity-50 pointer-events-none' : ''}`}
          >
            {isMobile ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <PaginationPrevious />
            )}
          </PaginationLink>
        </PaginationItem>
        
        {getPageNumbers().map((page, index) => {
          if (page === -1 || page === -2) {
            return (
              <PaginationItem key={`ellipsis-${index}`} className={isMobile ? "hidden" : "inline-flex"}>
                <span className="px-2">...</span>
              </PaginationItem>
            );
          }
          
          return (
            <PaginationItem key={page}>
              <PaginationLink 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(page);
                }}
                isActive={page === currentPage}
                className={`px-3 py-1.5 ${isMobile ? 'text-sm min-w-8 h-8 flex items-center justify-center' : ''}`}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        
        <PaginationItem>
          <PaginationLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) onPageChange(currentPage + 1);
            }}
            className={`${currentPage === totalPages ? 'opacity-50 pointer-events-none' : ''}`}
          >
            {isMobile ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <PaginationNext />
            )}
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default ProjectPagination;
