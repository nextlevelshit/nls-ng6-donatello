import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { search } from 'nls-directree-searchonly';
import { environment as env } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SitemapService implements OnDestroy {

  public sitemap: any;
  public subsription: Subscription;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.subsription = this.http.get(env.sitemapUrl, {
      responseType: 'text'
    }).subscribe(
      res => {
        this.sitemap = res[env.sitemapIdentifier];
      },
      error => this.router.navigate(['/404'])
    );
  }

  ngOnDestroy() {
    this.subsription.unsubscribe();
  }

  public all(): Observable<any[]> {
    return new Observable(observer => {
      observer.next(this.sitemap);
    });
  }

  public find(query: string): Observable<any> {
    return new Observable(observer => {
      observer.next(this.trySearch(query));
    });
  }

  public trySearch(query: string) {
    try {
      return search(this.sitemap, query);
    } catch (err) {
      console.log(err);
    }
  }
}
