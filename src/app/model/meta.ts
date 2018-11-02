export interface IMetaData {
  title: string;
  keywords?: string[];
  description?: string;
  headlines?: IHeadline[];
}

export interface IHeadline {
  slug: string;
  plain: string;
  children?: IHeadline[];
}

export class Meta {
  constructor(
    path: string
  ) {
  }
}
