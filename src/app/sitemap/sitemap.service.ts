import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { search } from 'nls-directree-searchonly';

import { environment as env } from './../../environments/environment';
import { Work, IWork, WorkItem, IWorkItem } from '../model/work';

@Injectable({
  providedIn: 'root'
})
export class SitemapService {

  public sitemap: Observable<any>;
  public subsription: Subscription;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
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

  protected raw(): Observable<any[]> {
    return this.http.get(env.sitemapUrl, {
      responseType: 'text'
    }).pipe(
      map(res => JSON.parse(res)[env.sitemapIdentifier])
    );
  }

  public work(): Observable<IWork[]> {
    return this.raw().pipe(
      map(raw => {
        try {
          return new Work(raw).all();
        } catch (err) {
          return null;
        }
      })
    );
  }

  public item(path: string): Observable<IWorkItem> {
    return this.raw().pipe(
      map(raw => {
        try {
          return new WorkItem(raw).withPath(path);
        } catch (err) {
          return null;
        }
      })
    );
  }
}
