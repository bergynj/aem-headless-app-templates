"use client"
import React, { useState } from 'react';
import { cn } from '../../lib/utils';

export interface AccordionItem {
  title: string;
  content: string;
}

export interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

const Accordion: React.FC<AccordionProps> = ({ items, className }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const onTitleClick = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className={cn("w-full divide-y divide-border border-b border-border", className)}>
      {items.map((item, index) => {
        const isOpen = index === activeIndex;

        return (
          <div key={item.title}>
            <button
              className="w-full select-none flex justify-between items-center cursor-pointer py-4 px-4 hover:bg-muted/50 transition-colors"
              onClick={() => onTitleClick(index)}
              aria-expanded={isOpen}
            >
              <span className="font-medium">{item.title}</span>
              <span
                className={cn(
                  "select-none transition-transform duration-300 ease-in-out transform text-xl",
                  isOpen ? "rotate-45" : ""
                )}
              >
                +
              </span>
            </button>
            <div
              className={cn(
                "transition-all duration-300 ease-in-out overflow-hidden",
                isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
              )}
            >
              <div className="py-4 px-4 text-muted-foreground border-t border-border bg-card">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;