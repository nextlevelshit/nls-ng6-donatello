import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { search } from 'nls-directree-searchonly';

import { environment as env } from './../../environments/environment';
import { Directory, IDirectory, File, IFile, IWork, IWorkItem, IPicture } from './../app.ontology';

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

  protected funnel(raw: any[]): any[] {
    const files = raw
      .filter(item => !(item instanceof Object))
      .map(file => new File().deserialize(file));

    const directories = raw
      .filter(item => item instanceof Object)
      .map(directory => new Directory().deserialize(directory));

    return [
      ...files,
      ...directories
    ];
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

  protected raw(): Observable<any> {
    return this.http.get(env.sitemapUrl, {
      responseType: 'text'
    }).pipe(
      map(res => {
        const raw = JSON.parse(res)[env.sitemapIdentifier];

        console.log('SitemapService.raw()', raw);

        return this.funnel(raw);
      })
    );
  }

  public work(): Observable<any> {
    return this.raw();
    // return this.raw().pipe(
    //   map(raw => {
    //     try {
    //       return new Work(raw).all();
    //     } catch (err) {
    //       return null;
    //     }
    //   })
    // );
  }

  public item(path: string): Observable<any> {
    return this.raw();
    // return this.raw().pipe(
    //   map(raw => {
    //     try {
    //       return new WorkItem(raw).withPath(path);
    //     } catch (err) {
    //       return null;
    //     }
    //   })
    // );
  }
}
