import React, { useRef, useEffect } from 'react';

export interface PricingCarouselProps {
  children: React.ReactNode;
  className?: string;
}

const PricingCarousel: React.FC<PricingCarouselProps> = ({ children, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Starting position: Middle card (if 3 cards)
    if (containerRef.current) {
      const { scrollWidth, clientWidth } = containerRef.current;
      if (scrollWidth > clientWidth) {
        containerRef.current.scrollLeft = (scrollWidth - clientWidth) / 2;
      }
    }
  }, []);

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      {/* Mobile/Tablet: Carousel */}
      <div 
        ref={containerRef}
        className="flex md:hidden overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 px-[10%] pb-8"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {React.Children.map(children, (child) => (
          <div className="snap-center shrink-0 w-[80vw]">
            {child}
          </div>
        ))}
      </div>

      {/* Desktop: Grid */}
      <div className="hidden md:grid md:grid-cols-3 gap-6 max-w-7xl mx-auto px-4">
        {children}
      </div>
    </div>
  );
};

export default PricingCarousel;
