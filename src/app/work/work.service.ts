import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { SitemapService } from './../sitemap/sitemap.service';
import { IDirectory, WorkItem, IWorkItem } from './../app.ontology';

@Injectable({
  providedIn: 'root'
})
export class WorkService {

  protected indexFile: string;
  protected raw: any;
  protected sitemapSubscription: Subscription;
  protected workSubscription: Subscription;
  protected itemSubscription: Subscription;
  public work: IDirectory[];
  public item: IWorkItem;
  public sitemap: any[];

  constructor(
    private sitemapService: SitemapService
  ) {
  }

  public subscribeWork(): Observable<IDirectory> {
    return this.sitemapService.work().pipe(
      map(work => work)
    );
  }

  public subscribeItem(path: string): Observable<IWorkItem> {
    return this.sitemapService.item(path).pipe(
      map(item => item)
    );
  }

  protected filterMeta() {
    return;
  }

  protected filterPictures() {
    return;
  }
}
