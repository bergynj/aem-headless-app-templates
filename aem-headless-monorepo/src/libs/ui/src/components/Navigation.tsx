"use client";
import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export interface NavigationProps {
  iconFontClassName?: string;
}

const Navigation: React.FC<NavigationProps> = ({ iconFontClassName = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar isOpen={isOpen} toggle={toggle} iconFontClassName={iconFontClassName} />
    </>
  );
};

export default Navigation;
