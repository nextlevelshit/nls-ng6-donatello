export interface Work {
  title: string;
  fullPath?: string; // e.g. work/drawing/
  relativePath?: string;
  items?: WorkItem[];
}

export interface WorkItem {
  title: string;
  fullPath: string;
  relativePath?: string;
  information?: string[];
  pictures?: WorkPicture[];
}

export interface WorkPicture {
  fullPath: string;
  relativePath?: string;
  alt?: string;
}
