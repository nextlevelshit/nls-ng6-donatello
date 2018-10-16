export interface Meta {
  title: string;
  keywords?: string[];
  description?: string;
  headlines?: Headline[];
}

export interface Headline {
  slug: string;
  plain: string;
  children?: Headline[];
}
