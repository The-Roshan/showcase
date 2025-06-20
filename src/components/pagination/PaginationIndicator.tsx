
import React from 'react';

interface PaginationIndicatorProps {
  currentCount: number;
  totalCount: number;
}

const PaginationIndicator = ({ currentCount, totalCount }: PaginationIndicatorProps) => {
  return (
    <div className="text-center mt-4 text-sm text-muted-foreground">
      Showing {currentCount} of {totalCount} projects
    </div>
  );
};

export default PaginationIndicator;
