export interface Work {
  title: String;
  fullPath?: String; // e.g. work/drawing/
  relativePath?: String;
  items?: WorkItem[];
}

export interface WorkItem {
  title: String;
  fullPath: String;
  relativePath?: String;
  information?: String[];
  pictures?: WorkPicture[];
}

export interface WorkPicture {
  fullPath: String;
  relativePath?: String;
  alt?: String;
}
