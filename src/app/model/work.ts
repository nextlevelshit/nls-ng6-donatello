import { map } from 'rxjs/operators';
import { search } from 'nls-directree-searchonly';
import { environment as env } from './../../environments/environment';

export interface IWork {
  title: string;
  relativePath: string;
  items?: IWorkItem[];
}

export interface IWorkItem {
  title: string;
  relativePath: string;
  information?: any[];
  fullPath?: string;
  subTitle?: string;
  files?: any[];
  pictures?: IWorkPicture[];
}

export interface IWorkPicture {
  fullPath: string;
  relativePath?: string;
  alt?: string;
}

export class Work {
  constructor(
    public sitemap: object
  ) {}

  all(): IWork[] {
    const workList = <any[]>search(this.sitemap, env.workDir);

    return (workList.length)
      ? workList.map(work => {
        const path = <string>Object.keys(work)[0];
        const items = <any[]>Object.values(work)[0];

        return {
          relativePath: path,
          title: path.toLocaleUpperCase(),
          items: items.map(item => {
            const searchedItem = search(this.sitemap, env.workDir);
            // console.log('Work.all():item', item, {[path]: items});
            const parsedWorkItem = new WorkItem(item).withRaw();

            parsedWorkItem.fullPath = [
              env.workDir,
              path,
              parsedWorkItem.relativePath
            ].join('/');

            parsedWorkItem.pictures =  parsedWorkItem.pictures.map(picture => {
              return {
                ...picture,
                ...{ fullPath: [env.contentUrl, parsedWorkItem.fullPath, picture.relativePath].join('/') }
              };
            });

            return parsedWorkItem;
          })
        };
      })
      : null;
  }
}

export class WorkItem {
  protected item: IWorkItem;
  protected path: string;
  protected slug: any;
  protected files: any[];

  constructor(
    public sitemap: any[]
  ) {
    this.path = [env.workUrl, Object.keys(this.sitemap)[0]].join('/');
    this.slug = Object.keys(this.sitemap)[0];
    this.files = Object.values(this.sitemap)[0];
  }

  withPath(path: string): IWorkItem {
    this.path = path;
    this.sitemap = search(this.sitemap, path);
    this.slug = this.path.split('/');
    this.files = this.sitemap;

    return this.withRaw();
  }

  withRaw(): IWorkItem {
    // console.log(this.slug, this.sitemap, this.path);
    const pictures
      = this.files
        .filter(file => {
        return true;
      }).map((picture) => {
        return {
          relativePath: picture
        };
      });

    return <IWorkItem> {
      title: this.slug.toUpperCase(),
      relativePath: this.slug,
      information: [],
      pictures: pictures,
      files: this.files
    };
  }
}
