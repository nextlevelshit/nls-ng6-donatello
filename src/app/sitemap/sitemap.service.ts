import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment as env } from './../../environments/environment';

import { Work, WorkItem } from '../model/work';

@Injectable({
  providedIn: 'root'
})
export class  SitemapService implements OnDestroy {

  public sitemap: Observable<any>;
  public subsription: Subscription;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    // this.sitemap =
    // this.subsription = this.http.get(env.sitemapUrl, {
    //   responseType: 'text'
    // }).subscribe(
    //   res => {
    //     this.sitemap = res[env.sitemapIdentifier];
    //   },
    //   error => this.router.navigate(['/404'])
    // );
  }

  ngOnDestroy() {
    // this.subsription.unsubscribe();
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

  public work(): Observable<object[]> {
    return this.http.get(env.sitemapUrl, {
      responseType: 'text'
    }).pipe(
      map(res => {
        const raw = JSON.parse(res)[env.sitemapIdentifier];

        try {
          return new Work(raw).parse();
        } catch (err) {
          return null;
        }
        // return new Work();
      })
    );
  }

  // public trySearch(query: string) {
  //   try {
  //     console.log(this.sitemap, query);
  //     return search(this.sitemap, query);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
}
