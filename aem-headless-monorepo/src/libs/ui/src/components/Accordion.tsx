"use client"
import React, { useState } from 'react';

export interface AccordionItem {
  title: string;
  content: string;
}

export interface AccordionProps {
  items: AccordionItem[];
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const onTitleClick = (index: number) => {
    if (index === activeIndex) {
      setActiveIndex(null); // Close the item if it's currently opened
    } else {
      setActiveIndex(index);
    }
  };

  const renderedItems = items.map((item, index) => {
    const active = index === activeIndex ? 'show' : '';

    return (
      <div key={item.title}>
        <div
          className="select-none flex justify-between items-center cursor-pointer py-2 px-4 border-t border-gray-300"
          onClick={() => onTitleClick(index)}
        >
          <span>{item.title}</span>
          <span
            className={`select-none transition-transform duration-300 ease-in-out transform ${active === 'show' ? 'rotate-45' : ''}`}>+</span>
        </div>
        <div
          className={`transition-max-height duration-300 ease-in-out overflow-hidden ${active === 'show' ? 'max-h-60' : 'max-h-0'}`}>
          <div className="py-2 px-4 border-t border-gray-300">
            {item.content}
          </div>
        </div>
      </div>
    );
  });

  return <div className="w-full divide-y">{renderedItems}</div>;
};

export default Accordion;
