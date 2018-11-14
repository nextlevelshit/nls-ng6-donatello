/**
 * Deserializable Interface.
 * @implements Deserializable
 */
export interface Deserializable {
  deserialize(input: any): this;
}

/**
 * Directory Class.
 * @implements Deserializable
 */
export class Directory implements Deserializable  {
  relativePath: string;
  /**
   * Assign input to this argument.
   * @returns Directory
   */
  deserialize(input: any) {
    Object.assign(this, {
      relativePath: Object.keys(input)[0]
    });
    return this;
  }
}
export interface IDirectory {
  relativePath: string;
}

/**
 * Work Class built on Directory.
 * @extends Directory
 */
export class Work extends Directory {
  title?: string;
  items?: IWorkItem[];
  /**
   * Assign input to this argument and iterate through
   * work items.
   * @returns Directory
   */
  deserialize(input: any) {
    Object.assign(this, input);
    this.items = input.items.map(item => {
      return new WorkItem().deserialize(item);
    });
    return this;
  }
}
export interface IWork extends IDirectory {
  title: string;
  items: IWorkItem[];
}
/**
 * WorkItem Class built on Directory.
 * @extends Directory
 */
export class WorkItem extends Directory {
  title: string;
  parent: string;
  url: string;
  information: any[];
  fullPath: string;
  subTitle: string;
  pictures: IPicture[];
  /**
   * Assign input to this argument and parse pictures.
   * @param input Raw data
   * @returns Directory
   */
  deserialize(input: any) {
    Object.assign(this, input);
    this.pictures = input.pictures.map(item => {
      return new Picture().deserialize(item);
    });
    return this;
  }
}
export interface IWorkItem extends IDirectory {
  title: string;
  parent: string;
  url: string;
  information?: any[];
  fullPath?: string;
  subTitle?: string;
  pictures?: IPicture[];
}

/**
 * File Class built on Deserializable.
 * @implements Deserializable
 */
export class File implements Deserializable {
  url: string;
  fileName: string;
  relativePath: string;
  content: string;
  /**
   * Assign input to this argument and parse pictures.
   * @param input Raw data
   * @returns File
   */
  deserialize(input: string) {
    Object.assign(this, {
      fileName: input
    });
    return this;
  }
}

export interface IFile {
  fileName: string;
  relativePath?: string;
  url?: string;
  content?: string;
}
/**
 * Page Class built on File.
 * @extends File
 */
export class Page extends File {
  title: string;
  keywords: string[];
  description: string;
  headlines: IHeadline[];
  /**
   * Assign input to this argument and parse headlines.
   * @param input Raw data
   * @returns Page
   */
  deserialize(input: any) {
    Object.assign(this, input);
    this.headlines = input.pictures.map(item => {
      return new Headline().deserialize(item);
    });
    return this;
  }
}
export interface IPage extends IFile {
  title?: string;
  keywords?: string[];
  description?: string;
  headlines?: IHeadline[];
}
/**
 * Picture Class built on File.
 * @extends File
 */
export class Picture extends File {
  url: string;
  alt: string;
  /**
   * Assign input to this argument.
   * @param input Raw data
   * @returns Picture
   */
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
export interface IPicture extends IFile {
  url: string;
  alt?: string;
}
/**
 * Headline Class built on File.
 * @extends File
 */
export class Headline extends File {
  url: string;
  alt: string;
  /**
   * Assign input to this argument.
   * @param input Raw data
   * @returns Headline
   */
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
export interface IHeadline {
  plain: string;
  slug?: string;
}
