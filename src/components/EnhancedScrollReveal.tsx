
import { useEffect, useRef, ReactNode, useState } from 'react';
import { cn } from '@/lib/utils';

type EnhancedScrollRevealProps = {
  children: ReactNode;
  className?: string;
  animation?: 
    | 'fade-in'
    | 'fade-in-left'
    | 'fade-in-right'
    | 'fade-in-up'
    | 'fade-in-down'
    | 'scale-in'
    | 'rotate-in'
    | 'blur-in'
    | '3d-flip'
    | 'slide-up'
    | 'zoom-in'
    | 'split-text';
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
  staggerChildren?: boolean;
  staggerDelay?: number;
  style?: React.CSSProperties;
};

const EnhancedScrollReveal = ({
  children,
  className,
  animation = 'fade-in',
  delay = 0,
  duration = 800,
  threshold = 0.1,
  once = true,
  staggerChildren = false,
  staggerDelay = 50,
  style = {},
}: EnhancedScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const enteredRef = useRef(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    
    if (!element) return;
    
    // Apply initial styles
    element.style.opacity = '0';
    element.style.willChange = 'transform, opacity';
    
    const getInitialTransform = () => {
      switch (animation) {
        case 'fade-in-left':
          return 'translateX(-30px)';
        case 'fade-in-right':
          return 'translateX(30px)';
        case 'fade-in-up':
          return 'translateY(30px)';
        case 'fade-in-down':
          return 'translateY(-30px)';
        case 'scale-in':
          return 'scale(0.9)';
        case 'rotate-in':
          return 'rotateY(-10deg)';
        case '3d-flip':
          return 'perspective(1000px) rotateY(25deg)';
        case 'slide-up':
          return 'translateY(50px)';
        case 'zoom-in':
          return 'scale(0.85)';
        default:
          return 'translateY(15px)';
      }
    };

    element.style.transform = getInitialTransform();
    if (animation === 'blur-in') {
      element.style.filter = 'blur(8px)';
    }
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!once || !enteredRef.current) {
              setTimeout(() => {
                setIsVisible(true);
                element.style.opacity = '1';
                element.style.transform = 'translate(0, 0) scale(1) rotate(0)';
                
                if (animation === 'blur-in') {
                  element.style.filter = 'blur(0)';
                }
                
                if (staggerChildren && element.children.length > 0) {
                  Array.from(element.children).forEach((child, index) => {
                    const childElement = child as HTMLElement;
                    childElement.style.opacity = '0';
                    childElement.style.transform = getInitialTransform();
                    childElement.style.transition = `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`;
                    
                    setTimeout(() => {
                      childElement.style.opacity = '1';
                      childElement.style.transform = 'translate(0, 0) scale(1) rotate(0)';
                    }, delay + (index * staggerDelay));
                  });
                }
                
                enteredRef.current = true;
              }, delay);
            }
            
            if (once && enteredRef.current) {
              observer.disconnect();
            }
          } else {
            if (!once && enteredRef.current) {
              setIsVisible(false);
              element.style.opacity = '0';
              element.style.transform = getInitialTransform();
              if (animation === 'blur-in') {
                element.style.filter = 'blur(8px)';
              }
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
  }, [animation, delay, duration, threshold, once, staggerChildren, staggerDelay]);
  
  const getAnimationClass = () => {
    switch (animation) {
      case 'split-text':
        return 'split-text-animation';
      default:
        return '';
    }
  };

  return (
    <div 
      ref={ref}
      className={cn(className, getAnimationClass())}
      style={{ 
        opacity: 0,
        transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out, filter ${duration}ms ease-out`,
        ...style
      }}
    >
      {animation === 'split-text' && typeof children === 'string' 
        ? children.split('').map((char, i) => (
            <span 
              key={i} 
              style={{ 
                display: 'inline-block', 
                opacity: 0, 
                transform: 'translateY(20px)',
                transition: `opacity ${duration * 0.7}ms ease-out, transform ${duration * 0.7}ms ease-out`,
                transitionDelay: `${delay + (i * staggerDelay)}ms`
              }}
              className={isVisible ? 'opacity-100 transform-none' : ''}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))
        : children}
    </div>
  );
};

export default EnhancedScrollReveal;
