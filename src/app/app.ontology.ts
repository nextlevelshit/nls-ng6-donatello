import { environment as env } from './../environments/environment';

/**
 * Deserializable Interface.
 * @implements Deserializable
 */
export interface Deserializable {
  deserialize(input: any): this;
  mergePath(parent: string, self: IDirectory): string;
}

/**
 * Directory Class.
 * @implements Deserializable
 */
export class Directory implements Deserializable  {
  relativePath: string;
  fullPath?: string;
  children?: (IFile|IDirectory|IWorkCategory|IWorkItem|IPage|IPicture)[];
  /**
   * Assign input to this argument.
   * @returns Directory
   */
  deserialize(input: any, path = '') {
    Object.assign(this, {
      relativePath: Object.keys(input)[0],
      children: Object.values(input)[0]
    });
    return this;
  }

  mergePath(parent: any): string {
    return [parent.relativePath, this.relativePath].join('/');
  }
}
export interface IDirectory {
  relativePath: string;
  children?: (IFile|IDirectory|IWorkCategory|IWorkItem|IPage|IPicture)[];
}

/**
 * Work Class built on Directory.
 * @extends Directory
 */
export class Work extends Directory {
  /**
   * Assign input to this argument and iterate through
   * work directories.
   * @returns Directory
   */
  deserialize(directories: any) {
    this.relativePath = env.workDir;
    this.children = directories.map(directory => {
      return new WorkCategory().deserialize(directory, this);
    });
    return this;
  }
}

/**
 * Work Category Class built on Directory.
 * @extends Directory
 */
export class WorkCategory extends Directory {
  title?: string;
  /**
   * Assign input to this argument and iterate through
   * work items.
   * @returns Directory
   */
  deserialize(directory: any, parent: any) {
    Object.assign(this, directory);
    this.relativePath = this.mergePath(parent);
    this.children =  directory.children.map(item => {
      return new WorkItem().deserialize(item, this);
    });
    return this;
  }
}
export interface IWorkCategory extends IDirectory {
  title?: string;
  items?: IWorkItem[];
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
  /**
   * Assign input to this argument and parse pictures.
   * @param directory Raw data
   * @returns Directory
   */
  deserialize(directory: any, parent: any) {
    Object.assign(this, directory);
    this.relativePath = this.mergePath(parent);
    this.children = directory.children.map(child => {
      child.relativePath = child.mergePath(this);
      return child;
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

  mergePath(parent: any): string {
    return [parent.relativePath, this.fileName].join('/');
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
