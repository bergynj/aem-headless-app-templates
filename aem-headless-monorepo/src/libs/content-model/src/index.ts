// Type exports will be added here
export interface Adventure {
  _path: string;
  title: string;
  slug?: string;
  price?: string;
  tripLength?: string;
  groupSize?: string;
  difficulty?: string;
  activity?: string;
  adventureType?: string;
  primaryImage?: {
    _path: string;
    mimeType?: string;
    width?: number;
    height?: number;
  };
  description?: {
    html?: string;
  };
  itinerary?: {
    html?: string;
  };
}

export interface Page {
  _path: string;
  _type: string;
  title?: string;
  seoTitle?: string;
  seoDescription?: string;
  components?: any[];
}

export interface FormSession {
  sessionId: string;
  formId: string;
  step: number;
  data: Record<string, any>;
  createdAt: number;
  expiresAt: number;
}
