import Link from 'next/link'
import Image from 'next/image';
import { NEXT_PUBLIC_AEM_HOST } from "../lib/adventures";
import type { Adventure } from "@aem-headless/content-model";

export interface HeroAdventureCardProps {
  adventure: Adventure;
}

export default function HeroAdventureCard({ adventure }: HeroAdventureCardProps) {
  const pathItems = adventure._path.split('/');
  const cfPath = pathItems.slice(Math.max(pathItems.length - 2, 0)).join('/');
  const href = `/adventures/${cfPath}`;

  return (
    <div className="max-w-[1154px] mx-auto grid grid-cols-1 mt-6 lg:grid-cols-3">
      <div className="col-span-2">
        <Image
          width="0"
          height="0"
          sizes="100vw"
          className="w-full h-auto lg:h-full"
          src={`${NEXT_PUBLIC_AEM_HOST}${adventure.primaryImage?._path || ''}`}
          alt={adventure.title || ''} />
      </div>
      <div className="col-span-1 bg-gray-200 dark:bg-gray-600 p-6">
        <h2>{adventure.title}</h2>
        <div className="pt-10 pb-10">
          <Link href={href} className="ml-0 p-5 btn-yellow">
            Read more
          </Link>
        </div>
      </div>
    </div>
  )
}
