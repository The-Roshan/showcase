
import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const Cursor3D = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Don't add event listeners on mobile
    if (isMobile || typeof window === 'undefined') return;
    
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const updateCursorType = () => {
      const hoveredElement = document.elementFromPoint(position.x, position.y);
      const isPointerElement = hoveredElement?.closest('a, button, [role="button"], input, select, textarea');
      setIsPointer(!!isPointerElement);
    };

    const handleMouseDown = () => setIsActive(true);
    const handleMouseUp = () => setIsActive(false);
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mousemove', updateCursorType);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    // Set initial visibility
    setIsVisible(true);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mousemove', updateCursorType);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [position.x, position.y, isMobile]);

  // Don't render on server or mobile devices
  if (typeof window === 'undefined' || isMobile) return null;

  return (
    <>
      <div 
        className={`custom-cursor-outer fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 mix-blend-difference transition-all duration-300 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'} ${isPointer ? 'scale-150' : ''} ${isActive ? 'scale-75' : ''}`}
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`,
        }}
      >
        <div className="w-8 h-8 rounded-full border-2 border-white"></div>
      </div>
      <div 
        className={`custom-cursor-inner fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 mix-blend-difference ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`,
          transition: 'transform 0.1s ease-out, width 0.3s ease, height 0.3s ease, background-color 0.3s ease',
          width: isPointer ? '5px' : '12px',
          height: isPointer ? '5px' : '12px',
          backgroundColor: 'white',
          borderRadius: '50%',
        }}
      ></div>
    </>
  );
};

export default Cursor3D;
