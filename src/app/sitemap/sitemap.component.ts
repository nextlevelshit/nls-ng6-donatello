import { WorkService } from './../work/work.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { environment as env } from './../../environments/environment';
import { WorkCategory, WorkItem } from './../app.ontology';

@Component({
  selector: 'nls-sitemap',
  templateUrl: './sitemap.component.html',
  styleUrls: ['./sitemap.component.scss']
})
export class SitemapComponent implements OnInit, OnDestroy {

  protected urls: string[];
  protected baseHref: string;
  protected workSubscription: Subscription;
  public sitemap: string;

  constructor(
    private workService: WorkService
  ) {
    this.baseHref = env.baseHref;
  }

  ngOnInit() {
    this.urls = [
      this.parseXml('', '1.0'),
      this.parseXml('page/news', '0.8'),
      this.parseXml('page/about', '0.8'),
      this.parseXml('page/contact', '0.8'),
      this.parseXml('page/imprint', '0.8'),
      this.parseXml('page/impressum', '0.8'),
    ];

    this.workSubscription = this.workService.subscribeWork().subscribe(res => {
      res.children.forEach(category => {
        if (category instanceof WorkCategory) {
          category.children.forEach(item => {
            if (item instanceof WorkItem) {
              this.urls.push(this.parseXml(`(details:${item.absolutePath})`));
            }
          });
        }
      });

      this.sitemap = this.urls.join('\n\t');
    });
  }

  ngOnDestroy() {
    this.sitemap = null;
    this.urls = [];
    this.workSubscription.unsubscribe();
  }

  protected parseXml(url: string, priority: string = '0.5') {
    return `<url><loc>${this.baseHref + url}</loc><priority>${priority}</priority></url>`;
  }
}
