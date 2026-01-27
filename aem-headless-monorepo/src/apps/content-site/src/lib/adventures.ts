/*
 * Copyright 2022 Adobe. All rights reserved.
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

import { cache } from "react";
import { AEMClient, getDataClient } from "@aem-headless/content-repo";
import type { Adventure } from "@aem-headless/content-model";

export const NEXT_PUBLIC_AEM_HOST = process.env.NEXT_PUBLIC_AEM_HOST;

export const adventureCollections = [
  {
    name: 'All',
    slug: 'all',
    predicate: (adventure: Adventure) => true,
  },
  {
    name: 'One Day',
    slug: 'one-day',
    predicate: (adventure: Adventure) => adventure.tripLength === '1 Day',
  },
  {
    name: 'Sport',
    slug: 'sport',
    predicate: (adventure: Adventure) => 
      adventure.title?.includes('Ski') || 
      adventure.title?.includes('Cycling') || 
      adventure.title?.includes('Surf'),
  },
  {
    name: 'Summer',
    slug: 'summer',
    predicate: (adventure: Adventure) => !adventure.title?.includes('Ski'),
  },
  {
    name: 'Winter',
    slug: 'winter',
    predicate: (adventure: Adventure) => adventure.title?.includes('Ski'),
  },
  {
    name: 'Most Popular',
    slug: 'popular',
    predicate: (adventure: Adventure) => 
      adventure.title?.includes('surf') ||
      adventure.title?.includes('Tour') ||
      adventure.title?.includes('Cycling'),
  },
];

export const getAdventures = cache(async (lang: string): Promise<Adventure[]> => {
  const client = getDataClient();
  const res = await client.getAllAdventures();
  return res?.data?.adventureList?.items || [];
});

// Export AdventureClient for backward compatibility
export const AdventureClient = AEMClient;
