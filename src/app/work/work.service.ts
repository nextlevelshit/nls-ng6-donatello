import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { IWork, IWorkItem } from './../model/work';
import { SitemapService } from './../sitemap/sitemap.service';

@Injectable({
  providedIn: 'root'
})
export class WorkService {

  protected sitemapSubscription: Subscription;
  public work: IWork[];
  public sitemap: any[];

  constructor(
    private sitemapService: SitemapService
  ) {
  }

  public all(): Observable<any> {
    return this.sitemapService.work();
  }

  public item(path: string): Observable<IWorkItem> {
    return this.sitemapService.item(path);
  }
}
