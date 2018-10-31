import { map } from 'rxjs/operators';
import { search } from 'nls-directree-searchonly';
import { environment as env } from './../../environments/environment';

export class Work {
  constructor(
    public raw: object
  ) {
  }
  parse(): IWork[] {
    const workList = search(this.raw, 'work');

    return (workList.length)
    ? workList.map(work => {
      const path = Object.keys(work)[0];
      const items = Object.values(work)[0];

      return {
        title: path.toLocaleUpperCase(),
        items: items.map(item => new WorkItem(path, item).parse())
      };
    })
    : null;
  }
}

export class WorkItem {
  constructor(
    public work: string,
    public item: object
  ) {
  }
  parse(): IWorkItem {

    const path = Object.keys(this.item)[0];
    const files = Object.values(this.item)[0];
    const pictures
      = files
        .filter(file => {
        return true;
      }).map(picture => {
        return {
          fullPath: env.workUrl + this.work + '/' + path + '/' + picture
        };
      });

    return {
      title: path.toUpperCase(),
      fullPath: env.workDir + '/' + this.work + '/' + path,
      pictures: pictures
    };
  }
}

export interface IWork {
  title: string;
  fullPath?: string; // e.g. work/drawing/
  relativePath?: string;
  items?: IWorkItem[];
}

export interface IWorkItem {
  title: string;
  subTitle?: string;
  fullPath: string;
  relativePath?: string;
  information?: string[];
  pictures?: IWorkPicture[];
}

export interface IWorkPicture {
  fullPath: string;
  relativePath?: string;
  alt?: string;
}
