"use client"

import React, { useEffect, useState, useRef } from 'react';
import { cn } from '../../lib/utils';

export interface CarouselProps {
  children: React.ReactNode;
  className?: string;
  iconFontClassName?: string;
}

const Carousel: React.FC<CarouselProps> = ({ children, className, iconFontClassName = '' }) => {
  const [current, setCurrent] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const childrenArray = React.Children.toArray(children);
  const size = childrenArray.length;

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.scroll({
        left: current * scrollContainer.clientWidth,
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [current]);

  return (
    <div className={cn("touch-pan-y relative", className)}>
      <div
        ref={scrollRef}
        className="carousel relative overflow-y-clip overflow-x-scroll w-full snap-x snap-mandatory no-scrollbar transition-transform duration-500 ease-in-out"
      >
        <div className="m-0 p-0 flex">
          {children}
        </div>
      </div>
      <div className="flex p-4 items-center">
        <div className="carousel-dots flex space-x-2 grow justify-center">
          {childrenArray.map((_, index) => (
            <button
              key={index}
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => setCurrent(index)}
              className={cn(
                "block w-2.5 h-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                index === current 
                  ? "bg-[var(--color-primary-blue)] w-6" 
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              )}
            />
          ))}
        </div>
        <div className="h-10 space-x-2 flex-none hidden md:flex">
          <button
            aria-label="Go to previous slide"
            onClick={() => setCurrent(current === 0 ? size - 1 : current - 1)}
            className={cn(
              iconFontClassName, 
              "w-10 h-10 flex items-center justify-center rounded-full bg-muted hover:bg-[var(--color-primary-blue)] hover:text-white transition-colors text-xl"
            )}
          >
            {"\ue90f"}
          </button>
          <button
            aria-label="Go to next slide"
            onClick={() => setCurrent(current === size - 1 ? 0 : current + 1)}
            className={cn(
              iconFontClassName, 
              "w-10 h-10 flex items-center justify-center rounded-full bg-muted hover:bg-[var(--color-primary-blue)] hover:text-white transition-colors text-xl"
            )}
          >
            {"\ue90e"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;