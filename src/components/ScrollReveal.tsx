
import { useEffect, useRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  animation?: 
    | 'fade-in'
    | 'fade-in-left'
    | 'fade-in-right'
    | 'scale-in';
  delay?: number;
  threshold?: number;
  once?: boolean;
};

const ScrollReveal = ({
  children,
  className,
  animation = 'fade-in',
  delay = 0,
  threshold = 0.1,
  once = true,
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const enteredRef = useRef(false);

  useEffect(() => {
    const element = ref.current;
    
    if (!element) return;
    
    element.style.opacity = '0';
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!once || !enteredRef.current) {
              setTimeout(() => {
                element.style.opacity = '1';
                element.classList.add(`animate-${animation}`);
                enteredRef.current = true;
              }, delay);
            }
            
            if (once && enteredRef.current) {
              observer.disconnect();
            }
          } else {
            if (!once && enteredRef.current) {
              element.style.opacity = '0';
              element.classList.remove(`animate-${animation}`);
              enteredRef.current = false;
            }
          }
        });
      },
      { threshold }
    );
    
    observer.observe(element);
    
    return () => {
      observer.disconnect();
    };
  }, [animation, delay, threshold, once]);
  
  return (
    <div 
      ref={ref}
      className={cn(className)}
      style={{ 
        opacity: 0,
        willChange: 'opacity, transform'
      }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
