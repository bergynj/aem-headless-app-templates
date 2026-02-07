/*
 * Copyright 2023 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 *
 */
import Link from 'next/link'
import { cn } from '../../lib/utils';

export interface SidebarProps {
  isOpen: boolean;
  toggle: () => void;
  className?: string;
}

export default function Sidebar({ isOpen, toggle, className }: SidebarProps) {
  const linkClass = "w-full text-left py-4 px-8 hover:bg-[var(--color-primary-blue)] hover:text-white transition-colors border-b border-border";

  return (
    <nav 
      className={cn(
        "touch-none overscroll-none no-scrollbar bg-background transition-all duration-500 md:hidden fixed w-full h-full overflow-hidden pt-[80px] left-0 z-40",
        isOpen ? "opacity-100 top-0" : "opacity-0 -top-full",
        className
      )}
    >
      <ul className="text-xl font-bold uppercase tracking-tight">
        <li>
          <Link onClick={toggle} href="/en-US" prefetch={true} className="block">
            <button className={linkClass}>Home</button>
          </Link>
        </li>
        <li>
          <Link onClick={toggle} href="/en-US/magazine" prefetch={true} className="block">
            <button className={linkClass}>Magazine</button>
          </Link>
        </li>
        <li>
          <Link onClick={toggle} href="/en-US/adventure-collection/all" prefetch={true} className="block">
            <button className={linkClass}>Adventures</button>
          </Link>
        </li>
        <li>
          <Link onClick={toggle} href="/en-US/faqs" prefetch={true} className="block">
            <button className={linkClass}>Faqs</button>
          </Link>
        </li>
        <li>
          <Link onClick={toggle} href="/en-US/aboutus" prefetch={true} className="block">
            <button className={linkClass}>About Us</button>
          </Link>
        </li>
      </ul>
    </nav>
  )
}