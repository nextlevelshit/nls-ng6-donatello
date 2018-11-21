import slugify from 'slugify';
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
  absolutePath: string;
  title: string;
  children: (File|Directory|WorkCategory|WorkItem|Page|Picture)[];
  /**
   * Assign input to this argument.
   * @returns Directory
   */
  deserialize(input: any, parent = null) {
    Object.assign(this, {
      relativePath: Object.keys(input)[0],
      children: Object.values(input)[0]
    });
    return this;
  }

  mergePath(parent: any): string {
    return [parent.absolutePath, this.relativePath].join('/');
  }
  /**
   * Merge existing title into human readabible slug.
   * @returns string
   */
  mergeSlug(): string {
    return slugify(this.title);
  }
}
export interface IDirectory {
  relativePath: string;
  absolutePath?: string;
  title?: string;
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
  deserialize(categories: any) {
    this.relativePath = env.workDir;
    this.absolutePath = this.relativePath;
    this.children = categories.map(category => {
      return new WorkCategory().deserialize(category, this);
    });
    return this;
  }
}

/**
 * Work Category Class built on Directory.
 * @extends Directory
 */
export class WorkCategory extends Directory {
  slug: string;
  /**
   * Assign input to this argument and iterate through
   * work items.
   * @returns Directory
   */
  deserialize(directory: any, parent: any) {
    // return null;
    Object.assign(this, directory);
    this.title = this.relativePath.toString().toUpperCase();
    this.absolutePath = this.mergePath(parent);
    this.slug = slugify(this.title);
    this.children =  directory.children.map(item => {
      if (item instanceof Directory) {
        return new WorkItem().deserialize(item, this);
      } else {
        return item;
      }
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
  parent: string;
  url: string;
  information: any[];
  subTitle: string;
  /**
   * Assign input to this argument and parse pictures.
   * @param directory Raw data
   * @returns Directory
   */
  deserialize(directory: any, parent: any) {
    Object.assign(this, directory);

    this.parent = parent;
    this.absolutePath = this.mergePath(parent);
    this.information = this.mergeInformation(parent);
    this.subTitle = this.mergeSubTitle(parent);
    this.children = directory.children
      .filter(child => child instanceof Picture)
      .map(picture => {
        picture.url = picture.mergeUrl(this);
        picture.thumbnail = picture.url.replace(env.contentUrl, env.assetsUrl);
        console.log('WorkItem.picture', picture);
        return picture;
      });

    return this;
  }

  mergeInformation(parent: any): string[] {
    return [];
  }

  mergeSubTitle(parent: any): string {
    return null;
  }
}
export interface IWorkItem extends IDirectory {
  parent: string;
  url: string;
  information?: any[];
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
    return [parent.absolutePath, this.fileName].join('/');
  }

  mergeUrl(parent: any): string {
    return [env.contentUrl, parent.absolutePath, this.fileName].join('/');
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
  thumbnail: string;
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
