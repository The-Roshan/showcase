
import { useState, useEffect } from 'react';
import { useIsMobile } from './use-mobile';

export function usePagination<T>(items: T[], scrollToId: string = '') {
  const isMobile = useIsMobile();
  const itemsPerPage = isMobile ? 4 : 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState<T[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  
  useEffect(() => {
    setCurrentPage(1);
    setTotalPages(Math.ceil(items.length / itemsPerPage));
    const indexOfLastItem = 1 * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setCurrentItems(items.slice(indexOfFirstItem, indexOfLastItem));
  }, [items, itemsPerPage, isMobile]);
  
  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setCurrentItems(items.slice(indexOfFirstItem, indexOfLastItem));
    
    const targetElement = document.getElementById(scrollToId);
    if (targetElement) {
      const scrollOptions = {
        behavior: "smooth" as ScrollBehavior,
        block: isMobile ? "start" as ScrollLogicalPosition : "nearest" as ScrollLogicalPosition
      };
      targetElement.scrollIntoView(scrollOptions);
    }
  }, [currentPage, items, itemsPerPage, scrollToId, isMobile]);
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  return {
    currentItems,
    currentPage,
    totalPages,
    handlePageChange
  };
}
