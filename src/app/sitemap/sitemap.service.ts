import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable, AfterContentChecked } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { search } from 'nls-directree-searchonly';

import { environment as env } from './../../environments/environment';
import { Directory, IDirectory, File, IFile, Work, WorkItem, IWorkItem, Page, IPage, Picture, IPicture } from './../app.ontology';

@Injectable({
  providedIn: 'root'
})
export class SitemapService {

  public sitemap: Observable<any[]>;
  public subsription: Subscription;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
  }

  protected detach(raw: any): any[] {
    const directories = this.detachDirectories(raw);
    const files = this.detachFiles(raw);
    const pages = this.detachPages(files);
    const pictures = this.detachPictures(files);

    return [
      ...directories,
      ...pages,
      ...pictures
    ];
  }

  protected detachFiles(raw: any): IFile[] {
    return raw
      .filter(item => !(item instanceof Object))
      .map(file => new File().deserialize(file));
  }

  protected detachDirectories(raw: any): IDirectory[] {
    return raw
      .filter(item => item instanceof Object)
      .map(directory => {
        directory = new Directory().deserialize(directory);
        directory.children = this.detach(directory.children);
        return directory;
      });
  }

  protected detachPages(files: IFile[]): IPage[] {
    return files
      .filter(file => this.isMarkdown(file.fileName))
      .map(file => new Page().deserialize(file));
  }

  protected detachPictures(files: IFile[]): IPicture[] {
    return files
      .filter(file => this.isPicture(file.fileName))
      .map(file => new Picture().deserialize(file));
  }

  protected isMarkdown(fileName: string): boolean {
    return (fileName.search(/.md/i) >= 0);
  }

  protected isPicture(fileName: string): boolean {
    return (fileName.search(/.(jpg|png|jpeg|svg)/i) >= 0);
  }

  public all(): Observable<any[]> {
    return this.http.get(env.sitemapUrl, {
      responseType: 'text'
    }).pipe(
      map(res => {
        return JSON.parse(res)[env.sitemapIdentifier];
      })
    );
  }

  protected retrieve(): Observable<any> {
    return this.http.get(env.sitemapUrl, {
      responseType: 'text'
    }).pipe(
      map(res => {
        const raw = JSON.parse(res)[env.sitemapIdentifier];
        return raw;
      })
    );
  }

  public work(): Observable<any> {
    return this.retrieve()
      .pipe(
        map(raw => {
          try {
            const detached = this.detach(search(raw, env.workDir));
            return new Work().deserialize(detached);
          } catch (err) {
            return null;
          }
        })
      );
  }

  public item(path: string): Observable<any> {
    return this.retrieve()
      .pipe(
        map(raw => {
          try {
            const detached = {
              children: this.detach(search(raw, path))
            };
            const parent = {
              absolutePath: path
            };
            return new WorkItem().deserialize(detached, parent);
          } catch (err) {
            return null;
          }
        })
      );
  }
}
