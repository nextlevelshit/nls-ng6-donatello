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
  information: string[];
  relativePath: string;
  fullPath?: string;
  subTitle?: string;
  pictures?: IWorkPicture[];
}

export interface IWorkPicture {
  fullPath: string;
  relativePath: string;
  alt?: string;
}

export class Work {
  constructor(
    public raw: object
  ) {}

  parse(): IWork[] {
    const workList = <any[]>search(this.raw, env.workDir);

    return (workList.length)
      ? workList.map(work => {
        const path = <string>Object.keys(work)[0];
        const items = <any[]>Object.values(work)[0];

        return {
          relativePath: path,
          title: path.toLocaleUpperCase(),
          items: items.map(item => {
            const parsedWorkItem = new WorkItem(item).parse();

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

  constructor(
    public raw: any[]
  ) {
    this.path = [env.workUrl, Object.keys(this.raw)[0]].join('/');
  }

  parse(): IWorkItem {
    const slug = Object.keys(this.raw)[0];
    const files = Object.values(this.raw)[0];
    const pictures
      = files
        .filter(file => {
        return true;
      }).map(picture => {
        return {
          relativePath: picture
        };
      });

    return  {
      information: [],
      pictures: pictures,
      relativePath: slug,
      title: slug.toUpperCase(),
    };
  }
}
