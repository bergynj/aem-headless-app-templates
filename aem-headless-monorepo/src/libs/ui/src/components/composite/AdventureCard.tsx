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

export interface AdventureCardProps {
  eager?: boolean;
  href: string;
  title: string;
  price: string;
  duration: string;
  imageSrc: string;
  className?: string;
}

export default function AdventureCard({ 
  eager, 
  href, 
  title, 
  price, 
  duration, 
  imageSrc,
  className 
}: AdventureCardProps) {
  return (
    <div className={cn("group relative rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow", className)}>
      <Link href={href}>
        <div className="relative aspect-[4/3] w-full overflow-hidden text-white">
          <Image
            src={imageSrc}
            alt={title}
            width={542}
            height={605}
            priority={eager}
            loading={eager ? 'eager' : 'lazy'}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="group-hover:scale-105 transition-transform duration-500 object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          <div className="absolute text-sm font-medium left-4 bottom-4">
            {duration}
          </div>
          <div className="absolute text-sm font-bold right-4 bottom-4">
            {price}
          </div>
          
          <div className="absolute left-4 top-4 pr-4">
            <h2 className="text-2xl font-bold leading-tight">
              <span className="bg-[var(--color-background-light)] text-[var(--color-navy)] px-2 py-1 box-decoration-clone rounded-sm">
                {title}
              </span>
            </h2>
          </div>
        </div>
      </Link>
    </div>
  )
}