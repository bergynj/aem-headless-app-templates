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
import Image from 'next/image';
import { cn } from '../../lib/utils';

export interface NavbarProps {
  isOpen: boolean;
  toggle: () => void;
  iconFontClassName?: string;
}

function SearchBox({ iconFontClassName = '' }: { iconFontClassName?: string }) {
  return (
    <div className="flex items-center">
      <input 
        type="text" 
        placeholder="Search" 
        className="border border-border bg-muted/50 ml-2 mr-4 px-3 py-1 hidden lg:block rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
      />
      <Link href={"#/en-US/search"}
        className={cn(
          iconFontClassName, 
          "py-4 px-5 mr-3 text-3xl md:text-xl hover:bg-[var(--color-primary-blue)] hover:text-white transition-colors uppercase block lg:hidden"
        )}>
        {"\ue913"}
      </Link>
    </div>
  )
}

export default function Navbar({ isOpen, toggle, iconFontClassName = '' }: NavbarProps) {
  const navLinkClass = "py-4 px-3 hover:bg-[var(--color-primary-blue)] hover:text-white transition-colors uppercase font-semibold text-sm";

  return (
    <nav className="sticky top-0 z-50 shadow-sm border-b border-border">
      <div className="bg-[var(--color-navy)] text-white p-1 px-4 flex justify-end">
        <a href="https://www.adobe.com/" className="uppercase text-[10px] font-bold tracking-widest hover:underline">Sign in</a>
      </div>
      <div className="bg-background dark:bg-gray-800 flex items-center h-[80px] px-4 md:px-8">
        <button
          onClick={toggle} 
          className={cn(iconFontClassName, "text-4xl flex items-center justify-center md:hidden w-[60px] h-[60px] mr-2")}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? "X" : "\ue916"}
        </button>
        
        {!isOpen && (
          <Link href="/en-US" className="flex-shrink-0">
            <Image
              className="dark:filter dark:invert"
              src="https://wknd.site/content/experience-fragments/wknd/language-masters/en/site/header/master/_jcr_content/root/container/container_1195249223/image.coreimg.svg/1594412560447/wknd-logo-dk.svg"
              width={96}
              height={35}
              alt="WKND Logo"
            />
          </Link>
        )}

        <div className="hidden md:flex items-center ml-10 space-x-1">
          <Link href="/en-US" className={navLinkClass} prefetch={true}>Home</Link>
          <Link href="/en-US/magazine" className={navLinkClass} prefetch={true}>Magazine</Link>
          <Link href="/en-US/adventure-collection/all" className={navLinkClass} prefetch={true}>Adventures</Link>
          <Link href="/en-US/faqs" className={navLinkClass} prefetch={true}>Faqs</Link>
          <Link href="/en-US/aboutus" className={navLinkClass} prefetch={true}>About</Link>
        </div>

        <div className="ml-auto">
          <SearchBox iconFontClassName={iconFontClassName}/>
        </div>
      </div>
    </nav>
  )
}