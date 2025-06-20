
import { useState } from 'react';
import { ProjectCategory, ProjectPurpose, getFilterOptions } from '@/data/projects';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Check, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ScrollReveal from './ScrollReveal';

interface ProjectFilterProps {
  onCategoryChange: (category: string) => void;
  onPurposeChange: (purpose: string) => void;
  activeCategory: string;
  activePurpose: string;
}

const ProjectFilter = ({ 
  onCategoryChange,
  onPurposeChange,
  activeCategory, 
  activePurpose 
}: ProjectFilterProps) => {
  const { categories, purposes } = getFilterOptions();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  return (
    <ScrollReveal animation="fade-in" className="mb-8">
      <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between md:items-center">
        {/* Tablet/Desktop Filters */}
        <div className="hidden md:flex space-x-2 overflow-x-auto pb-2">
          <button
            className={cn(
              "filter-button",
              activeCategory === "all" ? "filter-button-active" : "filter-button-inactive"
            )}
            onClick={() => onCategoryChange("all")}
          >
            All Projects
          </button>
          
          {categories.map((category) => (
            <button
              key={category}
              className={cn(
                "filter-button",
                activeCategory === category ? "filter-button-active" : "filter-button-inactive"
              )}
              onClick={() => onCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="hidden md:flex space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="px-4 flex items-center gap-2">
                Purpose: {activePurpose === 'all' ? 'All' : activePurpose}
                <ChevronDown size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuRadioGroup value={activePurpose} onValueChange={onPurposeChange}>
                <DropdownMenuRadioItem value="all">
                  <Check
                    size={16}
                    className={cn(
                      "mr-2",
                      activePurpose === "all" ? "opacity-100" : "opacity-0"
                    )}
                  />
                  All
                </DropdownMenuRadioItem>
                {purposes.map((purpose) => (
                  <DropdownMenuRadioItem key={purpose} value={purpose}>
                    <Check
                      size={16}
                      className={cn(
                        "mr-2",
                        activePurpose === purpose ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {purpose}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile Filters */}
        <div className="md:hidden flex flex-col space-y-4">
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="w-full flex items-center justify-between"
            >
              <span>Filter Projects</span>
              <ChevronDown 
                size={16} 
                className={cn(
                  "transition-transform duration-200",
                  isMobileFilterOpen ? "transform rotate-180" : ""
                )}
              />
            </Button>
          </div>
          
          {isMobileFilterOpen && (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Category</h3>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    className={cn(
                      "filter-button",
                      activeCategory === "all" ? "filter-button-active" : "filter-button-inactive"
                    )}
                    onClick={() => onCategoryChange("all")}
                  >
                    All Projects
                  </button>
                  
                  {categories.map((category) => (
                    <button
                      key={category}
                      className={cn(
                        "filter-button",
                        activeCategory === category ? "filter-button-active" : "filter-button-inactive"
                      )}
                      onClick={() => onCategoryChange(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Purpose</h3>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    className={cn(
                      "filter-button",
                      activePurpose === "all" ? "filter-button-active" : "filter-button-inactive"
                    )}
                    onClick={() => onPurposeChange("all")}
                  >
                    All Purposes
                  </button>
                  
                  {purposes.map((purpose) => (
                    <button
                      key={purpose}
                      className={cn(
                        "filter-button",
                        activePurpose === purpose ? "filter-button-active" : "filter-button-inactive"
                      )}
                      onClick={() => onPurposeChange(purpose)}
                    >
                      {purpose}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ScrollReveal>
  );
};

export default ProjectFilter;
