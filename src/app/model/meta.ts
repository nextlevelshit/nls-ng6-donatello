export interface Meta {
  title: String;
  description?: String;
  headlines?: Array<Headline>;
}

export interface Headline {
  slug: String;
  plain: String;
  children?: Array<Headline>;
}
